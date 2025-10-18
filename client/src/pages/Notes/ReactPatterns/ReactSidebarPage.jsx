import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { reactTopics } from "./ReactTopics";
import {
  FiChevronRight,
  FiChevronDown,
  FiBook,
  FiCode,
  FiLayers,
} from "react-icons/fi";
import IntroductionToReactPatterns from "./ReactNotes/IntroductionToReactPatterns";


import ControlAndUn from "./ReactNotes/ControlAndUn";


import StateCol from "./ReactNotes/StateCol";

import FunctionComp from "./ReactNotes/FunctionComp";



import ReactIntroduction from "./ReactNotes/ReactIntroduction";


const iconMap = {
  "React Basics": <FiBook />,
  "React Patterns": <FiLayers />,
  "Hooks & Custom Logic": <FiCode />,
};
const topicComponents = {
  "Introduction to React Patterns": <IntroductionToReactPatterns />,


  "Controlled vs Uncontrolled Components": <ControlAndUn />,


  "State Colocation" : <StateCol />,

  "Functional components": <FunctionComp />,



  "What is react" : <ReactIntroduction/>

  // add all other topics here
};

const ReactSidebarPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeTopic, setActiveTopic] = useState(
    "Introduction to React Patterns"
  );
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div
      className={`flex min-h-screen ${
        isDark
          ? "bg-dark-bg-primary text-dark-text-primary"
          : "bg-light-bg-primary text-light-text-primary"
      }`}
    >
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-300 dark:border-gray-700 p-6 flex-shrink-0 overflow-y-auto h-screen bg-white dark:bg-black shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">React Notes</h2>

        <ul>
          {reactTopics.map(({ category, topics }) => (
            <li key={category} className="mb-3">
              {/* Category */}
              <div
                onClick={() => toggleCategory(category)}
                className="cursor-pointer flex justify-between items-center font-semibold p-3 rounded-lg hover:bg-primary/20 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{iconMap[category]}</span>
                  {category}
                </div>
                <span className="text-lg">
                  {expandedCategory === category ? (
                    <FiChevronDown />
                  ) : (
                    <FiChevronRight />
                  )}
                </span>
              </div>

              {/* Topics */}
              {expandedCategory === category && (
                <ul className="pl-8 mt-2 space-y-2">
                  {topics.map((topic) => (
                    <li
                      key={topic}
                      onClick={() => setActiveTopic(topic)}
                      className={`cursor-pointer px-3 py-1 rounded-lg flex items-center text-sm gap-2 transition-all duration-200 ${
                        activeTopic === topic
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10 overflow-y-auto h-screen">
        {topicComponents[activeTopic] || (
          <p className="text-gray-500 dark:text-gray-400">
            Content for "<span className="font-medium">{activeTopic}</span>"
            will go here.
          </p>
        )}
      </main>
    </div>
  );
};

export default ReactSidebarPage;
