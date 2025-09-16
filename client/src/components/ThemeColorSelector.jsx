import React, { useState } from "react";
import { FaPalette, FaCheck } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ThemeColorSelector = ({ isOpen, onToggle, onClose }) => {
  const { themeColor, changeThemeColor, availableColors, theme } = useTheme();

  const isDark = theme === "dark";

  const handleColorChange = (colorKey) => {
    changeThemeColor(colorKey);
    onClose();
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`
          flex items-center justify-center p-2 rounded-full
          ${
            isDark
              ? "bg-dark-bg-tertiary text-dark-text-primary"
              : "bg-light-bg-tertiary text-light-text-primary"
          }
          hover:bg-primary hover:text-white transition-colors duration-200
        `}
        aria-label="Change theme color"
      >
        <FaPalette className="text-lg" />
      </button>

      {isOpen && (
        <div
          className={`
            absolute left-12 -bottom-14 mt-2 p-3 rounded-lg shadow-lg z-50 grid grid-cols-3 gap-2 w-48
            ${
              isDark
                ? "bg-dark-bg-secondary border border-dark-border"
                : "bg-white border border-light-border"
            }
            `}
        >
          <div className="col-span-3 mb-2 text-center text-sm font-medium">
            <span
              className={
                isDark ? "text-dark-text-primary" : "text-light-text-primary"
              }
            >
              Choose Theme Color
            </span>
          </div>

          {Object.entries(availableColors).map(([key, color]) => (
            <button
              key={key}
              onClick={() => handleColorChange(key)}
              className={`
                w-12 h-12 rounded-full relative flex items-center justify-center
                transition-transform duration-200 hover:scale-110
              `}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} theme`}
            >
              {themeColor === key && (
                <FaCheck className="text-white drop-shadow-md" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeColorSelector;
