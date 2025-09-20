import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../store/auth';
import { 
  Play, 
  Square, 
  Save, 
  Download, 
  Upload, 
  Settings, 
  Plus, 
  X,
  FileText,
  Terminal,
  Code,
  Loader
} from 'lucide-react';

// Default code templates for different languages
const DEFAULT_CODE = {
  javascript: `// Welcome to Codify IDE!
// JavaScript playground with AI autocomplete

function greetUser(name) {
  return \`Hello, \${name}! Welcome to Codify IDE.\`;
}

const message = greetUser('Developer');
console.log(message);

// Try writing some code and use Ctrl+Space for AI suggestions
`,
  python: `# Welcome to Codify IDE!
# Python playground with AI autocomplete

def greet_user(name):
    return f"Hello, {name}! Welcome to Codify IDE."

def main():
    message = greet_user("Developer")
    print(message)
    
    # Try writing some code here
    numbers = [1, 2, 3, 4, 5]
    squared = [x**2 for x in numbers]
    print(f"Squared numbers: {squared}")

if __name__ == "__main__":
    main()
`,
  cpp: `#include <iostream>
#include <string>
#include <vector>

// Welcome to Codify IDE!
// C++ playground with AI autocomplete

std::string greetUser(const std::string& name) {
    return "Hello, " + name + "! Welcome to Codify IDE.";
}

int main() {
    std::string message = greetUser("Developer");
    std::cout << message << std::endl;
    
    // Try writing some code here
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    std::cout << "Numbers: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
`,
  java: `public class Main {
    // Welcome to Codify IDE!
    // Java playground with AI autocomplete
    
    public static String greetUser(String name) {
        return "Hello, " + name + "! Welcome to Codify IDE.";
    }
    
    public static void main(String[] args) {
        String message = greetUser("Developer");
        System.out.println(message);
        
        // Try writing some code here
        int[] numbers = {1, 2, 3, 4, 5};
        
        System.out.print("Numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
`
};

// Language configuration
const LANGUAGES = {
  javascript: { label: 'JavaScript', monacoId: 'javascript', icon: '🟨' },
  python: { label: 'Python', monacoId: 'python', icon: '🐍' },
  cpp: { label: 'C++', monacoId: 'cpp', icon: '⚡' },
  java: { label: 'Java', monacoId: 'java', icon: '☕' }
};

