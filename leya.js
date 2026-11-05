/**
 * LEYA — Joshua Chacko George's Portfolio Assistant
 *
 * Version: 2.1 — Production Autonomous Pass
 *
 * Features & Architecture:
 *  - Deterministic intent engine with regex word boundaries and priority scoring
 *  - Precise separation of Cyber Security (2025) and AI (2026) internships
 *  - Specific filters for IoT, Cybersecurity, AI projects & certifications
 *  - Runtime base path detection for local & GitHub Pages subdirectory (/JoshuaPalathinkal/)
 *  - Native Web Speech API for optional voice recognition
 *  - SpeechSynthesis API with dedicated stop-speech control
 *  - Strict privacy and knowledge boundary enforcement (no invented data)
 *  - XSS-safe DOM message rendering
 */

(function () {
    'use strict';

    /* ============================================================
       GUARD — only initialize once per page load
       ============================================================ */
    if (window.__leyaInitialized) return;
    window.__leyaInitialized = true;

    /* ============================================================
       BASE PATH DETECTION — handles local, root, and GitHub Pages repo path
       ============================================================ */
    function getBasePath() {
        const path = window.location.pathname;
        const lastSlash = path.lastIndexOf('/');
        const base = lastSlash > 0 ? path.substring(0, lastSlash + 1) : '/';
        return base;
    }

    function resolvePage(filename) {
        const base = getBasePath();
        return base + filename;
    }

    function currentPageFilename() {
        const path = window.location.pathname;
        const parts = path.split('/');
        const last  = parts[parts.length - 1];
        return last || 'index.html';
    }

    /* ============================================================
       PORTFOLIO KNOWLEDGE BASE (Verified source of truth only)
       ============================================================ */
    const KB = {
        name: 'Joshua Chacko George',

        headline: 'IoT Specialist | Honours in Cybersecurity & Ethical Hacking | Cybersecurity & AI/ML | Full-Stack Engineering | DevOps & Cloud Technologies',

        intro: `Joshua Chacko George is an IoT Specialist with Honours in Cybersecurity & Ethical Hacking, practicing across Cybersecurity & AI/ML, Full-Stack Engineering, and DevOps & Cloud Technologies. He is a B.Tech Computer Science student at CHRIST (Deemed to be University), Bengaluru, pursuing Honours in Cybersecurity & Ethical Hacking, and works as Full Stack Engineer & DevOps Administrator at All Med Equipment in Chicago, USA.`,

        about: `Joshua Chacko George is a dedicated IoT Specialist, Cybersecurity & Ethical Hacking practitioner, and Full-Stack Engineer with a passion for technology and innovation. With experience developing scalable applications and driving digital transformation, he specializes in creating efficient, user-centric solutions that solve real-world problems. His journey in technology is driven by curiosity and a commitment to continuous learning and industry excellence.`,

        education: `Joshua is pursuing a Bachelor of Technology and Engineering in Computer Science with Honours in Cybersecurity & Ethical Hacking at CHRIST (Deemed to be University), Bengaluru (2023 – Current). He is also an active member of the university Coding Club.`,

        internship_cyber: `Joshua completed a Cyber Security Analyst Internship at AD Infocom Systems, Nagpur (April 2025 – May 2025). During this internship, he worked on real-world cybersecurity projects and risk assessments, and collaborated with senior analysts to enhance system security.`,

        internship_ai: `Joshua completed an Artificial Intelligence Internship at AD Infocom Systems, Maharashtra, India (April 2026 – May 2026, On-site). He worked on a Pneumonia Detection project applying machine learning techniques to medical image analysis and identifying patterns associated with pneumonia. Associated skills: Artificial Intelligence (AI), Machine Learning (ML), Medical Image Analysis, Image-Based Disease Classification, Pattern Identification, and Internet of Things (IoT).`,

        internship_both: `Joshua has completed two separate internships at AD Infocom Systems:\n\n1. Cyber Security Analyst Intern (April 2025 – May 2025, Nagpur):\nWorked on real-world cybersecurity projects, risk assessments, and collaborated with senior analysts to enhance system security.\n\n2. Artificial Intelligence Intern (April 2026 – May 2026, Maharashtra, India · On-site):\nWorked on a Pneumonia Detection project applying machine learning to medical image analysis, pattern identification, and disease classification.`,

        employment: `Joshua currently works as a Full Stack Engineer & DevOps Administrator at All Med Equipment, Chicago, Illinois, USA (April 3, 2025 – Present). He leads full-stack platform development, deployment automation, and infrastructure networking operations to maintain reliable production systems. He also implements security hardening, monitoring solutions, and regular maintenance to ensure high availability and operational stability of the company web platform.`,

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
            simplilearn: [
                'Introduction to Cloud Computing — January 2026',
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
            nptel: [
                'Introduction to Internet of Things — January 2025 (in collaboration with IIT Kharagpur)',
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
            other: [
                'Build Your Own Chatbot (Cognitive Class) — June 2024 (Credential ID: 2b8b56eab1634828b34b2b8d74bd35ff)',
                'Configure and Test Basic Network Connectivity (Coursera Project Network) — February 2025 (Credential ID: 7601IMJ6MKWB)',
                'Networking Devices (Skillsoft) — February 2025 (Credential ID: 134577647)',
                'Python Programming (Christ University, Bangalore)',
            ],
        },

        achievements: `Joshua won the Under-19 Kerala State CISCE Volleyball Championship in 2022, representing Kerala in the Council for the Indian School Certificate Examinations tournament. He also actively participates in the university Coding Club at CHRIST (Deemed to be University).`,

        contact: {
            email:    'joshuapalathinkalxx3@gmail.com',
            linkedin: 'https://www.linkedin.com/in/joshua-chacko-george-736123289/',
            github:   'https://github.com/JoshuaMac003',
        },
    };

    /* ============================================================
       NAVIGATION DESTINATIONS
       ============================================================ */
    const NAV_PAGES = {
        home:           { file: 'index.html',      anchor: '#home' },
        about:          { file: 'index.html',      anchor: '#about' },
        education:      { file: 'index.html',      anchor: '#education' },
        projects:       { file: 'index.html',      anchor: '#projects' },
        contact:        { file: 'index.html',      anchor: '#contact' },
        experience:     { file: 'experience.html', anchor: '' },
        skills:         { file: 'experience.html', anchor: '#skills' },
        certifications: { file: 'experience.html', anchor: '#certifications' },
        achievements:   { file: 'experience.html', anchor: '#extracurricular' },
    };

    function navigate(key) {
        const dest = NAV_PAGES[key];
        if (!dest) return;

        const curFile = currentPageFilename();
        const tgtFile = dest.file;
        const anchor  = dest.anchor;

        const isSamePage = (curFile === tgtFile)
            || (curFile === '' && tgtFile === 'index.html');

        if (isSamePage) {
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
            const resolved = resolvePage(tgtFile);
            window.location.href = anchor ? (resolved + anchor) : resolved;
        }
    }

    /* ============================================================
       INTENT RECOGNITION HELPERS
       ============================================================ */
    function normalise(str) {
        return str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    /* ============================================================
       INTENT DEFINITIONS (Ordered by specificity)
       ============================================================ */
    const INTENTS = [

        /* ---- STRICT PRIVACY / OUT-OF-SCOPE BOUNDARIES ---- */
        {
            name: 'salary',
            priority: 30,
            test: i => /\b(salary|wage|wages|pay rate|income|compensation|how much does (he|joshua) earn|how much is (he|joshua) paid)\b/.test(i)
        },
        {
            name: 'personal_info',
            priority: 30,
            test: i => /\b(age|birthday|birth date|dob|phone number|mobile number|home address|girlfriend|boyfriend|marital|wife|husband|married|religion|caste)\b/.test(i)
        },

        /* ---- EXPLICIT NAVIGATION ---- */
        { name: 'nav_home',           priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+home\b/.test(i) || i === 'home' },
        { name: 'nav_about',          priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+about\b/.test(i) || i === 'about' },
        { name: 'nav_education',      priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+(education|degree|studies)\b/.test(i) },
        { name: 'nav_experience',     priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+(experience)\b/.test(i) },
        { name: 'nav_skills',         priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+(skills|technologies)\b/.test(i) },
        { name: 'nav_certifications', priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+(certifications?|certificates?)\b/.test(i) },
        { name: 'nav_achievements',   priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+(achievements?|extracurricular)\b/.test(i) },
        { name: 'nav_projects',       priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+projects?\b/.test(i) },
        { name: 'nav_contact',        priority: 25, test: i => /\b(go to|take me to|navigate to|open)\s+contact\b/.test(i) },

        /* ---- SPECIFIC PROJECTS ---- */
        { name: 'project_neuroshield',      priority: 22, test: i => /\b(neuroshield|brainwave|eeg|cognitive intrusion)\b/.test(i) },
        { name: 'project_email_firewall',   priority: 22, test: i => /\b(email firewall|zero trust email|zero-trust email|ai email firewall|phishing firewall)\b/.test(i) },
        { name: 'project_voice_monitoring', priority: 22, test: i => /\b(voice monitoring|activity classification|ambient sound)\b/.test(i) },
        { name: 'project_voice_biometrics', priority: 22, test: i => /\b(voice biometric|voice biometrics|emotion detection|speaker identification)\b/.test(i) },
        { name: 'project_health',           priority: 22, test: i => /\b(health monitor|vitals dashboard|wearable data)\b/.test(i) },
        { name: 'project_owasp',            priority: 22, test: i => /\b(owasp|password strength|password entropy)\b/.test(i) },
        { name: 'project_theft',            priority: 22, test: i => /\b(theft detection|unauthorized movement)\b/.test(i) },
        { name: 'project_bus',              priority: 22, test: i => /\b(bus reservation|bus booking|online bus)\b/.test(i) },
        { name: 'project_car_racing',       priority: 22, test: i => /\b(car racing|racing game|2d racing)\b/.test(i) },

        /* ---- SPECIFIC CERTIFICATIONS (Must precede general and skills) ---- */
        { name: 'certifications_iot',           priority: 21, test: i => /\b(iot|internet of things)\s+(certs?|certifications?|certificates?)\b|\b(nptel|iit kharagpur cert|digital transformation cert)\b/.test(i) },
        { name: 'certifications_cybersecurity', priority: 21, test: i => /\b(cybersecurity|cyber security|security|ethical hacker|endpoint security|junior cybersecurity analyst)\s+(certs?|certifications?|certificates?)\b/.test(i) },
        { name: 'certifications_aws',           priority: 21, test: i => /\b(aws|amazon)\s+(certs?|certifications?|certificates?)\b|\b(cloud foundations? cert|data pipeline cert)\b/.test(i) },
        { name: 'certifications_mongodb',       priority: 21, test: i => /\b(mongodb|mongo)\s+(certs?|certifications?|certificates?)\b/.test(i) },
        { name: 'certifications_cisco',         priority: 21, test: i => /\bcisco\s+(certs?|certifications?|certificates?)\b/.test(i) },
        { name: 'certifications_infosys',       priority: 21, test: i => /\binfosys\s+(certs?|certifications?|certificates?)\b|\bspringboard cert\b/.test(i) },

        /* ---- SPECIFIC SKILLS ---- */
        { name: 'skills_docker',      priority: 18, test: i => /\bdocker\b/.test(i) },
        { name: 'skills_devops',      priority: 18, test: i => /\b(devops|ci cd|pipeline automation|infrastructure networking)\b/.test(i) },
        { name: 'skills_aws',         priority: 18, test: i => /\baws\b/.test(i) },
        { name: 'skills_mongodb',     priority: 18, test: i => /\b(mongodb|mongo)\b/.test(i) },
        { name: 'skills_python',      priority: 18, test: i => /\bpython\b/.test(i) },
        { name: 'skills_frameworks',  priority: 18, test: i => /\b(frameworks?|react|vue|express|django|spring boot)\b/.test(i) },
        { name: 'skills_databases',   priority: 18, test: i => /\b(databases?|postgresql|mysql|redis)\b/.test(i) },
        { name: 'skills_programming', priority: 18, test: i => /\b(programming languages?|coding languages?|what languages?|which languages?)\b/.test(i) },

        /* ---- INTERNSHIPS — PRECISE DISTINCTION ---- */
        {
            name: 'internship_ai',
            priority: 17,
            test: i => /\b(ai internship|ml internship|artificial intelligence intern|machine learning intern|ai intern|pneumonia detection|medical image|2026 internship|second internship|latest internship)\b/.test(i)
        },
        {
            name: 'internship_cyber',
            priority: 17,
            test: i => /\b(cybersecurity internship|cyber security internship|security analyst intern|cyber analyst|2025 internship|first internship)\b/.test(i)
        },
        {
            name: 'internship_adinfocom',
            priority: 16,
            test: i => /\b(ad infocom|infocom systems|infocom|both internships|all internships)\b/.test(i)
        },
        {
            name: 'internship_general',
            priority: 15,
            test: i => /\b(internship|internships|intern)\b/.test(i)
        },

        /* ---- SPECIFIC DOMAIN EXPERIENCE ---- */
        {
            name: 'ai_experience',
            priority: 16,
            test: i => /\b(ai experience|ml experience|machine learning experience|experience in ai|have ai experience)\b/.test(i)
        },
        {
            name: 'cybersecurity_experience',
            priority: 16,
            test: i => /\b(cybersecurity experience|security experience|experience in cybersecurity|have cybersecurity experience)\b/.test(i)
        },

        /* ---- EMPLOYMENT ---- */
        {
            name: 'employment',
            priority: 15,
            test: i => /\b(where does (he|joshua) work|who does (he|joshua) work for|where is (he|joshua) employed|current role|current job|employer|all med|all med equipment|chicago job|current position)\b/.test(i)
        },

        /* ---- GENERAL EXPERIENCE ---- */
        {
            name: 'experience_general',
            priority: 14,
            test: i => /\b(experience|work experience|professional experience|professional background|where has (he|joshua) worked|what experience)\b/.test(i)
        },

        /* ---- EDUCATION ---- */
        {
            name: 'education',
            priority: 14,
            test: i => /\b(education|educational|study|studied|degree|university|college|school|christ university|b\.?tech|bachelor|specialization|specialisation|honours|honors|qualification|studies)\b/.test(i)
        },

        /* ---- CATEGORIZED PROJECTS ---- */
        { name: 'projects_iot',           priority: 13, test: i => /\biot projects?\b/.test(i) || /\b(internet of things projects?)\b/.test(i) },
        { name: 'projects_cybersecurity', priority: 13, test: i => /\b(cybersecurity projects?|security projects?|hacking projects?)\b/.test(i) },
        { name: 'projects_ai',            priority: 13, test: i => /\b(ai projects?|machine learning projects?|ml projects?)\b/.test(i) },

        /* ---- GENERAL PROJECTS ---- */
        {
            name: 'projects_general',
            priority: 12,
            test: i => /\b(projects?|portfolio items?|what has (he|joshua) developed|what has (he|joshua) built|what has (he|joshua) made|explore projects|show projects)\b/.test(i)
        },

        /* ---- GENERAL SKILLS ---- */
        {
            name: 'skills_general',
            priority: 12,
            test: i => /\b(skills?|technologies?|tech stack|tools?|what can (he|joshua) do|what does (he|joshua) know|technical expertise)\b/.test(i)
        },

        /* ---- GENERAL CERTIFICATIONS ---- */
        {
            name: 'certifications_general',
            priority: 12,
            test: i => /\b(certifications?|certificates?|credentials?|show certs|what certs|certified)\b/.test(i)
        },

        /* ---- ACHIEVEMENTS ---- */
        {
            name: 'achievements',
            priority: 12,
            test: i => /\b(achievements?|volleyball|cisce|kerala|champion|championship|extracurricular|extra curricular|sports|awards?)\b/.test(i)
        },

        /* ---- CONTACT ---- */
        {
            name: 'contact',
            priority: 12,
            test: i => /\b(contact|email|reach (him|joshua)|get in touch|how to contact|contact details|linkedin|github|connect)\b/.test(i)
        },

        /* ---- ABOUT / PROFILE ---- */
        {
            name: 'about',
            priority: 10,
            test: i => /\b(who is joshua|introduce joshua|tell me about joshua|about joshua|introduce yourself|who are you|overview of joshua|tell me about him|who is he|what does joshua do|give me an overview)\b/.test(i)
        },

        /* ---- BROAD DOMAIN TOPICS ---- */
        { name: 'iot_general',           priority: 8, test: i => /\b(iot|internet of things)\b/.test(i) },
        { name: 'cybersecurity_general', priority: 8, test: i => /\b(cybersecurity|ethical hacking|infosec)\b/.test(i) },
        { name: 'ai_general',            priority: 8, test: i => /\b(artificial intelligence|machine learning|deep learning|nlp)\b/.test(i) },

    ].sort((a, b) => b.priority - a.priority);

    function detectIntent(input) {
        const norm = normalise(input);
        for (const intent of INTENTS) {
            if (intent.test(norm)) return intent.name;
        }
        return null;
    }

    /* ============================================================
       RESPONSE BUILDER
       ============================================================ */
    function buildResponse(intent) {
        switch (intent) {

            /* Navigation & Actions */
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
                return 'Opening the Experience page, which includes Skills & Technologies, Certifications, and Extracurricular Achievements.';

            case 'nav_skills':
                navigate('skills');
                return 'Taking you to Skills & Technologies.\n\n' + formatSkills();

            case 'nav_certifications':
                navigate('certifications');
                return 'Navigating to Certifications & Achievements.\n\nJoshua holds 31 verified certifications across Cisco, MongoDB, AWS, Infosys, NPTEL, Simplilearn, Cognitive Class, Coursera, and Skillsoft.';

            case 'nav_achievements':
                navigate('achievements');
                return 'Taking you to Extra Curricular Achievements.\n\n' + KB.achievements;

            case 'nav_projects':
                navigate('projects');
                return 'Navigating to the Projects section!\n\n' + formatProjects();

            case 'nav_contact':
                navigate('contact');
                return 'Taking you to the Contact section.\n\n📧 Email: ' + KB.contact.email;

            /* Specific Projects */
            case 'project_neuroshield':
                navigate('projects');
                return 'NeuroShield is a biometric security system Joshua developed. It uses EEG-style brainwave signals to authenticate users by modelling their unique brainwave patterns, and detects abnormal cognitive states that may indicate coercion or intrusion.';

            case 'project_email_firewall':
                navigate('projects');
                return 'The Zero-Trust AI Email Firewall is an AI-driven email security layer that applies zero-trust principles to detect phishing, malicious links, and anomalous sender behavior before messages reach the inbox.';

            case 'project_voice_monitoring':
                navigate('projects');
                return 'The Voice Monitoring and Activity Classification System is an audio analytics pipeline that continuously monitors ambient sound, extracts features, and classifies activities in real time for safety and automation use cases.';

            case 'project_voice_biometrics':
                navigate('projects');
                return 'The Voice Biometrics with Emotion Detection system combines speaker identification with sentiment analysis to create secure, human-aware authentication interfaces.';

            case 'project_health':
                navigate('projects');
                return 'The Health Monitor is a dashboard that aggregates sensor and wearable data to track vital signs, visualise trends, and surface early warning signals for anomalies.';

            case 'project_owasp':
                navigate('projects');
                return 'The OWASP Password Strength Testing tool is a responsive web application that evaluates password entropy in real time, highlights weaknesses, and helps users build stronger credentials.';

            case 'project_theft':
                navigate('projects');
                return 'The Theft Detection System is an embedded security solution that fuses sensor inputs and rule-based logic to detect unauthorized movement and trigger instant alerts.';

            case 'project_bus':
                navigate('projects');
                return 'The Online Bus Reservation System is a full-stack web application for booking and managing bus reservations, featuring real-time seat selection and secure payment integration.';

            case 'project_car_racing':
                navigate('projects');
                return 'The Car Racing Game is a 2D browser game with dynamic obstacles, scoring, and smooth controls, built using modern game development frameworks.';

            /* About */
            case 'about':
                navigate('about');
                return KB.about + '\n\nWould you like to know about his education, experience, or projects?';

            /* Education */
            case 'education':
                navigate('education');
                return KB.education;

            /* Internships — Separate & Distinct */
            case 'internship_ai':
                navigate('education');
                return KB.internship_ai;

            case 'internship_cyber':
                navigate('education');
                return KB.internship_cyber;

            case 'internship_adinfocom':
            case 'internship_general':
                navigate('education');
                return KB.internship_both;

            /* Specific Domain Experience */
            case 'ai_experience':
                return 'Yes! Joshua has practical AI/ML experience:\n\n• Artificial Intelligence Intern at AD Infocom Systems (April 2026 – May 2026): Worked on a Pneumonia Detection project applying machine learning to medical image analysis and disease classification.\n• AI Projects: Zero-Trust AI Email Firewall, NeuroShield (EEG-based authentication), Voice Biometrics with Emotion Detection, and Voice Monitoring & Activity Classification.\n• Certifications: Infosys Artificial Intelligence Foundation, Introduction to AI, Deep Learning, and NLP.';

            case 'cybersecurity_experience':
                return 'Yes! Joshua specializes heavily in cybersecurity:\n\n• Honours in Cybersecurity & Ethical Hacking at CHRIST (Deemed to be University).\n• Cyber Security Analyst Intern at AD Infocom Systems (April 2025 – May 2025): Worked on real-world cybersecurity projects and risk assessments.\n• Cybersecurity Projects: Zero-Trust AI Email Firewall, NeuroShield Cognitive Intrusion Detection, and OWASP Password Strength Testing.\n• Certifications: Cisco Ethical Hacker (2x), Junior Cybersecurity Analyst Career Path, Endpoint Security, and Introduction to Cybersecurity.';

            /* Employment */
            case 'employment':
                navigate('education');
                return KB.employment;

            /* General Experience */
            case 'experience_general':
                navigate('education');
                return 'Joshua has a range of professional experiences:\n\n' +
                    '📌 ' + KB.internship_cyber + '\n\n' +
                    '📌 ' + KB.internship_ai + '\n\n' +
                    '📌 ' + KB.employment;

            /* Specific Skills */
            case 'skills_docker':
                navigate('skills');
                return 'Yes! Docker is one of Joshua\'s core tools & platforms skills for containerization and DevOps workflows. In his role as Full Stack Engineer & DevOps Administrator at All Med Equipment, he utilizes Docker alongside Git, AWS, and Jenkins.';

            case 'skills_devops':
                navigate('skills');
                return 'Joshua\'s DevOps skills include Docker, Git, AWS, Jenkins, automated deployment workflows, and infrastructure networking. As Full Stack Engineer & DevOps Administrator at All Med Equipment in Chicago, he manages production deployments and platform reliability.';

            case 'skills_aws':
                navigate('skills');
                return 'Yes! AWS is one of Joshua\'s core platforms. He holds AWS Academy Graduate certifications in Cloud Foundations and Cloud Data Pipeline Builder.';

            case 'skills_mongodb':
                navigate('skills');
                return 'Joshua works with MongoDB as one of his core databases. He holds 9 MongoDB certifications covering data modelling, CRUD operations, aggregation, indexes, and transactions.';

            case 'skills_python':
                navigate('skills');
                return 'Yes, Python is one of Joshua\'s primary programming languages. He also completed a Python programming certification from Christ University, Bangalore.';

            case 'skills_frameworks':
                navigate('skills');
                return 'Joshua works with modern frameworks across the stack:\n• Frontend: React, Vue.js\n• Backend: Express (Node.js), Django (Python), Spring Boot (Java)';

            case 'skills_databases':
                navigate('skills');
                return 'Joshua works with MongoDB, PostgreSQL, MySQL, and Redis. He also holds 9 MongoDB certifications covering data modelling, CRUD operations, aggregation, indexes, and transactions.';

            case 'skills_programming':
                navigate('skills');
                return 'Joshua\'s programming languages include JavaScript, Python, Java, and C++. He also holds a Python programming certification from Christ University.';

            case 'skills_general':
                navigate('skills');
                return formatSkills();

            /* Categorized Projects */
            case 'projects_iot':
                navigate('projects');
                return 'Joshua\'s IoT-related projects include:\n• Voice Monitoring & Activity Classification System\n• Theft Detection System\n• Health Monitor\n• Voice Biometrics with Emotion Detection\n\nHe also holds the NPTEL Introduction to Internet of Things certification and completed an AI internship involving IoT skills.';

            case 'projects_cybersecurity':
                navigate('projects');
                return 'Joshua\'s cybersecurity projects include:\n• Zero-Trust AI Email Firewall\n• NeuroShield Brainwave-Pattern Authentication & Cognitive Intrusion Detection\n• OWASP Password Strength Testing\n• Theft Detection System';

            case 'projects_ai':
                navigate('projects');
                return 'Joshua\'s AI/ML projects include:\n• Zero-Trust AI Email Firewall\n• NeuroShield Brainwave-Pattern Authentication\n• Voice Monitoring & Activity Classification System\n• Voice Biometrics with Emotion Detection\n\n(He also completed an AI/ML internship at AD Infocom Systems focusing on medical image analysis for Pneumonia Detection.)';

            case 'projects_general':
                navigate('projects');
                return formatProjects();

            /* Specific Certifications */
            case 'certifications_iot':
                navigate('certifications');
                return 'Joshua holds the following IoT certifications:\n• Introduction to Internet of Things — NPTEL (in collaboration with IIT Kharagpur, January 2025)\n• Introduction to IoT and Digital Transformation — Cisco Networking Academy (June 2025)\n\nHis AI internship at AD Infocom Systems also encompassed IoT competencies.';

            case 'certifications_cybersecurity':
                navigate('certifications');
                return 'Joshua holds multiple cybersecurity certifications:\n• Cisco Ethical Hacker (February 2025) — 2 credentials\n• Cisco Junior Cybersecurity Analyst Career Path (February 2025)\n• Cisco Endpoint Security (February 2025)\n• Cisco Introduction to Cybersecurity (February 2025)\n\nHe is also pursuing Honours in Cybersecurity & Ethical Hacking at Christ University and completed a Cyber Security Analyst internship at AD Infocom Systems.';

            case 'certifications_aws':
                navigate('certifications');
                return 'Joshua\'s AWS certifications:\n• ' + KB.certifications.aws.join('\n• ');

            case 'certifications_mongodb':
                navigate('certifications');
                return 'Joshua\'s MongoDB certifications (9 credentials):\n• ' + KB.certifications.mongodb.join('\n• ');

            case 'certifications_cisco':
                navigate('certifications');
                return 'Joshua\'s Cisco certifications:\n• ' + KB.certifications.cisco.join('\n• ');

            case 'certifications_infosys':
                navigate('certifications');
                return 'Joshua\'s Infosys certifications:\n• ' + KB.certifications.infosys.join('\n• ');

            case 'certifications_general':
                navigate('certifications');
                return 'Joshua holds ' + KB.certifications.cisco.length + ' Cisco certs, ' + KB.certifications.mongodb.length + ' MongoDB certs, ' + KB.certifications.aws.length + ' AWS certs, plus certifications from Infosys, NPTEL, Simplilearn, Cognitive Class, Coursera, Skillsoft, Infosys Springboard, and Christ University — 31 total. I\'ve navigated to the full list for you.';

            /* Achievements */
            case 'achievements':
                navigate('achievements');
                return KB.achievements;

            /* Contact */
            case 'contact':
                navigate('contact');
                return 'You can reach Joshua at:\n📧 Email: ' + KB.contact.email + '\n💼 LinkedIn: linkedin.com/in/joshua-chacko-george-736123289\n💻 GitHub: github.com/JoshuaMac003';

            /* Domain Knowledge */
            case 'iot_general':
                return 'Joshua is an IoT Specialist with practical projects including the Voice Monitoring & Activity Classification System, Health Monitor, and Theft Detection System. He holds the NPTEL Introduction to Internet of Things certification (with IIT Kharagpur) and the Cisco Introduction to IoT and Digital Transformation certification. His AI internship at AD Infocom Systems also listed IoT among its skills.';

            case 'cybersecurity_general':
                return 'Cybersecurity is a core focus for Joshua. He is pursuing Honours in Cybersecurity & Ethical Hacking at Christ University. He completed a Cyber Security Analyst Internship at AD Infocom Systems (2025) and holds Cisco certifications in Ethical Hacking, Endpoint Security, Junior Cybersecurity Analyst Career Path, and Introduction to Cybersecurity. His projects include the Zero-Trust AI Email Firewall, NeuroShield, and OWASP Password Strength Testing tool.';

            case 'ai_general':
                return 'Joshua works with AI/ML across multiple projects (Zero-Trust AI Email Firewall, Voice Biometrics with Emotion Detection, Voice Monitoring & Activity Classification, NeuroShield) and completed an AI & ML internship at AD Infocom Systems (April–May 2026) working on a Pneumonia Detection project. He also holds Infosys certifications in Artificial Intelligence Foundation, Introduction to AI, Deep Learning, and NLP.';

            /* Polite Refusals (Strict Information Boundaries) */
            case 'salary':
                return 'Salary and compensation details are not part of the public portfolio. I\'m only able to share professional background, projects, skills, certifications, and contact information.';

            case 'personal_info':
                return 'That personal information isn\'t available in Joshua\'s portfolio. I can only share his professional background, projects, skills, certifications, and contact details.';

            default:
                return null;
        }
    }

    function formatSkills() {
        const s = KB.skills;
        return 'Joshua\'s technical skills:\n' +
            '🖥️ Programming: ' + s.programming.join(', ') + '\n' +
            '🎨 Frontend: '    + s.frontend.join(', ')    + '\n' +
            '⚙️ Backend: '     + s.backend.join(', ')     + '\n' +
            '🗄️ Databases: '   + s.databases.join(', ')   + '\n' +
            '🛠️ Tools & Platforms: ' + s.tools.join(', ') + '\n' +
            '🤝 Soft Skills: ' + s.soft.join(', ');
    }

    function formatProjects() {
        return 'Joshua has ' + KB.projects.length + ' projects:\n' +
            KB.projects.map((p, i) => (i + 1) + '. ' + p.name).join('\n') +
            '\n\nAsk me about any specific project for details!';
    }

    /* Out of scope messages — verbatim as required by specification */
    const OUT_OF_SCOPE = 'I\'m LEYA, Joshua\'s portfolio assistant. I can help you explore his education, experience, skills, projects, certifications, achievements, and contact information.';

    const UNKNOWN_PORTFOLIO = 'I don\'t have that information in Joshua\'s portfolio at the moment.';

    const OFF_TOPIC_WORDS = [
        'weather', 'news', 'sports score', 'politics', 'stock price', 'covid',
        'recipe', 'joke', 'movie review', 'celebrity', 'capital of', 'president of',
        'prime minister of', 'write code for me', 'translate this', 'solve this math',
        'investment advice', 'bitcoin price', 'crypto price', 'medical advice',
        'latest news', 'sports news', 'tell me a joke', 'what is the time',
    ];

    function getResponse(userInput) {
        const trimmed = userInput.trim();
        if (!trimmed) return null;

        const intent = detectIntent(trimmed);
        if (!intent) {
            if (anyWord(normalise(trimmed), OFF_TOPIC_WORDS)) return OUT_OF_SCOPE;
            return UNKNOWN_PORTFOLIO;
        }

        return buildResponse(intent) || UNKNOWN_PORTFOLIO;
    }

    function anyWord(input, words) {
        return words.some(w => input.includes(w));
    }

    /* ============================================================
       UI STATE
       ============================================================ */
    let isOpen       = false;
    let voiceEnabled = false;
    let isListening  = false;
    let isSubmitting = false;
    let recognition  = null;

    /* ============================================================
       DOM REFERENCES
       ============================================================ */
    let launcher, panel, messagesEl, typingEl, suggestionsEl,
        inputEl, sendBtn, micBtn, micStatusEl,
        voiceToggle, stopSpeechBtn, clearBtn, closeBtn;

    function resolveEls() {
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
        stopSpeechBtn = document.getElementById('leya-stop-speech');
        clearBtn      = document.getElementById('leya-clear');
        closeBtn      = document.getElementById('leya-close');
    }

    /* ============================================================
       PANEL OPEN / CLOSE
       ============================================================ */
    function openPanel() {
        resolveEls();
        if (!panel || !launcher) return;

        isOpen = true;
        panel.hidden = false;
        panel.removeAttribute('hidden');
        panel.style.display = 'flex';
        launcher.setAttribute('aria-expanded', 'true');

        if (messagesEl && messagesEl.children.length === 0) {
            addBotMessage(
                'Hi! I\'m LEYA, Joshua\'s portfolio assistant. I can help you explore his education, professional experience, technical skills, projects, certifications, and contact information. What would you like to know?'
            );
        }

        setTimeout(() => { if (inputEl) inputEl.focus(); }, 150);
    }

    function closePanel() {
        if (!panel) return;
        isOpen = false;
        panel.hidden = true;
        panel.style.display = '';
        if (launcher) launcher.setAttribute('aria-expanded', 'false');
        stopSpeaking();
        stopListening();
    }

    /* ============================================================
       MESSAGE RENDERING (XSS-Safe)
       ============================================================ */
    function addBotMessage(text) {
        if (!messagesEl) { resolveEls(); if (!messagesEl) return; }
        const div = document.createElement('div');
        div.className = 'leya-msg leya-msg-bot';
        div.textContent = text;
        div.innerHTML = div.innerHTML.replace(/\n/g, '<br>');
        messagesEl.appendChild(div);
        scrollBottom();
        if (voiceEnabled) speak(text);
    }

    function addUserMessage(text) {
        if (!messagesEl) return;
        const div = document.createElement('div');
        div.className = 'leya-msg leya-msg-user';
        div.textContent = text;
        messagesEl.appendChild(div);
        scrollBottom();
    }

    function scrollBottom() {
        if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
        if (typingEl) {
            typingEl.hidden = false;
            typingEl.removeAttribute('hidden');
        }
        scrollBottom();
    }

    function hideTyping() {
        if (typingEl) typingEl.hidden = true;
    }

    /* ============================================================
       SEND / SUBMIT
       ============================================================ */
    function submitInput(text) {
        const userText = (typeof text === 'string' ? text : (inputEl ? inputEl.value : '')).trim();
        if (!userText || isSubmitting) return;

        isSubmitting = true;
        if (inputEl) inputEl.value = '';
        addUserMessage(userText);

        if (suggestionsEl) suggestionsEl.style.display = 'none';

        showTyping();

        const delay = 260 + Math.random() * 150;
        setTimeout(() => {
            hideTyping();
            const resp = getResponse(userText);
            if (resp) addBotMessage(resp);
            isSubmitting = false;
        }, delay);
    }

    /* ============================================================
       SPEECH SYNTHESIS
       ============================================================ */
    function speak(text) {
        if (!window.speechSynthesis) return;
        stopSpeaking();
        const plainText = text.replace(/<br\s*\/?>/gi, '. ').replace(/[•📌]/g, '');
        const utter = new SpeechSynthesisUtterance(plainText);
        utter.lang = 'en-US';
        utter.rate = 1;

        utter.onstart = () => {
            if (stopSpeechBtn) {
                stopSpeechBtn.hidden = false;
                stopSpeechBtn.removeAttribute('hidden');
                stopSpeechBtn.style.display = 'inline-flex';
            }
        };
        utter.onend = () => {
            if (stopSpeechBtn) {
                stopSpeechBtn.hidden = true;
                stopSpeechBtn.style.display = 'none';
            }
        };
        utter.onerror = () => {
            if (stopSpeechBtn) {
                stopSpeechBtn.hidden = true;
                stopSpeechBtn.style.display = 'none';
            }
        };

        window.speechSynthesis.speak(utter);
    }

    function stopSpeaking() {
        try {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        } catch (_) {}
        if (stopSpeechBtn) {
            stopSpeechBtn.hidden = true;
            stopSpeechBtn.style.display = 'none';
        }
    }

    /* ============================================================
       SPEECH RECOGNITION
       ============================================================ */
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;

    function startListening() {
        if (!SpeechRec) {
            setMicStatus('Speech recognition is not supported in this browser. Please type your question.', true);
            return;
        }
        if (isListening) {
            stopListening();
            return;
        }

        try {
            recognition = new SpeechRec();
        } catch (e) {
            setMicStatus('Could not start speech recognition. Please type your question.', true);
            return;
        }

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
            if (inputEl) inputEl.value = transcript;
            setMicStatus('Heard: "' + transcript + '"', true);
            setTimeout(() => submitInput(transcript), 300);
        };
        recognition.onerror = (e) => {
            let msg = 'Could not capture speech.';
            if (e.error === 'not-allowed')    msg = 'Microphone access was denied. Please allow mic permissions and try again.';
            else if (e.error === 'no-speech') msg = 'No speech detected. Please try again.';
            else if (e.error === 'network')   msg = 'Network error during speech recognition.';
            setMicStatus(msg, true);
            stopListening();
        };
        recognition.onend = () => stopListening();

        try {
            recognition.start();
        } catch (e) {
            setMicStatus('Could not start speech recognition.', true);
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

    function setMicStatus(msg, show) {
        if (!micStatusEl) return;
        micStatusEl.textContent = msg;
        micStatusEl.hidden = !show || !msg;
        if (show && msg) micStatusEl.removeAttribute('hidden');
    }

    /* ============================================================
       CLEAR CONVERSATION
       ============================================================ */
    function clearConversation() {
        if (messagesEl) messagesEl.innerHTML = '';
        if (suggestionsEl) suggestionsEl.style.display = '';
        stopSpeaking();
        addBotMessage(
            'Hi! I\'m LEYA, Joshua\'s portfolio assistant. I can help you explore his education, professional experience, technical skills, projects, certifications, and contact information. What would you like to know?'
        );
    }

    /* ============================================================
       EVENT WIRING
       ============================================================ */
    let eventsWired = false;

    function wireEvents() {
        if (eventsWired) return;

        resolveEls();
        if (!launcher) return;

        eventsWired = true;

        launcher.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen ? closePanel() : openPanel();
        });

        if (closeBtn) closeBtn.addEventListener('click', closePanel);

        if (clearBtn) clearBtn.addEventListener('click', clearConversation);

        if (stopSpeechBtn) stopSpeechBtn.addEventListener('click', stopSpeaking);

        if (voiceToggle) {
            voiceToggle.addEventListener('click', () => {
                voiceEnabled = !voiceEnabled;
                voiceToggle.setAttribute('aria-pressed', String(voiceEnabled));
                const icon = voiceToggle.querySelector('i');
                if (icon) icon.className = voiceEnabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
                voiceToggle.title = voiceEnabled ? 'Voice on — click to mute' : 'Voice off — click to enable';
                if (!voiceEnabled) stopSpeaking();
            });
        }

        if (sendBtn) sendBtn.addEventListener('click', () => submitInput());

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

        if (suggestionsEl) {
            suggestionsEl.addEventListener('click', (e) => {
                const chip = e.target.closest('.leya-chip');
                if (chip && chip.dataset.query) submitInput(chip.dataset.query);
            });
        }

        document.addEventListener('click', (e) => {
            if (!isOpen) return;
            if (panel && !panel.contains(e.target) && !launcher.contains(e.target)) closePanel();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) closePanel();
        });

        if (!SpeechRec && micBtn) micBtn.style.display = 'none';
    }

    /* ============================================================
       INITIALIZATION
       ============================================================ */
    function init() {
        wireEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
