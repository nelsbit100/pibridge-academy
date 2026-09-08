// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Quiz Data: Real questions for all courses
// ──────────────────────────────────────────────────────────────

import type { Quiz, QuizQuestion } from "./types";

// Helper to create quiz objects
function makeQuiz(id: string, lessonId: string, title: string, questions: QuizQuestion[], opts?: Partial<Quiz>): Quiz {
  return {
    id,
    lessonId,
    title,
    description: `Test your knowledge: ${title}`,
    timeLimitMinutes: 10,
    passingScore: 70,
    maxAttempts: 3,
    questions,
    ...opts,
  };
}

// ════════════════════════════════════════════════════════════════
// NETWORKING FUNDAMENTALS QUIZZES
// ════════════════════════════════════════════════════════════════

export const NF_QUIZ_1: Quiz = makeQuiz("quiz-nf-1-1", "les-nf-1-3", "Networking Basics", [
  {
    id: "q-nf1-1", question: "Which network topology connects every device to a central switch or hub?",
    type: "multiple_choice",
    options: ["Bus topology", "Ring topology", "Star topology", "Mesh topology"],
    correctAnswer: 2, explanation: "In a star topology, every device connects to a central switch or hub. If one link fails, only that device is affected.", points: 1,
  },
  {
    id: "q-nf1-2", question: "In a bus topology, what happens if the main cable is cut?",
    type: "multiple_choice",
    options: ["Only devices past the cut are affected", "The entire network segment goes down", "The network automatically reroutes", "Nothing, it's redundant"],
    correctAnswer: 1, explanation: "Bus topology uses a single shared cable. A break anywhere disrupts the entire segment.", points: 1,
  },
  {
    id: "q-nf1-3", question: "What is the main advantage of a mesh topology?",
    type: "multiple_choice",
    options: ["Low cost", "Simplicity", "Maximum redundancy", "Easy installation"],
    correctAnswer: 2, explanation: "Mesh topology provides multiple paths between devices, offering maximum redundancy. If one link fails, traffic reroutes through other paths.", points: 1,
  },
  {
    id: "q-nf1-4", question: "True or False: The star topology is the most common LAN topology in modern networks.",
    type: "true_false",
    correctAnswer: true, explanation: "Correct. Star topology dominates modern LANs because individual failures don't cascade to other devices.", points: 1,
  },
  {
    id: "q-nf1-5", question: "What does LAN stand for?",
    type: "multiple_choice",
    options: ["Local Area Network", "Large Area Network", "Linked Access Node", "Logical Application Network"],
    correctAnswer: 0, explanation: "LAN stands for Local Area Network, connecting devices within a limited area like an office or campus.", points: 1,
  },
], { passingScore: 80, timeLimitMinutes: 8 });

export const NF_QUIZ_2: Quiz = makeQuiz("quiz-nf-2-1", "les-nf-2-4", "OSI Model", [
  {
    id: "q-nf2-1", question: "Which OSI layer is responsible for routing packets between networks?",
    type: "multiple_choice",
    options: ["Data Link Layer (Layer 2)", "Network Layer (Layer 3)", "Transport Layer (Layer 4)", "Session Layer (Layer 5)"],
    correctAnswer: 1, explanation: "The Network Layer (Layer 3) handles routing and IP addressing. Routers operate at this layer.", points: 1,
  },
  {
    id: "q-nf2-2", question: "At which layer does a switch primarily operate?",
    type: "multiple_choice",
    options: ["Layer 1 — Physical", "Layer 2 — Data Link", "Layer 3 — Network", "Layer 4 — Transport"],
    correctAnswer: 1, explanation: "Traditional switches operate at Layer 2, using MAC addresses to forward frames. Layer 3 switches can also route.", points: 1,
  },
  {
    id: "q-nf2-3", question: "What is the process of adding headers (and trailers) as data moves down the OSI layers called?",
    type: "multiple_choice",
    options: ["Decapsulation", "Encapsulation", "Multiplexing", "Modulation"],
    correctAnswer: 1, explanation: "Encapsulation is the process of wrapping data with protocol information at each layer as it moves down the stack.", points: 1,
  },
  {
    id: "q-nf2-4", question: "Which layer ensures reliable data delivery with acknowledgments and retransmission?",
    type: "multiple_choice",
    options: ["Network Layer", "Transport Layer", "Data Link Layer", "Application Layer"],
    correctAnswer: 1, explanation: "The Transport Layer (TCP) provides reliable delivery through acknowledgments, sequence numbers, and retransmission.", points: 1,
  },
  {
    id: "q-nf2-5", question: "True or False: The Presentation Layer (Layer 6) handles encryption and decryption.",
    type: "true_false",
    correctAnswer: true, explanation: "Correct. The Presentation Layer handles data formatting, compression, and encryption/decryption.", points: 1,
  },
], { passingScore: 70 });

