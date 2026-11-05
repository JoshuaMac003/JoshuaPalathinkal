const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('COMPREHENSIVE PORTFOLIO DOM & ASSET INTEGRATION TEST');
console.log('='.repeat(80));

let failures = [];

function assert(condition, message) {
    if (condition) {
        console.log(`[PASS] ${message}`);
    } else {
        console.error(`[FAIL] ${message}`);
        failures.push(message);
    }
}

// 1. Check HTML files exist
assert(fs.existsSync('index.html'), 'index.html exists');
assert(fs.existsSync('experience.html'), 'experience.html exists');
assert(fs.existsSync('styles.css'), 'styles.css exists');
assert(fs.existsSync('script.js'), 'script.js exists');
assert(fs.existsSync('leya.js'), 'leya.js exists');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const expHtml = fs.readFileSync('experience.html', 'utf8');

// 2. Check Official Identity
assert(indexHtml.includes('Joshua Chacko George'), 'index.html contains official identity "Joshua Chacko George"');
assert(expHtml.includes('Joshua Chacko George'), 'experience.html contains official identity "Joshua Chacko George"');

// 3. Exact Homepage Headline
const exactHeadline = 'IoT Specialist | Honours in Cybersecurity &amp; Ethical Hacking | Cybersecurity &amp; AI/ML | Full-Stack Engineering | DevOps &amp; Cloud Technologies';
assert(indexHtml.includes(exactHeadline), 'index.html preserves exact headline wording and order');

// 4. LEYA Components in index.html
const leyaIds = [
    'leya-container', 'leya-launcher', 'leya-panel', 'leya-voice-toggle',
    'leya-stop-speech', 'leya-clear', 'leya-close', 'leya-messages',
    'leya-typing', 'leya-suggestions', 'leya-input', 'leya-mic',
    'leya-send', 'leya-mic-status'
];

leyaIds.forEach(id => {
    assert(indexHtml.includes(`id="${id}"`), `index.html contains LEYA element #${id}`);
    assert(expHtml.includes(`id="${id}"`), `experience.html contains LEYA element #${id}`);
});

// 5. Navigation elements
const navIds = ['hamburger', 'nav-menu', 'exp-dropdown', 'exp-dropdown-toggle'];
navIds.forEach(id => {
    assert(indexHtml.includes(`id="${id}"`), `index.html contains #${id}`);
    assert(expHtml.includes(`id="${id}"`), `experience.html contains #${id}`);
});

// 6. Nine Projects in index.html
const projects = [
    'Online Bus Reservation System',
    'Car Racing Game',
    'Zero-Trust AI Email Firewall',
    'Voice Monitoring and Activity Classification System',
    'Voice Biometrics with Emotion Detection',
    'Health Monitor',
    'OWASP Password Strength Testing',
    'Theft Detection System',
    'NeuroShield Brainwave-Pattern Authentication &amp; Cognitive Intrusion Detection'
];

projects.forEach(p => {
    assert(indexHtml.includes(p), `index.html contains project: ${p}`);
});

// 7. Education & All Internships in index.html
assert(indexHtml.includes('CHRIST (Deemed to be University), Bengaluru'), 'index.html contains official university title');
assert(indexHtml.includes('Honours in Cybersecurity'), 'index.html contains Honours in Cybersecurity');
assert(indexHtml.includes('id="internship-cyber"'), 'index.html contains #internship-cyber');
assert(indexHtml.includes('April 2025 – May 2025'), 'index.html contains 2025 internship dates');
assert(indexHtml.includes('id="internship-ai"'), 'index.html contains #internship-ai');
assert(indexHtml.includes('April 2026 – May 2026'), 'index.html contains 2026 internship dates');
assert(indexHtml.includes('Pneumonia Detection'), 'index.html contains Pneumonia Detection project');
assert(indexHtml.includes('id="employment"'), 'index.html contains #employment');
assert(indexHtml.includes('All Med Equipment'), 'index.html contains All Med Equipment');

// 8. Certifications in experience.html
const certCards = (expHtml.match(/class="certification-card"/g) || []).length;
assert(certCards === 31, `experience.html contains exactly 31 certification cards (found: ${certCards})`);

// 9. Footers in both pages
assert(indexHtml.includes('class="footer"'), 'index.html contains footer element');
assert(expHtml.includes('class="footer"'), 'experience.html contains footer element');
assert(indexHtml.includes('&copy; 2026 Joshua Chacko George'), 'index.html footer contains 2026 copyright for Joshua Chacko George');
assert(expHtml.includes('&copy; 2026 Joshua Chacko George'), 'experience.html footer contains 2026 copyright for Joshua Chacko George');

// 10. Check Referenced Local Assets on Disk
const imageRegex = /src="([^"]+\.(?:png|jpe?g|svg|webp|mp4))"/gi;
const referencedAssets = new Set();

let match;
while ((match = imageRegex.exec(indexHtml)) !== null) {
    if (!match[1].startsWith('http')) referencedAssets.add(match[1]);
}
while ((match = imageRegex.exec(expHtml)) !== null) {
    if (!match[1].startsWith('http')) referencedAssets.add(match[1]);
}

referencedAssets.forEach(assetPath => {
    const unencoded = decodeURIComponent(assetPath);
    assert(fs.existsSync(unencoded), `Referenced asset exists on disk: "${unencoded}"`);
});

console.log('='.repeat(80));
if (failures.length === 0) {
    console.log('ALL INTEGRATION ASSERTIONS PASSED! (0 failures)');
} else {
    console.error(`TOTAL FAILURES: ${failures.length}`);
}
console.log('='.repeat(80));
