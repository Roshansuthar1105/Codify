import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function OAuthCallback() {
  const { storeTokenInLS } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (token) {
      storeTokenInLS(token);
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    } else if (error) {
      toast.error(decodeURIComponent(error));
      navigate("/login", { replace: true });
    } else {
      toast.error("OAuth login failed");
      navigate("/login", { replace: true });
    }
  }, [location, navigate, storeTokenInLS]);

  return null;
}