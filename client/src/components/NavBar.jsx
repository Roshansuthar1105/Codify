import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { FaGraduationCap, FaUser } from "react-icons/fa";
import { NAV_LINKS, CONDENSED_LINKS } from "../constants/navLinks";
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
    : (userdata?.firstName || userdata?.username || (userdata?.email ? userdata.email.split('@')[0] : ' '));
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

  return (


    <nav
      className={`
      sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-sm
      ${scrolled
          ? `${isDark ? 'bg-dark-bg-secondary/85 border-dark-border' : 'bg-light-bg-secondary/85 border-light-border'} border-b`
          : `${isDark ? 'bg-dark-bg-secondary/70 border-dark-border/50' : 'bg-light-bg-secondary/70 border-light-border/50'} border-b`}
      ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}
    `}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
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


          {/* Right Side - Profile & Controls */}
          <div className="flex items-center space-x-3">
            {/* Profile Section - Clickable Box */}
            {/* Mobile hamburger */}
            <button
              onClick={toggleMenu}
              className={`sm:hidden flex items-center justify-center p-2 rounded-lg border transition-colors ${
                isDark ? 'border-dark-border text-dark-text-primary hover:bg-dark-bg-tertiary' : 'border-light-border text-light-text-primary hover:bg-light-bg-tertiary'
              }`}
              aria-label="Open menu"
            >
              <RiMenu3Fill className="text-xl" />
            </button>

            {/* Profile button (desktop/tablet) */}
            <button
              onClick={toggleMenu}
              className={`hidden sm:flex items-center space-x-2 sm:space-x-3 px-2 py-1 sm:px-4 sm:py-2 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                isDark 
                  ? 'bg-dark-bg-tertiary/50 border-dark-border hover:border-primary/40' 
                  : 'bg-light-bg-tertiary/50 border-light-border hover:border-primary/40'
              }`}
            >
              <span
                className={`hidden sm:block max-w-[10rem] md:max-w-[14rem] truncate text-sm font-semibold tracking-wide ${isDark ? 'text-white drop-shadow-sm' : 'text-gray-800'}`}
                title={displayName}
                aria-label="User name"
              >
                {displayName}
              </span>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {profileImageUrl ? (
                  <img 
                    src={profileImageUrl}
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
