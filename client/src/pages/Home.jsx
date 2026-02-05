import React, { lazy, Suspense, useLayoutEffect, useRef, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import Counter from "../utils/Counter";
import { FaArrowUp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Lazy loaded components
const CreatorsContainer = lazy(() => import("../components/HomePageComponents/CreatorsContainer"));
const ChooseUs = lazy(() => import("../components/HomePageComponents/ChooseUs"));
const FAQ = lazy(() => import("../components/HomePageComponents/FAQ"));
const Testimonials = lazy(() => import("../components/HomePageComponents/Testimonials"));
const NewsLetter = lazy(() => import("../components/HomePageComponents/NewsLetter"));
const CallToAction = lazy(() => import("../components/HomePageComponents/CallToAction"));
const Contribution = lazy(() => import("../components/HomePageComponents/Contributor"));
import Hero from "../components/Hero";

function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // refs for scoped GSAP
  const root = useRef(null);
  const featuresGridRef = useRef(null);
  const statsGridRef = useRef(null);
  const roadmapsGridRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll to top functionality
  useEffect(() => {
    const toggleScrollTop = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleScrollTop);
    return () => window.removeEventListener("scroll", toggleScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    // guard for safety
    if (!root.current) return;

    const ctx = gsap.context(() => {
      // 1) Feature cards: fade-up in sequence when the GRID enters
      if (featuresGridRef.current) {
        const cards = featuresGridRef.current.querySelectorAll(".feature-card");
        gsap.set(cards, { y: 40, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: featuresGridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // 2) Stat cards: staggered fade-up when the GRID enters
      if (statsGridRef.current) {
        const statCards = statsGridRef.current.querySelectorAll(".stat-card");
        gsap.set(statCards, { y: 40, opacity: 0 });
        gsap.to(statCards, {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 1.2,
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // 3) Counters: animate numbers safely (no plugin)
      gsap.utils.toArray(".counter").forEach((el) => {
        const finalValue =
          parseInt(el.getAttribute("data-end"), 10) ||
          parseInt(el.textContent, 10) ||
          0;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: finalValue,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.floor(obj.val) + "+";
          },
        });
      });

      // 4) Roadmaps section staggered animation
      if (roadmapsGridRef.current) {
        const roadmapCards = roadmapsGridRef.current.querySelectorAll(".roadmap-card");
        gsap.set(roadmapCards, { y: 40, opacity: 0 });
        gsap.to(roadmapCards, {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: roadmapsGridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // 5) Generic fade sections
      gsap.utils.toArray(".fade-section").forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, root);

    // ensure ScrollTrigger recalculates after lazy content mounts
    requestAnimationFrame(() => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 300);

    // cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark
        ? "bg-dark-bg-primary text-dark-text-primary"
        : "bg-light-bg-primary text-light-text-primary"
        }`}
    >
      {/* Background from Roadmap.jsx, applies to whole page as a base layer */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
      >
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </motion.div>

      {/* Hero Section */}
      <Hero />

      {/* Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enhanced Features Section */}
        <section className="py-24 relative fade-section">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2
                className={`text-4xl md:text-5xl font-righteous tracking-wider mb-6 ${isDark ? "text-dark-text-primary" : "text-light-text-primary"
                  }`}
              >
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Codify
                </span>
              </h2>
              <p
                className={`text-xl ${isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
                  } max-w-2xl mx-auto`}
              >
                Experience learning reimagined with cutting-edge technology and
                proven methodologies
              </p>
            </div>

            {/* Features Grid */}
            <div ref={featuresGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 - Interactive Learning */}
              <div
                className={`feature-card group relative p-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-b-2 hover:border-r-2 ${isDark
                  ? "bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border"
                  : "bg-light-bg-secondary border border-light-border"
                  } hover:border-primary/50`}
              >
                {/* Icon container - using a div with gradient and rounded corners */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors duration-300">
                  Interactive Learning
                </h3>

                <p
                  className={`text-center ${isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                    } leading-relaxed`}
                >
                  Learn by doing with real-world projects, interactive
                  exercises, and hands-on coding challenges that reinforce your
                  understanding.
                </p>
              </div>

              {/* Feature 2 - Expert Instructors */}
              <div
                className={`feature-card group relative p-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-b-2 hover:border-r-2 ${isDark
                  ? "bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border"
                  : "bg-light-bg-secondary border border-light-border"
                  } hover:border-primary/50`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-accent p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-secondary transition-colors duration-300">
                  Expert Instructors
                </h3>

                <p
                  className={`text-center ${isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                    } leading-relaxed`}
                >
                  Learn from industry professionals and experienced developers
                  who provide clear explanations and practical insights.
                </p>
              </div>

              {/* Feature 3 - Flexible Learning */}
              <div
                className={`feature-card group relative p-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-b-2 hover:border-r-2 ${isDark
                  ? "bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border"
                  : "bg-light-bg-secondary border border-light-border"
                  } hover:border-primary/50`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-primary p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-accent transition-colors duration-300">
                  Flexible Learning
                </h3>

                <p
                  className={`text-center ${isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                    } leading-relaxed`}
                >
                  Study at your own pace with 24/7 access to courses, progress
                  tracking, and personalized learning paths.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-16 sm:py-20 md:py-24 relative fade-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`relative p-6 sm:p-10 md:p-16 rounded-2xl shadow-lg border ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border-dark-border' 
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
              }`}
            >
              <div className="relative z-10 text-center">
                <h2
                  className={`text-2xl sm:text-3xl md:text-5xl font-righteous tracking-wider mb-10 sm:mb-12 md:mb-16 ${
                    isDark ? "text-dark-text-primary" : "text-light-text-primary"
                  }`}
                >
                  Empowering{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    Developers
                  </span>{" "}
                  Worldwide
                </h2>
                <div
                  ref={statsGridRef}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:gap-8 gap-6"
                >
                  {/* Courses Stat */}
                  <div className="stat-card group">
                    <div className="text-center p-4 sm:p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                      <div className="relative mb-2 sm:mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        <h3
                          className="counter text-2xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1 sm:mb-2 relative z-10"
                          data-end="70"
                        >
                          0
                        </h3>
                      </div>
                      <p
                        className={`text-lg font-semibold ${
                          isDark ? "text-dark-text-primary" : "text-light-text-primary"
                        }`}
                      >
                        Premium Courses
                      </p>
                    </div>
                  </div>

                  {/* Roadmaps Stat */}
                  <div className="stat-card group">
                    <div className="text-center p-4 sm:p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                      <div className="relative mb-2 sm:mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        <h3
                          className="counter text-2xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1 sm:mb-2 relative z-10"
                          data-end="35"
                        >
                          0
                        </h3>
                      </div>
                      <p
                        className={`text-lg font-semibold ${
                          isDark ? "text-dark-text-primary" : "text-light-text-primary"
                        }`}
                      >
                        Learning Paths
                      </p>
                    </div>
                  </div>

                  {/* Creators Stat */}
                  <div className="stat-card group">
                    <div className="text-center p-4 sm:p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                      <div className="relative mb-2 sm:mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        <h3
                          className="counter text-2xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1 sm:mb-2 relative z-10"
                          data-end="30"
                        >
                          0
                        </h3>
                      </div>
                      <p
                        className={`text-lg font-semibold ${
                          isDark ? "text-dark-text-primary" : "text-light-text-primary"
                        }`}
                      >
                        Expert Creators
                      </p>
                    </div>
                  </div>

                  {/* Users Stat */}
                  <div className="stat-card group">
                    <div className="text-center p-4 sm:p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                      <div className="relative mb-2 sm:mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        <h3
                          className="counter text-2xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1 sm:mb-2 relative z-10"
                          data-end="1000"
                        >
                          0
                        </h3>
                      </div>
                      <p
                        className={`text-lg font-semibold ${
                          isDark ? "text-dark-text-primary" : "text-light-text-primary"
                        }`}
                      >
                        Active Learners
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Roadmaps Preview */}
        <section className="py-24 relative fade-section">
          <div className="text-center mb-20">
            <h2
              className={`text-4xl md:text-5xl font-righteous tracking-wider mb-6 ${isDark ? "text-dark-text-primary" : "text-light-text-primary"
                }`}
            >
              Choose Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Learning Path
              </span>
            </h2>
            <p
              className={`text-xl ${isDark
                ? "text-dark-text-secondary"
                : "text-light-text-secondary"
                } max-w-3xl mx-auto`}
            >
              Structured learning paths designed to take you from beginner to
              expert in your chosen field
            </p>
          </div>

          {/* Roadmaps Grid */}
          <div ref={roadmapsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend Development */}
            <motion.div
              variants={{ hover: { y: -8, scale: 1.02, transition: { duration: 0.2 } } }}
              whileHover="hover"
              className={`roadmap-card group relative p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[280px] hover:border-b-2 hover:border-r-2 ${isDark ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} hover:border-primary/50 transition-all duration-300 overflow-hidden`}
            >
              <motion.div
                className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                whileHover={{ width: "3px", transition: { duration: 0.3, ease: "easeOut" } }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                whileHover={{ height: "3px", transition: { duration: 0.3, ease: "easeOut", delay: 0.05 } }}
              />
              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary p-5 flex items-center justify-center"
                >
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <h3 className={`text-2xl font-semibold ${isDark ? "text-dark-text-primary" : "text-light-text-primary"} mb-3 group-hover:text-primary transition-colors duration-300`}>
                  Frontend Development
                </h3>
                <p className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"} mb-6 leading-relaxed`}>
                  Master modern web technologies including React, Vue, and advanced CSS techniques
                </p>
              </div>
              <motion.a
                href="/roadmap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 inline-flex items-center justify-center py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm"
              >
                Explore Path
              </motion.a>
            </motion.div>

            {/* Backend Development - Updated with consistent styling */}
            <motion.div
              variants={{ hover: { y: -8, scale: 1.02, transition: { duration: 0.2 } } }}
              whileHover="hover"
              className={`roadmap-card group relative p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[280px] hover:border-b-2 hover:border-r-2 ${isDark ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} hover:border-primary/50 transition-all duration-300 overflow-hidden`}
            >
              <motion.div
                className="absolute top-0 right-0 w-0 h-full bg-secondary rounded-r-2xl"
                whileHover={{ width: "3px", transition: { duration: 0.3, ease: "easeOut" } }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0 bg-secondary rounded-b-2xl"
                whileHover={{ height: "3px", transition: { duration: 0.3, ease: "easeOut", delay: 0.05 } }}
              />
              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-accent p-5 flex items-center justify-center"
                >
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </motion.div>
                <h3 className={`text-2xl font-semibold ${isDark ? "text-dark-text-primary" : "text-light-text-primary"} mb-3 group-hover:text-secondary transition-colors duration-300`}>
                  Backend Development
                </h3>
                <p className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"} mb-6 leading-relaxed`}>
                  Build robust APIs, databases, and server-side applications with Node.js, Python, and more
                </p>
              </div>
              <motion.a
                href="/roadmap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 inline-flex items-center justify-center py-3 px-6 bg-secondary hover:bg-secondary/80 text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 text-sm"
              >
                Explore Path
              </motion.a>
            </motion.div>

            {/* Full Stack Development - Updated with consistent styling */}
            <motion.div
              variants={{ hover: { y: -8, scale: 1.02, transition: { duration: 0.2 } } }}
              whileHover="hover"
              className={`roadmap-card group relative p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[280px] hover:border-b-2 hover:border-r-2 ${isDark ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} hover:border-primary/50 transition-all duration-300 overflow-hidden`}
            >
              <motion.div
                className="absolute top-0 right-0 w-0 h-full bg-accent rounded-r-2xl"
                whileHover={{ width: "3px", transition: { duration: 0.3, ease: "easeOut" } }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0 bg-accent rounded-b-2xl"
                whileHover={{ height: "3px", transition: { duration: 0.3, ease: "easeOut", delay: 0.05 } }}
              />
              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-primary p-5 flex items-center justify-center"
                >
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <h3 className={`text-2xl font-semibold ${isDark ? "text-dark-text-primary" : "text-light-text-primary"} mb-3 group-hover:text-accent transition-colors duration-300`}>
                  Full Stack Development
                </h3>
                <p className={`text-sm ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"} mb-6 leading-relaxed`}>
                  Master both frontend and backend technologies to build complete web applications
                </p>
              </div>
              <motion.a
                href="/roadmap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 inline-flex items-center justify-center py-3 px-6 bg-accent hover:bg-accent/80 text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 text-sm"
              >
                Explore Path
              </motion.a>
            </motion.div>

            {/* View All Paths - Updated with consistent styling */}
            <motion.div
              variants={{ hover: { y: -8, scale: 1.02, transition: { duration: 0.2 } } }}
              whileHover="hover"
              className={`roadmap-card group relative p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center min-h-[280px] hover:border-b-2 hover:border-r-2 ${isDark ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} hover:border-primary/50 transition-all duration-300 overflow-hidden`}
            >
              <motion.div
                className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                whileHover={{ width: "3px", transition: { duration: 0.3, ease: "easeOut" } }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                whileHover={{ height: "3px", transition: { duration: 0.3, ease: "easeOut", delay: 0.05 } }}
              />
              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-primary to-secondary p-4 sm:p-5 flex items-center justify-center"
                >
                  <svg className="h-8 sm:h-10 w-8 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </motion.div>
                <motion.a
                  href="/roadmap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative z-10 inline-flex items-center justify-center py-3 px-6 sm:py-4 sm:px-8 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-xl transition-all duration-300 group font-semibold text-base sm:text-lg"
                >
                  <span>View All Paths</span>
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Creators Showcase Section */}
        <section className="py-24 relative fade-section">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2
                className={`text-4xl md:text-5xl font-righteous tracking-wider mb-6 ${isDark ? "text-dark-text-primary" : "text-light-text-primary"
                  }`}
              >
                Learn from{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Industry Experts
                </span>
              </h2>
              <p
                className={`text-xl ${isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
                  } max-w-3xl mx-auto`}
              >
                Our creators are passionate developers and educators committed to
                your success
              </p>
            </div>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              }
            >
              <CreatorsContainer count={3} />
            </Suspense>
          </div>
        </section>

        {/* Additional sections */}
        <Suspense fallback={
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <Testimonials />
          <ChooseUs />
          <FAQ />
          <NewsLetter />
          <CallToAction />
          <Contribution />
        </Suspense>
      </div>

      
    </div>
  );
}

export default Home;