export const NF_FINAL_QUIZ: Quiz = makeQuiz("quiz-nf-final", "les-nf-6-2", "Networking Fundamentals Final Assessment", [
  {
    id: "q-nff-1", question: "What OSI layer do firewalls primarily operate at?",
    type: "multiple_choice",
    options: ["Layer 2", "Layer 3 and Layer 4", "Layer 7 only", "Layer 1"],
    correctAnswer: 1, explanation: "Traditional firewalls operate at Layers 3-4 (network and transport). Next-gen firewalls can also inspect Layer 7.", points: 2,
  },
  {
    id: "q-nff-2", question: "A SYN flood attack targets which part of the TCP handshake?",
    type: "multiple_choice",
    options: ["The ACK", "The initial SYN", "The SYN-ACK", "The FIN"],
    correctAnswer: 1, explanation: "SYN floods send massive SYN packets without completing the handshake, exhausting server resources.", points: 2,
  },
  {
    id: "q-nff-3", question: "What is the purpose of subnetting?",
    type: "multiple_choice",
    options: [
      "To increase internet speed",
      "To divide a network into smaller, manageable segments",
      "To encrypt network traffic",
      "To assign MAC addresses"
    ],
    correctAnswer: 1, explanation: "Subnetting divides a large network into smaller segments for better management, security, and performance.", points: 2,
  },
  {
    id: "q-nff-4", question: "Which Wireshark filter shows only DNS traffic?",
    type: "multiple_choice",
    options: ["tcp.port == 53", "dns", "udp.port == 80", "ip.proto == dns"],
    correctAnswer: 1, explanation: "The 'dns' filter in Wireshark shows all DNS query and response packets.", points: 2,
  },
  {
    id: "q-nff-5", question: "What is the subnet mask for a /24 network?",
    type: "multiple_choice",
    options: ["255.255.0.0", "255.255.255.0", "255.255.255.128", "255.0.0.0"],
    correctAnswer: 1, explanation: "/24 means 24 bits for the network, 8 bits for hosts. That's 255.255.255.0.", points: 1,
  },
  {
    id: "q-nff-6", question: "Describe the TCP three-way handshake in order.",
    type: "short_answer",
    correctAnswer: "SYN, SYN-ACK, ACK",
    explanation: "The client sends SYN, server responds with SYN-ACK, client completes with ACK.",
    points: 3,
  },
  {
    id: "q-nff-7", question: "What is the difference between IDS and IPS?",
    type: "short_answer",
    correctAnswer: "IDS monitors and alerts, IPS monitors and blocks",
    explanation: "IDS (Intrusion Detection System) passively monitors and alerts. IPS (Intrusion Prevention System) actively blocks threats.",
    points: 3,
  },
], { passingScore: 70, timeLimitMinutes: 30, maxAttempts: 2 });

// ════════════════════════════════════════════════════════════════
// LINUX FUNDAMENTALS QUIZZES
// ════════════════════════════════════════════════════════════════

