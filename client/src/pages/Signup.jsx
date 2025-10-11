import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoading } from "../components/loadingContext";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserPlus, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import OtpModal from "../components/OtpModal";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const { storeTokenInLS, API } = useAuth();
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const otpLength = 6; 
  const [serverOtp, setServerOtp] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [resending, setResending] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value) {
          error = "Username is required";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Enter a valid email address";
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Enter a valid 10-digit phone number";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(user).forEach((key) => {
      const error = validateField(key, user[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    // Save user data in localStorage for later registration
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("signupData", JSON.stringify(user));

    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/v1/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await response.json();

      if (response.ok) {
        setServerOtp(data.otp); 
        setShowOtpModal(true);
        toast.success("OTP sent to your email!");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  //verify otp
  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      const otpString = otp.join(""); //convert the otp to string which backend expects
      const response = await fetch(`${API}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, otp: otpString }),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("OTP verified successfully!");

        // Now register the user
        const storedData = JSON.parse(localStorage.getItem("signupData"));
        const registerResponse = await fetch(`${API}/api/v1/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storedData),
        });

        const registerResult = await registerResponse.json();
        if (registerResponse.ok) {
          storeTokenInLS(registerResult.token);
          toast.success("Registration successful!");
          localStorage.removeItem("signupData");
          window.location.href = "/";
        } else {
          toast.error(registerResult.message || "Registration failed!");
        }
      } else {
        toast.error(result.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while verifying OTP");
    } finally {
      setIsLoading(false);
      setShowOtpModal(false);
    }
  };

  // //resend otp
  const handleResendOtp = async () => {
    try {
      setResending(true);
      const res = await fetch(`${API}/api/v1/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP resent!");
        setServerOtp(data.otp);
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Error resending OTP");
    } finally {
      setResending(false);
    }
  };

  // Animation variants matching Roadmap component
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
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const illustrationVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
        {/* Enhanced Background with gradient overlay - matching Roadmap */}
        <motion.div 
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
        </motion.div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-5"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-5"></div>

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Left side - Enhanced header and illustration */}
            <motion.div 
              variants={illustrationVariants}
              initial="hidden"
              animate="visible"
              className="w-full lg:w-1/2 flex flex-col items-center lg:items-start"
            >
              {/* Enhanced Header matching Roadmap style */}
              <motion.div 
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                className="text-center lg:text-left mb-8"
              >
                <div className="inline-block">
                  <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    <span className="text-primary">Join</span> Our Community
                  </h1>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
                  ></motion.div>
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className={`mt-6 text-lg md:text-xl max-w-2xl leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                >
                  Create your account today and start your learning journey with access to premium courses and resources that will define your future in tech.
                </motion.p>
              </motion.div>
              
              {/* Enhanced illustration with animation */}
              <motion.div 
                variants={illustrationVariants}
                animate="float"
                className="relative w-full max-w-md hidden lg:block"
              > 
                <img
                  src="signup.svg"
                  alt="Signup illustration"
                  className="w-full drop-shadow-2xl"
                />
                <div className="absolute -bottom-4 left-0 w-full h-8 bg-gradient-to-t from-dark-bg-primary/30 to-transparent blur-sm"></div>
              </motion.div>
            </motion.div>

            {/* Right side - Enhanced Form */}
            <motion.div 
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="w-full lg:w-1/2 flex flex-col items-center"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className={`w-full max-w-lg p-8 md:p-10 rounded-2xl shadow-lg backdrop-blur-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-light-border'
                }`}
              >
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl md:text-4xl font-righteous text-center mb-8 tracking-wide"
                >
                  Create Account
                </motion.h2>
                
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Enhanced Username Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <label
                      htmlFor="username"
                      className={`block mb-3 text-sm font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                    >
                      <div className="flex items-center">
                        <FaUser className="mr-3 text-primary text-lg" />
                        Username
                      </div>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      whileFocus="focus"
                      className="relative"
                    >
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={user.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-4 text-lg rounded-xl ${
                          isDark 
                            ? 'bg-dark-bg-tertiary/50 text-dark-text-primary border-dark-border placeholder-dark-text-secondary' 
                            : 'bg-light-bg-tertiary/50 text-light-text-primary border-light-border placeholder-light-text-secondary'
                        } border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${errors.username ? 'border-red-500' : ''}`}
                      />
                      {errors.username && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center"
                        >
                          <FaExclamationCircle className="mr-2" />
                          {errors.username}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <label
                      htmlFor="email"
                      className={`block mb-3 text-sm font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                    >
                      <div className="flex items-center">
                        <FaEnvelope className="mr-3 text-primary text-lg" />
                        Email Address
                      </div>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      whileFocus="focus"
                      className="relative"
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={user.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-4 text-lg rounded-xl ${
                          isDark 
                            ? 'bg-dark-bg-tertiary/50 text-dark-text-primary border-dark-border placeholder-dark-text-secondary' 
                            : 'bg-light-bg-tertiary/50 text-light-text-primary border-light-border placeholder-light-text-secondary'
                        } border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center"
                        >
                          <FaExclamationCircle className="mr-2" />
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Phone Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <label
                      htmlFor="phone"
                      className={`block mb-3 text-sm font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                    >
                      <div className="flex items-center">
                        <FaPhone className="mr-3 text-primary text-lg" />
                        Phone Number
                      </div>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      whileFocus="focus"
                      className="relative"
                    >
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={user.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-4 text-lg rounded-xl ${
                          isDark 
                            ? 'bg-dark-bg-tertiary/50 text-dark-text-primary border-dark-border placeholder-dark-text-secondary' 
                            : 'bg-light-bg-tertiary/50 text-light-text-primary border-light-border placeholder-light-text-secondary'
                        } border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center"
                        >
                          <FaExclamationCircle className="mr-2" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative"
                  >
                    <label
                      htmlFor="password"
                      className={`block mb-3 text-sm font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                    >
                      <div className="flex items-center">
                        <FaLock className="mr-3 text-primary text-lg" />
                        Password
                      </div>
                    </label>
                    <motion.div
                      variants={inputVariants}
                      whileFocus="focus"
                      className="relative"
                    >
                      <input
                        type={show ? "text" : "password"}
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        placeholder="Create a secure password"
                        value={user.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-4 pr-12 text-lg rounded-xl ${
                          isDark 
                            ? 'bg-dark-bg-tertiary/50 text-dark-text-primary border-dark-border placeholder-dark-text-secondary' 
                            : 'bg-light-bg-tertiary/50 text-light-text-primary border-light-border placeholder-light-text-secondary'
                        } border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark transition-colors duration-200"
                        onClick={() => setShow(!show)}
                      >
                        {show ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                      </motion.button>
                      {errors.password && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center"
                        >
                          <FaExclamationCircle className="mr-2" />
                          {errors.password}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <motion.button
                      type="submit"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold text-lg rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center shadow-lg"
                    >
                      <FaUserPlus className="mr-3" />
                      Create Account
                    </motion.button>
                  </motion.div>
                  
                  {/* Enhanced Login Link */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="mt-8 text-center"
                  >
                    <p className={`text-lg ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors duration-200"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <OtpModal
        show={showOtpModal}
        isDark={isDark}
        otp={otp}
        setOtp={setOtp}
        otpLength={6}
        verifyOtp={verifyOtp}
        handleResendOtp={handleResendOtp}
        resending={resending}
      />
    </>
  );
}

export default Signup;