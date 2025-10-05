import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.set(sectionRef.current, { scale: 0.9, opacity: 0 });
    gsap.to(sectionRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 sm:py-24 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto relative">
        <div
          className={`
            relative rounded-2xl sm:rounded-3xl p-6 sm:p-16 border shadow-lg overflow-hidden
            ${isDark 
              ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border-dark-border text-white' 
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-light-border text-gray-900'
            }
          `}
        >
          <div className="relative z-10 text-center">
            <div className={`
              inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border mb-6 sm:mb-8 shadow-lg
              ${isDark 
                ? 'bg-white/30 border-white/50 text-white' 
                : 'bg-blue-100/80 border-blue-200/80 text-purple-800'
              }
            `}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? 'bg-white' : 'bg-primary'
              }`}></span>
              <span className={`text-xs sm:text-sm font-bold drop-shadow-sm ${
                isDark ? 'text-white' : 'text-primary'
              }`}>
                🚀 Limited Time Offer
              </span>
            </div>
            <h2 className={`text-3xl sm:text-5xl md:text-6xl font-righteous tracking-wider mb-6 sm:mb-8 leading-tight drop-shadow-lg ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Start Your
              <span className={`block font-righteous tracking-wider animate-pulse drop-shadow-lg text-primary`
              }>
                Learning Journey?
              </span>
            </h2>
            <p className={`text-base sm:text-xl mb-8 sm:mb-12 max-w-xl sm:max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium ${
              isDark ? 'text-white' : 'text-gray-700'
            }`}>
              Join thousands of successful learners and transform your career
              today with our comprehensive learning platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="/courses"
                className={`
                  group py-3 sm:py-4 px-6 sm:px-10 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg
                  ${isDark 
                    ? 'bg-white text-primary' 
                    : 'bg-primary text-white hover:bg-primary'
                  }
                `}
              >
                <span>Browse Courses</span>
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

              {!isLoggedIn && 
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href="/signup"
                  className={`
                    group py-3 sm:py-4 px-6 sm:px-10 bg-transparent border-2 font-semibold rounded-xl hover:bg-white transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg
                    ${isDark 
                      ? 'border-white text-white hover:text-primary' 
                      : 'border-primary text-primary hover:text-primary'
                    }
                  `}
                >
                  <span>Sign Up Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:scale-110 transition-transform"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100-2h3.586l-1.293-1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.a>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;