export const LINUX_QUIZ_1: Quiz = makeQuiz("quiz-lf-1-1", "les-lf-1-4", "Filesystem Basics", [
  {
    id: "q-lf1-1", question: "Which directory contains system configuration files in Linux?",
    type: "multiple_choice",
    options: ["/home", "/var", "/etc", "/tmp"],
    correctAnswer: 2, explanation: "/etc contains system-wide configuration files. This is one of the most important directories for security auditing.", points: 1,
  },
  {
    id: "q-lf1-2", question: "What is the purpose of the /proc directory?",
    type: "multiple_choice",
    options: [
      "Stores user process logs",
      "Virtual filesystem for process and kernel information",
      "Contains processor firmware",
      "Stores compiled program binaries"
    ],
    correctAnswer: 1, explanation: "/proc is a virtual filesystem that provides runtime system information. It doesn't exist on disk — it's generated by the kernel.", points: 1,
  },
  {
    id: "q-lf1-3", question: "Which directory is typically used for temporary files that are cleared on reboot?",
    type: "multiple_choice",
    options: ["/var/tmp", "/tmp", "/opt", "/usr/tmp"],
    correctAnswer: 1, explanation: "/tmp is cleared on reboot. /var/tmp persists across reboots. Attackers sometimes use /tmp to store payloads.", points: 1,
  },
  {
    id: "q-lf1-4", question: "True or False: The /bin directory contains essential user command binaries.",
    type: "true_false",
    correctAnswer: true, explanation: "Correct. /bin contains essential binaries like ls, cp, and mv that all users need.", points: 1,
  },
], { passingScore: 75 });

export const LINUX_QUIZ_2: Quiz = makeQuiz("quiz-lf-2-1", "les-lf-2-5", "Users & Permissions", [
  {
    id: "q-lf2-1", question: "What does the permission string 'rwxr-xr--' equal in numeric (octal) form?",
    type: "multiple_choice",
    options: ["754", "764", "654", "755"],
    correctAnswer: 0, explanation: "rwx=7, r-x=5, r--=4. So 754. Owner has full access, group can read/execute, others can only read.", points: 2,
  },
  {
    id: "q-lf2-2", question: "What is the SUID bit used for?",
    type: "multiple_choice",
    options: [
      "Makes a file executable by everyone",
      "Runs the file with the permissions of the file owner",
      "Sets the sticky bit on a directory",
      "Encrypts the file contents"
    ],
    correctAnswer: 1, explanation: "SUID (Set User ID) makes a program execute with the file owner's permissions rather than the running user's. The 'passwd' command uses SUID to write to /etc/shadow.", points: 2,
  },
  {
    id: "q-lf2-3", question: "Which command changes the owner of a file?",
    type: "multiple_choice",
    options: ["chmod", "chown", "chgrp", "usermod"],
    correctAnswer: 1, explanation: "chown changes file ownership. Example: chown user:group file.txt", points: 1,
  },
  {
    id: "q-lf2-4", question: "What security concern exists with world-writable files in system directories?",
    type: "multiple_choice",
    options: [
      "They slow down the system",
      "Any user can modify them, potentially injecting malicious code",
      "They use more disk space",
      "They cannot be deleted"
    ],
    correctAnswer: 1, explanation: "World-writable files in system directories are a serious security risk — any user (including attackers) can modify them.", points: 2,
  },
  {
    id: "q-lf2-5", question: "What does the sticky bit do on a directory like /tmp?",
    type: "multiple_choice",
    options: [
      "Prevents the directory from being deleted",
      "Only the file owner can delete files within it",
      "Makes all files executable",
      "Hides the directory contents"
    ],
    correctAnswer: 1, explanation: "The sticky bit on a directory means only the file owner (and root) can delete files within it. This prevents users from deleting each other's files in shared directories.", points: 2,
  },
], { passingScore: 70 });

// ════════════════════════════════════════════════════════════════
// CYBERSECURITY FUNDAMENTALS QUIZZES
// ════════════════════════════════════════════════════════════════

