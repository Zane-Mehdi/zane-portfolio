import {skillsData} from "../data/data.jsx";
import { motion } from 'framer-motion';

export const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-display">Tech Stack</h2>
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {skillsData.map((skill) => (
                        <motion.div
                            key={skill.name}
                            className="group relative"
                            data-hoverable
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}
                            whileHover={{ y: -8, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <img src={skill.icon} alt={`${skill.name} logo`} className="h-16 w-16 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {skill.name}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};