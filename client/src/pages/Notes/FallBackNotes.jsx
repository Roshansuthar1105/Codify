import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader';

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { y: -8, scale: 1.02, transition: { duration: 0.2, ease: "easeInOut" } }
};
const backgroundVariants = { hidden: { opacity: 0, scale: 1.05 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } } };
const headerVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

function FallBackNotes() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { topic } = useParams();
    const [subjectData, setSubjectData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubjectData = async () => {
            try {
                setLoading(true);

                // 1️⃣ Import all JSON files in the folder
                const notesModules = import.meta.glob('../../assets/json/notesfolder/*.json');

                // 2️⃣ Construct the key for the requested topic
                const modulePath = `../../assets/json/notesfolder/${topic}.json`;

                // 3️⃣ Load dynamically if exists
                if (notesModules[modulePath]) {
                    const module = await notesModules[modulePath]();
                    setSubjectData(module.default); // JSON data
                } else {
                    console.error('File not found:', modulePath);
                    setSubjectData(null);
                }
            } catch (error) {
                console.error('Error loading notes:', error);
                setSubjectData(null);
            } finally {
                setLoading(false);
            }
        };

        loadSubjectData();
    }, [topic]);

    if (loading) return <Loader />;

    if (!subjectData) return (
        <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
            {/* Fallback UI */}
            <motion.div variants={backgroundVariants} initial="hidden" animate="visible" className={`absolute top-0 left-0 w-full h-full -z-10 ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}>
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
            </motion.div>
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20 text-center">
                <motion.h1 variants={headerVariants} initial="hidden" animate="visible" className="text-4xl font-bold">
                    Resources not found for {topic}
                </motion.h1>
            </div>
        </div>
    );

    return (
        <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
            {/* Background */}
            <motion.div variants={backgroundVariants} initial="hidden" animate="visible" className={`absolute top-0 left-0 w-full h-full -z-10 ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}>
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
                <motion.div variants={headerVariants} initial="hidden" animate="visible" className="text-center mb-12">
                    <h1 className={`text-4xl sm:text-5xl font-righteous tracking-wider mb-4`}>
                        Notes & Resources for {topic}
                    </h1>
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} className="h-1 rounded-full bg-gradient-to-r from-primary via-primary-dark to-primary"></motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjectData.map((item, ind) => <NotesCard key={ind} item={item} isDark={isDark} />)}
                </div>
            </div>
        </div>
    );
}

const NotesCard = ({ isDark, item }) => (
    <motion.div variants={cardVariants} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`group relative p-4 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'} transition-all duration-300`}>
        <div className='flex gap-2 items-center mb-2'>
            <img src={item.logo} alt={item.provider} className='w-10 h-10 rounded-full border-2 border-current p-1' />
            <span>{item.category}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="mb-4">{item.description}</p>
        <a href={item.link} target="_blank" className="inline-block py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors duration-300 text-sm font-semibold">
            View Notes
        </a>
    </motion.div>
);

export default FallBackNotes;
