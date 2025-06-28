import {useEffect, useState} from "react";

export const SpotlightEffect = ({theme}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const spotlightColor = theme === 'dark'
        ? 'rgba(165, 180, 252, 0.06)' // A faint indigo for dark mode
        : 'rgba(49, 46, 129, 0.1)'; // A subtle navy for light mode

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition duration-300"
            style={{
                background: `radial-gradient(600px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
            }}
        ></div>
    );
};