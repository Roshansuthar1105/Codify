import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { RiMenu3Fill } from "react-icons/ri";
import { FaGraduationCap, FaArrowUp, FaArrowDown } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeColorSelector from "./ThemeColorSelector";
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

  // Scroll to top handler
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

          {/* Desktop Navigation */}
          <div className="hidden ">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                About
              </NavLink>

              <NavLink
                to="/editor"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Editor
              </NavLink>
              

              <NavLink
                to="/courses"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Courses
              </NavLink>
              <NavLink
                to="/notes"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Notes
              </NavLink>
              <NavLink
                to="/roadmap"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Roadmaps
              </NavLink>

              <NavLink
                to="/contributors"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Contributor
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Contact
              </NavLink>


              <NavLink
                to="/bookmarks"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-lg font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Bookmark
              </NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `
                      px-3 py-2 rounded-md text-lg font-medium transition-colors
                      ${isActive
                        ? 'bg-primary text-white'
                        : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                    `}
                  >
                    Dashboard
                  </NavLink>

                  {(userdata?.isAdmin || userdata?.isReadOnlyAdmin) && (
                    <NavLink
                      to="/admin"
                      className={({ isActive }) => `
                        px-3 py-2 rounded-md text-lg font-medium transition-colors
                        ${isActive
                          ? 'bg-primary text-white'
                          : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                      `}
                    >
                      Admin
                    </NavLink>
                  )}

                  <NavLink
                    to="/logout"
                    className={`px-3 py-2 rounded-md text-lg font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary '} hover:bg-primary-400 hover:text-white transition-colors`}
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={`px-3 py-2 rounded-md text-lg font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary '} hover:bg-primary-400 hover:text-white transition-colors`}
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>


          {/* Theme Controls & Back to Top */}
          <div className="hidden  items-center space-x-3">
            <ThemeSwitcher />
            <ThemeColorSelector />
            {/* Back to Top Arrow */}
            <button
              onClick={handleBackToTop}
              className="ml-4 p-2 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow transition-colors focus:outline-none"
              title="Back to Top"
              style={{ position: 'relative', right: 0 }}
            >
              <FaArrowUp className="text-xl" />
            </button>
            {/* Top to Bottom Arrow */}
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="ml-2 p-2 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow transition-colors focus:outline-none"
              title="Top to Bottom"
              style={{ position: 'relative', right: 0 }}
            >
              <FaArrowDown className="text-xl" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex  items-center space-x-3">
            <ThemeSwitcher />
            <ThemeColorSelector />
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md 
    ${isDark ? "text-white" : "text-black"} 
    hover:bg-white/10 focus:outline-none`}
            >
              <span className="sr-only">Open main menu</span>
              <RiMenu3Fill className="block h-6 w-6" />
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