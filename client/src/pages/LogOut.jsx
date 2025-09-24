import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function LogOut() {
  const { LogoutUser } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      try {
        setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("signupData"); 
          LogoutUser();
          toast.success("Logged out successfully");
          setIsLoggingOut(false);
        }, 1500);
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("There was an issue logging out");
        setIsLoggingOut(false);
      }
    };
    performLogout();
  }, [LogoutUser]);

  if (!isLoggingOut) {
    return <Navigate to='/login' />;
  }

  return (
    <div className={`h-screen-minus-nav flex items-center justify-center ${
      isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'
    }`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`max-w-lg w-full p-12 rounded-2xl shadow-lg text-center border transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border-dark-border' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
        }`}
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div 
            className="w-20 h-20 mx-auto border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        <motion.h2 
          className={`text-3xl font-righteous tracking-wider mb-4 ${
            isDark ? 'text-dark-text-primary' : 'text-blue-900'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Logging Out
        </motion.h2>
        
        <motion.p 
          className={`text-lg ${
            isDark ? 'text-dark-text-secondary' : 'text-blue-700'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Please wait while we securely log you out...
        </motion.p>
      </motion.div>
    </div>
  );
}

export default LogOut;
