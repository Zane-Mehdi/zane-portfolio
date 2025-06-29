export const workHistoryData = [
    {
        id: 1,
        company: "Pulselive",
        role: "Software Engineer",
        period: "Sep 2023 – Present",
        description: [
            "Built and maintained frontend experiences using a custom CMS, integrating FreeMarker templating with React/JavaScript and SCSS for dynamic, branded pages across major sports platforms including the Premier League, Saudi Pro League, and the England & Wales Cricket Board.",
            "Developed full-stack solutions using Java (Spring & Maven), JavaScript for an internal company orgchart",
            "Worked on mobile apps and widgets, focusing on automation testing and UI development using Kotlin and Swift.",
            "Contributed to backend systems using Java and Spring, including upgrading core services to Java 21 and supporting ongoing Maven-based builds.",
            "Led the integration of AI tools with Figma designs to automatically generate functional requirements, streamlining delivery and reducing manual interpretation.",
            "Worked with AWS, Docker, and OpenAPI to modernise deployment workflows and improve team productivity.",
            "Actively contributed to Agile ceremonies and sprint planning using Jira, Bitbucket, and SonarCloud, ensuring code quality and traceability.",
            "Drove automated testing across the stack, incorporating tools like Maestro for mobile UI flows.",
            "Built strong knowledge across the full software development lifecycle, from feature scoping and development to production deployment and support."
        ]
    },
    {
        id: 2,
        company: "Data Glacier",
        role: "Technology Intern",
        period: "Jul 2022 – Oct 2022",
        description: [
            "Led a data analysis project using Python and Jupyter to assess investment opportunities.",
            "Built a predictive analytics website with Flask and applied machine learning principles to deliver insights."
        ]
    },
    {
        id: 3,
        company: "Bright Network",
        role: "Technology Intern",
        period: "Jul 2021 – Aug 2021",
        description: [
            "Explored cloud computing with AWS and frontend development with React.",
            "Contributed to a tech consulting project using Java and TDD, and presented proposals to meet key business objectives."
        ]
    },
    {
        id: 4,
        company: "Learning Leap Education",
        role: "Programming Instructor",
        period: "Mar 2017 – Mar 2020",
        description: [
            "Designed and delivered a beginner web development curriculum to young learners.",
            "Inspired interest in programming and computer science fundamentals."
        ]
    }
];



export const educationData = [
    {
        id: 1,
        institution: "King's College London",
        degree: "B.Sc. in Computer Science, First Class Honours",
        period: "Sep 2020 – May 2023",
        description: "Focused on core computer science concepts including software engineering, HCI, and systems design. Graduated top of class with a strong foundation in full-stack development."
    }
];


