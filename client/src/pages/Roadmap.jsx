import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import roadmap from "../assets/json/roadmap.json";
import skills from "../assets/json/skillbasedRoadmaps.json";
import { useTheme } from "../context/ThemeContext";

const Roadmap = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // all, roles, skills

  // Search functionality
  const filteredRoadmaps = useMemo(() => {
    // Normalize property names and filter out any invalid items
    const normalizedRoadmaps = roadmap
      .filter(item => item && (item.roadmap_name || item.name))
      .map(item => ({ 
        ...item,
        name: item.roadmap_name || item.name,
        link: item.roadmap_link || item.link,
        type: 'role' 
      }));
    
    const normalizedSkills = skills
      .filter(item => item && (item.skill_name || item.name))
      .map(item => ({ 
        ...item,
        name: item.skill_name || item.name,
        link: item.skill_link || item.link,
        type: 'skill' 
      }));

    const allRoadmaps = [...normalizedRoadmaps, ...normalizedSkills];
    let filtered = allRoadmaps;

    // Filter by type
    if (activeFilter === 'roles') {
      filtered = filtered.filter(item => item.type === 'role');
    } else if (activeFilter === 'skills') {
      filtered = filtered.filter(item => item.type === 'skill');
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => {
        // Additional safety check
        if (!item || !item.name || typeof item.name !== 'string') {
          return false;
        }
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    return {
      roles: filtered.filter(item => item.type === 'role'),
      skills: filtered.filter(item => item.type === 'skill')
    };
  }, [searchQuery, activeFilter]);

  // Animation variants - all based on page load, not scroll
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
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

  const buttonVariants = {
    initial: { 
      scale: 1
    },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    initial: { x: 0 },
    hover: { 
      x: 4,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

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
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const noResultsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Staggered section animations
  const rolesSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.4
      }
    }
  };

  const skillsSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.8,
        duration: 0.4
      }
    }
  };

  const ctaSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.4,
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
              Learning Roadmaps
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
            Discover comprehensive learning paths designed to guide your journey from beginner to expert in various roles and skills.
          </motion.p>
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div
          variants={searchVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {/* Search Bar */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-full max-w-2xl">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className={`relative rounded-2xl overflow-hidden ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} transition-all duration-300`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className={`h-5 w-5 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search roadmaps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 text-lg placeholder-opacity-50 bg-transparent border-none outline-none focus:ring-0 ${isDark ? 'text-dark-text-primary placeholder-dark-text-secondary' : 'text-light-text-primary placeholder-light-text-secondary'}`}
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSearchQuery("")}
                    className={`absolute inset-y-0 right-0 pr-4 flex items-center ${isDark ? 'text-dark-text-secondary hover:text-dark-text-primary' : 'text-light-text-secondary hover:text-light-text-primary'} transition-colors duration-200`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Filter Buttons */}
            <div className={`flex flex-wrap justify-center gap-3 p-2 rounded-xl ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
              {[
                { key: 'all', label: 'All Roadmaps', count: roadmap.length + skills.length },
                { key: 'roles', label: 'Role Based', count: roadmap.length },
                { key: 'skills', label: 'Skill Based', count: skills.length }
              ].map((filter) => (
                <motion.button
                  key={filter.key}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeFilter === filter.key
                      ? 'bg-primary text-white shadow-lg'
                      : isDark
                      ? 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-bg-primary'
                      : 'text-light-text-secondary hover:text-light-text-primary hover:bg-light-bg-primary'
                  }`}
                >
                  {filter.label}
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
  activeFilter === filter.key
    ? 'bg-white/20'
    : isDark
    ? 'bg-dark-bg-primary text-dark-text-secondary'
    : 'bg-light-bg-primary text-light-text-secondary'
}`}>
  {filter.key === 'all'
    ? roadmap.length + skills.length
    : filter.key === 'roles'
    ? roadmap.length
    : skills.length}
</span>

                </motion.button>
              ))}
            </div>

            {/* Search Results Count */}
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
              >
                Found {filteredRoadmaps.roles.length + filteredRoadmaps.skills.length} roadmap(s) matching "{searchQuery}"
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* No Results Message */}
        {searchQuery && filteredRoadmaps.roles.length === 0 && filteredRoadmaps.skills.length === 0 && (
          <motion.div
            variants={noResultsVariants}
            initial="hidden"
            animate="visible"
            className={`text-center py-16 rounded-2xl ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              No roadmaps found
            </h3>
            <p className={`text-lg ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-md mx-auto`}>
              Try adjusting your search terms or browse our available roadmaps.
            </p>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-4 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300"
            >
              Show All Roadmaps
            </motion.button>
          </motion.div>
        )}

        {/* Enhanced Role-based Roadmaps */}
        {(activeFilter === 'all' || activeFilter === 'roles') && filteredRoadmaps.roles.length > 0 && (
          <motion.section 
            variants={rolesSectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-24"
          >
            <motion.div 
              variants={sectionHeaderVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.3 }}
              className="flex items-center justify-center mb-12"
            >
              <div className={`h-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}></div>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider px-4 sm:px-8 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                Role Based Roadmaps
                {searchQuery && (
                  <span className={`ml-2 text-base font-normal ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    ({filteredRoadmaps.roles.length})
                  </span>
                )}
              </h2>
              <div className={`h-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}></div>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {filteredRoadmaps.roles.map((item, index) => (
                <motion.div
                  key={`role-${item.roadmap_name}-${index}`}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
                >
                  {/* Animated border on right and bottom */}
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
                  
                  {/* Role icon with enhanced animation */}
                  <motion.div 
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg mb-4 flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-xl sm:text-2xl">
                      {item.icon || "⚡"}
                    </span>
                  </motion.div>

                  <div className="flex-1 relative z-10">
                    <h3 className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 leading-tight ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                      {item.name || 'Untitled Roadmap'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6`}>
                      Master the skills needed for this role with our comprehensive learning path.
                    </p>
                  </div>

                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative z-10 inline-flex items-center justify-center py-3 px-4 sm:px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm sm:text-base"
                  >
                    Explore Path
                    <motion.svg 
                      variants={iconVariants}
                      className="ml-2 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Enhanced Skill-based Roadmaps */}
        {(activeFilter === 'all' || activeFilter === 'skills') && filteredRoadmaps.skills.length > 0 && (
          <motion.section
            variants={skillsSectionVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={sectionHeaderVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.9 }}
              className="flex items-center justify-center mb-12"
            >
              <div className={`h-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}></div>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-righteous tracking-wider px-4 sm:px-8 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                Skill Based Roadmaps
                {searchQuery && (
                  <span className={`ml-2 text-base font-normal ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    ({filteredRoadmaps.skills.length})
                  </span>
                )}
              </h2>
              <div className={`h-px flex-1 ${isDark ? 'bg-dark-border' : 'bg-light-border'}`}></div>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2.0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {filteredRoadmaps.skills.map((item, index) => (
                <motion.div
                  key={`skill-${item.roadmap_name}-${index}`}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl  ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
                >
                  {/* Animated border on right and bottom */}
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
                  
                  {/* Role icon with enhanced animation */}
                  <motion.div 
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg mb-4 flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-xl sm:text-2xl">
                      {item.icon || "⚡"}
                    </span>
                  </motion.div>

                  <div className="flex-1 relative z-10">
                    <h3 className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 leading-tight ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                      {item.name || 'Untitled Roadmap'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-6`}>
                      Master the skills needed for this role with our comprehensive learning path.
                    </p>
                  </div>

                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative z-10 inline-flex items-center justify-center py-3 px-4 sm:px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm sm:text-base"
                  >
                    Explore Path
                    <motion.svg 
                      variants={iconVariants}
                      className="ml-2 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Call to Action Section - Only show when not searching or when search has results */}
        {(!searchQuery || (filteredRoadmaps.roles.length > 0 || filteredRoadmaps.skills.length > 0)) && (
          <motion.section 
            variants={ctaSectionVariants}
            initial="hidden"
            animate="visible"
            className={`mt-24 text-center p-8 sm:p-12 rounded-3xl ${isDark ? 'bg-gradient-to-r from-dark-bg-secondary to-dark-bg-secondary border border-dark-border' : 'bg-gradient-to-r from-light-bg-secondary to-light-bg-secondary border border-light-border'}`}
          >
            <h3 className={`text-xl sm:text-2xl md:text-3xl font-righteous mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Ready to Start Your Learning Journey?
            </h3>
            <p className={`text-base sm:text-lg ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} max-w-2xl mx-auto`}>
              Choose a roadmap that aligns with your career goals and start building the skills that will define your future in tech.
            </p>
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default Roadmap;