export const CYBER_QUIZ_1: Quiz = makeQuiz("quiz-cf-1-1", "les-cf-1-4", "Security Principles", [
  {
    id: "q-cf1-1", question: "What does the 'C' in the CIA triad stand for?",
    type: "multiple_choice",
    options: ["Confidentiality", "Compliance", "Configuration", "Continuity"],
    correctAnswer: 0, explanation: "CIA = Confidentiality, Integrity, Availability. The three pillars of information security.", points: 1,
  },
  {
    id: "q-cf1-2", question: "Which of these is NOT a layer of defense in depth?",
    type: "multiple_choice",
    options: ["Physical security", "Network security", "Marketing security", "Data security"],
    correctAnswer: 2, explanation: "Defense in depth layers include physical, network, host, application, data, and human security. 'Marketing security' is not a recognized layer.", points: 1,
  },
  {
    id: "q-cf1-3", question: "In the STRIDE threat model, what does the 'S' stand for?",
    type: "multiple_choice",
    options: ["Spoofing", "Scanning", "SQL Injection", "Spyware"],
    correctAnswer: 0, explanation: "STRIDE = Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.", points: 1,
  },
  {
    id: "q-cf1-4", question: "What does 'Availability' in the CIA triad mean?",
    type: "multiple_choice",
    options: [
      "Data is encrypted at rest",
      "Systems and data are accessible when needed by authorized users",
      "Data cannot be modified without authorization",
      "All actions are logged"
    ],
    correctAnswer: 1, explanation: "Availability ensures that systems, services, and data are accessible to authorized users when they need them.", points: 1,
  },
  {
    id: "q-cf1-5", question: "True or False: A single firewall provides sufficient defense for any network.",
    type: "true_false",
    correctAnswer: false, explanation: "False. Defense in depth requires multiple layers of security. A single firewall is just one layer and can be bypassed.", points: 1,
  },
], { passingScore: 80 });

export const CYBER_QUIZ_CRYPTO: Quiz = makeQuiz("quiz-cf-crypto", "les-cf-4-5", "Cryptography", [
  {
    id: "q-cry-1", question: "What is the key difference between symmetric and asymmetric encryption?",
    type: "multiple_choice",
    options: [
      "Symmetric is faster but uses the same key; asymmetric uses key pairs but is slower",
      "Symmetric uses key pairs; asymmetric uses one key",
      "There is no difference",
      "Asymmetric is only used for hashing"
    ],
    correctAnswer: 0, explanation: "Symmetric encryption uses one shared key (fast, used for bulk data). Asymmetric uses public/private key pairs (slower, used for key exchange and signatures).", points: 2,
  },
  {
    id: "q-cry-2", question: "Which hashing algorithm is currently recommended for password storage?",
    type: "multiple_choice",
    options: ["MD5", "SHA-1", "bcrypt", "Base64"],
    correctAnswer: 2, explanation: "bcrypt includes salt and key stretching, making it resistant to rainbow table and brute force attacks. MD5 and SHA-1 are cryptographically broken. Base64 is encoding, not hashing.", points: 2,
  },
  {
    id: "q-cry-3", question: "What does a digital signature provide?",
    type: "multiple_choice",
    options: [
      "Confidentiality only",
      "Integrity, authenticity, and non-repudiation",
      "Encryption of the full message",
      "Key exchange"
    ],
    correctAnswer: 1, explanation: "Digital signatures prove integrity (data hasn't changed), authenticity (it came from the claimed sender), and non-repudiation (sender can't deny sending it).", points: 2,
  },
  {
    id: "q-cry-4", question: "True or False: SHA-256 is a symmetric encryption algorithm.",
    type: "true_false",
    correctAnswer: false, explanation: "SHA-256 is a cryptographic hash function, not an encryption algorithm. Hashing is one-way; encryption is reversible with the key.", points: 1,
  },
], { passingScore: 75, timeLimitMinutes: 12 });

