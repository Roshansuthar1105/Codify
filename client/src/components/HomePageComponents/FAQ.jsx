import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaChevronDown } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [openItem, setOpenItem] = useState(null);
  const sectionRef = useRef(null);

  const faqItems = [
    {
      question: "How do I get started?",
      answer:
        "Simply sign up for an account and browse our course catalog. You can start with any course that interests you!",
    },
    {
      question: "Are the courses self-paced?",
      answer:
        "Yes, all our courses are self-paced. Learn at your own convenience and schedule.",
    },
    {
      question: "Do I get a certificate upon completion?",
      answer:
        "Yes! You'll receive a verified certificate for each course you complete, which you can share on your resume and LinkedIn profile.",
    },
    {
      question: "What kind of support is available?",
      answer:
        "We offer community forums, direct mentor support, and regular Q&A sessions to help you succeed in your learning journey.",
    },
    {
      question: "Are there any prerequisites?",
      answer:
        "Most beginner courses have no prerequisites. For advanced courses, recommended prerequisites are clearly listed in the course description.",
    },
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.set(sectionRef.current, { y: 80, opacity: 0 });
    gsap.to(sectionRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-2xl sm:text-4xl font-righteous tracking-wider text-center mb-10 sm:mb-16 ${
            isDark ? "text-dark-text-primary" : "text-light-text-primary"
          }`}
        >
          Frequently Asked{" "}
          <span className="text-primary">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                rounded-2xl overflow-hidden border shadow-lg transition-all duration-300
                ${
                  isDark
                    ? "bg-gradient-to-br from-gray-800 to-secondary-1000 border-dark-border"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 border-light-border"
                }
              `}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full p-4 sm:p-5 text-left flex justify-between items-center transition-colors duration-300 ${
                  openItem === index
                    ? `
                      ${
                        isDark
                          ? "bg-primary/10 text-primary"
                          : "bg-primary/10 text-primary"
                      }
                    `
                    : `
                      ${
                        isDark
                          ? "text-dark-text-primary hover:bg-dark-bg-tertiary"
                          : "text-light-text-primary hover:bg-light-bg-tertiary"
                      }
                    `
                }`}
              >
                <span className="font-medium text-base sm:text-lg">
                  {item.question}
                </span>
                <FaChevronDown
                  className={`text-primary transition-transform duration-300 ${
                    openItem === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openItem === index ? "max-h-60 sm:max-h-40" : "max-h-0"}
                `}
              >
                <p
                  className={`px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
