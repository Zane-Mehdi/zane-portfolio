// hooks/usePerformance.js
import { useState, useEffect, createContext, useContext } from 'react';

// Performance detection utility
const detectPerformance = () => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|ios|iphone|ipad|tablet/i.test(ua);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check for low-end device indicators
    const isLowEndDevice = () => {
        // Check CPU cores (if available)
        const cores = navigator.hardwareConcurrency || 1;
        if (cores <= 2) return true;

        // Check device memory (if available)
        if (navigator.deviceMemory && navigator.deviceMemory <= 2) return true;

        // Check connection type
        if (navigator.connection) {
            const connection = navigator.connection;
            if (connection.saveData) return true;
            if (connection.effectiveType && ['slow-2g', '2g'].includes(connection.effectiveType)) return true;
        }

        return false;
    };

    // Check hardware acceleration (simplified check)
    const hasGoodGPU = (() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return false;

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (!debugInfo) return !isMobile; // Assume desktop has GPU unless proven otherwise

            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();

            // Check for software renderers or integrated graphics
            const badGPUs = ['swiftshader', 'software', 'mesa', 'intel hd', 'intel uhd', 'mali-', 'adreno 3'];
            return !badGPUs.some(gpu => renderer.includes(gpu));
        } catch (e) {
            return !isMobile;
        }
    })();

    // Simple FPS test
    const testFPS = () => {
        return new Promise(resolve => {
            let fps = 60; // Default to 60
            let frameCount = 0;
            let lastTime = performance.now();
            const testDuration = 1000; // Test for 1 second

            const checkFPS = (currentTime) => {
                frameCount++;

                if (currentTime >= lastTime + testDuration) {
                    fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                    resolve(fps);
                } else {
                    requestAnimationFrame(checkFPS);
                }
            };

            requestAnimationFrame(checkFPS);
        });
    };

    return {
        isMobile,
        prefersReducedMotion,
        hasGoodGPU,
        isLowEndDevice: isLowEndDevice(),
        isLowEnd: isMobile || prefersReducedMotion || !hasGoodGPU || isLowEndDevice(),
        testFPS,
        // Additional useful info
        cores: navigator.hardwareConcurrency || 1,
        memory: navigator.deviceMemory || 'unknown',
        connection: navigator.connection?.effectiveType || 'unknown'
    };
};

// Create Performance Context
const PerformanceContext = createContext({
    isLowEnd: false,
    isMobile: false,
    performanceMode: 'auto',
    fps: 60,
    setPerformanceMode: () => {},
    performanceStats: {}
});

// Performance Provider Component
export const PerformanceProvider = ({ children }) => {
    const [performanceMode, setPerformanceMode] = useState('auto');
    const [performanceStats, setPerformanceStats] = useState({});
    const [fps, setFps] = useState(60);
    const [isLowEnd, setIsLowEnd] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Load saved performance mode
        const savedMode = localStorage.getItem('performanceMode');
        if (savedMode) {
            setPerformanceMode(savedMode);
        }

        // Detect performance
        const perf = detectPerformance();
        setPerformanceStats(perf);
        setIsMobile(perf.isMobile);

        // Set initial low-end status
        if (performanceMode === 'low') {
            setIsLowEnd(true);
        } else if (performanceMode === 'high') {
            setIsLowEnd(false);
        } else {
            // Auto mode
            setIsLowEnd(perf.isLowEnd);
        }

        // Test actual FPS after a short delay
        setTimeout(() => {
            perf.testFPS().then(detectedFps => {
                setFps(detectedFps);
                if (performanceMode === 'auto' && detectedFps < 30) {
                    setIsLowEnd(true);
                }
            });
        }, 100);
    }, [performanceMode]);

    useEffect(() => {
        document.documentElement.classList.toggle('reduce-motion', performanceMode === 'low');
    }, [performanceMode]);

    const updatePerformanceMode = (mode) => {
        setPerformanceMode(mode);
        localStorage.setItem('performanceMode', mode);

        // Update isLowEnd based on mode
        if (mode === 'low') {
            setIsLowEnd(true);
        } else if (mode === 'high') {
            setIsLowEnd(false);
        } else {
            // Re-detect for auto mode
            const perf = detectPerformance();
            setIsLowEnd(perf.isLowEnd);
        }
    };

    return (
        <PerformanceContext.Provider
            value={{
                isLowEnd,
                isMobile,
                performanceMode,
                fps,
                setPerformanceMode: updatePerformanceMode,
                performanceStats
            }}
        >
            {children}
        </PerformanceContext.Provider>
    );
};

// Hook to use performance context
export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (!context) {
        throw new Error('usePerformance must be used within a PerformanceProvider');
    }
    return context;
};

// Additional hook for component-level performance optimizations
export const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (event) => {
            setPrefersReducedMotion(event.matches);
        };

        // Check if addEventListener is supported
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return prefersReducedMotion;
};

// Performance-aware animation variants generator
export const getAnimationVariants = (isLowEnd, baseVariants) => {
    if (isLowEnd) {
        // Return simplified variants for low-end devices
        return {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { duration: 0.2 }
            }
        };
    }
    return baseVariants;
};

// Utility to conditionally apply animations
export const conditionalAnimation = (isLowEnd, animation, fallback = {}) => {
    return isLowEnd ? fallback : animation;
};
