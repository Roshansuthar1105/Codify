import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { FaGraduationCap, FaUser, FaBookOpen, FaRoad, FaStickyNote } from "react-icons/fa";
import MobileMenu from "./MobileMenu";

function NavBar() {
  const { isLoggedIn, userdata } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';

  // Function to handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Close mobile menu when window is resized to desktop size
    const handleResize = () => {
      if (window.innerWidth > 1080) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle the side menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (


    <nav
      className={`
      sticky top-0 z-50 w-full transition-all duration-300
      ${scrolled
          ? `${isDark ? 'bg-dark-bg-primary/70 border-white/50' : 'bg-light-bg-primary/70 border-black/50'} border-b-2 shadow-nav backdrop-blur-sm`
          : `${isDark ? 'border-white' : ' border-black'} border-0`}
      ${isDark ? 'text-dark-text-primary' : 'text-white'}
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className={`flex items-center space-x-2 font-bold text-3xl text-primary-500 transition-colors`}>
              <FaGraduationCap className="text-3xl" />
              <span className="font-righteous text-3xl">Codify</span>
            </NavLink>
            
          </div>

          {/* Direct Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLink
              to="/courses"
              className={({ isActive }) => `
                flex items-center space-x-2 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200
                ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : (isDark ? 'text-dark-text-primary hover:bg-dark-bg-secondary hover:text-white' : 'text-light-text-primary hover:bg-light-bg-secondary hover:text-white')}
              `}
            >
              <FaBookOpen className="text-lg" />
              <span>Courses</span>
            </NavLink>

            <NavLink
              to="/roadmap"
              className={({ isActive }) => `
                flex items-center space-x-2 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200
                ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : (isDark ? 'text-dark-text-primary hover:bg-dark-bg-secondary hover:text-white' : 'text-light-text-primary hover:bg-light-bg-secondary hover:text-white')}
              `}
            >
              <FaRoad className="text-lg" />
              <span>Roadmaps</span>
            </NavLink>

            <NavLink
              to="/notes"
              className={({ isActive }) => `
                flex items-center space-x-2 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200
                ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : (isDark ? 'text-dark-text-primary hover:bg-dark-bg-secondary hover:text-white' : 'text-light-text-primary hover:bg-light-bg-secondary hover:text-white')}
              `}
            >
              <FaStickyNote className="text-lg" />
              <span>Notes</span>
            </NavLink>
          </div>


          {/* Right Side - Profile & Controls */}
          <div className="flex items-center space-x-3">
            {/* Profile Section - Clickable Box */}
            <button
              onClick={toggleMenu}
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDark 
                  ? 'bg-gradient-to-r from-dark-bg-secondary/90 to-dark-bg-tertiary/90 border-primary/40 hover:border-primary/60 hover:from-primary/10 hover:to-primary/20' 
                  : 'bg-gradient-to-r from-light-bg-secondary/90 to-light-bg-tertiary/90 border-primary/40 hover:border-primary/60 hover:from-primary/10 hover:to-primary/20'
              }`}
            >
              <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-white drop-shadow-sm' : 'text-gray-800'}`}>
                {userdata?.firstName || userdata?.username || 'User'}
              </span>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                {userdata?.profileImage ? (
                  <img 
                    src={userdata.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-primary text-sm" />
                )}
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        isLoggedIn={isLoggedIn}
        userdata={userdata}
      />
    </nav>
  );
}

export default NavBar;