const InBrowserIDE = ({ 
  initialLanguage = 'javascript', 
  initialCode = null,
  height = '600px',
  onSave = null 
}) => {
  const { theme, isDark } = useTheme();
  const { API, authorizationToken, isLoggedIn } = useAuth();
  
  // State management
  const [files, setFiles] = useState([
    {
      id: 'main',
      name: 'main',
      language: initialLanguage,
      code: initialCode || DEFAULT_CODE[initialLanguage],
      saved: true
    }
  ]);
  const [activeFileId, setActiveFileId] = useState('main');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [isOutputVisible, setIsOutputVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  
  const editorRef = useRef(null);
  const outputRef = useRef(null);

  const activeFile = files.find(file => file.id === activeFileId);
  const language = LANGUAGES[activeFile?.language] || LANGUAGES.javascript;

  // Monaco Editor configuration
  const editorOptions = {
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    automaticLayout: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    parameterHints: { enabled: true },
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2,
    insertSpaces: true,
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true
    }
  };

  // Handle editor mount
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = { editor, monaco };
    
    // Set up AI autocomplete provider
    monaco.languages.registerCompletionItemProvider(language.monacoId, {
      provideCompletionItems: async (model, position) => {
        try {
          const suggestions = await getAISuggestions(
            model.getValue(),
            position,
            activeFile.language
          );
          return { suggestions };
        } catch (error) {
          console.warn('AI autocomplete failed:', error);
          return { suggestions: [] };
        }
      }
    });

    // Set up theme
    if (isDark) {
      monaco.editor.setTheme('vs-dark');
    } else {
      monaco.editor.setTheme('vs-light');
    }
  };

  // AI Autocomplete function (placeholder - to be replaced with actual API)
  const getAISuggestions = async (code, position, language) => {
    // For now, return basic suggestions - this will be enhanced with actual AI API
    const basicSuggestions = {
      javascript: [
        { label: 'console.log', kind: 1, insertText: 'console.log(${1:value})' },
        { label: 'function', kind: 1, insertText: 'function ${1:name}(${2:params}) {\n\t${3}\n}' },
        { label: 'if', kind: 1, insertText: 'if (${1:condition}) {\n\t${2}\n}' },
        { label: 'for', kind: 1, insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t${3}\n}' }
      ],
      python: [
        { label: 'print', kind: 1, insertText: 'print(${1:value})' },
        { label: 'def', kind: 1, insertText: 'def ${1:function_name}(${2:params}):\n\t${3:pass}' },
        { label: 'if', kind: 1, insertText: 'if ${1:condition}:\n\t${2:pass}' },
        { label: 'for', kind: 1, insertText: 'for ${1:item} in ${2:iterable}:\n\t${3:pass}' }
      ],
      cpp: [
        { label: 'cout', kind: 1, insertText: 'std::cout << ${1:value} << std::endl;' },
        { label: 'cin', kind: 1, insertText: 'std::cin >> ${1:variable};' },
        { label: 'if', kind: 1, insertText: 'if (${1:condition}) {\n\t${2}\n}' },
        { label: 'for', kind: 1, insertText: 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${3}\n}' }
      ]
    };

    return basicSuggestions[language] || [];
  };

  // Handle code changes
  const handleCodeChange = (value) => {
    setFiles(prev => prev.map(file => 
      file.id === activeFileId 
        ? { ...file, code: value, saved: false }
        : file
    ));
  };

  // Run code function
  const runCode = async () => {
    if (!activeFile) return;
    
    setIsRunning(true);
    setOutput('Running code...\n');
    setIsOutputVisible(true);

    try {
      // For now, we'll use a simple sandbox for JavaScript
      if (activeFile.language === 'javascript') {
        await runJavaScript(activeFile.code);
      } else {
        // For other languages, we'll need to implement backend execution
        setOutput(`Code execution for ${language.label} will be implemented with backend API.\n\nCode:\n${activeFile.code}`);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // JavaScript execution in sandbox
  const runJavaScript = (code) => {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      const script = `
        <script>
          const originalLog = console.log;
          const originalError = console.error;
          const logs = [];
          
          console.log = (...args) => {
            logs.push(['log', ...args]);
            originalLog(...args);
          };
          
          console.error = (...args) => {
            logs.push(['error', ...args]);
            originalError(...args);
          };
          
          try {
            ${code}
          } catch (error) {
            logs.push(['error', error.toString()]);
          }
          
          parent.postMessage({ logs }, '*');
        </script>
      `;

      const handleMessage = (event) => {
        if (event.data && event.data.logs) {
          const output = event.data.logs.map(([type, ...args]) => {
            const prefix = type === 'error' ? '[ERROR] ' : '';
            return prefix + args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
          }).join('\n');
          
          setOutput(output || 'Code executed successfully (no output)');
          document.body.removeChild(iframe);
          window.removeEventListener('message', handleMessage);
          resolve();
        }
      };

      window.addEventListener('message', handleMessage);
      iframeDoc.write(script);
      iframeDoc.close();

      // Timeout after 5 seconds
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          setOutput('Execution timed out (5 seconds limit)');
          document.body.removeChild(iframe);
          window.removeEventListener('message', handleMessage);
          resolve();
        }
      }, 5000);
    });
  };

  // Save file function
  const saveFile = async () => {
    if (!isLoggedIn || !activeFile) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`${API}/api/ide/snippets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken
        },
        body: JSON.stringify({
          fileName: activeFile.name,
          language: activeFile.language,
          code: activeFile.code,
          title: `${activeFile.name}.${activeFile.language === 'cpp' ? 'cpp' : activeFile.language === 'java' ? 'java' : activeFile.language === 'python' ? 'py' : 'js'}`,
          isPublic: false
        })
      });

      if (response.ok) {
        const data = await response.json();
        setFiles(prev => prev.map(file => 
          file.id === activeFileId 
            ? { ...file, saved: true, snippetId: data.snippet._id }
            : file
        ));
        setOutput(prev => prev + '\n✅ Code saved successfully!');
      } else {
        const error = await response.json();
        setOutput(prev => prev + `\n❌ Save failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
      setOutput(prev => prev + `\n❌ Save failed: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Add new file
  const addNewFile = () => {
    const newId = Date.now().toString();
    const newFile = {
      id: newId,
      name: `file_${files.length + 1}`,
      language: 'javascript',
      code: DEFAULT_CODE.javascript,
      saved: false
    };
    
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newId);
  };

  // Close file
  const closeFile = (fileId) => {
    if (files.length <= 1) return; // Don't close last file
    
    const newFiles = files.filter(file => file.id !== fileId);
    setFiles(newFiles);
    
    if (activeFileId === fileId) {
      setActiveFileId(newFiles[0].id);
    }
  };

  // Change language
  const changeLanguage = (newLanguage) => {
    setFiles(prev => prev.map(file => 
      file.id === activeFileId 
        ? { ...file, language: newLanguage, code: DEFAULT_CODE[newLanguage], saved: false }
        : file
    ));
  };

  return (
    <div className={`h-full ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'} rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700`}>
      {/* Toolbar */}
      <div className={`flex items-center justify-between p-3 border-b ${isDark ? 'border-gray-700 bg-dark-bg-secondary' : 'border-gray-200 bg-light-bg-secondary'}`}>
        <div className="flex items-center space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? <Loader className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          
          {isLoggedIn && (
            <button
              onClick={saveFile}
              disabled={isSaving || activeFile?.saved}
              className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={activeFile?.language || 'javascript'}
            onChange={(e) => changeLanguage(e.target.value)}
            className={`px-2 py-1 rounded border ${isDark ? 'bg-dark-bg-primary border-gray-600 text-dark-text-primary' : 'bg-white border-gray-300'}`}
          >
            {Object.entries(LANGUAGES).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.icon} {lang.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setIsOutputVisible(!isOutputVisible)}
            className={`p-2 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            title="Toggle Output"
          >
            <Terminal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* File tabs */}
      <div className={`flex items-center space-x-1 px-3 py-2 border-b overflow-x-auto ${isDark ? 'border-gray-700 bg-dark-bg-tertiary' : 'border-gray-200 bg-light-bg-tertiary'}`}>
        {files.map(file => (
          <div
            key={file.id}
            className={`flex items-center space-x-2 px-3 py-1 rounded-t-md cursor-pointer min-w-max ${
              file.id === activeFileId 
                ? isDark ? 'bg-dark-bg-primary border-primary' : 'bg-white border-primary'
                : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            onClick={() => setActiveFileId(file.id)}
          >
            <FileText className="h-3 w-3" />
            <span className="text-sm">
              {LANGUAGES[file.language]?.icon} {file.name}.{file.language === 'cpp' ? 'cpp' : file.language === 'java' ? 'java' : file.language === 'python' ? 'py' : 'js'}
              {!file.saved && <span className="text-orange-500 ml-1">•</span>}
            </span>
            {files.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file.id);
                }}
                className="hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        
        <button
          onClick={addNewFile}
          className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          title="Add new file"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex h-full" style={{ height: height }}>
        {/* Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language={language.monacoId}
            value={activeFile?.code || ''}
            theme={isDark ? 'vs-dark' : 'vs-light'}
            onChange={handleCodeChange}
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>

        {/* Output panel */}
        {isOutputVisible && (
          <div className={`w-1/3 border-l ${isDark ? 'border-gray-700 bg-dark-bg-secondary' : 'border-gray-200 bg-light-bg-secondary'}`}>
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold flex items-center space-x-2">
                <Terminal className="h-4 w-4" />
                <span>Output</span>
              </h3>
            </div>
            <div className="p-3 h-full overflow-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">{output || 'Run your code to see output here...'}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InBrowserIDE;
