import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { FaArrowUp } from 'react-icons/fa';

// Lazy loaded components
const CreatorsContainer = lazy(() => import("../components/HomePageComponents/CreatorsContainer"));
const ChooseUs = lazy(() => import("../components/HomePageComponents/ChooseUs"));
const FAQ = lazy(() => import("../components/HomePageComponents/FAQ"));
const Testimonials = lazy(() => import("../components/HomePageComponents/Testimonials"));
const NewsLetter = lazy(() => import("../components/HomePageComponents/NewsLetter"));
const CallToAction = lazy(() => import("../components/HomePageComponents/CallToAction"));
const FeaturedCourses = lazy(() => import("../components/HomePageComponents/FeaturedCourses"));

function Home() {
  const { coursesData } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

    window.addEventListener('scroll', toggleScrollTop);
    return () => window.removeEventListener('scroll', toggleScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`relative min-h-screen-minus-nav ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen-minus-nav flex items-center justify-center">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
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
        <div className="absolute top-20 right-20 text-6xl text-primary/30 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        <div className="absolute bottom-32 left-16 text-4xl text-secondary/30 animate-float animation-delay-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>

        {/* Additional Floating Code Elements */}
        <div className="absolute top-1/3 left-10 text-3xl text-accent/30 animate-float animation-delay-500">
          <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>

        <div className="absolute bottom-1/4 right-10 text-2xl text-primary/20 animate-float animation-delay-700">
          <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 000 1.562l5 4zm9.25-9.562l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 000-1.562l-5-4zM14.976 3.216l-4 18-1.953-.434 4-18 1.953.434z"/>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-20 text-center max-w-6xl mx-auto px-6 py-8">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-dark-bg-secondary/80' : 'bg-light-bg-secondary/80'} backdrop-blur-sm border ${isDark ? 'border-dark-border/50' : 'border-light-border/50'} mb-8 animate-fadeIn`}>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">🚀 Join 1000+ learners worldwide</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} animate-fadeIn animation-delay-200`}>
            Master Coding with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-pulse mt-2 leading-tight py-2">
              Interactive Learning
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} animate-fadeIn animation-delay-400`}>
            Discover the perfect learning path with hands-on projects, expert guidance, and a community of passionate developers
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn animation-delay-600">
            <NavLink
              to="/courses"
              className="group bg-gradient-to-r from-primary to-secondary text-white py-4 px-8 text-lg rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 inline-flex items-center gap-3"
            >
              <span>Start Learning Free</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </NavLink>
            
            <button className="group bg-transparent border-2 border-primary text-primary py-4 px-8 text-lg rounded-xl font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-3">
              <span>Watch Demo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 animate-fadeIn animation-delay-800">
            <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-4`}>Trusted by developers from</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="w-16 h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded"></div>
              <div className="w-16 h-8 bg-gradient-to-r from-secondary/20 to-accent/20 rounded"></div>
              <div className="w-16 h-8 bg-gradient-to-r from-accent/20 to-primary/20 rounded"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 relative">
        {/* Floating Decorative Elements */}
        <div className="absolute top-10 left-10 text-2xl text-primary/20 animate-float animation-delay-300">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>

        <div className="absolute bottom-10 right-10 text-2xl text-secondary/20 animate-float animation-delay-600">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Codify</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-2xl mx-auto`}>
              Experience learning reimagined with cutting-edge technology and proven methodologies
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Interactive Learning */}
            <div className={`group relative p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
              isDark ? 'bg-dark-bg-secondary border-dark-border hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10' : 'bg-light-bg-secondary border-light-border hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5'
            }`}>
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                <svg className="w-full h-full text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors duration-300">
                  Interactive Learning
                </h3>
                
                <p className={`text-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} leading-relaxed`}>
                  Learn by doing with real-world projects, interactive exercises, and hands-on coding challenges that reinforce your understanding.
                </p>
              </div>
            </div>

            {/* Feature 2 - Expert Instructors */}
            <div className={`group relative p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
              isDark ? 'bg-dark-bg-secondary border-dark-border hover:bg-gradient-to-br hover:from-secondary/10 hover:to-accent/10' : 'bg-light-bg-secondary border-light-border hover:bg-gradient-to-br hover:from-secondary/5 hover:to-accent/5'
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                <svg className="w-full h-full text-secondary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-accent p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-secondary transition-colors duration-300">
                  Expert Instructors
                </h3>
                
                <p className={`text-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} leading-relaxed`}>
                  Learn from industry professionals and experienced developers who provide clear explanations and practical insights.
                </p>
              </div>
            </div>

            {/* Feature 3 - Flexible Learning */}
            <div className={`group relative p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
              isDark ? 'bg-dark-bg-secondary border-dark-border hover:bg-gradient-to-br hover:from-accent/10 hover:to-primary/10' : 'bg-light-bg-secondary border-light-border hover:bg-gradient-to-br hover:from-accent/5 hover:to-primary/5'
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                <svg className="w-full h-full text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-primary p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-accent transition-colors duration-300">
                  Flexible Learning
                </h3>
                
                <p className={`text-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} leading-relaxed`}>
                  Study at your own pace with 24/7 access to courses, progress tracking, and personalized learning paths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 relative">
        {/* Floating Code Icon */}
        <div className="absolute top-20 left-20 text-3xl text-accent/30 animate-float animation-delay-400">
          <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className={`relative rounded-3xl p-16 ${isDark ? 'bg-gradient-to-br from-dark-bg-secondary via-dark-bg-tertiary to-dark-bg-secondary' : 'bg-gradient-to-br from-light-bg-secondary via-light-bg-tertiary to-light-bg-secondary'} border ${isDark ? 'border-dark-border' : 'border-light-border'} shadow-2xl overflow-hidden`}>
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-3xl animate-pulse animation-delay-1000"></div>
            </div>

            <div className="relative z-10 text-center">
              <h2 className={`text-4xl md:text-5xl font-bold mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Developers</span> Worldwide
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Courses Stat */}
                <div className="group">
                  <div className="text-center p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                      <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 relative z-10">
                        {coursesData?.length || 70}+
                      </h3>
                    </div>
                    <p className={`text-lg font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Premium Courses</p>
                  </div>
                </div>

                {/* Roadmaps Stat */}
                <div className="group">
                  <div className="text-center p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                      <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent mb-2 relative z-10">35+</h3>
                    </div>
                    <p className={`text-lg font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Learning Paths</p>
                  </div>
                </div>

                {/* Creators Stat */}
                <div className="group">
                  <div className="text-center p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                      <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary mb-2 relative z-10">
                        {[...new Map(coursesData?.map(course => [course.creator_name, course])).values()].length || 30}+
                      </h3>
                    </div>
                    <p className={`text-lg font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Expert Creators</p>
                  </div>
                </div>

                {/* Users Stat */}
                <div className="group">
                  <div className="text-center p-6 rounded-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                      <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 relative z-10">1000+</h3>
                    </div>
                    <p className={`text-lg font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>Active Learners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Roadmaps Preview */}
      <section className="py-24 relative">
        {/* Floating Decorative Element */}
        <div className="absolute top-10 right-10 text-2xl text-primary/20 animate-float animation-delay-500">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 000 1.562l5 4zm9.25-9.562l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 000-1.562l-5-4zM14.976 3.216l-4 18-1.953-.434 4-18 1.953.434z"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Learning Path</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-3xl mx-auto`}>
              Structured learning paths designed to take you from beginner to expert in your chosen field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend Development */}
            <div className={`group relative rounded-2xl p-8 min-h-[280px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border ${
              isDark ? 'bg-dark-bg-secondary border-dark-border hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10' : 'bg-light-bg-secondary border-light-border hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                <svg className="w-full h-full text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 18.178l-4.62-1.256-.328-3.544h2.27l.158 1.844 2.52.667 2.52-.667.26-2.866H6.96l-.635-6.678h11.35l-.227 2.21H8.822l.204 2.256h8.126l-.654 7.034L12 18.178z" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary p-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} mb-3`}>Frontend Development</h3>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6 leading-relaxed`}>
                  Master modern web technologies including React, Vue, and advanced CSS techniques
                </p>
              </div>

              <Link
                to="/roadmap"
                className="py-3 px-6 text-sm bg-transparent border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group-hover:scale-105 font-semibold"
              >
                Explore Path
              </Link>
            </div>

            {/* Backend Development */}
            <div className={`group relative rounded-2xl p-8 min-h-[280px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border ${
              isDark ? 'bg-dark-bg-secondary border-dark-border hover:bg-gradient-to-br hover:from-secondary/10 hover:to-accent/10' : 'bg-light-bg-secondary border-light-border hover:bg-gradient-to-br hover:from-secondary/5 hover:to-accent/5'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                <svg className="w-full h-full text-secondary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-accent p-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} mb-3`}>Backend Development</h3>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6 leading-relaxed`}>
                  Build robust APIs, databases, and server-side applications with Node.js, Python, and more
                </p>
              </div>

              <Link
                to="/roadmap"
                className="py-3 px-6 text-sm bg-transparent border-2 border-secondary text-secondary rounded-xl hover:bg-secondary hover:text-white transition-all duration-300 group-hover:scale-105 font-semibold"
              >
                Explore Path
              </Link>
            </div>

            {/* Full Stack Development */}
            <div className={`group relative rounded-2xl p-8 min-h-[280px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border ${
              isDark ? 'bg-dark-bg-secondary border-dark-border hover:bg-gradient-to-br hover:from-accent/10 hover:to-primary/10' : 'bg-light-bg-secondary border-light-border hover:bg-gradient-to-br hover:from-accent/5 hover:to-primary/5'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                <svg className="w-full h-full text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.375 16.781l1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 000 1.562l5 4zm9.25-9.562l-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 000-1.562l-5-4zM14.976 3.216l-4 18-1.953-.434 4-18 1.953.434z" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-primary p-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} mb-3`}>Full Stack Development</h3>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6 leading-relaxed`}>
                  Master both frontend and backend technologies to build complete web applications
                </p>
              </div>

              <Link
                to="/roadmap"
                className="py-3 px-6 text-sm bg-transparent border-2 border-accent text-accent rounded-xl hover:bg-accent hover:text-white transition-all duration-300 group-hover:scale-105 font-semibold"
              >
                Explore Path
              </Link>
            </div>

            {/* View All Paths */}
            <div className={`relative rounded-2xl p-8 min-h-[280px] flex flex-col justify-center items-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden border ${
              isDark ? 'bg-gradient-to-br from-dark-bg-secondary to-dark-bg-tertiary border-dark-border' : 'bg-gradient-to-br from-light-bg-secondary to-light-bg-tertiary border-light-border'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary to-secondary p-5 flex items-center justify-center">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>

                <Link
                  to="/roadmap"
                  className="py-4 px-8 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 group font-semibold text-lg"
                >
                  <span>View All Paths</span>
                  <svg className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creators Showcase Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Learn from <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Industry Experts</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-3xl mx-auto`}>
              Our creators are passionate developers and educators committed to your success
            </p>
          </div>
          
          <Suspense fallback={
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
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
      </Suspense>

      <Suspense fallback={
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <ChooseUs />
      </Suspense>

      <Suspense fallback={
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <FAQ />
      </Suspense>

      <Suspense fallback={
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <NewsLetter />
      </Suspense>

      <Suspense fallback={
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <CallToAction />
      </Suspense>

      {/* Featured Courses Section */}
      <Suspense fallback={
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <FeaturedCourses />
      </Suspense>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={scrollToTop}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-8 h-8 text-white group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
