import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import GlassSurface from "./GlassSurface.jsx";
import ShinyText from "./ShinyText.jsx";
import { usePerformance } from "../useHooks/usePerformance.jsx";

export const Navbar = ({ theme, toggleTheme, currentView, setCurrentView }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { performanceMode, setPerformanceMode } = usePerformance();
    const reduceMotionEnabled = performanceMode === 'low';

    const Sun = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>);
    const Moon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);

    const Hamburger = () => (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    );

    const Close = () => (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );

    const navLinks = [
        { name: 'Home', view: 'home' },
        { name: 'Contact', view: 'contact', isAI: true }
    ];

    const toggleReduceMotion = () => {
        setPerformanceMode(reduceMotionEnabled ? 'auto' : 'low');
    };

    const handleNavClick = (view) => {
        // Close mobile menu first
        setIsMobileMenuOpen(false);

        // Small delay to allow menu to close, then change view
        setTimeout(() => {
            setCurrentView(view);
        }, 100);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
            >
                <GlassSurface
                    width="100%"
                    height={64}
                    borderRadius={999}
                    backgroundOpacity={0.18}
                    saturation={1.4}
                    className="max-w-5xl"
                >
                    <div className="flex w-full items-center justify-between px-4">
                        {/* Logo */}
                        <button
                            onClick={() => handleNavClick("home")}
                            className="text-2xl font-bold text-gray-900 dark:text-white font-display"
                        >
                            <ShinyText
                                text="Zane Mehdi"
                                disabled={false}
                                speed={3}
                                className='custom-class'
                            />
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => setCurrentView(link.view)}
                                    className={`relative flex items-center text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors ${
                                        currentView === link.view
                                            ? "text-cyan-500 dark:text-cyan-400"
                                            : ""
                                    }`}
                                >
                                    {link.name}
                                    {link.isAI && (
                                        <motion.span
                                            className="ml-2 w-2 h-2 rounded-full bg-cyan-500"
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}
                                    {currentView === link.view && (
                                        <motion.div
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-500"
                                            layoutId="underline"
                                        />
                                    )}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={toggleReduceMotion}
                                aria-pressed={reduceMotionEnabled}
                                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                                title="Reduce motion"
                            >
                                <span>Reduce motion</span>
                                <span
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                        reduceMotionEnabled ? 'bg-cyan-500' : 'bg-gray-300 dark:bg-gray-700'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            reduceMotionEnabled ? 'translate-x-4' : 'translate-x-1'
                                        }`}
                                    />
                                </span>
                            </button>
                        </div>

                        {/* Mobile controls */}
                        <div className="flex items-center space-x-2">
                            {/* Theme Toggle (if you re-enable it) */}
                            {/* <button onClick={toggleTheme} ...>{theme === 'dark' ? <Sun /> : <Moon />}</button> */}

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            >
                                {isMobileMenuOpen ? <Close /> : <Hamburger />}
                            </button>
                        </div>
                    </div>
                </GlassSurface>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed top-0 right-0 h-full w-64 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-l border-gray-200 dark:border-gray-800 md:hidden"
                    >
                        <div className="flex flex-col p-6 pt-20">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleNavClick(link.view)}
                                    className={`flex items-center justify-between py-4 px-2 text-left text-lg font-medium transition-colors border-b border-gray-200 dark:border-gray-800 ${
                                        currentView === link.view
                                            ? 'text-cyan-500 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    <span className="flex items-center">
                                        {link.name}
                                        {link.isAI && (
                                            <motion.span
                                                className="ml-2 w-2 h-2 rounded-full bg-cyan-500"
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                            />
                                        )}
                                    </span>
                                    {currentView === link.view && (
                                        <motion.div
                                            className="w-2 h-2 rounded-full bg-cyan-500"
                                            layoutId="mobileIndicator"
                                        />
                                    )}
                                </motion.button>
                            ))}

                            <button
                                type="button"
                                onClick={toggleReduceMotion}
                                aria-pressed={reduceMotionEnabled}
                                className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                            >
                                <span>Reduce motion</span>
                                <span
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                        reduceMotionEnabled ? 'bg-cyan-500' : 'bg-gray-300 dark:bg-gray-700'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            reduceMotionEnabled ? 'translate-x-4' : 'translate-x-1'
                                        }`}
                                    />
                                </span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
