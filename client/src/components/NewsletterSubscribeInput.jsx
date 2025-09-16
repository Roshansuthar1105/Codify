import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([a-zA-Z0-9._%+-]+)@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;


function NewsletterSubscribeInput({ isDark }) {
  const { API } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!EMAIL_REGEX.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Subscription failed");
      }
      if (data?.message == "Already subscribed")
        toast.info(data?.message || "Subscribed!");
      else toast.success(data?.message || "Subscribed!");
      setEmail("");
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-auto justify-center items-center flex ">
      <div className="flex flex-col gap-2 sm:relative">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
          className={`
            w-full min-w-0 sm:pr-32 pr-4 pl-4 py-3 rounded-xl backdrop-blur-sm transition-all duration-300
            ${
              isDark
                ? "bg-gray-800/60 text-white border-gray-600/40 placeholder-gray-400"
                : "bg-white/70 text-gray-800 border-gray-300/50 placeholder-gray-500"
            } border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
            shadow-lg hover:shadow-xl
          `}
        />

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`
            w-full h-10 sm:w-28 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2
            bg-gradient-to-r from-purple-600 to-blue-600
            text-white rounded-lg
            transition-all duration-300 shadow-md hover:shadow-lg
            font-medium text-sm
            ${
              loading
                ? "opacity-70 cursor-not-allowed scale-95"
                : "hover:scale-105"
            }
            disabled:hover:scale-100
            flex items-center justify-center
          `}
        >
          {loading ? (
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Wait...</span>
            </div>
          ) : status.type === "success" ? (
            "Subscribed ✓"
          ) : (
            "Subscribe"
          )}
        </button>
      </div>

      {/* Reserved space for message */}
      <div className="mt-2 min-h-[1.5rem] text-sm text-center transition-all duration-300">
        {status.message && (
          <div
            className={`
            inline-block px-4 py-2 rounded-lg
            ${
              status.type === "error"
                ? "text-red-400 bg-red-500/10 border border-red-500/20"
                : "text-green-400 bg-green-500/10 border border-green-500/20"
            }
          `}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}

NewsletterSubscribeInput.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

export default NewsletterSubscribeInput;
