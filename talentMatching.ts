// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Talent Matching Algorithm
// Matches candidates to jobs using competency scores & verified skills
// ──────────────────────────────────────────────────────────────

// ── Types ──
export interface JobRequirement {
  jobId: string;
  title: string;
  company: string;
  requiredSkills: SkillRequirement[];
  minCompetencyScore: number;
  preferredTier: "foundation" | "professional" | "expert";
  minProjects: number;
  minCertificates: number;
  location: string;
  isRemote: boolean;
  salaryRange: { min: number; max: number };
}

export interface SkillRequirement {
  skillName: string;
  minLevel: "Introduced" | "Developing" | "Competent" | "Proficient" | "Advanced" | "Expert";
  weight: number; // 0-1, importance of this skill
  isRequired: boolean;
}

export interface CandidateProfile {
  candidateId: string;
  name: string;
  title: string;
  location: string;
  skills: CandidateSkill[];
  competencyScore: number;
  certificates: number;
  projects: number;
  tier: "foundation" | "professional" | "expert";
  available: boolean;
  rating: number;
  presentationScore?: number;
  interviewScore?: number;
  readinessLevel?: string;
  recentActivity: string;
}

export interface CandidateSkill {
  skillName: string;
  level: "Introduced" | "Developing" | "Competent" | "Proficient" | "Advanced" | "Expert";
  verified: boolean;
  source: "course" | "assessment" | "project" | "certification" | "self";
  confidenceScore: number;
}

export interface MatchResult {
  candidateId: string;
  jobId: string;
  overallScore: number;
  skillMatchScore: number;
  competencyMatchScore: number;
  experienceMatchScore: number;
  locationMatchScore: number;
  softSkillScore: number;
  matchGrade: "A+" | "A" | "B+" | "B" | "C+" | "C" | "D";
  skillGaps: SkillGap[];
  strengths: string[];
  recommendation: string;
}

export interface SkillGap {
  skill: string;
  requiredLevel: string;
  currentLevel: string;
  gap: number;
  importance: "critical" | "important" | "nice-to-have";
}

// ── Skill Level Mapping ──
const LEVEL_RANK: Record<string, number> = {
  "Introduced": 1,
  "Developing": 2,
  "Competent": 3,
  "Proficient": 4,
  "Advanced": 5,
  "Expert": 6,
};

const TIER_RANK: Record<string, number> = {
  "foundation": 1,
  "professional": 2,
  "expert": 3,
};

// ── Core Matching Algorithm ──

/**
 * Calculate how well a candidate's skills match job requirements.
 * Uses weighted scoring with skill gap analysis.
 */
function calculateSkillMatch(
  candidateSkills: CandidateSkill[],
  requiredSkills: SkillRequirement[]
): { score: number; gaps: SkillGap[]; strengths: string[] } {
  if (requiredSkills.length === 0) return { score: 100, gaps: [], strengths: [] };

  let totalWeight = 0;
  let weightedScore = 0;
  const gaps: SkillGap[] = [];
  const strengths: string[] = [];

  for (const req of requiredSkills) {
    totalWeight += req.weight;
    const candidateSkill = candidateSkills.find(
      (cs) => cs.skillName.toLowerCase() === req.skillName.toLowerCase()
    );

    if (!candidateSkill) {
      weightedScore += 0;
      gaps.push({
        skill: req.skillName,
        requiredLevel: req.minLevel,
        currentLevel: "Not Acquired",
        gap: LEVEL_RANK[req.minLevel],
        importance: req.isRequired ? "critical" : "important",
      });
    } else {
      const requiredRank = LEVEL_RANK[req.minLevel];
      const candidateRank = LEVEL_RANK[candidateSkill.level];
      const skillScore = Math.min(100, (candidateRank / requiredRank) * 100);

      // Bonus for verified skills
      const verifiedBonus = candidateSkill.verified ? 1.1 : 1.0;
      const finalScore = Math.min(100, skillScore * verifiedBonus);

      weightedScore += finalScore * req.weight;

      if (candidateRank >= requiredRank) {
        strengths.push(`${req.skillName} (${candidateSkill.level} — meets ${req.minLevel} requirement)`);
      } else {
        gaps.push({
          skill: req.skillName,
          requiredLevel: req.minLevel,
          currentLevel: candidateSkill.level,
          gap: requiredRank - candidateRank,
          importance: req.isRequired ? "critical" : "important",
        });
      }
    }
  }

  const score = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 100;
  return { score: Math.min(100, score), gaps, strengths };
}

