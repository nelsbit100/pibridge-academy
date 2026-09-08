// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Lab Environments & Capstone Projects
// ──────────────────────────────────────────────────────────────

import { EXPANDED_LABS } from "./expandedLabs";

export interface LabEnvironment {
  lessonId: string;
  title: string;
  description: string;
  objectives: string[];
  topology?: string; // ASCII or description of network/topology diagram
  addressingTable?: { device: string; interface: string; ipAddress: string; subnetMask: string; defaultGateway: string; description: string }[];
  setupInstructions: string[];
  tasks: LabTask[];
  verificationTasks?: VerificationTask[];
  troubleshootingScenario?: TroubleshootingScenario;
  hints: string[];
  estimatedMinutes: number;
  competencyLevel?: "basic" | "intermediate" | "advanced";
  alignsWith?: string; // e.g., "CCNA Module 2", "CompTIA Security+ Objective 3.1"
}

export interface LabTask {
  order: number;
  instruction: string;
  commandExample?: string; // Example CLI command or configuration snippet
  expectedOutput?: string;
  verificationCommand?: string;
  competencyChecked?: string; // What skill this task validates
}

export interface VerificationTask {
  id: string;
  description: string;
  command: string;
  expectedResult: string;
  points: number;
}

export interface TroubleshootingScenario {
  scenario: string;
  symptoms: string[];
  brokenConfigs: string[]; // Configs that need fixing
  solution: string[];
  rootCause: string;
}

export interface CapstoneProject {
  lessonId: string;
  title: string;
  description: string;
  industryContext?: string; // Real-world business scenario
  objectives: string[];
  phases?: CapstonePhase[];
  deliverables: string[];
  rubric: { criterion: string; points: number; description?: string }[];
  estimatedHours: number;
  prerequisites: string[];
  industryAlignment?: string; // Maps to industry certifications/frameworks
}

export interface CapstonePhase {
  phase: number;
  name: string;
  description: string;
  tasks: string[];
  checkpoint: string; // What must be verified before moving to next phase
  estimatedHours: number;
}

// ════════════════════════════════════════════════════════════════
// LAB ENVIRONMENTS
// ════════════════════════════════════════════════════════════════