// ════════════════════════════════════════════════════════════════
// SOC OPERATIONS QUIZZES
// ════════════════════════════════════════════════════════════════

export const SOC_QUIZ_SIEM: Quiz = makeQuiz("quiz-soc-siem", "les-so-2-4", "SIEM Fundamentals", [
  {
    id: "q-soc-1", question: "What does SIEM stand for?",
    type: "multiple_choice",
    options: [
      "Security Information and Event Management",
      "System Intelligence and Error Monitoring",
      "Secure Internet Entry Method",
      "Server Infrastructure and Environment Management"
    ],
    correctAnswer: 0, explanation: "SIEM = Security Information and Event Management. It aggregates logs, correlates events, and generates alerts.", points: 1,
  },
  {
    id: "q-soc-2", question: "Which log source is most critical for detecting command-and-control (C2) traffic?",
    type: "multiple_choice",
    options: ["Web server access logs", "DNS query logs", "Print server logs", "Backup logs"],
    correctAnswer: 1, explanation: "DNS logs reveal when hosts query C2 domains, even if the actual C2 traffic is encrypted. DNS is often the first indicator of compromise.", points: 2,
  },
  {
    id: "q-soc-3", question: "What is a false positive in SIEM context?",
    type: "multiple_choice",
    options: [
      "A real attack that was not detected",
      "An alert that triggers on benign activity",
      "A successful attack",
      "A system crash"
    ],
    correctAnswer: 1, explanation: "A false positive is an alert that fires on legitimate, non-malicious activity. Too many false positives cause alert fatigue.", points: 1,
  },
  {
    id: "q-soc-4", question: "What does CEF stand for in log format context?",
    type: "multiple_choice",
    options: [
      "Common Event Format",
      "Cyber Event Framework",
      "Centralized Error Format",
      "Computer Event File"
    ],
    correctAnswer: 0, explanation: "CEF (Common Event Format) is a standardized log format that includes device info, event details, and severity scores.", points: 1,
  },
], { passingScore: 75 });

export const SOC_QUIZ_INVESTIGATION: Quiz = makeQuiz("quiz-soc-invest", "les-so-4-4", "Incident Investigation", [
  {
    id: "q-si-1", question: "What is the first step when you receive a security alert?",
    type: "multiple_choice",
    options: [
      "Immediately block the source IP",
      "Triage: determine if it's a true positive or false positive",
      "Reboot the affected system",
      "Send an email to the CEO"
    ],
    correctAnswer: 1, explanation: "Triage is the first step. Determine the alert's validity, scope, and severity before taking action.", points: 2,
  },
  {
    id: "q-si-2", question: "Why should you NOT reboot a compromised system immediately?",
    type: "multiple_choice",
    options: [
      "It wastes electricity",
      "You lose volatile evidence (memory, running processes, network connections)",
      "The system might not reboot",
      "It voids the warranty"
    ],
    correctAnswer: 1, explanation: "Volatile evidence in memory (processes, network connections, encryption keys) is lost on reboot. Collect evidence first.", points: 2,
  },
  {
    id: "q-si-3", question: "What is a chain of custody?",
    type: "multiple_choice",
    options: [
      "A list of all system administrators",
      "Documentation showing who handled evidence and when",
      "The order in which servers boot",
      "A firewall rule set"
    ],
    correctAnswer: 1, explanation: "Chain of custody documents the handling of evidence from collection to presentation, ensuring its integrity for legal proceedings.", points: 2,
  },
  {
    id: "q-si-4", question: "What is the difference between containment and eradication?",
    type: "short_answer",
    correctAnswer: "Containment stops the spread; eradication removes the threat",
    explanation: "Containment limits damage (isolate systems, block IPs). Eradication removes the attacker's presence entirely (remove malware, patch vulnerabilities, change credentials).",
    points: 3,
  },
], { passingScore: 75, timeLimitMinutes: 15 });

// ════════════════════════════════════════════════════════════════
// WEB DEVELOPMENT QUIZZES
// ════════════════════════════════════════════════════════════════

export const WEB_QUIZ_HTML: Quiz = makeQuiz("quiz-web-html", "les-wf-1-4", "HTML Basics", [
  {
    id: "q-wh-1", question: "Which HTML5 element represents the main content of a page?",
    type: "multiple_choice",
    options: ["<div>", "<section>", "<main>", "<body>"],
    correctAnswer: 2, explanation: "<main> represents the dominant content of the page body. There should only be one per page.", points: 1,
  },
  {
    id: "q-wh-2", question: "Why should we use semantic HTML instead of just <div> for everything?",
    type: "multiple_choice",
    options: [
      "Semantic elements load faster",
      "Semantic elements improve accessibility and SEO",
      "Semantic elements have better browser support",
      "There is no difference"
    ],
    correctAnswer: 1, explanation: "Semantic HTML helps screen readers navigate, improves SEO ranking, and makes code more readable and maintainable.", points: 1,
  },
  {
    id: "q-wh-3", question: "Which input type provides a date picker on mobile devices?",
    type: "multiple_choice",
    options: ['<input type="text">', '<input type="date">', '<input type="calendar">', '<input type="datetime">'],
    correctAnswer: 1, explanation: 'type="date" triggers the native date picker on mobile devices, providing a better user experience than a text input.', points: 1,
  },
  {
    id: "q-wh-4", question: "What does the 'required' attribute do on a form input?",
    type: "multiple_choice",
    options: [
      "Makes the field read-only",
      "Adds a red border",
      "Prevents form submission if the field is empty",
      "Auto-focuses the field"
    ],
    correctAnswer: 2, explanation: "The required attribute prevents form submission if the field is empty, providing built-in client-side validation.", points: 1,
  },
], { passingScore: 80 });

export const WEB_QUIZ_CSS: Quiz = makeQuiz("quiz-web-css", "les-wf-2-4", "CSS Layout", [
  {
    id: "q-wc-1", question: "Which CSS property creates a flex container?",
    type: "multiple_choice",
    options: ["display: block", "display: flex", "display: grid", "position: flex"],
    correctAnswer: 1, explanation: "display: flex creates a flex container, enabling flexbox layout for its children.", points: 1,
  },
  {
    id: "q-wc-2", question: "What does justify-content: space-between do in flexbox?",
    type: "multiple_choice",
    options: [
      "Centers items horizontally",
      "Distributes items with equal space between them",
      "Aligns items to the left",
      "Stacks items vertically"
    ],
    correctAnswer: 1, explanation: "space-between distributes items evenly, with the first item at the start and the last item at the end.", points: 1,
  },
  {
    id: "q-wc-3", question: "What is the CSS specificity order from lowest to highest?",
    type: "multiple_choice",
    options: [
      "Element < Class < ID < Inline",
      "ID < Element < Class < Inline",
      "Class < ID < Element < Inline",
      "Inline < Element < Class < ID"
    ],
    correctAnswer: 0, explanation: "Specificity order: element selectors (lowest) < class/attribute selectors < ID selectors < inline styles (highest).", points: 2,
  },
], { passingScore: 75 });

export const WEB_QUIZ_JS: Quiz = makeQuiz("quiz-web-js", "les-wf-3-4", "JavaScript Assessment", [
  {
    id: "q-wj-1", question: "What is the correct way to select an element with class 'card'?",
    type: "multiple_choice",
    options: ["document.getElementById('card')", "document.querySelector('.card')", "document.getElement('card')", "document.select('.card')"],
    correctAnswer: 1, explanation: "querySelector('.card') selects the first element with class 'card'. The dot prefix indicates a class selector.", points: 1,
  },
  {
    id: "q-wj-2", question: "What does 'event delegation' mean?",
    type: "multiple_choice",
    options: [
      "Assigning events to every child element",
      "Adding one event listener to a parent and checking event.target",
      "Removing all event listeners",
      "Creating custom events"
    ],
    correctAnswer: 1, explanation: "Event delegation uses a single listener on a parent to handle events for all children. More efficient and works with dynamically added elements.", points: 2,
  },
  {
    id: "q-wj-3", question: "What does the 'async' keyword do in a function declaration?",
    type: "multiple_choice",
    options: [
      "Makes the function run in a separate thread",
      "Makes the function return a Promise and allows using 'await' inside it",
      "Makes the function execute faster",
      "Makes the function private"
    ],
    correctAnswer: 1, explanation: "async functions always return a Promise and allow you to use 'await' inside them for cleaner asynchronous code.", points: 2,
  },
  {
    id: "q-wj-4", question: "Write the JavaScript to fetch JSON data from '/api/users' and log it.",
    type: "short_answer",
    correctAnswer: "fetch('/api/users').then(r => r.json()).then(data => console.log(data))",
    explanation: "The Fetch API returns a Response object. Call .json() to parse the body, then handle the data.",
    points: 3,
  },
], { passingScore: 75, timeLimitMinutes: 15 });

// ════════════════════════════════════════════════════════════════
// REACT QUIZZES
// ════════════════════════════════════════════════════════════════

export const REACT_QUIZ_1: Quiz = makeQuiz("quiz-react-1", "les-rf-2-4", "State Management", [
  {
    id: "q-rf-1", question: "What hook should you use for state that depends on the previous state?",
    type: "multiple_choice",
    options: ["useState", "useReducer", "useRef", "useMemo"],
    correctAnswer: 1, explanation: "useReducer is ideal for complex state logic where the next state depends on the previous one, similar to Redux patterns.", points: 1,
  },
  {
    id: "q-rf-2", question: "When should you use the Context API?",
    type: "multiple_choice",
    options: [
      "For rapidly changing data like cursor position",
      "For global data needed by many components (auth, theme, locale)",
      "As a replacement for all useState calls",
      "For form validation"
    ],
    correctAnswer: 1, explanation: "Context is best for data that doesn't change frequently and is needed by many components. For rapidly changing data, use a state management library.", points: 1,
  },
  {
    id: "q-rf-3", question: "What is 'prop drilling'?",
    type: "multiple_choice",
    options: [
      "Passing props through many component layers to reach a deeply nested component",
      "Injecting props directly into the DOM",
      "Using props to validate types",
      "Creating props dynamically"
    ],
    correctAnswer: 0, explanation: "Prop drilling is when you pass data through many intermediate components that don't need it, just to reach a deeply nested child. Context API solves this.", points: 1,
  },
  {
    id: "q-rf-4", question: "What is the correct way to update state based on the previous state in useState?",
    type: "multiple_choice",
    options: [
      "setCount(count + 1)",
      "setCount(prev => prev + 1)",
      "state.count = state.count + 1",
      "this.setState({count: count + 1})"
    ],
    correctAnswer: 1, explanation: "Using the functional updater form (prev => prev + 1) ensures you're working with the most recent state value, avoiding stale closures.", points: 2,
  },
], { passingScore: 75 });

// ════════════════════════════════════════════════════════════════
// NODE.JS QUIZZES
// ════════════════════════════════════════════════════════════════

