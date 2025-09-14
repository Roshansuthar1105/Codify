import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { RiCloseLargeLine } from 'react-icons/ri';
import { FaBook, FaBookReader, FaBookmark, FaEnvelope, FaGraduationCap, FaHome, FaRoad, FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus, FaUserTie, FaArrowUp, FaArrowDown, FaQuestionCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { FaCode } from "react-icons/fa";
import ThemeSwitcher from './ThemeSwitcher';
import ThemeColorSelector from './ThemeColorSelector';

function MobileMenu({ isOpen, onClose, isLoggedIn, userdata }) {
  const { theme } = useTheme();
  const [isThemeColorOpen, setThemeColorOpen] = useState(false);

  const isDark = theme === 'dark';

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onClose();
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setThemeColorOpen(false);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return createPortal(
    <div
      className={`
        fixed inset-0 z-[9000]
        ${isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
        }
        transition-all duration-500 ease-out
      `}
    >
      <div className="relative h-full w-full">
        {/* Enhanced Overlay */}
        <div
          className={`
            absolute inset-0 backdrop-blur-md
            transition-opacity duration-500 ease-out
            ${isOpen ? "opacity-100" : "opacity-0"}
            ${isDark
              ? "bg-gradient-to-br from-black/50 via-gray-900/40 to-black/50"
              : "bg-gradient-to-br from-black/30 via-gray-500/20 to-black/30"
            }
          `}
          onClick={onClose}
        ></div>

        {/* Menu panel - Enhanced but preserving exact structure */}
        <div
          className={`
            absolute right-0 top-0 h-full w-[85vw] sm:w-80 md:w-96 max-w-sm overflow-y-auto z-[9100]
            ${isDark ? "bg-dark-bg-primary" : "bg-white"}
            ${isDark ? "text-dark-text-primary" : "text-light-text-primary"}
            shadow-2xl transform transition-all duration-500 ease-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
            backdrop-blur-xl border-l
            ${isDark ? "border-gray-700/30" : "border-gray-200/40"}
          `}
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgb(15 23 42 / 0.98), rgb(30 41 59 / 0.98))'
              : 'linear-gradient(135deg, rgb(255 255 255 / 0.98), rgb(248 250 252 / 0.98))'
          }}
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${isDark ? 'from-primary/10 via-transparent to-primary/5' : 'from-primary/8 via-transparent to-primary/3'}`} />
          </div>

          <div className="px-4 pt-5 pb-6 space-y-6 relative">
            {/* Header - Enhanced but same structure */}
            <div className="flex items-center justify-between">
              <div className="flex items-center group">
                <div className="relative">
                  <FaGraduationCap
                    className={`text-2xl transition-transform duration-300 group-hover:rotate-12 ${isDark ? "text-primary" : "text-primary"
                      }`}
                  />
                  <div className="absolute inset-0 text-2xl text-primary opacity-20 blur-sm group-hover:opacity-40 transition-all duration-300">
                    <FaGraduationCap />
                  </div>
                </div>
                <span className="ml-2 font-righteous text-xl">Codify</span>
              </div>
              <button
                onClick={onClose}
                className={`
                  rounded-xl p-2 focus:outline-none transition-all duration-300 hover:scale-105 z-[9200] group
                  ${isDark
                    ? "text-dark-text-primary hover:bg-dark-bg-tertiary"
                    : "text-light-text-primary hover:bg-light-bg-tertiary"
                  }
                `}
              >
                <span className="sr-only">Close menu</span>
                <RiCloseLargeLine className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
              </button>
            </div>

            <div className="mt-6">
              <nav className="grid gap-y-1">
                <NavLink
                  to="/"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  {/* Active indicator */}
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaHome className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Home</span>
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaUser className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">About</span>
                </NavLink>

                <NavLink
                  to="/editor"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaCode className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Code Editor</span>
                </NavLink>

                <NavLink
                  to="/courses"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaBook className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Courses</span>
                </NavLink>

                <NavLink
                  to="/notes"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaBookReader className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Notes</span>
                </NavLink>

                <NavLink
                  to="/roadmap"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaRoad className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Roadmaps</span>
                </NavLink>

                <NavLink
                  to="/bookmarks"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaBookmark className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Bookmark</span>
                </NavLink>

                <NavLink
                  to="/contributors"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaUser className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Contributors</span>
                </NavLink>

                <NavLink
                  to="/Questions"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaQuestionCircle className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Questions</span>
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={onClose}
                  className={({ isActive }) => `
                    px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                    ${isActive
                      ? isDark
                        ? "bg-dark-bg-tertiary text-primary shadow-lg"
                        : "bg-light-bg-tertiary text-primary shadow-md"
                      : isDark
                        ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                        : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                    }
                  `}
                >
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                    }`} />
                  <FaEnvelope className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                  <span className="text-xl">Contact</span>
                </NavLink>

                {isLoggedIn ? (
                  <>
                    <NavLink
                      to="/dashboard"
                      onClick={onClose}
                      className={({ isActive }) => `
                        px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                        ${isActive
                          ? isDark
                            ? "bg-dark-bg-tertiary text-primary shadow-lg"
                            : "bg-light-bg-tertiary text-primary shadow-md"
                          : isDark
                            ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                            : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                        }
                      `}
                    >
                      <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                        }`} />
                      <FaUser className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                      <span className="text-xl">Dashboard</span>
                    </NavLink>

                    {(userdata?.isAdmin || userdata?.isReadOnlyAdmin) && (
                      <NavLink
                        to="/admin"
                        onClick={onClose}
                        className={({ isActive }) => `
                          px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                          ${isActive
                            ? isDark
                              ? "bg-dark-bg-tertiary text-primary shadow-lg"
                              : "bg-light-bg-tertiary text-primary shadow-md"
                            : isDark
                              ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                              : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                          }
                        `}
                      >
                        <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${({ isActive }) => isActive ? "bg-primary scale-y-100" : "bg-primary scale-y-0 group-hover:scale-y-50 opacity-50"
                          }`} />
                        <FaUserTie className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                        <span className="text-xl">Admin Panel</span>
                      </NavLink>
                    )}

                    <NavLink
                      to="/logout"
                      onClick={onClose}
                      className={`
                        px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                        ${isDark
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                        }
                      `}
                    >
                      <FaSignOutAlt className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                      <span className="text-xl">Logout</span>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={onClose}
                      className={`
                        px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                        ${isDark
                          ? "text-dark-text-primary hover:bg-dark-bg-tertiary/70"
                          : "text-light-text-primary hover:bg-light-bg-tertiary/70"
                        }
                      `}
                    >
                      <FaSignInAlt className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                      <span className="text-xl">Login</span>
                    </NavLink>

                    <NavLink
                      to="/signup"
                      onClick={onClose}
                      className={`
                        px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-2 group relative overflow-hidden
                        ${isDark
                          ? "bg-primary text-white hover:bg-primary-dark"
                          : "bg-primary text-white hover:bg-primary-dark"
                        }
                      `}
                    >
                      <FaUserPlus className="text-xl transition-transform duration-200 group-hover:scale-110" />{" "}
                      <span className="text-xl">Sign Up</span>
                    </NavLink>
                  </>
                )}
              </nav>

              {/* Theme Controls - Preserved exactly */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <ThemeSwitcher />
                  <ThemeColorSelector
                    isOpen={isThemeColorOpen}
                    onToggle={() => setThemeColorOpen((prev) => !prev)}
                    onClose={() => setThemeColorOpen(false)}
                  />
                </div>
              </div>

              {/* Scroll Controls - Preserved exactly */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <button
                    onClick={handleBackToTop}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm"
                    title="Back to Top"
                  >
                    <FaArrowUp className="text-xs" />
                    <span>Top</span>
                  </button>
                  <button
                    onClick={() => {
                      window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth",
                      });
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm"
                    title="Go to Bottom"
                  >
                    <FaArrowDown className="text-xs" />
                    <span>Bottom</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MobileMenu;