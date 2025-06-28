import {useEffect, useRef, useState} from "react";

export const CustomCursor = () => {
    const followerRef = useRef(null);
    const [isHoveringLink, setIsHoveringLink] = useState(false);

    useEffect(() => {
        const follower = followerRef.current;
        if (!follower) return;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            follower.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        };

        const onMouseEnterLink = () => setIsHoveringLink(true);
        const onMouseLeaveLink = () => setIsHoveringLink(false);

        window.addEventListener('mousemove', onMouseMove);

        const timer = setTimeout(() => {
            const hoverableElements = document.querySelectorAll('a, button, [data-hoverable]');
            hoverableElements.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnterLink);
                el.addEventListener('mouseleave', onMouseLeaveLink);
            });
        }, 500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', onMouseMove);
            const hoverableElements = document.querySelectorAll('a, button, [data-hoverable]');
            hoverableElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    return (
        <div
            ref={followerRef}
            className={`fixed w-8 h-8 bg-white rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out mix-blend-difference 
                   ${isHoveringLink ? 'scale-150' : 'scale-50'}`}
        ></div>
    );
};