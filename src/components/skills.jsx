import { skillsData } from "../data/data.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState } from 'react';

// Memoize individual skill item to prevent unnecessary re-renders
const SkillItem = memo(({ skill, index }) => {
    return (
        <motion.div
            className="group relative flex flex-col items-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            data-hoverable
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{
                duration: 0.3,
                delay: index * 0.05,
                layout: { duration: 0.3 }
            }}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            <img
                src={skill.icon}
                alt={`${skill.name} logo`}
                className="h-12 w-12 mb-3 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
            />

            {/* Skill Name */}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 text-center">
                {skill.name}
            </h3>

            {/* Years of Experience */}
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {skill.experience}
            </span>

            {/* Category Badge */}
            <span className="absolute -top-2 -right-2 text-xs bg-indigo-500 text-white px-2 py-1 rounded-full">
                {skill.category}
            </span>
        </motion.div>
    );
});

SkillItem.displayName = 'SkillItem';

export const Skills = () => {
    const [filter, setFilter] = useState('all');

    const categories = ['all', ...new Set(skillsData.map(skill => skill.category))];
    const filteredSkills = filter === 'all' ? skillsData : skillsData.filter(skill => skill.category === filter);

    return (
        <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white font-display">
                        Tech Stack & Proficiency
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Here's what I work with daily, along with my proficiency levels based on years of experience and project complexity.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    filter === category
                                        ? 'bg-indigo-500 text-white shadow-lg'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Skills Grid with AnimatePresence */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                    layout
                >
                    <AnimatePresence mode="wait">
                        {filteredSkills.map((skill, index) => (
                            <SkillItem
                                key={`${filter}-${skill.name}`} // Unique key per filter state
                                skill={skill}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Show count of visible skills */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {filteredSkills.length} of {skillsData.length} skills
                    </p>
                </div>

                {/* Professional Summary */}
                <div className="mt-16 text-center">
                    <div className="flex justify-center max-w-md mx-auto">
                        <div
                            className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">1.5+</h3>
                            <p className="text-gray-600 dark:text-gray-400">Years Professional Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};