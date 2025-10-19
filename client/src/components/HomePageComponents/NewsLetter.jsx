import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaPaperPlane } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import NewsletterSubscribeInput from "../NewsletterSubscribeInput";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const NewsLetter = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  // 🔥 Animate whole section from left → right
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(sectionRef.current, { x: -100, opacity: 0 });
    gsap.to(sectionRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);


  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div
        className={`
          max-w-5xl mx-auto rounded-2xl p-12 sm:p-16 ${isDark ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-light-border'}
          shadow-lg relative overflow-hidden
        `}
      >
        <div className="relative z-10 text-center">
          <h2 className={`text-4xl font-righteous tracking-wider mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Stay Updated with <span className="text-primary">Latest Courses</span>
          </h2>

          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            Subscribe to our newsletter and never miss new courses and learning opportunities
          </p>

          <NewsletterSubscribeInput isDark={isDark} />
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;