import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();
// this is provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userdata, setUserdata] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const API = import.meta.env.VITE_SERVER_API;
  let isLoggedIn = !!token;
  let authorizationToken = `Bearer ${token}`;
  const storeTokenInLS = (serverToken) => {
    if (!serverToken) {
      console.error("No token provided to storeTokenInLS");
      return false;
    }
    try {
      setToken(serverToken);
      localStorage.setItem("token", serverToken);
      isLoggedIn = true;
      return true;
    } catch (error) {
      console.error("Error storing token:", error);
      return false;
    }
  };
  const LogoutUser = () => {
    isLoggedIn = false;
    setToken("");
    return localStorage.removeItem("token");
  };
  // jwt authorization
  useEffect(() => {
    userAuthentication();
    fetchCoursesData();
  }, [token]);
  const userAuthentication = async () => {
    try {
      if (!token) return; // Don't make the request if there's no token
      const response = await fetch(`${API}/user`, {
        method: "GET",
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserdata(data.user);
      } else {
        const err = await response.json();
        console.log(err.message);
      }
    } catch (error) {
      console.log("error from userAuth ", error);
    }
  };
  const fetchCoursesData = async () => {
    try {
      const response = await fetch(`${API}/api/v1/courses`, {
        method: "GET",
      });
      if (response.ok) {
        const Data = await response.json();
        setCoursesData(Data.data);
      }
    } catch (error) {
      console.log(`course page error form frontend ${error}`);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedIn,
        userdata,
        coursesData,
        authorizationToken,
        fetchCoursesData,
        setCoursesData,
        API
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// this is delevering these provided items to all
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth not used outside the provider");
  }
  return authContextValue;
};
