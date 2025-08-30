import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { RiMenu3Fill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeColorSelector from "./ThemeColorSelector";
import MobileMenu from "./MobileMenu";
import { Calendar, ListTodo, X } from "lucide-react"; // ✅ icons
import TodoList from "./TodoList"
import CalenderCompo from "./Calendar"
import { usePopup } from "../context/PopupContext";

function NavBar() {
  const { isLoggedIn, userdata } = useAuth();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { showTodo, showCalendar, toggleTodo, toggleCalendar } = usePopup();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`
      sticky top-0 z-50 w-full transition-all duration-300
      ${
        scrolled
          ? `${
              isDark
                ? "bg-dark-bg-primary/70 border-white/50"
                : "bg-light-bg-primary/70 border-black/50"
            } border-b-2 shadow-nav backdrop-blur-sm`
          : `${isDark ? "border-white" : " border-black"} border-0`
      }
      ${isDark ? "text-dark-text-primary" : "text-white"}
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink
              to="/"
              className={`flex items-center space-x-2 font-bold text-3xl text-primary-500 transition-colors`}
            >
              <FaGraduationCap className="text-3xl" />
              <span className="font-righteous text-3xl">Codify</span>
            </NavLink>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* ✅ Todo & Calendar icons */}
            <div className="flex items-center space-x-2">
            <button
                onClick={toggleCalendar}
                className="p-2 rounded-full hover:bg-primary-500/20 transition"
                title="Calendar"
              >
                <Calendar className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />
              </button>

              <button
                onClick={toggleTodo}
                className="p-2 rounded-full hover:bg-primary-500/20 transition"
                title="Todo"
              >
                <ListTodo className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />
              </button>
            </div>

            {/* ✅ Theme Controls */}
            <ThemeSwitcher />
            <ThemeColorSelector />
              {/* Mobile menu */}
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md 
                ${isDark ? "text-white" : "text-black"} 
                hover:bg-white/10 focus:outline-none`}
            >
              <RiMenu3Fill className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isLoggedIn && showTodo && (
        <div className="absolute right-28 top-16 z-50 w-80">
          <TodoList />
        </div>
      )}
      {isLoggedIn && showCalendar && (
        <div className="absolute right-28 top-16 z-50 w-96">
          <CalenderCompo />
        </div>
      )}

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