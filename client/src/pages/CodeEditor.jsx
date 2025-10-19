import UniversalCodePlayground from '../components/CodePlayground';
const CodeEditor = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Code Playground</h1>
        <p className="text-lg text-gray-500 mt-2">
          Experiment with JavaScript, Python, C++, and C. Write, compile, and run your code all in one place.
        </p>
      </div>
      
      <div>
        {/* CHANGED: Passed a new height prop to make the editor taller */}
        <UniversalCodePlayground 
          defaultLanguage="python" 
          height="25vw" 
        />
      </div>
    </div>
  );
};

export default CodeEditor;