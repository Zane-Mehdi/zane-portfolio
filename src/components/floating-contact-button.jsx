import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingContactButton = ({ onContactClick, currentView }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPulse, setShowPulse] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    // Add a subtle pulse animation that stops after a few seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPulse(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Hide the button when already on contact page or when closed
    if (currentView === 'contact' || !isVisible) {
        return null;
    }

    const handleClose = (e) => {
        e.stopPropagation();
        setIsVisible(false);
    };

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5, type: "spring" }}
        >
            {/* Pulse rings */}
            <AnimatePresence>
                {showPulse && (
                    <>
                        <motion.div
                            className="absolute inset-0 rounded-full bg-indigo-500/30 pointer-events-none"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full bg-indigo-500/20 pointer-events-none"
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Close button - positioned outside the main button */}
            <motion.div
                onClick={handleClose}
                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center z-10 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-200 cursor-pointer group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M18 6L6 18"/>
                    <path d="M6 6l12 12"/>
                </svg>
            </motion.div>

            {/* Main button */}
            <motion.button
                onClick={onContactClick}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Zane AI Logo */}
                <motion.div
                    animate={{
                        rotate: isHovered ? 5 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex flex-col items-center justify-center"
                >
                    {/* Z and AI combined logo */}
                    <div className="text-white font-bold text-lg leading-none">
                        <span className="text-xl">Z</span>
                        <span className="text-xs ml-0.5 opacity-90">AI</span>
                    </div>
                    {/* Circuit lines underneath */}
                    <div className="flex space-x-0.5 mt-1">
                        <div className="w-1 h-0.5 bg-white/60 rounded-full"></div>
                        <div className="w-1.5 h-0.5 bg-white/80 rounded-full"></div>
                        <div className="w-1 h-0.5 bg-white/60 rounded-full"></div>
                    </div>
                </motion.div>

                {/* Notification dot for new messages vibe - hidden on mobile */}
                <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white hidden md:block"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                    >
                        <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium relative">
                            Chat with Zane's AI Assistant
                            {/* Arrow */}
                            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-800" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating particles for extra AI effect */}
            <AnimatePresence>
                {isHovered && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-indigo-400 rounded-full pointer-events-none"
                                initial={{
                                    x: 32,
                                    y: 32,
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    x: 32 + (Math.random() - 0.5) * 60,
                                    y: 32 + (Math.random() - 0.5) * 60,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: i * 0.2,
                                    repeat: Infinity
                                }}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};