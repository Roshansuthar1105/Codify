import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useInView } from "react-intersection-observer"; // for view of title aninmation every time when we land on this section
import {
  FaUsers,
  FaLaptopCode,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaAward,
  FaHandshake,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  <style>{`
        .text-center:hover {
          background-color: white; /* CSS uses hyphen-case, not camelCase */
        }
      `}
  </style>
  const { userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("story");

  const { ref, inView } = useInView({ triggerOnce: false }); // trigger every time visible
  const text = userdata.username
    ? userdata.username.toUpperCase()
    : "to Codify";
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former Google engineer with 15+ years of experience in software development and education.",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Michael Chen",
      role: "Lead Instructor",
      bio: "Full stack developer with a passion for teaching and 10+ years of industry experience.",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Content Director",
      bio: "Computer Science PhD with expertise in curriculum development and educational technology.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "David Kim",
      role: "Technical Lead",
      bio: "Former Amazon engineer specializing in scalable architecture and cloud computing.",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  ];

  // Stats data (numbers only for the counter)
  const stats = [
    { icon: <FaUsers />, value: 10000, label: "Active Students" },
    { icon: <FaLaptopCode />, value: 200, label: "Courses" },
    { icon: <FaGraduationCap />, value: 95, label: "Completion Rate" },
    { icon: <FaChalkboardTeacher />, value: 5, label: "Expert Instructors" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
      gsap.from(".about-header", {
        y: -60,
        opacity: 0,
        duration: 1.8,
        ease: "power4.out",
      });

      // Subtext (smooth + slight stagger if multiple lines later)
      gsap.fromTo(
        ".about-subtext",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-subtext",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Intro section animations (image + text sliding smoothly)
      gsap.fromTo(
        ".about-image",
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".intro-section",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-text",
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".intro-section",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Stats counter (fires once)
      document.querySelectorAll(".stat-value").forEach((counter) => {
        let updated = false;
        const target = +counter.getAttribute("data-target");

        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          once: true,
          onEnter: () => {
            if (!updated) {
              const obj = { count: 0 };
              gsap.to(obj, {
                count: target,
                duration: 2,
                ease: "power1.out",
                onUpdate: () => {
                  counter.textContent = Math.floor(obj.count) + "+";
                },
              });
              updated = true;
            }
          },
        });
      });

      // Generic fade-ins (sections appearing smoothly)
      gsap.utils.toArray(".fade-section").forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${
        isDark
          ? "bg-dark-bg-primary text-dark-text-primary"
          : "bg-light-bg-primary text-light-text-primary"
      }`}
    >
      {/* Background */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
              : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50"
          }`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1
              ref={ref}
              className={`about-header font-bold text-3xl md:text-5xl font-righteous tracking-wider mb-4 ${
                isDark ? "text-dark-text-primary" : "text-light-text-primary"
              }`}
            >
              {/* Animate "Welcome" */}
              <span className="inline-block mr-2">
                {"Welcome ".split("").map((char, i) => (
                  <span
                    key={`Welcome-${i}`}
                    className={`inline-block opacity-0 ${
                      inView ? "animate-fadeIn" : ""
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              {/* Animate "to codify" */}
              <span className="text-primary inline-block">
                {[...text].map((char, i) => (
                  <span
                    key={`name-${i}`}
                    className={`inline-block opacity-0 ${
                      inView ? "animate-fadeIn" : ""
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>
            <div
              className={`h-1 rounded-full bg-gradient-to-r ${
                isDark
                  ? "from-primary via-primary-dark to-primary"
                  : "from-primary via-primary-dark to-primary"
              }`}
            ></div>
          </div>
          <p
            className={`about-subtext mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            }`}
          >
            We're on a mission to transform coding education and make technology
            skills accessible to everyone.
          </p>
        </div>

        {/* Introduction section */}
        <div className="intro-section flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20">
          {/* Image */}
          <div className="w-full md:w-1/2 about-image">
            <div className="relative">
              <img
                src="aboutus.png"
                alt="About Codify"
                className="w-full max-w-lg mx-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full -z-10"></div>
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 about-text">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? "text-dark-text-primary" : "text-light-text-primary"
              }`}
            >
              Your Gateway to{" "}
              <span className="text-primary">Tech Excellence</span>
            </h2>

            <p
              className={`text-lg leading-relaxed mb-6 ${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            >
              Welcome to Codify, your digital gateway to comprehensive computer
              science education. Dive into HTML, CSS, JS, Java, C, C++, Django,
              app development, web development, and more. Our platform is a
              knowledge hub, empowering learners with the skills needed in the
              dynamic tech landscape.
            </p>

            <p
              className={`text-lg leading-relaxed ${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            >
              From foundational concepts to advanced techniques, Codify ensures
              clarity in every lesson. Immerse yourself in a supportive
              community, with expertly curated resources and tutorials. Whether
              you're a novice or a seasoned coder, our goal is to foster your
              growth. Join us on a journey of continuous learning, where
              education meets innovation at Codify.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div
  className={`fade-section p-8 sm:p-10 rounded-2xl mb-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
    isDark ? "border border-dark-border" : "border border-light-border"
  } shadow-lg`}
>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {stats.map((stat, index) => (
      <div
        key={index}
        className="text-center rounded-lg p-6 transition transform hover:scale-105 hover:shadow-xl hover:bg-blue-100 dark:hover:bg-secondary-900 cursor-pointer"
      >
        <div className="text-primary text-3xl mb-3 flex justify-center">
          {stat.icon}
        </div>
        <h3
          className="stat-value text-3xl font-bold mb-1"
          data-target={stat.value}
        >
          0
        </h3>
        <p
          className={`${
            isDark
              ? "text-dark-text-secondary"
              : "text-light-text-secondary"
          }`}
        >
          {stat.label}
        </p>
      </div>
    ))}
  </div>
</div>


        {/* Tabs Section */}
        <div className="fade-section mb-20">
          {/* Section Header */}
          <div className="flex items-center justify-center mb-12">
            <div
              className={`h-px flex-1 ${
                isDark ? "bg-dark-border" : "bg-light-border"
              }`}
            ></div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider px-4 sm:px-8 ${
                isDark ? "text-dark-text-primary" : "text-light-text-primary"
              }`}
            >
              Our Story
            </h2>
            <div
              className={`h-px flex-1 ${
                isDark ? "bg-dark-border" : "bg-light-border"
              }`}
            ></div>
          </div>

          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("story")}
              className={`inline-block p-4 text-lg font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === "story"
                  ? "text-primary border-b-2 border-primary"
                  : `${
                      isDark
                        ? "text-dark-text-secondary hover:text-dark-text-primary"
                        : "text-light-text-secondary hover:text-light-text-primary"
                    }`
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => setActiveTab("mission")}
              className={`inline-block p-4 text-lg font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === "mission"
                  ? "text-primary border-b-2 border-primary"
                  : `${
                      isDark
                        ? "text-dark-text-secondary hover:text-dark-text-primary"
                        : "text-light-text-secondary hover:text-light-text-primary"
                    }`
              }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`inline-block p-4 text-lg font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === "team"
                  ? "text-primary border-b-2 border-primary"
                  : `${
                      isDark
                        ? "text-dark-text-secondary hover:text-dark-text-primary"
                        : "text-light-text-secondary hover:text-light-text-primary"
                    }`
              }`}
            >
              Our Team
            </button>
          </div>

          {/* Tab Content */}
          <div
            className={`p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
              isDark
                ? "border border-dark-border"
                : "border border-light-border"
            } shadow-lg`}
          >
            {activeTab === "story" && (
              <div className="fade-section">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Our Story
                </h3>
                <p
                  className={`mb-4 text-lg leading-relaxed ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  Codify began in 2018 when a group of passionate educators and
                  industry professionals recognized a gap in coding education.
                  Traditional learning methods weren't keeping pace with the
                  rapidly evolving tech landscape, leaving many aspiring
                  developers struggling to gain relevant skills.
                </p>
                <p
                  className={`mb-4 text-lg leading-relaxed ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  Our founders set out to create a platform that combines
                  theoretical knowledge with practical application, making
                  coding education accessible, engaging, and aligned with
                  industry needs. What started as a small collection of web
                  development courses has grown into a comprehensive learning
                  ecosystem covering the full spectrum of programming
                  disciplines.
                </p>
                <p
                  className={`text-lg leading-relaxed ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  Today, Codify serves learners in over 150 countries,
                  partnering with leading tech companies to ensure our
                  curriculum remains cutting-edge and our graduates are
                  job-ready.
                </p>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="fade-section">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Our Mission & Values
                </h3>
                <p
                  className={`mb-6 text-lg leading-relaxed ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  At Codify, our mission is to democratize coding education and
                  empower individuals to thrive in the digital economy,
                  regardless of their background or prior experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`p-6 rounded-xl shadow-lg ${
                      isDark
                        ? "bg-dark-bg-secondary border border-dark-border"
                        : "bg-light-bg-secondary border border-light-border"
                    } transition-all duration-300`}
                  >
                    <div className="flex items-center mb-3">
                      <FaAward className="text-primary mr-3 text-xl" />
                      <h4 className="text-xl font-semibold">Excellence</h4>
                    </div>
                    <p
                      className={`text-lg leading-relaxed ${
                        isDark
                          ? "text-dark-text-secondary"
                          : "text-light-text-secondary"
                      }`}
                    >
                      We're committed to delivering the highest quality
                      educational content and continuously improving our
                      platform based on student feedback and industry
                      developments.
                    </p>
                  </div>

                  <div
                    className={`p-6 rounded-xl shadow-lg ${
                      isDark
                        ? "bg-dark-bg-secondary border border-dark-border"
                        : "bg-light-bg-secondary border border-light-border"
                    } transition-all duration-300`}
                  >
                    <div className="flex items-center mb-3">
                      <FaHandshake className="text-primary mr-3 text-xl" />
                      <h4 className="text-xl font-semibold">Inclusivity</h4>
                    </div>
                    <p
                      className={`text-lg leading-relaxed ${
                        isDark
                          ? "text-dark-text-secondary"
                          : "text-light-text-secondary"
                      }`}
                    >
                      We believe everyone should have access to quality coding
                      education, and we design our platform to accommodate
                      diverse learning styles and backgrounds.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="fade-section">
                <h3 className="text-2xl text-center md:text-3xl font-bold text-primary mb-6">
                  Meet Our Team
                </h3>
                {/* added swiper class for slide animation on cards */}
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  className="pb-10 mt-6 flex justify-center lg:w-[700px]"
                >
                  {teamMembers.map((member, index) => (
                    <SwiperSlide
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={`group p-6 rounded-xl mt-6 mb-8 hover:border-b-2 hover:border-r-2 w-[350px] shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
                          isDark
                            ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl"
                            : "bg-light-bg-secondary border border-light-border hover:border-primary/50"
                        }  transition duration-300 hover:-translate-y-2 hover:scale-105`}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className={` flex items-center justify-center w-[7.5rem] h-[7.5rem] rounded-full p-4 mb-4  border-primary ${
                            isDark
                              ? "bg-dark-bg-primary"
                              : "bg-light-bg-primary"
                          }`}
                        />
                        <h3
                          className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 leading-tight ${
                            isDark
                              ? "text-dark-text-primary"
                              : "text-light-text-primary"
                          } transition-all duration-300 group-hover:text-primary`}
                        >
                          {member.name}
                        </h3>
                        <p className=" text-left text-sm font-medium mb-3">
                          {member.role}
                        </p>
                        <p
                          className={`text-sm text-left leading-relaxed ${
                            isDark
                              ? "text-dark-text-secondary"
                              : "text-light-text-secondary"
                          }`}
                        >
                          {member.bio}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          {/* Section Header */}
          <div className="flex items-center justify-center mb-12">
            <div
              className={`h-px flex-1 ${
                isDark ? "bg-dark-border" : "bg-light-border"
              }`}
            ></div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider px-4 sm:px-8 ${
                isDark ? "text-dark-text-primary" : "text-light-text-primary"
              }`}
            >
              What We Offer
            </h2>
            <div
              className={`h-px flex-1 ${
                isDark ? "bg-dark-border" : "bg-light-border"
              }`}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* What We Offer */}
            <div
              className={`fade-section group p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
                isDark
                  ? "border border-dark-border hover:border-primary/50"
                  : "border border-light-border hover:border-primary/50"
              } transition-all duration-300`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                What We Offer
              </h3>
              <ul
                className={`${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                } space-y-4`}
              >
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-lg">
                    Comprehensive programming courses from beginner to advanced
                    levels
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-lg">
                    Interactive coding exercises and real-world projects
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-lg">
                    Expert-led tutorials and detailed documentation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-lg">
                    Supportive community of learners and mentors
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">✓</span>
                  <span className="text-lg">
                    Regular updates with latest programming trends
                  </span>
                </li>
              </ul>
            </div>

            {/* Technologies */}
            <div
              className={`fade-section group p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
                isDark
                  ? "border border-dark-border hover:border-primary/50"
                  : "border border-light-border hover:border-primary/50"
              } transition-all duration-300`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Technologies We Cover
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "Python",
                  "Java",
                  "C++",
                  "Django",
                  "Node.js",
                  "MongoDB",
                  "Express",
                  "TypeScript",
                  "Angular",
                  "Vue.js",
                  "Flutter",
                ].map((tech, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isDark
                        ? "bg-dark-bg-primary text-primary border border-primary/20"
                        : "bg-light-bg-primary text-primary border border-primary/20"
                    } hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Join Us */}
            <div
              className={`fade-section group p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
                isDark
                  ? "border border-dark-border hover:border-primary/50"
                  : "border border-light-border hover:border-primary/50"
              } transition-all duration-300`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Join Our Community
              </h3>
              <p
                className={`text-lg leading-relaxed ${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                } mb-6`}
              >
                Become part of our growing community of learners and start your
                coding journey today. Get access to:
              </p>
              <ul
                className={`${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                } space-y-3 mb-8`}
              >
                <li className="text-lg">
                  • Discussion forums with peers and mentors
                </li>
                <li className="text-lg">
                  • Live coding sessions and workshops
                </li>
                <li className="text-lg">
                  • Networking opportunities with industry professionals
                </li>
                <li className="text-lg">
                  • Job placement assistance and career guidance
                </li>
              </ul>
              <Link
                to="/signup"
                className="block w-full py-4 text-center bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 text-lg"
              >
                Start Learning Today
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section
          className={`fade-section text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
            isDark ? "border border-dark-border" : "border border-light-border"
          } shadow-lg`}
        >
          <h3
            className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider mb-4 ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            }`}
          >
            Ready to Start Your Learning Journey?
          </h3>
          <p
            className={`text-lg md:text-xl ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            } max-w-3xl mx-auto leading-relaxed`}
          >
            Join thousands of learners who have transformed their careers with
            Codify. Your journey to tech excellence starts here.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
