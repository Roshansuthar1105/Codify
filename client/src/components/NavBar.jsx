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
      if (window.innerWidth > 768) {
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
    // className={`
    //   sticky top-0 z-50 w-full transition-all duration-300 ${isDark ? 'bg-dark-bg-primary/95' : 'bg-light-bg-primary/95'} shadow-nav backdrop-blur-sm
    //   ${isDark ? 'text-dark-text-primary' : 'text-white'}
    // `}
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
            <NavLink to="/" className={`flex items-center space-x-2 font-bold text-xl text-primary-500 transition-colors`}>
              <FaGraduationCap className="text-2xl" />
              <span className="font-righteous">Codify</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
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
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                About
              </NavLink>

              <NavLink
                to="/courses"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Courses
              </NavLink>

              <NavLink
                to="/roadmap"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Roadmaps
              </NavLink>

              <NavLink
                to="/C"
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
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
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white'
                    : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                `}
              >
                Contact
              </NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `
                      px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-primary text-white'
                        : `${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:bg-primary-400 hover:text-white`}
                    `}
                  >
                    Dashboard
                  </NavLink>

                  {userdata?.isAdmin && (
                    <NavLink
                      to="/admin"
                      className={({ isActive }) => `
                        px-3 py-2 rounded-md text-sm font-medium transition-colors
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
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary '} hover:bg-primary-400 hover:text-white transition-colors`}
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary '} hover:bg-primary-400 hover:text-white transition-colors`}
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary '} hover:bg-primary-400 hover:text-white transition-colors`}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>


          {/* Theme Controls & Back to Top */}
          <div className="hidden md:flex items-center space-x-3">
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
          <div className="flex md:hidden items-center space-x-3">
            <ThemeSwitcher />
            <ThemeColorSelector />
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'} focus:outline-none`}
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

// src/components/NavBar.jsx
// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../store/auth';
// import './css/Navbar.css'; // Import your CSS styles
// import { RiCloseLargeLine, RiMenu3Fill } from 'react-icons/ri';

// const NavBar = () => {
//   const { isLoggedIn, LogoutUser, userdata } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     LogoutUser();
//     navigate('/login'); // Redirect to login after logout
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 1024);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <h1>Codify</h1>
//         {isMobile ? (
//           <button onClick={toggleMenu} className="menu-toggle">
//             {isMenuOpen ? <RiCloseLargeLine /> : <RiMenu3Fill />}
//           </button>
//         ) : null}
//       </div>
//       {(isMenuOpen || !isMobile) && (
//         <ul className="navbar-links">
//           <li>
//             <NavLink to="/courses" onClick={toggleMenu}>
//               Courses
//             </NavLink>
//           </li>
//           {isLoggedIn ? (
//             <>
//               <li>
//                 <NavLink to={userdata.isAdmin ? '/admin' : '/dashboard'} onClick={toggleMenu}>
//                   Dashboard
//                 </NavLink>
//               </li>
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <NavLink to="/login" onClick={toggleMenu}>
//                   Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/signup" onClick={toggleMenu}>
//                   Signup
//                 </NavLink>
//               </li>
//             </>
//           )}
//           {userdata.isAdmin && (
//             <li>
//               <NavLink to="/admin" onClick={toggleMenu}>
//                 Admin Panel
//               </NavLink>
//             </li>
//           )}
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default NavBar;
