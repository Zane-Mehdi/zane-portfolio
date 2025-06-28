import { motion } from 'framer-motion';

export const Navbar = ({ theme, toggleTheme, currentView, setCurrentView }) => {
    const Sun = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>);
    const Moon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);

    const navLinks = [
        { name: 'Home', view: 'home' },
        { name: 'Journey', view: 'journey' },
        { name: 'Contact', view: 'contact', isAI: true }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-gray-950/30 backdrop-blur-lg"
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <button onClick={() => setCurrentView('home')} className="text-2xl font-bold text-gray-900 dark:text-white font-display">Zane Mehdi</button>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <button
                            key={link.name}
                            onClick={() => setCurrentView(link.view)}
                            className={`relative flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors ${currentView === link.view ? 'text-indigo-500 dark:text-indigo-400' : ''}`}
                        >
                            {link.name}
                            {link.isAI && (
                                <motion.span
                                    className="ml-2 w-2 h-2 rounded-full bg-indigo-500"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            )}
                            {currentView === link.view && (
                                <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500" layoutId="underline" />
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex items-center">
                    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                        {theme === 'dark' ? <Sun /> : <Moon />}
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};