import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoading } from "../components/loadingContext";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      const response = await fetch(`${API}/api/v1/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setUser({ email: "", password: "" });
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        toast.success("Logged in Successfully");
        window.location.href = "/";
      } else {
        const err_data = await response.json();
        toast.warn(
          err_data.extraDetails ? err_data.extraDetails : err_data.message
        );
      }
    } catch (error) {
      console.log("response error : ", error);
      toast.error("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen-minus-nav flex items-center justify-center p-4 md:p-8 overflow-hidden z-10 ${
      isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'
    }`}>
      {/* Animated background pattern */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] opacity-30 ${
        isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'
      }`}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-5"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-5"></div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          {/* Left side - Image and text */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-righteous text-center md:text-left tracking-wider mb-6">
              <span className="text-primary">Welcome</span> Back!
            </h1>
            
            <p className={`text-center md:text-left mb-8 max-w-md ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              Sign in to continue your learning journey and access all your courses and progress.
            </p>
            
            <div className="relative w-full max-w-md">
              <img
                src="login.svg"
                alt="Login illustration"
                className="w-full drop-shadow-xl animate-float"
              />
              <div className="absolute -bottom-4 left-0 w-full h-8 bg-gradient-to-t from-dark-bg-primary/30 to-transparent blur-sm"></div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className={`w-full max-w-md p-8 rounded-xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
              isDark 
                ? 'bg-dark-bg-secondary/90 border border-dark-border' 
                : 'bg-light-bg-secondary/90 border border-light-border'
            }`}>
              <h2 className="text-3xl font-righteous text-center mb-8">
                Login
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
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
                    required
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark 
                        ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                        : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                    } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                  />
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
                    required
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg ${
                      isDark 
                        ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                        : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
                    } border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
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

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </button>
                
                <div className="mt-6 text-center">
                  <p className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;