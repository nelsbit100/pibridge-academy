// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Course Content: Modules, Lessons, Quizzes,
// Labs, and Capstone Projects for all 12 courses
// ──────────────────────────────────────────────────────────────

import type { Module, Quiz, Lesson } from "./types";

// ════════════════════════════════════════════════════════════════
// NETWORKING FUNDAMENTALS (course-net-fundamentals)
// ════════════════════════════════════════════════════════════════

export const NET_FUND_MODULES: Module[] = [
  {
    id: "mod-nf-1", courseId: "course-net-fundamentals",
    title: "Introduction to Networking", description: "What networks are, how they work, and why they matter for security.", order: 1,
    lessons: [
      { id: "les-nf-1-1", moduleId: "mod-nf-1", title: "What is a Network?", type: "video", durationMinutes: 18, order: 1, isPreview: true },
      { id: "les-nf-1-2", moduleId: "mod-nf-1", title: "Network Topologies", type: "reading", durationMinutes: 12, order: 2, isPreview: true, content: "Network topologies define how devices are arranged and communicate. The main types are star, bus, ring, and mesh. In modern networks, the star topology dominates because individual failures don't cascade. Mesh topologies provide redundancy for critical infrastructure.\n\n**Star Topology**: Every device connects to a central switch or hub. If one link fails, only that device is affected. This is the most common LAN topology today.\n\n**Bus Topology**: All devices share a single cable. Simple but fragile — a cable break brings down the entire segment. Mostly historical now.\n\n**Ring Topology**: Data travels in one direction around a loop. Token Ring (IBM) used this. Offers predictable performance but a single break disrupts the ring.\n\n**Mesh Topology**: Every device connects to every other device (full mesh) or some subset (partial mesh). Provides maximum redundancy but is expensive to wire." },
      { id: "les-nf-1-3", moduleId: "mod-nf-1", title: "Networking Basics Quiz", type: "quiz", durationMinutes: 10, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-nf-2", courseId: "course-net-fundamentals",
    title: "The OSI Model", description: "Understand the seven-layer model that governs network communication.", order: 2,
    lessons: [
      { id: "les-nf-2-1", moduleId: "mod-nf-2", title: "The 7 Layers Explained", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-nf-2-2", moduleId: "mod-nf-2", title: "Data Encapsulation", type: "video", durationMinutes: 20, order: 2, isPreview: false },
      { id: "les-nf-2-3", moduleId: "mod-nf-2", title: "OSI Model Lab", type: "lab", durationMinutes: 30, order: 3, isPreview: false },
      { id: "les-nf-2-4", moduleId: "mod-nf-2", title: "OSI Model Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-nf-3", courseId: "course-net-fundamentals",
    title: "TCP/IP Deep Dive", description: "The protocol suite that powers the internet.", order: 3,
    lessons: [
      { id: "les-nf-3-1", moduleId: "mod-nf-3", title: "IP Addressing & Subnetting", type: "video", durationMinutes: 30, order: 1, isPreview: false },
      { id: "les-nf-3-2", moduleId: "mod-nf-3", title: "TCP vs UDP", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "TCP provides reliable, ordered delivery through handshakes and acknowledgments. UDP trades reliability for speed — critical for VoIP, streaming, and DNS. Security analysts must understand both to detect anomalies.\n\n**TCP Three-Way Handshake**: SYN → SYN-ACK → ACK. This establishes a connection before data flows. Any interruption in this sequence can indicate an attack (SYN flood).\n\n**UDP**: Connectionless. No handshake, no acknowledgment. Faster but packets can arrive out of order or not at all. Attackers use UDP for amplification attacks (DNS amplification, NTP amplification)." },
      { id: "les-nf-3-3", moduleId: "mod-nf-3", title: "DNS & DHCP", type: "video", durationMinutes: 22, order: 3, isPreview: false },
      { id: "les-nf-3-4", moduleId: "mod-nf-3", title: "Subnetting Practice", type: "assignment", durationMinutes: 45, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-nf-4", courseId: "course-net-fundamentals",
    title: "Network Security Basics", description: "Firewalls, IDS/IPS, and securing network traffic.", order: 4,
    lessons: [
      { id: "les-nf-4-1", moduleId: "mod-nf-4", title: "Firewalls & ACLs", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-nf-4-2", moduleId: "mod-nf-4", title: "IDS vs IPS", type: "reading", durationMinutes: 12, order: 2, isPreview: false, content: "Intrusion Detection Systems passively monitor traffic and alert on suspicious patterns. Intrusion Prevention Systems actively block detected threats. Both are essential in a layered defense strategy.\n\n**IDS Deployment**: Typically sits on a span/mirror port or inline. Generates alerts but does not block traffic. Useful for monitoring and forensics.\n\n**IPS Deployment**: Inline between network segments. Can drop packets, reset connections, or block IPs. Higher risk of false positives disrupting legitimate traffic." },
      { id: "les-nf-4-3", moduleId: "mod-nf-4", title: "Firewall Configuration Lab", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-nf-5", courseId: "course-net-fundamentals",
    title: "Packet Analysis", description: "Capture and analyze network traffic with Wireshark.", order: 5,
    lessons: [
      { id: "les-nf-5-1", moduleId: "mod-nf-5", title: "Wireshark Fundamentals", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-nf-5-2", moduleId: "mod-nf-5", title: "Reading Packet Captures", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "Every packet tells a story. Learn to identify protocol headers, spot anomalies, filter by IP/port, and reconstruct TCP streams. This is the foundational skill of network forensics.\n\n**Key Filters**:\n- `ip.addr == 192.168.1.100` — Traffic to/from a specific host\n- `tcp.port == 443` — HTTPS traffic\n- `dns` — All DNS queries\n- `tcp.flags.syn == 1 && tcp.flags.ack == 0` — New TCP connections (SYN only)\n\n**Red Flags**: Unusually large DNS responses (possible data exfiltration), traffic on non-standard ports, repeated connection attempts to the same host." },
      { id: "les-nf-5-3", moduleId: "mod-nf-5", title: "Packet Analysis Lab", type: "lab", durationMinutes: 45, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-nf-6", courseId: "course-net-fundamentals",
    title: "Network Security Capstone", description: "Apply everything you've learned in a real-world scenario.", order: 6,
    lessons: [
      { id: "les-nf-6-1", moduleId: "mod-nf-6", title: "Capstone: Secure a Small Business Network", type: "project", durationMinutes: 180, order: 1, isPreview: false },
      { id: "les-nf-6-2", moduleId: "mod-nf-6", title: "Final Assessment", type: "quiz", durationMinutes: 30, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// LINUX FUNDAMENTALS (course-linux-fundamentals)
// ════════════════════════════════════════════════════════════════

export const LINUX_FUND_MODULES: Module[] = [
  {
    id: "mod-lf-1", courseId: "course-linux-fundamentals",
    title: "Linux & the Command Line", description: "Navigate the filesystem and understand the Linux philosophy.", order: 1,
    lessons: [
      { id: "les-lf-1-1", moduleId: "mod-lf-1", title: "Why Linux Matters for Security", type: "video", durationMinutes: 15, order: 1, isPreview: true },
      { id: "les-lf-1-2", moduleId: "mod-lf-1", title: "The Linux Filesystem Hierarchy", type: "reading", durationMinutes: 18, order: 2, isPreview: false, content: "Linux follows a strict filesystem hierarchy defined by the Filesystem Hierarchy Standard (FHS).\n\n**Key Directories**:\n- `/` — Root of the filesystem\n- `/home` — User home directories\n- `/etc` — System configuration files\n- `/var` — Variable data (logs, caches)\n- `/tmp` — Temporary files (wiped on reboot)\n- `/usr` — User programs and libraries\n- `/bin`, `/sbin` — Essential binaries\n- `/proc` — Virtual filesystem for process/kernel info\n- `/dev` — Device files\n\n**Security Note**: Understanding file locations is critical for forensics. Attackers often hide payloads in `/tmp`, `/var/tmp`, or compromise `/etc` config files." },
      { id: "les-lf-1-3", moduleId: "mod-lf-1", title: "Essential Commands Lab", type: "lab", durationMinutes: 30, order: 3, isPreview: false },
      { id: "les-lf-1-4", moduleId: "mod-lf-1", title: "Filesystem Basics Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-lf-2", courseId: "course-linux-fundamentals",
    title: "Users, Permissions & Processes", description: "Manage access control and running services.", order: 2,
    lessons: [
      { id: "les-lf-2-1", moduleId: "mod-lf-2", title: "User & Group Management", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-lf-2-2", moduleId: "mod-lf-2", title: "File Permissions Deep Dive", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "Linux permissions use a model of Owner / Group / Others with Read (4), Write (2), Execute (1) bits.\n\n**Permission Notation**:\n- `rwxr-xr--` = 754\n- `rw-r--r--` = 644\n- `rwx------` = 700\n\n**Special Permissions**:\n- **SUID (4)**: Execute as file owner (e.g., `passwd` uses SUID to write to `/etc/shadow`)\n- **SGID (2)**: Execute as file group; for directories, new files inherit group\n- **Sticky Bit (1)**: Only file owner can delete (e.g., `/tmp`)\n\n**Security Red Flags**: World-writable files in system directories, SUID binaries that shouldn't exist, files owned by unexpected users." },
      { id: "les-lf-2-3", moduleId: "mod-lf-2", title: "Process Management", type: "video", durationMinutes: 20, order: 3, isPreview: false },
      { id: "les-lf-2-4", moduleId: "mod-lf-2", title: "Permissions Lab", type: "lab", durationMinutes: 35, order: 4, isPreview: false },
      { id: "les-lf-2-5", moduleId: "mod-lf-2", title: "Users & Permissions Quiz", type: "quiz", durationMinutes: 10, order: 5, isPreview: false },
    ],
  },
  {
    id: "mod-lf-3", courseId: "course-linux-fundamentals",
    title: "Shell Scripting & Automation", description: "Write scripts to automate system tasks.", order: 3,
    lessons: [
      { id: "les-lf-3-1", moduleId: "mod-lf-3", title: "Bash Scripting Fundamentals", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-lf-3-2", moduleId: "mod-lf-3", title: "Variables, Conditionals & Loops", type: "reading", durationMinutes: 18, order: 2, isPreview: false, content: "Shell scripts combine commands with logic to automate repetitive tasks.\n\n**Variables**: `NAME=\"Kofi\"` (no spaces around `=`)\n**Conditionals**: `if [ \"$AGE\" -gt 18 ]; then echo \"Adult\"; fi`\n**Loops**: `for file in *.log; do echo \"$file\"; done`\n**Functions**: `check_service() { systemctl is-active $1; }`\n\n**Security Scripts**: Write scripts to check for failed SSH logins, monitor disk usage, scan for world-writable files, or audit user accounts." },
      { id: "les-lf-3-3", moduleId: "mod-lf-3", title: "Scripting Lab", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
      { id: "les-lf-3-4", moduleId: "mod-lf-3", title: "Shell Scripting Assignment", type: "assignment", durationMinutes: 60, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-lf-4", courseId: "course-linux-fundamentals",
    title: "Networking & Services on Linux", description: "Configure networking and manage daemons.", order: 4,
    lessons: [
      { id: "les-lf-4-1", moduleId: "mod-lf-4", title: "Linux Networking Commands", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-lf-4-2", moduleId: "mod-lf-4", title: "systemd & Service Management", type: "video", durationMinutes: 18, order: 2, isPreview: false },
      { id: "les-lf-4-3", moduleId: "mod-lf-4", title: "Firewall with iptables/nftables", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
      { id: "les-lf-4-4", moduleId: "mod-lf-4", title: "Networking Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-lf-5", courseId: "course-linux-fundamentals",
    title: "Linux Security Hardening", description: "Lock down a Linux system for production use.", order: 5,
    lessons: [
      { id: "les-lf-5-1", moduleId: "mod-lf-5", title: "SSH Hardening", type: "reading", durationMinutes: 15, order: 1, isPreview: false, content: "SSH is the most common remote access method and the most targeted.\n\n**Hardening Steps**:\n1. Disable root login: `PermitRootLogin no`\n2. Use key-based auth only: `PasswordAuthentication no`\n3. Change default port: `Port 2222`\n4. Use AllowUsers/AllowGroups\n5. Set login grace time and max attempts\n6. Enable logging\n\n**Additional Steps**: Install fail2ban, use UFW or nftables, disable unused services, apply security updates regularly." },
      { id: "les-lf-5-2", moduleId: "mod-lf-5", title: "Linux Capstone Project", type: "project", durationMinutes: 120, order: 2, isPreview: false },
      { id: "les-lf-5-3", moduleId: "mod-lf-5", title: "Final Assessment", type: "quiz", durationMinutes: 25, order: 3, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// CYBERSECURITY FUNDAMENTALS (course-cyber-fundamentals)
// ════════════════════════════════════════════════════════════════

export const CYBER_FUND_MODULES: Module[] = [
  {
    id: "mod-cf-1", courseId: "course-cyber-fundamentals",
    title: "Security Foundations", description: "Core principles: CIA triad, defense in depth, threat modelling.", order: 1,
    lessons: [
      { id: "les-cf-1-1", moduleId: "mod-cf-1", title: "The CIA Triad", type: "video", durationMinutes: 20, order: 1, isPreview: true },
      { id: "les-cf-1-2", moduleId: "mod-cf-1", title: "Defense in Depth", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "Defense in depth means layering multiple security controls so that if one fails, another catches the threat.\n\n**Layers**:\n1. **Physical**: Locked doors, security cameras, badge access\n2. **Network**: Firewalls, segmentation, IDS/IPS\n3. **Host**: Endpoint protection, OS hardening, patch management\n4. **Application**: Input validation, secure coding, WAF\n5. **Data**: Encryption, access controls, classification\n6. **Human**: Security awareness training, phishing simulations\n\nNo single layer is sufficient. Each adds cost and complexity but reduces risk." },
      { id: "les-cf-1-3", moduleId: "mod-cf-1", title: "Threat Modelling with STRIDE", type: "video", durationMinutes: 25, order: 3, isPreview: false },
      { id: "les-cf-1-4", moduleId: "mod-cf-1", title: "Security Principles Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-cf-2", courseId: "course-cyber-fundamentals",
    title: "The Threat Landscape", description: "Who attacks, why they attack, and how.", order: 2,
    lessons: [
      { id: "les-cf-2-1", moduleId: "mod-cf-2", title: "Threat Actors & Motivations", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-cf-2-2", moduleId: "mod-cf-2", title: "Attack Vectors & Surfaces", type: "reading", durationMinutes: 18, order: 2, isPreview: false, content: "**Threat Actors**:\n- **Script Kiddies**: Use existing tools, limited skill\n- **Hacktivists**: Political/social motivation (Anonymous)\n- **Organized Crime**: Financial gain (ransomware, fraud)\n- **Nation-States**: Espionage, sabotage (APT groups)\n- **Insiders**: Disgruntled employees, compromised accounts\n\n**Attack Vectors**:\n- Phishing / Social Engineering\n- Exploiting unpatched vulnerabilities\n- Credential stuffing / brute force\n- Supply chain compromise\n- Physical access" },
      { id: "les-cf-2-3", moduleId: "mod-cf-2", title: "Malware Deep Dive", type: "video", durationMinutes: 28, order: 3, isPreview: false },
      { id: "les-cf-2-4", moduleId: "mod-cf-2", title: "Threat Landscape Lab", type: "lab", durationMinutes: 30, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-cf-3", courseId: "course-cyber-fundamentals",
    title: "Access Control & Authentication", description: "Identity, authentication, and authorization mechanisms.", order: 3,
    lessons: [
      { id: "les-cf-3-1", moduleId: "mod-cf-3", title: "Authentication Factors", type: "video", durationMinutes: 18, order: 1, isPreview: false },
      { id: "les-cf-3-2", moduleId: "mod-cf-3", title: "Multi-Factor Authentication", type: "reading", durationMinutes: 12, order: 2, isPreview: false, content: "MFA requires two or more independent factors: something you know (password), something you have (phone/token), something you are (biometric).\n\n**MFA Methods**:\n- **SMS OTP**: Convenient but vulnerable to SIM swapping\n- **Authenticator Apps (TOTP)**: Time-based codes, better security\n- **Hardware Keys (FIDO2/WebAuthn)**: Phishing-resistant\n- **Biometrics**: Fingerprint, face recognition\n\n**Best Practice**: Enforce MFA for all privileged accounts. Prefer hardware keys or authenticator apps over SMS." },
      { id: "les-cf-3-3", moduleId: "mod-cf-3", title: "Password Security", type: "video", durationMinutes: 15, order: 3, isPreview: false },
      { id: "les-cf-3-4", moduleId: "mod-cf-3", title: "Access Control Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-cf-4", courseId: "course-cyber-fundamentals",
    title: "Cryptography Essentials", description: "Encryption, hashing, and digital signatures.", order: 4,
    lessons: [
      { id: "les-cf-4-1", moduleId: "mod-cf-4", title: "Symmetric vs Asymmetric Encryption", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-cf-4-2", moduleId: "mod-cf-4", title: "Hashing & Digital Signatures", type: "reading", durationMinutes: 18, order: 2, isPreview: false, content: "**Hashing** converts data to a fixed-size fingerprint. Same input always produces the same hash.\n- **MD5**: Broken, 128-bit, do not use for security\n- **SHA-1**: Deprecated for certificates, 160-bit\n- **SHA-256**: Current standard, 256-bit\n- **bcrypt/scrypt**: Password hashing with salt and key stretching\n\n**Digital Signatures** combine hashing with asymmetric encryption: hash the message, encrypt the hash with your private key. Anyone can verify with your public key. This provides integrity, authenticity, and non-repudiation." },
      { id: "les-cf-4-3", moduleId: "mod-cf-4", title: "PKI & Certificates", type: "video", durationMinutes: 20, order: 3, isPreview: false },
      { id: "les-cf-4-4", moduleId: "mod-cf-4", title: "Cryptography Lab", type: "lab", durationMinutes: 35, order: 4, isPreview: false },
      { id: "les-cf-4-5", moduleId: "mod-cf-4", title: "Cryptography Quiz", type: "quiz", durationMinutes: 12, order: 5, isPreview: false },
    ],
  },
  {
    id: "mod-cf-5", courseId: "course-cyber-fundamentals",
    title: "Network Security", description: "Firewalls, segmentation, and secure communications.", order: 5,
    lessons: [
      { id: "les-cf-5-1", moduleId: "mod-cf-5", title: "Network Security Architecture", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-cf-5-2", moduleId: "mod-cf-5", title: "VPNs & Secure Tunnels", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "**VPN Types**:\n- **Site-to-Site**: Connects entire networks (IPSec)\n- **Remote Access**: Individual users (OpenVPN, WireGuard)\n\n**VPN Protocols**:\n- **IPSec**: Layer 3, used for site-to-site. Two modes: Transport (host-to-host) and Tunnel (network-to-network)\n- **OpenVPN**: Layer 4, SSL/TLS-based, flexible\n- **WireGuard**: Modern, fast, minimal codebase\n\n**Zero Trust**: The modern approach says 'never trust, always verify.' VPN gives network access; Zero Trust verifies every request." },
      { id: "les-cf-5-3", moduleId: "mod-cf-5", title: "Network Security Lab", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-cf-6", courseId: "course-cyber-fundamentals",
    title: "Security Operations Basics", description: "Logging, monitoring, and incident response foundations.", order: 6,
    lessons: [
      { id: "les-cf-6-1", moduleId: "mod-cf-6", title: "Security Logging & Monitoring", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-cf-6-2", moduleId: "mod-cf-6", title: "Incident Response Lifecycle", type: "reading", durationMinutes: 20, order: 2, isPreview: false, content: "The NIST Incident Response Lifecycle has 4 phases:\n\n1. **Preparation**: Create IR plans, train teams, deploy tools\n2. **Detection & Analysis**: Identify incidents, determine scope, assign priority\n3. **Containment, Eradication, Recovery**: Stop the bleeding, remove the threat, restore operations\n4. **Post-Incident Activity**: Lessons learned, update defenses\n\n**Containment Strategies**:\n- Short-term: Isolate affected systems (disconnect network, disable accounts)\n- Long-term: Apply patches, change credentials, rebuild systems\n\n**Key Principle**: Preserve evidence. Do not reboot, do not delete logs, do not patch until evidence is collected." },
      { id: "les-cf-6-3", moduleId: "mod-cf-6", title: "Vulnerability Scanning", type: "lab", durationMinutes: 35, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-cf-7", courseId: "course-cyber-fundamentals",
    title: "Security Fundamentals Capstone", description: "Comprehensive security assessment project.", order: 7,
    lessons: [
      { id: "les-cf-7-1", moduleId: "mod-cf-7", title: "Capstone: Security Assessment Report", type: "project", durationMinutes: 240, order: 1, isPreview: false },
      { id: "les-cf-7-2", moduleId: "mod-cf-7", title: "Final Assessment", type: "quiz", durationMinutes: 30, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// SOC OPERATIONS (course-soc-operations)
// ════════════════════════════════════════════════════════════════

export const SOC_OPS_MODULES: Module[] = [
  {
    id: "mod-so-1", courseId: "course-soc-operations",
    title: "The Security Operations Center", description: "SOC structure, roles, and daily operations.", order: 1,
    lessons: [
      { id: "les-so-1-1", moduleId: "mod-so-1", title: "SOC Structure & Roles", type: "video", durationMinutes: 20, order: 1, isPreview: true },
      { id: "les-so-1-2", moduleId: "mod-so-1", title: "SOC Tiers & Workflow", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "**SOC Tier 1 (Alert Triage)**:\n- Monitor dashboards and alert queues\n- Perform initial triage (false positive vs true positive)\n- Escalate confirmed incidents to Tier 2\n- Document everything\n\n**SOC Tier 2 (Incident Investigation)**:\n- Deep-dive analysis of escalated alerts\n- Correlate across multiple data sources\n- Contain threats\n- Write detailed incident reports\n\n**SOC Tier 3 (Advanced Threat hunting)**:\n- Proactive threat hunting\n- Malware reverse engineering\n- Custom detection rule development\n- Forensics and root cause analysis" },
      { id: "les-so-1-3", moduleId: "mod-so-1", title: "SOC Metrics & KPIs", type: "video", durationMinutes: 18, order: 3, isPreview: false },
      { id: "les-so-1-4", moduleId: "mod-so-1", title: "SOC Overview Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-so-2", courseId: "course-soc-operations",
    title: "SIEM Fundamentals", description: "Deploy and configure SIEM platforms for log aggregation and alerting.", order: 2,
    lessons: [
      { id: "les-so-2-1", moduleId: "mod-so-2", title: "What is a SIEM?", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-so-2-2", moduleId: "mod-so-2", title: "Log Sources & Parsers", type: "reading", durationMinutes: 18, order: 2, isPreview: false, content: "**Essential Log Sources**:\n- **Firewall**: Connection logs, blocked/allowed traffic\n- **IDS/IPS**: Alert signatures, triggered rules\n- **Authentication**: Active Directory, LDAP, RADIUS\n- **Endpoint**: EDR telemetry, process execution\n- **DNS**: Query logs (critical for detecting C2 and exfiltration)\n- **Web Proxy**: URL categories, user agents\n- **Email**: Spam/phishing detections\n\n**Log Format Standards**: CEF (Common Event Format), LEEF, Syslog, JSON\n\n**Parsing**: Extract fields (src_ip, dst_port, username) from raw logs into searchable, filterable data." },
      { id: "les-so-2-3", moduleId: "mod-so-2", title: "Splunk Basics Lab", type: "lab", durationMinutes: 45, order: 3, isPreview: false },
      { id: "les-so-2-4", moduleId: "mod-so-2", title: "SIEM Fundamentals Quiz", type: "quiz", durationMinutes: 12, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-so-3", courseId: "course-soc-operations",
    title: "Detection Engineering", description: "Write effective detection rules and use cases.", order: 3,
    lessons: [
      { id: "les-so-3-1", moduleId: "mod-so-3", title: "Detection Rule Anatomy", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-so-3-2", moduleId: "mod-so-3", title: "MITRE ATT&CK Framework", type: "reading", durationMinutes: 20, order: 2, isPreview: false, content: "MITRE ATT&CK is a knowledge base of adversary tactics, techniques, and procedures (TTPs).\n\n**Structure**:\n- **Tactics** (columns): The adversary's goals (Reconnaissance, Initial Access, Execution, etc.)\n- **Techniques** (cells): How they achieve goals (Phishing, PowerShell, Lateral Movement)\n- **Sub-techniques**: Specific methods within a technique\n- **Mitigations**: Defenses against each technique\n- **Detections**: Data sources and analytics to detect each technique\n\n**Use for Detection Engineering**: Map your detections to ATT&CK to identify coverage gaps. If you have no detections for a technique your threat actors use, that's a priority." },
      { id: "les-so-3-3", moduleId: "mod-so-3", title: "Writing SIEM Rules Lab", type: "lab", durationMinutes: 45, order: 3, isPreview: false },
      { id: "les-so-3-4", moduleId: "mod-so-3", title: "Detection Engineering Assignment", type: "assignment", durationMinutes: 60, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-so-4", courseId: "course-soc-operations",
    title: "Incident Investigation", description: "Triage, investigate, and contain security incidents.", order: 4,
    lessons: [
      { id: "les-so-4-1", moduleId: "mod-so-4", title: "Alert Triage Process", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-so-4-2", moduleId: "mod-so-4", title: "Investigation Methodology", type: "reading", durationMinutes: 22, order: 2, isPreview: false, content: "**Investigation Steps**:\n1. **Scope**: What systems, users, and data are affected?\n2. **Timeline**: When did the activity start? What happened first?\n3. **Indicators**: IPs, domains, file hashes, user agents\n4. **Impact**: Data accessed? Systems compromised? Lateral movement?\n5. **Root Cause**: How did the attacker get in?\n\n**Evidence Collection**:\n- Memory dump (before reboot)\n- Disk image or key files\n- Network captures\n- Log exports (with chain of custody)\n- Screenshots of suspicious activity\n\n**Documentation**: Write as if your report will be read in court. Be factual, precise, and cite evidence." },
      { id: "les-so-4-3", moduleId: "mod-so-4", title: "Investigation Lab: Phishing Case", type: "lab", durationMinutes: 60, order: 3, isPreview: false },
      { id: "les-so-4-4", moduleId: "mod-so-4", title: "Investigation Quiz", type: "quiz", durationMinutes: 12, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-so-5", courseId: "course-soc-operations",
    title: "Threat Intelligence", description: "Use threat intel to improve detection and response.", order: 5,
    lessons: [
      { id: "les-so-5-1", moduleId: "mod-so-5", title: "Threat Intelligence Fundamentals", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-so-5-2", moduleId: "mod-so-5", title: "IOCs vs TTPs", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "**Indicators of Compromise (IOCs)**: Technical artifacts — IP addresses, domains, file hashes, URLs. Useful but ephemeral; attackers change infrastructure frequently.\n\n**Tactics, Techniques, and Procedures (TTPs)**: How attackers operate. More durable than IOCs. A phishing technique remains valid even when the specific phishing domain changes.\n\n**Intelligence Sources**:\n- Open Source (OSINT): VirusTotal, AlienVault OTX, MISP\n- Commercial: Recorded Future, Mandiant\n- Government: CISA alerts, national CERTs\n- Industry ISACs: Financial ISAC, Healthcare ISAC\n\n**STIX/TAXII**: Standards for sharing threat intelligence in machine-readable formats." },
      { id: "les-so-5-3", moduleId: "mod-so-5", title: "Threat Intel Lab", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-so-6", courseId: "course-soc-operations",
    title: "Incident Response in Practice", description: "Execute real-world incident response procedures.", order: 6,
    lessons: [
      { id: "les-so-6-1", moduleId: "mod-so-6", title: "IR Playbooks", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-so-6-2", moduleId: "mod-so-6", title: "Communication During Incidents", type: "reading", durationMinutes: 12, order: 2, isPreview: false, content: "Clear communication during incidents prevents confusion and accelerates response.\n\n**Audiences**:\n- **Technical team**: Detailed technical indicators, containment steps\n- **Management**: Business impact, timeline, resource needs\n- **Legal/Compliance**: Regulatory notification requirements\n- **Customers/Public**: If data breach, coordinate with legal on messaging\n\n**Communication Rules**:\n1. Use out-of-band channels if email is compromised\n2. Establish a war room (physical or virtual)\n3. Designate a single point of contact\n4. Update status at regular intervals\n5. Document all decisions and rationale" },
      { id: "les-so-6-3", moduleId: "mod-so-6", title: "Ransomware Response Simulation", type: "lab", durationMinutes: 90, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-so-7", courseId: "course-soc-operations",
    title: "SOC Reporting & Continuous Improvement", description: "Write reports and improve SOC operations.", order: 7,
    lessons: [
      { id: "les-so-7-1", moduleId: "mod-so-7", title: "Incident Report Writing", type: "video", durationMinutes: 18, order: 1, isPreview: false },
      { id: "les-so-7-2", moduleId: "mod-so-7", title: "SOC Performance Metrics", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "**Key SOC Metrics**:\n- **MTTD** (Mean Time to Detect): How quickly threats are identified\n- **MTTR** (Mean Time to Respond): How quickly threats are contained\n- **False Positive Rate**: % of alerts that are not real incidents\n- **Alert Volume**: Total alerts per day/week\n- **Coverage**: % of MITRE ATT&CK techniques with detections\n\n**Improvement Cycle**:\n1. Measure current performance\n2. Identify gaps (coverage, speed, accuracy)\n3. Tune detection rules\n4. Automate repetitive tasks\n5. Train analysts on new threats\n6. Re-measure" },
      { id: "les-so-7-3", moduleId: "mod-so-7", title: "SOC Capstone: Full Incident Simulation", type: "project", durationMinutes: 240, order: 3, isPreview: false },
      { id: "les-so-7-4", moduleId: "mod-so-7", title: "Final Assessment", type: "quiz", durationMinutes: 30, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-so-8", courseId: "course-soc-operations",
    title: "Professional Development", description: "Career preparation and portfolio building.", order: 8,
    lessons: [
      { id: "les-so-8-1", moduleId: "mod-so-8", title: "Building Your SOC Portfolio", type: "reading", durationMinutes: 15, order: 1, isPreview: false, content: "Your portfolio proves you can do the work.\n\n**Portfolio Contents**:\n1. Incident investigation reports (anonymized)\n2. Detection rules you've written (with explanations)\n3. Threat hunting queries and findings\n4. SIEM dashboard designs\n5. Incident response playbooks you've contributed to\n6. Lab work and simulations\n\n**Presentation**: Host on GitHub or a personal site. Each entry should include: the problem, your approach, the tools used, the outcome, and lessons learned." },
      { id: "les-so-8-2", moduleId: "mod-so-8", title: "SOC Career Paths", type: "video", durationMinutes: 12, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// WEB DEVELOPMENT FUNDAMENTALS (course-web-fundamentals)
// ════════════════════════════════════════════════════════════════

export const WEB_FUND_MODULES: Module[] = [
  {
    id: "mod-wf-1", courseId: "course-web-fundamentals",
    title: "HTML Foundations", description: "Structure the web with semantic HTML5.", order: 1,
    lessons: [
      { id: "les-wf-1-1", moduleId: "mod-wf-1", title: "How the Web Works", type: "video", durationMinutes: 15, order: 1, isPreview: true },
      { id: "les-wf-1-2", moduleId: "mod-wf-1", title: "Semantic HTML5", type: "reading", durationMinutes: 20, order: 2, isPreview: false, content: "HTML5 provides semantic elements that describe content meaning.\n\n**Key Semantic Elements**:\n- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`\n- `<figure>` and `<figcaption>` for images with captions\n- `<time>` for dates and times\n- `<address>` for contact information\n\n**Why It Matters**: Screen readers use semantic HTML to navigate pages. Search engines use it to understand content structure. It's not just about looks — it's about meaning.\n\n**Forms**: `<input type=\"email\">`, `<input type=\"tel\">`, `<required>`, `<pattern>` provide built-in validation and mobile keyboard optimization." },
      { id: "les-wf-1-3", moduleId: "mod-wf-1", title: "HTML Lab: Build a Portfolio Page", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
      { id: "les-wf-1-4", moduleId: "mod-wf-1", title: "HTML Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-wf-2", courseId: "course-web-fundamentals",
    title: "CSS Styling", description: "Style pages with modern CSS techniques.", order: 2,
    lessons: [
      { id: "les-wf-2-1", moduleId: "mod-wf-2", title: "CSS Selectors & Specificity", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-wf-2-2", moduleId: "mod-wf-2", title: "Flexbox & Grid Layout", type: "reading", durationMinutes: 25, order: 2, isPreview: false, content: "**Flexbox** (one-dimensional):\n```css\n.container { display: flex; justify-content: space-between; align-items: center; }\n```\nPerfect for navbars, card rows, centering content.\n\n**Grid** (two-dimensional):\n```css\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }\n```\nPerfect for page layouts, dashboards, complex alignments.\n\n**CSS Variables**: `--primary: #f59e0b;` defined on `:root`, used with `var(--primary)`. Enables theming and consistency.\n\n**Responsive Design**: Use `@media (max-width: 768px)` to adapt layouts. Mobile-first means starting with mobile styles and adding complexity for larger screens." },
      { id: "les-wf-2-3", moduleId: "mod-wf-2", title: "CSS Lab: Responsive Landing Page", type: "lab", durationMinutes: 45, order: 3, isPreview: false },
      { id: "les-wf-2-4", moduleId: "mod-wf-2", title: "CSS Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-wf-3", courseId: "course-web-fundamentals",
    title: "JavaScript Essentials", description: "Make pages interactive with vanilla JavaScript.", order: 3,
    lessons: [
      { id: "les-wf-3-1", moduleId: "mod-wf-3", title: "Variables, Types & Functions", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-wf-3-2", moduleId: "mod-wf-3", title: "DOM Manipulation", type: "reading", durationMinutes: 20, order: 2, isPreview: false, content: "The Document Object Model (DOM) is a tree of objects representing the page.\n\n**Core DOM Methods**:\n- `document.querySelector('.card')` — Select elements\n- `element.textContent = 'Hello'` — Change text\n- `element.classList.add('active')` — Toggle classes\n- `element.addEventListener('click', handler)` — Handle events\n\n**Event Delegation**: Instead of adding listeners to every item, add one listener to the parent and check `event.target`. More efficient, works with dynamically added elements.\n\n**Fetch API**: `const res = await fetch('/api/data'); const data = await res.json();` — Load data from servers asynchronously." },
      { id: "les-wf-3-3", moduleId: "mod-wf-3", title: "JavaScript Lab: Interactive Quiz App", type: "lab", durationMinutes: 50, order: 3, isPreview: false },
      { id: "les-wf-3-4", moduleId: "mod-wf-3", title: "JavaScript Assignment", type: "assignment", durationMinutes: 60, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-wf-4", courseId: "course-web-fundamentals",
    title: "Browser Developer Tools", description: "Debug and inspect using browser DevTools.", order: 4,
    lessons: [
      { id: "les-wf-4-1", moduleId: "mod-wf-4", title: "Chrome DevTools Deep Dive", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-wf-4-2", moduleId: "mod-wf-4", title: "Network & Performance Tab", type: "lab", durationMinutes: 30, order: 2, isPreview: false },
      { id: "les-wf-4-3", moduleId: "mod-wf-4", title: "DevTools Quiz", type: "quiz", durationMinutes: 8, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-wf-5", courseId: "course-web-fundamentals",
    title: "Web Security Basics", description: "Common web vulnerabilities and how to prevent them.", order: 5,
    lessons: [
      { id: "les-wf-5-1", moduleId: "mod-wf-5", title: "OWASP Top 10 Overview", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-wf-5-2", moduleId: "mod-wf-5", title: "XSS & CSRF Explained", type: "reading", durationMinutes: 18, order: 2, isPreview: false, content: "**Cross-Site Scripting (XSS)**: Injecting malicious scripts into pages viewed by others.\n- **Stored XSS**: Malicious script saved in database (e.g., forum post)\n- **Reflected XSS**: Script in URL parameter reflected back\n- **DOM XSS**: Script executes in client-side JavaScript\n\n**Prevention**: Sanitize all user input, use Content Security Policy (CSP) headers, encode output, use frameworks that auto-escape.\n\n**CSRF**: tricking a logged-in user into making unintended requests. Prevent with CSRF tokens, SameSite cookies, and checking Origin headers." },
      { id: "les-wf-5-3", moduleId: "mod-wf-5", title: "Web Security Lab", type: "lab", durationMinutes: 35, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-wf-6", courseId: "course-web-fundamentals",
    title: "Web Dev Capstone", description: "Build a complete multi-page website.", order: 6,
    lessons: [
      { id: "les-wf-6-1", moduleId: "mod-wf-6", title: "Capstone: Portfolio Website", type: "project", durationMinutes: 180, order: 1, isPreview: false },
      { id: "les-wf-6-2", moduleId: "mod-wf-6", title: "Final Assessment", type: "quiz", durationMinutes: 20, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// REMAINING COURSES — Condensed Module Structures
// ════════════════════════════════════════════════════════════════

export const REACT_FE_MODULES: Module[] = [
  {
    id: "mod-rf-1", courseId: "course-react-frontend", title: "React Fundamentals", description: "Components, JSX, and the React mental model.", order: 1,
    lessons: [
      { id: "les-rf-1-1", moduleId: "mod-rf-1", title: "JSX & Component Thinking", type: "video", durationMinutes: 20, order: 1, isPreview: true },
      { id: "les-rf-1-2", moduleId: "mod-rf-1", title: "Props & Component Composition", type: "video", durationMinutes: 22, order: 2, isPreview: false },
      { id: "les-rf-1-3", moduleId: "mod-rf-1", title: "React Lab: Build a Component Library", type: "lab", durationMinutes: 45, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-rf-2", courseId: "course-react-frontend", title: "State Management", description: "useState, useReducer, Context API, and state architecture.", order: 2,
    lessons: [
      { id: "les-rf-2-1", moduleId: "mod-rf-2", title: "useState & useEffect", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-rf-2-2", moduleId: "mod-rf-2", title: "useReducer & Complex State", type: "video", durationMinutes: 22, order: 2, isPreview: false },
      { id: "les-rf-2-3", moduleId: "mod-rf-2", title: "Context API & Providers", type: "reading", durationMinutes: 18, order: 3, isPreview: false, content: "Context provides a way to pass data through the component tree without prop drilling.\n\n```tsx\nconst ThemeContext = createContext('dark');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <Child />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Child() {\n  const theme = useContext(ThemeContext);\n  return <div className={theme}>...</div>;\n}\n```\n\n**When to use**: Authentication state, theme, locale, any data needed by many components.\n**When not to use**: Rapidly changing data (use a state library instead)." },
      { id: "les-rf-2-4", moduleId: "mod-rf-2", title: "State Management Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-rf-3", courseId: "course-react-frontend", title: "Routing & Navigation", description: "Client-side routing with React Router.", order: 3,
    lessons: [
      { id: "les-rf-3-1", moduleId: "mod-rf-3", title: "React Router v6", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-rf-3-2", moduleId: "mod-rf-3", title: "Protected Routes & Layouts", type: "lab", durationMinutes: 35, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-rf-4", courseId: "course-react-frontend", title: "Forms & API Integration", description: "Handle user input and connect to backends.", order: 4,
    lessons: [
      { id: "les-rf-4-1", moduleId: "mod-rf-4", title: "Controlled vs Uncontrolled Forms", type: "video", durationMinutes: 18, order: 1, isPreview: false },
      { id: "les-rf-4-2", moduleId: "mod-rf-4", title: "Form Validation with Zod", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "Zod is a TypeScript-first schema validation library.\n\n```ts\nconst schema = z.object({\n  email: z.string().email(),\n  age: z.number().min(18),\n  phone: z.string().regex(/^\\+233/),\n});\n\nconst result = schema.safeParse(formData);\nif (!result.success) {\n  console.log(result.error.flatten());\n}\n```\n\nCombine with react-hook-form for a complete form solution: validation, error messages, and submission handling." },
      { id: "les-rf-4-3", moduleId: "mod-rf-4", title: "Fetch & Axios Integration Lab", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
      { id: "les-rf-4-4", moduleId: "mod-rf-4", title: "Forms & API Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-rf-5", courseId: "course-react-frontend", title: "Performance & Testing", description: "Optimize renders and write tests.", order: 5,
    lessons: [
      { id: "les-rf-5-1", moduleId: "mod-rf-5", title: "React.memo, useMemo, useCallback", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-rf-5-2", moduleId: "mod-rf-5", title: "Testing with Vitest & Testing Library", type: "lab", durationMinutes: 45, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-rf-6", courseId: "course-react-frontend", title: "React Capstone", description: "Build a production-quality React application.", order: 6,
    lessons: [
      { id: "les-rf-6-1", moduleId: "mod-rf-6", title: "Capstone: Dashboard Application", type: "project", durationMinutes: 240, order: 1, isPreview: false },
      { id: "les-rf-6-2", moduleId: "mod-rf-6", title: "Final Assessment", type: "quiz", durationMinutes: 20, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-rf-7", courseId: "course-react-frontend", title: "TypeScript with React", description: "Type safety in React applications.", order: 7,
    lessons: [
      { id: "les-rf-7-1", moduleId: "mod-rf-7", title: "Types for Props, State & Events", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-rf-7-2", moduleId: "mod-rf-7", title: "Generic Components", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "Generics let you write components that work with any data type.\n\n```tsx\ninterface ListProps<T> {\n  items: T[];\n  renderItem: (item: T) => React.ReactNode;\n}\n\nfunction List<T>({ items, renderItem }: ListProps<T>) {\n  return <ul>{items.map(renderItem)}</ul>;\n}\n\n// Usage\n<List items={users} renderItem={(user) => <li>{user.name}</li>} />\n```\n\n**Utility Types**: `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>` help model data precisely." },
      { id: "les-rf-7-3", moduleId: "mod-rf-7", title: "TypeScript React Lab", type: "lab", durationMinutes: 35, order: 3, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// NODE.JS BACKEND (course-node-backend)
// ════════════════════════════════════════════════════════════════

export const NODE_BE_MODULES: Module[] = [
  {
    id: "mod-nb-1", courseId: "course-node-backend", title: "Node.js & Express Foundations", description: "Build your first API server.", order: 1,
    lessons: [
      { id: "les-nb-1-1", moduleId: "mod-nb-1", title: "Node.js Runtime & Modules", type: "video", durationMinutes: 18, order: 1, isPreview: true },
      { id: "les-nb-1-2", moduleId: "mod-nb-1", title: "Express.js Routing & Middleware", type: "video", durationMinutes: 25, order: 2, isPreview: false },
      { id: "les-nb-1-3", moduleId: "mod-nb-1", title: "RESTful API Design Lab", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-nb-2", courseId: "course-node-backend", title: "Databases", description: "SQL with PostgreSQL and NoSQL with MongoDB.", order: 2,
    lessons: [
      { id: "les-nb-2-1", moduleId: "mod-nb-2", title: "SQL Fundamentals & PostgreSQL", type: "video", durationMinutes: 28, order: 1, isPreview: false },
      { id: "les-nb-2-2", moduleId: "mod-nb-2", title: "MongoDB & Mongoose ODM", type: "video", durationMinutes: 22, order: 2, isPreview: false },
      { id: "les-nb-2-3", moduleId: "mod-nb-2", title: "Database Design Lab", type: "lab", durationMinutes: 45, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-nb-3", courseId: "course-node-backend", title: "Authentication & Authorization", description: "JWT, sessions, RBAC, and OAuth.", order: 3,
    lessons: [
      { id: "les-nb-3-1", moduleId: "mod-nb-3", title: "JWT Authentication", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-nb-3-2", moduleId: "mod-nb-3", title: "Role-Based Access Control", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "RBAC restricts system access based on user roles.\n\n**Implementation**:\n1. Define roles: admin, instructor, learner\n2. Assign permissions to roles: create_course, grade_assignment, view_reports\n3. Check permissions in middleware before processing requests\n4. Use principle of least privilege — give each role only the permissions it needs\n\n```ts\nfunction authorize(...roles: string[]) {\n  return (req, res, next) => {\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({ error: 'Forbidden' });\n    }\n    next();\n  };\n}\n\nrouter.delete('/courses/:id', authorize('admin'), deleteCourse);\n```" },
      { id: "les-nb-3-3", moduleId: "mod-nb-3", title: "Auth Lab: Full JWT Flow", type: "lab", durationMinutes: 50, order: 3, isPreview: false },
      { id: "les-nb-3-4", moduleId: "mod-nb-3", title: "Auth Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-nb-4", courseId: "course-node-backend", title: "API Security & Error Handling", description: "Secure your APIs and handle failures gracefully.", order: 4,
    lessons: [
      { id: "les-nb-4-1", moduleId: "mod-nb-4", title: "API Security Best Practices", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-nb-4-2", moduleId: "mod-nb-4", title: "Input Validation & Sanitization", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "Never trust user input. Validate on the server even if you validate on the client.\n\n**Express-validator / Zod**: Schema-based validation for request bodies, params, and query strings.\n\n**SQL Injection Prevention**: Always use parameterized queries. Never concatenate user input into SQL strings.\n\n**Rate Limiting**: `express-rate-limit` prevents brute force and DoS. Configure per-route limits.\n\n**Helmet.js**: Sets security-related HTTP headers (CSP, HSTS, X-Frame-Options)." },
      { id: "les-nb-4-3", moduleId: "mod-nb-4", title: "Error Handling Patterns Lab", type: "lab", durationMinutes: 35, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-nb-5", courseId: "course-node-backend", title: "Testing & Deployment", description: "Write tests and deploy to production.", order: 5,
    lessons: [
      { id: "les-nb-5-1", moduleId: "mod-nb-5", title: "Unit & Integration Testing", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-nb-5-2", moduleId: "mod-nb-5", title: "CI/CD & Deployment", type: "reading", durationMinutes: 18, order: 2, isPreview: false, content: "**Deployment Pipeline**:\n1. Push to Git\n2. Lint & type-check\n3. Run tests\n4. Build production bundle\n5. Deploy to staging\n6. Run smoke tests\n7. Deploy to production\n\n**Deployment Options**: Vercel, Railway, Fly.io, Docker + cloud VM, AWS ECS/Fargate.\n\n**Environment Variables**: Never commit secrets. Use `.env` locally, environment variables in production. Validate required variables at startup." },
      { id: "les-nb-5-3", moduleId: "mod-nb-5", title: "Backend Capstone: Production API", type: "project", durationMinutes: 240, order: 3, isPreview: false },
      { id: "les-nb-5-4", moduleId: "mod-nb-5", title: "Final Assessment", type: "quiz", durationMinutes: 25, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-nb-6", courseId: "course-node-backend", title: "Real-Time & Background Jobs", description: "WebSockets, queues, and async processing.", order: 6,
    lessons: [
      { id: "les-nb-6-1", moduleId: "mod-nb-6", title: "WebSockets with Socket.io", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-nb-6-2", moduleId: "mod-nb-6", title: "Bull/BullMQ Job Queues", type: "lab", durationMinutes: 40, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// FULL-STACK CAPSTONE (course-fullstack-project)
// ════════════════════════════════════════════════════════════════

export const FULLSTACK_CAPSTONE_MODULES: Module[] = [
  {
    id: "mod-fc-1", courseId: "course-fullstack-project", title: "Project Planning", description: "Design, plan, and architecture before coding.", order: 1,
    lessons: [
      { id: "les-fc-1-1", moduleId: "mod-fc-1", title: "Requirements & User Stories", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-fc-1-2", moduleId: "mod-fc-1", title: "System Architecture Design", type: "reading", durationMinutes: 22, order: 2, isPreview: false, content: "Before writing code, design the system.\n\n**Architecture Decisions**:\n1. What's the data model? (ER diagram)\n2. What API endpoints do you need?\n3. How will authentication work?\n4. What's the frontend routing structure?\n5. Where will you deploy?\n\n**Tech Stack (Recommended)**:\n- Frontend: React + TypeScript + Tailwind CSS\n- Backend: Node.js + Express + TypeScript\n- Database: PostgreSQL (via Prisma/Drizzle) or MongoDB\n- Auth: JWT with refresh tokens\n- Deployment: Vercel (frontend) + Railway (backend) or full-stack on Vercel\n\n**Deliverable**: A README.md with architecture diagram, tech stack decisions, and API specification." },
      { id: "les-fc-1-3", moduleId: "mod-fc-1", title: "Architecture Review", type: "assignment", durationMinutes: 30, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-fc-2", courseId: "course-fullstack-project", title: "Backend Development", description: "Build the API, database, and authentication.", order: 2,
    lessons: [
      { id: "les-fc-2-1", moduleId: "mod-fc-2", title: "Database Schema & Migrations", type: "lab", durationMinutes: 60, order: 1, isPreview: false },
      { id: "les-fc-2-2", moduleId: "mod-fc-2", title: "API Endpoints & Business Logic", type: "lab", durationMinutes: 90, order: 2, isPreview: false },
      { id: "les-fc-2-3", moduleId: "mod-fc-2", title: "Auth & Authorization Layer", type: "lab", durationMinutes: 45, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-fc-3", courseId: "course-fullstack-project", title: "Frontend Development", description: "Build the UI, integrate the API, and handle state.", order: 3,
    lessons: [
      { id: "les-fc-3-1", moduleId: "mod-fc-3", title: "UI Components & Layout", type: "lab", durationMinutes: 60, order: 1, isPreview: false },
      { id: "les-fc-3-2", moduleId: "mod-fc-3", title: "API Integration & State Management", type: "lab", durationMinutes: 60, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-fc-4", courseId: "course-fullstack-project", title: "Testing & Deployment", description: "Write tests and ship to production.", order: 4,
    lessons: [
      { id: "les-fc-4-1", moduleId: "mod-fc-4", title: "Writing Tests", type: "lab", durationMinutes: 45, order: 1, isPreview: false },
      { id: "les-fc-4-2", moduleId: "mod-fc-4", title: "CI/CD & Production Deploy", type: "lab", durationMinutes: 45, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-fc-5", courseId: "course-fullstack-project", title: "Presentation & Portfolio", description: "Present your work and add to your portfolio.", order: 5,
    lessons: [
      { id: "les-fc-5-1", moduleId: "mod-fc-5", title: "Demo Day Presentation", type: "project", durationMinutes: 30, order: 1, isPreview: false },
      { id: "les-fc-5-2", moduleId: "mod-fc-5", title: "Portfolio Documentation", type: "assignment", durationMinutes: 60, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// CLOUD FOUNDATIONS (course-cloud-foundations)
// ════════════════════════════════════════════════════════════════

export const CLOUD_FOUND_MODULES: Module[] = [
  {
    id: "mod-cfnd-1", courseId: "course-cloud-foundations", title: "Cloud Computing Models", description: "IaaS, PaaS, SaaS and cloud service models.", order: 1,
    lessons: [
      { id: "les-cfnd-1-1", moduleId: "mod-cfnd-1", title: "What is Cloud Computing?", type: "video", durationMinutes: 18, order: 1, isPreview: true },
      { id: "les-cfnd-1-2", moduleId: "mod-cfnd-1", title: "IaaS vs PaaS vs SaaS", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "**IaaS (Infrastructure as a Service)**: You manage OS, middleware, apps. Provider manages hardware.\nExamples: AWS EC2, Azure VMs, GCP Compute Engine\n\n**PaaS (Platform as a Service)**: Provider manages OS and runtime. You manage apps and data.\nExamples: Heroku, AWS Elastic Beanstalk, Azure App Service\n\n**SaaS (Software as a Service)**: Provider manages everything. You just use the software.\nExamples: Gmail, Salesforce, Slack\n\n**Shared Responsibility**: The more you control, the more you're responsible for. Cloud providers handle physical security, networking, and hardware. You handle data, access, and configuration." },
      { id: "les-cfnd-1-3", moduleId: "mod-cfnd-1", title: "AWS Console Tour Lab", type: "lab", durationMinutes: 30, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-cfnd-2", courseId: "course-cloud-foundations", title: "Compute & Networking", description: "Virtual machines, load balancers, and VPCs.", order: 2,
    lessons: [
      { id: "les-cfnd-2-1", moduleId: "mod-cfnd-2", title: "EC2 / Virtual Machines", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-cfnd-2-2", moduleId: "mod-cfnd-2", title: "VPC & Subnetting", type: "reading", durationMinutes: 20, order: 2, isPreview: false, content: "A Virtual Private Cloud (VPC) is your isolated network in the cloud.\n\n**VPC Components**:\n- **Subnets**: Public (internet-accessible) and Private (internal only)\n- **Internet Gateway**: Connects VPC to the internet\n- **NAT Gateway**: Lets private subnet instances reach the internet\n- **Security Groups**: Stateful firewalls at instance level\n- **Network ACLs**: Stateless firewalls at subnet level\n\n**Best Practice**: Place databases and backend servers in private subnets. Only load balancers and bastion hosts should be in public subnets." },
      { id: "les-cfnd-2-3", moduleId: "mod-cfnd-2", title: "VPC Setup Lab", type: "lab", durationMinutes: 45, order: 3, isPreview: false },
      { id: "les-cfnd-2-4", moduleId: "mod-cfnd-2", title: "Compute & Networking Quiz", type: "quiz", durationMinutes: 12, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-cfnd-3", courseId: "course-cloud-foundations", title: "Storage & Databases", description: "Object storage, block storage, and managed databases.", order: 3,
    lessons: [
      { id: "les-cfnd-3-1", moduleId: "mod-cfnd-3", title: "S3 & Object Storage", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-cfnd-3-2", moduleId: "mod-cfnd-3", title: "RDS & Managed Databases", type: "video", durationMinutes: 22, order: 2, isPreview: false },
      { id: "les-cfnd-3-3", moduleId: "mod-cfnd-3", title: "Storage Lab: Deploy a Static Website", type: "lab", durationMinutes: 35, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-cfnd-4", courseId: "course-cloud-foundations", title: "Cloud Security", description: "IAM, encryption, and security best practices.", order: 4,
    lessons: [
      { id: "les-cfnd-4-1", moduleId: "mod-cfnd-4", title: "IAM & Access Management", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-cfnd-4-2", moduleId: "mod-cfnd-4", title: "Cloud Security Principles", type: "reading", durationMinutes: 18, order: 2, isPreview: false, content: "**Cloud Security Principles**:\n1. **Least Privilege**: Grant minimum permissions needed\n2. **Defense in Depth**: Multiple security layers\n3. **Encryption Everywhere**: At rest and in transit\n4. **Immutable Infrastructure**: Replace, don't patch\n5. **Monitor Everything**: CloudTrail, GuardDuty, Config\n\n**Common Mistakes**:\n- Public S3 buckets (most common breach vector)\n- Overly permissive IAM policies (wildcard `*` actions)\n- Hardcoded credentials in code repos\n- No logging enabled\n- Default security groups allowing all traffic" },
      { id: "les-cfnd-4-3", moduleId: "mod-cfnd-4", title: "IAM Lab: Secure an AWS Account", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
      { id: "les-cfnd-4-4", moduleId: "mod-cfnd-4", title: "Cloud Security Quiz", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-cfnd-5", courseId: "course-cloud-foundations", title: "Cloud Foundations Capstone", description: "Design and deploy a cloud architecture.", order: 5,
    lessons: [
      { id: "les-cfnd-5-1", moduleId: "mod-cfnd-5", title: "Capstone: Deploy a 3-Tier Application", type: "project", durationMinutes: 180, order: 1, isPreview: false },
      { id: "les-cfnd-5-2", moduleId: "mod-cfnd-5", title: "Final Assessment", type: "quiz", durationMinutes: 25, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// TERRAFORM (course-terraform)
// ════════════════════════════════════════════════════════════════

export const TERRAFORM_MODULES: Module[] = [
  {
    id: "mod-tf-1", courseId: "course-terraform", title: "Infrastructure as Code Fundamentals", description: "Why IaC matters and how Terraform works.", order: 1,
    lessons: [
      { id: "les-tf-1-1", moduleId: "mod-tf-1", title: "What is Infrastructure as Code?", type: "video", durationMinutes: 18, order: 1, isPreview: true },
      { id: "les-tf-1-2", moduleId: "mod-tf-1", title: "HCL Syntax & Terraform Workflow", type: "reading", durationMinutes: 20, order: 2, isPreview: false, content: "Terraform uses HashiCorp Configuration Language (HCL).\n\n```hcl\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-0c55b159cbfafe1f0\"\n  instance_type = \"t2.micro\"\n  tags = {\n    Name = \"WebServer\"\n  }\n}\n```\n\n**Workflow**:\n1. `terraform init` — Download providers, initialize backend\n2. `terraform plan` — Preview changes (dry run)\n3. `terraform apply` — Execute changes\n4. `terraform destroy` — Tear down infrastructure\n\n**State**: Terraform tracks resource state in a state file. Never edit manually. Use remote state (S3 + DynamoDB) for team work." },
      { id: "les-tf-1-3", moduleId: "mod-tf-1", title: "First Terraform Config Lab", type: "lab", durationMinutes: 30, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-tf-2", courseId: "course-terraform", title: "Variables & Outputs", description: "Parameterize your infrastructure.", order: 2,
    lessons: [
      { id: "les-tf-2-1", moduleId: "mod-tf-2", title: "Variables, Locals & Outputs", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-tf-2-2", moduleId: "mod-tf-2", title: "Data Sources & Expressions", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "Data sources let you query existing infrastructure.\n\n```hcl\ndata \"aws_ami\" \"latest\" {\n  most_recent = true\n  owners      = [\"amazon\"]\n  filter {\n    name   = \"name\"\n    values = [\"amzn2-ami-hvm-*-x86_64-gp2\"]\n  }\n}\n```\n\n**Expressions**: `var.name`, `local.computed_value`, `aws_instance.web.id` (reference), `length(var.list)`.\n\n**Conditional**: `var.env == \"prod\" ? \"t3.medium\" : \"t3.micro\"`\n\n**For Expressions**: `[for s in var.list : upper(s)]`" },
      { id: "les-tf-2-3", moduleId: "mod-tf-2", title: "Variables Lab", type: "lab", durationMinutes: 30, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-tf-3", courseId: "course-terraform", title: "Modules & Reusability", description: "Write reusable Terraform modules.", order: 3,
    lessons: [
      { id: "les-tf-3-1", moduleId: "mod-tf-3", title: "Creating Modules", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-tf-3-2", moduleId: "mod-tf-3", title: "Module Lab: VPC Module", type: "lab", durationMinutes: 45, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-tf-4", courseId: "course-terraform", title: "State Management & Workspaces", description: "Manage state files and multi-environment setups.", order: 4,
    lessons: [
      { id: "les-tf-4-1", moduleId: "mod-tf-4", title: "Remote State with S3", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-tf-4-2", moduleId: "mod-tf-4", title: "Workspaces & Environments", type: "lab", durationMinutes: 35, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-tf-5", courseId: "course-terraform", title: "Terraform Capstone", description: "Build production-ready infrastructure as code.", order: 5,
    lessons: [
      { id: "les-tf-5-1", moduleId: "mod-tf-5", title: "Capstone: Multi-Environment AWS Infrastructure", type: "project", durationMinutes: 180, order: 1, isPreview: false },
      { id: "les-tf-5-2", moduleId: "mod-tf-5", title: "Final Assessment", type: "quiz", durationMinutes: 20, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// DOCKER & KUBERNETES (course-containers)
// ════════════════════════════════════════════════════════════════

export const CONTAINERS_MODULES: Module[] = [
  {
    id: "mod-ct-1", courseId: "course-containers", title: "Container Fundamentals", description: "Docker basics: images, containers, and registries.", order: 1,
    lessons: [
      { id: "les-ct-1-1", moduleId: "mod-ct-1", title: "Why Containers?", type: "video", durationMinutes: 18, order: 1, isPreview: true },
      { id: "les-ct-1-2", moduleId: "mod-ct-1", title: "Docker Images & Dockerfiles", type: "reading", durationMinutes: 22, order: 2, isPreview: false, content: "A Dockerfile defines how to build an image.\n\n```dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\n```\n\n**Best Practices**:\n- Use specific base image tags, not `latest`\n- Multi-stage builds to reduce image size\n- Order instructions from least to most frequently changed\n- Use `.dockerignore` to exclude node_modules, .git\n- Run as non-root user for security\n\n**Image Layers**: Each Dockerfile instruction creates a layer. Layers are cached and shared between images." },
      { id: "les-ct-1-3", moduleId: "mod-ct-1", title: "Docker Lab: Containerize a Node.js App", type: "lab", durationMinutes: 40, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-ct-2", courseId: "course-containers", title: "Docker Compose", description: "Multi-container applications with Docker Compose.", order: 2,
    lessons: [
      { id: "les-ct-2-1", moduleId: "mod-ct-2", title: "Docker Compose Fundamentals", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-ct-2-2", moduleId: "mod-ct-2", title: "Compose Lab: Full-Stack App", type: "lab", durationMinutes: 45, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-ct-3", courseId: "course-containers", title: "Kubernetes Fundamentals", description: "Pods, services, deployments, and cluster management.", order: 3,
    lessons: [
      { id: "les-ct-3-1", moduleId: "mod-ct-3", title: "Kubernetes Architecture", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-ct-3-2", moduleId: "mod-ct-3", title: "Pods, Deployments & Services", type: "reading", durationMinutes: 22, order: 2, isPreview: false, content: "**Core Kubernetes Objects**:\n\n**Pod**: Smallest deployable unit. Contains one or more containers sharing network/storage.\n\n**Deployment**: Manages replica sets. Ensures desired number of pods are running. Supports rolling updates and rollbacks.\n\n**Service**: Stable network endpoint for a set of pods.\n- ClusterIP: Internal only\n- NodePort: Expose on each node\n- LoadBalancer: Cloud load balancer\n\n**ConfigMap & Secret**: Externalized configuration. ConfigMaps for non-sensitive data, Secrets for credentials (base64-encoded, not encrypted — use external secrets manager for production)." },
      { id: "les-ct-3-3", moduleId: "mod-ct-3", title: "Kubernetes Lab: Deploy to Minikube", type: "lab", durationMinutes: 50, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-ct-4", courseId: "course-containers", title: "Scaling & Networking", description: "Auto-scaling, ingress, and service mesh basics.", order: 4,
    lessons: [
      { id: "les-ct-4-1", moduleId: "mod-ct-4", title: "Horizontal Pod Autoscaler", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-ct-4-2", moduleId: "mod-ct-4", title: "Ingress Controllers & TLS", type: "lab", durationMinutes: 35, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-ct-5", courseId: "course-containers", title: "Containers Capstone", description: "Deploy a production-grade containerized application.", order: 5,
    lessons: [
      { id: "les-ct-5-1", moduleId: "mod-ct-5", title: "Capstone: Production K8s Deployment", type: "project", durationMinutes: 180, order: 1, isPreview: false },
      { id: "les-ct-5-2", moduleId: "mod-ct-5", title: "Final Assessment", type: "quiz", durationMinutes: 20, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// DEVOPS & CI/CD (course-devops-pipeline)
// ════════════════════════════════════════════════════════════════

export const DEVOPS_MODULES: Module[] = [
  {
    id: "mod-do-1", courseId: "course-devops-pipeline", title: "DevOps Culture & Principles", description: "CAMS, continuous improvement, and DevOps philosophy.", order: 1,
    lessons: [
      { id: "les-do-1-1", moduleId: "mod-do-1", title: "What is DevOps?", type: "video", durationMinutes: 18, order: 1, isPreview: true },
      { id: "les-do-1-2", moduleId: "mod-do-1", title: "CAMS: Culture, Automation, Measurement, Sharing", type: "reading", durationMinutes: 15, order: 2, isPreview: false, content: "DevOps is not a tool — it's a culture of collaboration between development and operations.\n\n**CAMS Framework**:\n- **Culture**: Break down silos. Dev and Ops share responsibility.\n- **Automation**: Automate everything: testing, deployment, infrastructure, monitoring.\n- **Measurement**: Track DORA metrics: deployment frequency, lead time, MTTR, change failure rate.\n- **Sharing**: Share knowledge, tools, and feedback loops.\n\n**DORA Metrics**:\n- **Deployment Frequency**: How often you deploy (Elite: on-demand)\n- **Lead Time for Changes**: Commit to production (Elite: < 1 hour)\n- **Mean Time to Restore**: Recovery from failure (Elite: < 1 hour)\n- **Change Failure Rate**: % of deployments causing failure (Elite: 0-15%)" },
      { id: "les-do-1-3", moduleId: "mod-do-1", title: "DevOps Quiz", type: "quiz", durationMinutes: 8, order: 3, isPreview: false },
    ],
  },
  {
    id: "mod-do-2", courseId: "course-devops-pipeline", title: "GitHub Actions", description: "Build CI/CD pipelines with GitHub Actions.", order: 2,
    lessons: [
      { id: "les-do-2-1", moduleId: "mod-do-2", title: "GitHub Actions Fundamentals", type: "video", durationMinutes: 25, order: 1, isPreview: false },
      { id: "les-do-2-2", moduleId: "mod-do-2", title: "GitHub Actions Lab: Full CI Pipeline", type: "lab", durationMinutes: 50, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-do-3", courseId: "course-devops-pipeline", title: "CD & Deployment Strategies", description: "Blue-green, canary, and rolling deployments.", order: 3,
    lessons: [
      { id: "les-do-3-1", moduleId: "mod-do-3", title: "Deployment Strategies", type: "video", durationMinutes: 22, order: 1, isPreview: false },
      { id: "les-do-3-2", moduleId: "mod-do-3", title: "Canary Deployments Lab", type: "lab", durationMinutes: 40, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-do-4", courseId: "course-devops-pipeline", title: "Monitoring & Observability", description: "Prometheus, Grafana, and the three pillars.", order: 4,
    lessons: [
      { id: "les-do-4-1", moduleId: "mod-do-4", title: "Metrics, Logs & Traces", type: "video", durationMinutes: 20, order: 1, isPreview: false },
      { id: "les-do-4-2", moduleId: "mod-do-4", title: "Prometheus & Grafana Lab", type: "lab", durationMinutes: 45, order: 2, isPreview: false },
    ],
  },
  {
    id: "mod-do-5", courseId: "course-devops-pipeline", title: "DevOps Capstone", description: "Build and deploy a complete CI/CD pipeline.", order: 5,
    lessons: [
      { id: "les-do-5-1", moduleId: "mod-do-5", title: "Capstone: End-to-End Pipeline", type: "project", durationMinutes: 180, order: 1, isPreview: false },
      { id: "les-do-5-2", moduleId: "mod-do-5", title: "Final Assessment", type: "quiz", durationMinutes: 20, order: 2, isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// ALL MODULES MAP — for easy lookup
// ════════════════════════════════════════════════════════════════

export const ALL_COURSE_MODULES: Record<string, Module[]> = {
  "course-net-fundamentals": NET_FUND_MODULES,
  "course-linux-fundamentals": LINUX_FUND_MODULES,
  "course-cyber-fundamentals": CYBER_FUND_MODULES,
  "course-soc-operations": SOC_OPS_MODULES,
  "course-web-fundamentals": WEB_FUND_MODULES,
  "course-react-frontend": REACT_FE_MODULES,
  "course-node-backend": NODE_BE_MODULES,
  "course-fullstack-project": FULLSTACK_CAPSTONE_MODULES,
  "course-cloud-foundations": CLOUD_FOUND_MODULES,
  "course-terraform": TERRAFORM_MODULES,
  "course-containers": CONTAINERS_MODULES,
  "course-devops-pipeline": DEVOPS_MODULES,
};
