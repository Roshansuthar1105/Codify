import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import JavaScriptNotesSidebar from './components/JavaScriptNotesSideBar';
import JsHeroPage from './components/JsHeroPage';
import Loader from '../../../components/Loader';
import Breadcrumb from '../../../components/Breadcrumb';
import useMobile from '../../../hooks/useMobile';

// Lazy load the note components --------------------------------------
// Introduction
const JsIntroduction = React.lazy(() => import('./JsTopics/Introduction/JsIntroduction'));
const JsExecution = React.lazy(() => import('./JsTopics/Introduction/JsExecution'));
const NodeJsInstallation = React.lazy(() => import('./JsTopics/Introduction/NodeJsInstallation'));

// JavaScript Variables
const WhatAreVariables = React.lazy(() => import('./JsTopics/JsVariables/WhatAreVariables'));
const VarLetConst = React.lazy(() => import('./JsTopics/JsVariables/VarLetConst'));
const PrimitivesAndObjects = React.lazy(() => import('./JsTopics/JsVariables/PrimitivesAndObjects'));
const VariableNamingRules = React.lazy(() => import('./JsTopics/JsVariables/VariableNamingRules'));
const OperatorsAndExpressions = React.lazy(() => import('./JsTopics/JsVariables/OperatorsAndExpressions'));

// JavaScript Basics
const IfElseConditionals = React.lazy(() => import('./JsTopics/JsBasics/IfElseConditionals'));
const IfElseLadder = React.lazy(() => import('./JsTopics/JsBasics/IfElseLadder'));
const SwitchCase = React.lazy(() => import('./JsTopics/JsBasics/SwitchCase'));
const TernaryOperator = React.lazy(() => import('./JsTopics/JsBasics/TernaryOperator'));
const ForLoops = React.lazy(() => import('./JsTopics/JsBasics/ForLoops'));
const WhileLoops = React.lazy(() => import('./JsTopics/JsBasics/WhileLoops'));
const Functions = React.lazy(() => import('./JsTopics/JsBasics/Functions'));

// JavaScript Objects
const Strings = React.lazy(() => import('./JsTopics/JsObjects/StringsInJS'));
const ArraysAndMethods = React.lazy(() => import('./JsTopics/JsObjects/ArraysAndMethods'));
const LoopsWithArrays = React.lazy(() => import('./JsTopics/JsObjects/LoopsWithArrays'));
const MapFilterAndReduce = React.lazy(() => import('./JsTopics/JsObjects/MapFilterReduce'));
const DateInJs = React.lazy(() => import('./JsTopics/JsObjects/DateInJS'));
const MathInJs = React.lazy(() => import('./JsTopics/JsObjects/MathInJS'));
const NumberinJs = React.lazy(() => import('./JsTopics/JsObjects/NumberInJS'));
const BooleanInJs = React.lazy(() => import('./JsTopics/JsObjects/BooleanInJS'));

// JavaScript DOM and BOM
const JsWindowObject = React.lazy(() => import('./JsTopics/Dom_Bom/JsWindowObject'));
const JsHistoryObject = React.lazy(() => import('./JsTopics/Dom_Bom/JsHistoryObject'));
const JsNavigatorObject = React.lazy(() => import('./JsTopics/Dom_Bom/JsNavigatorObject'));
const JsScreenObject = React.lazy(() => import('./JsTopics/Dom_Bom/JsScreenObject'));
const JsDocumentObject = React.lazy(() => import('./JsTopics/Dom_Bom/JsDocumentObject'));
const JsGetElementById = React.lazy(() => import('./JsTopics/Dom_Bom/JsGetElementById'));
const JsGetElementsByClassName = React.lazy(() => import('./JsTopics/Dom_Bom/JsGetElementsByClassName'));
const JsGetElementsByName = React.lazy(() => import('./JsTopics/Dom_Bom/JsGetElementsByName'));
const JsGetElementsByTagName = React.lazy(() => import('./JsTopics/Dom_Bom/JsGetElementsByTagName'));
const JsInnerHTML = React.lazy(() => import('./JsTopics/Dom_Bom/JsInnerHTML'));
const JsOuterHTML = React.lazy(() => import('./JsTopics/Dom_Bom/JsOuterHTML'));


// Lazy load the note components --------------------------------------


const JavaScriptFundamentals = () => {
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
          <JavaScriptNotesSidebar onNavigate={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'md:ml-0'}`}>
          {/* Breadcrumb */}
          <Breadcrumb isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className={"p-4"} />

          {/* ROUTES OF THE SUB NOTES */}
          <div className="p-4 md:p-8">
            <React.Suspense fallback={<Loader />}>
              <Routes>
                <Route index element={<JsHeroPage />} />

                {/* Introduction */}
                <Route path="js-introduction" element={<JsIntroduction />} />
                <Route path="js-execution" element={<JsExecution />} />
                <Route path="node.js-installation" element={<NodeJsInstallation />} />

                {/* Javascript variables */}
                <Route path="what-are-variables" element={<WhatAreVariables />} />
                <Route path="variable-naming-rules" element={<VariableNamingRules />} />
                <Route path="primitives-and-objects" element={<PrimitivesAndObjects />} />
                <Route path="operators-and-expressions" element={<OperatorsAndExpressions />} />
                <Route path="var-vs-let-vs-const" element={<VarLetConst />} />

                {/* Javascript basics */}
                <Route path="if-else-conditionals" element={<IfElseConditionals />} />
                <Route path="if-else-ladder" element={<IfElseLadder />} />
                <Route path="switch-case" element={<SwitchCase />} />
                <Route path="ternary-operator" element={<TernaryOperator />} />
                <Route path="for-loops" element={<ForLoops />} />
                <Route path="while-loops" element={<WhileLoops />} />
                <Route path="functions" element={<Functions />} />

                {/* Javascript objects */}
                <Route path="strings" element={<Strings />} />
                <Route path="arrays-and-array-methods" element={<ArraysAndMethods />} />
                <Route path="loops-with-arrays" element={<LoopsWithArrays />} />
                <Route path="map-filter-reduce" element={<MapFilterAndReduce />} />
                <Route path="date" element={<DateInJs />} />
                <Route path="math" element={<MathInJs />} />
                <Route path="number" element={<NumberinJs />} />
                <Route path="boolean" element={<BooleanInJs />} />

                {/* DOM and BOM */}
                <Route path="window-object" element={<JsWindowObject />} />
                <Route path="history-object" element={<JsHistoryObject />} />
                <Route path="navigator-object" element={<JsNavigatorObject />} />
                <Route path="screen-object" element={<JsScreenObject />} />
                <Route path="document-object" element={<JsDocumentObject />} />
                <Route path="getElementById" element={<JsGetElementById />} />
                <Route path="getElementsByClassName" element={<JsGetElementsByClassName />} />
                <Route path="getElementsByName" element={<JsGetElementsByName />} />
                <Route path="getElementsByTagName" element={<JsGetElementsByTagName />} />
                <Route path="innerHTML" element={<JsInnerHTML />} />
                <Route path="outerHTML" element={<JsOuterHTML />} />





                {/* OOPS */}

              </Routes>
            </React.Suspense>
          </div>

        </main>
      </div>
    </div>
  );
};

export default JavaScriptFundamentals;
