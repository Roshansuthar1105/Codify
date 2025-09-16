import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { FaGraduationCap, FaUser, FaBookOpen, FaRoad, FaStickyNote } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import MobileMenu from "./MobileMenu";

function NavBar() {
  const { isLoggedIn, userdata } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';
  const displayName = (userdata?.firstName && userdata?.lastName)
    ? `${userdata.firstName} ${userdata.lastName}`
    : (userdata?.firstName || userdata?.username || (userdata?.email ? userdata.email.split('@')[0] : 'Guest'));
  const profileImageUrl = userdata?.profileImage
    || userdata?.avatar
    || userdata?.picture
    || (Array.isArray(userdata?.photos) && userdata.photos[0]?.value)
    || userdata?.image
    || '';

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

  // Generate initials for profile fallback
  const getInitials = () => {
    if (!isLoggedIn || !userdata) {
      return 'U';
    }
    if (userdata?.firstName && userdata?.lastName) {
      return `${userdata.firstName.charAt(0)}${userdata.lastName.charAt(0)}`.toUpperCase();
    }
    if (userdata?.firstName) {
      return userdata.firstName.charAt(0).toUpperCase();
    }
    if (userdata?.username) {
      return userdata.username.charAt(0).toUpperCase();
    }
    if (userdata?.email) {
      return userdata.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Pre-defined classes for better browser compatibility
  const navBaseClasses = "sticky top-0 z-50 w-full transition-all duration-500 backdrop-blur-xl border-b";
  const scrolledClasses = scrolled
    ? isDark
      ? "bg-gradient-to-br from-gray-800 to-gray-900 border-dark-border text-dark-text-primary"
      : "bg-gradient-to-br from-blue-50 to-indigo-50 border-light-border text-light-text-primary"
    : isDark
      ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-dark-border/50 text-dark-text-primary"
      : "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border-light-border/50 text-light-text-primary";

  const profileButtonClasses = "hidden sm:flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 group relative overflow-hidden";
  const profileButtonTheme = isDark
    ? "bg-gray-700/50 border-gray-600/40 text-white hover:border-gray-500/60"
    : "bg-white/60 border-white/50 text-gray-800 hover:border-white/70";

  return (
    <nav className={`${navBaseClasses} ${scrolledClasses}`}>
      <div
        className={`
          sticky top-0 z-50 w-full transition-all duration-500 backdrop-blur-xl border-b
          ${isDark
            ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 text-dark-text-primary border-dark-border"
            : "bg-gradient-to-br from-blue-50 to-indigo-50 text-light-text-primary border-light-border"
          }
          relative overflow-hidden
        `}
      >
        {/* Softened Decorative Background */}
        <div
          className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] opacity-20 ${isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
            }`}
        >
          <div
            className={`absolute inset-0 ${isDark
              ? "bg-gradient-to-br from-dark-bg-primary/95 via-transparent to-dark-bg-primary/60"
              : "bg-gradient-to-br from-light-bg-primary/95 via-transparent to-light-bg-primary/60"
              }`}
          ></div>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/3 blur-3xl"></div>

        {/* Navbar Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo - Enhanced but preserving original colors */}
            <div className="flex-shrink-0 flex items-center">
              <NavLink
                to="/"
                className="flex items-center space-x-3 font-bold text-2xl sm:text-3xl text-primary transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative">
                  <FaGraduationCap className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:rotate-12" />
                  <div className="absolute inset-0 text-2xl sm:text-3xl text-primary opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300">
                    <FaGraduationCap />
                  </div>
                </div>
                <h2 className="text-primary text-3xl font-playwrite-gb flex items-center">
                  Codify
                </h2>
              </NavLink>
            </div>

            {/* Subtle & Aesthetic Navigation Links */}
            <div className="hidden lg:flex items-center space-x-3">
              {[
                { to: "/courses", label: "Courses", icon: <FaBookOpen /> },
                { to: "/roadmap", label: "Roadmaps", icon: <FaRoad /> },
                { to: "/notes", label: "Notes", icon: <FaStickyNote /> },
              ].map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `
        flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-base font-medium 
        transition-all duration-300 ease-out relative group
        transform hover:scale-[1.02] hover:-translate-y-0.5
        ${isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : isDark
                        ? "bg-gray-800/40 border border-gray-700/30 text-dark-text-primary hover:bg-primary/10 hover:text-white hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
                        : "bg-white/25 border border-white/20 text-light-text-primary hover:bg-primary/10 hover:text-black hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
                    }
      `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Subtle background glow */}
                      <div className={`absolute inset-0 rounded-xl transition-all duration-400 ${isActive
                        ? "bg-gradient-to-br from-primary/20 to-transparent opacity-100"
                        : "bg-gradient-to-br from-primary/15 to-transparent opacity-0 group-hover:opacity-100"
                        }`} />

                      {/* Icon with gentle animation */}
                      <span className={`text-lg transition-all duration-300 relative z-10 ${isActive
                        ? "scale-105"
                        : "group-hover:scale-110"
                        }`}>
                        {icon}
                      </span>

                      {/* Clean label */}
                      <span className="relative z-10 transition-all duration-300">
                        {label}
                      </span>

                      {/* Minimal active indicator */}
                      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${isActive
                        ? "w-8 bg-white/70"
                        : "w-0 group-hover:w-6 bg-primary/50"
                        }`} />

                      {/* Soft hover highlight */}
                      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive
                        ? "bg-white/5"
                        : "bg-transparent group-hover:bg-white/5"
                        }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Side - Enhanced Profile & Controls */}
            <div className="flex items-center space-x-3">
              {/* Mobile hamburger - softer design */}
              <button
                onClick={toggleMenu}
                className={`
                  sm:hidden flex items-center justify-center p-2.5 rounded-xl border transition-all duration-300 hover:scale-105
                  ${isDark
                    ? "bg-gradient-to-br from-gray-700/60 to-gray-800/60 border-gray-600/40 text-dark-text-primary hover:bg-primary/15"
                    : "bg-white/50 border-white/40 text-light-text-primary hover:bg-primary/15"
                  }
                `}
                aria-label="Open menu"
              >
                <RiMenu3Fill className="text-xl" />
              </button>

              {/* FIXED: Enhanced Profile button with better cross-browser compatibility */}
              <button
                onClick={toggleMenu}
                className={`${profileButtonClasses} ${profileButtonTheme}`}
                style={{
                  WebkitBackdropFilter: 'blur(12px)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Subtle hover effect background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isDark
                      ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)'
                      : 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)'
                  }}
                />

                {/* FIXED: User name with explicit styling for cross-browser compatibility */}
                <span
                  className="hidden sm:block max-w-[10rem] md:max-w-[14rem] truncate text-sm font-semibold tracking-wide relative z-10"
                  style={{
                    color: isDark ? '#ffffff' : '#1f2937',
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                  title={displayName}
                  aria-label="User name"
                >
                  {displayName}
                </span>

                {/* Enhanced Profile Avatar */}
                <div className="relative z-10 group/avatar">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover/avatar:scale-105 ring-2 ring-transparent group-hover/avatar:ring-primary/20">
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                        {getInitials() !== 'U' ? (
                          <span className="text-white text-xs font-bold">
                            {getInitials()}
                          </span>
                        ) : (
                          <FaUser className="text-white text-sm" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Subtle online indicator */}
                  {/* <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-current opacity-80 animate-pulse" /> */}
                </div>
              </button>
            </div>
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