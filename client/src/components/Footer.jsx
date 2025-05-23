import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaHeart, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`
      ${isDark ? 'bg-dark-bg-secondary text-dark-text-primary' : 'bg-light-bg-secondary text-light-text-primary'}
      pt-16 pb-8 border-t-2 ${isDark ? 'border-dark-border' : 'border-light-border'}
      relative overflow-hidden
    `}>
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
            <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} leading-relaxed`}>
              Empowering the next generation of developers with expert-led tutorials and hands-on projects.
            </p>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://github.com/Roshansuthar1105"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110
                ${isDark ? 'bg-dark-bg-tertiary hover:bg-primary/20' : 'bg-light-bg-tertiary hover:bg-primary/20'}
                ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-primary
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
                ${isDark ? 'bg-dark-bg-tertiary hover:bg-primary/20' : 'bg-light-bg-tertiary hover:bg-primary/20'}
                ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-primary
              `}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/roshansuthar1105"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110
                ${isDark ? 'bg-dark-bg-tertiary hover:bg-primary/20' : 'bg-light-bg-tertiary hover:bg-primary/20'}
                ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-primary
              `}
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110
                ${isDark ? 'bg-dark-bg-tertiary hover:bg-primary/20' : 'bg-light-bg-tertiary hover:bg-primary/20'}
                ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-primary
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
                ${isDark ? 'bg-dark-bg-tertiary hover:bg-primary/20' : 'bg-light-bg-tertiary hover:bg-primary/20'}
                ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} hover:text-primary
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
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-xl font-righteous pb-2 border-b border-primary/30">About Us</h3>
            <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} leading-relaxed`}>
              Codify is a premier coding education platform dedicated to making programming accessible to everyone. 
              Our mission is to empower individuals with the skills they need to succeed in the digital world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-xl font-righteous pb-2 border-b border-primary/30">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className={`
                    ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} 
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
                    ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} 
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
                    ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} 
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
                    ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} 
                    hover:text-primary transition-colors flex items-center
                  `}
                >
                  <span className="mr-2 text-primary text-xs">▸</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`
                    ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} 
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
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-xl font-righteous pb-2 border-b border-primary/30">Learning Paths</h3>
            <ul className="flex flex-col gap-3">
              <li className={`
                ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}
                hover:text-primary transition-colors flex items-center cursor-pointer
              `}>
                <span className="mr-2 text-primary text-xs">▸</span>
                Frontend Development
              </li>
              <li className={`
                ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}
                hover:text-primary transition-colors flex items-center cursor-pointer
              `}>
                <span className="mr-2 text-primary text-xs">▸</span>
                Backend Development
              </li>
              <li className={`
                ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}
                hover:text-primary transition-colors flex items-center cursor-pointer
              `}>
                <span className="mr-2 text-primary text-xs">▸</span>
                Full Stack Development
              </li>
              <li className={`
                ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}
                hover:text-primary transition-colors flex items-center cursor-pointer
              `}>
                <span className="mr-2 text-primary text-xs">▸</span>
                Mobile Development
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-primary text-xl font-righteous pb-2 border-b border-primary/30">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              <li className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} flex items-start`}>
                <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                <span>123 Coding Street, Tech Valley, CA 94043, USA</span>
              </li>
              <li className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} flex items-center`}>
                <FaPhone className="text-primary mr-3 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} flex items-center`}>
                <FaEnvelope className="text-primary mr-3 flex-shrink-0" />
                <span>support@codify.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter subscription */}
        <div className={`
          p-6 rounded-xl mb-12
          ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'}
          ${isDark ? 'border border-dark-border' : 'border border-light-border'}
        `}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Subscribe to our newsletter</h3>
              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                Get the latest updates, tutorials and offers directly to your inbox.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className={`
                    flex-1 px-4 py-2 rounded-lg
                    ${isDark 
                      ? 'bg-dark-bg-primary text-dark-text-primary border-dark-border' 
                      : 'bg-light-bg-primary text-light-text-primary border-light-border'
                    } border focus:outline-none focus:ring-2 focus:ring-primary
                  `}
                />
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`text-center pt-6 border-t ${isDark ? 'border-dark-border/30' : 'border-light-border/30'}`}>
          <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} text-sm flex items-center justify-center gap-1`}>
            &copy; {new Date().getFullYear()} Codify. All rights reserved. Made with 
            <FaHeart className="text-primary animate-pulse" /> 
            by Roshan Suthar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
