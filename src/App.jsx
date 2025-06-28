import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {About} from "./components/about.jsx";
import {Hero} from "./components/hero.jsx";
import {Testimonials} from "./components/testimonials.jsx";
import {Skills} from "./components/skills.jsx";
import {WorkHistory} from "./components/work-history.jsx";
import {Education} from "./components/education.jsx";
import {GitHubActivityFeed} from "./components/github-activity.jsx";
import {SpotlightEffect} from "./helper/spotlight.jsx";
import {CustomCursor} from "./helper/custom-cursor.jsx";
import {CommandPalette} from "./helper/command-palette.jsx";
import {Navbar} from "./components/navbar.jsx";
import {Resume} from "./components/resume.jsx";
import {Contact} from "./components/contact.jsx";
import {Footer, viewVariants} from "./components/footer.jsx";
import {Projects} from "./components/projects.jsx";

const App = () => {
    const [theme, setTheme] = useState('dark');
    const [currentView, setCurrentView] = useState('home');
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    // Improved scroll reset function
    const scrollToTop = () => {
        // Multiple methods to ensure cross-browser compatibility
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Handle Lenis smooth scrolling if available
        if (window.Lenis && window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        }

        // Force scroll reset with a small delay for mobile browsers
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 10);
    };

    useEffect(() => {
        scrollToTop(); // Initial scroll reset

        // Check if Lenis is available on the window object
        if (window.Lenis) {
            const lenis = new window.Lenis();
            window.lenis = lenis; // Store reference for later use

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }

        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme) {
            setTheme(storedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    // Enhanced scroll reset when view changes
    useEffect(() => {
        scrollToTop();

        // Additional reset with requestAnimationFrame for better timing
        requestAnimationFrame(() => {
            scrollToTop();
        });

        // Final fallback with longer delay for stubborn mobile browsers
        const timeoutId = setTimeout(() => {
            scrollToTop();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [currentView]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Enhanced view change handler with forced component refresh
    const handleViewChange = (newView) => {
        if (newView !== currentView) {
            // Immediate scroll reset
            scrollToTop();

            // Set new view
            setCurrentView(newView);

            // Force a re-render and scroll reset after state change
            setTimeout(() => {
                scrollToTop();

                // Trigger a window resize event to wake up any lazy components
                window.dispatchEvent(new Event('resize'));

                // Trigger scroll event to activate any scroll-based animations
                window.dispatchEvent(new Event('scroll'));
            }, 50);

            // Additional trigger after animation completes
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
                scrollToTop();
            }, 500);
        }
    };

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Enhanced view variants with better timing
    const enhancedViewVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.1,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans antialiased selection:bg-indigo-500/50">
            <SpotlightEffect theme={theme} />
            <div className="hidden md:block">
                <CustomCursor />
            </div>
            <CommandPalette
                isOpen={isCommandPaletteOpen}
                setIsOpen={setIsCommandPaletteOpen}
                setCurrentView={handleViewChange}
                toggleTheme={toggleTheme}
            />

            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[60]" style={{ scaleX }} />
            <Navbar
                theme={theme}
                toggleTheme={toggleTheme}
                currentView={currentView}
                setCurrentView={handleViewChange}
            />

            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentView}
                        variants={enhancedViewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onAnimationStart={() => {
                            // Ensure scroll is at top when animation starts
                            scrollToTop();
                        }}
                        onAnimationComplete={() => {
                            // Final scroll reset when animation completes
                            scrollToTop();

                            // Force component activation for mobile
                            if (currentView === 'journey') {
                                setTimeout(() => {
                                    window.dispatchEvent(new Event('resize'));
                                    window.dispatchEvent(new Event('scroll'));
                                }, 100);
                            }
                        }}
                    >
                        {currentView === 'home' && (
                            <>
                                <Hero />
                                <About />
                                {/*<Testimonials />*/}
                                <Skills />
                                <Projects />
                            </>
                        )}
                        {currentView === 'journey' && (
                            <div className="pt-24 min-h-screen">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <WorkHistory />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <Education />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <GitHubActivityFeed />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <Resume />
                                </motion.div>
                            </div>
                        )}
                        {currentView === 'contact' && (
                            <div className="pt-24">
                                <Contact />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default App;