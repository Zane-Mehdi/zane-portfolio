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
import {Footer, viewVariants} from "./components/footer.jsx";
import {Projects} from "./components/projects.jsx";

const App = () => {
    const [theme, setTheme] = useState('dark');
    const [currentView, setCurrentView] = useState('home');
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

    useEffect(() => {
        // Check if Lenis is available on the window object
        if (window.Lenis) {
            const lenis = new window.Lenis();
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

    useEffect(() => {
        window.scrollTo(0, 0);
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

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sans antialiased selection:bg-indigo-500/50">
            <SpotlightEffect theme={theme} />
            <div className="hidden md:block">
                <CustomCursor />
            </div>
            <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} setCurrentView={setCurrentView} toggleTheme={toggleTheme} />

            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[60]" style={{ scaleX }} />
            <Navbar theme={theme} toggleTheme={toggleTheme} currentView={currentView} setCurrentView={setCurrentView} />

            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentView}
                        variants={viewVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {currentView === 'home' && (
                            <>
                                <Hero />
                                <About />
                                <Testimonials />
                                <Skills />
                                <Projects />
                            </>
                        )}
                        {currentView === 'journey' && (
                            <div className="pt-24">
                                <WorkHistory />
                                <Education />
                                <GitHubActivityFeed />
                                <Resume />
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