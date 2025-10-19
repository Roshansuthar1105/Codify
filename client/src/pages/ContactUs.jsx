import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { useLoading } from "../components/loadingContext";
import { FaPaperPlane, FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function ContactUs() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    message: "",
  });
  const { userdata, API } = useAuth();
  const [isUser, setisUser] = useState(true);
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isUser && userdata) {
      setUser({
        email: userdata.email,
        username: userdata.username,
        message: ""
      });
      setisUser(false);
    }
  }, [userdata, isUser]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await fetch(
        `${API}/contact`, 
        {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to send message");
        return;
      }

      toast.success("Message sent successfully");

      setUser({
        ...user,
      });
    } catch (error) {
      console.log("message not sent: ", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  // Animation variants
  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${
      isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'
    }`}>
      {/* Enhanced Background with gradient overlay - matching Roadmaps */}
      <motion.div 
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'
        }`}
      >
        <div className={`absolute inset-0 ${
          isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'
        }`}></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Enhanced Header Section - matching Roadmaps */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <div className="inline-block">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${
              isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
            }`}>
              Get in Touch
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={`h-1 rounded-full bg-gradient-to-r ${
                isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'
              }`}
            ></motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}
          >
            Have questions about our courses or need assistance? Our team is here to help you on your learning journey.
          </motion.p>
        </motion.div>
        
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">
          {/* Left side - Content */}
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/2 flex flex-col"
          >
            <div className="mb-8">
              <h2 className={`text-2xl sm:text-3xl font-righteous tracking-wide mb-6 ${
                isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
              }`}>
                We'd love to hear from you!
              </h2>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'
                  }`}>
                    <FaEnvelope className="text-primary text-lg" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${
                      isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>Email Us</h4>
                    <span className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                      support@codify.com
                    </span>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="flex items-center"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'
                  }`}>
                    <FaUser className="text-primary text-lg" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${
                      isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                    }`}>Support Hours</h4>
                    <span className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                      Mon-Fri: 9AM to 5PM
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              src="contact.png"
              alt="Contact illustration"
              className="relative max-w-md w-full hidden md:block mx-auto drop-shadow-xl animate-float"
            />
          </motion.div>

          {/* Right side - Form with Roadmaps styling */}
          <motion.div 
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/2"
          >
            <motion.form
              onSubmit={handleSubmit}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className={`w-full max-w-lg mx-auto p-8 rounded-2xl shadow-lg backdrop-blur-xl bg-gradient-to-br transition-all duration-300 hover:shadow-2xl overflow-hidden relative ${
                isDark 
                  ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
                  : 'from-blue-50 to-indigo-50 border border-light-border'
              }`}
            >
              {/* Animated border on hover */}
              <motion.div 
                className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                whileHover={{ 
                  width: "3px",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                whileHover={{ 
                  height: "3px",
                  transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
                }}
              />

              <div className="mb-6">
                <label
                  htmlFor="username"
                  className={`block mb-3 text-sm font-semibold ${
                    isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                  }`}
                >
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-primary" />
                    Username
                  </div>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 rounded-xl text-base ${
                    isDark 
                      ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                      : 'bg-white text-light-text-primary border-light-border'
                  } border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50`}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className={`block mb-3 text-sm font-semibold ${
                    isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                  }`}
                >
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-primary" />
                    Email
                  </div>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 rounded-xl text-base ${
                    isDark 
                      ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                      : 'bg-white text-light-text-primary border-light-border'
                  } border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50`}
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="message"
                  className={`block mb-3 text-sm font-semibold ${
                    isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                  }`}
                >
                  <div className="flex items-center">
                    <FaCommentAlt className="mr-2 text-primary" />
                    Message
                  </div>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Enter your message"
                  value={user.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-4 rounded-xl text-base ${
                    isDark 
                      ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                      : 'bg-white text-light-text-primary border-light-border'
                  } border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300 hover:border-primary/50`}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Call to Action Section - matching Roadmaps */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          className={`mt-24 text-center p-8 sm:p-12 rounded-3xl ${
            isDark ? 'bg-gradient-to-r from-dark-bg-secondary to-dark-bg-secondary border border-dark-border' : 'bg-gradient-to-r from-light-bg-secondary to-light-bg-secondary border border-light-border'
          }`}
        >
          <h3 className={`text-xl sm:text-2xl md:text-3xl font-righteous mb-4 ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>
            Ready to Start Learning?
          </h3>
          <p className={`text-base sm:text-lg ${
            isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          } max-w-2xl mx-auto`}>
            Join thousands of students already advancing their careers with our comprehensive courses and expert guidance.
          </p>
        </motion.section>
      </div>
    </div>
  );
}

export default ContactUs;