import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotesSidebar from '../NotesSidebar';
import TsHeroPage from './TsHeroPage';
import Loader from '../../../components/Loader';
import Breadcrumb from '../../../components/Breadcrumb';
import useMobile from '../../../hooks/useMobile';
import TsPageTitleManager from './TsPageTitleManager';
import categories from './TsTopics.json';

// Import note components - will be added in subsequent PRs

// Introduction
// import TsIntroduction from './TsTopics/Introduction/TsIntroduction';
// import TsInstallation from './TsTopics/Introduction/TsInstallation';
// import TsConfiguration from './TsTopics/Introduction/TsConfiguration';

// TypeScript Basics
// import WhatIsTypeScript from './TsTopics/TsBasics/WhatIsTypeScript';
// import TypeAnnotations from './TsTopics/TsBasics/TypeAnnotations';
// import BasicTypes from './TsTopics/TsBasics/BasicTypes';
// import TypeInference from './TsTopics/TsBasics/TypeInference';
// import TypeAssertions from './TsTopics/TsBasics/TypeAssertions';

// Advanced Types
// import UnionTypes from './TsTopics/AdvancedTypes/UnionTypes';
// import IntersectionTypes from './TsTopics/AdvancedTypes/IntersectionTypes';
// import LiteralTypes from './TsTopics/AdvancedTypes/LiteralTypes';
// import Enums from './TsTopics/AdvancedTypes/Enums';
// import Generics from './TsTopics/AdvancedTypes/Generics';
// import UtilityTypes from './TsTopics/AdvancedTypes/UtilityTypes';

// Functions and Classes
// import FunctionTypes from './TsTopics/FunctionsClasses/FunctionTypes';
// import OptionalParameters from './TsTopics/FunctionsClasses/OptionalParameters';
// import DefaultParameters from './TsTopics/FunctionsClasses/DefaultParameters';
// import RestParameters from './TsTopics/FunctionsClasses/RestParameters';
// import ClassTypes from './TsTopics/FunctionsClasses/ClassTypes';
// import Interfaces from './TsTopics/FunctionsClasses/Interfaces';
// import AbstractClasses from './TsTopics/FunctionsClasses/AbstractClasses';

// Modules and Namespaces
// import Modules from './TsTopics/ModulesNamespaces/Modules';
// import Namespaces from './TsTopics/ModulesNamespaces/Namespaces';
// import ImportExport from './TsTopics/ModulesNamespaces/ImportExport';
// import DeclarationFiles from './TsTopics/ModulesNamespaces/DeclarationFiles';

// Error Handling and Debugging
// import ErrorHandling from './TsTopics/ErrorHandling/ErrorHandling';
// import TypeGuards from './TsTopics/ErrorHandling/TypeGuards';
// import Debugging from './TsTopics/ErrorHandling/Debugging';

const TypeScriptEssentials = () => {
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
          <NotesSidebar categories={categories} title={"TypeScript NOTES"} basePath={"/notes/typescript"} onNavigate={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'md:ml-0'}`}>
          {/* Breadcrumb */}
          <Breadcrumb isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className={"p-4"} />

          {/* Page Title Manager */}
          <TsPageTitleManager />

          {/* ROUTES OF THE SUB NOTES */}
          <div className="p-4 md:p-8">
            <React.Suspense fallback={<Loader />}>
              <Routes>
                <Route index element={<TsHeroPage />} />

                {/* Introduction - Will be added in PR #2 */}
                {/* <Route path="introduction" element={<TsIntroduction />} />
                <Route path="installation" element={<TsInstallation />} />
                <Route path="configuration" element={<TsConfiguration />} /> */}

                {/* TypeScript Basics - Will be added in PR #3 */}
                {/* <Route path="what-is-typescript" element={<WhatIsTypeScript />} />
                <Route path="type-annotations" element={<TypeAnnotations />} />
                <Route path="basic-types" element={<BasicTypes />} />
                <Route path="type-inference" element={<TypeInference />} />
                <Route path="type-assertions" element={<TypeAssertions />} /> */}

                {/* Advanced Types - Will be added in PR #4 */}
                {/* <Route path="union-types" element={<UnionTypes />} />
                <Route path="intersection-types" element={<IntersectionTypes />} />
                <Route path="literal-types" element={<LiteralTypes />} />
                <Route path="enums" element={<Enums />} />
                <Route path="generics" element={<Generics />} />
                <Route path="utility-types" element={<UtilityTypes />} /> */}

                {/* Functions and Classes - Will be added in PR #5 */}
                {/* <Route path="function-types" element={<FunctionTypes />} />
                <Route path="optional-parameters" element={<OptionalParameters />} />
                <Route path="default-parameters" element={<DefaultParameters />} />
                <Route path="rest-parameters" element={<RestParameters />} />
                <Route path="class-types" element={<ClassTypes />} />
                <Route path="interfaces" element={<Interfaces />} />
                <Route path="abstract-classes" element={<AbstractClasses />} /> */}

                {/* Modules and Namespaces - Will be added in PR #6 */}
                {/* <Route path="modules" element={<Modules />} />
                <Route path="namespaces" element={<Namespaces />} />
                <Route path="import-export" element={<ImportExport />} />
                <Route path="declaration-files" element={<DeclarationFiles />} /> */}

                {/* Error Handling and Debugging - Will be added in PR #6 */}
                {/* <Route path="error-handling" element={<ErrorHandling />} />
                <Route path="type-guards" element={<TypeGuards />} />
                <Route path="debugging" element={<Debugging />} /> */}

              </Routes>
            </React.Suspense>
          </div>

        </main>
      </div>
    </div>
  );
};

export default TypeScriptEssentials;
