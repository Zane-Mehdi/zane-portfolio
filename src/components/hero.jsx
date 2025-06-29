import { socialLinksData } from "../data/data.jsx";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import "../hero.css";

export const Hero = () => {
    // 1. Hooks to track mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // 2. Create parallax transformations for background elements
    const gridX = useTransform(mouseX, [0, 1000], [-20, 20]);
    const gridY = useTransform(mouseY, [0, 1000], [-20, 20]);

    const orb1X = useTransform(mouseX, [0, 1000], [-40, 40]);
    const orb1Y = useTransform(mouseY, [0, 1000], [-10, 30]);
    const orb2X = useTransform(mouseX, [0, 1000], [40, -40]);
    const orb2Y = useTransform(mouseY, [0, 1000], [30, -10]);
    const orb3X = useTransform(mouseX, [0, 1000], [-20, 20]);
    const orb3Y = useTransform(mouseY, [0, 1000], [10, -30]);

    // 3. Staggered text animation setup
    const title = "Zane Mehdi";
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };
    const charVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section
            id="hero"
            className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden animated-gradient"
            onMouseMove={handleMouseMove} // Event listener to update mouse values
        >
            {/* Subtle Grid Pattern with Parallax */}
            <motion.div
                className="absolute inset-0 opacity-40 dark:opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(165, 180, 252, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(165, 180, 252, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    x: gridX, // Apply parallax
                    y: gridY,  // Apply parallax
                }}
            />

            {/* Harmonised Floating Orbs with Parallax */}
            <motion.div
                className="absolute top-20 left-10 w-48 h-48 bg-purple-300/30 dark:bg-purple-800/20 rounded-full blur-2xl"
                style={{ x: orb1X, y: orb1Y }} // Apply parallax, overrides the previous animate prop
            />
            <motion.div
                className="absolute top-1/2 right-16 w-36 h-36 bg-indigo-300/30 dark:bg-indigo-800/20 rounded-full blur-2xl"
                style={{ x: orb2X, y: orb2Y }} // Apply parallax
            />
            <motion.div
                className="absolute bottom-20 left-20 w-32 h-32 bg-slate-300/30 dark:bg-slate-800/20 rounded-full blur-2xl"
                style={{ x: orb3X, y: orb3Y }} // Apply parallax
            />

            {/* Main Content */}
            <div className="relative z-10">
                {/* 4. Staggered Title Reveal */}
                <motion.h1
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tighter font-display"
                    aria-label={title}
                >
                    {title.split("").map((char, index) => (
                        <motion.span key={index} variants={charVariants} className="inline-block">
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }} // Adjusted delay
                    className="mt-4 text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 font-medium"
                >
                    Software Engineer
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }} // Adjusted delay
                    className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 font-light"
                >
                    Turning ideas into functional, elegant software.
                </motion.p>

                <motion.div
                    className="flex justify-center items-center gap-6 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }} // Adjusted delay
                >
                    {socialLinksData.map((social) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                            whileHover={{y: -5, scale: 1.1}}
                            transition={{type: 'spring', stiffness: 300}}
                        >
                            <div className="relative p-3 rounded-full bg-white/70 dark:bg-gray-800/70 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl transition-all duration-300">
                                <img
                                    src={social.icon}
                                    alt={`${social.name} logo`}
                                    className={`
                                        h-6 w-6 transition-all duration-300
                                        ${social.name === 'GitHub' ? 'dark:invert' : ''}
                                        md:grayscale md:opacity-70
                                        group-hover:grayscale-0 group-hover:opacity-100
                                    `}
                                />
                            </div>
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                                {social.name}
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
                className="absolute"
                style={{
                    bottom: window.innerWidth >= 768 ? '5rem' : '15rem'
                }}
            >
                <div className="text-gray-600 dark:text-gray-400">
                    <span className="block mb-2 text-sm">Scroll Down</span>
                    <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full mx-auto relative">
                        <motion.div
                            className="w-1 h-2 bg-gray-600 dark:bg-gray-400 rounded-full absolute left-1/2 -translate-x-1/2"
                            animate={{ y: [4, 20, 4] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        ></motion.div>
                    </div>
                </div>
            </motion.div>

        </section>
    );
};