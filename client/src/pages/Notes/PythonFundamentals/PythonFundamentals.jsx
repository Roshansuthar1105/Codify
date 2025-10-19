import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotesSidebar from '../NotesSidebar';
import PyHeroPage from './PyHeroPage';
import Loader from '../../../components/Loader';
import Breadcrumb from '../../../components/Breadcrumb';
import useMobile from '../../../hooks/useMobile';
import PyPageTitleManager from './PyPageTitleManager';
import categories from './PyTopics.json';
// Introduction
import PyIntroduction from './PyTopics/Introduction/PyIntroduction';
import PythonInstallation from './PyTopics/Introduction/PythonInstallation';
import RunningPythonCode from './PyTopics/Introduction/RunningPythonCode';

// Python Basics
import Operators from './PyTopics/PythonBasics/Operators';
import InputOutput from './PyTopics/PythonBasics/InputOutput';
import TypeCasting from './PyTopics/PythonBasics/TypeCasting';
import StringFormatting from './PyTopics/PythonBasics/StringFormatting';
import ConditionalStatements from './PyTopics/PythonBasics/ConditionalStatements';
import Loops from './PyTopics/PythonBasics/Loops';
import Functions from './PyTopics/PythonBasics/Functions';
import VariablesDataTypes from './PyTopics/PythonBasics/VariablesDataTypes';
// Object-Oriented Programming
import ClassesObjects from './PyTopics/OOP/ClassesObjects';
import Inheritance from './PyTopics/OOP/Inheritance';
import Encapsulation from './PyTopics/OOP/Encapsulation';
import Polymorphism from './PyTopics/OOP/Polymorphism';
import StaticMethods from './PyTopics/OOP/StaticMethods';
import MagicMethods from './PyTopics/OOP/MagicMethods';
import AbstractClasses from './PyTopics/OOP/AbstractClasses';
import InterfacesProtocols from './PyTopics/OOP/InterfacesProtocols';
import PropertiesAndGettersSetters from './PyTopics/OOP/PropertiesAndGettersSetters';

// Data Structures
import Strings from './PyTopics/DataStructures/Strings';


import Lists from './PyTopics/DataStructures/Lists';
import ListComprehension from './PyTopics/DataStructures/ListComprehension';
import TuplesSets from './PyTopics/DataStructures/TuplesSets';
import Dictionaries from './PyTopics/DataStructures/Dictionaries';
import NestedLoops from './PyTopics/DataStructures/NestedLoops';
import ArraysDoc from './PyTopics/DataStructures/ArraysDoc';
import StacksDoc from './PyTopics/DataStructures/StacksDoc';
import LinkedListDoc from './PyTopics/DataStructures/LinkedListDoc';
import QueuesDoc from './PyTopics/DataStructures/QueuesDoc';
import TreesAndGraphs from './PyTopics/DataStructures/TreesAndGraphs';

// Intermediate Topics
import IteratorsDoc from './PyTopics/IntermediateTopics/IteratorsDoc';
import ContextManagersDoc from './PyTopics/IntermediateTopics/ContextManagersDoc';
import  ClosuresDoc from './PyTopics/IntermediateTopics/ClosuresDoc';
import  CopyDoc  from './PyTopics/IntermediateTopics/CopyDoc';
import RecursionDoc from './PyTopics/IntermediateTopics/RecursionDoc';
import MutableImmutableDoc from './PyTopics/IntermediateTopics/MutableImmutableDoc';  
import ScopeNamespacesDoc from './PyTopics/IntermediateTopics/ScopeNamespacesDoc';
import FunctionAnnotationsDoc from './PyTopics/IntermediateTopics/FunctionAnnotationsDoc';
import ZipEnumerateRangeDoc from './PyTopics/IntermediateTopics/ZipEnumerateRangeDoc';
// Advanced Topics
import ModulesImports from './PyTopics/AdvancedTopics/ModulesImports';
import FileHandling from './PyTopics/AdvancedTopics/FileHandling';
import LambdaFunctions from './PyTopics/AdvancedTopics/LambdaFunctions';
import MapFilterReduce from './PyTopics/AdvancedTopics/MapFilterReduce';
import BuiltinFunctions from './PyTopics/AdvancedTopics/BuiltinFunctions';
import ExceptionHandling from './PyTopics/AdvancedTopics/ExceptionHandling';
import BreakContinue from './PyTopics/AdvancedTopics/BreakContinue';
import MultithreadingAndMultiprocessing from './PyTopics/AdvancedTopics/MultithreadingAndMultiprocessing';
import DecoratorsAndGenerators from './PyTopics/AdvancedTopics/DecoratorsAndGenerators';  

