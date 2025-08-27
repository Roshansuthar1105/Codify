import React, { useEffect, useMemo, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { c } from '@codemirror/lang-c';
import { useLoading } from './loadingContext';

const DEFAULT_CODE = `// Welcome to Codify Playground!\n// Write JavaScript here and click Run.\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconst message = greet('Codify');\nconsole.log(message);\n\n// Try editing the code above or use console.log to print results.\n`;

function createSandboxHtml() {
  return `<!doctype html>\n<html><head><meta charset="utf-8"><style>html,body{margin:0;padding:8px;font-family:ui-sans-serif,system-ui,-apple-system;}</style></head>\n<body>\n<pre id="output" style="white-space:pre-wrap"></pre>\n<script>\n(function(){\n  const outputEl = document.getElementById('output');\n  const write = (msg, type='log') => {\n    const line = document.createElement('div');\n    line.textContent = msg;\n    if(type==='error'){ line.style.color = '#ef4444'; }\n    outputEl.appendChild(line);\n  };\n  const log = (...args) => {\n    try { parent.postMessage({ type:'playground-log', payload: args.map(a=>{ try{return JSON.stringify(a);}catch(e){return String(a);} }) }, '*'); } catch(e){}\n    write(args.map(a=>{ try{return typeof a==='object'? JSON.stringify(a): String(a);}catch(e){return String(a);} }).join(' '));\n  };\n  console.log = log;\n  console.error = (...args)=>{ log(...args); };\n  console.warn = (...args)=>{ log(...args); };\n  window.addEventListener('message', (ev)=>{\n    if(!ev || !ev.data) return;\n    if(ev.data.type === 'run-code'){\n      outputEl.textContent = '';\n      try {\n        const fn = new Function(ev.data.code);\n        const result = fn();\n        if(result !== undefined){ log(result); }\n      } catch(err){\n        write(String(err), 'error');\n      }\n    }\n  });\n})();\n</script>\n</body></html>`;
}

const LANGUAGE_OPTIONS = [
  { label: 'JavaScript', value: 'javascript', extension: javascript({ jsx: true }), defaultCode: `// Welcome to Codify Playground!\n// Write JavaScript here and click Run.\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\nconst message = greet('Codify');\nconsole.log(message);` },
  { label: 'Python', value: 'python', extension: python(), defaultCode: `# Welcome to Codify Playground!\n# Write Python here and click Run.\ndef greet(name):\n    return f"Hello, {name}!"\nmessage = greet('Codify')\nprint(message)` },
  { label: 'Java', value: 'java', extension: java(), defaultCode: `// Welcome to Codify Playground!\n// Write Java here and click Run.\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Codify!");\n  }\n}` },
  { label: 'C++', value: 'cpp', extension: cpp(), defaultCode: `// Welcome to Codify Playground!\n// Write C++ here and click Run.\n#include <iostream>\nint main() {\n  std::cout << "Hello, Codify!" << std::endl;\n  return 0;\n}` },
  { label: 'C', value: 'c', extension: c(), defaultCode: `// Welcome to Codify Playground!\n// Write C here and click Run.\n#include <stdio.h>\nint main() {\n  printf("Hello, Codify!\n");\n  return 0;\n}` }
];

const CodePlayground = ({ initialCode, isDark = false }) => {
  const [language, setLanguage] = useState('javascript');
  const langConfig = LANGUAGE_OPTIONS.find(l => l.value === language);
  const [code, setCode] = useState(initialCode || langConfig.defaultCode);
  const iframeRef = useRef(null);
  const sandboxUrl = useMemo(() => {
    const html = createSandboxHtml();
    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, []);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    return () => {
      if (sandboxUrl) URL.revokeObjectURL(sandboxUrl);
    };
  }, [sandboxUrl]);

  const runCode = () => {
    setIsLoading(true);
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) {
      setIsLoading(false);
      return;
    }
    iframe.src = sandboxUrl;
    const send = () => {
      iframe.contentWindow.postMessage({ type: 'run-code', code }, '*');
      setIsLoading(false);
    };
    setTimeout(send, 50);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-sm font-semibold">Editor</h3>
        <select value={language} onChange={e => {
          setLanguage(e.target.value);
          setCode(LANGUAGE_OPTIONS.find(l => l.value === e.target.value).defaultCode);
        }} className="ml-2 px-2 py-1 rounded border">
          {LANGUAGE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button onClick={runCode} className="px-3 py-1.5 rounded-md bg-primary text-white text-sm hover:bg-primary-dark">Run ▶</button>
      </div>
      <CodeMirror
        value={code}
        height="400px"
        theme={isDark ? oneDark : undefined}
        extensions={[langConfig.extension]}
        basicSetup={{ lineNumbers: true }}
        onChange={val => setCode(val)}
      />
      {isLoading && <div className="flex items-center justify-center h-12"><span className="text-primary">Loading...</span></div>}
    </div>
  );
};

export default CodePlayground;