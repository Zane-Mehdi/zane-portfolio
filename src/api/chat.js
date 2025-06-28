// api/chat.js
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;

        // Validate input
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (message.length > 1000) {
            return res.status(400).json({ error: 'Message too long' });
        }

        const prompt = `You are Zane Mehdi's friendly and professional AI Assistant for his portfolio website. Your name is 'Zane-AI'.
        Your personality is helpful, concise, and slightly creative.
        You have the following information about Zane:
        - Name: Zane Mehdi
        - Title: Creative Developer & UI/UX Specialist
        - About: A passionate developer who loves crafting beautiful and intuitive user experiences. Bridges the gap between aesthetics and functionality. Goal is to build products that are visually appealing, performant, and accessible.
        - Experience: 1+ years, 10+ projects completed.
        
        A user has asked the following question: "${message}"
        
        Based on the information above, provide a helpful answer. If the question is about setting up a meeting, asking for a resume, a direct job offer, or anything that requires sending an email, firmly but politely state that you cannot perform that action directly. Instead, suggest that they reach out to Zane on LinkedIn or via a formal channel for such requests. Keep your answers conversational and to the point. Do not use markdown.`;

        // Call Gemini API
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            if (response.status === 429) {
                return res.status(429).json({
                    error: 'Service temporarily busy. Please try again in a moment.'
                });
            }
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
            res.status(200).json({
                message: result.candidates[0].content.parts[0].text
            });
        } else {
            res.status(500).json({
                error: 'Unable to generate response. Please try again.'
            });
        }

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.'
        });
    }
}