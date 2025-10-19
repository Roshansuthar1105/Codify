import React, { useState, useEffect, useRef } from 'react';
import { Github, BookOpen, Code, Heart, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function CodifyLearningComponent() {
  const [showMotivation, setShowMotivation] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(sectionRef.current, { x: -150, opacity: 0 });

    gsap.to(sectionRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const handleViewRepo = () => {
    window.open('https://github.com/Roshansuthar1105/Codify', '_blank');
  };

  const handleGithubGuide = () => {
    navigate("/contributorGuide")
  };

  return (
    <>
      <div
        className={`
          max-w-5xl mx-auto rounded-2xl p-6 sm:p-10 md:p-12 border shadow-lg relative overflow-hidden 
          ${isDark ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border-dark-border' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-light-border'}
        `}
      >
        <div className="relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Code className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h1 
                className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider 
                  ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
              >
                <span className="text-primary">Codify</span>Learning Platform
              </h1>
            </div>
            <p 
              className={`text-base sm:text-lg max-w-2xl mx-auto 
                ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
            >
              Empowering the next generation of developers with expert-led tutorials and hands-on projects.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              onClick={handleViewRepo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center justify-center px-5 py-3 text-sm sm:text-base rounded-xl font-semibold 
                transition-all duration-300 shadow-lg hover:shadow-xl border
                ${isDark
                  ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border hover:bg-dark-bg-tertiary/80'
                  : 'bg-light-bg-tertiary text-light-text-primary border-light-border hover:bg-light-bg-tertiary/80'}
              `}
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              View Repository
            </motion.button>

            <motion.button
              onClick={handleGithubGuide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center px-5 py-3 text-sm sm:text-base bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              GitHub Guide
            </motion.button>
          </div>

          {/* Motivation Toggle */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowMotivation(!showMotivation)}
              className="text-primary hover:text-primary-dark font-semibold transition-colors duration-200 flex items-center mx-auto text-sm sm:text-base"
            >
              <Heart className="h-4 w-4 mr-2" />
              {showMotivation ? 'Hide' : 'Show'} Contributor Motivation
            </button>
          </div>

          {/* Motivational Content */}
          {showMotivation && (
            <div 
              className={`rounded-2xl p-4 sm:p-6 shadow-inner border-l-4 border-primary 
              transition-all duration-300 
              ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'}`}
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <h2 
                  className={`text-lg sm:text-xl font-bold 
                    ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                >
                  Join Our Mission!
                </h2>
              </div>

              <div className={`space-y-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                <p className="leading-relaxed text-sm sm:text-base">
                  <strong className={isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}>
                    Every line of code you contribute shapes the future of learning.
                  </strong>
                  When you contribute to CodifyLearning, you're not just writing code – you're building bridges
                  to knowledge for developers around the world.
                </p>

                <p className="leading-relaxed text-sm sm:text-base">
                  That tutorial you improve today might be the breakthrough moment for someone
                  learning to code in a different timezone. That bug you fix could remove a barrier
                  frustrating learners for weeks. Your documentation update might be exactly what
                  transforms confusion into clarity for hundreds of aspiring developers.
                </p>

                <div 
                  className={`p-4 rounded-lg border-l-4 border-primary 
                  ${isDark ? 'bg-dark-bg-primary/50' : 'bg-light-bg-primary/50'}`}
                >
                  <p 
                    className={`font-medium mb-2 text-sm sm:text-base 
                      ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                  >
                    Why Your Contribution Matters:
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex items-start"><span className="text-primary mr-2">•</span> You're democratizing quality education in tech</li>
                    <li className="flex items-start"><span className="text-primary mr-2">•</span> Every improvement multiplies across our global community</li>
                    <li className="flex items-start"><span className="text-primary mr-2">•</span> You gain experience while making a meaningful impact</li>
                    <li className="flex items-start"><span className="text-primary mr-2">•</span> You become part of a network of passionate educators and developers</li>
                  </ul>
                </div>

                <p 
                  className={`leading-relaxed font-semibold text-sm sm:text-base 
                    ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                >
                  Remember: You don’t need to be perfect to contribute. Whether it’s fixing a typo,
                  improving a code example, or adding a new feature – every contribution is valuable.
                  We’re all learning together, and your unique perspective adds something special.
                </p>

                <div 
                  className={`flex items-center justify-center mt-6 p-4 rounded-2xl 
                  ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <span 
                    className={`font-semibold text-sm sm:text-base 
                      ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                  >
                    Join thousands of contributors making learning accessible to everyone!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className={`text-center mt-8 pt-6 border-t ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
            <p className={`text-sm sm:text-base ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Ready to make an impact? Start with small contributions and grow into a core maintainer.
            </p>
            <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
              Together, we're building the future of developer education. 🚀
            </p>
          </div>
        </div>
      </div>
      </>
  );
}
