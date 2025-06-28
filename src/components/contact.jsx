import {useEffect, useRef, useState} from "react";

export const Contact = () => {
    const [messages, setMessages] = useState([
        { from: 'ai', text: "Hello! I'm Zane's AI Assistant. Ask me anything about his work, skills, or projects. How can I help you today?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const chatContainerRef = useRef(null);

    // API URL - use relative path for Netlify functions
    const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserMessage = { from: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        const currentMessage = userInput;
        setUserInput('');
        setIsLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeoutDuration = 30000; // 30 seconds
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

        try {
            // Use Netlify function in production, local server in development
            const apiEndpoint = import.meta.env.PROD
                ? '/.netlify/functions/chat'
                : `${API_BASE_URL}/api/chat`;

            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: currentMessage,
                    chatHistory: messages.slice(-5) // Send last 5 messages for context
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                if (response.status === 429) {
                    setMessages(prev => [...prev, {
                        from: 'ai',
                        text: "I'm receiving a lot of questions right now! Please wait a moment before asking another question, or feel free to reach out to Zane directly on LinkedIn."
                    }]);
                } else if (response.status >= 500) {
                    setMessages(prev => [...prev, {
                        from: 'ai',
                        text: "I'm experiencing some technical difficulties. Please try again in a moment, or reach out to Zane directly on LinkedIn."
                    }]);
                } else {
                    setMessages(prev => [...prev, {
                        from: 'ai',
                        text: errorData.error || "Sorry, I couldn't process that request. Please try again or contact Zane directly."
                    }]);
                }
                return;
            }

            const result = await response.json();

            if (result.message) {
                setMessages(prev => [...prev, { from: 'ai', text: result.message }]);
            } else {
                setMessages(prev => [...prev, {
                    from: 'ai',
                    text: "I'm having trouble formulating a response. Please try asking in a different way."
                }]);
            }

        } catch (error) {
            console.error("Chat error:", error);

            if (error.name === 'AbortError') {
                setMessages(prev => [...prev, {
                    from: 'ai',
                    text: "The request took too long. Please check your connection and try again."
                }]);
            } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                setMessages(prev => [...prev, {
                    from: 'ai',
                    text: "Unable to connect to the chat service. Please check your internet connection or try again later."
                }]);
            } else {
                setMessages(prev => [...prev, {
                    from: 'ai',
                    text: "Sorry, I'm unable to respond right now. Please feel free to reach out to Zane on LinkedIn or via email."
                }]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white font-display">Let's Connect</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                    Chat with my AI assistant or send me a message directly.
                </p>

                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col h-[60vh]">
                    <div ref={chatContainerRef} className="flex-grow p-6 space-y-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.from === 'ai' ? 'bg-gray-200 dark:bg-gray-700 text-left' : 'bg-indigo-500 text-white text-left'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask me anything..."
                            maxLength={1000}
                            className="flex-grow p-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !userInput.trim()}
                            className="p-3 bg-indigo-600 text-white rounded-lg disabled:bg-indigo-400 hover:bg-indigo-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};