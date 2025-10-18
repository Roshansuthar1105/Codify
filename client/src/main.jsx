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
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Correct import path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
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
    </ErrorBoundary>
  </React.StrictMode>
);

// ✅ Register service worker for PWA support (only in production)
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Use the correct base path based on environment
    const swUrl = `${window.location.origin}/service-worker.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
        // Fallback to relative path
        navigator.serviceWorker.register('./service-worker.js').then(fallbackRegistration => {
          console.log("Service Worker registered with fallback:", fallbackRegistration.scope);
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
