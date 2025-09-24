import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoading } from "../components/loadingContext";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserPlus, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import OtpModal from "../components/OtpModal";
import { useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
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
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [resending, setResending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //If Google Signup fails
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    if (error) {
      toast.error(error);
      // Remove query from URL after toast display 
      navigate("/signup", { replace: true });
    }
  }, [location, navigate]);

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
    <React.Fragment>
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

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className={`w-full max-w-md p-8 rounded-xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
                isDark 
                  ? 'bg-dark-bg-secondary/90 border border-dark-border' 
                  : 'bg-light-bg-secondary/90 border border-light-border'
              }`}>
                <h2 className="text-3xl font-righteous text-center mb-8">
                  Create Account
                </h2>
                
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-5">
                    <label
                      htmlFor="username"
                      className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
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
                      placeholder="Enter your name"
                      value={user.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDark 
                          ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                          : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                      } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors.username ? 'border-red-500' : ''}`}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.username}</p>}
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
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
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDark 
                          ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                          : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                      } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.email}</p>}
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="phone"
                      className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                    >
                      <div className="flex items-center">
                        <FaPhone className="mr-2 text-primary" />
                        Phone Number
                      </div>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone"
                      value={user.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDark 
                          ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                          : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                      } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.phone}</p>}
                  </div>

                  <div className="mb-6 relative">
                    <label
                      htmlFor="password"
                      className={`block mb-2 text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                    >
                      <div className="flex items-center">
                        <FaLock className="mr-2 text-primary" />
                        Password
                      </div>
                    </label>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder="Enter your password"
                      value={user.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDark 
                          ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                          : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                      } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center"><FaExclamationCircle className="mr-1" />{errors.password}</p>}
                    <div
                      className="absolute right-3 top-[42px] cursor-pointer text-xl p-1 rounded-full hover:bg-primary/10 transition-colors"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <AiOutlineEyeInvisible className="text-primary" /> : <AiOutlineEye className="text-primary" />}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <FaUserPlus className="mr-2" />
                    Create Account
                  </button>

                  {/* Google OAuth */}
                  <div className="mt-3 flex flex-col items-center gap-3">
                    <span className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      Or continue with

                    </span>
                    <a
                      href={`${API}/api/v1/auth/google/signup`} // Your backend Google Signup endpoint
                      className="w-full py-3 px-4 flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-medium transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      {/* Google Icon */}
                      <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-6 h-6"
                      />
                      <span>Google</span>
                    </a>
                  </div>
                  <div className="mt-6 text-center">
                    <p className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                      Already have an account?{' '}
                      <Link to="/login" className="text-primary hover:underline font-medium">
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
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
    </React.Fragment>
  );
};

export default Signup;