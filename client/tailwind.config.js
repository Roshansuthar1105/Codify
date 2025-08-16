/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary, #9381ff)', // Primary theme color (customizable)
          light: 'var(--color-primary-light, #a89bff)', // Lighter shade
          dark: 'var(--color-primary-dark, #7b6fe6)', // Darker shade
          50: 'var(--color-primary-50, #f5f3ff)',
          100: 'var(--color-primary-100, #ede9fe)',
          200: 'var(--color-primary-200, #ddd6fe)',
          300: 'var(--color-primary-300, #c4b5fd)',
          400: 'var(--color-primary-400, #a89bff)',
          500: 'var(--color-primary-500, #9381ff)',
          600: 'var(--color-primary-600, #7b6fe6)',
          700: 'var(--color-primary-700, #6d5ecf)',
          800: 'var(--color-primary-800, #5e4db7)',
          900: 'var(--color-primary-900, #4c3d99)',
          950: 'var(--color-primary-950, #2e2564)',
        },
        // Secondary color palette
        secondary: {
          DEFAULT: 'var(--color-secondary, #ff6b6b)',
          light: 'var(--color-secondary-light, #ff8e8e)',
          dark: 'var(--color-secondary-dark, #ff5252)',
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffc9c9',
          300: '#ffa8a8',
          400: '#ff8787',
          500: '#ff6b6b',
          600: '#fa5252',
          700: '#e03131',
          800: '#c92a2a',
          900: '#862e2e',
        },
        // Accent color palette
        accent: {
          DEFAULT: 'var(--color-accent, #4ecdc4)',
          light: 'var(--color-accent-light, #6ed7d0)',
          dark: 'var(--color-accent-dark, #2ec4b6)',
          50: '#f0fdfb',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#4ecdc4',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Dark mode colors
        dark: {
          bg: {
            primary: '#000000',
            secondary: '#1e1f1f',
            tertiary: '#181818',
          },
          text: {
            primary: '#efeded',
            secondary: '#ccc',
          },
          border: '#333333',
          form: 'rgba(255, 255, 255, 0.09)',
          hover: 'rgba(0, 0, 0, 0.9)',
        },
        // Light mode colors
        light: {
          bg: {
            primary: '#f8f9fa',  // Softer white background
            secondary: '#edf2f7', // Slightly blue-tinted background
            tertiary: '#e2e8f0',  // Darker tertiary background
          },
          text: {
            primary: '#1c1c1c',   // Darker text for better contrast
            // primary: '#1a202c',   // Darker text for better contrast
            secondary: '#4a5568', // Darker secondary text
            secondary: '#3b3b3b', // Darker secondary text
          },
          border: '#cbd5e0',      // Slightly darker border
          form: 'rgba(0, 0, 0, 0.05)',
          hover: 'rgba(255, 255, 255, 0.9)',
        },
        // Additional theme colors for selection
        theme: {
          blue: '#4361ee',
          green: '#4caf50',
          purple: '#9381ff',
          red: '#e63946',
          orange: '#ff9f1c',
          teal: '#2ec4b6',
        },
        // Utility colors
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
        youtube: {
          DEFAULT: '#ff0000',
          light: '#ff0000',
        },
      },
      fontFamily: {
        'concert-one': ['"Concert One"', 'sans-serif'],
        'luckiest-guy': ['"Luckiest Guy"', 'cursive'],
        'righteous': ['"Righteous"', 'sans-serif'],
        'playwrite-is': ['"Playwrite IS"', 'cursive'],
        'playwrite-gb': ['"Playwrite GB S"', 'cursive'],
        'segoe': ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      height: {
        'screen-minus-nav': 'calc(100dvh - 85px)',
      },
      backgroundImage: {
        'grid-pattern-dark': 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 3px, transparent 1.5px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1.5px)',
        'grid-pattern-light': 'linear-gradient(to right, rgba(0, 0, 0, 0.07) 1px, transparent 1.5px), linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 1px, transparent 1.5px)',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'theme-pulse': 'themePulse 0.3s ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-bottom': 'slideInBottom 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        themePulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        slideInLeft: {
          'from': { opacity: '0', transform: 'translateX(-50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInBottom: {
          'from': { opacity: '0', transform: 'translateY(50px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      boxShadow: {
        'nav': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.2)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const animationDelayUtilities = Object.entries(theme('animationDelay')).map(([key, value]) => {
        return {
          [`.animation-delay-${key}`]: {
            'animation-delay': value,
          },
        };
      });

      addUtilities(animationDelayUtilities);
    },
  ],
}
