// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Firebase/Firestore Persistence Layer
// Enrollments, progress, quiz scores, certificates,
// career path progression, presentation & interview results
// ──────────────────────────────────────────────────────────────

// ── Firebase Configuration ──
// In production, these come from environment variables
const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// ── Firestore Collection Names ──
export const COLLECTIONS = {
  USERS: "users",
  LEARNER_PROFILES: "learnerProfiles",
  ENROLLMENTS: "enrollments",
  LESSON_PROGRESS: "lessonProgress",
  COURSE_PROGRESS: "courseProgress",
  PROGRAMME_PROGRESS: "programmeProgress",
  QUIZ_ATTEMPTS: "quizAttempts",
  QUIZ_SCORES: "quizScores",
  CERTIFICATES: "certificates",
  CAREER_PATHS: "careerPaths",
  LIVE_PRESENTATIONS: "livePresentations",
  AI_INTERVIEWS: "aiInterviews",
  SKILLS: "skills",
  COMPETENCIES: "competencies",
  PROJECTS: "projects",
  AUDIT_LOGS: "auditLogs",
} as const;

// ── Local Storage Persistence (Offline-First) ──
// Uses localStorage as a local cache; syncs to Firestore when available

function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(`pibridge_${key}`);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(`pibridge_${key}`, JSON.stringify(value));
  } catch {
    console.warn("Failed to save to localStorage");
  }
}

// ── Data Types ──

export interface EnrollmentRecord {
  id: string;
  userId: string;
  programmeId: string;
  programmeTitle: string;
  enrolledAt: string;
  status: "active" | "completed" | "paused" | "dropped";
  tier: "foundation" | "professional" | "expert";
}

export interface LessonProgressRecord {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  programmeId: string;
  status: "not-started" | "in-progress" | "completed";
  startedAt?: string;
  completedAt?: string;
  timeSpentMinutes: number;
}

export interface QuizAttemptRecord {
  id: string;
  userId: string;
  quizId: string;
  courseId: string;
  programmeId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTakenSeconds: number;
  attemptedAt: string;
  passed: boolean;
}

export interface CertificateRecord {
  id: string;
  userId: string;
  credentialId: string;
  programmeId: string;
  programmeTitle: string;
  tier: string;
  issuedAt: string;
  skills: string[];
  verificationUrl: string;
}

export interface CareerPathProgressRecord {
  id: string;
  userId: string;
  domain: string;
  completedTierIds: string[];
  currentTierId: string;
  stats: {
    coursesCompleted: number;
    averageQuizScore: number;
    projectsCompleted: number;
    hasPresentation: boolean;
    hasInterview: boolean;
    competencyLevel: string;
  };
  updatedAt: string;
}

export interface PresentationRecord {
  id: string;
  userId: string;
  projectTitle: string;
  programmeId: string;
  tierName: string;
  completedAt: string;
  score: number;
  communicationScore: number;
  technicalScore: number;
  feedback: string;
  durationMinutes: number;
}

export interface InterviewRecord {
  id: string;
  userId: string;
  projectTitle: string;
  programmeId: string;
  domain: string;
  tierName: string;
  completedAt: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  readinessLevel: string;
  recommendations: string[];
}

export interface SkillRecord {
  id: string;
  userId: string;
  skillName: string;
  level: string;
  verified: boolean;
  source: string;
  verifiedAt?: string;
}

// ── Firestore Service ──
// Abstracts Firestore operations with localStorage fallback

class FirestoreService {
  private isOnline: boolean = false;
  private db: unknown = null;

  async initialize(): Promise<void> {
    try {
      // In production: initialize Firebase SDK
      // import { initializeApp } from 'firebase/app';
      // import { getFirestore } from 'firebase/firestore';
      // const app = initializeApp(FIREBASE_CONFIG);
      // this.db = getFirestore(app);
      // this.isOnline = true;

      // For now, use localStorage only
      this.isOnline = false;
      console.log("[PiBridge] Using localStorage persistence. Configure Firebase env vars for cloud sync.");
    } catch (error) {
      console.warn("[PiBridge] Firebase initialization failed, using localStorage fallback:", error);
      this.isOnline = false;
    }
  }

  // ── Enrollment Operations ──
  async saveEnrollment(enrollment: EnrollmentRecord): Promise<void> {
    const enrollments = getLocalStorage<EnrollmentRecord[]>("enrollments", []);
    const existing = enrollments.findIndex((e) => e.id === enrollment.id);
    if (existing >= 0) {
      enrollments[existing] = enrollment;
    } else {
      enrollments.push(enrollment);
    }
    setLocalStorage("enrollments", enrollments);

    // Firestore sync
    if (this.isOnline && this.db) {
      // await setDoc(doc(this.db, COLLECTIONS.ENROLLMENTS, enrollment.id), enrollment);
    }
  }