export const skillsData = [
    { name: 'React', icon: 'https://cdn.worldvectorlogo.com/logos/react-2.svg', category: 'Frontend' },
    { name: 'JavaScript', icon: 'https://cdn.worldvectorlogo.com/logos/javascript-1.svg', category: 'Language' },
    { name: 'Node.js', icon: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg', category: 'Backend' },
    { name: 'Java', icon: 'https://cdn.worldvectorlogo.com/logos/java-4.svg', category: 'Backend' },
    { name: 'Spring Boot', icon: 'https://cdn.worldvectorlogo.com/logos/spring-3.svg', category: 'Backend' },
    { name: 'Kotlin', icon: 'https://cdn.worldvectorlogo.com/logos/kotlin.svg', category: 'Backend' },
    { name: 'React Native', icon: 'https://cdn.worldvectorlogo.com/logos/react-native-1.svg', category: 'Backend' },
    { name: 'TailwindCSS', icon: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg', category: 'CSS' },
    { name: 'Framer Motion', icon: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg', category: 'Animation' },
    { name: 'Vite', icon: 'https://cdn.worldvectorlogo.com/logos/vitejs.svg', category: 'Build Tool' },
    { name: 'Git', icon: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg', category: 'Tool' },
];

export const testimonialsData = [
    { id: 1, name: "Jane Doe", company: "CEO, Creative Tech Inc.", quote: "Zane's ability to transform complex ideas into beautiful, functional web experiences is second to none. He is a true asset to any team.", avatar: "https://placehold.co/100x100/A5B4FC/312E81?text=JD" },
    { id: 2, name: "John Smith", company: "Lead Designer, Innovate Solutions", quote: "Working with Zane is a designer's dream. His keen eye for detail and commitment to the user experience ensures every pixel is perfect.", avatar: "https://placehold.co/100x100/818CF8/FFFFFF?text=JS" },
    { id: 3, name: "Emily White", company: "Project Manager, Digital Dreams", quote: "Zane consistently delivers high-quality work on time. He's a reliable, communicative, and incredibly talented developer.", avatar: "https://placehold.co/100x100/6366F1/FFFFFF?text=EW" }
];

export const socialLinksData = [
    { name: 'GitHub', icon: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg', href: 'https://github.com/Zane-Mehdi' },
    { name: 'LinkedIn', icon: 'https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg', href: 'https://www.linkedin.com/in/zane-mehdi/' },
    { name: 'Email', icon: 'https://cdn.worldvectorlogo.com/logos/mail-ios.svg', href: 'mailto:zanemehdi6@gmail.com' },
];

export const projectData = [
    {
        id: 6,
        title: 'Tour Bi',
        category: 'Mobile Development',
        image: './tourbi.png',
        size: 'small',
        details: "A journey planning app that uses a bicycle hire scheme for tourists. Built with Flutter, it helps users find bike stations, plan routes, and see real-time availability.",
        tags: ['Flutter'],
        githubUrl: 'https://github.com/zane-mehdi/tour-bi-app', // Example URL
        videoUrl: 'https://www.youtube.com/watch?v=t1VqzWKwHyQ&feature=youtu.be' // Example URL
    },
    {
        id: 1,
        title: 'Scroller Survival A-Level Project',
        category: 'Game Development',
        image: './scroller.png',
        size: 'small',
        details: "A scroller game that asks GCSE-style questions mid-game, combining gameplay with learning. Built using Python and PyGame as part of an A-Level project.",
        tags: ['Python', 'PyGame'],
        githubUrl: 'https://github.com/zane-mehdi/scroller-survival', // Example URL
    },
    {
        id: 2,
        title: 'KCL Student Services Chatbot',
        category: 'AI/Chatbot',
        image: './chatbot.png',
        size: 'small',
        details: "An interactive chatbot built using Python and the ChatterBot library to help King's College London students get answers to common service-related queries. Frontend uses HTML and CSS.",
        tags: ['Python'],
        githubUrl: 'https://github.com/zane-mehdi/kcl-chatbot', // Example URL
    },
    {
        id: 3,
        title: 'Premier League Higher or Lower',
        category: 'Game Development',
        image: './higherorlower.png',
        size: 'small',
        details: "A football trivia game based on team statistics from the Premier League. Players guess whether one team ranks higher or lower than another. Built with Javascript, HTML, and CSS.",
        tags: ['Javascript', 'HTML', 'CSS'],
        githubUrl: 'https://github.com/zane-mehdi/pl-higher-lower', // Example URL
    },
    {
        id: 4,
        title: 'Traffic System',
        category: 'Web Development',
        image: './traffic.png',
        size: 'small',
        details: "A web application that visualises city traffic incidents on a live map. Markers display real-time reports using map APIs. Built with Python, HTML, and CSS.",
        tags: ['Python', 'HTML', 'CSS'],
        githubUrl: 'https://github.com/zane-mehdi/traffic-system', // Example URL
    },
    {
        id: 5,
        title: 'Pacman AI',
        category: 'AI/ML',
        image: './pacman.png',
        size: 'small',
        details: "Created an AI agent using machine learning techniques to play Pacman and aim for high scores. This project demonstrated reinforcement learning concepts using Python.",
        tags: ['Python'],
        githubUrl: 'https://github.com/zane-mehdi/pacman-ai', // Example URL
    }
];
