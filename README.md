# Joshua Chacko George — Professional Portfolio

Official personal portfolio website of **Joshua Chacko George**:  
**IoT Specialist | Honours in Cybersecurity & Ethical Hacking | Cybersecurity & AI/ML | Full-Stack Engineering | DevOps & Cloud Technologies**

Published Website: [https://joshuamac003.github.io/JoshuaPalathinkal/](https://joshuamac003.github.io/JoshuaPalathinkal/)  
GitHub Repository: [https://github.com/JoshuaMac003/JoshuaPalathinkal](https://github.com/JoshuaMac003/JoshuaPalathinkal)

---

## 🌟 Key Features

1. **Official Identity & Design Consistency**
   - Consistent branding across all sections, navigation, footer, metadata, and assistant.
   - Clean Apple-inspired black-and-white visual palette (`#000000`, `#ffffff`, `#f5f5f7`, `#1d1d1f`, `#86868b`, `#0071e3`).
   - Smooth CSS transitions, cursor-follow hero blueprint, and reduced-motion accessibility.

2. **Education & Professional Experience (Both Internships Separated)**
   - **Education**: B.Tech in Computer Science with Honours in Cybersecurity & Ethical Hacking at CHRIST (Deemed to be University), Bengaluru (2023 – Current).
   - **Internship 1**: Cyber Security Analyst Intern at AD Infocom Systems, Nagpur (April 2025 – May 2025). Real-world risk assessments and system security.
   - **Internship 2**: Artificial Intelligence Intern at AD Infocom Systems, Maharashtra, India (April 2026 – May 2026 · On-site). Pneumonia Detection project applying machine learning to medical image analysis and disease classification.
   - **Employment**: Full Stack Engineer & DevOps Administrator at All Med Equipment, Chicago, Illinois, USA (April 3, 2025 – Present). Full-stack platform engineering, CI/CD, and production reliability.

3. **Complete Portfolio of Nine Projects**
   - **Online Bus Reservation System**: Full-stack web booking application with real-time seat selection.
   - **Car Racing Game**: 2D browser racing game with obstacle physics and controls.
   - **Zero-Trust AI Email Firewall**: AI security layer intercepting phishing and anomalous senders.
   - **Voice Monitoring and Activity Classification System**: Real-time ambient audio analytics pipeline.
   - **Voice Biometrics with Emotion Detection**: Speaker authentication paired with sentiment analysis.
   - **Health Monitor**: Sensor and wearable dashboard tracking vital signs and early anomalies.
   - **OWASP Password Strength Testing**: Real-time entropy evaluator and credential hardening tool.
   - **Theft Detection System**: Embedded sensor security system with rule-based intruder alerts.
   - **NeuroShield Brainwave-Pattern Authentication & Cognitive Intrusion Detection**: EEG biometric security modeling cognitive states.

4. **31 Verified Certifications with Real-Time Search & Filtering**
   - Comprehensive inventory across Cisco (8), MongoDB (9), AWS (3), Infosys (5), NPTEL (1), Simplilearn (1), Cognitive Class (1), Coursera (1), Skillsoft (1), and Christ University (1).
   - Search by certification title or issuer, plus one-click category filter chips.

5. **LEYA — Integrated Portfolio Assistant**
   - Browser-native assistant accessible via floating launcher on every page.
   - Structured local knowledge base covering education, internships, employment, skills, projects, certifications, and contact information.
   - Deterministic intent engine with regex word boundaries, resolving nuanced queries (e.g. distinguishing the 2025 cybersecurity internship from the 2026 AI internship, or IoT projects from IoT certifications).
   - Automatic navigation: scrolls to or opens the relevant section upon answering questions.
   - Web Speech API for optional microphone input (with permission handling and unsupported browser fallback).
   - SpeechSynthesis API for optional voice responses, complete with dedicated stop-speech control.
   - Chat-only architecture with zero external API dependencies, zero ML model downloads, zero file uploads, and strict privacy boundaries.

6. **Mobile Navigation & Bug Fixes**
   - Fixed mobile Experience submenu behavior: expanding the submenu preserves the open hamburger menu.
   - Submenu items navigate to target anchors/pages and close the menu properly.
   - Responsive layout tested across 320px to 1920px viewports without horizontal overflow.

7. **Transparent Contact Workflow**
   - Contact form validates fields and generates a pre-filled `mailto:` email client request, accurately explaining that the visitor reviews and sends the message in their email application.

---

## 📁 File Structure

```
JoshuaPalathinkal/
├── index.html               # Main page: Hero, About, Education/Experience Timeline, Projects, Contact, Footer
├── experience.html          # Experience page: Skills & Technologies, 31 Certifications, Extracurricular, Footer
├── styles.css               # Styling, color variables, responsive layouts, LEYA UI
├── script.js                # Mobile navigation, smooth scrolling, counter animations, contact form, cert filter
├── leya.js                  # LEYA portfolio assistant: local knowledge base, intent engine, voice I/O
├── profile pic.jpeg         # Profile photograph
├── blueprint.jpg            # Hero section blueprint pattern
├── obrs.png                 # Online Bus Reservation System screenshot
├── car racing.jpeg          # Car Racing Game screenshot
├── firewall.png             # Zero-Trust AI Email Firewall diagram
├── ACTIVITY.png             # Voice Monitoring and Activity System diagram
├── VOICE.png                # Voice Biometrics system diagram
├── HEALTH.png               # Health Monitor dashboard screenshot
├── strength.png             # OWASP Password Strength tool screenshot
├── theft.png                # Theft Detection System diagram
├── brainwavefile.png        # NeuroShield system diagram
├── test-intents.js          # Automated intent recognition regression test suite (49 queries)
├── test-dom-and-assets.js   # Automated DOM, ID, and asset integrity test suite
└── README.md                # Project documentation
```

---

## 🤖 LEYA Architecture & Knowledge Boundaries

LEYA is intentionally engineered as an honest, deterministic portfolio assistant:

- **Local Execution**: Runs entirely client-side in the browser. Does not make external network requests to third-party LLM APIs.
- **Knowledge Boundaries**: Answers verified questions regarding Joshua's identity, education, honours, internships, employment, skills, projects, certifications, achievements, and contact channels.
- **Strict Fallbacks**:
  - Unrelated/general questions:  
    *"I'm LEYA, Joshua's portfolio assistant. I can help you explore his education, experience, skills, projects, certifications, achievements, and contact information."*
  - Missing portfolio information:  
    *"I don't have that information in Joshua's portfolio at the moment."*
  - Salary and confidential details are declined politely without hallucination.

---

## 🛠️ Development & Local Testing

### Prerequisites
- Any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari).
- Node.js (v18+) for running local tests and static servers.

### Running Locally
To run a lightweight static server:
```bash
# Using Node.js built-in HTTP server or npx serve:
npx serve .
# Or using python:
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Running Automated QA Tests
```bash
# Test 1: Verify all 49 LEYA intent queries and knowledge routing
node test-intents.js

# Test 2: Verify DOM structure, all element IDs, footers, and all 15 local assets
node test-dom-and-assets.js
```

---

## 🚀 Deployment

The portfolio is hosted statically on **GitHub Pages**:

- **Repository**: `JoshuaMac003/JoshuaPalathinkal`
- **Branch**: `main`
- **Subdirectory Path Handling**: `leya.js` dynamically detects `window.location.pathname` so all cross-page navigation links work seamlessly on both local servers (`/index.html`) and GitHub Pages (`/JoshuaPalathinkal/index.html`).

To deploy updates:
```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```
GitHub Pages automatically deploys changes within 1–2 minutes from the `main` branch.

---

## 📞 Contact Information

- **Name**: Joshua Chacko George
- **Email**: [joshuapalathinkalxx3@gmail.com](mailto:joshuapalathinkalxx3@gmail.com)
- **LinkedIn**: [Joshua Chacko George](https://www.linkedin.com/in/joshua-chacko-george-736123289/)
- **GitHub**: [JoshuaMac003](https://github.com/JoshuaMac003)

---

&copy; 2026 Joshua Chacko George. All rights reserved.
