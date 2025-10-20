import React, { useState, useRef,useEffect } from "react";
import OtpModal from "../components/OtpModal";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoading } from "../components/loadingContext";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Added for animation
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


// Animation variants (copied from Roadmap)
const backgroundVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
};
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const formVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};
const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
  tap: { scale: 0.98, transition: { duration: 0.1 } }
};

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setIsLoading } = useLoading();
  const [show, setShow] = useState(false);
  const { storeTokenInLS, API, userdata, isLoggedIn } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [serverOtp, setServerOtp] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [resending, setResending] = useState(false);
  const [loginVerdict, setLoginVerdict] = useState(null); // "success" or "fail"
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const otpRefs = useRef([]);
  const otpLength = 6;

  //If Google login fails
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    if (error) {
      toast.error(error);
      // Remove query from URL after toast display
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

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
      const loginResponse = await fetch(`${API}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        storeTokenInLS(loginData.token);
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Login successful!");
        window.location.href = "/";
      } else {
        toast.error(loginData.message || "Unexpected error while logging in");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      const otpString = otp.join("");
      const response = await fetch(`${API}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, otp: otpString }),
      });

      const result = await response.json();

      if (response.ok) {
        const loginResponse = await fetch(`${API}/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          storeTokenInLS(loginData.token);
          toast.success("Login successful!");
          window.location.href = "/";
        } else {
          toast.error(loginData.message || "Unexpected error while logging in");
        }
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Error verifying OTP");
    } finally {
      setIsLoading(false);
      setShowOtpModal(false);
    }
  };

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

  return (
    <>
      <div className={`relative min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
        {/* Animated background pattern */}
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
        >
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-5"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-5"
        ></motion.div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            {/* Left side - Image and text */}
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className="w-full md:w-1/2 flex flex-col items-center md:items-start"
            >
              <h1 className="text-4xl md:text-5xl font-righteous text-center md:text-left tracking-wider mb-6">
                <span className="text-primary">Welcome</span> Back!
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
              ></motion.div>
              <p className={`text-center md:text-left mb-8 max-w-md ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                Sign in to continue your learning journey and access all your courses and progress.
              </p>
              <div className="relative max-w-md sm:w-full hidden md:block">
                <img
                  src="login.svg"
                  alt="Login illustration"
                  className="w-full drop-shadow-xl animate-float"
                />
                <div className="absolute -bottom-4 left-0 w-full h-8 bg-gradient-to-t from-dark-bg-primary/30 to-transparent blur-sm"></div>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="w-full md:w-1/2 flex flex-col items-center"
            >
              <motion.div
                className={`group w-full max-w-md p-8 rounded-2xl shadow-2xl hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
              >

                 <h2 className="text-3xl font-righteous text-center mb-8 transition-colors duration-300 group-hover:text-primary"
    >
      <span className="group-hover:text-primary transition-colors duration-300">Login</span>
    </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className={`block mb-2 text-m font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
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
                      className={`w-full px-4 py-3 rounded-xl bg-transparent border
    ${isDark
                          ? 'border-dark-border text-dark-text-primary placeholder-dark-text-secondary'
                          : 'border-light-border text-light-text-primary placeholder-light-text-secondary'
                        }
    focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    />
                  </div>
                  <div className="mb-6 relative">
                    <label
                      htmlFor="password"
                      className={`block mb-2 text-m font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
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
                      required
                      placeholder="Enter your password"
                      value={user.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-transparent border
    ${isDark
                          ? 'border-dark-border text-dark-text-primary placeholder-dark-text-secondary'
                          : 'border-light-border text-light-text-primary placeholder-light-text-secondary'
                        }
    focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    />
                    <div
                      className="absolute right-3 top-[42px] cursor-pointer text-xl p-1 rounded-full hover:bg-primary/10 transition-colors"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <AiOutlineEyeInvisible className="text-primary" /> : <AiOutlineEye className="text-primary" />}
                    </div>
                  </div>
                  <div className="flex justify-end mb-6">
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </motion.button>

                  {/* Google & GitHub OAuth  */} 
                  <div className="mt-3 flex flex-col items-center gap-3">
                    <span className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      Or continue with
                    </span>
                    {/* Google Button */}
                    <a
                      href={`${API}/api/v1/auth/google/login`} // Your backend Google Login endpoint
                      className="w-full py-3 px-4 flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-medium transition-all duration-300 transform hover:scale-[1.02]">
                      <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-6 h-6"
                      />
                      <span>Google</span>
                    </a>

                    {/* GitHub Button */}
                    <a
                      href={`${import.meta.env.VITE_SERVER_API}/api/v1/auth/github`}
                      className="w-full py-3 px-4 flex items-center justify-center gap-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-medium transition-all duration-300 transform hover:scale-[1.02]">
                      <img
                        src="https://www.svgrepo.com/show/341847/github.svg"
                        alt="GitHub"
                        className="w-6 h-6"
                      />
                      <span>GitHub</span>
                    </a>
                  </div>

                  <div className="mt-6 text-center">
                    <p className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-primary hover:underline font-medium">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <OtpModal
        isDark={isDark}
        show={showOtpModal}
        otp={otp}
        setOtp={setOtp}
        otpLength={otpLength}
        verifyOtp={verifyOtp}
        resending={resending}
        handleResendOtp={handleResendOtp}
      />
    </>
  );
}

export default Login;