  async getEnrollments(userId: string): Promise<EnrollmentRecord[]> {
    const enrollments = getLocalStorage<EnrollmentRecord[]>("enrollments", []);
    return enrollments.filter((e) => e.userId === userId);
  }

  async deleteEnrollment(enrollmentId: string): Promise<void> {
    const enrollments = getLocalStorage<EnrollmentRecord[]>("enrollments", []);
    setLocalStorage("enrollments", enrollments.filter((e) => e.id !== enrollmentId));
  }

  // ── Lesson Progress Operations ──
  async saveLessonProgress(progress: LessonProgressRecord): Promise<void> {
    const allProgress = getLocalStorage<LessonProgressRecord[]>("lessonProgress", []);
    const existing = allProgress.findIndex((p) => p.lessonId === progress.lessonId && p.userId === progress.userId);
    if (existing >= 0) {
      allProgress[existing] = progress;
    } else {
      allProgress.push(progress);
    }
    setLocalStorage("lessonProgress", allProgress);
  }

  async getLessonProgress(userId: string, courseId?: string): Promise<LessonProgressRecord[]> {
    const allProgress = getLocalStorage<LessonProgressRecord[]>("lessonProgress", []);
    return allProgress.filter((p) => p.userId === userId && (!courseId || p.courseId === courseId));
  }

  // ── Quiz Operations ──
  async saveQuizAttempt(attempt: QuizAttemptRecord): Promise<void> {
    const attempts = getLocalStorage<QuizAttemptRecord[]>("quizAttempts", []);
    attempts.push(attempt);
    setLocalStorage("quizAttempts", attempts);

    // Update running average
    const userAttempts = attempts.filter((a) => a.userId === attempt.userId);
    const avgScore = userAttempts.reduce((sum, a) => sum + a.score, 0) / userAttempts.length;
    setLocalStorage(`quizAvg_${attempt.userId}`, avgScore);
  }

  async getQuizAttempts(userId: string, courseId?: string): Promise<QuizAttemptRecord[]> {
    const attempts = getLocalStorage<QuizAttemptRecord[]>("quizAttempts", []);
    return attempts.filter((a) => a.userId === userId && (!courseId || a.courseId === courseId));
  }

  async getQuizAverageScore(userId: string): Promise<number> {
    return getLocalStorage<number>(`quizAvg_${userId}`, 0);
  }

  // ── Certificate Operations ──
  async saveCertificate(cert: CertificateRecord): Promise<void> {
    const certs = getLocalStorage<CertificateRecord[]>("certificates", []);
    const existing = certs.findIndex((c) => c.id === cert.id);
    if (existing >= 0) {
      certs[existing] = cert;
    } else {
      certs.push(cert);
    }
    setLocalStorage("certificates", certs);
  }

  async getCertificates(userId: string): Promise<CertificateRecord[]> {
    const certs = getLocalStorage<CertificateRecord[]>("certificates", []);
    return certs.filter((c) => c.userId === userId);
  }

  async verifyCertificate(credentialId: string): Promise<CertificateRecord | null> {
    const certs = getLocalStorage<CertificateRecord[]>("certificates", []);
    return certs.find((c) => c.credentialId === credentialId) || null;
  }

  // ── Career Path Operations ──
  async saveCareerPathProgress(progress: CareerPathProgressRecord): Promise<void> {
    const paths = getLocalStorage<CareerPathProgressRecord[]>("careerPaths", []);
    const existing = paths.findIndex((p) => p.userId === progress.userId && p.domain === progress.domain);
    if (existing >= 0) {
      paths[existing] = progress;
    } else {
      paths.push(progress);
    }
    setLocalStorage("careerPaths", paths);
  }

  async getCareerPathProgress(userId: string, domain: string): Promise<CareerPathProgressRecord | null> {
    const paths = getLocalStorage<CareerPathProgressRecord[]>("careerPaths", []);
    return paths.find((p) => p.userId === userId && p.domain === domain) || null;
  }

  async getAllCareerPathProgress(userId: string): Promise<CareerPathProgressRecord[]> {
    const paths = getLocalStorage<CareerPathProgressRecord[]>("careerPaths", []);
    return paths.filter((p) => p.userId === userId);
  }

