import { motion } from 'framer-motion';
import { memo } from 'react';

// Memoize stat cards to prevent unnecessary re-renders
const StatCard = memo(({ value, label, delay = 0 }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        duration: 0.6,
                        delay: delay,
                        ease: 'easeOut'
                    }
                }
            }}
            className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-display">
                {value}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{label}</p>
        </motion.div>
    );
});

StatCard.displayName = 'StatCard';

export const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                ease: 'easeOut'
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    return (
        <section id="about" className="py-24 container mx-auto px-6">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.div variants={textVariants}>
                    <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white font-display">
                        About Me
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Hi, I'm a Software Engineer based in London! I am currently working at Pulselive and have a
                        first-class degree in Computer Science at King's College London.
                    </p>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                                duration: 0.6,
                                staggerChildren: 0.1,
                                ease: 'easeOut'
                            }
                        }
                    }}
                    className="space-y-6"
                >
                    {/*<StatCard value="1+" label="Years of Experience" delay={0} />*/}
                    {/*<StatCard value="10+" label="Projects Completed" delay={0.1} />*/}
                </motion.div>
            </motion.div>
        </section>
    );
};