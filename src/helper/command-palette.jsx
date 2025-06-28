import {useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";

export const CommandPalette = ({ isOpen, setIsOpen, setCurrentView, toggleTheme }) => {
    const commands = [
        { name: "Navigate: Home", action: () => setCurrentView('home'), icon: '🏠' },
        { name: "Navigate: Journey", action: () => setCurrentView('journey'), icon: '🚀' },
        { name: "Navigate: Contact", action: () => setCurrentView('contact'), icon: '✉️' },
        { name: "Action: Toggle Theme", action: toggleTheme, icon: '🎨' },
        { name: "Action: Download CV", action: () => document.getElementById('download-cv-link')?.click(), icon: '📄' },
    ];

    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24" onClick={() => setIsOpen(false)}>
                    <motion.div
                        className="relative w-full max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <div className="p-2">
                            <input type="text" placeholder="Type a command or search..." className="w-full p-2 bg-transparent outline-none text-gray-900 dark:text-white" />
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                            {commands.map(cmd => (
                                <button key={cmd.name} onClick={() => { cmd.action(); setIsOpen(false); }} className="w-full text-left flex items-center p-3 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                                    <span className="mr-4">{cmd.icon}</span>
                                    <span>{cmd.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="text-xs text-gray-400 p-3 bg-gray-50 dark:bg-black/50 text-center">
                            Pro Tip: Use <kbd className="font-sans p-1 bg-gray-200 dark:bg-gray-700 rounded">⌘</kbd> + <kbd className="font-sans p-1 bg-gray-200 dark:bg-gray-700 rounded">K</kbd> to toggle this menu.
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};