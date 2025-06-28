import {socialLinksData} from "../data/data.jsx";
import { motion } from 'framer-motion';

export const Hero = () => {
    return (
        <section id="hero" className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tighter font-display"
                >
                    Zane Mehdi
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className="mt-4 text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 font-medium"
                >
                    Sofware Engineer
                </motion.p>
                <motion.div
                    className="flex justify-center items-center gap-6 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                >
                    {socialLinksData.map((social) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                            data-hoverable
                            whileHover={{y: -5, scale: 1.1}}
                            transition={{type: 'spring', stiffness: 300}}
                        ><img
                            src={social.icon}
                            alt={`${social.name} logo`}
                            className={`
    h-8 w-8 transition-all duration-300
    ${social.name === 'GitHub' ? 'dark:invert' : ''}
    md:grayscale md:opacity-60
    group-hover:grayscale-0 group-hover:opacity-100
  `}
                        />


                            <div
                                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {social.name}
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1, delay: 1, ease: 'easeOut'}}
                className="absolute bottom-10"
            >
                <div className="text-gray-600 dark:text-gray-400">
                    <span className="block mb-2 text-sm">Scroll Down</span>
                    <div
                        className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full mx-auto relative">
                        <motion.div
                            className="w-1 h-2 bg-gray-600 dark:bg-gray-400 rounded-full absolute left-1/2 -translate-x-1/2"
                            animate={{y: [4, 20, 4]}}
                            transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}
                        ></motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};