/**
 * Calculate competency score match.
 * Candidates with higher competency scores get better matches.
 */
function calculateCompetencyMatch(
  candidateScore: number,
  minRequired: number
): number {
  if (candidateScore >= minRequired * 1.2) return 100;
  if (candidateScore >= minRequired) return 85 + ((candidateScore - minRequired) / (minRequired * 0.2)) * 15;
  if (candidateScore >= minRequired * 0.8) return 50 + ((candidateScore - minRequired * 0.8) / (minRequired * 0.2)) * 35;
  return Math.max(0, (candidateScore / minRequired) * 50);
}

/**
 * Calculate experience match based on projects, certificates, and tier.
 */
function calculateExperienceMatch(
  candidate: CandidateProfile,
  job: JobRequirement
): number {
  let score = 0;

  // Projects contribution (max 35 points)
  const projectScore = Math.min(35, (candidate.projects / Math.max(job.minProjects, 1)) * 35);
  score += projectScore;

  // Certificates contribution (max 25 points)
  const certScore = Math.min(25, (candidate.certificates / Math.max(job.minCertificates, 1)) * 25);
  score += certScore;

  // Tier match (max 25 points)
  const candidateTier = TIER_RANK[candidate.tier] || 1;
  const requiredTier = TIER_RANK[job.preferredTier] || 1;
  if (candidateTier >= requiredTier) {
    score += 25;
  } else {
    score += (candidateTier / requiredTier) * 25;
  }

  // Presentation & Interview scores (max 15 points)
  if (candidate.presentationScore && candidate.interviewScore) {
    score += ((candidate.presentationScore + candidate.interviewScore) / 200) * 15;
  } else {
    score += 7.5; // Neutral if not yet taken
  }

  return Math.round(Math.min(100, score));
}

/**
 * Calculate location match score.
 */
function calculateLocationMatch(
  candidateLocation: string,
  job: JobRequirement
): number {
  if (job.isRemote) return 100;
  if (candidateLocation.toLowerCase() === job.location.toLowerCase()) return 100;
  // Same country check
  if (candidateLocation.includes(",") && job.location.includes(",")) {
    const candidateCountry = candidateLocation.split(",").pop()?.trim().toLowerCase();
    const jobCountry = job.location.split(",").pop()?.trim().toLowerCase();
    if (candidateCountry === jobCountry) return 70;
  }
  return 30;
}

/**
 * Calculate soft skill score from interview and presentation data.
 */
function calculateSoftSkillScore(
  candidate: CandidateProfile
): number {
  let score = 50; // Base

  if (candidate.presentationScore) {
    score += (candidate.presentationScore / 100) * 20;
  }
  if (candidate.interviewScore) {
    score += (candidate.interviewScore / 100) * 20;
  }
  if (candidate.rating) {
    score += ((candidate.rating - 3) / 2) * 10; // Normalize 3-5 to 0-10
  }

  return Math.round(Math.min(100, Math.max(0, score)));
}

/**
 * Determine match grade from overall score.
 */
function getMatchGrade(score: number): MatchResult["matchGrade"] {
  if (score >= 95) return "A+";
  if (score >= 85) return "A";
  if (score >= 78) return "B+";
  if (score >= 70) return "B";
  if (score >= 60) return "C+";
  if (score >= 50) return "C";
  return "D";
}

/**
 * Generate human-readable recommendation.
 */
