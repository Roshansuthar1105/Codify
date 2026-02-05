// src/components/NavBar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { FaGraduationCap, FaUser } from "react-icons/fa";
import { NAV_LINKS, CONDENSED_LINKS } from "../constants/navLinks";
import { RiMenu3Fill } from "react-icons/ri";
import MobileMenu from "./MobileMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeColorSelector from "./ThemeColorSelector";

function NavBar() {
  const { isLoggedIn, userdata } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);

  const isDark = theme === "dark";

  // Compute display name
  const displayName =
    userdata?.firstName && userdata?.lastName
      ? `${userdata.firstName} ${userdata.lastName}`
      : userdata?.firstName ||
      userdata?.username ||
      (userdata?.email ? userdata.email.split("@")[0] : "Guest");

  // Compute profile image URL
  const profileImageUrl =
    userdata?.profileImage ||
    userdata?.avatar ||
    userdata?.picture ||
    (Array.isArray(userdata?.photos) && userdata.photos[0]?.value) ||
    userdata?.image ||
    "";

  // Handle scroll and resize
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleResize = () => {
      if (window.innerWidth > 1080) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleColorSelector = () =>
    setIsColorSelectorOpen(!isColorSelectorOpen);
  const closeColorSelector = () => setIsColorSelectorOpen(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Generate initials for profile fallback
  const getInitials = () => {
    if (!isLoggedIn || !userdata) {
      return "U";
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
    return "U";
  };

  return (
    <nav
      className={`
        sticky top-0 z-50 w-full transition-all duration-500 backdrop-blur-xl border-b
        ${scrolled
          ? isDark
            ? "bg-gradient-to-br from-gray-800 to-gray-900 border-dark-border text-dark-text-primary"
            : "bg-gradient-to-br from-blue-50 to-indigo-50 border-light-border text-light-text-primary"
          : isDark
            ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-dark-border/50 text-dark-text-primary"
            : "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border-light-border/50 text-light-text-primary"
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
          {/* Logo - Enhanced */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className={`flex items-center space-x-2 font-bold text-2xl sm:text-3xl text-primary transition-colors`}>
              <FaGraduationCap className="text-2xl sm:text-3xl" />
              <span className="font-righteous text-2xl sm:text-3xl">Codify</span>
            </NavLink>
            
          </div>

          {/* Direct Navigation Links (Desktop full) */}
          <div className="hidden xl:flex items-center space-x-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200
                  ${isActive
                    ? 'bg-primary text-white shadow-md'
                    : isDark
                      ? 'text-dark-text-primary/90 hover:text-white hover:bg-dark-bg-tertiary/70'
                      : 'text-light-text-primary/90 hover:text-light-text-primary hover:bg-light-bg-tertiary'}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                `}
              >
                <Icon className="text-base opacity-80 group-hover:opacity-100" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Condensed Navigation Links (Between lg and xl) */}
          <div className="hidden lg:flex xl:hidden items-center space-x-2">
            {NAV_LINKS.filter(l => CONDENSED_LINKS.includes(l.to)).map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  group flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-primary text-white shadow'
                    : isDark
                      ? 'text-dark-text-primary/90 hover:text-white hover:bg-dark-bg-tertiary/70'
                      : 'text-light-text-primary/90 hover:bg-light-bg-tertiary'}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                `}
              >
                <Icon className="text-sm" />
                <span>{label === 'Questions' ? 'Q&A' : label}</span>
              </NavLink>
            ))}
          </div>

                    {/* Clean label */}
                    <span className="relative z-10 transition-all duration-300">
                      {label}
                    </span>

                    {/* Minimal active indicator */}
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${isActive
                        ? "w-8 bg-white/70"
                        : "w-0 group-hover:w-6 bg-primary/50"
                        }`}
                    />

                    {/* Soft hover highlight */}
                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${isActive
                        ? "bg-white/5"
                        : "bg-transparent group-hover:bg-white/5"
                        }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side - Controls & Profile */}
          <div className="flex items-center space-x-3">
            {/* Single Instance for Both Desktop & Mobile */}
            <ThemeSwitcher />
            <ThemeColorSelector
              isOpen={isColorSelectorOpen}
              onToggle={toggleColorSelector}
              onClose={closeColorSelector}
            />

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

            {/* Enhanced Profile button */}
            <button
              onClick={toggleMenu}
              className={`
                hidden sm:flex items-center gap-2 sm:gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 group relative overflow-hidden
                ${isDark
                  ? "bg-gray-700/50 border-gray-600/40 text-white hover:border-gray-500/60"
                  : "bg-white/60 border-white/50 text-gray-800 hover:border-white/70"
                }
              `}
              style={{
                WebkitBackdropFilter: "blur(12px)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Subtle hover effect background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)"
                    : "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)",
                }}
              />

              {/* User name with explicit styling */}
              <span
                className="hidden sm:block max-w-[10rem] md:max-w-[14rem] truncate text-sm font-semibold tracking-wide relative z-10"
                style={{
                  color: isDark ? "#ffffff" : "#1f2937",
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
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
                      {getInitials() !== "U" ? (
                        <span className="text-white text-xs font-bold">
                          {getInitials()}
                        </span>
                      ) : (
                        <FaUser className="text-white text-sm" />
                      )}
                    </div>
                  )}
                </div>
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