  // ── Presentation Operations ──
  async savePresentation(presentation: PresentationRecord): Promise<void> {
    const presentations = getLocalStorage<PresentationRecord[]>("presentations", []);
    presentations.push(presentation);
    setLocalStorage("presentations", presentations);

    // Update career path progress
    const paths = getLocalStorage<CareerPathProgressRecord[]>("careerPaths", []);
    for (const path of paths) {
      if (path.userId === presentation.userId) {
        path.stats.hasPresentation = true;
        path.updatedAt = new Date().toISOString();
      }
    }
    setLocalStorage("careerPaths", paths);
  }

  async getPresentations(userId: string): Promise<PresentationRecord[]> {
    const presentations = getLocalStorage<PresentationRecord[]>("presentations", []);
    return presentations.filter((p) => p.userId === userId);
  }

  // ── Interview Operations ──
  async saveInterviewResult(interview: InterviewRecord): Promise<void> {
    const interviews = getLocalStorage<InterviewRecord[]>("interviews", []);
    interviews.push(interview);
    setLocalStorage("interviews", interviews);

    // Update career path progress
    const paths = getLocalStorage<CareerPathProgressRecord[]>("careerPaths", []);
    for (const path of paths) {
      if (path.userId === interview.userId) {
        path.stats.hasInterview = true;
        path.updatedAt = new Date().toISOString();
      }
    }
    setLocalStorage("careerPaths", paths);
  }

  async getInterviews(userId: string): Promise<InterviewRecord[]> {
    const interviews = getLocalStorage<InterviewRecord[]>("interviews", []);
    return interviews.filter((i) => i.userId === userId);
  }

  // ── Skill Operations ──
  async saveSkill(skill: SkillRecord): Promise<void> {
    const skills = getLocalStorage<SkillRecord[]>("skills", []);
    const existing = skills.findIndex((s) => s.userId === skill.userId && s.skillName === skill.skillName);
    if (existing >= 0) {
      skills[existing] = skill;
    } else {
      skills.push(skill);
    }
    setLocalStorage("skills", skills);
  }

  async getUserSkills(userId: string): Promise<SkillRecord[]> {
    const skills = getLocalStorage<SkillRecord[]>("skills", []);
    return skills.filter((s) => s.userId === userId);
  }

  // ── Dashboard Statistics ──
  async getDashboardStats(userId: string) {
    const enrollments = await this.getEnrollments(userId);
    const activeEnrollments = enrollments.filter((e) => e.status === "active").length;
    const completedEnrollments = enrollments.filter((e) => e.status === "completed").length;

    const certs = await this.getCertificates(userId);
    const allQuizAttempts = await this.getQuizAttempts(userId);
    const avgScore = allQuizAttempts.length > 0
      ? Math.round(allQuizAttempts.reduce((sum, a) => sum + a.score, 0) / allQuizAttempts.length)
      : 0;

    const presentations = await this.getPresentations(userId);
    const interviews = await this.getInterviews(userId);

    return {
      activeEnrollments,
      completedEnrollments,
      totalCertificates: certs.length,
      averageQuizScore: avgScore,
      totalQuizzes: allQuizAttempts.length,
      presentationsCompleted: presentations.length,
      interviewsCompleted: interviews.length,
      averageInterviewScore: interviews.length > 0
        ? Math.round(interviews.reduce((sum, i) => sum + i.overallScore, 0) / interviews.length)
        : 0,
    };
  }

  // ── Data Export (for Professional Passport) ──
  async exportLearnerData(userId: string) {
    return {
      enrollments: await this.getEnrollments(userId),
      certificates: await this.getCertificates(userId),
      quizAttempts: await this.getQuizAttempts(userId),
      careerPaths: await this.getAllCareerPathProgress(userId),
      presentations: await this.getPresentations(userId),
      interviews: await this.getInterviews(userId),
      skills: await this.getUserSkills(userId),
      stats: await this.getDashboardStats(userId),
    };
  }

  // ── Clear All Data ──
  async clearAllData(userId: string): Promise<void> {
    const keys = [
      "enrollments", "lessonProgress", "quizAttempts", "certificates",
      "careerPaths", "presentations", "interviews", "skills",
    ];
    for (const key of keys) {
      const data = getLocalStorage<unknown[]>(key, []);
      const filtered = Array.isArray(data) ? data.filter((item: any) => item.userId !== userId) : [];
      setLocalStorage(key, filtered);
    }
  }
}

// ── Singleton Export ──
export const firestoreService = new FirestoreService();

// ── Initialize on import ──
firestoreService.initialize();
