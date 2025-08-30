import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Notes from "../assets/json/notes.json";

gsap.registerPlugin(ScrollTrigger);


const NotesPage = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // refs for GSAP animations
    const lineRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        
        // Title line animation (0% → 100% width)
        gsap.fromTo(
            lineRef.current,
            { width: 0 },
            {
                width: "100%",
                duration: 1,
                ease: "power3.out",
                delay: 0.8,
            }
        );

        // Cards scroll animation
        cardsRef.current.forEach((card, i) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    delay: i * 0.1, // small stagger
                }
            );
        });
    }, []);

    return (
        <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
            {/* Enhanced Background with gradient overlay */}
            <div
                className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
            >
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
                {/* Enhanced Header Section */}
                <div
                    className="text-center mb-12"
                >
                    <div className="inline-block">
                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                            Notes & Resources
                        </h1>
                        <div
                            ref={lineRef}
                            className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
                        ></div>
                    </div>
                    <p
                        className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                    >
                        Access curated notes, study materials, and resources to enhance your learning journey.
                    </p>
                </div>

                {/* Notes Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        Notes.map((item, ind) => {
                            return (
                                <NotesCard
                                    key={ind}
                                    ref={(el) => (cardsRef.current[ind] = el)}
                                    isDark={isDark}
                                    name={item.name}
                                    content={item.content}
                                    icon={item.icon}
                                    link={item.link}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

// Forward ref so GSAP can target it
import React, { forwardRef } from "react";
const NotesCard = forwardRef(({ isDark, name, content, link, icon }, ref) => {
    return (
        <div
            ref={ref}
            className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
        // className={`p-6 rounded-xl border ${isDark ? 'bg-dark-bg-secondary border-dark-border' : 'bg-light-bg-secondary border-light-border'} hover:shadow-lg transition-shadow`}
        >
            <span className="text-xl sm:text-2xl">{icon || "⚡"}</span>
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {content}
            </p>
            <Link className={`relative z-10 inline-flex items-center justify-center py-3 px-4 sm:px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm sm:text-base`}
                to={link}
            >
                View Notes
            </Link>
        </div>
    );
});

export default NotesPage;