// Memory Management
import MemoryManagementDoc from './PyTopics/MemoryManagement/MemoryManagementDoc';
import GarbageCollectionDoc from './PyTopics/MemoryManagement/GarbageCollectionDoc';
import HeapStackMemoryDoc from './PyTopics/MemoryManagement/HeapStackMemoryDoc';
import GenerationalGarbageCollectionDoc from './PyTopics/MemoryManagement/GenerationalGarbageCollectionDoc';
import ExplicitGarbageCollectionDoc from './PyTopics/MemoryManagement/ExplicitGarbageCollectionDoc';
import MemoryProfilingToolsDoc from './PyTopics/MemoryManagement/MemoryProfilingToolsDoc';

// Python Tools & Standard
import PEP8Doc from './PyTopics/PythonToolsStandards/PEP8Doc';
import DocstringsTypeHintsDoc from './PyTopics/PythonToolsStandards/DocstringsTypeHintsDoc';
import VirtualEnvironmentsDoc from './PyTopics/PythonToolsStandards/VirtualEnvironmentsDoc';
import TestingDoc from './PyTopics/PythonToolsStandards/TestingDoc';
import PackageManagementDoc from './PyTopics/PythonToolsStandards/PackageManagementDoc';
import CodeFormattingLintingDoc from './PyTopics/PythonToolsStandards/CodeFormattingLintingDoc';








