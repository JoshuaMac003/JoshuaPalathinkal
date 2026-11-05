/**
 * LEYA — Joshua Chacko George's Portfolio Assistant
 *
 * Architecture:
 *  - Structured portfolio knowledge base (no invented data)
 *  - Deterministic intent recognition via keyword/regex patterns
 *  - Navigation actions using real page section IDs
 *  - Browser Web Speech API for optional voice input
 *  - window.speechSynthesis for optional voice output
 *  - Chat-only: no file upload, no external API, no AI model
 */

(function () {
    'use strict';

    /* ============================================================
       PORTFOLIO KNOWLEDGE BASE
       All content sourced from verified portfolio information.
       Nothing invented.
       ============================================================ */
    const KB = {
        intro: `Joshua Chacko George is an IoT Specialist with Honours in Cybersecurity & Ethical Hacking, working in Cybersecurity & AI/ML, Full-Stack Engineering, and DevOps & Cloud Technologies. He is a B.Tech Computer Science student at Christ (Deemed to be University), Bengaluru, pursuing his Honours in Cybersecurity. He is passionate about creating innovative solutions and driving digital transformation through technology.`,

        about: `Joshua Chacko George is a dedicated IoT Specialist, Cybersecurity & Ethical Hacking practitioner, and Full-Stack Engineer. He has experience developing scalable applications and driving digital transformation. He specialises in creating efficient, user-centric solutions that solve real-world problems. His journey in technology is driven by curiosity and a desire to make a meaningful impact, with a focus on continuous learning and staying updated with the latest industry trends.`,

        education: `Joshua is studying for a Bachelor of Technology and Engineering in Computer Science with Honours in Cybersecurity & Ethical Hacking at Christ (Deemed to be University), Bengaluru, since 2023. He is an active member of the Coding Club there.`,

        internship: `Joshua completed a Cyber Security Analyst Intern position at Ad Infocom Systems, Nagpur from April 2025 to May 2025. He worked on real-world cybersecurity projects and risk assessments, and collaborated with senior analysts to enhance system security.`,

        employment: `Joshua currently works as a Full Stack Engineer & DevOps Administrator at All Med Equipment, Chicago, Illinois, USA, since April 3, 2025. He leads full-stack platform development, deployment automation, and infrastructure networking operations to maintain reliable production systems. He also implements security hardening, monitoring solutions, and regular maintenance to ensure high availability and operational stability of the company web platform.`,

        skills: {
            programming: ['JavaScript', 'Python', 'Java', 'C++'],
            frontend:    ['React', 'Vue.js', 'HTML5', 'CSS3'],
            backend:     ['Node.js', 'Express', 'Django', 'Spring Boot'],
            databases:   ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
            tools:       ['Git', 'Docker', 'AWS', 'Jenkins'],
            soft:        ['Team Leadership', 'Problem Solving', 'Communication', 'Agile/Scrum'],
        },

        projects: [
            {
                name: 'Online Bus Reservation System',
                tags: ['full-stack', 'web', 'booking'],
                description: 'A full-stack web application for booking and managing bus reservations, featuring real-time seat selection and secure payment integration.',
            },
            {
                name: 'Car Racing Game',
                tags: ['game', '2d', 'javascript'],
                description: 'A 2D car racing game with dynamic obstacles, scoring, and smooth controls using modern game development frameworks.',
            },
            {
                name: 'Zero-Trust AI Email Firewall',
                tags: ['ai', 'cybersecurity', 'email', 'firewall', 'zero trust', 'phishing'],
                description: 'An AI-driven email security layer that applies zero-trust principles to detect phishing, malicious links, and anomalous sender behavior before messages reach the inbox.',
                link: 'https://github.com/JoshuaMac003/Zero-Trust-AI-Email-Firewall',
            },
            {
                name: 'Voice Monitoring and Activity Classification System',
                tags: ['audio', 'ai', 'classification', 'voice', 'iot', 'safety'],
                description: 'An audio analytics pipeline that continuously monitors ambient sound, extracts features, and classifies activities in real time for safety and automation use cases.',
                link: 'https://github.com/JoshuaMac003/Voice-Monitoring-and-Activity-Classification-System',
            },
            {
                name: 'Voice Biometrics with Emotion Detection',
                tags: ['voice', 'biometrics', 'emotion', 'authentication', 'ai', 'ml'],
                description: 'A voice-based authentication and emotion recognition system that combines speaker identification with sentiment analysis for secure, human-aware interfaces.',
            },
            {
                name: 'Health Monitor',
                tags: ['iot', 'health', 'sensor', 'dashboard', 'wearable'],
                description: 'A health monitoring dashboard that aggregates sensor and wearable data to track vitals, visualise trends, and surface early warning signals for anomalies.',
            },
            {
                name: 'OWASP Password Strength Testing',
                tags: ['owasp', 'security', 'password', 'web', 'cybersecurity'],
                description: 'A responsive web tool that evaluates password entropy in real time, highlights weaknesses, and educates users on building stronger credentials.',
                link: 'https://github.com/JoshuaMac003/owasp-password-strength-test-master',
            },
            {
                name: 'Theft Detection System',
                tags: ['iot', 'security', 'embedded', 'sensor', 'alert'],
                description: 'An embedded security solution that fuses sensor inputs and rule-based logic to detect unauthorized movement and trigger instant alerts.',
            },
            {
                name: 'NeuroShield Brainwave-Pattern Authentication & Cognitive Intrusion Detection',
                tags: ['neuroshield', 'brainwave', 'eeg', 'authentication', 'biometrics', 'cybersecurity', 'ai'],
                description: 'A biometric security system using EEG-style signals, modelling brainwave patterns for authentication and detecting abnormal cognitive states that may indicate coercion or intrusion.',
                link: 'https://github.com/JoshuaMac003/NeuroShield-Brainwave-Pattern-Authentication-Cognitive-Intrusion-Detection-System',
            },
        ],

        certifications: {
            infosys: [
                'Artificial Intelligence Foundation — November 2026',
                'Introduction to Natural Language Processing — November 2026',
                'Introduction to Deep Learning — November 2026',
                'Introduction to Artificial Intelligence — November 2026',
                'Networking Devices (Infosys Springboard) — January 2025',
            ],
            aws: [
                'AWS Academy Graduate – Cloud Foundations — December 2025',
                'AWS Academy Graduate — Cloud Data Pipeline Builder Training Badge — December 2025',
                'AWS Academy Graduate — Cloud Data Pipeline Builder — December 2025',
            ],
            mongodb: [
                'Introduction to MongoDB — February 2025 (Credential ID: MDBl7fxeowebs)',
                'MongoDB and the Document Model — February 2025 (Credential ID: MDBp8czii1vg7)',
                'MongoDB Data Modelling — February 2025',
                'MongoDB Indexes — February 2025',
                'CRUD Operations — Replace and Delete Documents — February 2025',
                'CRUD Operations — Modifying Query Results — January 2025',
                'MongoDB Aggregation — January 2025',
                'Connecting to MongoDB Database — January 2025',
                'MongoDB Transactions — January 2025',
            ],
            cisco: [
                'Introduction to IoT and Digital Transformation (Cisco Networking Academy) — June 2025',
                'Endpoint Security — February 2025',
                'Junior Cybersecurity Analyst Career Path — February 2025',
                'Ethical Hacker — February 2025',
                'Ethical Hacker — February 2025',
                'Introduction to Cybersecurity — February 2025',
                'Introduction to Data Science — February 2025',
                'Networking Basics — February 2025',
            ],
            nptel: [
                'Introduction to Internet of Things (in collaboration with IIT Kharagpur) — January 2025',
            ],
            other: [
                'Introduction to Cloud Computing (Simplilearn) — January 2026',
                'Build Your Own Chatbot (Cognitive Class) — June 2024 (Credential ID: 2b8b56eab1634828b34b2b8d74bd35ff)',
                'Configure and Test Basic Network Connectivity (Coursera Project Network) — February 2025 (Credential ID: 7601IMJ6MKWB)',
                'Networking Devices (Skillsoft) — February 2025 (Credential ID: 134577647)',
                'Python Programming (Christ University, Bangalore)',
            ],
        },

        achievements: `Joshua won the Under-19 Kerala State CISCE Volleyball Championship in 2022, representing Kerala in the Council for the Indian School Certificate Examinations tournament. He also actively participated in the university Coding Club at Christ (Deemed to be University).`,

        contact: {
            email:    'joshuapalathinkalxx3@gmail.com',
            linkedin: 'https://www.linkedin.com/in/joshua-chacko-george-736123289/',
            github:   'https://github.com/JoshuaMac003',
        },
    };

    /* ============================================================
       NAVIGATION DESTINATIONS
       Maps intent to page + anchor.
       ============================================================ */
    const NAV_TARGETS = {
        home:            { page: 'index.html', anchor: '#home' },
        about:           { page: 'index.html', anchor: '#about' },
        education:       { page: 'index.html', anchor: '#education' },
        experience:      { page: 'experience.html', anchor: '' },
        skills:          { page: 'experience.html', anchor: '#skills' },
        certifications:  { page: 'experience.html', anchor: '#certifications' },
        achievements:    { page: 'experience.html', anchor: '#extracurricular' },
        projects:        { page: 'index.html', anchor: '#projects' },
        contact:         { page: 'index.html', anchor: '#contact' },
    };

    function navigate(key) {
        const dest = NAV_TARGETS[key];
        if (!dest) return;
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const targetPage  = dest.page;
        const anchor      = dest.anchor;

        if (currentPage === targetPage || (currentPage === '' && targetPage === 'index.html')) {
            // Same page — smooth scroll
            if (anchor) {
                const el = document.querySelector(anchor);
                if (el) {
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 20 : 100;
                    const top    = el.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            // Cross-page navigation
            window.location.href = anchor ? `${targetPage}${anchor}` : targetPage;
        }
    }

    /* ============================================================
       INTENT RECOGNITION
       ============================================================ */
    function normalise(str) {
        return str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function anyWord(input, words) {
        return words.some(w => input.includes(w));
    }

    // Intent patterns: each has a priority (higher = checked first) and a test function.
    const INTENTS = [

        // ---- NAVIGATION REQUESTS ----
        {
            name: 'nav_home',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\bhome\b/.test(i) || i === 'home',
        },
        {
            name: 'nav_about',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\babout\b/.test(i) || i === 'about',
        },
        {
            name: 'nav_education',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\beducation\b/.test(i) ||
                       /\b(show|take)\b.*\b(degree|study|university)\b/.test(i),
        },
        {
            name: 'nav_experience',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\bexperience\b/.test(i) ||
                       i === 'experience',
        },
        {
            name: 'nav_skills',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\b(skills?|technologies)\b/.test(i) ||
                       i === 'skills' || i === 'technologies',
        },
        {
            name: 'nav_certifications',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\bcertif/.test(i) ||
                       i === 'certifications',
        },
        {
            name: 'nav_achievements',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\bachieve/.test(i) ||
                       i === 'achievements',
        },
        {
            name: 'nav_projects',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\bproject/.test(i) ||
                       /\b(show|take)\b.*\b(work|built|developed)\b/.test(i) ||
                       i === 'projects',
        },
        {
            name: 'nav_contact',
            priority: 10,
            test: i => /\b(go|take|navigate|scroll|show|open)\b.*\bcontact\b/.test(i) ||
                       i === 'contact',
        },

        // ---- SPECIFIC PROJECT QUESTIONS ----
        {
            name: 'project_neuroshield',
            priority: 9,
            test: i => anyWord(i, ['neuroshield', 'brainwave', 'eeg', 'cognitive intrusion']),
        },
        {
            name: 'project_email_firewall',
            priority: 9,
            test: i => anyWord(i, ['email firewall', 'zero-trust', 'zero trust', 'phishing firewall', 'ai email', 'ai firewall']),
        },
        {
            name: 'project_voice_monitoring',
            priority: 9,
            test: i => anyWord(i, ['voice monitoring', 'activity classification', 'ambient sound']),
        },
        {
            name: 'project_voice_biometrics',
            priority: 9,
            test: i => anyWord(i, ['voice biometric', 'emotion detection', 'speaker identification', 'voice auth']),
        },
        {
            name: 'project_health',
            priority: 9,
            test: i => anyWord(i, ['health monitor', 'vitals', 'wearable data', 'health dashboard']),
        },
        {
            name: 'project_owasp',
            priority: 9,
            test: i => anyWord(i, ['owasp', 'password strength', 'password test']),
        },
        {
            name: 'project_theft',
            priority: 9,
            test: i => anyWord(i, ['theft detection', 'theft', 'unauthorized movement']),
        },
        {
            name: 'project_bus',
            priority: 9,
            test: i => anyWord(i, ['bus reservation', 'bus booking', 'seat selection']),
        },
        {
            name: 'project_car_racing',
            priority: 9,
            test: i => anyWord(i, ['car racing', 'car game', 'racing game']),
        },

        // ---- INFO INTENTS ----
        {
            name: 'about',
            priority: 8,
            test: i => anyWord(i, ['who is joshua', 'introduce yourself', 'who are you', 'tell me about joshua',
                                   'what does joshua do', 'overview of joshua', 'give me an overview', 'professional profile',
                                   'introduce joshua', 'who is he', 'about joshua']),
        },
        {
            name: 'education',
            priority: 8,
            test: i => anyWord(i, ['what did he study', 'what did joshua study', 'where did he study',
                                   'tell me about his education', "joshua's education", 'his degree',
                                   'his university', 'christ university', 'b.tech', 'btech', 'bachelor',
                                   'computer science degree', 'cybersecurity degree', 'his studies', 'honours']),
        },
        {
            name: 'internship',
            priority: 8,
            test: i => anyWord(i, ['internship', 'intern', 'ad infocom', 'nagpur']),
        },
        {
            name: 'employment',
            priority: 8,
            test: i => anyWord(i, ['work experience', 'where has he worked', 'his job', 'all med equipment',
                                   'full stack engineer', 'devops', 'chicago', 'employment', 'current job',
                                   'where does he work', 'his employer', 'professional experience', 'current role']),
        },
        {
            name: 'experience_general',
            priority: 7,
            test: i => anyWord(i, ['experience', 'his work', 'professional background']),
        },
        {
            name: 'skills_general',
            priority: 8,
            test: i => anyWord(i, ['what are his skills', 'technical skills', 'what technologies', 'what tools',
                                   'skill set', 'his skill', 'what can he do', 'what does he know',
                                   'programming languages', 'coding languages', 'what languages', 'his languages',
                                   'frontend', 'backend', 'database', 'soft skills', 'technologies he uses']),
        },
        {
            name: 'skills_aws',
            priority: 9,
            test: i => anyWord(i, ['aws', 'amazon web services', 'cloud services', 'does he know aws']),
        },
        {
            name: 'skills_mongodb',
            priority: 9,
            test: i => /\b(mongodb|mongo)\b/.test(i) && !anyWord(i, ['certification', 'certif', 'certificate']),
        },
        {
            name: 'skills_python',
            priority: 9,
            test: i => /\bpython\b/.test(i) && !anyWord(i, ['certification', 'certif']),
        },
        {
            name: 'projects_general',
            priority: 8,
            test: i => anyWord(i, ['show me the projects', 'what has joshua developed', 'his projects',
                                   "joshua's projects", 'what projects', 'list projects', 'show projects',
                                   'what has he built', 'what has he made', 'what has he created']),
        },
        {
            name: 'projects_iot',
            priority: 9,
            test: i => anyWord(i, ['iot project', 'internet of things project', 'his iot']),
        },
        {
            name: 'projects_cybersecurity',
            priority: 9,
            test: i => anyWord(i, ['cybersecurity project', 'security project', 'hacking project']),
        },
        {
            name: 'projects_ai',
            priority: 9,
            test: i => anyWord(i, ['ai project', 'machine learning project', 'ml project', 'artificial intelligence project']),
        },
        {
            name: 'certifications_general',
            priority: 8,
            test: i => anyWord(i, ['certifications', 'certificates', 'show certs', 'his certs',
                                   "joshua's certifications", 'what certifications', 'list certifications',
                                   'certified', 'credentials']),
        },
        {
            name: 'certifications_aws',
            priority: 9,
            test: i => anyWord(i, ['aws certification', 'aws cert', 'amazon certification', 'cloud foundation cert']),
        },
        {
            name: 'certifications_mongodb',
            priority: 9,
            test: i => anyWord(i, ['mongodb certification', 'mongodb cert', 'mongo cert', 'mongodb certificates']),
        },
        {
            name: 'certifications_cisco',
            priority: 9,
            test: i => anyWord(i, ['cisco certification', 'cisco cert', 'cisco certificate', 'ethical hacker cert',
                                   'cybersecurity cert', 'endpoint security cert']),
        },
        {
            name: 'certifications_infosys',
            priority: 9,
            test: i => anyWord(i, ['infosys certification', 'infosys cert', 'springboard cert', 'infosys ai']),
        },
        {
            name: 'certifications_nptel',
            priority: 9,
            test: i => anyWord(i, ['nptel', 'iit kharagpur', 'nptel iot']),
        },
        {
            name: 'achievements',
            priority: 8,
            test: i => anyWord(i, ['achievements', 'achievement', 'volleyball', 'cisce', 'kerala', 'champion',
                                   'extracurricular', 'extra curricular', 'sports', 'awards']),
        },
        {
            name: 'contact',
            priority: 8,
            test: i => anyWord(i, ['contact', 'email', 'reach him', 'reach joshua', 'get in touch',
                                   'how to contact', 'contact details', 'linkedin', 'github', 'his email',
                                   "joshua's email", 'connect with joshua']),
        },
        {
            name: 'iot_general',
            priority: 7,
            test: i => anyWord(i, ['iot', 'internet of things', 'iot specialist', 'iot work']),
        },
        {
            name: 'cybersecurity_general',
            priority: 7,
            test: i => anyWord(i, ['cybersecurity', 'cyber security', 'ethical hacking', 'ethical hacker',
                                   'penetration testing', 'pentest', 'infosec', 'information security']),
        },
        {
            name: 'ai_general',
            priority: 7,
            test: i => anyWord(i, ['artificial intelligence', 'machine learning', 'deep learning', 'nlp',
                                   'natural language processing', 'ai work', 'ml work', 'ai skills']),
        },

        // ---- SALARY / PERSONAL INFO (graceful decline) ----
        {
            name: 'salary',
            priority: 10,
            test: i => anyWord(i, ['salary', 'wage', 'pay', 'income', 'compensation', 'earn', 'how much']),
        },
        {
            name: 'personal_info',
            priority: 10,
            test: i => anyWord(i, ['age', 'birthday', 'phone number', 'address', 'personal', 'family', 'girlfriend', 'boyfriend']),
        },

    ].sort((a, b) => b.priority - a.priority);

    function detectIntent(input) {
        const norm = normalise(input);
        for (const intent of INTENTS) {
            if (intent.test(norm)) return intent.name;
        }
        return null;
    }

    /* ============================================================
       RESPONSE GENERATOR
       ============================================================ */
    function buildResponse(intent, rawInput) {
        switch (intent) {

            /* ---- NAVIGATION ---- */
            case 'nav_home':
                navigate('home');
                return 'Taking you to the top of the page!';
            case 'nav_about':
                navigate('about');
                return 'Navigating to the About section.';
            case 'nav_education':
                navigate('education');
                return 'Scrolling to the Education & Internship section.';
            case 'nav_experience':
                navigate('experience');
                return 'Opening the Experience page.';
            case 'nav_skills':
                navigate('skills');
                return 'Taking you to Skills & Technologies.';
            case 'nav_certifications':
                navigate('certifications');
                return 'Navigating to Certifications & Achievements.';
            case 'nav_achievements':
                navigate('achievements');
                return 'Taking you to Extra Curricular Achievements.';
            case 'nav_projects':
                navigate('projects');
                return 'Navigating to the Projects section!';
            case 'nav_contact':
                navigate('contact');
                return 'Taking you to the Contact section.';

            /* ---- SPECIFIC PROJECTS ---- */
            case 'project_neuroshield':
                return `NeuroShield is a biometric security system Joshua developed. It uses EEG-style brainwave signals to authenticate users by modelling their unique brainwave patterns, and can also detect abnormal cognitive states that may indicate coercion or intrusion. ${linkHint('projects')}`;
            case 'project_email_firewall':
                return `The Zero-Trust AI Email Firewall is an AI-driven email security layer that applies zero-trust principles to detect phishing, malicious links, and anomalous sender behaviour before messages reach the inbox. ${linkHint('projects')}`;
            case 'project_voice_monitoring':
                return `The Voice Monitoring and Activity Classification System is an audio analytics pipeline that continuously monitors ambient sound, extracts features, and classifies activities in real time — built for safety and automation use cases. ${linkHint('projects')}`;
            case 'project_voice_biometrics':
                return `The Voice Biometrics with Emotion Detection system combines speaker identification with sentiment analysis to create secure, human-aware authentication interfaces. ${linkHint('projects')}`;
            case 'project_health':
                return `The Health Monitor is a dashboard that aggregates sensor and wearable data to track vital signs, visualise trends, and surface early warning signals for health anomalies. ${linkHint('projects')}`;
            case 'project_owasp':
                return `The OWASP Password Strength Testing tool is a responsive web application that evaluates password entropy in real time, highlights weaknesses, and helps users build stronger credentials. ${linkHint('projects')}`;
            case 'project_theft':
                return `The Theft Detection System is an embedded security solution that fuses sensor inputs and rule-based logic to detect unauthorised movement and trigger instant alerts. ${linkHint('projects')}`;
            case 'project_bus':
                return `The Online Bus Reservation System is a full-stack web application for booking and managing bus reservations, featuring real-time seat selection and secure payment integration. ${linkHint('projects')}`;
            case 'project_car_racing':
                return `The Car Racing Game is a 2D browser game with dynamic obstacles, scoring, and smooth controls, built using modern game development frameworks. ${linkHint('projects')}`;

            /* ---- INTRO / ABOUT ---- */
            case 'about':
                navigate('about');
                return KB.about + ' Would you like to know about his education, experience, or projects?';

            /* ---- EDUCATION ---- */
            case 'education':
                navigate('education');
                return KB.education;

            /* ---- INTERNSHIP ---- */
            case 'internship':
                navigate('education');
                return KB.internship;

            /* ---- EMPLOYMENT ---- */
            case 'employment':
                navigate('experience');
                return KB.employment;

            /* ---- EXPERIENCE GENERAL ---- */
            case 'experience_general':
                navigate('experience');
                return `Joshua has two key professional experiences: (1) ${KB.internship} (2) ${KB.employment}`;

            /* ---- SKILLS ---- */
            case 'skills_general':
                navigate('skills');
                return formatSkills();
            case 'skills_aws':
                navigate('skills');
                return 'Yes! AWS is one of Joshua's tools & platforms skills. He also holds AWS Academy Graduate certifications in Cloud Foundations and Cloud Data Pipeline Builder.';
            case 'skills_mongodb':
                navigate('skills');
                return 'Joshua works with MongoDB as one of his core databases. He also holds multiple MongoDB certifications covering data modelling, CRUD operations, aggregation, indexes, transactions, and more.';
            case 'skills_python':
                navigate('skills');
                return 'Yes, Python is one of Joshua's programming languages. He also completed a Python programming certification from Christ University, Bangalore.';

            /* ---- PROJECTS ---- */
            case 'projects_general':
                navigate('projects');
                return formatProjects(null);
            case 'projects_iot':
                navigate('projects');
                return 'Joshua's IoT-related projects include: Voice Monitoring & Activity Classification System, Theft Detection System, Health Monitor, and Voice Biometrics with Emotion Detection. He also holds the NPTEL Introduction to Internet of Things certification.';
            case 'projects_cybersecurity':
                navigate('projects');
                return 'Joshua's cybersecurity projects include: Zero-Trust AI Email Firewall, NeuroShield Brainwave-Pattern Authentication, OWASP Password Strength Testing, and Theft Detection System.';
            case 'projects_ai':
                navigate('projects');
                return 'Joshua's AI/ML-related projects include: Zero-Trust AI Email Firewall, Voice Monitoring & Activity Classification System, Voice Biometrics with Emotion Detection, and NeuroShield.';

            /* ---- CERTIFICATIONS ---- */
            case 'certifications_general':
                navigate('certifications');
                return 'Joshua holds certifications from Infosys, AWS, MongoDB, Cisco, NPTEL, Simplilearn, Cognitive Class, Coursera, Skillsoft, Infosys Springboard, and Christ University. I've navigated to the full list for you.';
            case 'certifications_aws':
                navigate('certifications');
                return 'Joshua's AWS certifications include:\n• ' + KB.certifications.aws.join('\n• ');
            case 'certifications_mongodb':
                navigate('certifications');
                return 'Joshua's MongoDB certifications include:\n• ' + KB.certifications.mongodb.join('\n• ');
            case 'certifications_cisco':
                navigate('certifications');
                return 'Joshua's Cisco certifications include:\n• ' + KB.certifications.cisco.join('\n• ');
            case 'certifications_infosys':
                navigate('certifications');
                return 'Joshua's Infosys certifications include:\n• ' + KB.certifications.infosys.join('\n• ');
            case 'certifications_nptel':
                navigate('certifications');
                return 'Joshua has: ' + KB.certifications.nptel.join('. ') + '. The course covered IoT architecture, communication protocols, security concerns, and practical IoT solution development.';

            /* ---- ACHIEVEMENTS ---- */
            case 'achievements':
                navigate('achievements');
                return KB.achievements;

            /* ---- CONTACT ---- */
            case 'contact':
                navigate('contact');
                return `You can reach Joshua at:\n📧 Email: ${KB.contact.email}\n💼 LinkedIn: linkedin.com/in/joshua-chacko-george-736123289\n💻 GitHub: github.com/JoshuaMac003`;

            /* ---- IoT GENERAL ---- */
            case 'iot_general':
                return `Joshua is an IoT Specialist with practical projects including a Voice Monitoring System, Health Monitor, and Theft Detection System. He also holds the NPTEL Introduction to Internet of Things certification (with IIT Kharagpur) and the Cisco Introduction to IoT and Digital Transformation certification.`;

            /* ---- CYBERSECURITY GENERAL ---- */
            case 'cybersecurity_general':
                return `Cybersecurity is a core focus for Joshua. He is pursuing Honours in Cybersecurity & Ethical Hacking at Christ University. He has completed Cisco certifications in Ethical Hacking, Endpoint Security, Junior Cybersecurity Analyst, and Introduction to Cybersecurity. His projects include the Zero-Trust AI Email Firewall, NeuroShield, and OWASP Password Strength Testing tool.`;

            /* ---- AI GENERAL ---- */
            case 'ai_general':
                return `Joshua works with AI/ML in multiple projects: Zero-Trust AI Email Firewall, Voice Biometrics with Emotion Detection, Voice Monitoring & Activity Classification, and NeuroShield. He also holds Infosys certifications in Artificial Intelligence Foundation, Introduction to AI, Deep Learning, and NLP.`;

            /* ---- SALARY / PRIVATE INFO ---- */
            case 'salary':
                return `I don't have that information in Joshua's portfolio at the moment. Salary and compensation details are not part of the public portfolio.`;
            case 'personal_info':
                return `That personal information isn't available in Joshua's portfolio. I can only share professional background, projects, skills, certifications, and contact details.`;

            /* ---- FALLBACK ---- */
            default:
                return null;
        }
    }

    function linkHint(section) {
        return `You can browse all projects in the Projects section — just say "Show me the projects" or click the button below.`;
    }

    function formatSkills() {
        const s = KB.skills;
        return [
            `Joshua's technical skills:`,
            `\n🖥️ Programming: ${s.programming.join(', ')}`,
            `🎨 Frontend: ${s.frontend.join(', ')}`,
            `⚙️ Backend: ${s.backend.join(', ')}`,
            `🗄️ Databases: ${s.databases.join(', ')}`,
            `🛠️ Tools & Platforms: ${s.tools.join(', ')}`,
            `🤝 Soft Skills: ${s.soft.join(', ')}`,
        ].join('\n');
    }

    function formatProjects(filterTag) {
        const projects = filterTag
            ? KB.projects.filter(p => p.tags.includes(filterTag))
            : KB.projects;
        return `Joshua has ${KB.projects.length} projects:\n` +
            projects.map((p, i) => `${i + 1}. ${p.name}`).join('\n') +
            '\n\nAsk me about any specific project for details!';
    }

    const OUT_OF_SCOPE = `I'm LEYA, Joshua's portfolio assistant. I can help you explore his education, experience, skills, projects, certifications, and contact information. I'm not able to help with general questions outside Joshua's portfolio.`;

    const UNKNOWN_PORTFOLIO = `I don't have that information in Joshua's portfolio at the moment.`;

    function getResponse(userInput) {
        const trimmed = userInput.trim();
        if (!trimmed) return null;

        const intent = detectIntent(trimmed);
        if (!intent) {
            // Check if it's clearly off-topic
            const norm = normalise(trimmed);
            if (anyWord(norm, ['weather', 'news', 'sports', 'politics', 'stock', 'covid',
                                'recipe', 'joke', 'movie', 'song', 'celebrity', 'capital of',
                                'president', 'prime minister', 'help me code', 'write code for',
                                'translate', 'math', 'calculate', 'doctor', 'medicine',
                                'investment', 'bitcoin', 'crypto', 'salary', 'latest news'])) {
                return OUT_OF_SCOPE;
            }
            return UNKNOWN_PORTFOLIO;
        }

        const response = buildResponse(intent, trimmed);
        return response || UNKNOWN_PORTFOLIO;
    }

    /* ============================================================
       UI STATE
       ============================================================ */
    let isOpen         = false;
    let voiceEnabled   = false;
    let isSpeaking     = false;
    let isListening    = false;
    let recognition    = null;
    let isSubmitting   = false;

    /* ============================================================
       DOM REFERENCES (resolved after DOMContentLoaded)
       ============================================================ */
    let launcher, panel, messagesEl, typingEl, suggestionsEl,
        inputEl, sendBtn, micBtn, micStatusEl,
        voiceToggle, clearBtn, closeBtn;

    function getEls() {
        launcher      = document.getElementById('leya-launcher');
        panel         = document.getElementById('leya-panel');
        messagesEl    = document.getElementById('leya-messages');
        typingEl      = document.getElementById('leya-typing');
        suggestionsEl = document.getElementById('leya-suggestions');
        inputEl       = document.getElementById('leya-input');
        sendBtn       = document.getElementById('leya-send');
        micBtn        = document.getElementById('leya-mic');
        micStatusEl   = document.getElementById('leya-mic-status');
        voiceToggle   = document.getElementById('leya-voice-toggle');
        clearBtn      = document.getElementById('leya-clear');
        closeBtn      = document.getElementById('leya-close');
    }

    /* ============================================================
       PANEL OPEN / CLOSE
       ============================================================ */
    function openPanel() {
        if (!panel || !launcher) return;
        isOpen = true;
        panel.hidden = false;
        launcher.setAttribute('aria-expanded', 'true');
        if (!messagesEl || messagesEl.children.length === 0) {
            addBotMessage(
                `Hi! I'm LEYA, Joshua's portfolio assistant. I can help you explore his education, professional experience, technical skills, projects, certifications, and contact information. What would you like to know?`
            );
        }
        setTimeout(() => inputEl && inputEl.focus(), 100);
    }

    function closePanel() {
        if (!panel || !launcher) return;
        isOpen = false;
        panel.hidden = true;
        launcher.setAttribute('aria-expanded', 'false');
        stopSpeaking();
        stopListening();
    }

    /* ============================================================
       MESSAGE RENDERING
       ============================================================ */
    function addBotMessage(text) {
        if (!messagesEl) return;
        const div = document.createElement('div');
        div.className = 'leya-msg leya-msg-bot';
        // Safe: pre (plain text), newlines → <br>
        div.textContent = text;
        // Convert \n to line breaks safely
        div.innerHTML = div.innerHTML.replace(/\n/g, '<br>');
        messagesEl.appendChild(div);
        scrollToBottom();
        if (voiceEnabled) speak(text);
    }

    function addUserMessage(text) {
        if (!messagesEl) return;
        const div = document.createElement('div');
        div.className = 'leya-msg leya-msg-user';
        div.textContent = text; // Safe: textContent, never innerHTML
        messagesEl.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        if (messagesEl) {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }
    }

    function showTyping() {
        if (typingEl) typingEl.hidden = false;
        scrollToBottom();
    }

    function hideTyping() {
        if (typingEl) typingEl.hidden = true;
    }

    /* ============================================================
       SEND / SUBMIT
       ============================================================ */
    function submitInput(text) {
        const userText = (text || (inputEl ? inputEl.value : '')).trim();
        if (!userText || isSubmitting) return;

        isSubmitting = true;
        if (inputEl) inputEl.value = '';
        addUserMessage(userText);

        // Hide suggestions after first real interaction
        if (suggestionsEl) suggestionsEl.style.display = 'none';

        showTyping();

        // Simulate minimal processing delay (feels natural)
        const delay = 300 + Math.random() * 200;
        setTimeout(() => {
            hideTyping();
            const response = getResponse(userText);
            if (response) addBotMessage(response);
            isSubmitting = false;
        }, delay);
    }

    /* ============================================================
       SPEECH SYNTHESIS
       ============================================================ */
    function speak(text) {
        if (!window.speechSynthesis) return;
        stopSpeaking();
        const utter = new SpeechSynthesisUtterance(text.replace(/<br\s*\/?>/gi, ' '));
        utter.lang = 'en-US';
        utter.rate = 1;
        utter.onstart = () => { isSpeaking = true; };
        utter.onend   = () => { isSpeaking = false; };
        utter.onerror = () => { isSpeaking = false; };
        window.speechSynthesis.speak(utter);
    }

    function stopSpeaking() {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
        }
    }

    /* ============================================================
       SPEECH RECOGNITION
       ============================================================ */
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;

    function startListening() {
        if (!SpeechRec) {
            setMicStatus('Speech recognition is not supported in this browser. Please type your question.');
            return;
        }
        if (isListening) {
            stopListening();
            return;
        }

        recognition = new SpeechRec();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            isListening = true;
            if (micBtn) micBtn.classList.add('leya-listening');
            setMicStatus('Listening… speak now.', true);
        };

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            if (inputEl) {
                inputEl.value = transcript;
                inputEl.focus();
            }
            setMicStatus(`Heard: "${transcript}"`, true);
            setTimeout(() => submitInput(transcript), 300);
        };

        recognition.onerror = (e) => {
            let msg = 'Could not capture speech.';
            if (e.error === 'not-allowed') msg = 'Microphone access was denied. Please allow microphone permissions and try again.';
            else if (e.error === 'no-speech')  msg = 'No speech detected. Please try again.';
            else if (e.error === 'network')    msg = 'Network error during speech recognition.';
            setMicStatus(msg, true);
            stopListening();
        };

        recognition.onend = () => {
            stopListening();
        };

        try {
            recognition.start();
        } catch (err) {
            setMicStatus('Could not start speech recognition. Please type your question.');
            stopListening();
        }
    }

    function stopListening() {
        isListening = false;
        if (micBtn) micBtn.classList.remove('leya-listening');
        if (recognition) {
            try { recognition.stop(); } catch (_) {}
            recognition = null;
        }
        setTimeout(() => setMicStatus('', false), 2000);
    }

    function setMicStatus(msg, show = true) {
        if (!micStatusEl) return;
        micStatusEl.textContent = msg;
        micStatusEl.hidden = !show || !msg;
    }

    /* ============================================================
       CLEAR CONVERSATION
       ============================================================ */
    function clearConversation() {
        if (messagesEl) messagesEl.innerHTML = '';
        if (suggestionsEl) suggestionsEl.style.display = '';
        addBotMessage(`Hi! I'm LEYA, Joshua's portfolio assistant. I can help you explore his education, professional experience, technical skills, projects, certifications, and contact information. What would you like to know?`);
    }

    /* ============================================================
       EVENT WIRING
       ============================================================ */
    function wireEvents() {
        if (!launcher) return;

        launcher.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen ? closePanel() : openPanel();
        });

        if (closeBtn)  closeBtn.addEventListener('click', closePanel);
        if (clearBtn)  clearBtn.addEventListener('click', clearConversation);

        if (voiceToggle) {
            voiceToggle.addEventListener('click', () => {
                voiceEnabled = !voiceEnabled;
                voiceToggle.setAttribute('aria-pressed', voiceEnabled);
                const icon = voiceToggle.querySelector('i');
                if (icon) {
                    icon.className = voiceEnabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
                }
                voiceToggle.title = voiceEnabled ? 'Voice responses on — click to mute' : 'Voice responses off — click to enable';
                if (!voiceEnabled) stopSpeaking();
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => submitInput());
        }

        if (inputEl) {
            inputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    submitInput();
                }
            });
        }

        if (micBtn) {
            micBtn.addEventListener('click', () => {
                if (!SpeechRec) {
                    setMicStatus('Speech recognition is not supported in this browser.', true);
                    return;
                }
                isListening ? stopListening() : startListening();
            });
        }

        // Suggestion chips
        if (suggestionsEl) {
            suggestionsEl.addEventListener('click', (e) => {
                const chip = e.target.closest('.leya-chip');
                if (chip) {
                    const query = chip.dataset.query;
                    if (query) submitInput(query);
                }
            });
        }

        // Close on outside click (but not on launcher itself)
        document.addEventListener('click', (e) => {
            if (!isOpen) return;
            if (panel && !panel.contains(e.target) && e.target !== launcher && !launcher.contains(e.target)) {
                closePanel();
            }
        });

        // Escape to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) closePanel();
        });

        // Stop mic when LEYA panel closes
        if (panel) {
            const obs = new MutationObserver(() => {
                if (panel.hidden && isListening) stopListening();
            });
            obs.observe(panel, { attributes: true, attributeFilter: ['hidden'] });
        }
    }

    /* ============================================================
       INIT
       ============================================================ */
    function init() {
        getEls();
        wireEvents();

        // Hide mic button if speech recognition unsupported
        if (!SpeechRec && micBtn) {
            micBtn.style.display = 'none';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
