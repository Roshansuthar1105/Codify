import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

// Enhanced sandbox with better error handling and performance tracking
function createSandboxHtml() {
  return `<!doctype html>
<html><head><meta charset="utf-8">
<style>
html,body{margin:0;padding:0;font-family:ui-monospace,monospace;font-size:12px;background:#1e1e1e;color:#d4d4d4;}
#output{padding:12px;}
.test-result{margin:8px 0;padding:8px;border-radius:4px;border-left:4px solid;}
.pass{background:#1a2f1a;border-color:#4caf50;}
.fail{background:#2f1a1a;border-color:#f44336;}
.test-header{font-weight:bold;margin-bottom:4px;}
.test-detail{margin-left:8px;font-size:11px;opacity:0.8;}
</style>
</head>
<body>
<div id="output"></div>
<script>
(function(){
  const outputEl = document.getElementById('output');
  const safeStringify = (v)=>{ 
    try { 
      if(v === undefined) return 'undefined';
      if(v === null) return 'null';
      return JSON.stringify(v); 
    } catch(e){ 
      return String(v); 
    } 
  };
  
  window.addEventListener('message', async (ev)=>{
    if(!ev || !ev.data || ev.data.type !== 'run-tests') return;
    
    const { code, tests, functionName } = ev.data;
    const results = [];
    const startTime = performance.now();
    
    try {
      // Execute code and extract function
      const fn = new Function(code + ";return (typeof " + functionName + " !== 'undefined') ? " + functionName + " : undefined;");
      const exported = fn();
      
      if(typeof exported !== 'function'){
        results.push({ 
          passed:false, 
          error: functionName + ' is not defined or not a function',
          executionTime: 0
        });
      } else {
        // Run each test case
        for(let i = 0; i < tests.length; i++){
          const t = tests[i];
          const testStart = performance.now();
          
          try {
            const args = [];
            // Smart argument parsing
            if(t && t.input && typeof t.input === 'object' && !Array.isArray(t.input)) {
              // Detect parameter structure
              if('nums' in t.input && 'target' in t.input){ 
                args.push(t.input.nums, t.input.target); 
              }
              else if('arr' in t.input){ args.push(t.input.arr); }
              else if('s' in t.input){ args.push(t.input.s); }
              else if('head' in t.input){ args.push(t.input.head); }
              else if('root' in t.input){ args.push(t.input.root); }
              else { args.push(t.input); }
            } else if(Array.isArray(t.input)) {
              args.push(...t.input);
            } else {
              args.push(t.input);
            }
            
            const got = exported.apply(null, args);
            const testEnd = performance.now();
            const executionTime = (testEnd - testStart).toFixed(2);
            const pass = safeStringify(got) === safeStringify(t.expected);
            
            results.push({ 
              description: t.description || 'Test ' + (i+1), 
              input: t.input, 
              expected: t.expected, 
              got, 
              passed: pass,
              executionTime: parseFloat(executionTime)
            });
          } catch(err){
            const testEnd = performance.now();
            results.push({ 
              description: t.description || 'Test ' + (i+1), 
              input: t.input, 
              expected: t.expected, 
              error: String(err), 
              passed: false,
              executionTime: (testEnd - testStart).toFixed(2)
            });
          }
        }
      }
    } catch(err){
      results.push({ 
        passed: false, 
        error: 'Syntax Error: ' + String(err),
        executionTime: 0
      });
    }
    
    const totalTime = (performance.now() - startTime).toFixed(2);
    
    // Send results back to parent
    try { 
      parent.postMessage({ 
        type: 'interview-results', 
        results,
        totalExecutionTime: parseFloat(totalTime)
      }, '*'); 
    } catch(e){ console.error('Failed to send results:', e); }
  });
})();
</script>
</body></html>`;
}