const PythonFundamentals = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMobile(768);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background grid and gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px]">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"></div>
      </div>

      <div className="flex min-h-screen relative">
        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed md:sticky top-14 sm:top-16 left-0 h-[calc(100vh-3.6rem)] sm:h-[calc(100vh-4rem)] z-30
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:w-64 w-64
        `}>
          <NotesSidebar categories={categories} title={"PYTHON NOTES"} basePath={"/notes/python"} onNavigate={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'md:ml-0'}`}>
          {/* Breadcrumb */}
          <Breadcrumb isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className={"p-4"} />

          {/* Page Title Manager */}
          <PyPageTitleManager />

          {/* ROUTES OF THE SUB NOTES */}
          <div className="p-4 md:p-8">
            <React.Suspense fallback={<Loader />}>
              <Routes>
                <Route index element={<PyHeroPage />} />
               {/* Introduction */}
                <Route path="introduction-to-python" element={<PyIntroduction />} />
                <Route path="python-installation" element={<PythonInstallation />} />
                <Route path="running-python-code" element={<RunningPythonCode />} />
                
                
                
                
                
                
                
                
                 {/* Python Basics */}
                <Route path="variables-&-data-types" element={<VariablesDataTypes />} />
                <Route path="operators" element={<Operators />} />
                <Route path="input-&-output" element={<InputOutput />} />
                <Route path="type-casting" element={<TypeCasting />} />
                <Route path="string-formatting" element={<StringFormatting />} />
                <Route path="conditional-statements" element={<ConditionalStatements />} />
                <Route path="loops" element={<Loops />} />
                <Route path="functions" element={<Functions />} />
                  
                  
                  
                  
                  
                  {/* Object-Oriented Programming */}
                <Route path="classes-&-objects" element={<ClassesObjects />} />
                <Route path="inheritance" element={<Inheritance />} />
                <Route path="encapsulation" element={<Encapsulation />} />
                <Route path="polymorphism" element={<Polymorphism />} />
                <Route path="static-methods" element={<StaticMethods />} />
                <Route path="magic-methods" element={<MagicMethods />} />
                <Route path="abstract-classes" element={<AbstractClasses />} /> 
                <Route path="interfaces-&-protocols" element={<InterfacesProtocols />} />
                <Route path="properties-&-getters-setters" element={<PropertiesAndGettersSetters />} />
                 
                 
                 
                 
                 
                 {/* Data Structures */}
                <Route path="strings" element={<Strings />} />
                <Route path="lists" element={<Lists />} />
                <Route path="list-comprehension" element={<ListComprehension />} />
                <Route path="tuples-&-sets" element={<TuplesSets />} />
                <Route path="dictionaries" element={<Dictionaries />} />
                <Route path="nested-loops" element={<NestedLoops />} />
                 <Route path="arrays" element={<ArraysDoc />} />
                 <Route path="trees-&-graphs" element={<TreesAndGraphs />} />
                 <Route path="stacks" element={<StacksDoc />} />
                <Route path="queues" element={<QueuesDoc />} />
                <Route path="linked-lists" element={<LinkedListDoc />} />

                {/* Intermediate Topics */}
                <Route path="iterators-&-iterables" element={<IteratorsDoc />} />
                <Route path="context-managers" element={<ContextManagersDoc />} />
                <Route path="closures" element={<ClosuresDoc />} />
                <Route path="copy-&-deepcopy" element={<CopyDoc />} />
                <Route path="recursion" element={<RecursionDoc />} />
                <Route path="mutable-&-immutable" element={<MutableImmutableDoc />} />
                <Route path="scope-&-namespaces" element={<ScopeNamespacesDoc />} />
                <Route path="function-annotations" element={<FunctionAnnotationsDoc />} />
                <Route path="zip-enumerate-range" element={<ZipEnumerateRangeDoc />} />


                 {/* Advanced Topics */}
                <Route path="modules-&-imports" element={<ModulesImports />} />
                <Route path="file-handling" element={<FileHandling />} />
                <Route path="lambda-functions" element={<LambdaFunctions />} />
                <Route path="map-filter-reduce" element={<MapFilterReduce />} />
                <Route path="built-in-functions" element={<BuiltinFunctions />} />
                <Route path="exception-handling" element={<ExceptionHandling />} /> 
              <Route path="break-&-continue" element={<BreakContinue />} />
              <Route path="multithreading-&-multiprocessing" element={<MultithreadingAndMultiprocessing />} />
              <Route path="properties-&-getters/setters" element={<PropertiesAndGettersSetters />} />  
              <Route path="decorators-&-generators" element={<DecoratorsAndGenerators />} />

                {/* Memory Management */}
              <Route path="memory-management" element={<MemoryManagementDoc />} />
              <Route path="garbage-collection" element={<GarbageCollectionDoc />} />
              <Route path="heap-&-stack-memory" element={<HeapStackMemoryDoc />} />
              <Route path="generational-garbage-collection" element={<GenerationalGarbageCollectionDoc />} />
              <Route path="explicit-garbage-collection" element={<ExplicitGarbageCollectionDoc />} />
              <Route path="memory-profiling-tools" element={<MemoryProfilingToolsDoc />} />

                {/* Python Tools & Standard */}
                
               <Route path="pep8" element={<PEP8Doc />} />
                <Route path="docstrings-type-hints" element={<DocstringsTypeHintsDoc />} />
                <Route path="virtual-environments" element={<VirtualEnvironmentsDoc />} />
                <Route path="testing" element={<TestingDoc />} />
                <Route path="package-management" element={<PackageManagementDoc />} />
               <Route path="code-formatting-&-linting" element={<CodeFormattingLintingDoc />} />  


               
              </Routes>
            </React.Suspense>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PythonFundamentals;