export const LAB_ENVIRONMENTS: LabEnvironment[] = [
  // OSI Model Lab
  {
    lessonId: "les-nf-2-3",
    title: "OSI Model Mapping Lab",
    description: "Map real-world network activities to OSI layers and analyze protocol behavior.",
    objectives: [
      "Identify which OSI layer each protocol operates at",
      "Trace data flow through the OSI stack",
      "Recognize how encapsulation works at each layer",
    ],
    setupInstructions: [
      "Open the network simulator in your browser",
      "Launch the packet capture tool (pre-loaded with sample traffic)",
      "Have a terminal ready for nslookup and ping commands",
    ],
    tasks: [
      { order: 1, instruction: "Use nslookup to resolve google.com. Identify which OSI layers are involved in this single DNS query.", expectedOutput: "Layer 7 (Application/DNS), Layer 4 (Transport/UDP:53), Layer 3 (Network/IP), Layer 2 (Data Link/Ethernet), Layer 1 (Physical)" },
      { order: 2, instruction: "Open the packet capture file and find a TCP handshake. List each packet and its flags.", expectedOutput: "SYN → SYN-ACK → ACK" },
      { order: 3, instruction: "Identify the protocol at each layer for an HTTPS request to pibridge.com.", verificationCommand: "Review your layer mapping against the OSI reference chart" },
      { order: 4, instruction: "Find a suspicious packet in the capture (large DNS response, unusual port). Explain which layer reveals the anomaly.", expectedOutput: "DNS response > 512 bytes or traffic on non-standard ports" },
    ],
    hints: [
      "DNS uses UDP port 53 by default",
      "Every network packet has headers at every OSI layer",
      "Look at the packet bytes pane in Wireshark to see encapsulation",
    ],
    estimatedMinutes: 30,
  },

  // Firewall Configuration Lab
  {
    lessonId: "les-nf-4-3",
    title: "Firewall Configuration Lab",
    description: "Configure firewall rules to protect a small business network.",
    objectives: [
      "Write iptables rules for common scenarios",
      "Implement a basic firewall policy",
      "Test rules to verify they work as expected",
    ],
    setupInstructions: [
      "Use the provided Linux VM (Ubuntu 22.04)",
      "Ensure you have root/sudo access",
      "Two network interfaces: eth0 (external), eth1 (internal)",
    ],
    tasks: [
      { order: 1, instruction: "Flush existing rules and set default policies to DROP for INPUT and ACCEPT for OUTPUT.", verificationCommand: "iptables -L -v" },
      { order: 2, instruction: "Allow SSH (port 22) from your management IP only.", verificationCommand: "Attempt SSH from a non-management IP — should fail" },
      { order: 3, instruction: "Allow HTTP (80) and HTTPS (443) traffic inbound.", verificationCommand: "curl -I http://localhost should return headers" },
      { order: 4, instruction: "Block all ICMP (ping) requests from external interface.", verificationCommand: "ping from external should timeout" },
      { order: 5, instruction: "Allow established and related connections (stateful rules).", verificationCommand: "Test that response traffic is not blocked" },
      { order: 6, instruction: "Save your rules and write a brief explanation of each rule's purpose.", expectedOutput: "Rules saved to /etc/iptables/rules.v4" },
    ],
    hints: [
      "Use -A (append) to add rules to specific chains (INPUT, OUTPUT, FORWARD)",
      "The -m state --state ESTABLISHED,RELATED rule is critical for stateful filtering",
      "Order matters: rules are evaluated top to bottom",
    ],
    estimatedMinutes: 40,
  },

  // Packet Analysis Lab
  {
    lessonId: "les-nf-5-3",
    title: "Packet Analysis Lab",
    description: "Analyze network captures to identify normal and suspicious traffic patterns.",
    objectives: [
      "Navigate Wireshark efficiently",
      "Apply display filters to find specific traffic",
      "Identify indicators of compromise in packet captures",
    ],
    setupInstructions: [
      "Download the provided packet capture files (3 captures included)",
      "Open capture-1.pcap in Wireshark",
      "Have the protocol reference guide handy",
    ],
    tasks: [
      { order: 1, instruction: "In capture-1, find all DNS queries. How many unique domains are queried?", expectedOutput: "Use display filter: dns" },
      { order: 2, instruction: "Filter for HTTP traffic. What user agents are making requests?", verificationCommand: "http.request" },
      { order: 3, instruction: "In capture-2, find the TCP stream where a login attempt occurs. What credentials were sent?", expectedOutput: "Follow TCP stream → look for POST with credentials" },
      { order: 4, instruction: "Identify any traffic on non-standard ports that could indicate a backdoor.", verificationCommand: "Look for uncommon ports with active connections" },
      { order: 5, instruction: "In capture-3, find evidence of DNS tunneling (unusually large DNS responses).", expectedOutput: "dns.len > 512 or dns.response.length > 500" },
      { order: 6, instruction: "Write a brief report summarizing your findings from all three captures.", expectedOutput: "A structured report with evidence for each finding" },
    ],
    hints: [
      "Right-click a packet → Follow → TCP Stream to reconstruct conversations",
      "Statistics → Protocol Hierarchy shows traffic breakdown",
      "Export filtered packets for focused analysis",
    ],
    estimatedMinutes: 45,
  },

  // Linux Essentials Lab
  {
    lessonId: "les-lf-1-3",
    title: "Linux Command Line Essentials",
    description: "Practice essential Linux commands in a safe environment.",
    objectives: [
      "Navigate the filesystem using cd, ls, pwd",
      "Create, copy, move, and delete files",
      "View file contents with cat, less, head, tail",
      "Use pipes and redirection",
    ],
    setupInstructions: [
      "Open the provided terminal (Ubuntu VM or browser-based terminal)",
      "You are logged in as a regular user",
      "The home directory has a sample files structure",
    ],
    tasks: [
      { order: 1, instruction: "Navigate to /etc and list its contents. How many files are there?" },
      { order: 2, instruction: "Create a directory structure: ~/project/{src,tests,docs}" },
      { order: 3, instruction: "Create a file with echo and redirect: echo 'Hello PiBridge' > ~/project/src/main.txt" },
      { order: 4, instruction: "Use cat to display the file, then use grep to search for 'PiBridge'" },
      { order: 5, instruction: "Chain commands: ls -la /etc | head -20 | wc -l" },
      { order: 6, instruction: "Find all .conf files in /etc using the find command" },
      { order: 7, instruction: "Use man to read the manual page for the ls command. What flag shows human-readable file sizes?" },
    ],
    hints: [
      "Use Tab completion to speed up typing",
      "Use ↑ arrow to recall previous commands",
      "man ls → search for -h flag",
    ],
    estimatedMinutes: 30,
  },

  // Permissions Lab
  {
    lessonId: "les-lf-2-4",
    title: "Linux Permissions Lab",
    description: "Master file permissions, special bits, and access control.",
    objectives: [
      "Read and interpret Linux permission strings",
      "Change permissions with chmod (symbolic and numeric)",
      "Understand SUID, SGID, and sticky bit",
      "Identify permission-based security issues",
    ],
    setupInstructions: [
      "Use the provided Linux VM",
      "Create several test files and directories in /tmp/test-perms",
    ],
    tasks: [
      { order: 1, instruction: "Create a file and check its default permissions. What are they?", expectedOutput: "-rw-rw-r-- (664) or similar" },
      { order: 2, instruction: "Change permissions to 755 using numeric notation. Verify with ls -la." },
      { order: 3, instruction: "Use symbolic notation to remove write permission for the group: chmod g-w file" },
      { order: 4, instruction: "Create a directory with the sticky bit set. Create files as two different users and verify only owners can delete their own files.", verificationCommand: "chmod +t /tmp/shared && ls -ld /tmp/shared → drwxrwxrwt" },
      { order: 5, instruction: "Find all SUID binaries on the system: find / -perm -4000 -type f 2>/dev/null", expectedOutput: "A list including /usr/bin/passwd, /usr/bin/sudo, etc." },
      { order: 6, instruction: "Create a scenario: a world-writable file in /etc. Explain the security risk and how to fix it." },
    ],
    hints: [
      "Remember: r=4, w=2, x=1. Add them for each group (owner, group, other)",
      "777 = rwxrwxrwx (dangerous! never use on production systems)",
      "The sticky bit is the '1' in the leading digit: 1755",
    ],
    estimatedMinutes: 35,
  },

  // Splunk Lab
  {
    lessonId: "les-so-2-3",
    title: "Splunk Fundamentals Lab",
    description: "Use Splunk to search, analyze, and create dashboards from security logs.",
    objectives: [
      "Write basic Splunk Search Processing Language (SPL) queries",
      "Create saved searches and alerts",
      "Build a simple security dashboard",
    ],
    setupInstructions: [
      "Access the Splunk free trial or Splunk Cloud sandbox",
      "Load the provided security log dataset (Apache, Windows Event, Firewall logs)",
      "Familiarize yourself with the search interface",
    ],
    tasks: [
      { order: 1, instruction: "Search for all failed login events: index=main action=failure | stats count by src_ip", expectedOutput: "A table of source IPs with failed login counts" },
      { order: 2, instruction: "Find the top 10 most common destination ports: | top limit=10 dest_port", expectedOutput: "Port 443, 80, 22, etc. ranked by frequency" },
      { order: 3, instruction: "Create a search that detects multiple failed logins from the same IP (brute force detection): index=main action=failure | stats count by src_ip | where count > 10" },
      { order: 4, instruction: "Build a timechart of events per hour: | timechart span=1h count" },
      { order: 5, instruction: "Create a dashboard panel showing: top attackers, top attacked ports, and events over time." },
      { order: 6, instruction: "Save your brute force detection search as a scheduled alert that runs every 5 minutes." },
    ],
    hints: [
      "Start with broad searches and narrow down using | where and | search",
      "Use | stats count by FIELD to aggregate",
      "Timecharts help visualize activity patterns",
    ],
    estimatedMinutes: 45,
  },

  // Phishing Investigation Lab
  {
    lessonId: "les-so-4-3",
    title: "Phishing Investigation Lab",
    description: "Investigate a simulated phishing attack from initial alert to containment.",
    objectives: [
      "Triage a phishing alert",
      "Analyze email headers and URLs",
      "Determine scope and impact",
      "Execute containment actions",
    ],
    setupInstructions: [
      "Access the incident response platform",
      "Open the provided phishing alert case file",
      "Have the email analysis tools ready",
    ],
    tasks: [
      { order: 1, instruction: "Open the phishing email. Extract: sender address, reply-to, embedded URLs, attachments." },
      { order: 2, instruction: "Analyze the sender domain. Is it legitimate or spoofed? Check WHOIS and DNS records." },
      { order: 3, instruction: "Check the URL without clicking it. Use a URL analyzer (VirusTotal, URLScan) to inspect the destination." },
      { order: 4, instruction: "Determine how many users received the email. Check email gateway logs.", expectedOutput: "Search: 'from:attacker@phish.com' in email logs" },
      { order: 5, instruction: "Check if any users clicked the link or entered credentials. Check proxy logs for requests to the phishing domain." },
      { order: 6, instruction: "Write containment actions: block the domain, reset any compromised passwords, notify affected users." },
      { order: 7, instruction: "Write a formal incident report documenting your findings, timeline, and recommendations." },
    ],
    hints: [
      "Always check the Reply-To address separately from the From address",
      "Hover over URLs (don't click) to see the actual destination",
      "Check if the phishing domain was registered recently (a red flag)",
    ],
    estimatedMinutes: 60,
  },

  // ── Expanded Cisco-like Labs ──
  ...EXPANDED_LABS,
];

// ════════════════════════════════════════════════════════════════
// CAPSTONE PROJECTS
// ════════════════════════════════════════════════════════════════

