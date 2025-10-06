import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { autocompletion } from '@codemirror/autocomplete';

function createSandboxHtml() {
  return `<!doctype html>\n<html><head><meta charset="utf-8"><style>html,body{margin:0;padding:8px;font-family:ui-sans-serif,system-ui,-apple-system;}</style></head>\n<body>\n<pre id="output" style="white-space:pre-wrap"></pre>\n<script>\n(function(){\n  const outputEl = document.getElementById('output');\n  const append = (msg) => { const line = document.createElement('div'); line.textContent = msg; outputEl.appendChild(line); }\n  const safeStringify = (v)=>{ try { return JSON.stringify(v); } catch(e){ return String(v); } }\n
  window.addEventListener('message', async (ev)=>{\n    if(!ev || !ev.data) return;\n    if(ev.data.type === 'run-tests'){\n      const { code, tests, functionName } = ev.data;\n      const results = [];\n      try {\n        const fn = new Function(code + "\n;return (typeof " + functionName + " !== 'undefined') ? " + functionName + " : undefined;");\n        const exported = fn();\n        if(typeof exported !== 'function'){\n          results.push({ passed:false, error: functionName + ' not defined or not a function' });\n        } else {\n          for(const t of tests){\n            try {\n              const args = [];\n              // Support single param object or multiple params\n              if(t && t.input && typeof t.input === 'object' && !Array.isArray(t.input)) {\n                // If the function expects (nums, target) style, detect keys order heuristically\n                if('nums' in t.input && 'target' in t.input){ args.push(t.input.nums, t.input.target); }\n                else if('arr' in t.input){ args.push(t.input.arr); }\n                else if('s' in t.input){ args.push(t.input.s); }\n                else { args.push(t.input); }\n              } else if(Array.isArray(t.input)) {\n                args.push(...t.input);\n              } else {\n                args.push(t.input);\n              }\n              const got = exported.apply(null, args);\n              const pass = safeStringify(got) === safeStringify(t.expected);\n              results.push({ description: t.description || '', input:t.input, expected:t.expected, got, passed: pass });\n            } catch(err){\n              results.push({ description: t.description || '', input:t.input, expected:t.expected, error: String(err), passed:false });\n            }\n          }\n        }\n      } catch(err){\n        results.push({ passed:false, error: String(err) });\n      }\n      try { parent.postMessage({ type:'interview-results', results }, '*'); } catch(e){}\n    }\n  });\n})();\n</script>\n</body></html>`;
}

const InterviewRunner = ({
  isDark = false,
  starterCode = '',
  tests = [],
  functionName = 'solution',
  onResults = () => {},
}) => {
  const [code, setCode] = useState(starterCode || '');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef(null);
  const sandboxUrl = useMemo(() => {
    const html = createSandboxHtml();
    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, []);

  useEffect(() => {
    return () => { if (sandboxUrl) URL.revokeObjectURL(sandboxUrl); };
  }, [sandboxUrl]);

  useEffect(() => {
    const handler = (ev) => {
      if (!ev || !ev.data) return;
      if (ev.data.type === 'interview-results') {
        const results = ev.data.results || [];
        setTestResults(results);
        onResults(results);
        setIsRunning(false);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onResults]);

  useEffect(() => {
    // If starter code changes (new question), reset editor
    setCode(starterCode || '');
    setTestResults([]);
  }, [starterCode]);

  const runTests = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    setIsRunning(true);
    setTestResults([]);
    // reload to clear state
    iframe.src = sandboxUrl;
    const send = () => {
      iframe.contentWindow.postMessage({ type: 'run-tests', code, tests, functionName }, '*');
    };
    setTimeout(send, 50);
  }, [code, tests, functionName, sandboxUrl]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`${isDark ? 'bg-[#0b0f17]' : 'bg-white'} p-2`}>
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-semibold">Editor</h3>
            <button 
              onClick={runTests} 
              disabled={isRunning}
              className="px-3 py-1.5 rounded-md bg-primary text-white text-sm hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? 'Running...' : 'Run Tests ▶'}
            </button>
          </div>
          <CodeMirror
            value={code}
            height="400px"
            theme={isDark ? oneDark : undefined}
            extensions={[javascript({ jsx: true })]}
            basicSetup={{ lineNumbers: true }}
            onChange={(val) => setCode(val)}
          />
        </div>
        <div className={`${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} p-3`}>
          <h3 className="text-sm font-semibold pb-2">Test Results</h3>
          <div className="space-y-2 overflow-y-auto max-h-[400px]">
            {isRunning && (
              <div className="text-sm opacity-70">Running tests...</div>
            )}
            {!isRunning && testResults.length === 0 && (
              <div className="text-sm opacity-70">Click "Run Tests" to see results</div>
            )}
            {testResults.map((result, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded border ${
                  result.passed 
                    ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700' 
                    : 'bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs font-semibold">
                    Test {idx + 1}: {result.description || 'Unnamed'}
                  </span>
                  <span className={`text-xs font-bold ${
                    result.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {result.passed ? '✓ PASS' : '✗ FAIL'}
                  </span>
                </div>
                <div className="text-xs space-y-1">
                  <div><strong>Input:</strong> {JSON.stringify(result.input)}</div>
                  <div><strong>Expected:</strong> {JSON.stringify(result.expected)}</div>
                  {result.error ? (
                    <div className="text-red-600 dark:text-red-400"><strong>Error:</strong> {result.error}</div>
                  ) : (
                    <div><strong>Got:</strong> {JSON.stringify(result.got)}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Hidden iframe for test execution */}
          <iframe
            ref={iframeRef}
            title="interview-sandbox"
            className="hidden"
            sandbox="allow-scripts"
            src={sandboxUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewRunner;