const fs = require('fs');

// Read leya.js
let leyaCode = fs.readFileSync('leya.js', 'utf8');

// Strip IIFE wrapper or export internals for testing
// We replace the IIFE with global exports
const testHarness = `
const window = {
    location: { pathname: '/index.html' },
    __leyaInitialized: false,
    speechSynthesis: { speak: () => {}, cancel: () => {} }
};
const document = {
    readyState: 'complete',
    addEventListener: () => {},
    getElementById: (id) => ({
        addEventListener: () => {},
        setAttribute: () => {},
        removeAttribute: () => {},
        classList: { add: () => {}, remove: () => {}, contains: () => false },
        style: {},
        hidden: false,
        children: []
    }),
    querySelector: () => null,
    querySelectorAll: () => []
};

` + leyaCode.replace('(function () {', 'function runModule() {')
           .replace(/\}\)\(\);?\s*$/, `
    return { KB, INTENTS, detectIntent, buildResponse, getResponse };
}
module.exports = runModule();
`);

fs.writeFileSync('scratch-leya-test.js', testHarness);
const leyaModule = require('./scratch-leya-test.js');

const queries = [
    { q: 'Who is Joshua?', expected: 'about' },
    { q: 'Tell me about Joshua.', expected: 'about' },
    { q: 'Introduce yourself.', expected: 'about' },
    { q: 'What does Joshua do?', expected: 'about' },
    { q: 'Give me an overview.', expected: 'about' },
    { q: 'What is his professional background?', expected: 'experience_general' },
    { q: 'What did Joshua study?', expected: 'education' },
    { q: 'Where did he study?', expected: 'education' },
    { q: 'What is his degree?', expected: 'education' },
    { q: 'Tell me about his education.', expected: 'education' },
    { q: 'What is his specialization?', expected: 'education' },
    { q: 'Does he have an honours degree?', expected: 'education' },
    { q: 'Where does Joshua work?', expected: 'employment' },
    { q: 'What is his current role?', expected: 'employment' },
    { q: 'What experience does he have?', expected: 'experience_general' },
    { q: 'Tell me about his internship.', expected: 'internship_both' },
    { q: 'Where has he worked?', expected: 'experience_general' },
    { q: 'Does he have AI experience?', expected: 'ai_experience' },
    { q: 'Does he have cybersecurity experience?', expected: 'cybersecurity_experience' },
    { q: 'What was his cybersecurity internship?', expected: 'internship_cyber' },
    { q: 'What was his AI internship?', expected: 'internship_ai' },
    { q: 'What did he do at AD Infocom Systems?', expected: 'internship_both' },
    { q: 'What was his pneumonia detection project?', expected: 'internship_ai' },
    { q: 'What are his technical skills?', expected: 'skills_general' },
    { q: 'Which programming languages does he know?', expected: 'skills_general' },
    { q: 'What frameworks does he use?', expected: 'skills_general' },
    { q: 'What databases does he use?', expected: 'skills_general' },
    { q: 'Does he know AWS?', expected: 'skills_aws' },
    { q: 'Does he work with Docker?', expected: 'skills_docker' },
    { q: 'What are his DevOps skills?', expected: 'skills_devops' },
    { q: 'Show me his projects.', expected: 'projects_general' },
    { q: 'What has Joshua developed?', expected: 'projects_general' },
    { q: 'Explain NeuroShield.', expected: 'project_neuroshield' },
    { q: 'Tell me about the AI Email Firewall.', expected: 'project_email_firewall' },
    { q: 'What cybersecurity projects does he have?', expected: 'projects_cybersecurity' },
    { q: 'What IoT projects has he developed?', expected: 'projects_iot' },
    { q: 'Does he have an AI project?', expected: 'projects_ai' },
    { q: 'Show his certifications.', expected: 'certifications_general' },
    { q: 'What certifications does he have?', expected: 'certifications_general' },
    { q: 'Does he have AWS certifications?', expected: 'certifications_aws' },
    { q: 'What MongoDB certifications does he have?', expected: 'certifications_mongodb' },
    { q: 'Show cybersecurity certificates.', expected: 'certifications_cybersecurity' },
    { q: 'Does he have IoT certifications?', expected: 'certifications_iot' },
    { q: 'How can I contact Joshua?', expected: 'contact' },
    { q: 'Where can I reach him?', expected: 'contact' },
    { q: 'Show contact details.', expected: 'contact' },
    { q: 'How can I get in touch?', expected: 'contact' },
    { q: 'What is the weather today in Tokyo?', expected: 'OUT_OF_SCOPE' },
    { q: 'What is his salary?', expected: 'salary' }
];

console.log('='.repeat(80));
console.log('TESTING LEYA INTENT ENGINE');
console.log('='.repeat(80));

let passCount = 0;
let failCount = 0;

for (const item of queries) {
    const detected = leyaModule.detectIntent(item.q);
    const resp = leyaModule.getResponse(item.q);
    const isOutOfScope = resp && resp.startsWith("I'm LEYA, Joshua's portfolio assistant.");
    
    let ok = false;
    if (item.expected === 'OUT_OF_SCOPE' && isOutOfScope) ok = true;
    else if (detected === item.expected) ok = true;
    else if (item.expected === 'internship_both' && (detected === 'internship_both' || detected === 'internship_adinfocom' || detected === 'internship_general')) ok = true;
    else if (item.expected.startsWith('skills_') && detected && detected.startsWith('skills_')) ok = true;

    if (ok) {
        passCount++;
        console.log(`[PASS] "${item.q}" -> ${detected || (isOutOfScope ? 'OUT_OF_SCOPE' : 'none')}`);
    } else {
        failCount++;
        console.log(`[FAIL] "${item.q}"`);
        console.log(`       Expected: ${item.expected}`);
        console.log(`       Detected: ${detected}`);
        console.log(`       Response: ${(resp || '').substring(0, 70).replace(/\\n/g, ' ')}`);
    }
}

console.log('='.repeat(80));
console.log(`Passed: ${passCount} / ${queries.length} | Failed: ${failCount}`);
console.log('='.repeat(80));

// Cleanup scratch file
try { fs.unlinkSync('scratch-leya-test.js'); } catch (_) {}
