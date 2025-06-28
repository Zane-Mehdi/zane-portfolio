import {workHistoryData} from "../data/data.jsx";
import { motion } from 'framer-motion';

export const WorkHistory = () => (
    <section id="work-history" className="py-24 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white font-display">Work History</h2>
        <div className="relative border-l-2 border-indigo-200 dark:border-gray-700">
            {workHistoryData.map((job, index) => (
                <motion.div
                    key={job.id}
                    className="mb-12 ml-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-950 dark:bg-indigo-900">
                        <svg className="w-3 h-3 text-indigo-800 dark:text-indigo-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                    </span>
                    <div className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="flex items-center mb-1 text-xl font-semibold text-gray-900 dark:text-white">{job.role} <span className="text-sm font-medium ml-3 px-2.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">{job.company}</span></h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400">{job.period}</time>
                        {Array.isArray(job.description) ? (
                            <ul className="list-disc pl-5 text-base text-gray-600 dark:text-gray-300 space-y-1">
                                {job.description.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-base text-gray-600 dark:text-gray-300">{job.description}</p>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
);