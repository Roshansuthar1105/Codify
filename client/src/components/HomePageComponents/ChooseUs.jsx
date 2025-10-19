import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ChooseUs = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  const benefits = [
    {
      icon: "🎯",
      title: "Industry-Relevant Content",
      description: "Courses designed to match current industry demands"
    },
    {
      icon: "💡",
      title: "Project-Based Learning",
      description: "Build real-world projects for your portfolio"
    },
    {
      icon: "🤝",
      title: "Community Support",
      description: "Join a thriving community of learners and mentors"
    },
    {
      icon: "📈",
      title: "Career Growth",
      description: "Get the skills needed for career advancement"
    }
  ];

  useEffect(() => {
    if (!cardsRef.current.length) return;

    gsap.set(cardsRef.current, { y: 60, opacity: 0 });

    gsap.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);


  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-16 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          Why Choose <span className="text-primary">Our Platform</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`
                group relative p-8 rounded-2xl border shadow-lg
                ${isDark ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 border border-dark-border' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-light-border'}
                transition-all duration-300 flex flex-col items-center text-center
              `}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="text-4xl mb-4 bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>

              <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                {benefit.title}
              </h3>

              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChooseUs;