import React, { useEffect, useMemo, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { Moon, Sun, Copy, Share2, Download, Settings, Code2, Play, CheckCircle } from 'lucide-react';
import {toast, ToastContainer} from "react-toastify"

// Mock axios for demo (replace with actual axios in your implementation)
const axios = {
  request: (options) => Promise.resolve({ data: { token: 'demo-token-123' } }),
  get: (url, config) => Promise.resolve({
    data: {
      stdout: 'Hello, World!\nCode executed successfully!',
      stderr: null,
      compile_output: null
    }
  })
};

// LANGUAGE CONFIGURATION
const languageConfig = {
  javascript: {
    id: 93,
    extension: javascript({ jsx: true }),
    defaultCode: `// Welcome to the JavaScript Playground!\n// Code here runs directly in your browser.\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('Codify'));`,
    executionModel: 'client',
  },
  python: {
    id: 71,
    extension: python(),
    defaultCode: `# Welcome to the Python Playground!\n# This code runs on a secure server.\n\ndef greet(name):\n  return f"Hello, {name}!"\n\nprint(greet("Codify"))`,
    executionModel: 'server',
  },
  cpp: {
    id: 54,
    extension: cpp(),
    defaultCode: `// Welcome to the C++ Playground!\n// This code is compiled and run on a secure server.\n\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!";\n    return 0;\n}`,
    executionModel: 'server',
  },
  c: {
    id: 50,
    extension: cpp(),
    defaultCode: `// Welcome to the C Playground!\n// This code is compiled and run on a secure server.\n\n#include <stdio.h>\n\nint main() {\n    printf("Hello, C!");\n    return 0;\n}`,
    executionModel: 'server',
  },
};

// HELPER FUNCTION FOR JAVASCRIPT SANDBOX
function createSandboxHtml(isDark) {
  const styles = isDark
    ? `
      html, body {
        margin: 0;
        padding: 16px;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        color: #e2e8f0;
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
        font-size: 14px;
        line-height: 1.6;
      }
      #output {
        background: rgba(15, 23, 42, 0.6);
        border-radius: 8px;
        padding: 16px;
        border: 1px solid #334155;
        min-height: 350px;
      }
      .log-line {
        margin: 6px 0;
        padding: 4px 0;
        border-bottom: 1px solid rgba(51, 65, 85, 0.3);
      }
      .error-line {
        color: #f87171 !important;
        background: rgba(248, 113, 113, 0.1);
        padding: 8px 12px;
        border-radius: 6px;
        border-left: 3px solid #f87171;
        margin: 8px 0;
      }
    `
    : `
      html, body {
        margin: 0;
        padding: 16px;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        color: #334155;
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
        font-size: 14px;
        line-height: 1.6;
      }
      #output {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 8px;
        padding: 16px;
        border: 1px solid #cbd5e1;
        backdrop-filter: blur(10px);
        min-height: 350px;
      }
      .log-line {
        margin: 6px 0;
        padding: 4px 0;
        border-bottom: 1px solid rgba(203, 213, 225, 0.4);
      }
      .error-line {
        color: #dc2626 !important;
        background: rgba(220, 38, 38, 0.1);
        padding: 8px 12px;
        border-radius: 6px;
        border-left: 3px solid #dc2626;
        margin: 8px 0;
      }
    `;

  return `<!doctype html><html><head><meta charset="utf-8"><style>${styles}</style></head><body><div id="output"></div><script>
(function(){
  const outputEl = document.getElementById('output');
  let logCount = 0;
  
  const write = (msg, type='log') => {
    const line = document.createElement('div');
    line.className = type === 'error' ? 'error-line' : 'log-line';
    line.innerHTML = '<small style="opacity: 0.6;">[' + (++logCount) + ']</small> ' + msg;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  };
  
  const log = (...args) => {
    const formattedArgs = args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
      catch(e) { return String(a); }
    });
    write(formattedArgs.join(' '));
  };
  
  console.log = log; 
  console.error = (...args) => write(String(...args), 'error'); 
  console.warn = log;
  
  window.addEventListener('message', (ev) => {
    if(!ev || !ev.data || ev.data.type !== 'run-code') return;
    outputEl.innerHTML = '<div class="log-line"><strong>🚀 Executing JavaScript...</strong></div>';
    try {
      const fn = new Function(ev.data.code);
      const result = fn();
      if(result !== undefined){ log('Return value:', result); }
      write('✅ Execution completed successfully!', 'log');
    } catch(err) {
      write('❌ ' + String(err), 'error');
    }
  });
  
  write('🎉 JavaScript Console Ready! Run your code to see output.', 'log');
})();
</script></body></html>`;
}

// Code Editor Component
const UniversalCodePlayground = ({ defaultLanguage = 'javascript' }) => {
  const [isDark, setIsDark] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(languageConfig[defaultLanguage].defaultCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const config = languageConfig[currentLanguage];

  useEffect(() => {
    setCode(languageConfig[currentLanguage].defaultCode);
    setOutput('');
  }, [currentLanguage]);

  const iframeRef = useRef(null);
  const sandboxUrl = useMemo(() => {
    if (config.executionModel !== 'client') return null;
    const html = createSandboxHtml(isDark);
    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, [config.executionModel, isDark]);

  const runCode = async () => {
    if (config.executionModel === 'client') {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;
      iframe.src = sandboxUrl;
      const send = () => iframe.contentWindow.postMessage({ type: 'run-code', code }, '*');
      setTimeout(send, 50);
      return;
    }
    
    setIsLoading(true);
    setOutput('🚀 Executing code on server...\n\n');
    
    const API_KEY = 'YOUR_RAPIDAPI_KEY_HERE'; // Replace with your actual API key
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'false', fields: '*' },
      headers: { 'content-type': 'application/json', 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com' },
      data: { language_id: config.id, source_code: code },
    };
    
    try {
      const submissionResponse = await axios.request(options);
      const token = submissionResponse.data.token;
      setTimeout(async () => {
        try {
          const resultResponse = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
            { headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com' } }
          );
          const result = resultResponse.data;
          if (result.stdout) setOutput(result.stdout);
          else if (result.stderr) setOutput(`❌ Error:\n${result.stderr}`);
          else if (result.compile_output) setOutput(`⚠️ Compilation Error:\n${result.compile_output}`);
          else setOutput('✅ Execution finished with no output.');
        } catch (err) { 
          setOutput(`❌ Error fetching result: ${err.message}`); 
        }
        finally { 
          setIsLoading(false); 
        }
      }, 3000);
    } catch (error) {
      setOutput(`❌ API request error: ${error.response?.data?.message || error.message}`);
      setIsLoading(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied To Clipboard")
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const shareCode = async () => {
    const shareData = {
      title: `${currentLanguage.toUpperCase()} Code`,
      text: `Check out this ${currentLanguage} code!`,
      url: window.location.href
    };
    
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(code);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (err) {
      console.error('Failed to share code:', err);
    }
  };

  const downloadCode = () => {
    const extensions = { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' };
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playground.${extensions[currentLanguage]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Theme-based styling
  const themeStyles = isDark ? {
    container: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50 min-h-[665px]',
    header: 'bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-slate-600/50',
    editor: 'bg-black/90 border border-green-500/20 text-green-400  shadow-inner font-mono',
    output: 'bg-gradient-to-br from-black/95 to-slate-900/95 backdrop-blur-sm',
    text: 'text-slat-100',
    subtext: 'text-slate-300',
    button: 'bg-slate-700/80 text-slate-200 hover:bg-slate-600/80 border-slate-600/50',
    activeButton: 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-blue-500',
    runButton: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300',
    outputBg: 'bg-black/90 border border-green-500/20 text-green-400  shadow-inner font-mono border-2 border-white/15'
  } : {
    container: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 border-slate-200  min-h-[665px]',
    header: 'bg-white/90 border-slate-200',
    editor: 'bg-white/90 border border-slate-200 text-slate-800  shadow-inner backdrop-filter backdrop-blur-sm ',
    output: 'bg-white/90 border border-slate-200 text-slate-800  shadow-inner backdrop-filter backdrop-blur-sm ',
    text: 'text-slate-800',
    subtext: 'text-slate-600',
    button: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300',
    activeButton: 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 border-blue-400',
    runButton: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300',
    outputBg: 'bg-gradient-to-br from-slate-50/95 to-white/95 backdrop-blur-sm border-black '
  };

  return (
    <div className={`${themeStyles.container}  overflow-hidden border shadow-2xl transition-all duration-500`}>
      {/* Enhanced Header */}
      <ToastContainer
      duration="500"
    />
      <div className={`${themeStyles.header} p-4 flex flex-wrap items-center justify-between gap-4 border-b backdrop-blur-sm`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
          </div>
        </div>
     
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-400" />
            <span className={`${themeStyles.subtext} text-sm font-medium`}>Language</span>

          </div>
          
          <div className="flex gap-2 flex-wrap">
            {Object.keys(languageConfig).map((lang) => (
              <button
                key={lang}
                onClick={() => setCurrentLanguage(lang)}
                className={`px-4 py-2 text-sm font-semibold rounded-md border transition-all duration-300 transform hover:scale-105 ${
                  currentLanguage === lang ? themeStyles.activeButton : themeStyles.button
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1).replace('pp', '++')}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={copyCode}
              className={`${themeStyles.button} p-2.5 rounded-md border transition-all duration-300 hover:scale-105 relative`}
              title="Copy code"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            
            <button
              onClick={shareCode}
              className={`${themeStyles.button} p-2.5 rounded-md border transition-all duration-300 hover:scale-105`}
              title="Share code"
            >
              {shared ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            
            <button
              onClick={downloadCode}
              className={`${themeStyles.button} p-2.5 rounded-md border transition-all duration-300 hover:scale-105`}
              title="Download code"
            >
              <Download className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className={`${themeStyles.button} p-2.5 rounded-md border transition-all duration-300 hover:scale-105`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        {/* Editor Panel */}
        <div className={`${themeStyles.editor} pt-4 pb-2  pl-2 pr-2 border-r border-slate-600/30 lg:border-r backdrop-blur-sm`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`${themeStyles.text} text-lg font-bold flex items-center gap-2`}>
              <Code2 className="w-5 h-5 text-blue-500" />
              {currentLanguage.replace('pp', '++')} 
              <span className={`text-xs ${themeStyles.subtext} bg-slate-500/20 px-2 py-1 rounded-full`}>
                {config.executionModel === 'client' ? 'Browser' : 'Server'}
              </span>
            </h3>
            <button
              onClick={runCode}
              disabled={isLoading}
              className={`${themeStyles.runButton} px-2.5 py-1.5 rounded-sm font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg`}
            >
              <Play className="w-3 h-3" />
              {isLoading ? 'Running...' : 'Run'}
            </button>
          </div>
          
          <div className="rounded-md overflow-hidden border border-slate-600/30 shadow-2xl ">
            <CodeMirror
              className="cursor-text "
              value={code}
              height="455px"
              theme={isDark ? oneDark : undefined}
              extensions={[config.extension]}
              basicSetup={{ 
                lineNumbers: true,
                foldGutter: true,
                highlightSelectionMatches: true
              }}
              onChange={(val) => setCode(val)}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className={`${themeStyles.output} pt-4  border-slate-600/30 lg:border-r backdrop-blur-sm`}>
          <h3 className={`${themeStyles.text} text-lg font-bold mb-5 mt-2  flex items-center gap-2`}>
            <div className={`w-3 h-3 rounded-md  shadow-lg`}></div>
            Output
            <span className={`text-xs ${themeStyles.subtext} bg-slate-500/20 px-2 py-1 rounded-full`}>
              {config.executionModel === 'client' ? 'Live' : 'Remote'}
            </span>
          </h3>
          
          <div className="rounded-md overflow-hidden b shadow-2xl   ">
            {config.executionModel === 'client' ? (
              <iframe
                ref={iframeRef}
                title="playground-sandbox"
                className="w-full h-[450px] rounded-md bg-transparent"
                sandbox="allow-scripts"
                src={sandboxUrl}
              />
            ) : (
              <pre className={`w-full p-2 h-[450px] ${themeStyles.outputBg} text-sm whitespace-pre-wrap overflow-auto font-mono leading-relaxed rounded-md`}>
                {output || `💡 Click "Run Code" to execute your ${currentLanguage} code...\n\n🚀 Your code will be processed on our secure servers\n📊 Results will appear here in real-time`}
              </pre>
            )}
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className={`${themeStyles.header} px-4 py-2 border-t border-slate-600/30 backdrop-blur-sm`}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className={themeStyles.subtext}>
              Mode: {config.executionModel === 'client' ? '🌐 Browser' : '🖥️ Server'}
            </span>
            
          </div>
          <div className={`${themeStyles.subtext} flex items-center gap-2`}>
            <span>Ready</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalCodePlayground;