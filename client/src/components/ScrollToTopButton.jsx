import { useCallback, useEffect, useState } from "react";
import { FiArrowUp } from 'react-icons/fi';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = useCallback(() => {
    const duration = 1000; // Duration in milliseconds
    const start = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easeInOutCubic = progress => {
        return progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      };

      window.scrollTo({
        top: start * (1 - easeInOutCubic(progress))
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed z-50 right-5 bottom-5 rounded-full bg-primary-300 border-2 border-primary text-white 
        shadow-card hover:shadow-card-hover transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-primary-300 
        dark:focus:ring-primary-700
        ${isHovered ? 'animate-pulse' : 'animate-bounce-subtle'}
        ${isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <span className="h-12 w-12 grid place-items-center">
        <FiArrowUp className="text-2xl font-bold"/>
      </span>
    </button>
  );
}

export default ScrollToTopButton;


