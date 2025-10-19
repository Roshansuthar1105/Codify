// src/main.jsx or src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./store/auth.jsx";
import { PopupProvider } from "./context/PopupContext.jsx";
import { QuestionsProvider } from "./context/QuestionContext.jsx";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Correct import path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <PopupProvider>
          <QuestionsProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </QuestionsProvider>
        </PopupProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// ✅ Register service worker for PWA support
if ("serviceWorker" in navigator) {
  // Only register in production (Netlify, etc.)
  if (import.meta.env.MODE === "production") {
    window.addEventListener("load", () => {
      const swUrl = `${window.location.origin}/service-worker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("✅ Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
          // Optional fallback
          navigator.serviceWorker
            .register("./service-worker.js")
            .then((fallbackRegistration) => {
              console.log("✅ Fallback SW registered with scope:", fallbackRegistration.scope);
            })
            .catch((err) => console.error("Fallback SW failed:", err));
        });
    });
  } else {
    // 🚫 Disable SW & clear caches in development (e.g., localhost:5173)
    navigator.serviceWorker.getRegistrations().then((regs) => {
      for (const reg of regs) {
        reg.unregister();
      }
    });
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    );
    console.log("⚙️ Service Worker disabled in development (localhost:5173)");
  }
}
