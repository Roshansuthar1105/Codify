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

function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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

      {/* Hero Section with Video Background on top of the grid */}
      <section className="relative h-screen-minus-nav flex items-center justify-center">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover ${isDark ? "opacity-20" : "opacity-40"}`}
        >
          <source src="/Videos/vid1.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute md:top-20 top-6 right-1 md:right-20 text-6xl text-primary/30 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" className="md:h-20 md:w-20 h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        <div className="absolute bottom-32 md:left-16 left-6 top-1/8 text-4xl text-secondary/30 animate-float animation-delay-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="md:h-16 md:w-16 h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>
        <div className="absolute md:top-1/3 top-6 md:left-10 left-5 text-3xl text-accent/30 animate-float animation-delay-500">
          <svg className="md:h-12 md:w-12 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="absolute bottom-1/4 right-4 text-2xl text-primary/20 animate-float animation-delay-700">
          <svg className="md:h-10 md:w-10 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 000 1.562l5 4zm9.25-9.562l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 000-1.562l-5-4zM14.976 3.216l-4 18-1.953-.434 4-18 1.953.434z" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-20 text-center max-w-6xl mx-auto px-6 py-8 pt-36">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? "bg-dark-bg-secondary/80" : "bg-light-bg-secondary/80"
              } backdrop-blur-sm border ${isDark ? "border-dark-border/50" : "border-light-border/50"
              } mb-8`}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">
              🚀 Join 1000+ learners worldwide
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-righteous tracking-wider mb-6 sm:mb-8 leading-sug sm:leading-tight ${isDark ? "text-dark-text-primary" : "text-light-text-primary"
              }`}
          >
            Master Coding with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent mt-2 py-1 sm:py-2">
              Interactive Learning
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`text-xl sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
              }`}
          >
            Discover the perfect learning path with hands-on projects, expert
            guidance, and a community of passionate developers
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="/courses"
              className="group bg-gradient-to-r from-primary to-secondary text-white py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl inline-flex items-center gap-2 sm:gap-3"
            >
              <span>Start Learning Free</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-transparent border-2 border-primary text-primary py-4 px-8 text-lg rounded-xl font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl inline-flex items-center gap-3"
               
            >  <Link to="/demo">
              <span>Watch Demo</span>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:scale-110 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>

          {showVideo && (
  <div className="mt-6">
    <iframe 
      width="560" 
      height="315"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
)}

          {/* Trust Indicators */}
          <div className="mt-10 sm:mt-16">
            <p
              className={`text-xs sm:text-sm ${isDark
                ? "text-dark-text-secondary"
                : "text-light-text-secondary"
                } mb-3 sm:mb-4`}
            >
              Trusted by developers from 100+ countries
            </p>

            <div className="flex justify-center items-center gap-4 sm:gap-8 opacity-60">
              <div className="w-12 sm:w-16 h-6 sm:h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded"></div>
              <div className="w-12 sm:w-16 h-6 sm:h-8 bg-gradient-to-r from-secondary/20 to-accent/20 rounded"></div>
              <div className="w-12 sm:w-16 h-6 sm:h-8 bg-gradient-to-r from-accent/20 to-primary/20 rounded"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-primary rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

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