export const CAPSTONE_PROJECTS: CapstoneProject[] = [
  // Networking Capstone
  {
    lessonId: "les-nf-6-1",
    title: "Secure a Small Business Network",
    description: "Design and document a secure network for a 50-person company in Accra. Include firewall rules, segmentation, monitoring, and incident response procedures.",
    objectives: [
      "Design a network topology for a small business",
      "Write firewall rules for each network segment",
      "Set up basic monitoring with Wireshark and an IDS",
      "Create an incident response playbook",
    ],
    deliverables: [
      "Network topology diagram (using draw.io, Lucidchart, or similar)",
      "Firewall rules document with explanations",
      "Wireshark capture plan and monitoring setup",
      "Incident response playbook (at least 3 scenarios)",
      "Presentation to peers (10 minutes)",
    ],
    rubric: [
      { criterion: "Network design is logical, segmented, and follows defense in depth", points: 25 },
      { criterion: "Firewall rules are correct, complete, and well-documented", points: 25 },
      { criterion: "Monitoring strategy covers key log sources and has alert criteria", points: 20 },
      { criterion: "Incident response playbook is actionable and covers realistic scenarios", points: 20 },
      { criterion: "Presentation is clear, professional, and demonstrates understanding", points: 10 },
    ],
    estimatedHours: 12,
    prerequisites: ["Networking Fundamentals", "Linux Fundamentals"],
  },

  // SOC Capstone
  {
    lessonId: "les-so-7-3",
    title: "Full Incident Response Simulation",
    description: "Respond to a multi-stage attack scenario: phishing email → credential theft → lateral movement → data exfiltration. Work through the full incident lifecycle.",
    objectives: [
      "Detect and triage multiple alerts related to one incident",
      "Investigate across multiple data sources (SIEM, endpoint, network)",
      "Contain the threat and eradicate the attacker",
      "Write a comprehensive incident report",
    ],
    deliverables: [
      "Timeline of events (from initial compromise to containment)",
      "Evidence package with screenshots and log excerpts",
      "Containment action log",
      "Incident report (NIST format)",
      "Lessons learned and recommendations",
    ],
    rubric: [
      { criterion: "Timeline is accurate, complete, and shows understanding of the attack chain", points: 30 },
      { criterion: "Investigation covers SIEM, endpoint, network, and authentication logs", points: 25 },
      { criterion: "Containment actions are appropriate and documented", points: 15 },
      { criterion: "Incident report is professional and follows a recognized format", points: 20 },
      { criterion: "Lessons learned demonstrate insight and propose actionable improvements", points: 10 },
    ],
    estimatedHours: 16,
    prerequisites: ["SOC Operations", "Cybersecurity Fundamentals"],
  },

  // Web Dev Capstone
  {
    lessonId: "les-wf-6-1",
    title: "Portfolio Website",
    description: "Build a professional portfolio website that showcases your skills, projects, and certifications. Use only HTML, CSS, and JavaScript — no frameworks.",
    objectives: [
      "Apply semantic HTML5 structure",
      "Create a responsive layout with CSS Grid and Flexbox",
      "Add interactivity with vanilla JavaScript",
      "Follow accessibility best practices (WCAG)",
    ],
    deliverables: [
      "Responsive multi-page website (Home, About, Projects, Contact)",
      "Mobile-first design that works on phones, tablets, and desktops",
      "Contact form with validation",
      "Deployed to GitHub Pages or Netlify",
      "Source code in a public GitHub repository",
    ],
    rubric: [
      { criterion: "HTML is semantic, valid, and accessible", points: 20 },
      { criterion: "CSS demonstrates mastery of Flexbox, Grid, and responsive design", points: 25 },
      { criterion: "JavaScript adds meaningful interactivity (form validation, animations, etc.)", points: 20 },
      { criterion: "Design is professional, consistent, and well-organized", points: 20 },
      { criterion: "Deployed, accessible, and code is well-documented", points: 15 },
    ],
    estimatedHours: 12,
    prerequisites: ["HTML Foundations", "CSS Styling", "JavaScript Essentials"],
  },

  // React Capstone
  {
    lessonId: "les-rf-6-1",
    title: "Dashboard Application",
    description: "Build a data dashboard with React, TypeScript, and a real API. Include charts, tables, filtering, and responsive layout.",
    objectives: [
      "Build a multi-page React app with TypeScript",
      "Integrate with a REST API",
      "Implement state management with Context or useReducer",
      "Write component tests",
    ],
    deliverables: [
      "React + TypeScript application with routing",
      "API integration with loading and error states",
      "Dashboard with charts and data tables",
      "Search and filter functionality",
      "Test coverage for critical components",
      "Deployed to Vercel or Netlify",
    ],
    rubric: [
      { criterion: "TypeScript is used properly (no `any`, proper interfaces)", points: 20 },
      { criterion: "Component architecture is clean and reusable", points: 20 },
      { criterion: "State management is appropriate and well-organized", points: 20 },
      { criterion: "API integration handles loading, error, and empty states", points: 15 },
      { criterion: "Tests demonstrate testing fundamentals", points: 15 },
      { criterion: "UI is polished and responsive", points: 10 },
    ],
    estimatedHours: 14,
    prerequisites: ["React Frontend Development"],
  },

  // Backend Capstone
  {
    lessonId: "les-nb-5-3",
    title: "Production API",
    description: "Build a complete REST API with authentication, authorization, database, validation, testing, and deployment.",
    objectives: [
      "Design and implement a RESTful API",
      "Implement JWT authentication with refresh tokens",
      "Write database schemas and migrations",
      "Write tests and set up CI/CD",
    ],
    deliverables: [
      "RESTful API with CRUD endpoints",
      "JWT auth with registration, login, refresh, and role-based access",
      "Database schema with migrations (Prisma or Drizzle)",
      "Input validation on all endpoints",
      "Unit and integration tests (80%+ coverage)",
      "CI/CD pipeline with GitHub Actions",
      "Deployed to Railway, Render, or Fly.io",
    ],
    rubric: [
      { criterion: "API design follows REST conventions", points: 20 },
      { criterion: "Authentication and authorization are secure and correct", points: 25 },
      { criterion: "Database design is normalized and efficient", points: 15 },
      { criterion: "Tests cover critical paths and edge cases", points: 20 },
      { criterion: "CI/CD pipeline works and deploys automatically", points: 10 },
      { criterion: "Code is well-organized, typed, and documented", points: 10 },
    ],
    estimatedHours: 14,
    prerequisites: ["Node.js Backend Development"],
  },

  // Full-Stack Capstone
  {
    lessonId: "les-fc-5-1",
    title: "Full-Stack Application Demo Day",
    description: "Build and present a production-quality full-stack application. Work in pairs or solo. Choose your own problem to solve.",
    objectives: [
      "Apply everything learned across the programme",
      "Build a real application that solves a real problem",
      "Present your work professionally",
      "Document your technical decisions",
    ],
    deliverables: [
      "Full-stack application (React frontend + Node.js backend + Database)",
      "Authentication system",
      "Core feature set (your choice of domain)",
      "README with architecture documentation",
      "Deployed to production",
      "15-minute presentation with live demo",
    ],
    rubric: [
      { criterion: "Application solves a real problem and is usable", points: 25 },
      { criterion: "Architecture is well-designed and documented", points: 20 },
      { criterion: "Code quality: TypeScript, clean structure, error handling", points: 20 },
      { criterion: "Testing and deployment are production-ready", points: 15 },
      { criterion: "Presentation is professional and demonstrates deep understanding", points: 20 },
    ],
    estimatedHours: 40,
    prerequisites: ["Web Dev Fundamentals", "React Frontend", "Node.js Backend"],
  },

  // Cloud Foundations Capstone
  {
    lessonId: "les-cfnd-5-1",
    title: "Deploy a 3-Tier Application on AWS",
    description: "Deploy a web application with a frontend, API, and database across multiple AWS services with proper security.",
    objectives: [
      "Design a 3-tier architecture on AWS",
      "Deploy using the AWS Console (and optionally Terraform)",
      "Implement security best practices",
      "Set up monitoring and logging",
    ],
    deliverables: [
      "Architecture diagram with all AWS services labeled",
      "Deployed web application accessible via public URL",
      "Database in a private subnet",
      "Security groups and NACLs properly configured",
      "CloudTrail and basic monitoring enabled",
      "Documentation with cost estimates",
    ],
    rubric: [
      { criterion: "Architecture follows AWS Well-Architected Framework principles", points: 25 },
      { criterion: "Security is properly implemented (private subnets, IAM, encryption)", points: 25 },
      { criterion: "Application is functional and accessible", points: 20 },
      { criterion: "Monitoring and logging are configured", points: 15 },
      { criterion: "Documentation is clear and includes cost estimates", points: 15 },
    ],
    estimatedHours: 12,
    prerequisites: ["Cloud Computing Foundations"],
  },

  // Containers Capstone
  {
    lessonId: "les-ct-5-1",
    title: "Production Kubernetes Deployment",
    description: "Containerize an application with Docker and deploy it to a Kubernetes cluster with proper configuration.",
    objectives: [
      "Write a production-quality Dockerfile",
      "Create Kubernetes manifests for all components",
      "Implement health checks, resource limits, and auto-scaling",
      "Set up ingress with TLS",
    ],
    deliverables: [
      "Multi-stage Dockerfile with non-root user",
      "Kubernetes Deployments, Services, ConfigMaps, Secrets",
      "Ingress controller with TLS termination",
      "HPA (Horizontal Pod Autoscaler) configuration",
      "README with deployment instructions",
    ],
    rubric: [
      { criterion: "Docker image follows best practices (multi-stage, non-root, minimal)", points: 25 },
      { criterion: "Kubernetes manifests are correct and well-organized", points: 25 },
      { criterion: "Security is addressed (secrets, RBAC, network policies)", points: 20 },
      { criterion: "Health checks and auto-scaling are configured", points: 15 },
      { criterion: "Documentation enables others to deploy your application", points: 15 },
    ],
    estimatedHours: 12,
    prerequisites: ["Docker & Kubernetes"],
  },

  // Terraform Capstone (original — kept for backward compat)
  {
    lessonId: "les-tf-5-1",
    title: "Multi-Environment AWS Infrastructure",
    description: "Build reusable Terraform modules for a complete AWS environment with dev, staging, and production workspaces.",
    objectives: [
      "Create modular, reusable Terraform configurations",
      "Implement multi-environment support with workspaces",
      "Use remote state with S3 backend",
      "Apply security best practices in IaC",
    ],
    deliverables: [
      "VPC module with public/private subnets",
      "EC2/ECS module for application tier",
      "RDS module for database tier",
      "Workspaces for dev, staging, production",
      "Remote state configuration",
      "Documentation with usage examples",
    ],
    rubric: [
      { criterion: "Modules are reusable and well-parameterized", points: 25 },
      { criterion: "Multi-environment support works correctly", points: 20 },
      { criterion: "State management is properly configured", points: 20 },
      { criterion: "Security best practices are applied", points: 20 },
      { criterion: "Documentation enables others to use the modules", points: 15 },
    ],
    estimatedHours: 12,
    prerequisites: ["Infrastructure as Code with Terraform"],
  },

  // ════════════════════════════════════════════════════════════════
  // INDUSTRY CAPSTONE 1: Enterprise Network Design & Security
  // Aligns with: CCNA 200-301, CompTIA Security+, NIST CSF
  // ════════════════════════════════════════════════════════════════
  {
    lessonId: "les-cf-7-1",
    title: "Enterprise Network Design & Security — AshantiGold Mining Corp",
    description: "Design, configure, and secure a multi-site enterprise network for a Ghanaian mining company with headquarters in Accra and two mine sites in Obuasi and Tarkwa. Implement VLANs, inter-VLAN routing, ACLs, VPN tunnels, and a layered security architecture.",
    industryContext: "AshantiGold Mining Corp operates across three sites in Ghana. The Accra HQ hosts corporate IT, HR, and finance. Obuasi and Tarkwa mine sites need SCADA/ICS connectivity, VoIP, and guest Wi-Fi. The CISO has mandated a zero-trust network architecture after a phishing incident compromised credentials at the Obuasi site. You are the newly hired network engineer tasked with designing and building the network from the ground up.",
    objectives: [
      "Design a hierarchical network topology (core, distribution, access layers)",
      "Implement VLAN segmentation across all three sites",
      "Configure inter-VLAN routing withRouter-on-a-Stick or L3 switches",
      "Deploy ACLs to enforce the principle of least privilege",
      "Set up site-to-site VPN tunnels between Accra and mine sites",
      "Implement 802.1X port-based network access control",
      "Configure syslog, NTP, and SNMP for centralized monitoring",
      "Document the entire network with diagrams, IP plans, and configs",
    ],
    phases: [
      {
        phase: 1, name: "Requirements Analysis & Topology Design",
        description: "Analyze business requirements, design the network hierarchy, and create addressing schemes.",
        tasks: [
          "Interview stakeholders (simulated) to gather requirements for each site",
          "Design a three-tier hierarchical topology: Core, Distribution, Access",
          "Create an IP addressing plan using 10.0.0.0/8 with /24 subnets per VLAN",
          "Design VLAN scheme: Management (VLAN 10), Corporate (20), SCADA/ICS (30), VoIP (40), Guest (50), Servers (60)",
          "Draw topology diagram showing all devices, links, and VLAN assignments",
          "Document the IP addressing table for all router/switch interfaces",
        ],
        checkpoint: "Topology diagram and addressing table reviewed and approved by instructor",
        estimatedHours: 4,
      },
      {
        phase: 2, name: "Base Network Configuration",
        description: "Configure all devices with hostnames, IP addresses, VLANs, and trunking.",
        tasks: [
          "Configure device hostnames, MOTD banners, and console/VTY passwords",
          "Assign IP addresses to all router and switch interfaces",
          "Create VLANs on all switches and assign access ports",
          "Configure 802.1Q trunk links between switches and routers",
          "Implement inter-VLAN routing usingRouter-on-a-Stick",
          "Configure DHCP pools for each VLAN",
          "Verify: Ping from every VLAN to every other VLAN",
        ],
        checkpoint: "All VLANs can communicate across routers. DHCP assigns correct addresses.",
        estimatedHours: 6,
      },
      {
        phase: 3, name: "Security Implementation",
        description: "Deploy ACLs, VPN, 802.1X, and harden all devices.",
        tasks: [
          "Implement standard ACLs to restrict management access (SSH only from management VLAN)",
          "Configure extended ACLs: block Guest VLAN from accessing Servers VLAN, allow SCADA only to specific IPs",
          "Set up IPsec site-to-site VPN between Accra and Obuasi, Accra and Tarkwa",
          "Configure AAA with local database and TACACS+ (simulated)",
          "Implement port security on access ports (sticky MAC, max 2 addresses)",
          "Harden SSH: version 2, timeout, login blocking after 3 failures",
          "Disable unused ports and assign to unused VLAN",
          "Configure 802.1X for corporate VLAN ports",
        ],
        checkpoint: "ACLs block unauthorized traffic. VPN tunnels are established. SSH is the only remote access method.",
        estimatedHours: 8,
      },
      {
        phase: 4, name: "Monitoring & Documentation",
        description: "Set up monitoring, testing, and produce final documentation package.",
        tasks: [
          "Configure NTP to sync all devices to Accra HQ stratum-1 server",
          "Configure syslog to send logs to a central syslog server (simulated)",
          "Set up SNMPv3 for network monitoring",
          "Run comprehensive tests: ping, traceroute, show commands, ACL verification",
          "Create a Troubleshooting Runbook for common issues",
          "Produce final documentation: Network Design Document, IP Plan, Config Backup, Security Policy Summary",
          "Present to board of directors (instructor/peers) — 15-minute presentation",
        ],
        checkpoint: "Documentation is complete, all verification tests pass, presentation delivered",
        estimatedHours: 6,
      },
    ],
    deliverables: [
      "Network topology diagram (all three sites, all layers)",
      "Complete IP addressing table with VLAN assignments",
      "Router and switch configuration files (all devices)",
      "ACL policy document with justification for each rule",
      "VPN configuration and tunnel verification screenshots",
      "NTP, syslog, SNMP configuration",
      "Test results document (ping matrices, ACL tests)",
      "Troubleshooting runbook",
      "Final Network Design Document (PDF)",
      "15-minute presentation with live demo",
    ],
    rubric: [
      { criterion: "Topology design follows hierarchical model (core/distribution/access)", points: 15, description: "Three-tier architecture is correctly designed with appropriate redundancy and bandwidth planning" },
      { criterion: "VLAN segmentation is correct and documented", points: 10, description: "All 6 VLANs are created, ports assigned correctly, trunking works" },
      { criterion: "Inter-VLAN routing functions correctly", points: 10, description: "Router-on-a-Stick or L3 switching allows controlled inter-VLAN communication" },
      { criterion: "ACLs enforce least privilege", points: 15, description: "Standard and extended ACLs are properly placed (close to destination) and correctly filter traffic" },
      { criterion: "Site-to-site VPN tunnels are operational", points: 10, description: "IPsec VPN establishes, traffic traverses encrypted tunnel, split tunneling is configured" },
      { criterion: "Device hardening follows CIS benchmarks", points: 10, description: "SSHv2, disable CDP/HTTP, console passwords, exec timeout, banner" },
      { criterion: "Monitoring (NTP, syslog, SNMP) is configured", points: 5, description: "Time synchronization, log collection, and monitoring are operational" },
      { criterion: "Documentation is professional and complete", points: 15, description: "Network Design Document includes topology, IP plan, configs, security policy, and runbook" },
      { criterion: "Presentation demonstrates deep understanding", points: 10, description: "Clear explanation of design decisions, trade-offs, and security rationale" },
    ],
    estimatedHours: 24,
    prerequisites: ["Networking Fundamentals", "Linux Fundamentals", "Cybersecurity Fundamentals"],
    industryAlignment: "CCNA 200-301 (Modules 5-13), CompTIA Security+ (Domain 3: Architecture), NIST CSF (Protect, Detect)",
  },

  // ════════════════════════════════════════════════════════════════
  // INDUSTRY CAPSTONE 2: SOC Operations Center Build-Out
  // Aligns with: CompTIA CySA+, GIAC GCIA, MITRE ATT&CK, NIST IR
  // ════════════════════════════════════════════════════════════════
  {
    lessonId: "les-so-7-3",
    title: "SOC Operations Center Build-Out — Vodafone Ghana Cyber Defense",
    description: "Design and operationalize a Security Operations Center for Vodafone Ghana. Deploy SIEM with use cases, create detection rules mapped to MITRE ATT&CK, build incident response playbooks, and conduct a live tabletop exercise simulating a ransomware attack.",
    industryContext: "Vodafone Ghana has experienced a 300% increase in phishing and ransomware attempts targeting mobile money infrastructure. The CISO has approved a budget to build a Tier 1/Tier 2 SOC. You are the SOC Lead hired to design the SOC architecture, deploy detection capabilities, train the team, and prove readiness through a tabletop exercise. The board needs a 90-day roadmap and evidence that the SOC can detect and respond to the top 5 threat scenarios identified in the risk assessment.",
    objectives: [
      "Design a SOC architecture: people, process, technology",
      "Deploy and configure a SIEM with real log sources",
      "Write detection rules mapped to MITRE ATT&CK techniques",
      "Create incident response playbooks for the top 5 threat scenarios",
      "Build a SOC dashboard showing key metrics",
      "Conduct a tabletop exercise for a ransomware scenario",
      "Produce a SOC Readiness Report for the board",
    ],
    phases: [
      {
        phase: 1, name: "SOC Architecture & Log Source Design",
        description: "Design the SOC's technology stack, data flows, and log source inventory.",
        tasks: [
          "Design SOC architecture diagram: log sources → log collector → SIEM → alert queue → analyst workflow",
          "Create a log source inventory: firewalls (Palo Alto), IDS (Snort), EDR (CrowdStrike), AD, VPN, email gateway, web proxy, cloud (AWS CloudTrail)",
          "Define log collection architecture: syslog, agents, API connectors",
          "Design the alert triage workflow: Alert → Triage → Escalation → Investigation → Containment → Recovery → Post-Incident",
          "Create SOC roles: Tier 1 (Triage), Tier 2 (Investigation), Tier 3 (Hunt/Forensics)",
          "Define SLAs: MTTD < 15 min for critical, MTTR < 4 hours for critical",
        ],
        checkpoint: "SOC architecture document approved, log source inventory complete",
        estimatedHours: 4,
      },
      {
        phase: 2, name: "SIEM Deployment & Use Case Development",
        description: "Deploy Splunk/ELK, onboard logs, and create detection use cases.",
        tasks: [
          "Deploy SIEM (Splunk free tier or ELK Stack) in a lab environment",
          "Onboard sample logs: firewall, Windows Event, Apache, authentication",
          "Create 10 detection use cases mapped to MITRE ATT&CK:",
          "  T1078: Valid Accounts (brute force detection)",
          "  T1566: Phishing (email header anomalies)",
          "  T1059: Command and Scripting (PowerShell abuse)",
          "  T1021: Lateral Movement (unusual SMB/RDP)",
          "  T1041: Exfiltration Over C2 (large outbound transfers)",
          "  T1486: Data Encrypted for Impact (ransomware indicators)",
          "  T1071: Application Layer Protocol (DNS tunneling)",
          "  T1105: Ingress Tool Transfer (suspicious downloads)",
          "  T1053: Scheduled Task/Job (persistence)",
          "  T1018: Remote System Discovery (internal recon)",
          "Write SPL/KQL queries for each use case",
          "Test each rule with sample attack data",
          "Document false positive tuning steps",
        ],
        checkpoint: "All 10 detection rules fire correctly on test data, false positive rate < 20%",
        estimatedHours: 8,
      },
      {
        phase: 3, name: "Incident Response Playbooks",
        description: "Create detailed IR playbooks for the top 5 threat scenarios.",
        tasks: [
          "Create playbooks for:   1. Phishing → Credential Compromise   2. Ransomware Detection & Containment   3. Insider Threat Investigation   4. DDoS Attack Response   5. Cloud Account Compromise (AWS)",
          "Each playbook must include:   - Trigger criteria (which alerts initiate the playbook)   - Immediate containment steps   - Investigation checklist (what to collect, where to look)   - Eradication steps   - Recovery steps   - Communication plan (who to notify, when)   - Post-incident review template",
          "Map each playbook to NIST IR lifecycle phases",
          "Create escalation matrices with contact information",
        ],
        checkpoint: "All 5 playbooks reviewed by peers, tabletop-ready",
        estimatedHours: 6,
      },
      {
        phase: 4, name: "SOC Dashboard & Metrics",
        description: "Build a real-time SOC dashboard and define KPIs.",
        tasks: [
          "Build SIEM dashboard with panels for:   - Alert volume by severity (last 24h)   - Top 10 alert types   - Mean Time to Detect (MTTD) trend   - Mean Time to Respond (MTTR) trend   - MITRE ATT&CK coverage heatmap   - Geographic attack map   - Failed authentication attempts",
          "Define SOC KPIs and set baseline targets",
          "Create a daily/weekly SOC report template",
          "Document escalation SLAs and tracking process",
        ],
        checkpoint: "Dashboard is live, metrics are being calculated, report template is approved",
        estimatedHours: 4,
      },
      {
        phase: 5, name: "Tabletop Exercise & Readiness Report",
        description: "Conduct a live tabletop exercise and produce the board report.",
        tasks: [
          "Design a ransomware attack scenario:   - Initial phishing email delivers Emotet payload   - Lateral movement via EternalBlue   - Credential harvesting with Mimikatz   - Ransomware deployment (simulated Conti variant)   - Data exfiltration before encryption",
          "Run the tabletop with your team (or peers):   - Inject events every 10 minutes   - Team must follow IR playbook   - Evaluate: detection time, containment effectiveness, communication",
          "Document tabletop findings: what worked, what didn't, gaps identified",
          "Produce SOC Readiness Report for the board:   - Current state assessment   - Detection capability matrix   - Gap analysis   - 90-day improvement roadmap   - Budget requirements for next phase",
          "Present to board (15-minute presentation)",
        ],
        checkpoint: "Tabletop completed, findings documented, board report delivered",
        estimatedHours: 6,
      },
    ],
    deliverables: [
      "SOC Architecture Document with diagrams",
      "Log Source Inventory and Collection Architecture",
      "SIEM deployment with 10 MITRE-mapped detection rules",
      "Detection rule documentation (query, logic, false positive handling)",
      "5 Incident Response Playbooks",
      "Escalation matrix and communication plan",
      "SOC Dashboard screenshots and metric definitions",
      "Tabletop Exercise After-Action Report",
      "SOC Readiness Report for the Board",
      "90-Day Roadmap",
    ],
    rubric: [
      { criterion: "SOC architecture is realistic and covers people, process, technology", points: 15, description: "Architecture shows clear data flow, defined roles, and documented processes" },
      { criterion: "Detection rules are mapped to MITRE ATT&CK and function correctly", points: 20, description: "Each rule has a valid query, maps to a specific technique, and fires on test data" },
      { criterion: "IR playbooks are actionable and complete", points: 20, description: "Playbooks cover the full NIST IR lifecycle with specific steps, not generic advice" },
      { criterion: "Dashboard provides operational visibility", points: 10, description: "Dashboard shows real-time metrics that a SOC manager would actually use" },
      { criterion: "Tabletop exercise revealed realistic gaps", points: 10, description: "After-action report honestly documents what failed and proposes fixes" },
      { criterion: "Board report is professional and business-oriented", points: 15, description: "Report speaks in business terms (risk, cost, timeline), not just technical jargon" },
      { criterion: "Presentation demonstrates mastery of SOC operations", points: 10, description: "Clear, confident delivery with ability to answer tough questions" },
    ],
    estimatedHours: 28,
    prerequisites: ["SOC Operations", "Cybersecurity Fundamentals", "Networking Fundamentals"],
    industryAlignment: "CompTIA CySA+ (Domain 1-4), MITRE ATT&CK v14, NIST SP 800-61r2 (IR), SANS SEC555 (Detection)"
  },

  // ════════════════════════════════════════════════════════════════
  // INDUSTRY CAPSTONE 3: Secure Full-Stack Application
  // Aligns with: OWASP Top 10, PCI-DSS, AWS Well-Architected
  // ════════════════════════════════════════════════════════════════
  {
    lessonId: "les-fc-5-1",
    title: "Secure Full-Stack Application — GhanaHealth Telemedicine Platform",
    description: "Build and deploy a secure telemedicine booking platform for Ghana Health Service. The application connects patients in rural clinics with specialists in Accra. It handles sensitive medical data and must comply with the Ghana Data Protection Act and demonstrate OWASP Top 10 mitigations.",
    industryContext: "Ghana Health Service wants to pilot a telemedicine platform connecting 50 rural health centers with specialist doctors in Accra. Patient records, appointment scheduling, and video consultations must be secure. The platform handles PHI (Protected Health Information) and must demonstrate compliance with the Ghana Data Protection Act (Act 843) and OWASP security guidelines. The system must work on low-bandwidth connections common in rural Ghana.",
    objectives: [
      "Build a production-quality full-stack application with security-first design",
      "Implement authentication with MFA and role-based access control",
      "Protect against OWASP Top 10 vulnerabilities",
      "Handle sensitive data with encryption at rest and in transit",
      "Deploy with proper CI/CD, monitoring, and logging",
      "Write a security assessment report",
      "Demonstrate the application handles low-bandwidth conditions",
    ],
    phases: [
      {
        phase: 1, name: "Requirements, Architecture & Threat Modeling",
        description: "Gather requirements, design architecture, and perform threat modeling.",
        tasks: [
          "Analyze requirements: patient registration, appointment booking, medical history, video consultation, doctor dashboard, admin panel",
          "Define user roles: Patient, Doctor, Nurse, Admin, Super Admin",
          "Design database schema with PII/PHI field classification",
          "Create API specification (OpenAPI/Swagger)",
          "Perform STRIDE threat modeling on each component",
          "Document security requirements: MFA, encryption, audit logging, data retention",
          "Design for low bandwidth: lazy loading, image compression, offline support",
          "Create architecture diagram with security boundaries",
        ],
        checkpoint: "Architecture and threat model reviewed, API spec approved",
        estimatedHours: 6,
      },
      {
        phase: 2, name: "Secure Backend Development",
        description: "Build the API with security controls baked in from the start.",
        tasks: [
          "Set up Node.js/Express with TypeScript and security middleware",
          "Implement authentication:   - Registration with email verification   - Login with MFA (TOTP via authenticator app)   - JWT with short-lived access tokens + refresh tokens   - Password policy enforcement (length, complexity, breach database check)",
          "Implement RBAC middleware:   - Patient: own records only   - Doctor: assigned patients   - Admin: all records, user management   - Super Admin: system configuration",
          "OWASP Top 10 mitigations:   - A01 Broken Access Control: resource-level authorization on every endpoint   - A02 Cryptographic Failures: encrypt PHI at rest (AES-256), TLS 1.3 in transit   - A03 Injection: parameterized queries, input validation with Zod   - A04 Insecure Design: threat model applied to API design   - A05 Security Misconfiguration: Helmet.js, CORS, rate limiting   - A07 XSS: output encoding, CSP headers   - A09 Logging: structured audit logs for all PHI access",
          "Implement audit logging: who accessed what PHI, when, from where",
          "Add rate limiting: 100 req/min general, 5 req/min for auth endpoints",
          "Write unit and integration tests with 80%+ coverage",
        ],
        checkpoint: "All API endpoints pass security tests, OWASP Top 10 checklist verified",
        estimatedHours: 10,
      },
      {
        phase: 3, name: "Secure Frontend Development",
        description: "Build the React frontend with security and accessibility in mind.",
        tasks: [
          "Build React + TypeScript frontend with Tailwind CSS",
          "Implement secure authentication flow with token refresh",
          "Create role-based dashboards: Patient, Doctor, Admin",
          "Implement:   - Patient registration with Ghana phone validation   - Appointment booking with doctor availability   - Medical history viewer (read-only for patients)   - Doctor notes interface (write access for doctors only)   - Admin user management panel",
          "Security measures:   - Store tokens in httpOnly cookies, not localStorage   - Implement CSRF protection   - Sanitize all user inputs client-side   - Implement Content Security Policy   - No sensitive data in URL parameters",
          "Accessibility: WCAG 2.1 AA compliance, keyboard navigation, screen reader support",
          "Low-bandwidth optimizations: skeleton loading, image compression, service worker for offline",
          "Write component tests",
        ],
        checkpoint: "All user stories implemented, security measures verified, accessibility audit passes",
        estimatedHours: 10,
      },
      {
        phase: 4, name: "Deployment, Testing & Security Audit",
        description: "Deploy to production, run security tests, and produce audit report.",
        tasks: [
          "Set up CI/CD pipeline:   - Lint + type check   - Unit tests   - Integration tests   - SAST scan (Semgrep/SonarQube)   - Build   - Deploy to staging   - DAST scan (OWASP ZAP)   - Deploy to production",
          "Configure infrastructure:   - Vercel for frontend   - Railway/Render for backend   - PostgreSQL with encrypted connections   - Environment variables for all secrets",
          "Run OWASP ZAP scan against the application",
          "Document all findings and remediations",
          "Perform manual testing of RBAC (try accessing other users' data)",
          "Write a Security Assessment Report:   - Executive summary   - Methodology   - Findings (with severity and remediation)   - OWASP Top 10 compliance matrix   - Data Protection Act compliance checklist",
          "Prepare 15-minute demo with security walkthrough",
        ],
        checkpoint: "Application deployed, security scan complete, audit report delivered",
        estimatedHours: 8,
      },
    ],
    deliverables: [
      "Architecture document with threat model",
      "OpenAPI/Swagger API specification",
      "Source code (frontend + backend) in public GitHub repo",
      "CI/CD pipeline configuration",
      "Deployed application (live URL)",
      "OWASP Top 10 compliance matrix",
      "Security Assessment Report",
      "Ghana Data Protection Act compliance checklist",
      "Test coverage report (80%+ target)",
      "15-minute presentation with security walkthrough",
    ],
    rubric: [
      { criterion: "Authentication is secure (MFA, JWT, refresh tokens, password policy)", points: 15, description: "MFA works, tokens expire appropriately, refresh flow is secure" },
      { criterion: "RBAC is correctly implemented and tested", points: 15, description: "Users can only access resources they're authorized for, tested with multiple roles" },
      { criterion: "OWASP Top 10 mitigations are documented and verified", points: 20, description: "Each OWASP category has a mitigation, evidence of testing, and no critical findings" },
      { criterion: "Data protection (encryption, audit logging, retention) is implemented", points: 10, description: "PHI is encrypted at rest and in transit, audit logs track access" },
      { criterion: "Application is functional and demonstrates real user flows", points: 10, description: "Registration, login, booking, consultation flow all work end-to-end" },
      { criterion: "CI/CD pipeline includes security scanning", points: 10, description: "SAST/DAST integrated, deployments are automated" },
      { criterion: "Security Assessment Report is thorough and professional", points: 10, description: "Report follows industry format, findings have severity and remediation" },
      { criterion: "Code quality: TypeScript, tests, clean architecture", points: 10, description: "No any types, 80%+ test coverage, clean separation of concerns" },
    ],
    estimatedHours: 34,
    prerequisites: ["Web Dev Fundamentals", "React Frontend", "Node.js Backend", "Cybersecurity Fundamentals"],
    industryAlignment: "OWASP Top 10 (2021), Ghana Data Protection Act (Act 843), PCI-DSS v4.0 (Data Protection), AWS Well-Architected Framework (Security Pillar)"
  },

  // ════════════════════════════════════════════════════════════════
  // INDUSTRY CAPSTONE 4: Cloud Infrastructure with DevOps Pipeline
  // Aligns with: AWS Solutions Architect, CKA, HashiCorp Terraform Assoc
  // ════════════════════════════════════════════════════════════════
  {
    lessonId: "les-do-5-1",
    title: "Cloud-Native DevOps Pipeline — mPharma Supply Chain Dashboard",
    description: "Design and deploy a cloud-native infrastructure for mPharma's pharmaceutical supply chain dashboard. Implement infrastructure as code, containerize the application, deploy to Kubernetes, build a CI/CD pipeline, and set up monitoring with alerts. The system tracks medicine inventory across 200+ pharmacies in Ghana.",
    industryContext: "mPharma manages pharmaceutical supply chains across West Africa. They need a real-time dashboard showing medicine inventory, expiry tracking, and distribution across 200+ partner pharmacies in Ghana. The system must handle 10,000+ inventory updates per hour, provide 99.9% uptime, and scale during peak distribution periods. The CTO wants to modernize from a monolithic architecture to a cloud-native microservices approach using Kubernetes.",
    objectives: [
      "Design a microservices architecture for the supply chain dashboard",
      "Write Terraform modules for AWS infrastructure",
      "Containerize services with Docker following best practices",
      "Deploy to Kubernetes with proper resource management",
      "Build a CI/CD pipeline with automated testing and security scanning",
      "Implement monitoring with Prometheus, Grafana, and alerting",
      "Achieve zero-downtime deployments",
      "Document everything for the operations team",
    ],
    phases: [
      {
        phase: 1, name: "Architecture Design & IaC Foundation",
        description: "Design the cloud architecture and create Terraform modules.",
        tasks: [
          "Design microservices architecture:   - API Gateway (Kong/Nginx Ingress)   - Auth Service (JWT/OAuth2)   - Inventory Service (CRUD + real-time updates)   - Distribution Service (tracking, routing)   - Notification Service (SMS, email, WhatsApp)   - Analytics Service (aggregation, reporting)   - Frontend (React SPA)",
          "Design data architecture:   - PostgreSQL for transactional data   - Redis for caching and real-time pub/sub   - S3 for document storage (invoices, delivery receipts)",
          "Write Terraform modules:   - VPC module (public/private subnets, NAT, IGW)   - EKS module (Kubernetes cluster)   - RDS module (PostgreSQL with encryption)   - ElastiCache module (Redis)   - S3 module (with versioning and encryption)   - IAM module (least privilege roles)",
          "Implement Terraform workspaces: dev, staging, production",
          "Configure S3 backend with DynamoDB state locking",
          "Validate: terraform plan shows expected resources",
        ],
        checkpoint: "Terraform plan succeeds for all three environments, architecture diagram approved",
        estimatedHours: 6,
      },
      {
        phase: 2, name: "Containerization & Kubernetes Deployment",
        description: "Containerize all services and create Kubernetes manifests.",
        tasks: [
          "Write production Dockerfiles for each service:   - Multi-stage builds (build → production)   - Non-root user   - Health check endpoints   - Minimal base images (Alpine/distroless)",
          "Create docker-compose.yml for local development",
          "Write Kubernetes manifests:   - Deployments with resource limits and requests   - Services (ClusterIP for internal, NodePort for external)   - ConfigMaps for non-sensitive config   - Secrets for credentials (sealed-secrets or external-secrets)   - Ingress with TLS termination   - HPA (Horizontal Pod Autoscaler) based on CPU/memory",
          "Implement network policies:   - Frontend can only talk to API Gateway   - API Gateway routes to appropriate services   - Services can only talk to their own database",
          "Set up namespace isolation: dev, staging, production",
          "Deploy to staging cluster and verify all services are healthy",
        ],
        checkpoint: "All services deployed to staging, health checks pass, HPA scales correctly",
        estimatedHours: 8,
      },
      {
        phase: 3, name: "CI/CD Pipeline & Security",
        description: "Build a complete CI/CD pipeline with security gates.",
        tasks: [
          "Create GitHub Actions workflow:   Stage 1 — PR Checks:     - Lint (ESLint, Prettier)     - Type check (TypeScript)     - Unit tests (Jest/Vitest)     - Security scan (Semgrep SAST)     - Dependency audit (npm audit)   Stage 2 — Merge to Main:     - Build Docker images     - Push to ECR     - Deploy to staging     - Integration tests     - DAST scan (OWASP ZAP)   Stage 3 — Release:     - Manual approval gate     - Deploy to production (canary)     - Smoke tests     - Notify Slack",
          "Implement canary deployment:   - Deploy new version to 10% of traffic   - Monitor error rates and latency   - Auto-rollback if error rate > 1%   - Full rollout after 15 minutes if healthy",
          "Set up image scanning in ECR",
          "Implement RBAC for Kubernetes cluster access",
          "Document the pipeline for the team",
        ],
        checkpoint: "Pipeline runs end-to-end, canary deployment works, rollback tested",
        estimatedHours: 8,
      },
      {
        phase: 4, name: "Monitoring, Alerting & Documentation",
        description: "Set up comprehensive monitoring and produce operations documentation.",
        tasks: [
          "Deploy Prometheus + Grafana stack:   - Node exporter for infrastructure metrics   - cAdvisor for container metrics   - Custom application metrics (request rate, error rate, latency)   - Business metrics (inventory updates/hour, active users)",
          "Create Grafana dashboards:   - Infrastructure overview (CPU, memory, disk, network)   - Application performance (response time, error rate, throughput)   - Business metrics (inventory levels, distribution status)   - Kubernetes cluster health (pod status, resource usage)",
          "Configure Alertmanager:   - CPU > 80% for 5 minutes → warning   - CPU > 95% for 2 minutes → critical   - Error rate > 1% → critical   - Pod restart loop → critical   - Certificate expiry < 30 days → warning   - Disk usage > 85% → warning",
          "Set up log aggregation (ELK or Loki)",
          "Produce Operations Runbook:   - How to scale services   - How to roll back a deployment   - How to respond to alerts   - How to rotate secrets   - Disaster recovery procedures",
          "Present architecture and demo to CTO (instructor/peers)",
        ],
        checkpoint: "Monitoring is live, alerts fire on test conditions, runbook is complete",
        estimatedHours: 6,
      },
    ],
    deliverables: [
      "Architecture document with microservices diagram",
      "Terraform modules (VPC, EKS, RDS, Redis, S3, IAM)",
      "Terraform workspaces for dev/staging/production",
      "Dockerized services with production Dockerfiles",
      "Kubernetes manifests (Deployments, Services, Ingress, HPA, NetworkPolicy)",
      "CI/CD pipeline (GitHub Actions) with security scanning",
      "Prometheus + Grafana dashboards",
      "Alertmanager configuration with runbooks",
      "Operations Runbook",
      "15-minute presentation with live demo",
    ],
    rubric: [
      { criterion: "Terraform modules are reusable, parameterized, and documented", points: 15, description: "Modules use variables, outputs, and have clear documentation" },
      { criterion: "Kubernetes manifests follow best practices", points: 15, description: "Resource limits, health checks, RBAC, network policies, secrets management" },
      { criterion: "Docker images follow security best practices", points: 10, description: "Multi-stage builds, non-root user, minimal base, no secrets in image" },
      { criterion: "CI/CD pipeline includes security gates", points: 15, description: "SAST, DAST, dependency audit, image scanning, manual approval" },
      { criterion: "Canary deployment with auto-rollback works", points: 10, description: "10% traffic shift, monitoring, auto-rollback on error rate" },
      { criterion: "Monitoring provides actionable visibility", points: 10, description: "Dashboards show infrastructure, application, and business metrics" },
      { criterion: "Alerting is meaningful (not just noise)", points: 5, description: "Alerts have clear severity, escalation, and runbook links" },
      { criterion: "Operations Runbook enables team self-service", points: 10, description: "Runbook covers scaling, rollback, secret rotation, disaster recovery" },
      { criterion: "Presentation demonstrates architectural understanding", points: 10, description: "Clear explanation of trade-offs, cost optimization, and scaling strategy" },
    ],
    estimatedHours: 28,
    prerequisites: ["Cloud Computing Foundations", "Docker & Kubernetes", "DevOps & CI/CD", "Node.js Backend"],
    industryAlignment: "AWS Solutions Architect Associate (Domain 1-4), CKA (Kubernetes), HashiCorp Terraform Associate, CNCF Cloud Native Landscape"
  },
];

export const LAB_BY_LESSON_ID: Record<string, LabEnvironment> = {};
for (const lab of LAB_ENVIRONMENTS) {
  LAB_BY_LESSON_ID[lab.lessonId] = lab;
}

export const CAPSTONE_BY_LESSON_ID: Record<string, CapstoneProject> = {};
for (const project of CAPSTONE_PROJECTS) {
  CAPSTONE_BY_LESSON_ID[project.lessonId] = project;
}