function getRecommendation(
  grade: MatchResult["matchGrade"],
  skillGaps: SkillGap[],
  candidate: CandidateProfile
): string {
  const criticalGaps = skillGaps.filter((g) => g.importance === "critical");

  if (grade === "A+" || grade === "A") {
    return `${candidate.name} is an excellent match. ${criticalGaps.length === 0 ? "All critical skills are met." : `Only ${criticalGaps.length} skill gap to address.`} Strong competency score of ${candidate.competencyScore}%. Recommend immediate interview.`;
  }
  if (grade === "B+" || grade === "B") {
    return `${candidate.name} is a good match with ${candidate.competencyScore}% competency. ${criticalGaps.length > 0 ? `Needs development in: ${criticalGaps.map((g) => g.skill).join(", ")}.` : "Strong foundation with some gaps in preferred skills."} Consider for interview with training plan.`;
  }
  if (grade === "C+" || grade === "C") {
    return `${candidate.name} shows potential but has significant gaps (${skillGaps.length} skills below requirement). Consider for junior role or with structured onboarding plan.`;
  }
  return `${candidate.name} is not yet ready for this role. Recommend enrolling in relevant PiBridge programmes to build required skills.`;
}

// ── Main Matching Function ──

/**
 * Match a single candidate against a job requirement.
 */
export function matchCandidateToJob(
  candidate: CandidateProfile,
  job: JobRequirement
): MatchResult {
  const skillMatch = calculateSkillMatch(candidate.skills, job.requiredSkills);
  const competencyMatch = calculateCompetencyMatch(candidate.competencyScore, job.minCompetencyScore);
  const experienceMatch = calculateExperienceMatch(candidate, job);
  const locationMatch = calculateLocationMatch(candidate.location, job);
  const softSkillScore = calculateSoftSkillScore(candidate);

  // Weighted overall score
  const overallScore = Math.round(
    skillMatch.score * 0.35 +
    competencyMatch * 0.25 +
    experienceMatch * 0.20 +
    locationMatch * 0.10 +
    softSkillScore * 0.10
  );

  const grade = getMatchGrade(overallScore);
  const recommendation = getRecommendation(grade, skillMatch.gaps, candidate);

  return {
    candidateId: candidate.candidateId,
    jobId: job.jobId,
    overallScore,
    skillMatchScore: skillMatch.score,
    competencyMatchScore: Math.round(competencyMatch),
    experienceMatchScore: Math.round(experienceMatch),
    locationMatchScore: Math.round(locationMatch),
    softSkillScore,
    matchGrade: grade,
    skillGaps: skillMatch.gaps,
    strengths: skillMatch.strengths,
    recommendation,
  };
}

/**
 * Rank all candidates for a job posting.
 * Returns sorted by overall match score (highest first).
 */
export function rankCandidatesForJob(
  candidates: CandidateProfile[],
  job: JobRequirement
): MatchResult[] {
  return candidates
    .filter((c) => c.available || !c.available) // Include all for ranking
    .map((c) => matchCandidateToJob(c, job))
    .sort((a, b) => b.overallScore - a.overallScore);
}

/**
 * Find the best jobs for a candidate.
 * Returns sorted by overall match score (highest first).
 */
export function findBestJobsForCandidate(
  candidate: CandidateProfile,
  jobs: JobRequirement[]
): MatchResult[] {
  return jobs
    .map((j) => matchCandidateToJob(candidate, j))
    .sort((a, b) => b.overallScore - a.overallScore);
}

/**
 * Batch match: match all candidates against all jobs.
 * Returns a matrix of results.
 */
export function batchMatch(
  candidates: CandidateProfile[],
  jobs: JobRequirement[]
): Map<string, MatchResult[]> {
  const results = new Map<string, MatchResult[]>();
  for (const job of jobs) {
    results.set(job.jobId, rankCandidatesForJob(candidates, job));
  }
  return results;
}

// ── Sample Data for Demo ──

