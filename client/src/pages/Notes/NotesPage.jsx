import { animate, delay, motion, AnimatePresence } from 'framer-motion';
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Link } from 'react-router-dom';
import { Search, X, Plus, FileText, Link2 } from 'lucide-react';
import NotesData from "./NotesData";

const NotesPage = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [searchQuery, setSearchQuery] = useState('');

    // Filter notes based on search query
    const filteredNotes = NotesData.filter(note =>
        note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    // Animation variants - matching Dashboard
    const backgroundVariants = {
        hidden: { opacity: 0, scale: 1.05 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const titleAnimation = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const titleLine = {
        hidden: { width: 0, opacity: 0 },
        visible: {
            width: "100%",
            opacity: 1,
            transition: {
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const contentAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.6,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const searchAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.8,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 1.2
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
            {/* Enhanced Background with gradient overlay - matching Dashboard */}
            <motion.div 
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
                className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
            >
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
                {/* Enhanced Header Section - matching Dashboard */}
                <motion.div 
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-12"
                >
                    <div className="inline-block overflow-hidden">
                        <motion.h1
                            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}
                            initial="hidden"
                            animate="visible"
                            variants={titleAnimation}
                        >
                            Notes & Resources
                        </motion.h1>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={titleLine}
                            transition={{ delay: 0.6 }}
                            className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
                        ></motion.div>
                    </div>
                    <motion.p
                        className={`m-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                        initial="hidden"
                        animate="visible"
                        variants={contentAnimation}
                    >
                        Access curated notes, study materials, and resources to enhance your learning journey.
                    </motion.p>

                    {/* Enhanced Search Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={searchAnimation}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className={`h-5 w-5 ${isDark ? 'text-dark-text-secondary' : 'text-blue-400'}`} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search notes by name or content..."
                                className={`w-full pl-12 pr-12 py-4 text-base rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 shadow-lg ${isDark
                                    ? 'bg-dark-bg-tertiary border-dark-border text-white placeholder-gray-400 focus:ring-primary focus:border-primary hover:bg-dark-bg-secondary'
                                    : 'bg-blue-50 border-blue-200 text-blue-900 placeholder-blue-400 focus:ring-primary focus:border-primary hover:bg-white shadow-blue-100'
                                }`}
                            />
                            {searchQuery && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={clearSearch}
                                    className={`absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70 transition-opacity ${isDark ? 'text-gray-400' : 'text-blue-500'}`}
                                    aria-label="Clear search"
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            )}
                        </motion.div>
                        {searchQuery && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`mt-3 text-sm text-center ${isDark ? 'text-dark-text-secondary' : 'text-blue-600'}`}
                            >
                                {filteredNotes.length === 1
                                    ? `Found 1 note matching "${searchQuery}"`
                                    : `Found ${filteredNotes.length} notes matching "${searchQuery}"`
                                }
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Enhanced Notes Section Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={contentAnimation}
                        className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
                    >
                        <div className="w-full sm:w-auto">
                            <h2 className={`text-2xl sm:text-3xl font-righteous tracking-wider text-center sm:text-left ${isDark ? 'text-dark-text-primary' : 'text-blue-900'}`}>
                                Notes Topics
                            </h2>
                            <p className={`text-sm mt-1 text-center sm:text-left ${isDark ? 'text-dark-text-secondary' : 'text-blue-600'}`}>
                                Browse through our collection of curated notes and resources
                            </p>
                        </div>

                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            className={`px-6 py-3 rounded-xl shadow-lg border ${isDark ? 'bg-dark-bg-tertiary border-dark-border' : 'bg-blue-50 border-blue-200'}`}
                        >
                            <p className={`text-sm font-medium flex items-center ${isDark ? 'text-primary' : 'text-blue-700'}`}>
                                <span className={`mr-2 ${isDark ? 'text-dark-text-secondary' : 'text-blue-500'}`}>Total Notes:</span>
                                <span className="font-bold text-lg">{filteredNotes.length}</span>
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Notes Grid with Dashboard-style cards */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {filteredNotes.map((note, index) => {
                            const Icon = note.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className={`group relative overflow-hidden rounded-2xl p-6 lg:p-8 shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl ${
                                        isDark 
                                            ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
                                            : 'from-blue-50 to-indigo-50 border border-blue-200 hover:border-primary/50'
                                    }`}
                                >
                                    {/* Animated border on hover */}
                                    <motion.div 
                                        className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                                        whileHover={{ 
                                            width: "3px",
                                            transition: { duration: 0.3, ease: "easeOut" }
                                        }}
                                    />
                                    <motion.div 
                                        className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                                        whileHover={{ 
                                            height: "3px",
                                            transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
                                        }}
                                    />

                                    <div className="absolute top-4 right-4">
                                        {note.customDocs ? (
                                            <motion.div 
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                                className={`p-2 rounded-xl ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`}
                                            >
                                                <FileText className="w-4 h-4" />
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                                className={`p-2 rounded-xl ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                                            >
                                                <Link2 className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="flex flex-col h-full">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <motion.div 
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                                className={`p-3 rounded-xl ${isDark ? 'bg-dark-bg-primary/50' : 'bg-blue-100'}`}
                                            >
                                                <Icon className={`w-6 h-6 ${isDark ? 'text-primary' : 'text-blue-600'}`} />
                                            </motion.div>
                                            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-blue-900'} group-hover:text-primary transition-colors duration-300`}>
                                                {note.name}
                                            </h3>
                                        </div>
                                        <p className={`text-sm mb-6 line-clamp-3 ${isDark ? 'text-gray-300' : 'text-blue-700'}`}>
                                            {note.content}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="flex items-center justify-between">
                                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                    <Link
                                                        to={note.link}
                                                        className={`inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${isDark
                                                            ? 'bg-dark-bg-primary/50 text-primary hover:bg-dark-bg-primary/80'
                                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'} group`}
                                                    >
                                                        <span className="mr-2">{note.customDocs ? 'View Notes' : 'View Resources'}</span>
                                                        <motion.span 
                                                            className="inline-block"
                                                            whileHover={{ x: 4 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            →
                                                        </motion.span>
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Call to Action Section - matching Dashboard */}
                    <motion.section 
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
                        className="mt-24"
                    >
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                            className={`relative p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden ${
                                isDark 
                                    ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
                                    : 'from-blue-50 to-indigo-50 border border-blue-200'
                            }`}
                        >
                            <div className="max-w-5xl mx-auto text-center">
                                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-righteous leading-tight mb-4 ${
                                    isDark ? 'text-dark-text-primary' : 'text-blue-900'
                                }`}>
                                    Keep Learning,
                                    <span className="text-primary"> Keep Growing</span>
                                </h3>
                                <p className={`text-base sm:text-lg md:text-xl mb-6 ${
                                    isDark ? 'text-dark-text-secondary' : 'text-blue-700'
                                }`}>
                                    Explore more resources and expand your knowledge base.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link to="/courses" className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors font-semibold">
                                            Browse Courses
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link to="/roadmap" className={`${
                                            isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-white text-blue-800'
                                        } px-6 py-3 rounded-xl border border-primary/30 hover:border-primary/60 transition-colors font-semibold`}>
                                            Explore Roadmaps
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.section>
                </motion.div>
            </div>
        </div>
    );
};

export default NotesPage;