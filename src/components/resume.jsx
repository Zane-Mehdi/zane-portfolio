import { motion } from 'framer-motion';

export const Resume = () => (
    <section id="resume" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white font-display">My Resume</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                Here's a detailed look at my professional journey. Feel free to preview it here or download a copy for your records.
            </p>
            <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="h-[70vh] w-full">
                        {/* A real PDF would be hosted and linked here */}
                        <iframe
                            src="./Zane_Mehdi_CV.pdf"
                            className="w-full h-full"
                            title="Zane Mehdi's Resume"
                        />
                    </div>
                </div>
                <motion.a
                    id="download-cv-link"
                    href="./Zane_Mehdi_CV.pdf"
                    download="Zane_Mehdi_CV.pdf"
                    className="inline-block mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg"
                    whileHover={{scale: 1.05, boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.5)'}}
                    whileTap={{scale: 0.95}}
                >
                    Download CV
                </motion.a>
            </motion.div>
        </div>
    </section>
);