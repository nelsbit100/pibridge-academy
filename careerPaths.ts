// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Career Paths & Progression System
// Foundation → Professional → Expert with progression gates
// Live Presentation & AI Interview requirements
// ──────────────────────────────────────────────────────────────

// ── Career Path Definition ──
export interface CareerPath {
  id: string;
  name: string;
  icon: string;
  description: string;
  domain: string;
  tiers: CareerTier[];
}

export interface CareerTier {
  id: string;
  name: "Foundation" | "Professional" | "Expert";
  programmeId: string;
  programmeTitle: string;
  coursesRequired: number;
  weeksRequired: number;
  prerequisites: string[]; // tier IDs required before this tier
  gateRequirements: TierGate;
}

export interface TierGate {
  coursesCompleted: number;
  minimumQuizScore: number; // percentage
  projectsRequired: number;
  livePresentationRequired: boolean;
  aiInterviewRequired: boolean;
  minimumCompetencyLevel: "Introduced" | "Developing" | "Competent" | "Proficient";
}

// ── Career Paths ──
export const CAREER_PATHS: CareerPath[] = [
  {
    id: "path-cybersecurity",
    name: "Cybersecurity",
    icon: "🛡️",
    description: "From IT fundamentals to Security Architect — protect organizations from evolving cyber threats.",
    domain: "cybersecurity",
    tiers: [
      {
        id: "tier-cyber-foundation",
        name: "Foundation",
        programmeId: "prog-cyber-foundation",
        programmeTitle: "Cybersecurity Foundations",
        coursesRequired: 4,
        weeksRequired: 24,
        prerequisites: [],
        gateRequirements: {
          coursesCompleted: 4,
          minimumQuizScore: 70,
          projectsRequired: 1,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Competent",
        },
      },
      {
        id: "tier-cyber-professional",
        name: "Professional",
        programmeId: "prog-cyber-intermediate",
        programmeTitle: "SOC Analyst Professional",
        coursesRequired: 3,
        weeksRequired: 16,
        prerequisites: ["tier-cyber-foundation"],
        gateRequirements: {
          coursesCompleted: 3,
          minimumQuizScore: 75,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
      {
        id: "tier-cyber-expert",
        name: "Expert",
        programmeId: "prog-cyber-advanced",
        programmeTitle: "Security Engineer & Architect",
        coursesRequired: 3,
        weeksRequired: 20,
        prerequisites: ["tier-cyber-professional"],
        gateRequirements: {
          coursesCompleted: 3,
          minimumQuizScore: 80,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
    ],
  },
  {
    id: "path-software",
    name: "Software Engineering",
    icon: "💻",
    description: "Build production applications from scratch — frontend, backend, databases, and deployment.",
    domain: "software_engineering",
    tiers: [
      {
        id: "tier-se-foundation",
        name: "Foundation",
        programmeId: "prog-se-foundation",
        programmeTitle: "Software Engineering Foundations",
        coursesRequired: 4,
        weeksRequired: 20,
        prerequisites: [],
        gateRequirements: {
          coursesCompleted: 4,
          minimumQuizScore: 70,
          projectsRequired: 1,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Competent",
        },
      },
      {
        id: "tier-se-professional",
        name: "Professional",
        programmeId: "prog-se-intermediate",
        programmeTitle: "Full-Stack Developer",
        coursesRequired: 1,
        weeksRequired: 16,
        prerequisites: ["tier-se-foundation"],
        gateRequirements: {
          coursesCompleted: 1,
          minimumQuizScore: 75,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
      {
        id: "tier-se-expert",
        name: "Expert",
        programmeId: "prog-se-advanced",
        programmeTitle: "Tech Lead & Software Architect",
        coursesRequired: 3,
        weeksRequired: 20,
        prerequisites: ["tier-se-professional"],
        gateRequirements: {
          coursesCompleted: 3,
          minimumQuizScore: 80,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
    ],
  },
  {
    id: "path-cloud",
    name: "Cloud & Infrastructure",
    icon: "☁️",
    description: "Master cloud platforms, infrastructure as code, and DevOps practices.",
    domain: "cloud",
    tiers: [
      {
        id: "tier-cloud-foundation",
        name: "Foundation",
        programmeId: "prog-cloud-foundation",
        programmeTitle: "Cloud & Infrastructure Foundations",
        coursesRequired: 4,
        weeksRequired: 20,
        prerequisites: [],
        gateRequirements: {
          coursesCompleted: 4,
          minimumQuizScore: 70,
          projectsRequired: 1,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Competent",
        },
      },
      {
        id: "tier-cloud-professional",
        name: "Professional",
        programmeId: "prog-cloud-intermediate",
        programmeTitle: "Cloud Engineer",
        coursesRequired: 1,
        weeksRequired: 16,
        prerequisites: ["tier-cloud-foundation"],
        gateRequirements: {
          coursesCompleted: 1,
          minimumQuizScore: 75,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
      {
        id: "tier-cloud-expert",
        name: "Expert",
        programmeId: "prog-cloud-advanced",
        programmeTitle: "Solutions Architect",
        coursesRequired: 3,
        weeksRequired: 20,
        prerequisites: ["tier-cloud-professional"],
        gateRequirements: {
          coursesCompleted: 3,
          minimumQuizScore: 80,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
    ],
  },
  {
    id: "path-ai",
    name: "AI & Machine Learning",
    icon: "🤖",
    description: "Build intelligent systems — from data pipelines to model training to production deployment.",
    domain: "ai_ml",
    tiers: [
      {
        id: "tier-ai-foundation",
        name: "Foundation",
        programmeId: "prog-ai-ml",
        programmeTitle: "AI & Machine Learning Foundations",
        coursesRequired: 3,
        weeksRequired: 24,
        prerequisites: [],
        gateRequirements: {
          coursesCompleted: 3,
          minimumQuizScore: 70,
          projectsRequired: 1,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Competent",
        },
      },
      {
        id: "tier-ai-professional",
        name: "Professional",
        programmeId: "prog-ai-intermediate",
        programmeTitle: "ML Engineer",
        coursesRequired: 3,
        weeksRequired: 20,
        prerequisites: ["tier-ai-foundation"],
        gateRequirements: {
          coursesCompleted: 3,
          minimumQuizScore: 75,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
      {
        id: "tier-ai-expert",
        name: "Expert",
        programmeId: "prog-ai-advanced",
        programmeTitle: "AI Architect",
        coursesRequired: 2,
        weeksRequired: 16,
        prerequisites: ["tier-ai-professional"],
        gateRequirements: {
          coursesCompleted: 2,
          minimumQuizScore: 80,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
    ],
  },
  {
    id: "path-data",
    name: "Data Engineering & Analytics",
    icon: "📊",
    description: "Build data pipelines, analyze datasets, and create business intelligence dashboards.",
    domain: "data",
    tiers: [
      {
        id: "tier-data-foundation",
        name: "Foundation",
        programmeId: "prog-data",
        programmeTitle: "Data Engineering Foundations",
        coursesRequired: 4,
        weeksRequired: 20,
        prerequisites: [],
        gateRequirements: {
          coursesCompleted: 4,
          minimumQuizScore: 70,
          projectsRequired: 1,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Competent",
        },
      },
      {
        id: "tier-data-professional",
        name: "Professional",
        programmeId: "prog-data-intermediate",
        programmeTitle: "Senior Data Engineer",
        coursesRequired: 3,
        weeksRequired: 16,
        prerequisites: ["tier-data-foundation"],
        gateRequirements: {
          coursesCompleted: 3,
          minimumQuizScore: 75,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
    ],
  },
  {
    id: "path-devsecops",
    name: "DevSecOps",
    icon: "🔒",
    description: "Embed security into every stage of the software delivery pipeline.",
    domain: "devsecops",
    tiers: [
      {
        id: "tier-devsecops-foundation",
        name: "Foundation",
        programmeId: "prog-devsecops",
        programmeTitle: "DevSecOps Foundations",
        coursesRequired: 2,
        weeksRequired: 20,
        prerequisites: [],
        gateRequirements: {
          coursesCompleted: 2,
          minimumQuizScore: 70,
          projectsRequired: 1,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Competent",
        },
      },
      {
        id: "tier-devsecops-professional",
        name: "Professional",
        programmeId: "prog-devsecops-intermediate",
        programmeTitle: "DevSecOps Engineer",
        coursesRequired: 3,
        weeksRequired: 16,
        prerequisites: ["tier-devsecops-foundation"],
        gateRequirements: {
          coursesCompleted: 3,
          minimumQuizScore: 75,
          projectsRequired: 2,
          livePresentationRequired: true,
          aiInterviewRequired: true,
          minimumCompetencyLevel: "Proficient",
        },
      },
    ],
  },
];

// ── Live Presentation Types ──
export interface LivePresentation {
  id: string;
  learnerId: string;
  projectId: string;
  projectTitle: string;
  programmeId: string;
  tierName: string;
  scheduledAt: string;
  durationMinutes: number;
  status: "scheduled" | "in-progress" | "completed" | "missed";
  presentationUrl?: string;
  evaluatorType: "ai" | "instructor" | "peer";
  rubric: PresentationRubric[];
  score?: number;
  feedback?: string;
  communicationScore?: number;
  technicalScore?: number;
  confidenceScore?: number;
}

export interface PresentationRubric {
  category: string;
  criteria: string;
  maxScore: number;
  weight: number;
}

// ── AI Interview Types ──
export interface AIInterview {
  id: string;
  learnerId: string;
  projectId: string;
  projectTitle: string;
  programmeId: string;
  tierName: string;
  startedAt: string;
  completedAt?: string;
  status: "pending" | "in-progress" | "completed";
  questions: AIInterviewQuestion[];
  overallScore?: number;
  technicalScore?: number;
  communicationScore?: number;
  problemSolvingScore?: number;
  readinessLevel: "Not Ready" | "Developing" | "Ready" | "Highly Ready";
  recommendations: string[];
}

export interface AIInterviewQuestion {
  id: string;
  question: string;
  category: "technical" | "behavioral" | "problem-solving" | "project-specific";
  difficulty: "easy" | "medium" | "hard";
  learnerAnswer?: string;
  aiEvaluation?: {
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  };
}

// ── Presentation Rubrics ──
export const PRESENTATION_RUBRICS: Record<string, PresentationRubric[]> = {
  foundation: [
    { category: "Technical Content", criteria: "Demonstrates understanding of core concepts", maxScore: 25, weight: 0.35 },
    { category: "Project Execution", criteria: "Project meets requirements and is functional", maxScore: 25, weight: 0.25 },
    { category: "Communication", criteria: "Clear explanation of approach and decisions", maxScore: 20, weight: 0.2 },
    { category: "Q&A Handling", criteria: "Responds thoughtfully to questions", maxScore: 15, weight: 0.15 },
    { category: "Professionalism", criteria: "Punctual, prepared, and respectful", maxScore: 15, weight: 0.05 },
  ],
  professional: [
    { category: "Technical Depth", criteria: "Deep understanding of implementation details", maxScore: 30, weight: 0.3 },
    { category: "Architecture Decisions", criteria: "Justifies design choices with trade-offs", maxScore: 25, weight: 0.25 },
    { category: "Communication", criteria: "Structured presentation with clear narrative", maxScore: 20, weight: 0.2 },
    { category: "Q&A Handling", criteria: "Handles challenging questions with depth", maxScore: 15, weight: 0.15 },
    { category: "Industry Awareness", criteria: "Connects project to real-world applications", maxScore: 10, weight: 0.1 },
  ],
  expert: [
    { category: "System Design", criteria: "Demonstrates enterprise-level architecture thinking", maxScore: 30, weight: 0.3 },
    { category: "Technical Leadership", criteria: "Shows ability to lead technical decisions", maxScore: 25, weight: 0.25 },
    { category: "Strategic Thinking", criteria: "Connects technical work to business outcomes", maxScore: 20, weight: 0.2 },
    { category: "Communication & Influence", criteria: "Persuasive presentation suitable for board/stakeholders", maxScore: 15, weight: 0.15 },
    { category: "Innovation", criteria: "Novel approaches or creative problem-solving", maxScore: 10, weight: 0.1 },
  ],
};

// ── AI Interview Question Banks ──
export const AI_INTERVIEW_QUESTIONS: Record<string, { technical: string[]; behavioral: string[]; problemSolving: string[]; projectSpecific: string[] }> = {
  cybersecurity: {
    technical: [
      "Walk me through how you would investigate a suspected phishing attack at a company.",
      "Explain the difference between IDS and IPS. When would you deploy each?",
      "How would you design a detection rule for lateral movement using SIEM?",
      "Describe the incident response lifecycle and your role in each phase.",
      "What is the MITRE ATT&CK framework and how do you use it in detection engineering?",
      "How would you handle a ransomware incident that has already encrypted some files?",
      "Explain the concept of defense-in-depth. Give examples of controls at each layer.",
      "How would you assess the security posture of a cloud environment?",
    ],
    behavioral: [
      "Tell me about a time you had to explain a complex security issue to a non-technical person.",
      "Describe a situation where you had to prioritize between multiple security incidents.",
      "How do you stay current with the latest threats and vulnerabilities?",
      "Tell me about a time you disagreed with a security policy. How did you handle it?",
      "Describe a project where you had to work under pressure with a tight deadline.",
    ],
    problemSolving: [
      "A company reports unusual network traffic at 2 AM. Walk me through your investigation process.",
      "You discover a zero-day vulnerability in a critical production system. What steps do you take?",
      "A user reports their account has been compromised. How do you determine the scope of the breach?",
      "You need to implement security monitoring for a new microservices architecture. How do you approach this?",
    ],
    projectSpecific: [
      "Why did you choose this particular approach for your investigation?",
      "What challenges did you face during this project and how did you overcome them?",
      "If you had more time, what would you improve in your solution?",
      "How would you scale this solution for a larger organization?",
    ],
  },
  software: {
    technical: [
      "Explain the difference between REST and GraphQL. When would you choose one over the other?",
      "How do you handle authentication and authorization in a full-stack application?",
      "Describe your approach to database design for a multi-tenant SaaS application.",
      "How would you implement real-time features in a web application?",
      "Explain the concept of clean architecture. How do you apply it in your projects?",
      "How do you optimize database queries for performance?",
      "Describe your testing strategy for a full-stack application.",
      "How would you handle file uploads and storage in a production application?",
    ],
    behavioral: [
      "Tell me about a time you had to debug a difficult production issue.",
      "Describe a project where you had to collaborate with non-technical stakeholders.",
      "How do you approach code reviews? Give me an example of constructive feedback you've given.",
      "Tell me about a time you had to learn a new technology quickly for a project.",
      "Describe a situation where you had to make a technical decision with incomplete information.",
    ],
    problemSolving: [
      "A user reports that the application is slow. Walk me through your debugging process.",
      "You need to migrate a legacy database to a new schema with zero downtime. How do you approach this?",
      "A critical API endpoint is returning errors intermittently. How do you diagnose and fix this?",
      "You need to design a notification system that handles 1 million users. How do you approach this?",
    ],
    projectSpecific: [
      "Explain the architecture of your project. Why did you make these design decisions?",
      "What trade-offs did you consider when choosing your tech stack?",
      "How would you handle 10x the current load on your application?",
      "What would you do differently if you were to rebuild this project from scratch?",
    ],
  },
  cloud: {
    technical: [
      "Explain the AWS shared responsibility model. What is the customer responsible for?",
      "How would you design a highly available architecture across multiple availability zones?",
      "Describe the difference between horizontal and vertical scaling. When would you use each?",
      "How do you implement Infrastructure as Code? Compare Terraform and CloudFormation.",
      "Explain the concept of serverless computing. What are its limitations?",
      "How would you secure an S3 bucket that needs to be accessed by a third party?",
      "Describe your approach to monitoring and alerting in a cloud environment.",
      "How would you implement a CI/CD pipeline for a Kubernetes deployment?",
    ],
    behavioral: [
      "Tell me about a time you had to manage a cloud cost optimization initiative.",
      "Describe a project where you migrated an on-premises workload to the cloud.",
      "How do you approach capacity planning for a growing application?",
      "Tell me about a time you had to troubleshoot a production outage in the cloud.",
      "Describe a situation where you had to balance security requirements with development speed.",
    ],
    problemSolving: [
      "A production database is running out of storage. You can't take downtime. What do you do?",
      "Your Kubernetes cluster is experiencing node failures. Walk me through your response.",
      "You need to deploy a new version of an application with zero downtime. How do you do this?",
      "Cloud costs have increased 300% in the last month. How do you investigate and optimize?",
    ],
    projectSpecific: [
      "Walk me through the architecture you designed for this project.",
      "What security controls did you implement and why?",
      "How did you handle disaster recovery in your design?",
      "What would you change about your architecture if you were starting over?",
    ],
  },
};

// ── Helper Functions ──
export function getCareerPathForDomain(domain: string): CareerPath | undefined {
  return CAREER_PATHS.find((p) => p.domain === domain);
}

export function getTierProgress(pathId: string, completedTierIds: string[]): {
  currentTier: CareerTier | null;
  nextTier: CareerTier | null;
  progressPercentage: number;
  completedTiers: CareerTier[];
  upcomingTiers: CareerTier[];
} {
  const path = CAREER_PATHS.find((p) => p.id === pathId);
  if (!path) return { currentTier: null, nextTier: null, progressPercentage: 0, completedTiers: [], upcomingTiers: [] };

  const completed = path.tiers.filter((t) => completedTierIds.includes(t.id));
  const currentIndex = completed.length;
  const currentTier = path.tiers[currentIndex] || null;
  const nextTier = path.tiers[currentIndex + 1] || null;
  const progressPercentage = Math.round((completed.length / path.tiers.length) * 100);

  return {
    currentTier,
    nextTier,
    progressPercentage,
    completedTiers: completed,
    upcomingTiers: path.tiers.slice(currentIndex),
  };
}

export function checkGateRequirements(
  gate: TierGate,
  stats: {
    coursesCompleted: number;
    averageQuizScore: number;
    projectsCompleted: number;
    hasPresentation: boolean;
    hasInterview: boolean;
    competencyLevel: string;
  }
): { passed: boolean; failures: string[] } {
  const failures: string[] = [];

  if (stats.coursesCompleted < gate.coursesCompleted) {
    failures.push(`Complete ${gate.coursesCompleted} courses (${stats.coursesCompleted}/${gate.coursesCompleted})`);
  }
  if (stats.averageQuizScore < gate.minimumQuizScore) {
    failures.push(`Achieve ${gate.minimumQuizScore}% average quiz score (${stats.averageQuizScore}%)`);
  }
  if (stats.projectsCompleted < gate.projectsRequired) {
    failures.push(`Complete ${gate.projectsRequired} projects (${stats.projectsCompleted}/${gate.projectsRequired})`);
  }
  if (gate.livePresentationRequired && !stats.hasPresentation) {
    failures.push("Complete a live project presentation");
  }
  if (gate.aiInterviewRequired && !stats.hasInterview) {
    failures.push("Pass the AI interviewer assessment");
  }

  const levelOrder = ["Introduced", "Developing", "Competent", "Proficient", "Advanced", "Expert"];
  const requiredLevel = levelOrder.indexOf(gate.minimumCompetencyLevel);
  const currentLevel = levelOrder.indexOf(stats.competencyLevel);
  if (currentLevel < requiredLevel) {
    failures.push(`Achieve ${gate.minimumCompetencyLevel} competency level (currently ${stats.competencyLevel})`);
  }

  return { passed: failures.length === 0, failures };
}