export const NODE_QUIZ_AUTH: Quiz = makeQuiz("quiz-node-auth", "les-nb-3-4", "Authentication", [
  {
    id: "q-nb-1", question: "What does JWT stand for?",
    type: "multiple_choice",
    options: ["Java Web Token", "JSON Web Token", "JavaScript Web Transport", "Joint Web Technology"],
    correctAnswer: 1, explanation: "JWT = JSON Web Token. It's a compact, URL-safe means of representing claims between two parties.", points: 1,
  },
  {
    id: "q-nb-2", question: "What are the three parts of a JWT?",
    type: "multiple_choice",
    options: [
      "Header, Body, Footer",
      "Header, Payload, Signature",
      "Key, Token, Hash",
      "Public Key, Private Key, Certificate"
    ],
    correctAnswer: 1, explanation: "JWTs consist of three Base64URL-encoded parts separated by dots: header (algorithm), payload (claims), and signature.", points: 1,
  },
  {
    id: "q-nb-3", question: "Why should JWT secrets never be committed to source code?",
    type: "multiple_choice",
    options: [
      "They make the code harder to read",
      "Anyone with the secret can forge valid tokens and impersonate users",
      "They increase file size",
      "GitHub doesn't support long strings"
    ],
    correctAnswer: 1, explanation: "If a JWT secret is exposed, anyone can create valid tokens for any user. Always use environment variables for secrets.", points: 2,
  },
  {
    id: "q-nb-4", question: "What is the principle of least privilege?",
    type: "multiple_choice",
    options: [
      "Give every user admin access for simplicity",
      "Grant each user/role only the minimum permissions needed to do their job",
      "Disable all permissions by default",
      "Use the same role for everyone"
    ],
    correctAnswer: 1, explanation: "Least privilege means granting only the minimum access necessary. This limits the damage if an account is compromised.", points: 1,
  },
], { passingScore: 75 });

// ════════════════════════════════════════════════════════════════
// CLOUD QUIZZES
// ════════════════════════════════════════════════════════════════

export const CLOUD_QUIZ_COMPUTE: Quiz = makeQuiz("quiz-cloud-compute", "les-cfnd-2-4", "Compute & Networking", [
  {
    id: "q-cl-1", question: "What does VPC stand for?",
    type: "multiple_choice",
    options: ["Virtual Private Cloud", "Very Private Connection", "Virtual Public Channel", "Variable Protocol Config"],
    correctAnswer: 0, explanation: "VPC = Virtual Private Cloud. It's your isolated network in the cloud where you control IP ranges, subnets, and routing.", points: 1,
  },
  {
    id: "q-cl-2", question: "Where should you place database servers in a VPC for security?",
    type: "multiple_choice",
    options: [
      "In the public subnet for easy access",
      "In a private subnet with no direct internet access",
      "Outside the VPC entirely",
      "In the DMZ"
    ],
    correctAnswer: 1, explanation: "Database servers should be in private subnets. Only application servers (in private subnets via a load balancer) should access them.", points: 2,
  },
  {
    id: "q-cl-3", question: "What is the difference between a Security Group and a Network ACL?",
    type: "multiple_choice",
    options: [
      "There is no difference",
      "Security Groups are stateful and instance-level; NACLs are stateless and subnet-level",
      "NACLs are faster than Security Groups",
      "Security Groups only work with EC2"
    ],
    correctAnswer: 1, explanation: "Security Groups are stateful (return traffic automatically allowed) at the instance level. NACLs are stateless (must explicitly allow both directions) at the subnet level.", points: 2,
  },
], { passingScore: 75 });

// ════════════════════════════════════════════════════════════════
// ALL QUIZZES MAP
// ════════════════════════════════════════════════════════════════

export const ALL_QUIZZES: Quiz[] = [
  // Networking
  NF_QUIZ_1, NF_QUIZ_2, NF_FINAL_QUIZ,
  // Linux
  LINUX_QUIZ_1, LINUX_QUIZ_2,
  // Cybersecurity
  CYBER_QUIZ_1, CYBER_QUIZ_CRYPTO,
  // SOC
  SOC_QUIZ_SIEM, SOC_QUIZ_INVESTIGATION,
  // Web Dev
  WEB_QUIZ_HTML, WEB_QUIZ_CSS, WEB_QUIZ_JS,
  // React
  REACT_QUIZ_1,
  // Node.js
  NODE_QUIZ_AUTH,
  // Cloud
  CLOUD_QUIZ_COMPUTE,
];

export const QUIZ_BY_LESSON_ID: Record<string, Quiz> = {};
for (const quiz of ALL_QUIZZES) {
  QUIZ_BY_LESSON_ID[quiz.lessonId] = quiz;
}
