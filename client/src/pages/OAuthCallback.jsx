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

    if (token) {
      storeTokenInLS(token);        
      localStorage.setItem("isLoggedIn", "true");         // save JWT (localStorage or memory—your choice)
      toast.success("Logged in with Google");
      navigate("/", { replace: true }); // success : clean URL,so re-direct to home
    } else {
      toast.error("Missing token in callback");
      navigate("/login", { replace: true });
    }
  }, [location, navigate, storeTokenInLS]);

  return null;
}
// this component handles the OAuth callback from Google 
