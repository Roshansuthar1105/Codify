import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Hero section extracted from Home page for clarity & reusability.
 * Adjusted to avoid layout shift / button jumping by:
 *  - Providing explicit min-height using CSS variable offset for navbar.
 *  - Reserving space for async content (no conditional height changes).
 *  - Using flex + gap with consistent sizing.
 */
function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
  <section className="relative hero-section flex items-center justify-center min-h-screen-minus-nav">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover ${isDark ? 'opacity-20' : 'opacity-40'}`}
      >
        <source src="/Videos/vid1.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />

      {/* Ambient Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-500" />
      </div>

      {/* Core Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto px-6 py-8 pt-32 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border mb-8 ${isDark ? 'bg-dark-bg-secondary/80 border-dark-border/50' : 'bg-light-bg-secondary/80 border-light-border/50'}`}
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium">🚀 Join 1000+ learners worldwide</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-righteous tracking-wider mb-6 leading-tight ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
        >
          Master Coding with
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mt-2 py-1">Interactive Learning</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className={`text-lg sm:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
        >
          Discover the perfect learning path with hands-on projects, expert guidance, and a community of passionate developers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="/courses"
            className="group bg-gradient-to-r from-primary to-secondary text-white py-3 sm:py-4 px-7 sm:px-9 text-base sm:text-lg rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl inline-flex items-center gap-3 shadow-primary/30"
          >
            <span>Start Learning Free</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#demo"
            className="group bg-transparent border-2 border-primary text-primary py-3 sm:py-4 px-7 sm:px-9 text-base sm:text-lg rounded-xl font-semibold transition-all duration-300 hover:bg-primary hover:text-white inline-flex items-center gap-3"
          >
            <span>Watch Demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
          </motion.a>
        </motion.div>

        <div className="mt-12">
          <p className={`text-xs sm:text-sm mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Trusted by developers from 100+ countries</p>
          <div className="flex justify-center items-center gap-6 opacity-70">
            <div className="w-14 sm:w-16 h-6 sm:h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded" />
            <div className="w-14 sm:w-16 h-6 sm:h-8 bg-gradient-to-r from-secondary/20 to-accent/20 rounded" />
            <div className="w-14 sm:w-16 h-6 sm:h-8 bg-gradient-to-r from-accent/20 to-primary/20 rounded" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
