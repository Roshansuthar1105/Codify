import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { FaUser, FaHome, FaChevronRight, FaChartLine } from "react-icons/fa";
import { MdFeedback, MdDashboard } from "react-icons/md";
import { BiSolidBook } from "react-icons/bi";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function AdminLayout() {
  const { userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  if (!(userdata.isAdmin || userdata.isReadOnlyAdmin)) {
    toast.error("Access denied. Admin privileges required.");
    return <Navigate to="/" />
  }

  // Navigation items organized by sections
  const navigationSections = [
    {
      
      items: [
        { to: "/", icon: FaHome, label: "Home", description: "Return to main site" },
        { to: "/dashboard", icon: FaChartLine, label: "Dashboard", description: "Analytics overview" }
      ]
    },
    {
      
      items: [
        { to: "/admin/users", icon: FaUser, label: "Users", description: "Manage user accounts" },
        { to: "/admin/contacts", icon: MdFeedback, label: "Feedbacks", description: "View user feedback" },
        { to: "/admin/courses", icon: BiSolidBook, label: "Courses", description: "Course administration" }
      ]
    }
  ];

  // Animation variants - all based on page load, not scroll
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { 
      scale: 1
    },
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

  const iconVariants = {
    initial: { x: 0 },
    hover: { 
      x: 4,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

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

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Enhanced Background with gradient overlay */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-5"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-5"></div>

      <div className="flex flex-col md:flex-row h-screen-minus-nav ">
        {/* Enhanced Sidebar */}
        <motion.div 
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className={`w-full md:w-64 md:max h-screen-minus-nav
            ${isDark
            ? 'bg-gradient-to-br from-dark-bg-tertiary to-dark-bg-primary hover:from-primary/20 hover:to-primary/10'
            : 'bg-gradient-to-br from-light-bg-tertiary to-light-bg-primary hover:from-primary/20 hover:to-primary/10'} shadow-xl transition-all duration-300 backdrop-blur-xl border-r-2 ${isDark ? 'border-dark-border' : 'border-light-border'}
            `}
            >
          {/* Admin header */}
          <div className={`p-6 border-b ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h2 className="text-2xl font-righteous flex items-center gap-3">
                <motion.div
                  className="text-primary"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MdDashboard />
                </motion.div>
                <span>Admin Panel</span>
              </h2>
              <p className={`mt-2 text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                Manage your platform
              </p>
            </motion.div>
          </div>

          {/* Navigation with Card-based Layout */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 space-y-6"
          >
            {navigationSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                variants={sectionVariants}
                className="space-y-3"
              >
                {/* Section Header */}
                <motion.h3 
                  variants={headerVariants}
                  className={`text-xs uppercase tracking-wider font-semibold px-2 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                >
                  {section.title}
                </motion.h3>

                {/* Navigation Cards */}
                <div className="space-y-2">
                  {section.items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.to}
                        variants={cardVariants}
                      >
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => `
                            group relative block p-4 rounded-xl transition-all duration-300 overflow-hidden
                            ${isActive
                              ? `bg-primary text-white shadow-lg`
                              : `${isDark
                                  ? 'bg-gradient-to-br from-dark-bg-tertiary to-dark-bg-primary hover:from-primary/20 hover:to-primary/10'
                                  : 'bg-gradient-to-br from-light-bg-tertiary to-light-bg-primary hover:from-primary/20 hover:to-primary/10'} 
                                  border ${isDark ? 'border-dark-border hover:border-primary/30' : 'border-light-border hover:border-primary/30'}`
                            }
                          `}
                        >
                          <motion.div
                            variants={cardVariants}
                            whileHover="hover"
                            className="relative"
                          >
                            {/* Animated border effects */}
                            <motion.div 
                              className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-xl"
                              whileHover={{ 
                                width: "3px",
                                transition: { duration: 0.3, ease: "easeOut" }
                              }}
                            />
                            <motion.div 
                              className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-xl"
                              whileHover={{ 
                                height: "3px",
                                transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
                              }}
                            />

                            {/* Card Content */}
                            <div className="flex items-start gap-3 relative z-10">
                              <motion.div
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} group-hover:bg-primary/20 transition-colors duration-300`}
                              >
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <Icon className="text-lg text-primary" />
                                </motion.div>
                              </motion.div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-sm truncate">
                                    {item.label}
                                  </h4>
                                  <motion.div
                                    variants={iconVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  >
                                    <FaChevronRight className="text-xs" />
                                  </motion.div>
                                </div>
                                <p className={`text-xs mt-1 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} group-hover:text-current transition-colors duration-200`}>
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </NavLink>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main content */}
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 p-4 md:p-8 overflow-x-auto"
        >
          {/* Enhanced Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mb-8 flex items-center gap-2 text-sm"
          >
            <motion.span 
              className={`cursor-pointer hover:text-primary transition-colors duration-200 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`} 
              onClick={() => navigate("/admin")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Admin
            </motion.span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <FaChevronRight className="text-xs text-primary" />
            </motion.div>
            <span className="font-medium">Dashboard</span>
          </motion.div>

          {/* Enhanced Content Container */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className={`rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-dark-bg-secondary to-dark-bg-tertiary border border-dark-border' : 'bg-gradient-to-br from-light-bg-secondary to-light-bg-tertiary border border-light-border'} backdrop-blur-xl relative`}
          >
            {/* Animated border effects for content container */}
            <motion.div 
              className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
              whileHover={{ 
                width: "4px",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
              whileHover={{ 
                height: "4px",
                transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
              }}
            />
            
            {/* Content with subtle animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="relative z-10"
            >
              <Outlet />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminLayout;