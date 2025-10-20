import { useEffect, useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import axios from "axios";
import PropTypes from "prop-types";

const languageConfig = {
  javascript: {
    id: 93,
    extension: javascript({ jsx: true }),
    defaultCode: `// Client-side JS does not support stdin.\nconsole.log("Hello, JavaScript!");`,
    executionModel: "client",
  },
  python: {
    id: 71,
    extension: python(),
    defaultCode: `# Read a line from input and print it\nname = input()\nprint(f"Hello, {name}!")`,
    executionModel: "server",
  },
  cpp: {
    id: 54,
    extension: cpp(),
    defaultCode: `// Read a line from input and print it
#include <iostream>
#include <string>

int main() {
    std::string name;
    std::cout << "Enter your name: ";
    std::getline(std::cin, name);
    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}`,
    executionModel: "server",
  },
  c: {
    id: 50,
    extension: cpp(),
    defaultCode: `// Reads up to 49 characters from input
#include <stdio.h>

int main() {
    char name[50];
    printf("Enter your name: ");
    fgets(name, 50, stdin);
    printf("Hello, %s", name);
    return 0;
}`,
    executionModel: "server",
  },
};

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

const UniversalCodePlayground = ({
  defaultLanguage = "javascript",
  isDark = true,
  height = "400px",
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(languageConfig[defaultLanguage].defaultCode);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stdin, setStdin] = useState("");

  const config = languageConfig[currentLanguage];

  useEffect(() => {
    setCode(languageConfig[currentLanguage].defaultCode);
    setOutput("");
    setStdin("");
  }, [currentLanguage]);

  const iframeRef = useRef(null);
  const sandboxUrl = useMemo(() => {
    if (config.executionModel !== "client") return null;
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
      data: {
        language_id: config.id,
        source_code: code,
        stdin: stdin,
      },
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

  // Helper function to format language name for display
  const formatLanguageName = (lang) => {
    return lang.charAt(0).toUpperCase() + lang.slice(1).replace("pp", "++");
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-[#3a414e] p-2 flex items-center gap-4 border-b border-gray-700">
        <span className="text-white text-sm font-semibold">Language:</span>

        {/* Desktop tabs - hidden on small screens */}
        <div className="hidden md:flex items-center gap-2">
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
              {formatLanguageName(lang)}
            </button>
          ))}
        </div>

        {/* Mobile dropdown - visible only on small screens */}
        <div className="md:hidden relative">
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            className="px-3 py-1 text-sm rounded-md bg-gray-700 text-gray-300 appearance-none pr-8"
          >
            {Object.keys(languageConfig).map((lang) => (
              <option
                key={lang}
                value={lang}
                className="bg-gray-700 text-gray-300"
              >
                {formatLanguageName(lang)}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Editor & Input Pane */}
        <div className="p-2 bg-[#0b0f17] flex flex-col">
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
            className="cursor-text flex-grow"
            value={code}
            height={height}
            theme={oneDark}
            extensions={[config.extension]}
            basicSetup={{ lineNumbers: true }}
            onChange={(val) => setCode(val)}
          />
          {/* NEW: Input (stdin) Text Area */}
          {config.executionModel === "server" && (
            <div className="mt-2">
              <h3 className="text-sm font-semibold pb-2 text-white">
                Input (stdin)
              </h3>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Enter input here, each line for each input() call."
                className="w-full h-24 p-2 rounded border border-gray-700 bg-[#020617] text-white text-sm whitespace-pre-wrap"
              />
            </div>
          )}
        </div>
        {/* Output Pane */}
        <div className="p-2 bg-[#1e293b] flex flex-col">
          <h3 className="text-sm font-semibold pb-2 text-white">Output</h3>
          <div className="flex-grow">
            {config.executionModel === "client" ? (
              <iframe
                ref={iframeRef}
                title="playground-sandbox"
                className="w-full h-full rounded border border-gray-700"
                style={{ minHeight: height }}
                sandbox="allow-scripts"
                src={sandboxUrl}
              />
            ) : (
              <pre
                className="w-full h-full p-2 rounded border border-gray-700 bg-[#020617] text-white text-sm whitespace-pre-wrap overflow-auto"
                style={{ minHeight: height }}
              >
                {output}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

UniversalCodePlayground.propTypes = {
  defaultLanguage: PropTypes.string,
  isDark: PropTypes.bool,
  height: PropTypes.string,
};

export default UniversalCodePlayground;
