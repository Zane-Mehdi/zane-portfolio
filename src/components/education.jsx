import {educationData} from "../data/data.jsx";
import { motion } from 'framer-motion';

export const Education = () => (
    <section id="education" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white font-display">Education</h2>
            <div className="max-w-2xl mx-auto">
                {educationData.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.institution}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium">{edu.degree}</p>
                        <time className="block my-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{edu.period}</time>
                        <p className="text-base font-normal text-gray-600 dark:text-gray-300">{edu.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);