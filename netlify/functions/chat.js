// netlify/functions/chat.js
export const handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { message } = JSON.parse(event.body);

        // Validate input
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Message is required' }),
            };
        }

        if (message.length > 1000) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Message too long' }),
            };
        }

        const prompt = `You are Zane Mehdi's friendly and professional AI Assistant for his portfolio website. Your name is 'Zane-AI'.
        Your personality is helpful, concise, and slightly creative.
        
        Here is comprehensive information about Zane:

        BASIC INFO:
        - Name: Zane Mehdi
        - Title: Software Engineer & Creative Developer
        - About: A passionate developer who loves crafting beautiful and intuitive user experiences. Bridges the gap between aesthetics and functionality. Goal is to build products that are visually appealing, performant, and accessible.

        CURRENT WORK EXPERIENCE:
        
        Software Engineer at Pulselive (Sep 2023 – Present):
        - Built and maintained frontend experiences using a custom CMS, integrating FreeMarker templating with React/JavaScript and SCSS for dynamic, branded pages
        - Developed full-stack solutions using Java (Spring & Maven), delivering scalable features across major sports platforms including the Premier League, Saudi Pro League, and the England & Wales Cricket Board
        - Worked on mobile apps and widgets, focusing on automation testing and UI development using Kotlin and Swift
        - Contributed to backend systems using Java and Spring, including upgrading core services to Java 21 and supporting ongoing Maven-based builds
        - Led the integration of AI tools with Figma designs to automatically generate functional requirements, streamlining delivery and reducing manual interpretation
        - Implemented Memcache and optimised SQL queries for improved data access, powering internal tools such as the company website and organisational chart application
        - Worked with AWS, Docker, and OpenAPI to modernise deployment workflows and improve team productivity
        - Actively contributed to Agile ceremonies and sprint planning using Jira, Bitbucket, and SonarCloud, ensuring code quality and traceability
        - Drove automated testing across the stack, incorporating tools like Maestro for mobile UI flows
        - Built strong knowledge across the full software development lifecycle, from feature scoping and development to production deployment and support

        PREVIOUS EXPERIENCE:
        - Technology Intern at Data Glacier (Jul 2022 – Oct 2022): Led data analysis projects using Python and Jupyter, built predictive analytics website with Flask and machine learning
        - Technology Intern at Bright Network (Jul 2021 – Aug 2021): Explored cloud computing with AWS and frontend development with React, contributed to tech consulting project using Java and TDD
        - Programming Instructor at Learning Leap Education (Mar 2017 – Mar 2020): Designed and delivered beginner web development curriculum to young learners

        EDUCATION:
        - King's College London: B.Sc. in Computer Science, First Class Honours (Sep 2020 – May 2023)
        - Focused on core computer science concepts including software engineering, HCI, and systems design
        - Graduated top of class with a strong foundation in full-stack development

        TECHNICAL SKILLS:
        Frontend: React, JavaScript, TailwindCSS, Framer Motion, React Native
        Backend: Node.js, Java, Spring Boot, Kotlin
        Tools & Technologies: Vite, Git, AWS, Docker, OpenAPI, Memcache, SQL
        Languages: JavaScript, Java, Python, Kotlin, Swift
        Testing: Automated testing, Maestro for mobile UI flows
        Development: Full-stack development, Mobile development, AI integration

        NOTABLE PROJECTS:
        1. Tour Bi - A journey planning app using bicycle hire schemes for tourists, built with Flutter
        2. Scroller Survival A-Level Project - A Python/PyGame scroller game that asks GCSE-style questions mid-game
        3. KCL Student Services Chatbot - Interactive chatbot using Python and ChatterBot library for student queries
        4. Premier League Higher or Lower - Football trivia game based on team statistics, built with JavaScript
        5. Traffic System - Web application visualising city traffic incidents on live maps using Python
        6. Pacman AI - AI agent using machine learning and reinforcement learning to play Pacman

        CONTACT INFO:
        - GitHub: https://github.com/Zane-Mehdi
        - LinkedIn: https://www.linkedin.com/in/zane-mehdi/
        - Email: zanemehdi6@gmail.com

        A user has asked the following question: "${message}"
        
        Based on the information above, provide a helpful, detailed answer. If the question is about setting up a meeting, asking for a resume, a direct job offer, or anything that requires sending an email, firmly but politely state that you cannot perform that action directly. Instead, suggest that they reach out to Zane on LinkedIn (https://www.linkedin.com/in/zane-mehdi/) or via email (zanemehdi6@gmail.com) for such requests. 
        
        Provide a friendly and complete response. Aim for a paragraph of about 3-5 sentences so the user gets a helpful answer. Use Zane's specific experience with Java, React, or his sports platform work at Pulselive to add detail. Do not use markdown formatting. Be direct and helpful. For meetings/emails/jobs, say to contact via LinkedIn or email. No markdown.`;

        // Call Gemini API

        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                maxOutputTokens: 1200,
                temperature: 0.7
            }
        };

        const model = process.env.GEMINI_MODEL || 'gemini-flash-latest';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

        const callGemini = async (body) => {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': process.env.GEMINI_API_KEY // Recommended header approach
                },
                body: JSON.stringify(body),
            });
            return res;
        };

        const response = await callGemini(payload);

        if (!response.ok) {
            if (response.status === 429) {
                return {
                    statusCode: 429,
                    headers,
                    body: JSON.stringify({
                        error: 'Service temporarily busy. Please try again in a moment.'
                    }),
                };
            }
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();

        const candidate = result.candidates?.[0];
        const parts = candidate?.content?.parts || [];
        const text = parts.map((part) => part?.text || '').join('');
        const finishReason = candidate?.finishReason;

        if (finishReason) {
            console.log('Gemini finishReason:', finishReason);
        }
        if (result.usageMetadata) {
            console.log('Gemini usageMetadata:', result.usageMetadata);
        }

        const looksTruncated = (value) => {
            if (!value) return false;
            return !/[.!?]$/.test(value.trim());
        };

        let finalText = text;

        if (finishReason === 'MAX_TOKENS' || looksTruncated(text)) {
            const continuationPayload = {
                contents: [
                    { role: "user", parts: [{ text: prompt }] },
                    { role: "model", parts: [{ text: text || '' }] },
                    { role: "user", parts: [{ text: "Continue from where you left off. Finish the last sentence and stop." }] }
                ],
                generationConfig: {
                    maxOutputTokens: 600,
                    temperature: 0.7
                }
            };

            const continuationResponse = await callGemini(continuationPayload);
            if (continuationResponse.ok) {
                const continuationResult = await continuationResponse.json();
                const continuationParts = continuationResult.candidates?.[0]?.content?.parts || [];
                const continuationText = continuationParts.map((part) => part?.text || '').join('');
                if (continuationText) {
                    finalText = `${text}${continuationText}`;
                }
            }
        }

        if (finalText) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    message: finalText
                }),
            };
        } else {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'Unable to generate response. Please try again.'
                }),
            };
        }

    } catch (error) {
        console.error('Chat API Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error. Please try again later.'
            }),
        };
    }
};
