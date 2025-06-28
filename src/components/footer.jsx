export const Footer = () => {
    return (
        <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Zane Mehdi. All rights reserved.</p>
        </footer>
    );
};

export const viewVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
};