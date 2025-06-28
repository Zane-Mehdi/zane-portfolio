import {useEffect, useRef, useState} from "react";
// Import all necessary data, including projectData which was missing
import {educationData, skillsData, workHistoryData, projectData} from "../data/data.jsx";

export const Contact = () => {
    const [messages, setMessages] = useState([
        { from: 'ai', text: "Hello! I'm Zane's AI Assistant. Ask me anything about his work, skills, or projects. How can I help you today?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // --- SECURITY WARNING ---
    // The API key is exposed on the client-side. This is a significant security risk.
    // It is strongly recommended to move this API call to a backend service (e.g., a serverless function)
    // to protect your key from misuse. For the purpose of this example, it remains, but this
    // should be addressed in a production environment.
    const apiKey = ""; // Replace with your actual API key, but be aware of the security risk.

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
        setUserInput('');
        setIsLoading(true);

        const controller = new AbortController();
        const timeoutDuration = 15000; // 15 seconds

        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

        const prompt = `You are Zane Mehdi's friendly and professional AI Assistant for his portfolio website. Your name is 'Zane-AI'.
        Your personality is helpful, concise, and slightly creative.
        You have the following information about Zane:
        - Name: Zane Mehdi
        - Title: Creative Developer & UI/UX Specialist
        - About: A passionate developer who loves crafting beautiful and intuitive user experiences. Bridges the gap between aesthetics and functionality. Goal is to build products that are visually appealing, performant, and accessible.
        - Experience: 1+ years, 10+ projects completed.
        - Skills: ${skillsData.map(s => s.name).join(', ')}.
        - Projects: ${projectData.map(p => `${p.title} (${p.category})`).join(', ')}.
        - Work History: ${workHistoryData.map(w => `${w.role} at ${w.company}`).join('. ')}.
        - Education: ${educationData.map(e => `${e.degree} from ${e.institution}`).join('. ')}.
        
        A user has asked the following question: "${userInput}"
        
        Based on the information above, provide a helpful answer. If the question is about setting up a meeting, asking for a resume, a direct job offer, or anything that requires sending an email, firmly but politely state that you cannot perform that action directly. Instead, suggest that they reach out to Zane on LinkedIn or via a formal channel for such requests. Keep your answers conversational and to the point. Do not use markdown.`;

        try {
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // Check for specific error codes like rate limiting
                if (response.status === 429) {
                    setMessages(prev => [...prev, { from: 'ai', text: "It seems my circuits are a bit busy at the moment! To ensure a prompt response, please consider reaching out to Zane directly on LinkedIn or via email for now." }]);
                } else {
                    // Handle other HTTP errors
                    throw new Error(`API request failed with status ${response.status}`);
                }
            } else {
                const result = await response.json();
                if (result.candidates && result.candidates[0].content.parts[0].text) {
                    const aiResponse = { from: 'ai', text: result.candidates[0].content.parts[0].text };
                    setMessages(prev => [...prev, aiResponse]);
                } else {
                    setMessages(prev => [...prev, { from: 'ai', text: "I'm having a little trouble formulating a response. Please try asking in a different way." }]);
                }
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                setMessages(prev => [...prev, { from: 'ai', text: "The request timed out. Please check your connection and try again." }]);
            } else {
                console.error("Error with AI Assistant:", error);
                setMessages(prev => [...prev, { from: 'ai', text: "Sorry, I'm unable to connect right now. Please feel free to reach out to Zane on LinkedIn or via email." }]);
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
                            className="flex-grow p-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                        <button type="submit" disabled={isLoading} className="p-3 bg-indigo-600 text-white rounded-lg disabled:bg-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};