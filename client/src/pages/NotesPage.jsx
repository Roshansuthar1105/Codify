import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Notes from "../assets/json/notes.json";

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

const searchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: 0.8,
            ease: "easeOut"
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

const NotesPage = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [searchQuery, setSearchQuery] = useState('');

    // Filter notes based on search query
    const filteredNotes = Notes.filter(note => 
        note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
            {/* Enhanced Background with gradient overlay */}
            <motion.div
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
                className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
            >
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
                {/* Enhanced Header Section */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-12"
                >
                    <div className="inline-block">
                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                            Notes & Resources
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
                        ></motion.div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                    >
                        Access curated notes, study materials, and resources to enhance your learning journey.
                    </motion.p>
                </motion.div>

                {/* Search Bar Section */}
                <motion.div
                    variants={searchVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className={`h-5 w-5 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search notes by name or content..."
                            className={`w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
                                isDark 
                                    ? 'bg-dark-bg-secondary border-dark-border text-dark-text-primary placeholder-dark-text-secondary focus:border-primary' 
                                    : 'bg-light-bg-secondary border-light-border text-light-text-primary placeholder-light-text-secondary focus:border-primary'
                            }`}
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className={`absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70 transition-opacity ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    {searchQuery && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`mt-3 text-sm text-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                        >
                            {filteredNotes.length === 1 
                                ? `Found 1 note matching "${searchQuery}"`
                                : `Found ${filteredNotes.length} notes matching "${searchQuery}"`
                            }
                        </motion.p>
                    )}
                </motion.div>

                {/* Notes Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((item, ind) => {
                            return (
                                <NotesCard 
                                    key={ind} 
                                    isDark={isDark} 
                                    name={item.name} 
                                    content={item.content} 
                                    icon={item.icon} 
                                    link={item.link}
                                    searchQuery={searchQuery}
                                />
                            )
                        })
                    ) : searchQuery ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="col-span-full text-center py-12"
                        >
                            <div className={`text-6xl mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                                📝
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                                No notes found
                            </h3>
                            <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                                No notes match your search for "{searchQuery}". Try different keywords.
                            </p>
                            <button
                                onClick={clearSearch}
                                className="inline-flex items-center py-2 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors duration-300"
                            >
                                Clear Search
                            </button>
                        </motion.div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

const NotesCard = ({ isDark, name, content, link, icon, searchQuery }) => {
    // Function to highlight search terms
    const highlightText = (text, query) => {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);
        
        return parts.map((part, index) => 
            regex.test(part) ? (
                <span key={index} className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">
                    {part}
                </span>
            ) : part
        );
    };

    return (
        <motion.div
            variants={cardVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
        >
            <span className="text-xl sm:text-2xl">{icon || "⚡"}</span>
            <h3 className="text-xl font-semibold mb-2">
                {highlightText(name, searchQuery)}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {highlightText(content, searchQuery)}
            </p>
            <Link 
                className={`relative z-10 inline-flex items-center justify-center py-3 px-4 sm:px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm sm:text-base`}
                to={link}
            >
                View Notes
            </Link>
        </motion.div>
    );
}

export default NotesPage;