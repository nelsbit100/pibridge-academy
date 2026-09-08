// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Expanded Course Content
// Full modules/lessons for Intermediate, Advanced, and High-Demand courses
// ──────────────────────────────────────────────────────────────

import type { Module } from "./types";

// ════════════════════════════════════════════════════════════════
// CYBERSECURITY INTERMEDIATE — SOC Analyst Programme
// ════════════════════════════════════════════════════════════════

export const SOC_THREAT_INTEL_MODULES: Module[] = [
  {
    id: "mod-ti-1", courseId: "course-threat-intel", order: 1,
    title: "Introduction to Threat Intelligence",
    description: "Understand the threat intelligence lifecycle and frameworks.",
    lessons: [
      { id: "l-ti-1-1", moduleId: "mod-ti-1", title: "What is Threat Intelligence?", type: "reading", durationMinutes: 20, order: 1, content: "Threat intelligence is evidence-based knowledge about existing or emerging threats. It includes context, mechanisms, indicators, implications, and actionable advice. The threat intelligence cycle consists of: Planning & Direction → Collection → Processing → Analysis → Dissemination → Feedback. Understanding the difference between strategic, operational, tactical, and technical intelligence is essential for a SOC analyst.", isPreview: false },
      { id: "l-ti-1-2", moduleId: "mod-ti-1", title: "MITRE ATT&CK Framework Deep Dive", type: "video", durationMinutes: 45, order: 2, videoUrl: "https://example.com/videos/mitre-attack", isPreview: false },
      { id: "l-ti-1-3", moduleId: "mod-ti-1", title: "Cyber Kill Chain Analysis", type: "reading", durationMinutes: 25, order: 3, content: "The Lockheed Martin Cyber Kill Chain models the stages of a cyberattack: Reconnaissance → Weaponization → Delivery → Exploitation → Installation → Command & Control → Actions on Objectives. Each stage produces detectable indicators that a SOC can monitor.", isPreview: false },
      { id: "l-ti-1-4", moduleId: "mod-ti-1", title: "Quiz: Threat Intelligence Fundamentals", type: "quiz", durationMinutes: 10, order: 4, isPreview: false },
    ],
  },
  {
    id: "mod-ti-2", courseId: "course-threat-intel", order: 2,
    title: "Indicators of Compromise (IOCs)",
    description: "Identify, collect, and analyze IOCs from various sources.",
    lessons: [
      { id: "l-ti-2-1", moduleId: "mod-ti-2", title: "Types of IOCs", type: "reading", durationMinutes: 25, order: 1, content: "IOCs include: IP addresses, domain names, URLs, file hashes (MD5, SHA-1, SHA-256), email addresses, file names, registry keys, mutexes, TLS certificates, JA3 hashes. Understanding which IOC types are high-fidelity vs noisy is critical for effective detection.", isPreview: false },
      { id: "l-ti-2-2", moduleId: "mod-ti-2", title: "IOC Collection Tools", type: "lab", durationMinutes: 40, order: 2, content: "Lab: Use VirusTotal, AbuseIPDB, and MISP to collect and enrich IOCs from a sample incident. Create an IOC report in structured format (STIX/TAXII).", isPreview: false },
      { id: "l-ti-2-3", moduleId: "mod-ti-2", title: "IOC Lifecycle Management", type: "reading", durationMinutes: 20, order: 3, content: "IOCs have a shelf life. IP addresses rotate, domains change ownership, file hashes become obsolete. Effective IOC management requires: validation, enrichment, confidence scoring, expiration, and continuous更新.", isPreview: false },
    ],
  },
  {
    id: "mod-ti-3", courseId: "course-threat-intel", order: 3,
    title: "Open Source Intelligence (OSINT)",
    description: "Master OSINT techniques for threat research.",
    lessons: [
      { id: "l-ti-3-1", moduleId: "mod-ti-3", title: "OSINT Fundamentals", type: "reading", durationMinutes: 30, order: 1, content: "OSINT leverages publicly available information: social media, news, government records, WHOIS, DNS records, paste sites, dark web monitoring, code repositories, job postings. Legal and ethical boundaries must always be respected.", isPreview: false },
      { id: "l-ti-3-2", moduleId: "mod-ti-3", title: "OSINT Tools Lab", type: "lab", durationMinutes: 45, order: 2, content: "Lab: Use Shodan, Censys, theHarvester, and Recon-ng to perform reconnaissance on a target organization. Document findings in a structured report.", isPreview: false },
      { id: "l-ti-3-3", moduleId: "mod-ti-3", title: "Threat Actor Profiling", type: "reading", durationMinutes: 35, order: 3, content: "Understand APT groups, their TTPs, motivations, and target sectors. Learn to map threat actor behavior to MITRE ATT&CK. Study real-world campaigns: APT28 (Fancy Bear), APT29 (Cozy Bear), Lazarus Group, FIN7.", isPreview: false },
    ],
  },
  {
    id: "mod-ti-4", courseId: "course-threat-intel", order: 4,
    title: "Threat Intelligence Platforms",
    description: "Operate MISP, OpenCTI, and commercial TI platforms.",
    lessons: [
      { id: "l-ti-4-1", moduleId: "mod-ti-4", title: "MISP Operations", type: "lab", durationMinutes: 50, order: 1, content: "Lab: Deploy MISP locally, create events, add attributes, set sharing models, create correlation graphs, and export IOCs in STIX format.", isPreview: false },
      { id: "l-ti-4-2", moduleId: "mod-ti-4", title: "OpenCTI & STIX/TAXII", type: "reading", durationMinutes: 30, order: 2, content: "STIX (Structured Threat Information eXpression) and TAXII (Trusted Automated eXchange of Intelligence Information) are standards for sharing threat intelligence. Understand STIX objects, relationships, and bundles.", isPreview: false },
      { id: "l-ti-4-3", moduleId: "mod-ti-4", title: "Intelligence-Driven Detection", type: "reading", durationMinutes: 25, order: 3, content: "Transform threat intelligence into actionable detection rules. Map IOCs and TTPs to SIEM queries, IDS signatures, and EDR policies. Intelligence-driven security operations reduce mean-time-to-detect (MTTD).", isPreview: false },
    ],
  },
  {
    id: "mod-ti-5", courseId: "course-threat-intel", order: 5,
    title: "Threat Intelligence Reporting",
    description: "Produce professional threat intelligence reports.",
    lessons: [
      { id: "l-ti-5-1", moduleId: "mod-ti-5", title: "Report Writing for SOC", type: "reading", durationMinutes: 30, order: 1, content: "A good threat intelligence report includes: Executive Summary, Scope, Methodology, Findings (IOCs, TTPs, affected systems), Analysis, Recommendations, and Appendix. Reports must be actionable and audience-appropriate.", isPreview: false },
      { id: "l-ti-5-2", moduleId: "mod-ti-5", title: "Capstone: Threat Intelligence Report", type: "project", durationMinutes: 120, order: 2, content: "Produce a complete threat intelligence report for a simulated attack on a Ghanaian financial institution. Include IOC analysis, MITRE ATT&CK mapping, attribution assessment, and defense recommendations.", isPreview: false },
    ],
  },
];