export const SAMPLE_JOB_REQUIREMENTS: JobRequirement[] = [
  {
    jobId: "j1",
    title: "Junior SOC Analyst",
    company: "Vodafone Ghana",
    requiredSkills: [
      { skillName: "SIEM", minLevel: "Competent", weight: 0.3, isRequired: true },
      { skillName: "Networking", minLevel: "Competent", weight: 0.25, isRequired: true },
      { skillName: "Linux", minLevel: "Developing", weight: 0.2, isRequired: true },
      { skillName: "Incident Response", minLevel: "Introduced", weight: 0.15, isRequired: false },
      { skillName: "Python", minLevel: "Introduced", weight: 0.1, isRequired: false },
    ],
    minCompetencyScore: 65,
    preferredTier: "foundation",
    minProjects: 2,
    minCertificates: 1,
    location: "Accra",
    isRemote: false,
    salaryRange: { min: 3000, max: 5000 },
  },
  {
    jobId: "j2",
    title: "Cloud Engineer",
    company: "MTN Ghana",
    requiredSkills: [
      { skillName: "AWS", minLevel: "Proficient", weight: 0.3, isRequired: true },
      { skillName: "Terraform", minLevel: "Competent", weight: 0.25, isRequired: true },
      { skillName: "Kubernetes", minLevel: "Developing", weight: 0.2, isRequired: true },
      { skillName: "Docker", minLevel: "Competent", weight: 0.15, isRequired: false },
      { skillName: "Python", minLevel: "Developing", weight: 0.1, isRequired: false },
    ],
    minCompetencyScore: 72,
    preferredTier: "professional",
    minProjects: 3,
    minCertificates: 2,
    location: "Accra / Remote",
    isRemote: true,
    salaryRange: { min: 5000, max: 8000 },
  },
  {
    jobId: "j3",
    title: "Full-Stack Developer",
    company: "Hubtel",
    requiredSkills: [
      { skillName: "React", minLevel: "Proficient", weight: 0.25, isRequired: true },
      { skillName: "Node.js", minLevel: "Competent", weight: 0.25, isRequired: true },
      { skillName: "TypeScript", minLevel: "Competent", weight: 0.2, isRequired: true },
      { skillName: "PostgreSQL", minLevel: "Developing", weight: 0.15, isRequired: false },
      { skillName: "Docker", minLevel: "Introduced", weight: 0.15, isRequired: false },
    ],
    minCompetencyScore: 70,
    preferredTier: "professional",
    minProjects: 3,
    minCertificates: 2,
    location: "Accra",
    isRemote: false,
    salaryRange: { min: 4000, max: 6000 },
  },
  {
    jobId: "j4",
    title: "Security Consultant",
    company: "KPMG Ghana",
    requiredSkills: [
      { skillName: "Penetration Testing", minLevel: "Proficient", weight: 0.25, isRequired: true },
      { skillName: "ISO 27001", minLevel: "Competent", weight: 0.25, isRequired: true },
      { skillName: "Risk Assessment", minLevel: "Competent", weight: 0.2, isRequired: true },
      { skillName: "Compliance", minLevel: "Developing", weight: 0.15, isRequired: false },
      { skillName: "Networking", minLevel: "Proficient", weight: 0.15, isRequired: false },
    ],
    minCompetencyScore: 80,
    preferredTier: "expert",
    minProjects: 4,
    minCertificates: 3,
    location: "Accra",
    isRemote: false,
    salaryRange: { min: 8000, max: 12000 },
  },
];

