/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * Edit this file to change the content of your portfolio.
 * - Add/Remove items from arrays to update sections.
 * - Edit strings to change text.
 */

/* ==============================================
   ABOUT SECTION
   ============================================== */
export const about = {
    headline: "Engineering <span class='text-sky-400'>Scalable Systems</span> <br/> with <span class='text-purple-400'>strong problem solving foundations</span>.",
    description: [
        "I’m a Pre-final year Computer Science undergraduate at Delhi Technological University (DTU), focused on building high-performance, real-world systems that combine robust engineering with intelligent algorithms.",
    ],
    stats: [
        { value: "1K+", label: "DSA Problems Solved" },
        { value: "5+", label: "Projects" }
    ],
    coreFocus: [
        { label: "Full-Stack Web Development", color: "sky-400" },
        { label: "AI & Machine Learning", color: "purple-400" },
        { label: "Data Structures & Algorithms", color: "emerald-400" }
    ],
    resume: "/Resume.pdf",
};

/* ==============================================
   EXPERIENCE SECTION
   ============================================== */
export const experience = [
    {
        role: "Software Engineer Intern",
        company: "National Informatics Centre (NIC) - New Delhi",
        period: "Dec 2025 - Jan 2026",
        description: "At the National Informatics Centre, I built an AI-powered Consent & Compliance Engine that translates complex privacy laws into real-time, auditable decisions through full-stack systems and retrieval-augmented language models.",
        tags: ["React", "ChromaDB", "RAG"],
        color: "sky-400"
    }
];

/* ==============================================
   SKILLS SECTION
   ============================================== */
export const skills = [
    {
        imgSrc: '/images/cpp.svg',
        label: 'C++',
        desc: 'Programming'
    },
    {
        imgSrc: '/images/python.svg',
        label: 'Python',
        desc: 'Scripting'
    },
    {
        imgSrc: '/images/HTML.svg',
        label: 'HTML',
        desc: 'Markup Language'
    },
    {
        imgSrc: '/images/css3.svg',
        label: 'CSS',
        desc: 'User Interface'
    },
    {
        imgSrc: '/images/tailwindcss.svg',
        label: 'TailwindCSS',
        desc: 'User Interface'
    },
    {
        imgSrc: '/images/javascript.svg',
        label: 'JavaScript',
        desc: 'Interaction'
    },
    {
        imgSrc: '/images/react.svg',
        label: 'React',
        desc: 'Framework'
    },
    {
        imgSrc: '/images/nodejs.svg',
        label: 'NodeJS',
        desc: 'Web Server'
    },
    {
        imgSrc: '/images/expressjs.svg',
        label: 'ExpressJS',
        desc: 'Node Framework'
    },
    {
        imgSrc: '/images/mysql.svg',
        label: 'MySQL',
        desc: 'Relational Database'
    },
    {
        imgSrc: '/images/numpy.svg',
        label: 'NumPy',
        desc: 'Mathematics'
    },
    {
        imgSrc: '/images/pandas.svg',
        label: 'Pandas',
        desc: 'Data Analysis'
    },
    {
        imgSrc: '/images/seaborn.svg',
        label: 'Seaborn',
        desc: 'Data Visualization'
    },
    {
        imgSrc: '/images/Streamlit.svg',
        label: 'Streamlit',
        desc: 'Interactive Data Apps'
    },
    {
        imgSrc: '/images/git.svg',
        label: 'Git',
        desc: 'Version Control'
    },
    {
        imgSrc: '/images/firebase.svg',
        label: 'Firebase',
        desc: 'Backend'
    },
    {
        imgSrc: '/images/ChromaDB.svg',
        label: 'ChromaDB',
        desc: 'Vector Database'
    },
    {
        imgSrc: '/images/VS Code.svg',
        label: 'VS Code',
        desc: 'Editor'
    },
    {
        imgSrc: '/images/jupyter.svg',
        label: 'Jupyter',
        desc: 'Data Analysis'
    },
    {
        imgSrc: '/images/docker.svg',
        label: 'Docker',
        desc: 'Containerization'
    },
];