export const SOC_DETECTION_MODULES: Module[] = [
  {
    id: "mod-de-1", courseId: "course-detection-eng", order: 1,
    title: "Detection Engineering Principles",
    description: "Understand the theory behind effective security detection.",
    lessons: [
      { id: "l-de-1-1", moduleId: "mod-de-1", title: "Detection-as-Code Philosophy", type: "reading", durationMinutes: 25, order: 1, content: "Detection-as-Code applies software engineering practices to security detection: version control, code review, testing, CI/CD for detection rules. This ensures detection quality, reproducibility, and auditability.", isPreview: false },
      { id: "l-de-1-2", moduleId: "mod-de-1", title: "Detection Rule Lifecycle", type: "reading", durationMinutes: 20, order: 2, content: "Detection rules follow a lifecycle: Draft → Test → Deploy → Tune → Retire. Each rule should have: name, description, MITRE mapping, severity, false positive rate, and owner.", isPreview: false },
      { id: "l-de-1-3", moduleId: "mod-de-1", title: "Signal vs Noise", type: "reading", durationMinutes: 20, order: 3, content: "The goal of detection engineering is to maximize true positives while minimizing false positives. Understand precision, recall, and the trade-off between sensitivity and specificity in detection.", isPreview: false },
    ],
  },
  {
    id: "mod-de-2", courseId: "course-detection-eng", order: 2,
    title: "Splunk Detection Rules",
    description: "Write detection rules using SPL (Search Processing Language).",
    lessons: [
      { id: "l-de-2-1", moduleId: "mod-de-2", title: "SPL Fundamentals for Detection", type: "lab", durationMinutes: 45, order: 1, content: "Lab: Write 5 detection rules in Splunk SPL: brute force detection, unusual login times, privilege escalation, lateral movement, and data exfiltration indicators.", isPreview: false },
      { id: "l-de-2-2", moduleId: "mod-de-2", title: "Correlation Rules", type: "lab", durationMinutes: 40, order: 2, content: "Lab: Create correlation rules that combine multiple events: login failure + successful login + unusual process = compromised account alert.", isPreview: false },
      { id: "l-de-2-3", moduleId: "mod-de-2", title: "Threshold vs Behavioral Rules", type: "reading", durationMinutes: 25, order: 3, content: "Threshold alerts fire when counts exceed limits. Behavioral alerts detect deviations from baselines. Both are needed in a mature detection strategy.", isPreview: false },
    ],
  },
  {
    id: "mod-de-3", courseId: "course-detection-eng", order: 3,
    title: "MITRE ATT&CK Mapped Detections",
    description: "Build detections mapped to specific ATT&CK techniques.",
    lessons: [
      { id: "l-de-3-1", moduleId: "mod-de-3", title: "Initial Access Detections (TA0001)", type: "lab", durationMinutes: 40, order: 1, content: "Lab: Build detection rules for phishing (T1566), drive-by compromise (T1189), and exploitation of public-facing applications (T1190).", isPreview: false },
      { id: "l-de-3-2", moduleId: "mod-de-3", title: "Execution & Persistence Detections", type: "lab", durationMinutes: 45, order: 2, content: "Lab: Create rules for command-line scripting (T1059), scheduled tasks (T1053), registry run keys (T1547), and new service creation (T1543).", isPreview: false },
      { id: "l-de-3-3", moduleId: "mod-de-3", title: "Exfiltration & Impact Detections", type: "lab", durationMinutes: 40, order: 3, content: "Lab: Build rules for DNS tunneling exfiltration (T1071/T1048), large file transfers, ransomware file encryption patterns (T1486), and data destruction (T1485).", isPreview: false },
    ],
  },
  {
    id: "mod-de-4", courseId: "course-detection-eng", order: 4,
    title: "Detection Rule Testing & Tuning",
    description: "Test detection rules and reduce false positives.",
    lessons: [
      { id: "l-de-4-1", moduleId: "mod-de-4", title: "Atomic Red Team Testing", type: "lab", durationMinutes: 50, order: 1, content: "Lab: Use Atomic Red Team to simulate ATT&CK techniques and validate that detection rules fire correctly. Document test results.", isPreview: false },
      { id: "l-de-4-2", moduleId: "mod-de-4", title: "False Positive Analysis", type: "reading", durationMinutes: 25, order: 2, content: "Common sources of false positives: legitimate admin tools, scheduled tasks, vulnerability scanners, backup software. Techniques to reduce FPs: allowlists, exclusions, scoring, context enrichment.", isPreview: false },
      { id: "l-de-4-3", moduleId: "mod-de-4", title: "Detection-as-Code CI/CD", type: "reading", durationMinutes: 30, order: 3, content: "Implement detection rules in version control, use PR reviews, automated testing with Atomic Red Team, and deployment pipelines. Tools: Sigma rules, Demisto content packs.", isPreview: false },
    ],
  },
  {
    id: "mod-de-5", courseId: "course-detection-eng", order: 5,
    title: "Detection Engineering Capstone",
    description: "Build a complete detection rule set for a SOC.",
    lessons: [
      { id: "l-de-5-1", moduleId: "mod-de-5", title: "Capstone: Detection Rule Set", type: "project", durationMinutes: 180, order: 1, content: "Build a complete detection rule set for a mid-size organization covering all 14 MITRE ATT&CK tactic categories. Include at least 30 rules with Sigma format, false positive documentation, and testing results.", isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// CYBERSECURITY ADVANCED — Security Engineer & Architect
// ════════════════════════════════════════════════════════════════

export const SEC_PENTESTING_MODULES: Module[] = [
  {
    id: "mod-pt-1", courseId: "course-pentesting", order: 1,
    title: "Penetration Testing Methodology",
    description: "Master the PTES and OWASP testing frameworks.",
    lessons: [
      { id: "l-pt-1-1", moduleId: "mod-pt-1", title: "PTES & Testing Standards", type: "reading", durationMinutes: 30, order: 1, content: "The Penetration Testing Execution Standard (PTES) defines 7 phases: Intelligence Gathering → Threat Modeling → Vulnerability Analysis → Exploitation → Post-Exploitation → Reporting → Remediation. Understand legal requirements, scope agreements, and rules of engagement.", isPreview: false },
      { id: "l-pt-1-2", moduleId: "mod-pt-1", title: "Kali Linux & Tool Setup", type: "lab", durationMinutes: 40, order: 2, content: "Lab: Set up a complete penetration testing environment with Kali Linux, Metasploitable, DVWA, and VirtualBox networking. Configure Nmap, Burp Suite, Metasploit, and John the Ripper.", isPreview: false },
      { id: "l-pt-1-3", moduleId: "mod-pt-1", title: "Legal & Ethical Framework", type: "reading", durationMinutes: 20, order: 3, content: "Penetration testing without authorization is illegal. Understand Ghana's Cybersecurity Act 2020, scope documents, NDAs, and responsible disclosure policies.", isPreview: false },
    ],
  },
  {
    id: "mod-pt-2", courseId: "course-pentesting", order: 2,
    title: "Network Penetration Testing",
    description: "Exploit network-level vulnerabilities.",
    lessons: [
      { id: "l-pt-2-1", moduleId: "mod-pt-2", title: "Network Reconnaissance", type: "lab", durationMinutes: 45, order: 1, content: "Lab: Perform network discovery with Nmap (host discovery, port scanning, service enumeration, OS detection). Use masscan for large-scale scanning. Parse and document results.", isPreview: false },
      { id: "l-pt-2-2", moduleId: "mod-pt-2", title: "Man-in-the-Middle Attacks", type: "lab", durationMinutes: 40, order: 2, content: "Lab: Execute ARP poisoning with Bettercap, capture HTTPS downgrade attacks, perform DNS spoofing. Understand and demonstrate countermeasures.", isPreview: false },
      { id: "l-pt-2-3", moduleId: "mod-pt-2", title: "Privilege Escalation", type: "lab", durationMinutes: 50, order: 3, content: "Lab: Exploit SUID binaries, kernel vulnerabilities, misconfigured services, and credential harvesting to escalate from user to root on Linux and Windows targets.", isPreview: false },
    ],
  },
  {
    id: "mod-pt-3", courseId: "course-pentesting", order: 3,
    title: "Web Application Penetration Testing",
    description: "Exploit web application vulnerabilities following OWASP Top 10.",
    lessons: [
      { id: "l-pt-3-1", moduleId: "mod-pt-3", title: "OWASP Top 10 Deep Dive", type: "reading", durationMinutes: 35, order: 1, content: "Comprehensive review of OWASP Top 10 2021: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable Components, Auth Failures, Data Integrity, Logging Failures, SSRF.", isPreview: false },
      { id: "l-pt-3-2", moduleId: "mod-pt-3", title: "SQL Injection Masterclass", type: "lab", durationMinutes: 50, order: 2, content: "Lab: Exploit blind SQL injection, time-based injection, UNION-based injection, and second-order injection on DVWA. Use sqlmap for automated exploitation. Implement parameterized queries as remediation.", isPreview: false },
      { id: "l-pt-3-3", moduleId: "mod-pt-3", title: "Burp Suite Advanced", type: "lab", durationMinutes: 45, order: 3, content: "Lab: Use Burp Suite for comprehensive web app testing: intercept, modify, replay, scan. Find and exploit XSS, CSRF, SSRF, IDOR, and authentication bypass vulnerabilities.", isPreview: false },
    ],
  },
  {
    id: "mod-pt-4", courseId: "course-pentesting", order: 4,
    title: "Report Writing & Remediation",
    description: "Write professional penetration test reports.",
    lessons: [
      { id: "l-pt-4-1", moduleId: "mod-pt-4", title: "Penetration Test Report Structure", type: "reading", durationMinutes: 25, order: 1, content: "Report sections: Executive Summary, Scope & Methodology, Findings (Critical/High/Medium/Low), Evidence, Remediation Roadmap, Appendix. Each finding must include: description, impact, proof of concept, and fix.", isPreview: false },
      { id: "l-pt-4-2", moduleId: "mod-pt-4", title: "Capstone: Full Penetration Test", type: "project", durationMinutes: 240, order: 2, content: "Conduct a complete penetration test against a simulated Ghanaian fintech company. Deliver: scope document, findings report with risk ratings, remediation plan, and executive briefing.", isPreview: false },
    ],
  },
];

export const SEC_CLOUD_SEC_MODULES: Module[] = [
  {
    id: "mod-cs-1", courseId: "course-cloud-security", order: 1,
    title: "Cloud Security Fundamentals",
    description: "Understand the shared responsibility model and cloud security architecture.",
    lessons: [
      { id: "l-cs-1-1", moduleId: "mod-cs-1", title: "Shared Responsibility Model", type: "reading", durationMinutes: 25, order: 1, content: "In IaaS, the provider secures the infrastructure; you secure the OS, apps, and data. In PaaS, the provider also manages the runtime. In SaaS, you primarily manage data and access. Misunderstanding this model is the #1 cause of cloud breaches.", isPreview: false },
      { id: "l-cs-1-2", moduleId: "mod-cs-1", title: "AWS Security Services", type: "reading", durationMinutes: 30, order: 2, content: "Key AWS security services: IAM, Security Hub, GuardDuty, CloudTrail, Config, KMS, WAF, Shield, Macie, Detective. Understand how they compose a defense-in-depth strategy.", isPreview: false },
      { id: "l-cs-1-3", moduleId: "mod-cs-1", title: "Azure Security Services", type: "reading", durationMinutes: 30, order: 3, content: "Key Azure security services: Azure AD/Entra ID, Microsoft Defender for Cloud, Sentinel, Key Vault, Policy, Blueprints. Compare with AWS equivalents.", isPreview: false },
    ],
  },
  {
    id: "mod-cs-2", courseId: "course-cloud-security", order: 2,
    title: "IAM & Access Control in Cloud",
    description: "Implement zero-trust identity in cloud environments.",
    lessons: [
      { id: "l-cs-2-1", moduleId: "mod-cs-2", title: "Principle of Least Privilege", type: "lab", durationMinutes: 40, order: 1, content: "Lab: Create least-privilege IAM policies in AWS. Audit existing policies with IAM Access Analyzer. Remediate over-permissive policies.", isPreview: false },
      { id: "l-cs-2-2", moduleId: "mod-cs-2", title: "SSO & Federation", type: "reading", durationMinutes: 30, order: 2, content: "Implement SAML 2.0 and OIDC-based SSO. Configure Azure AD B2B federation. Understand SCIM for user provisioning. Enforce MFA for all cloud admin access.", isPreview: false },
    ],
  },
  {
    id: "mod-cs-3", courseId: "course-cloud-security", order: 3,
    title: "Cloud Infrastructure Hardening",
    description: "Harden cloud deployments following CIS benchmarks.",
    lessons: [
      { id: "l-cs-3-1", moduleId: "mod-cs-3", title: "CIS AWS Foundations Benchmark", type: "lab", durationMinutes: 50, order: 1, content: "Lab: Audit an AWS account against CIS Benchmark v2.0 using Prowler. Remediate: root account usage, CloudTrail enabled, MFA on IAM users, S3 bucket policies, security groups.", isPreview: false },
      { id: "l-cs-3-2", moduleId: "mod-cs-3", title: "Network Security in Cloud", type: "reading", durationMinutes: 30, order: 2, content: "VPC design, security groups vs NACLs, VPC peering, PrivateLink, network segmentation, flow logs, and traffic analysis.", isPreview: false },
    ],
  },
  {
    id: "mod-cs-4", courseId: "course-cloud-security", order: 4,
    title: "Cloud Compliance & Governance",
    description: "Implement compliance frameworks in cloud environments.",
    lessons: [
      { id: "l-cs-4-1", moduleId: "mod-cs-4", title: "Cloud Governance Frameworks", type: "reading", durationMinutes: 30, order: 1, content: "Implement governance with AWS Config Rules, Azure Policy, and Organization SCPs. Build compliance dashboards. Map controls to ISO 27001, SOC 2, and Ghana DPA requirements.", isPreview: false },
      { id: "l-cs-4-2", moduleId: "mod-cs-4", title: "Capstone: Secure Cloud Architecture", type: "project", durationMinutes: 180, order: 2, content: "Design and document a secure multi-account AWS/Azure architecture for a Ghanaian healthcare company. Include IAM design, network segmentation, encryption, logging, monitoring, incident response, and compliance mapping to Ghana DPA and ISO 27001.", isPreview: false },
    ],
  },
];

export const SEC_ARCHITECTURE_MODULES: Module[] = [
  {
    id: "mod-sa-1", courseId: "course-security-architecture", order: 1,
    title: "Security Architecture Principles",
    description: "Learn zero trust, defense-in-depth, and secure design patterns.",
    lessons: [
      { id: "l-sa-1-1", moduleId: "mod-sa-1", title: "Zero Trust Architecture", type: "reading", durationMinutes: 30, order: 1, content: "Zero Trust principles: never trust, always verify; assume breach; verify explicitly; use least-privilege access; micro-segment the network. Reference NIST SP 800-207. Implement with BeyondCorp and ZTNA solutions.", isPreview: false },
      { id: "l-sa-1-2", moduleId: "mod-sa-1", title: "Threat Modeling with STRIDE & PASTA", type: "lab", durationMinutes: 45, order: 2, content: "Lab: Apply STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, DoE, Elevation) to a banking application architecture. Create a PASTA threat model.", isPreview: false },
      { id: "l-sa-1-3", moduleId: "mod-sa-1", title: "Secure Design Patterns", type: "reading", durationMinutes: 25, order: 3, content: "Patterns: Fail-secure, defense-in-depth, separation of duties, least privilege, complete mediation, psychological acceptability, economy of mechanism.", isPreview: false },
    ],
  },
  {
    id: "mod-sa-2", courseId: "course-security-architecture", order: 2,
    title: "Enterprise Security Architecture",
    description: "Design end-to-end enterprise security architectures.",
    lessons: [
      { id: "l-sa-2-1", moduleId: "mod-sa-2", title: "TOGAF for Security", type: "reading", durationMinutes: 30, order: 1, content: "Apply TOGAF ADM to security architecture. Define: Security Baseline, Reference Architecture, Capability Architecture, Migration Plan. Align with business goals and risk appetite.", isPreview: false },
      { id: "l-sa-2-2", moduleId: "mod-sa-2", title: "Network Security Architecture", type: "lab", durationMinutes: 50, order: 2, content: "Lab: Design a segmented enterprise network with DMZ, internal zones, management plane, and data plane. Implement micro-segmentation with firewall rules, VPN architecture, and jump servers.", isPreview: false },
    ],
  },
  {
    id: "mod-sa-3", courseId: "course-security-architecture", order: 3,
    title: "Security Leadership",
    description: "Lead security teams and build security culture.",
    lessons: [
      { id: "l-sa-3-1", moduleId: "mod-sa-3", title: "Building a Security Program", type: "reading", durationMinutes: 30, order: 1, content: "Security program maturity models (CMM), security metrics, budget justification, board reporting, vendor management, and building a security culture that balances protection with business enablement.", isPreview: false },
      { id: "l-sa-3-2", moduleId: "mod-sa-3", title: "Capstone: Enterprise Security Architecture", type: "project", durationMinutes: 240, order: 2, content: "Design a complete security architecture for a 500-person Ghanaian bank. Deliver: threat model, security architecture document, IAM design, network architecture, logging strategy, incident response plan, compliance roadmap (ISO 27001, PCI-DSS), and board-ready presentation.", isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// SOFTWARE ENGINEERING INTERMEDIATE & ADVANCED
// ════════════════════════════════════════════════════════════════

export const SE_FULLSTACK_MODULES: Module[] = [
  {
    id: "mod-fs-1", courseId: "course-fullstack-project", order: 1,
    title: "Full-Stack Architecture",
    description: "Design and implement a production full-stack application.",
    lessons: [
      { id: "l-fs-1-1", moduleId: "mod-fs-1", title: "Application Architecture Patterns", type: "reading", durationMinutes: 30, order: 1, content: "MVC, MVVM, Clean Architecture, and Feature-Sliced Design. Choose the right pattern based on application complexity. Design for testability, maintainability, and scalability.", isPreview: false },
      { id: "l-fs-1-2", moduleId: "mod-fs-1", title: "Database Design for Full-Stack", type: "reading", durationMinutes: 35, order: 2, content: "Normalization, indexing strategies, migration management with Prisma, connection pooling, and query optimization. Design schemas that support your application's access patterns.", isPreview: false },
      { id: "l-fs-1-3", moduleId: "mod-fs-1", title: "Authentication & Authorization", type: "lab", durationMinutes: 45, order: 3, content: "Lab: Implement JWT-based authentication with refresh tokens, RBAC middleware, password hashing with Argon2, and secure cookie handling. Build registration, login, password reset, and email verification flows.", isPreview: false },
    ],
  },
  {
    id: "mod-fs-2", courseId: "course-fullstack-project", order: 2,
    title: "API Development",
    description: "Build robust RESTful APIs with validation and documentation.",
    lessons: [
      { id: "l-fs-2-1", moduleId: "mod-fs-2", title: "REST API Design", type: "reading", durationMinutes: 25, order: 1, content: "RESTful principles: resource naming, HTTP methods, status codes, pagination, filtering, sorting, HATEOAS, versioning. Design APIs that developers love to use.", isPreview: false },
      { id: "l-fs-2-2", moduleId: "mod-fs-2", title: "API Validation & Error Handling", type: "lab", durationMinutes: 40, order: 2, content: "Lab: Implement comprehensive DTO validation with class-validator, global exception filters, standardized error responses, and request ID tracking.", isPreview: false },
      { id: "l-fs-2-3", moduleId: "mod-fs-2", title: "API Documentation with Swagger", type: "lab", durationMinutes: 30, order: 3, content: "Lab: Generate OpenAPI documentation with @nestjs/swagger. Create comprehensive API docs with request/response examples, authentication requirements, and error codes.", isPreview: false },
    ],
  },
  {
    id: "mod-fs-3", courseId: "course-fullstack-project", order: 3,
    title: "Testing Strategy",
    description: "Implement unit, integration, and E2E testing.",
    lessons: [
      { id: "l-fs-3-1", moduleId: "mod-fs-3", title: "Testing Pyramid", type: "reading", durationMinutes: 20, order: 1, content: "Many unit tests, moderate integration tests, critical E2E tests. Test business logic, API endpoints, database operations, and user flows. Use Jest, Supertest, and Playwright.", isPreview: false },
      { id: "l-fs-3-2", moduleId: "mod-fs-3", title: "Writing Effective Tests", type: "lab", durationMinutes: 45, order: 2, content: "Lab: Write unit tests for services, integration tests for repositories, and E2E tests for API endpoints. Practice test-driven development (TDD) for a critical business feature.", isPreview: false },
    ],
  },
  {
    id: "mod-fs-4", courseId: "course-fullstack-project", order: 4,
    title: "Deployment & DevOps",
    description: "Deploy and monitor full-stack applications.",
    lessons: [
      { id: "l-fs-4-1", moduleId: "mod-fs-4", title: "Docker for Full-Stack Apps", type: "lab", durationMinutes: 40, order: 1, content: "Lab: Containerize the full-stack application with multi-stage Docker builds. Create docker-compose for local development with PostgreSQL, Redis, and MinIO.", isPreview: false },
      { id: "l-fs-4-2", moduleId: "mod-fs-4", title: "CI/CD Pipeline", type: "lab", durationMinutes: 45, order: 2, content: "Lab: Build a GitHub Actions CI/CD pipeline: lint → typecheck → test → build → deploy. Implement environment-based deployments (staging → production).", isPreview: false },
      { id: "l-fs-4-3", moduleId: "mod-fs-4", title: "Monitoring & Observability", type: "reading", durationMinutes: 25, order: 3, content: "Implement structured logging, error tracking (Sentry), performance monitoring (Prometheus/Grafana), uptime monitoring, and alerting. The three pillars: logs, metrics, traces.", isPreview: false },
    ],
  },
  {
    id: "mod-fs-5", courseId: "course-fullstack-project", order: 5,
    title: "Capstone: Production Application",
    description: "Build, deploy, and present a production-grade application.",
    lessons: [
      { id: "l-fs-5-1", moduleId: "mod-fs-5", title: "Capstone: Full-Stack MVP", type: "project", durationMinutes: 300, order: 1, content: "Build a production-grade multi-tenant SaaS application (project management tool for Ghanaian SMEs). Requirements: React + TypeScript frontend, NestJS + Prisma backend, PostgreSQL, Redis, Docker, CI/CD, automated testing, monitoring, deployment to cloud.", isPreview: false },
    ],
  },
];

export const SE_TECH_LEAD_MODULES: Module[] = [
  {
    id: "mod-tl-1", courseId: "course-system-design", order: 1,
    title: "System Design Fundamentals",
    description: "Master distributed systems design and architecture.",
    lessons: [
      { id: "l-tl-1-1", moduleId: "mod-tl-1", title: "Scalability Patterns", type: "reading", durationMinutes: 30, order: 1, content: "Horizontal vs vertical scaling, load balancing, caching (Redis, CDN), database sharding, read replicas, connection pooling. Calculate capacity: QPS, storage, bandwidth.", isPreview: false },
      { id: "l-tl-1-2", moduleId: "mod-tl-1", title: "CAP Theorem & Consistency", type: "reading", durationMinutes: 25, order: 2, content: "Consistency, Availability, Partition tolerance — choose two. Understand eventual consistency, strong consistency, and when to use each. Study real-world trade-offs.", isPreview: false },
      { id: "l-tl-1-3", moduleId: "mod-tl-1", title: "System Design Practice", type: "lab", durationMinutes: 60, order: 3, content: "Lab: Design a URL shortener, a real-time chat system, and an e-commerce checkout. Document: requirements, architecture, data model, API design, scaling strategy, and trade-offs.", isPreview: false },
    ],
  },
  {
    id: "mod-tl-2", courseId: "course-system-design", order: 2,
    title: "Architecture Decision Records",
    description: "Document and communicate architectural decisions.",
    lessons: [
      { id: "l-tl-2-1", moduleId: "mod-tl-2", title: "ADR Templates", type: "reading", durationMinutes: 20, order: 1, content: "Architecture Decision Records (ADRs) capture: context, decision, consequences, and alternatives considered. Format: Title, Status, Context, Decision, Consequences. Use tools like adr-tools for version control.", isPreview: false },
      { id: "l-tl-2-2", moduleId: "mod-tl-2", title: "Tech Debt Management", type: "reading", durationMinutes: 25, order: 2, content: "Identify, categorize, and prioritize tech debt. Use the Tech Debt Quadrant (Reckless/Deliberate × Prudent/Reckless). Build tech debt reduction into sprint planning.", isPreview: false },
    ],
  },
  {
    id: "mod-tl-3", courseId: "course-system-design", order: 3,
    title: "Engineering Leadership",
    description: "Lead engineering teams and deliver complex projects.",
    lessons: [
      { id: "l-tl-3-1", moduleId: "mod-tl-3", title: "Technical Leadership", type: "reading", durationMinutes: 30, order: 1, content: "Technical leadership vs management. Code review culture, mentoring, technical strategy, cross-team coordination, stakeholder communication, and building high-performing engineering teams.", isPreview: false },
      { id: "l-tl-3-2", moduleId: "mod-tl-3", title: "Capstone: System Design Presentation", type: "project", durationMinutes: 180, order: 2, content: "Design and present a complete technical architecture for a Ghanaian mobile money platform handling 1M transactions/day. Include: architecture diagrams, data model, API design, scaling strategy, disaster recovery, security architecture, and team structure.", isPreview: false },
    ],
  },
];

export const SE_ARCHITECT_MODULES: Module[] = [
  {
    id: "mod-swa-1", courseId: "course-software-architecture", order: 1,
    title: "Enterprise Architecture Patterns",
    description: "Master architectural patterns for large-scale systems.",
    lessons: [
      { id: "l-swa-1-1", moduleId: "mod-swa-1", title: "Microservices vs Modular Monolith", type: "reading", durationMinutes: 30, order: 1, content: "When to use modular monolith (MVP, small teams, tight coupling) vs microservices (scale, independent deployment, team autonomy). The modular monolith as a stepping stone. Domain-Driven Design boundaries.", isPreview: false },
      { id: "l-swa-1-2", moduleId: "mod-swa-1", title: "Event-Driven Architecture", type: "reading", durationMinutes: 35, order: 2, content: "Event sourcing, CQRS, saga pattern, outbox pattern. Use cases: order processing, payment workflows, audit trails. Implementation with RabbitMQ, Kafka, and Redis Streams.", isPreview: false },
      { id: "l-swa-1-3", moduleId: "mod-swa-1", title: "API Gateway & Service Mesh", type: "reading", durationMinutes: 25, order: 3, content: "API Gateway patterns (Kong, AWS API Gateway, NestJS Gateway). Service mesh with Istio for mTLS, load balancing, circuit breaking, and observability.", isPreview: false },
    ],
  },
  {
    id: "mod-swa-2", courseId: "course-software-architecture", order: 2,
    title: "Architecture Governance",
    description: "Establish and maintain architecture standards.",
    lessons: [
      { id: "l-swa-2-1", moduleId: "mod-swa-2", title: "Architecture Review Board", type: "reading", durationMinutes: 25, order: 1, content: "Establish an Architecture Review Board (ARB). Define review criteria, approval workflows, exception processes, and compliance tracking. Balance governance with developer velocity.", isPreview: false },
      { id: "l-swa-2-2", moduleId: "mod-swa-2", title: "Capstone: Enterprise Architecture", type: "project", durationMinutes: 240, order: 2, content: "Design a complete enterprise architecture for a Ghanaian telecommunications company: 5G network management, mobile money platform, enterprise cloud services, and IoT infrastructure. Deliver architecture documents, decision records, migration plan, and board presentation.", isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// CLOUD — Intermediate & Advanced
// ════════════════════════════════════════════════════════════════

export const CLOUD_ENGINEER_MODULES: Module[] = [
  {
    id: "mod-ce-1", courseId: "course-aws-advanced", order: 1,
    title: "Advanced AWS Services",
    description: "Master advanced AWS services for production workloads.",
    lessons: [
      { id: "l-ce-1-1", moduleId: "mod-ce-1", title: "VPC Advanced Design", type: "lab", durationMinutes: 45, order: 1, content: "Lab: Design a production VPC with public/private subnets across 3 AZs, NAT gateway, VPC endpoints, Transit Gateway, and network ACLs. Implement VPC Flow Logs and CloudWatch monitoring.", isPreview: false },
      { id: "l-ce-1-2", moduleId: "mod-ce-1", title: "Auto Scaling & Load Balancing", type: "lab", durationMinutes: 40, order: 2, content: "Lab: Configure Auto Scaling Groups with target tracking policies. Set up ALB with path-based routing, SSL termination, and health checks. Implement scaling based on custom CloudWatch metrics.", isPreview: false },
      { id: "l-ce-1-3", moduleId: "mod-ce-1", title: "RDS & Aurora", type: "lab", durationMinutes: 40, order: 3, content: "Lab: Deploy Multi-AZ RDS with read replicas. Configure automated backups, point-in-time recovery, and parameter groups. Migrate from RDS MySQL to Aurora with zero downtime.", isPreview: false },
    ],
  },
  {
    id: "mod-ce-2", courseId: "course-aws-advanced", order: 2,
    title: "Serverless Architecture",
    description: "Build event-driven serverless applications.",
    lessons: [
      { id: "l-ce-2-1", moduleId: "mod-ce-2", title: "Lambda & Step Functions", type: "lab", durationMinutes: 50, order: 1, content: "Lab: Build a serverless data processing pipeline with Lambda, Step Functions, SQS, and DynamoDB. Handle error states, retries, and dead letter queues.", isPreview: false },
      { id: "l-ce-2-2", moduleId: "mod-ce-2", title: "API Gateway + Lambda", type: "lab", durationMinutes: 40, order: 2, content: "Lab: Build a REST API with API Gateway, Lambda, and DynamoDB. Implement Cognito authentication, request validation, caching, and custom domains.", isPreview: false },
    ],
  },
  {
    id: "mod-ce-3", courseId: "course-aws-advanced", order: 3,
    title: "Cloud Cost Optimization",
    description: "Optimize cloud costs while maintaining performance.",
    lessons: [
      { id: "l-ce-3-1", moduleId: "mod-ce-3", title: "FinOps Principles", type: "reading", durationMinutes: 25, order: 1, content: "FinOps: Inform → Optimize → Operate. Use Cost Explorer, Budgets, Savings Plans, Reserved Instances, and Spot Instances. Tag strategy for cost allocation. Right-sizing recommendations.", isPreview: false },
      { id: "l-ce-3-2", moduleId: "mod-ce-3", title: "Capstone: Cloud Migration", type: "project", durationMinutes: 180, order: 2, content: "Design and execute a cloud migration for a Ghanaian logistics company. Deliver: migration strategy (6 Rs), landing zone design, security architecture, cost analysis, migration wave plan, and cutover checklist.", isPreview: false },
    ],
  },
];

export const CLOUD_SOLUTIONS_ARCH_MODULES: Module[] = [
  {
    id: "mod-sar-1", courseId: "course-multi-cloud", order: 1,
    title: "Multi-Cloud Strategy",
    description: "Design architectures across AWS, Azure, and GCP.",
    lessons: [
      { id: "l-sar-1-1", moduleId: "mod-sar-1", title: "Multi-Cloud Patterns", type: "reading", durationMinutes: 30, order: 1, content: "Why multi-cloud: vendor negotiation, best-of-breed, compliance, DR. Challenges: data gravity, skill fragmentation, cost duplication. Patterns: cloud-agnostic abstraction, follow-the-sun, workload placement.", isPreview: false },
      { id: "l-sar-1-2", moduleId: "mod-sar-1", title: "Cloud-Agnostic Design", type: "reading", durationMinutes: 35, order: 2, content: "Use Terraform for IaC, Kubernetes for orchestration, Kafka for messaging, PostgreSQL for database. Abstract cloud-specific services behind interfaces. Understand when to use cloud-native vs portable.", isPreview: false },
    ],
  },
  {
    id: "mod-sar-2", courseId: "course-multi-cloud", order: 2,
    title: "Enterprise Migration",
    description: "Execute large-scale cloud migrations.",
    lessons: [
      { id: "l-sar-2-1", moduleId: "mod-sar-2", title: "Migration Methodologies", type: "reading", durationMinutes: 30, order: 1, content: "AWS 7 Rs: Rehost, Replatform, Refactor, Repurchase, Retire, Retain, Relocate. Migration waves, dependency mapping, cutover planning, and rollback strategies.", isPreview: false },
      { id: "l-sar-2-2", moduleId: "mod-sar-2", title: "Capstone: Multi-Cloud Architecture", type: "project", durationMinutes: 240, order: 2, content: "Design a multi-cloud architecture for a pan-African fintech: AWS primary, Azure for Microsoft integration, GCP for ML/analytics. Deliver: architecture diagrams, security model, networking design, DR plan, cost model, governance framework, and board presentation.", isPreview: false },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
// AI/ML, DATA, DEVSECOPS, MOBILE, BLOCKCHAIN
// ════════════════════════════════════════════════════════════════

export const AI_ML_MODULES: Module[] = [
  {
    id: "mod-ai-1", courseId: "course-python-data", order: 1,
    title: "Python for Data & ML",
    description: "Master Python programming for data science and machine learning.",
    lessons: [
      { id: "l-ai-1-1", moduleId: "mod-ai-1", title: "Python Data Structures", type: "reading", durationMinutes: 25, order: 1, content: "Master lists, dictionaries, sets, tuples, and generators. Understand list comprehensions, dictionary comprehensions, and generator expressions. Essential libraries: NumPy, Pandas.", isPreview: false },
      { id: "l-ai-1-2", moduleId: "mod-ai-1", title: "Pandas for Data Analysis", type: "lab", durationMinutes: 40, order: 2, content: "Lab: Load, clean, transform, and analyze real-world datasets using Pandas. Handle missing data, merge datasets, perform group-by operations, and create visualizations.", isPreview: false },
    ],
  },
  {
    id: "mod-ai-2", courseId: "course-ml-fundamentals", order: 1,
    title: "Machine Learning Foundations",
    description: "Understand core ML algorithms and workflows.",
    lessons: [
      { id: "l-ai-2-1", moduleId: "mod-ai-2", title: "Supervised Learning", type: "reading", durationMinutes: 35, order: 1, content: "Linear regression, logistic regression, decision trees, random forests, SVM, k-NN. Understand bias-variance tradeoff, overfitting, cross-validation, and feature engineering.", isPreview: false },
      { id: "l-ai-2-2", moduleId: "mod-ai-2", title: "Scikit-learn Lab", type: "lab", durationMinutes: 50, order: 2, content: "Lab: Build end-to-end ML pipelines: data loading → preprocessing → feature engineering → model training → evaluation → deployment. Use scikit-learn with real Ghanaian economic datasets.", isPreview: false },
      { id: "l-ai-2-3", moduleId: "mod-ai-2", title: "Model Evaluation Metrics", type: "reading", durationMinutes: 25, order: 3, content: "Accuracy, precision, recall, F1-score, ROC-AUC, confusion matrix, MSE, MAE, R². Choose the right metric for your problem. Understand class imbalance and stratified sampling.", isPreview: false },
    ],
  },
  {
    id: "mod-ai-3", courseId: "course-deep-learning", order: 1,
    title: "Neural Networks & Deep Learning",
    description: "Build and train neural networks with TensorFlow and PyTorch.",
    lessons: [
      { id: "l-ai-3-1", moduleId: "mod-ai-3", title: "Neural Network Fundamentals", type: "reading", durationMinutes: 30, order: 1, content: "Perceptrons, activation functions, loss functions, backpropagation, gradient descent. Build your first neural network from scratch in NumPy, then with TensorFlow/Keras.", isPreview: false },
      { id: "l-ai-3-2", moduleId: "mod-ai-3", title: "CNNs for Computer Vision", type: "lab", durationMinutes: 50, order: 2, content: "Lab: Build a CNN for image classification (medical imaging or agriculture). Implement data augmentation, transfer learning with ResNet, and model evaluation with Grad-CAM.", isPreview: false },
      { id: "l-ai-3-3", moduleId: "mod-ai-3", title: "Transformers & NLP", type: "lab", durationMinutes: 45, order: 3, content: "Lab: Fine-tune a BERT model for sentiment analysis on Ghanaian product reviews. Understand attention mechanisms, tokenization, and transfer learning.", isPreview: false },
      { id: "l-ai-3-4", moduleId: "mod-ai-3", title: "Capstone: AI Application", type: "project", durationMinutes: 240, order: 4, content: "Build an end-to-end ML application for a Ghanaian use case: crop disease detection from images, mobile money fraud detection, or Twi language sentiment analysis. Deliver: data pipeline, trained model, API, web interface, and model card.", isPreview: false },
    ],
  },
];

export const DATA_MODULES: Module[] = [
  {
    id: "mod-de-1", courseId: "course-sql-advanced", order: 1,
    title: "Advanced SQL",
    description: "Master complex queries, window functions, and optimization.",
    lessons: [
      { id: "l-de-sql-1", moduleId: "mod-de-1", title: "Window Functions & CTEs", type: "lab", durationMinutes: 40, order: 1, content: "Lab: Write complex queries using ROW_NUMBER, RANK, LAG/LEAD, running totals, and CTEs. Solve business analytics problems with real-world datasets.", isPreview: false },
      { id: "l-de-sql-2", moduleId: "mod-de-1", title: "Query Optimization", type: "lab", durationMinutes: 35, order: 2, content: "Lab: Analyze and optimize slow queries using EXPLAIN ANALYZE. Implement proper indexing, rewrite subqueries, and use materialized views for performance.", isPreview: false },
    ],
  },
  {
    id: "mod-de-2", courseId: "course-etl-pipelines", order: 1,
    title: "ETL & Data Pipelines",
    description: "Build production data pipelines with Python and Airflow.",
    lessons: [
      { id: "l-de-etl-1", moduleId: "mod-de-2", title: "ETL Design Patterns", type: "reading", durationMinutes: 30, order: 1, content: "ELT vs ETL, incremental vs full load, CDC (Change Data Capture), slowly changing dimensions, data quality checks. Choose the right pattern for your use case.", isPreview: false },
      { id: "l-de-etl-2", moduleId: "mod-de-2", title: "Apache Airflow Lab", type: "lab", durationMinutes: 50, order: 2, content: "Lab: Build a DAG in Apache Airflow: extract data from multiple sources, transform with Pandas, load into PostgreSQL, and schedule daily. Implement error handling, retries, and alerting.", isPreview: false },
    ],
  },
];

export const DEVSECOPS_MODULES: Module[] = [
  {
    id: "mod-ds-1", courseId: "course-docker-security", order: 1,
    title: "Container Security",
    description: "Secure Docker and Kubernetes deployments.",
    lessons: [
      { id: "l-ds-1", moduleId: "mod-ds-1", title: "Docker Security Hardening", type: "lab", durationMinutes: 45, order: 1, content: "Lab: Harden Docker images: non-root users, minimal base images, read-only filesystems, no-new-privileges, seccomp profiles. Scan with Trivy and Snyk.", isPreview: false },
      { id: "l-ds-2", moduleId: "mod-ds-1", title: "Kubernetes Security", type: "lab", durationMinutes: 50, order: 2, content: "Lab: Implement Kubernetes security: RBAC, NetworkPolicies, PodSecurityPolicies, Secret management with Vault, image signing with Cosign, and admission controllers.", isPreview: false },
    ],
  },
  {
    id: "mod-ds-2", courseId: "course-ci-cd-security", order: 1,
    title: "Secure CI/CD",
    description: "Embed security into software delivery pipelines.",
    lessons: [
      { id: "l-ds-3", moduleId: "mod-ds-2", title: "SAST & DAST Integration", type: "lab", durationMinutes: 40, order: 1, content: "Lab: Integrate SonarQube (SAST), OWASP ZAP (DAST), and Dependabot (SCA) into a GitHub Actions pipeline. Define quality gates that block insecure deployments.", isPreview: false },
      { id: "l-ds-4", moduleId: "mod-ds-2", title: "Secrets Management", type: "lab", durationMinutes: 35, order: 2, content: "Lab: Implement HashiCorp Vault for secrets management. Rotate secrets automatically, use dynamic database credentials, and audit secret access.", isPreview: false },
      { id: "l-ds-5", moduleId: "mod-ds-2", title: "Capstone: DevSecOps Pipeline", type: "project", durationMinutes: 180, order: 3, content: "Build a complete DevSecOps pipeline for a microservices application: Git hooks → SAST → SCA → container scanning → DAST → infrastructure scanning → deployment → monitoring. Document the security controls at each stage.", isPreview: false },
    ],
  },
];

export const MOBILE_MODULES: Module[] = [
  {
    id: "mod-mob-1", courseId: "course-react-native", order: 1,
    title: "React Native Fundamentals",
    description: "Build cross-platform mobile apps with React Native.",
    lessons: [
      { id: "l-mob-1", moduleId: "mod-mob-1", title: "React Native Architecture", type: "reading", durationMinutes: 25, order: 1, content: "Understand React Native's bridge architecture, Hermes engine, and the new Fabric renderer. Set up the development environment with Expo CLI.", isPreview: false },
      { id: "l-mob-2", moduleId: "mod-mob-1", title: "Core Components & Navigation", type: "lab", durationMinutes: 45, order: 2, content: "Lab: Build a multi-screen app with React Navigation, FlatList, Forms, and state management. Implement stack, tab, and drawer navigation patterns.", isPreview: false },
      { id: "l-mob-3", moduleId: "mod-mob-1", title: "Offline-First & Low-Bandwidth", type: "reading", durationMinutes: 30, order: 3, content: "Design for Ghanaian network conditions: offline-first with WatermelonDB, image compression, lazy loading, background sync, and progressive data loading.", isPreview: false },
    ],
  },
  {
    id: "mod-mob-2", courseId: "course-react-native", order: 2,
    title: "Advanced Mobile Development",
    description: "Master advanced React Native patterns.",
    lessons: [
      { id: "l-mob-4", moduleId: "mod-mob-2", title: "Native Modules & APIs", type: "lab", durationMinutes: 40, order: 1, content: "Lab: Access device features: camera, GPS, biometrics, push notifications. Build custom native modules for platform-specific functionality.", isPreview: false },
      { id: "l-mob-5", moduleId: "mod-mob-2", title: "Mobile Payments Integration", type: "lab", durationMinutes: 45, order: 2, content: "Lab: Integrate mobile money payments (MTN MoMo, Vodafone Cash) into a React Native app. Implement payment flows, error handling, and receipt generation.", isPreview: false },
      { id: "l-mob-6", moduleId: "mod-mob-2", title: "Capstone: Mobile App", type: "project", durationMinutes: 240, order: 3, content: "Build a complete mobile application for a Ghanaian use case: market price tracker for farmers, mobile health records, or ride-hailing app. Deliver: app with 5+ screens, offline support, push notifications, and deployment to Expo/app stores.", isPreview: false },
    ],
  },
];

export const BLOCKCHAIN_MODULES: Module[] = [
  {
    id: "mod-bc-1", courseId: "course-blockchain-web3", order: 1,
    title: "Blockchain Fundamentals",
    description: "Understand blockchain technology and smart contracts.",
    lessons: [
      { id: "l-bc-1", moduleId: "mod-bc-1", title: "Blockchain Architecture", type: "reading", durationMinutes: 30, order: 1, content: "Consensus mechanisms (PoW, PoS, DPoS), smart contracts, gas, EVM, Layer 2 scaling. Understand Ethereum, Solana, and Polygon ecosystems.", isPreview: false },
      { id: "l-bc-2", moduleId: "mod-bc-1", title: "Solidity Smart Contracts", type: "lab", durationMinutes: 50, order: 2, content: "Lab: Write, test, and deploy Solidity smart contracts using Hardhat. Build an ERC-20 token and a simple escrow contract. Test with unit tests and fuzzing.", isPreview: false },
    ],
  },
  {
    id: "mod-bc-2", courseId: "course-blockchain-web3", order: 2,
    title: "Decentralized Applications",
    description: "Build dApps with Web3.js and modern frameworks.",
    lessons: [
      { id: "l-bc-3", moduleId: "mod-bc-2", title: "Web3 Frontend Development", type: "lab", durationMinutes: 45, order: 1, content: "Lab: Build a dApp frontend with React, ethers.js, and wagmi. Implement wallet connection, transaction signing, event listening, and IPFS file storage.", isPreview: false },
      { id: "l-bc-4", moduleId: "mod-bc-2", title: "DeFi & Real-World Applications", type: "reading", durationMinutes: 30, order: 2, content: "DeFi primitives: lending, DEX, yield farming. Real-world blockchain applications: supply chain traceability, land registry, digital identity, and mobile money integration for Ghana.", isPreview: false },
      { id: "l-bc-5", moduleId: "mod-bc-2", title: "Capstone: Blockchain Application", type: "project", durationMinutes: 180, order: 3, content: "Build a blockchain-based application for a Ghanaian use case: supply chain tracking for cocoa farmers, land registry verification, or digital credential issuance. Deploy to a testnet with frontend dApp.", isPreview: false },
    ],
  },
];

// ── Export all expanded content ──
export const EXPANDED_COURSE_MODULES: Record<string, Module[]> = {
  // SOC Intermediate
  "course-threat-intel": SOC_THREAT_INTEL_MODULES,
  "course-detection-eng": SOC_DETECTION_MODULES,
  // Security Advanced
  "course-pentesting": SEC_PENTESTING_MODULES,
  "course-cloud-security": SEC_CLOUD_SEC_MODULES,
  "course-security-architecture": SEC_ARCHITECTURE_MODULES,
  // Software Engineering
  "course-fullstack-project": SE_FULLSTACK_MODULES,
  "course-system-design": SE_TECH_LEAD_MODULES,
  "course-software-architecture": SEC_ARCHITECTURE_MODULES,
  // Cloud
  "course-aws-advanced": CLOUD_ENGINEER_MODULES,
  "course-multi-cloud": CLOUD_SOLUTIONS_ARCH_MODULES,
  // AI/ML
  "course-python-data": AI_ML_MODULES.slice(0, 1),
  "course-ml-fundamentals": AI_ML_MODULES.slice(1, 2),
  "course-deep-learning": AI_ML_MODULES.slice(2, 3),
  // Data
  "course-sql-advanced": DATA_MODULES.slice(0, 1),
  "course-etl-pipelines": DATA_MODULES.slice(1, 2),
  // DevSecOps
  "course-docker-security": DEVSECOPS_MODULES.slice(0, 1),
  "course-ci-cd-security": DEVSECOPS_MODULES.slice(1, 2),
  // Mobile
  "course-react-native": MOBILE_MODULES,
  // Blockchain
  "course-blockchain-web3": BLOCKCHAIN_MODULES,
};
