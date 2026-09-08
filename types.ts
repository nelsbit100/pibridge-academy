// ──────────────────────────────────────────────────────────────
// PiBridge Academy — MVP Type Definitions
// ──────────────────────────────────────────────────────────────

// ── User Roles ──
export type AcademyRole = "learner" | "instructor" | "admin";

// ── Programme ──
export type ProgrammeLevel = "foundation" | "associate" | "professional" | "advanced" | "expert";
export type CareerTier = "foundation" | "intermediate" | "advanced";
export type ProgrammeStatus = "draft" | "published" | "archived";

export interface Programme {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  level: ProgrammeLevel;
  careerTier?: CareerTier;
  domain: string;
  nextProgrammeId?: string; // links to next tier
  icon: string; // emoji or icon name
  color: string; // tailwind color class
  image: string;
  durationWeeks: number;
  totalHours: number;
  priceGHS: number;
  currency: "GHS";
  prerequisites: string[];
  outcomes: string[];
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  status: ProgrammeStatus;
  featured: boolean;
  courses: string[]; // course IDs in order
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// ── Course ──
export type CourseStatus = "draft" | "published" | "archived";

export interface Course {
  id: string;
  programmeId: string;
  title: string;
  slug: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  level: ProgrammeLevel;
  durationHours: number;
  moduleCount: number;
  totalLessons: number;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  priceGHS: number;
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  status: CourseStatus;
  thumbnail: string;
  tags: string[];
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

// ── Module ──
export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

// ── Lesson ──
export type LessonType = "video" | "reading" | "quiz" | "assignment" | "project" | "lab";

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  order: number;
  content?: string; // markdown content for reading
  videoUrl?: string;
  videoDuration?: number;
  resources?: LessonResource[];
  isPreview: boolean; // free preview lesson
  isCompleted?: boolean; // learner progress
}

export interface LessonResource {
  id: string;
  title: string;
  type: "pdf" | "link" | "file" | "code";
  url: string;
  size?: string;
}

// ── Quiz ──
export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingScore: number; // percentage
  maxAttempts: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  options?: string[]; // for MC
  correctAnswer: string | number | boolean;
  explanation: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  learnerId: string;
  answers: Record<string, string | number>;
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt: string;
}

// ── Assignment ──
export type AssignmentStatus = "not_submitted" | "submitted" | "graded" | "returned";

export interface Assignment {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: string;
  maxScore: number;
  submissionType: "file" | "text" | "url" | "code";
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  learnerId: string;
  content?: string;
  fileUrl?: string;
  repositoryUrl?: string;
  status: AssignmentStatus;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  submittedAt: string;
  gradedAt?: string;
}

// ── Project ──
export interface Project {
  id: string;
  courseId: string;
  title: string;
  description: string;
  instructions: string;
  requirements: string[];
  deliverables: string[];
  maxScore: number;
  dueDate?: string;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  learnerId: string;
  title: string;
  description: string;
  repositoryUrl?: string;
  deploymentUrl?: string;
  files: { name: string; url: string }[];
  status: AssignmentStatus;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  submittedAt: string;
  gradedAt?: string;
}

// ── Enrollment ──
export type EnrollmentStatus = "active" | "completed" | "paused" | "dropped";

export interface Enrollment {
  id: string;
  learnerId: string;
  courseId: string;
  programmeId: string;
  status: EnrollmentStatus;
  progress: number; // 0-100
  enrolledAt: string;
  completedAt?: string;
  lastAccessedAt: string;
  currentModuleId?: string;
  currentLessonId?: string;
}

// ── Learner Profile ──
export interface LearnerProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  location: string;
  goals: CareerGoal[];
  skillLevel: "beginner" | "intermediate" | "advanced";
  enrollments: string[];
  completedCourses: number;
  certificates: number;
  totalHoursLearned: number;
  streak: number; // days
  joinedAt: string;
}

export type CareerGoal =
  | "get_a_job"
  | "change_career"
  | "improve_career"
  | "start_business"
  | "freelance"
  | "certification_prep"
  | "learn_technology";

// ── Instructor Profile ──
export interface InstructorProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  title: string;
  specializations: string[];
  courseIds: string[];
  rating: number;
  studentCount: number;
  joinedAt: string;
}

// ── Certificate ──
export interface Certificate {
  id: string;
  credentialId: string; // unique public ID
  learnerId: string;
  learnerName: string;
  courseId: string;
  courseName: string;
  programmeId: string;
  programmeName: string;
  instructorName: string;
  score: number;
  issuedAt: string;
  verificationUrl: string;
  qrCode: string;
}

// ── Learning Progress ──
export interface LearningProgress {
  learnerId: string;
  courseId: string;
  completedLessons: string[];
  completedModules: string[];
  quizScores: Record<string, number>;
  assignmentScores: Record<string, number>;
  projectScores: Record<string, number>;
  totalTimeSpent: number; // minutes
  lastAccessedAt: string;
}

// ── Dashboard Stats ──
export interface LearnerDashboardStats {
  activeCourses: number;
  completedCourses: number;
  totalHoursLearned: number;
  currentStreak: number;
  certificates: number;
  avgScore: number;
}

export interface AdminDashboardStats {
  totalLearners: number;
  activeLearners: number;
  totalCourses: number;
  totalEnrollments: number;
  completionRate: number;
  avgScore: number;
  revenueGHS: number;
  newSignupsThisMonth: number;
}

// ── Academy Navigation ──
export type AcademyView =
  // Public
  | "home"
  | "programmes"
  | "programme-detail"
  | "courses"
  | "course-detail"
  // Learner
  | "learner-dashboard"
  | "my-courses"
  | "course-player"
  | "quiz"
  | "assignments"
  | "certificates"
  | "profile"
  // Instructor
  | "instructor-dashboard"
  | "manage-courses"
  | "grading"
  // Platforms
  | "businessos"
  | "secure"
  // Career & Commerce
  | "career-discovery"
  | "career-path"
  | "live-presentation"
  | "ai-interview"
  | "payment-checkout"
  | "employer-portal"
  // Admin
  | "admin-dashboard"
  | "admin-users"
  | "admin-courses"
  | "admin-programmes"
  | "admin-reports";
