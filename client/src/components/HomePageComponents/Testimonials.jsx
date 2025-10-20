// Testimonials.jsx
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ correct import
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  // ✅ Safe context access
  let theme = "light";
  try {
    const context = useTheme();
    if (context) theme = context.theme;
  } catch (e) {
    console.warn("ThemeProvider is missing. Defaulting to light theme.");
  }

  const isDark = theme === "dark";
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      quote: "The courses here transformed my career path.",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      company: "TechCorp Inc.",
    },
    {
      quote: "I went from knowing nothing about coding to landing my dream job.",
      name: "Michael Chen",
      role: "Full Stack Developer",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 5,
      company: "StartupXYZ",
    },
    {
      quote: "The community support and expert guidance helped me overcome every challenge.",
      name: "Emma Rodriguez",
      role: "Backend Engineer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      company: "Digital Solutions",
    },
  ];

  // Section fade-in animation
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  // Infinite horizontal scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || !scrollContainer.firstElementChild) return;

    const content = scrollContainer.firstElementChild;
    let scrollPos = 0;
    const speed = 0.5;
    let frameId;

    const scroll = () => {
      scrollPos += speed;
      if (scrollPos >= content.offsetWidth) scrollPos = 0;
      scrollContainer.scrollLeft = scrollPos;
      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);

    const stopScroll = () => cancelAnimationFrame(frameId);
    const startScroll = () => (frameId = requestAnimationFrame(scroll));

    scrollContainer.addEventListener("mouseenter", stopScroll);
    scrollContainer.addEventListener("mouseleave", startScroll);

    return () => {
      cancelAnimationFrame(frameId);
      scrollContainer.removeEventListener("mouseenter", stopScroll);
      scrollContainer.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  const TestimonialCard = ({ testimonial }) => (
    <motion.div
      className={`
        flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px]
        h-[380px] sm:h-[420px] md:h-[450px]
        group relative p-6 sm:p-8 rounded-2xl
        ${isDark ? "bg-gray-800 border border-gray-700" : "bg-blue-50 border border-gray-200"}
        shadow-lg transition-all duration-300 hover:border-b-2 hover:border-r-2 hover:border-primary/50
        flex flex-col justify-between
      `}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Quote icon */}
      <div className="relative z-10 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
          <FaQuoteLeft className="text-primary text-lg sm:text-xl" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />
        ))}
      </div>

      {/* Quote */}
      <p className={`italic mb-4 leading-relaxed text-sm sm:text-base ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        "{testimonial.quote}"
      </p>

      {/* Author */}
      <div className="mt-auto flex items-center">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary mr-3"
        />
        <div>
          <h4 className={`font-bold text-base sm:text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
            {testimonial.name}
          </h4>
          <p className={`text-xs sm:text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {testimonial.role}
          </p>
          <p className="text-xs text-primary font-medium">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 md:py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <p className={`text-sm sm:text-lg ${isDark ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto`}>
            Real stories from real developers who transformed their careers with Codify
          </p>
        </div>

        {/* Scroll container */}
        <div ref={scrollRef} className="overflow-hidden relative w-full">
          <div className="flex gap-4 sm:gap-6 md:gap-8 w-fit">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
            {testimonials.map((t, i) => (
              <TestimonialCard key={`duplicate-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <motion.button
            onClick={() => navigate("/roadmap")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-primary to-secondary text-white py-2 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
          >
            Start Your Journey
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
