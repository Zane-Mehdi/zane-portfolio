import { socialLinksData } from "../data/data.jsx";
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import "../hero.css";
import {getAnimationVariants, usePerformance} from "../useHooks/usePerformance.jsx";
import SplitText from "./SplitText.jsx";
import TextType from "./TextType.jsx";
import FloatingLines from "./FloatingLines.jsx";
import ShinyText from "./ShinyText.jsx";
import RotatingText from "./RotatingText.jsx";
import Shuffle from './Shuffle.jsx';
import GlassSurface from "./GlassSurface.jsx";

export const Hero = () => {
    const { isLowEnd, isMobile, fps } = usePerformance();

    // Memoize title animation
    const title = "Zane Mehdi";
    const titleAnimation = useMemo(() => {
        if (isLowEnd) {
            // Simple fade-in for low-end devices
            return {
                titleVariants: {
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { duration: 0.3 }
                    }
                },
                charVariants: {
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { duration: 0.1 }
                    }
                }
            };
        }

        const baseVariants = {
            titleVariants: {
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: isMobile ? 0.03 : 0.08,
                    },
                },
            },
            charVariants: {
                hidden: { opacity: 0, y: isMobile ? 20 : 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: isMobile ? 0.3 : 0.5,
                        ease: 'easeOut',
                    },
                },
            },
        };

        return baseVariants;
    }, [isMobile, isLowEnd]);

    // Memoize social links to prevent re-renders
    const socialLinks = useMemo(() =>
            socialLinksData.map((social) => (
                <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={isLowEnd ? {} : (isMobile ? {} : { y: -5, scale: 1.1 })}
                    transition={isLowEnd ? {} : (isMobile ? {} : { type: 'spring', stiffness: 300 })}
                >
                    {/* GlassSurface wrapper for the icon */}
                    <GlassSurface
                        width={48}              // Icon container size
                        height={48}
                        borderRadius={999}      // Makes it a circle
                        backgroundOpacity={0.18}
                        saturation={1.4}
                        className="shadow-lg backdrop-blur-md transition-all duration-300 group-hover:shadow-xl"
                    >
                        <img
                            src={social.icon}
                            alt={`${social.name} logo`}
                            className={`
                        h-6 w-6 transition-all duration-300
                        ${social.name === 'GitHub' ? 'dark:invert' : ''}
                        ${isMobile || isLowEnd ? '' : 'md:grayscale md:opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}
                    `}
                        />
                    </GlassSurface>

                    {/* Tooltip */}
                    {!isLowEnd && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                            {social.name}
                        </div>
                    )}
                </motion.a>
            )),
        [isMobile, isLowEnd]
    );

    // For low-end devices, render a simpler version
    if (isLowEnd) {
        return (
            <section
                id="hero"
                className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"
            >
                {/* Simple static gradient background instead of animated one */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10" />

                {/* Main Content - No complex animations */}
                <div className="relative z-10">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tighter font-display animate-fadeIn">
                        {title}
                    </h1>

                    <p className="mt-4 text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 font-medium animate-fadeIn animation-delay-200">
                        Software Engineer
                    </p>

                    <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 font-light animate-fadeIn animation-delay-400">
                        Turning ideas into functional, elegant software.
                    </p>

                    <div className="flex justify-center items-center gap-6 mt-8 animate-fadeIn animation-delay-600">
                        {socialLinks}
                    </div>
                </div>

                {/* Simple Scroll Indicator */}
                <div
                    className="absolute animate-fadeIn animation-delay-800"
                    style={{
                        bottom: isMobile
                            ? `max(3rem, calc(50vh - 200px))`
                            : `max(5rem, calc(20vh - 100px))`
                    }}
                >
                    <div className="text-gray-600 dark:text-gray-400">
                        <span className="block mb-2 text-sm">Scroll Down</span>
                        <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full mx-auto relative">
                            <div className="w-1 h-2 bg-gray-600 dark:bg-gray-400 rounded-full absolute left-1/2 -translate-x-1/2 animate-bounce" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Original animated version for high-end devices
    return (
        <section
            id="hero"
            className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden animated-gradient"
        >
            {/* Floating lines background */}
            <div className="absolute inset-0 z-0 opacity-90">
                <FloatingLines
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[7, 7, 7]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-5}
                    interactive={true}
                    parallax={true}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <TextType
                    text={["Welcome to my website ", "Hi Hello", "Zane Mehdi"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="_"
                    loop={false}
                    className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tighter font-display"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                    className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xl md:text-2xl text-white dark:text-white font-medium"
                >
                    Software Engineer
                </motion.p>


                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
                    className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 font-light"
                >
                    Turning ideas into functional, elegant software.
                </motion.p>

                <motion.div
                    className="flex justify-center items-center gap-6 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                >
                    {socialLinks}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
                className="absolute z-10"
                style={{
                    bottom: isMobile
                        ? `max(3rem, calc(50vh - 200px))`
                        : `max(5rem, calc(20vh - 100px))`
                }}
            >
                <div className="text-gray-600 dark:text-gray-400">
                    <span className="block mb-2 text-sm">Scroll Down</span>
                    <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full mx-auto relative">
                        <motion.div
                            className="w-1 h-2 bg-gray-600 dark:bg-gray-400 rounded-full absolute left-1/2 -translate-x-1/2"
                            animate={{ y: [4, 20, 4] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                repeatDelay: 0
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};