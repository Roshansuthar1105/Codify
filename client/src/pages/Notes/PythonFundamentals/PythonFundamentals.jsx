import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotesSidebar from '../NotesSidebar';
import PyHeroPage from './PyHeroPage';
import Loader from '../../../components/Loader';
import Breadcrumb from '../../../components/Breadcrumb';
import useMobile from '../../../hooks/useMobile';
import PyPageTitleManager from './PyPageTitleManager';
import categories from './PyTopics.json';
// Python Basics
import Operators from './PyTopics/PythonBasics/Operators';
import InputOutput from './PyTopics/PythonBasics/InputOutput';
import TypeCasting from './PyTopics/PythonBasics/TypeCasting';
import StringFormatting from './PyTopics/PythonBasics/StringFormatting';
import ConditionalStatements from './PyTopics/PythonBasics/ConditionalStatements';
import Loops from './PyTopics/PythonBasics/Loops';
import Functions from './PyTopics/PythonBasics/Functions';
import VariablesDataTypes from './PyTopics/PythonBasics/VariablesDataTypes';





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
                 {/* Python Basics */}
                {/* Python Basics */}
                <Route path="variables-&-data-types" element={<VariablesDataTypes />} />
                <Route path="operators" element={<Operators />} />
                <Route path="input-&-output" element={<InputOutput />} />
                <Route path="type-casting" element={<TypeCasting />} />
                <Route path="string-formatting" element={<StringFormatting />} />
                <Route path="conditional-statements" element={<ConditionalStatements />} />
                <Route path="loops" element={<Loops />} />
                <Route path="functions" element={<Functions />} />



               
              </Routes>
            </React.Suspense>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PythonFundamentals;