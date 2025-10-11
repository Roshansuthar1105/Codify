// context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// Define available theme colors
// value = base; light/dark = semantic variants used widely
// We will compute extended shade scale (50..950) dynamically from base color so
// Tailwind classes like text-primary-600, bg-primary-50 react to theme changes.
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
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [themeColor, setThemeColor] = useState(
    () => localStorage.getItem("themeColor") || "purple"
  );

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

    // Helper functions for shade generation
    const hexToRgb = (hex) => {
      const h = hex.replace("#", "");
      const bigint = parseInt(
        h.length === 3
          ? h
              .split("")
              .map((c) => c + c)
              .join("")
          : h,
        16
      );
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };
    const rgbToHex = ({ r, g, b }) => {
      const toHex = (v) => v.toString(16).padStart(2, "0");
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
    const clamp = (v) => Math.min(255, Math.max(0, Math.round(v)));
    const mix = (base, amount) => {
      // amount >0 lighten towards white, <0 darken towards black
      const { r, g, b } = hexToRgb(base);
      if (amount >= 0) {
        return rgbToHex({
          r: clamp(r + (255 - r) * amount),
          g: clamp(g + (255 - g) * amount),
          b: clamp(b + (255 - b) * amount),
        });
      } else {
        const a = Math.abs(amount);
        return rgbToHex({
          r: clamp(r * (1 - a)),
          g: clamp(g * (1 - a)),
          b: clamp(b * (1 - a)),
        });
      }
    };

    // Shade map factors roughly approximating Tailwind scale
    const shadeFactors = {
      50: 0.9,
      100: 0.8,
      200: 0.65,
      300: 0.45,
      400: 0.25,
      500: 0, // base
      600: -0.1,
      700: -0.2,
      800: -0.3,
      900: -0.42,
      950: -0.55,
    };

    // Apply base semantic variables
    root.style.setProperty("--color-primary", color.value);
    root.style.setProperty("--color-primary-light", color.light);
    root.style.setProperty("--color-primary-dark", color.dark);

    // Generate and apply shade variables
    Object.entries(shadeFactors).forEach(([k, factor]) => {
      if (k === "500") {
        root.style.setProperty(`--color-primary-${k}`, color.value);
      } else {
        root.style.setProperty(
          `--color-primary-${k}`,
          mix(color.value, factor)
        );
      }
    });

    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  // Toggle dark/light mode
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

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
