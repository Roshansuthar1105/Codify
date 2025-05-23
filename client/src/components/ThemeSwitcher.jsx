import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <div className="flex items-center justify-center">
      <label className="relative inline-block w-14 h-7 cursor-pointer">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isLightTheme}
          onChange={toggleTheme}
        />
        <span className={`
          absolute top-0 left-0 right-0 bottom-0
          ${isLightTheme ? 'bg-light-bg-tertiary' : 'bg-dark-bg-tertiary'}
          rounded-full transition-all duration-300
          before:absolute before:content-[''] before:h-5 before:w-5
          before:left-1 before:bottom-1 before:rounded-full before:transition-all before:duration-300
          ${isLightTheme
            ? 'before:transform before:translate-x-7 before:bg-primary'
            : 'before:bg-primary'}
          hover:shadow-md
        `}>
          <FaSun className={`
            absolute right-1.5 top-1/2 transform -translate-y-1/2 text-xs
            ${isLightTheme ? 'text-primary' : 'text-dark-text-secondary'}
            transition-all duration-300
          `} />
          <FaMoon className={`
            absolute left-1.5 top-1/2 transform -translate-y-1/2 text-xs
            ${isLightTheme ? 'text-light-text-secondary' : 'text-primary'}
            transition-all duration-300
          `} />
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
