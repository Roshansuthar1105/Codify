import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function DemoVideo() {
  return (
    <div className="container video-page">

      <div className="gradient-background"></div>
                <motion.div

                //   initial="hidden"
                //   animate="visible"
                //   transition={{ delay: 1.3 }}
                   className="flex items-center justify-center m-5"
                >
                  <div className={`h-px flex-1 `}></div>
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider px-4 sm:px-8 `}>
                    Demo Video

                  </h2>
                  <div className={`h-px flex-1 `}></div>
                </motion.div>

      {/* Video Card */}
      <div className="video-card mx-auto p-5 rounded-2xl shadow-xl bg-bg_secondary_light max-w-4xl">
        <div className="video-wrapper relative" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/Y8Tko2YC5hA"
            title="Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center m-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group bg-transparent border-2 border-primary text-primary py-4 px-8 text-lg rounded-xl font-semibold transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl inline-flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-3">
            <span>Back to Home</span>
          </Link>
        </motion.button>
      </div>
    </div>
  );
}

export default DemoVideo;
