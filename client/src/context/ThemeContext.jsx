// context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// Define available theme colors
const themeColors = {
  purple: { value: "#9381ff", light: "#a89bff", dark: "#7b6fe6" },
  blue: { value: "#4361ee", light: "#5a75f0", dark: "#3a53cc" },
  green: { value: "#4caf50", light: "#6abe6e", dark: "#3d8c40" },
  red: { value: "#e63946", light: "#eb5d68", dark: "#c42f3b" },
  orange: { value: "#ff9f1c", light: "#ffb14d", dark: "#e68a00" },
  teal: { value: "#2ec4b6", light: "#4fd0c3", dark: "#25a093" },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load from localStorage or defaults
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem("themeColor") || "purple");

  // Persist theme in localStorage & apply class
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  // Persist theme color in localStorage & apply CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const color = themeColors[themeColor];
    if (!color) return;

    root.style.setProperty("--color-primary", color.value);
    root.style.setProperty("--color-primary-light", color.light);
    root.style.setProperty("--color-primary-dark", color.dark);
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  // Toggle dark/light mode
  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  // Change theme color
  const changeThemeColor = (colorName) => {
    if (themeColors[colorName]) setThemeColor(colorName);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeColor,
        toggleTheme,
        changeThemeColor,
        availableColors: themeColors,
        isDark: theme === "dark",
        isLight: theme === "light",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