const InterviewRunnerPro = ({
  isDark = false,
  starterCode = '',
  tests = [],
  functionName = 'solution',
  onResults = () => {},
}) => {
  const [code, setCode] = useState(starterCode || '');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTab, setSelectedTab] = useState('testcases');
  const [totalExecutionTime, setTotalExecutionTime] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const sandboxUrl = useMemo(() => {
    const html = createSandboxHtml();
    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, []);

  useEffect(() => {
    return () => { 
      if (sandboxUrl) URL.revokeObjectURL(sandboxUrl);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sandboxUrl]);

  useEffect(() => {
    const handler = (ev) => {
      if (!ev || !ev.data) return;
      if (ev.data.type === 'interview-results') {
        const results = ev.data.results || [];
        const execTime = ev.data.totalExecutionTime || 0;
        
        setTestResults(results);
        setTotalExecutionTime(execTime);
        onResults(results);
        setIsRunning(false);
        
        // Clear timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        // Add to console
        const passed = results.filter(r => r.passed).length;
        const total = results.length;
        setConsoleOutput(prev => [...prev, {
          type: passed === total ? 'success' : 'error',
          message: `Tests completed: ${passed}/${total} passed in ${execTime}ms`,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onResults]);

  useEffect(() => {
    setCode(starterCode || '');
    setTestResults([]);
    setConsoleOutput([]);
  }, [starterCode]);

  const runTests = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      console.error('Iframe not ready');
      return;
    }
    
    setIsRunning(true);
    setTestResults([]);
    setConsoleOutput(prev => [...prev, {
      type: 'info',
      message: 'Running tests...',
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    // Set timeout to prevent infinite loading
    timeoutRef.current = setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput(prev => [...prev, {
        type: 'error',
        message: 'Test execution timed out (5s limit)',
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 5000);
    
    // Reload iframe and send message
    iframe.src = sandboxUrl;
    
    // Wait for iframe to load before sending message
    iframe.onload = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow.postMessage({ 
            type: 'run-tests', 
            code, 
            tests, 
            functionName 
          }, '*');
        } catch (e) {
          console.error('Failed to send message to iframe:', e);
          setIsRunning(false);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
      }, 100);
    };
  }, [code, tests, functionName, sandboxUrl]);

  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = testResults.length;
  const allPassed = totalTests > 0 && passedTests === totalTests;

  return (
    <div className="h-full flex flex-col">
      {/* Header with stats */}
      <div className={`flex items-center justify-between p-3 border-b ${
        isDark ? 'bg-[#1e1e1e] border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold">Code Editor</h3>
          {testResults.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-1 rounded ${
                allPassed 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {passedTests}/{totalTests} Passed
              </span>
              <span className={`text-gray-600 dark:text-gray-400`}>
                ⚡ {totalExecutionTime}ms
              </span>
            </div>
          )}
        </div>
        <button 
          onClick={runTests} 
          disabled={isRunning}
          className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Running...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>▶</span> Run Code
            </span>
          )}
        </button>
      </div>

      {/* Code Editor */}
      <div className={`flex-1 ${isDark ? 'bg-[#0d1117]' : 'bg-white'}`}>
        <CodeMirror
          value={code}
          height="100%"
          theme={isDark ? oneDark : undefined}
          extensions={[
            javascript({ jsx: true }),
          ]}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: true,
            autocompletion: true,
            closeBrackets: true,
            bracketMatching: true,
            syntaxHighlighting: true,
          }}
          onChange={(val) => setCode(val)}
          className="h-full"
        />
      </div>

      {/* Bottom Panel with Tabs */}
      <div className={`border-t ${isDark ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
        {/* Tab Headers */}
        <div className={`flex gap-1 px-2 pt-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {['testcases', 'console'].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === tab
                  ? isDark 
                    ? 'bg-[#0d1117] text-white border-t border-x border-gray-700' 
                    : 'bg-white text-gray-900 border-t border-x border-gray-200'
                  : isDark
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'testcases' ? `Test Cases ${testResults.length > 0 ? `(${passedTests}/${totalTests})` : ''}` : 'Console'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="h-64 overflow-y-auto p-3">
          {selectedTab === 'testcases' && (
            <div className="space-y-2">
              {isRunning && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Executing test cases...
                </div>
              )}
              {!isRunning && testResults.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-8">
                  <div className="text-4xl mb-2">🚀</div>
                  <p>Click "Run Code" to execute your solution</p>
                </div>
              )}
              {testResults.map((result, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg border-2 transition-all ${
                    result.passed 
                      ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700' 
                      : 'bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">
                      {result.description}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {result.executionTime}ms
                      </span>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                        result.passed 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }`}>
                        {result.passed ? '✓ PASS' : '✗ FAIL'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs space-y-1 font-mono">
                    <div className="flex gap-2">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold min-w-[70px]">Input:</span>
                      <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>
                        {JSON.stringify(result.input)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600 dark:text-gray-400 font-semibold min-w-[70px]">Expected:</span>
                      <span className="text-green-600 dark:text-green-400">
                        {JSON.stringify(result.expected)}
                      </span>
                    </div>
                    {result.error ? (
                      <div className="flex gap-2">
                        <span className="text-gray-600 dark:text-gray-400 font-semibold min-w-[70px]">Error:</span>
                        <span className="text-red-600 dark:text-red-400">
                          {result.error}
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <span className="text-gray-600 dark:text-gray-400 font-semibold min-w-[70px]">Output:</span>
                        <span className={result.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {JSON.stringify(result.got)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedTab === 'console' && (
            <div className="space-y-1 font-mono text-xs">
              {consoleOutput.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  <div className="text-2xl mb-2">💬</div>
                  <p>Console output will appear here</p>
                </div>
              ) : (
                consoleOutput.map((log, idx) => (
                  <div key={idx} className={`p-2 rounded ${
                    log.type === 'success' ? 'text-green-600 dark:text-green-400' :
                    log.type === 'error' ? 'text-red-600 dark:text-red-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    <span className="opacity-60">[{log.timestamp}]</span> {log.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
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
  );
};

export default InterviewRunnerPro;
