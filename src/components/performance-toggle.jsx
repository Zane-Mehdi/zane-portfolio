// components/PerformanceToggle.jsx
import {useState} from "react";
import {usePerformance} from "../useHooks/usePerformance.jsx";

export const PerformanceToggle = () => {
    const { performanceMode, setPerformanceMode, fps, performanceStats } = usePerformance();
    const [showStats, setShowStats] = useState(false);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <button
                onClick={() => {
                    const modes = ['auto', 'high', 'low'];
                    const currentIndex = modes.indexOf(performanceMode);
                    const nextMode = modes[(currentIndex + 1) % modes.length];
                    setPerformanceMode(nextMode);
                }}
                className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg"
                title={`Performance: ${performanceMode} (${fps} FPS)`}
            >
                {performanceMode === 'low' ? '🔋' : performanceMode === 'high' ? '⚡' : '🔧'}
            </button>

            {/* Optional: Show performance stats */}
            <button
                onClick={() => setShowStats(!showStats)}
                className="ml-2 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg"
            >
                📊
            </button>

            {showStats && (
                <div className="absolute bottom-16 left-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl">
                    <p>FPS: {fps}</p>
                    <p>Cores: {performanceStats.cores}</p>
                    <p>Memory: {performanceStats.memory}GB</p>
                    <p>Connection: {performanceStats.connection}</p>
                    <p>GPU: {performanceStats.hasGoodGPU ? '✅' : '❌'}</p>
                </div>
            )}
        </div>
    );
};