/* ==============================================
   PROJECTS SECTION
   ============================================== */
export const works = [
    {
        imgSrc: '/images/sda.png',
        title: 'MediBridge',
        tags: ['React.js', 'FastAPI', 'PostgreSQL', 'Docker'],
        projectLink: 'https://github.com/satyam4565/AI-Powered-Healthcare-Assistant'
    },
    {
        imgSrc: '/images/ems.png',
        title: 'Emplytic',
        tags: ['React.js', 'TailwindCSS', 'JavaScript', 'HTML/CSS'],
        projectLink: 'https://github.com/satyam4565/Employee-Management-System'
    },
    {
        imgSrc: '/images/cinesuggest.png',
        title: 'CineSuggest',
        tags: ['Python', 'Streamlit', 'TMDB API'],
        projectLink: 'https://github.com/satyam4565/CineSuggest'
    },
    {
        imgSrc: '/images/chromextp.png',
        title: 'HabitHub',
        tags: ['Chrome Extension API', 'HTML/CSS', 'JavaScript'],
        projectLink: 'https://github.com/satyam4565/HabitHub'
    },
    {
        imgSrc: '/images/heartg.png',
        title: 'HeartGuardian.AI',
        tags: ['Python', 'Streamlit'],
        projectLink: 'https://github.com/satyam4565/Heart_Stroke_Prediction'
    },
    {
        imgSrc: '/images/algoguru.png',
        title: 'AlgoGuru - DSA Chatbot',
        tags: ['React.js', 'TypeScript', 'Google Gemini API'],
        projectLink: 'https://github.com/satyam4565/AlgoGuru---DSA-Chatbot'
    }
];

/* ==============================================
   CODING JOURNEY SECTION
   ============================================== */
// Generate 365 days of mock heatmap data (0-4 contributions)
const generateHeatmapData = () => {
    const data = [];
    for (let i = 0; i < 365; i++) {
        // Randomly generate activity with some bias towards 0 or 1
        const r = Math.random();
        let activity = 0;
        if (r > 0.4 && r <= 0.7) activity = 1;
        else if (r > 0.7 && r <= 0.85) activity = 2;
        else if (r > 0.85 && r <= 0.95) activity = 3;
        else if (r > 0.95) activity = 4;

        data.push({
            date: new Date(new Date().setDate(new Date().getDate() - (365 - i))).toISOString().split('T')[0],
            count: activity
        });
    }
    return data;
};

export const codingJourney = {
    username: "satyium",
    platform: "LeetCode",
    profileUrl: "https://leetcode.com/u/satyium/",
    subtitle: "Knight badge holder — top 3.5% globally, 800+ problems solved.",
    stats: [
        { label: "Total Solved", value: "865" },
        { label: "Active Days", value: "342" },
        { label: "Contest Badge", value: "Knight", iconColor: "emerald-400" },
        { label: "Contest Rating", value: "1872" }
    ],
    problemBreakdown: [
        { name: "Easy", value: 222, fill: "#10b981" },    // emerald-500
        { name: "Medium", value: 498, fill: "#f59e0b" },  // amber-500
        { name: "Hard", value: 145, fill: "#f43f5e" }     // rose-500
    ],
    heatmapData: generateHeatmapData(),
    ratingProgress: [
        { date: "Jan", rating: 1450 },
        { date: "Feb", rating: 1520 },
        { date: "Mar", rating: 1505 },
        { date: "Apr", rating: 1580 },
        { date: "May", rating: 1610 },
        { date: "Jun", rating: 1595 },
        { date: "Jul", rating: 1650 },
        { date: "Aug", rating: 1680 },
        { date: "Sep", rating: 1720 },
        { date: "Oct", rating: 1765 },
        { date: "Nov", rating: 1810 },
        { date: "Dec", rating: 1872 }
    ]
};
