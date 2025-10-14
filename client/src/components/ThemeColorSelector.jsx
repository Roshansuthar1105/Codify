import React from "react";
import { FaPalette, FaCheck } from "react-icons/fa";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";

const ThemeColorSelector = ({ isOpen, onToggle, onClose }) => {
  const { themeColor, changeThemeColor, availableColors, theme } = useTheme();
  const isDark = theme === "dark";

  const handleColorChange = (colorKey) => {
    changeThemeColor(colorKey);
    onClose();
  };

  // Get button bounding rect for precise positioning
  const buttonRef = React.useRef();

  // Calculate dropdown position below the button (optional: improve user experience)
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px below button
        left: rect.left + rect.width / 2,
      });
    }
  }, [isOpen]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={onToggle}
        className={`
          flex items-center justify-center p-2 rounded-full border backdrop-blur-sm
          ${isDark ? "bg-dark-bg-tertiary text-dark-text-primary border-dark-border" : "bg-light-bg-tertiary text-light-text-primary border-light-border"}
          hover:bg-primary hover:text-white transition-colors duration-200
        `}
        aria-label="Change theme color"
      >
        <FaPalette className="text-lg" />
      </button>

      {/* Dropdown Panel: via Portal */}
      {isOpen && createPortal(
        <div
          className={`
            fixed z-[9999] grid grid-cols-3 gap-2 w-48 p-3 rounded-lg shadow-lg
            ${isDark ? "bg-dark-bg-secondary border border-dark-border" : "bg-white border border-light-border"}
          `}
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            transform: "translate(-50%, 0)",
          }}
        >
          <div className="col-span-3 mb-2 text-center text-sm font-medium">
            <span className={isDark ? "text-dark-text-primary" : "text-light-text-primary"}>
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
        </div>,
        document.body
      )}
    </div>
  );
};

export default ThemeColorSelector;
