import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoading } from "../components/loadingContext";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserPlus, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API}/api/v1/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Registration successful! Welcome aboard!");
        window.location.href = "/";
      } else {
        const errorMessage = res_data.extraDetails ? res_data.extraDetails : res_data.message;
        toast.warn(errorMessage);
      }
    } catch (error) {
      console.log("response error : ", error);
      toast.error("Registration failed. Please try again.");
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
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-5"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-5"></div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          {/* Left side - Image and text */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-righteous text-center md:text-left tracking-wider mb-6">
              <span className="text-primary">Join</span> Our Community
            </h1>
            
            <p className={`text-center md:text-left mb-8 max-w-md ${
              isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
            }`}>
              Create your account today and start your learning journey with access to premium courses and resources.
            </p>
            
            <div className="relative w-full max-w-md hidden md:block"> 
              <img
                src="signup.svg"
                alt="Signup illustration"
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
  );
}

export default Signup;