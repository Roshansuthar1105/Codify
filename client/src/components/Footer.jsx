import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaHeart,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaDiscord,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import roadmap from "../assets/json/rolebasedRoadmaps.json";
import { useEffect, useState } from "react";
import NewsletterSubscribeInput from "./NewsletterSubscribeInput";
const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/auth`)
      .then(async res => {
        const data = await res.json();
        setVisitorCount(data.visitorCount); // Set state here
      })
      .catch(err => console.error("Error fetching visitors:", err));
  }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reqdroadmaps = roadmap.filter((item) =>
    [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "QA Engineer",
    ].includes(item.roadmap_name)
  );
  return (
    <footer
      className={`
      ${
        isDark
          ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 backdrop-blur-xl text-dark-text-primary"
          : "bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-xl text-light-text-primary"
      }
      pt-16 pb-8 border-t-2 ${
        isDark ? "border-dark-border" : "border-light-border"
      }
      relative overflow-hidden
    `}
    >
      {/* Enhanced Background with grid pattern */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
              : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50"
          }`}
        ></div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top section with logo and description */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex flex-col gap-4 max-w-md">
            <h2 className="text-primary text-3xl font-playwrite-gb flex items-center">
              Codify
              <span className="ml-2 text-sm bg-primary/20 text-primary px-2 py-1 rounded-full">
                Learning Platform
              </span>
            </h2>
            <p
              className={`${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              } leading-relaxed`}
            >
              Empowering the next generation of developers with expert-led
              tutorials and hands-on projects.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <a
              href="https://github.com/Roshansuthar1105"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110
                ${
                  isDark
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:bg-primary/20 backdrop-blur-sm"
                    : "bg-white/50 hover:bg-primary/20 backdrop-blur-sm"
                }
                ${
                  isDark ? "text-dark-text-primary" : "text-light-text-primary"
                } hover:text-primary border ${
                isDark ? "border-gray-600" : "border-white/20"
              }
              `}
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/roshansuthar/"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110
                ${
                  isDark
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:bg-primary/20 backdrop-blur-sm"
                    : "bg-white/50 hover:bg-primary/20 backdrop-blur-sm"
                }
                ${
                  isDark ? "text-dark-text-primary" : "text-light-text-primary"
                } hover:text-primary border ${
                isDark ? "border-gray-600" : "border-white/20"
              }
              `}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://discord.com/users/1317732270047498343"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110
                ${
                  isDark
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:bg-primary/20 backdrop-blur-sm"
                    : "bg-white/50 hover:bg-primary/20 backdrop-blur-sm"
                }
                ${
                  isDark ? "text-dark-text-primary" : "text-light-text-primary"
                } hover:text-primary border ${
                isDark ? "border-gray-600" : "border-white/20"
              }
              `}
              aria-label="Discord"
            >
              <FaDiscord />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110
                ${
                  isDark
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:bg-primary/20 backdrop-blur-sm"
                    : "bg-white/50 hover:bg-primary/20 backdrop-blur-sm"
                }
                ${
                  isDark ? "text-dark-text-primary" : "text-light-text-primary"
                } hover:text-primary border ${
                isDark ? "border-gray-600" : "border-white/20"
              }
              `}
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/roshansuthar1105/"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110
                ${
                  isDark
                    ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:bg-primary/20 backdrop-blur-sm"
                    : "bg-white/50 hover:bg-primary/20 backdrop-blur-sm"
                }
                ${
                  isDark ? "text-dark-text-primary" : "text-light-text-primary"
                } hover:text-primary border ${
                isDark ? "border-gray-600" : "border-white/20"
              }
              `}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div
            className={`flex flex-col gap-4 p-6 rounded-2xl ${
              isDark
                ? "bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm border border-gray-600/20"
                : "bg-white/30 backdrop-blur-sm border border-white/20"
            }`}
          >
            <h3 className="text-primary text-xl font-righteous pb-2 border-b border-primary/30">
              About Us
            </h3>
            <p
              className={`${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              } leading-relaxed`}
            >
              Codify is a premier coding education platform dedicated to making
              programming accessible to everyone. Our mission is to empower
              individuals with the skills they need to succeed in the digital
              world.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className={`flex flex-col gap-4 p-6 rounded-2xl ${
              isDark
                ? "bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm border border-gray-600/20"
                : "bg-white/30 backdrop-blur-sm border border-white/20"
            }`}
          >
            <h3 className="text-primary text-xl font-righteous pb-2 border-b border-primary/30">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className={`
                    ${
                      isDark
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    } 
                    hover:text-primary transition-colors flex items-center
                  `}
                >
                  <span className="mr-2 text-primary text-xs">▸</span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className={`
                    ${
                      isDark
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    } 
                    hover:text-primary transition-colors flex items-center
                  `}
                >
                  <span className="mr-2 text-primary text-xs">▸</span>
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmap"
                  className={`
                    ${
                      isDark
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    } 
                    hover:text-primary transition-colors flex items-center
                  `}
                >
                  <span className="mr-2 text-primary text-xs">▸</span>
                  Roadmaps
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`
                    ${
                      isDark
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    } 
                    hover:text-primary transition-colors flex items-center
                  `}
                >
                  <span className="mr-2 text-primary text-xs">▸</span>
                  About Us
                </Link>
              </li>
               <li>
                <Link
                  to="/terms"
                  className={`
                    ${
                      isDark
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    } 
                    hover:text-primary transition-colors flex items-center
                  `}
                >
                  <span className="mr-2 text-primary text-xs">▸</span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`
                    ${
                      isDark
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    } 
                    hover:text-primary transition-colors flex items-center
                  `}
                >
                  <span className="mr-2 text-primary text-xs">▸</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Paths */}
          <div
            className={`flex flex-col gap-4 p-6 rounded-2xl ${
              isDark
                ? "bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm border border-gray-600/20"
                : "bg-white/30 backdrop-blur-sm border border-white/20"
            }`}
          >
            <h3 className="text-primary text-xl font-righteous pb-2 border-b border-primary/30">
              <Link to="/roadmap">Learning Paths</Link>
            </h3>
            <ul className="flex flex-col gap-3">
              {reqdroadmaps.map((item) => (
                <li
                  key={item.roadmap_name}
                  className={`
                ${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                }
                hover:text-primary transition-colors flex items-center cursor-pointer
              `}
                >
                  <span className="mr-2 text-primary text-xs">▸</span>
                  <a
                    href={item.roadmap_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.roadmap_name + " development"}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className={`flex flex-col gap-4 p-6 rounded-2xl ${
              isDark
                ? "bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm border border-gray-600/20"
                : "bg-white/30 backdrop-blur-sm border border-white/20"
            }`}
          >
            <h3 className="text-primary text-xl font-righteous pb-2 border-b border-primary/30">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li
                className={`${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                } flex items-start`}
              >
                <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/aRVCuJ6Xmrqj3X4f8"
                  target="_blank"
                >
                  {" "}
                  <span>Sitapura, Jaipur</span>
                </a>
              </li>
              <li
                className={`${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                } flex items-center`}
              >
                <FaPhone className="text-primary mr-3 flex-shrink-0" />
                <span>+91 7878952931</span>
              </li>
              <li
                className={`${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                } flex items-center`}
              >
                <FaEnvelope className="text-primary mr-3 flex-shrink-0" />
                <a href="mailto:rscodify@gmail.com">
                  <span>rscodify@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div
          className={`
          p-6 rounded-2xl mb-12 shadow-lg
          ${
            isDark
              ? "bg-gradient-to-br from-gray-700/40 to-gray-800/40 backdrop-blur-sm border border-gray-600/30"
              : "bg-white/40 backdrop-blur-sm border border-white/30"
          }
        `}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                Subscribe to our newsletter
              </h3>
              <p
                className={`${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                }`}
              >
                Get the latest updates, tutorials and offers directly to your
                inbox.
              </p>
            </div>
            <div className="flex justify-end">
              <NewsletterSubscribeInput isDark={isDark} />
            </div>
          </div>
        </div>

        {/* Visitor Count */}
        <div className={`text-center pt-6`}>
          <p className={`text-sm font-semibold text-primary`}>
            👀 Total Visitors: {visitorCount !== null ? visitorCount : "Loading..."}
          </p>
        </div>
        {/* Copyright */}
        <div
          className={`text-center pt-2 border-t ${
            isDark ? "border-gray-600/30" : "border-white/30"
          }`}
        >
          <p
            className={`${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            } text-sm flex items-center flex-col justify-center gap-1`}
          >
            &copy; {new Date().getFullYear()} Codify. All rights reserved. Made
            with
            <span className="flex gap-2 justify-center items-baseline text-sm">
              <FaHeart className="text-primary animate-pulse" />
              <a
                className="text-primary text-xl hover:text-primary-dark cursor-pointer hover:underline "
                href="http://roshansuthar.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Roshan Suthar
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
