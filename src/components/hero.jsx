import { socialLinksData } from "../data/data.jsx";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import "../hero.css";

export const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Only initialize mouse tracking for desktop
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        if (isMobile) return; // Skip on mobile

        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // Parallax transformations (disabled on mobile)
    const gridX = useTransform(mouseX, [0, 1000], isMobile ? [0, 0] : [-20, 20]);
    const gridY = useTransform(mouseY, [0, 1000], isMobile ? [0, 0] : [-20, 20]);

    const orb1X = useTransform(mouseX, [0, 1000], isMobile ? [0, 0] : [-40, 40]);
    const orb1Y = useTransform(mouseY, [0, 1000], isMobile ? [0, 0] : [-10, 30]);
    const orb2X = useTransform(mouseX, [0, 1000], isMobile ? [0, 0] : [40, -40]);
    const orb2Y = useTransform(mouseY, [0, 1000], isMobile ? [0, 0] : [30, -10]);
    const orb3X = useTransform(mouseX, [0, 1000], isMobile ? [0, 0] : [-20, 20]);
    const orb3Y = useTransform(mouseY, [0, 1000], isMobile ? [0, 0] : [10, -30]);

    // Simplified text animation for mobile
    const title = "Zane Mehdi";
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0.03 : 0.08, // Faster on mobile
            },
        },
    };
    const charVariants = {
        hidden: { opacity: 0, y: isMobile ? 20 : 50 }, // Less movement on mobile
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isMobile ? 0.3 : 0.5, // Faster on mobile
                ease: 'easeOut',
            },
        },
    };

    return (
        <section
            id="hero"
            className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden animated-gradient"
            onMouseMove={isMobile ? undefined : handleMouseMove} // Only add listener on desktop
        >
            {/* Simplified Grid Pattern for Mobile */}
            {isMobile ? (
                // Static version for mobile
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(165, 180, 252, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(165, 180, 252, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                    }}
                />
            ) : (
                // Animated version for desktop
                <motion.div
                    className="absolute inset-0 opacity-40 dark:opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(165, 180, 252, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(165, 180, 252, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        x: gridX,
                        y: gridY,
                    }}
                />
            )}

            {/* Simplified Orbs for Mobile */}
            {isMobile ? (
                // Static orbs for mobile
                <>
                    <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 dark:bg-purple-800/10 rounded-full blur-xl" />
                    <div className="absolute top-1/2 right-16 w-24 h-24 bg-indigo-300/20 dark:bg-indigo-800/10 rounded-full blur-xl" />
                    <div className="absolute bottom-20 left-20 w-20 h-20 bg-slate-300/20 dark:bg-slate-800/10 rounded-full blur-xl" />
                </>
            ) : (
                // Animated orbs for desktop
                <>
                    <motion.div
                        className="absolute top-20 left-10 w-48 h-48 bg-purple-300/30 dark:bg-purple-800/20 rounded-full blur-2xl"
                        style={{ x: orb1X, y: orb1Y }}
                        animate={{
                            y: [0, -20, 0],
                            x: [0, 10, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-16 w-36 h-36 bg-indigo-300/30 dark:bg-indigo-800/20 rounded-full blur-2xl"
                        style={{ x: orb2X, y: orb2Y }}
                        animate={{
                            y: [0, 20, 0],
                            x: [0, -15, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 left-20 w-32 h-32 bg-slate-300/30 dark:bg-slate-800/20 rounded-full blur-2xl"
                        style={{ x: orb3X, y: orb3Y }}
                        animate={{
                            y: [0, -15, 0],
                            x: [0, 20, 0],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />
                </>
            )}

            {/* Main Content */}
            <div className="relative z-10">
                {/* Optimized Title Animation */}
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
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.5 : 1, ease: 'easeOut' }}
                    className="mt-4 text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 font-medium"
                >
                    Software Engineer
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.6 : 1.1, ease: 'easeOut' }}
                    className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 font-light"
                >
                    Turning ideas into functional, elegant software.
                </motion.p>

                <motion.div
                    className="flex justify-center items-center gap-6 mt-8"
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.7 : 1.2, ease: 'easeOut' }}
                >
                    {socialLinksData.map((social) => (
                        <motion.a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                            whileHover={isMobile ? {} : {y: -5, scale: 1.1}} // Disable hover effects on mobile
                            transition={isMobile ? {} : {type: 'spring', stiffness: 300}}
                        >
                            <div className="relative p-3 rounded-full bg-white/70 dark:bg-gray-800/70 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl transition-all duration-300">
                                <img
                                    src={social.icon}
                                    alt={`${social.name} logo`}
                                    className={`
                                        h-6 w-6 transition-all duration-300
                                        ${social.name === 'GitHub' ? 'dark:invert' : ''}
                                        ${isMobile ? '' : 'md:grayscale md:opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}
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

            {/* Simplified Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: isMobile ? 0.5 : 1, delay: isMobile ? 0.8 : 1.5, ease: 'easeOut' }}
                className="absolute"
                style={{
                    bottom: isMobile ? '15rem' : '5rem'
                }}
            >
                <div className="text-gray-600 dark:text-gray-400">
                    <span className="block mb-2 text-sm">Scroll Down</span>
                    <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full mx-auto relative">
                        <motion.div
                            className="w-1 h-2 bg-gray-600 dark:bg-gray-400 rounded-full absolute left-1/2 -translate-x-1/2"
                            animate={{ y: [4, 20, 4] }}
                            transition={{
                                duration: isMobile ? 2 : 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                repeatDelay: isMobile ? 0.5 : 0 // Add delay on mobile to reduce CPU usage
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};