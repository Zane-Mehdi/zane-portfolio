import {useEffect, useState} from "react";
import { motion } from 'framer-motion';

export const GitHubActivityFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const GITHUB_USERNAME = 'Zane-Mehdi'; // <-- IMPORTANT: REPLACE WITH YOUR GITHUB USERNAME

    useEffect(() => {
        const fetchGitHubEvents = async () => {
            try {
                // In a real app, use a cached response or a backend to avoid rate-limiting.
                // For this portfolio, we fetch directly.
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
                if (!response.ok) {
                    throw new Error(`GitHub API responded with ${response.status}`);
                }
                const data = await response.json();

                const filteredEvents = data.filter(event =>
                    event.type === 'PushEvent' ||
                    (event.type === 'CreateEvent' && event.payload.ref_type === 'repository') ||
                    (event.type === 'IssuesEvent' && event.payload.action === 'opened')
                ).slice(0, 5);
                setEvents(filteredEvents);
            } catch (error) {
                console.error("Failed to fetch GitHub events:", error);
                setEvents([]); // Set to empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubEvents();
    }, []);

    const EventIcon = ({type}) => {
        const icons = {
            PushEvent: 'M12 6v6m0 0v6m0-6h6m-6 0H6', // Simplified plus for commit
            CreateEvent: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z', // Circle for repo creation
            IssuesEvent: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z', // Chat bubble for issue
        };
        return <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icons[type] || ''}></path></svg>;
    };

    const formatEvent = (event) => {
        const repoName = event.repo.name;
        const repoUrl = `https://github.com/${repoName}`;

        switch (event.type) {
            case 'PushEvent':
                return <>Pushed {event.payload.size} commit{event.payload.size > 1 ? 's' : ''} to <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">{repoName}</a></>;
            case 'CreateEvent':
                return <>Created new repository <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">{repoName}</a></>;
            case 'IssuesEvent':
                return <>Opened an issue in <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">{repoName}</a></>;
            default:
                return null;
        }
    };

    return (
        <section id="github-activity" className="py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white font-display">Live GitHub Activity</h2>
                <div className="max-w-2xl mx-auto">
                    {loading ? (
                        <p className="text-center text-gray-500">Fetching latest commits...</p>
                    ) : events.length > 0 ? (
                        <div className="space-y-6">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    className="flex items-start space-x-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.8 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="mt-1"><EventIcon type={event.type} /></div>
                                    <div className="text-gray-700 dark:text-gray-300">
                                        {formatEvent(event)}
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date(event.created_at).toLocaleDateString()}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Could not load GitHub activity. Please check the username or API availability.</p>
                    )}
                </div>
            </div>
        </section>
    );
};