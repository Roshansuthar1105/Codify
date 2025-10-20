import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import ReactSidebarPage from "./ReactSidebarPage";

const ReactPatternPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex min-h-screen ${
        isDark
          ? "bg-dark-bg-primary text-dark-text-primary"
          : "bg-light-bg-primary text-light-text-primary"
      }`}
    >
      <ReactSidebarPage></ReactSidebarPage>
    </div>
  );
};

export default ReactPatternPage;
