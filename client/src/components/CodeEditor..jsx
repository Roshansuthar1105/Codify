import React, { useEffect, useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { keymap } from "@codemirror/view";
import axios from "axios";

// LANGUAGE CONFIGURATION
const languageConfig = {
  javascript: {
    id: 93,
    extension: javascript({ jsx: true }),
    defaultCode: `// Welcome to the JavaScript Playground!\n// Code here runs directly in your browser.\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('Codify'));`,
    executionModel: "client",
  },
  python: {
    id: 71,
    extension: python(),
    defaultCode: `# Welcome to the Python Playground!\n# This code runs on a secure server.\n\ndef greet(name):\n  return f"Hello, {name}!"\n\nprint(greet("Codify"))`,
    executionModel: "server",
  },
  cpp: {
    id: 54,
    extension: cpp(),
    defaultCode: `// Welcome to the C++ Playground!\n// This code is compiled and run on a secure server.\n\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!";\n    return 0;\n}`,
    executionModel: "server",
  },
  c: {
    id: 50,
    extension: cpp(),
    defaultCode: `// Welcome to the C Playground!\n// This code is compiled and run on a secure server.\n\n#include <stdio.h>\n\nint main() {\n    printf("Hello, C!");\n    return 0;\n}`,
    executionModel: "server",
  },
};

// HELPER FUNCTION FOR JAVASCRIPT SANDBOX

function createSandboxHtml(isDark) {
  const styles = isDark
    ? `html,body{margin:0;padding:8px;background:#020617;color:#fff;font-family:ui-sans-serif,system-ui;}`
    : `html,body{margin:0;padding:8px;color:#333;font-family:ui-sans-serif,system-ui;}`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>${styles}</style></head><body><pre id="output" style="white-space:pre-wrap"></pre><script>
(function(){
  const outputEl = document.getElementById('output');
  const write = (msg, type='log') => {
    const line = document.createElement('div');
    line.textContent = msg;
    if(type==='error'){ line.style.color = '#ef4444'; }
    outputEl.appendChild(line);
  };
  const log = (...args) => {
    const formattedArgs = args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
      catch(e) { return String(a); }
    });
    write(formattedArgs.join(' '));
  };
  console.log = log; console.error = (...args) => write(String(...args), 'error'); console.warn = log;
  window.addEventListener('message', (ev) => {
    if (ev.data.type === "clear-console") {
      outputEl.innerHTML = ""; 
    }
    if(!ev || !ev.data || ev.data.type !== 'run-code') return;
    outputEl.innerHTML = '';
    try {
      const fn = new Function(ev.data.code);
      const result = fn();
      if(result !== undefined){ log(result); }
    } catch(err) {
      write(String(err), 'error');
    }
  });
})();
</script></body></html>`;
}

// Code Editor

const UniversalCodePlayground = ({
  defaultLanguage = "javascript",
  isDark = true,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(languageConfig[defaultLanguage].defaultCode);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const config = languageConfig[currentLanguage];

  useEffect(() => {
    setCode(languageConfig[currentLanguage].defaultCode);
    setOutput("");
  }, [currentLanguage]);

  const iframeRef = useRef(null);
  const sandboxUrl = useMemo(() => {
    if (config.executionModel !== "client") return null;
    // CHANGED: Pass the `isDark` prop to the sandbox creator
    const html = createSandboxHtml(isDark);
    const blob = new Blob([html], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, [config.executionModel, isDark]);

  const runCode = async () => {
    if (config.executionModel === "client") {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;
      iframe.src = sandboxUrl;
      const send = () =>
        iframe.contentWindow.postMessage({ type: "run-code", code }, "*");
      setTimeout(send, 50);
      return;
    }
    setIsLoading(true);
    setOutput("Executing...");
    const API_KEY =
      import.meta.env.VITE_RAPIDAPI_KEY || "YOUR_RAPIDAPI_KEY_HERE";
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: { language_id: config.id, source_code: code },
    };
    try {
      const submissionResponse = await axios.request(options);
      const token = submissionResponse.data.token;
      setTimeout(async () => {
        try {
          const resultResponse = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
            {
              headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
              },
            }
          );
          const result = resultResponse.data;
          if (result.stdout) setOutput(result.stdout);
          else if (result.stderr) setOutput(`Error:\n${result.stderr}`);
          else if (result.compile_output)
            setOutput(`Compilation Error:\n${result.compile_output}`);
          else setOutput("Execution finished with no output.");
        } catch (err) {
          setOutput(`Error fetching result: ${err.message}`);
        } finally {
          setIsLoading(false);
        }
      }, 3000);
    } catch (error) {
      setOutput(
        `API request error: ${error.response?.data?.message || error.message}`
      );
      setIsLoading(false);
    }
  };

  //clear console
  const clearConsole = () => {
    if (
      config.executionModel === "client" &&
      iframeRef.current?.contentWindow
    ) {
      // Tell the iframe to clear itself
      iframeRef.current.contentWindow.postMessage(
        { type: "clear-console" },
        "*"
      );
      console.log("My output");
    } else {
      // For server languages: just clear the React state
      setOutput("");
    }
  };

  // shortCut Key for clear console -> ctrl + i
  useEffect(() =>{
    function handle(e){
      if(e.ctrlKey && e.key === 'i'){
        e.preventDefault();
        clearConsole();
      }
    }
    window.addEventListener("keydown" , handle);
    return () => window.removeEventListener("keydown" , handle);
  },[clearConsole]);

  //shortCut key for run code --> ctrl + enter
  useEffect(() => {
    function handleKey(e) {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [runCode]);

  const ctrlEnterKeymap = keymap.of([
    {
      key: "Ctrl-Enter", // for windows
      run: () => {
        runCode();
        return true;
      },
    },
    {
      key: "Cmd-Enter", // for macOS
      run: () => {
        runCode();
        return true;
      },
    },
  ]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-[#3a414e] p-2 flex items-center gap-4 border-b border-gray-700">
        <span className="text-white text-sm font-semibold">Language:</span>
        {Object.keys(languageConfig).map((lang) => (
          <button
            key={lang}
            onClick={() => setCurrentLanguage(lang)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentLanguage === lang
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1).replace("pp", "++")}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-2 bg-[#0b0f17]">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-semibold capitalize text-white">
              {currentLanguage.replace("pp", "++")} Editor
            </h3>
            <button
              onClick={runCode}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 disabled:bg-gray-500"
            >
              {isLoading ? "Running..." : "Run "}
            </button>
          </div>
          <CodeMirror
            //Added className to change the cursor
            className="cursor-text"
            value={code}
            height="400px"
            theme={oneDark}
            extensions={[config.extension, ctrlEnterKeymap]}
            basicSetup={{ lineNumbers: true }}
            onChange={(val) => setCode(val)}
          />
        </div>
        <div className="p-2 bg-[#1e293b]">
          <h3 className="text-sm font-semibold pb-2 text-white">Output</h3>
          {config.executionModel === "client" ? (
            <iframe
              ref={iframeRef}
              title="playground-sandbox"
              className="w-full h-[400px] rounded border border-gray-700"
              sandbox="allow-scripts"
              src={sandboxUrl}
            />
          ) : (
            <pre className="w-full h-[400px] p-2 rounded border border-gray-700 bg-[#020617] text-white text-sm whitespace-pre-wrap overflow-auto">
              {output}
            </pre>
          )}
          {/* adding clear console */}
          <button
            className="px-3 py-2 m-2 font-semibold rounded-md bg-[#111720] text-white text-[16px] hover:bg-[#e63946] disabled:bg-gray-500"
            onClick={clearConsole}
          >
            Clear Console
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversalCodePlayground;