export const SAMPLE_CANDIDATES: CandidateProfile[] = [
  {
    candidateId: "c1", name: "Kofi Mensah", title: "SOC Analyst Graduate", location: "Accra",
    skills: [
      { skillName: "SIEM", level: "Proficient", verified: true, source: "assessment", confidenceScore: 88 },
      { skillName: "Networking", level: "Competent", verified: true, source: "course", confidenceScore: 82 },
      { skillName: "Linux", level: "Competent", verified: true, source: "course", confidenceScore: 80 },
      { skillName: "Incident Response", level: "Developing", verified: true, source: "project", confidenceScore: 75 },
      { skillName: "Python", level: "Developing", verified: false, source: "self", confidenceScore: 60 },
    ],
    competencyScore: 85, certificates: 3, projects: 5, tier: "professional", available: true, rating: 4.8,
    presentationScore: 82, interviewScore: 78, readinessLevel: "Ready", recentActivity: "Completed SOC Capstone",
  },
  {
    candidateId: "c2", name: "Ama Asante", title: "Full-Stack Developer", location: "Kumasi",
    skills: [
      { skillName: "React", level: "Proficient", verified: true, source: "assessment", confidenceScore: 92 },
      { skillName: "Node.js", level: "Proficient", verified: true, source: "project", confidenceScore: 88 },
      { skillName: "TypeScript", level: "Competent", verified: true, source: "course", confidenceScore: 85 },
      { skillName: "PostgreSQL", level: "Competent", verified: true, source: "project", confidenceScore: 82 },
      { skillName: "Docker", level: "Developing", verified: false, source: "self", confidenceScore: 65 },
    ],
    competencyScore: 92, certificates: 4, projects: 8, tier: "professional", available: true, rating: 4.9,
    presentationScore: 88, interviewScore: 85, readinessLevel: "Highly Ready", recentActivity: "Built production SaaS app",
  },
  {
    candidateId: "c3", name: "Yaw Boateng", title: "Cloud Engineer", location: "Accra",
    skills: [
      { skillName: "AWS", level: "Competent", verified: true, source: "course", confidenceScore: 78 },
      { skillName: "Terraform", level: "Developing", verified: true, source: "course", confidenceScore: 72 },
      { skillName: "Kubernetes", level: "Introduced", verified: false, source: "self", confidenceScore: 55 },
      { skillName: "Docker", level: "Competent", verified: true, source: "project", confidenceScore: 80 },
      { skillName: "Python", level: "Developing", verified: true, source: "course", confidenceScore: 68 },
    ],
    competencyScore: 78, certificates: 2, projects: 3, tier: "professional", available: false, rating: 4.6,
    presentationScore: 75, interviewScore: 72, readinessLevel: "Developing", recentActivity: "Completed Cloud Foundations",
  },
  {
    candidateId: "c4", name: "Efua Darko", title: "Security Analyst", location: "Tema",
    skills: [
      { skillName: "Penetration Testing", level: "Competent", verified: true, source: "project", confidenceScore: 85 },
      { skillName: "Networking", level: "Proficient", verified: true, source: "assessment", confidenceScore: 90 },
      { skillName: "Linux", level: "Proficient", verified: true, source: "course", confidenceScore: 88 },
      { skillName: "Incident Response", level: "Competent", verified: true, source: "project", confidenceScore: 82 },
      { skillName: "SIEM", level: "Proficient", verified: true, source: "assessment", confidenceScore: 87 },
    ],
    competencyScore: 88, certificates: 3, projects: 6, tier: "professional", available: true, rating: 4.7,
    presentationScore: 85, interviewScore: 80, readinessLevel: "Ready", recentActivity: "Passed SOC Professional",
  },
  {
    candidateId: "c5", name: "Nana Appiah", title: "Data Analyst", location: "Accra",
    skills: [
      { skillName: "SQL", level: "Proficient", verified: true, source: "assessment", confidenceScore: 90 },
      { skillName: "Python", level: "Competent", verified: true, source: "course", confidenceScore: 82 },
      { skillName: "Power BI", level: "Competent", verified: true, source: "project", confidenceScore: 78 },
      { skillName: "Docker", level: "Introduced", verified: false, source: "self", confidenceScore: 40 },
    ],
    competencyScore: 82, certificates: 2, projects: 4, tier: "professional", available: true, rating: 4.5,
    presentationScore: 78, interviewScore: 75, readinessLevel: "Ready", recentActivity: "Completed Data Analytics Capstone",
  },
  {
    candidateId: "c6", name: "Adjoa Poku", title: "DevOps Engineer", location: "Accra",
    skills: [
      { skillName: "Docker", level: "Proficient", verified: true, source: "project", confidenceScore: 92 },
      { skillName: "Kubernetes", level: "Competent", verified: true, source: "assessment", confidenceScore: 85 },
      { skillName: "Terraform", level: "Proficient", verified: true, source: "project", confidenceScore: 88 },
      { skillName: "AWS", level: "Competent", verified: true, source: "course", confidenceScore: 82 },
      { skillName: "Python", level: "Competent", verified: true, source: "course", confidenceScore: 80 },
    ],
    competencyScore: 90, certificates: 3, projects: 7, tier: "professional", available: true, rating: 4.8,
    presentationScore: 90, interviewScore: 88, readinessLevel: "Highly Ready", recentActivity: "Completed DevSecOps Capstone",
  },
];
