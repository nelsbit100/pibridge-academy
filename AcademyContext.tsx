// ──────────────────────────────────────────────────────────────
// PiBridge Academy — State Management Context
// ──────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState, useCallback } from "react";
import type {
  AcademyRole,
  AcademyView,
  Programme,
  Course,
  LearnerProfile,
  InstructorProfile,
  Enrollment,
  LearningProgress,
  Certificate,
} from "./types";
import {
  PROGRAMMES,
  COURSES,
  DEMO_LEARNER,
  INSTRUCTORS,
  ENROLLMENTS,
  LEARNING_PROGRESS,
  CERTIFICATES,
} from "./data";

interface AcademyState {
  // Navigation
  currentView: AcademyView;
  setView: (view: AcademyView) => void;

  // Role
  role: AcademyRole;
  setRole: (role: AcademyRole) => void;

  // Context data
  selectedProgrammeId: string | null;
  setSelectedProgrammeId: (id: string | null) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;

  // Data accessors
  getProgramme: (id: string) => Programme | undefined;
  getCourse: (id: string) => Course | undefined;
  getProgrammeCourses: (programmeId: string) => Course[];
  getInstructor: (id: string) => InstructorProfile | undefined;

  // Learner data
  learner: LearnerProfile;
  enrollments: Enrollment[];
  progress: Record<string, LearningProgress>;
  certificates: Certificate[];
  getEnrollment: (courseId: string) => Enrollment | undefined;
  getProgress: (courseId: string) => LearningProgress | undefined;

  // Actions
  navigateToProgramme: (programmeId: string) => void;
  navigateToCourse: (courseId: string) => void;
  navigateToLesson: (courseId: string, lessonId: string) => void;
  goBack: () => void;

  // Mutable learner progress
  markLessonComplete: (courseId: string, lessonId: string, durationMinutes?: number) => void;
  recordQuizScore: (courseId: string, lessonId: string, score: number, passed: boolean) => void;
  recordSubmission: (
    courseId: string,
    lessonId: string,
    kind: "assignment" | "project" | "lab",
    score: number
  ) => void;
  playbackPositions: Record<string, Record<string, number>>;
  savePlayback: (courseId: string, lessonId: string, seconds: number) => void;
  clearPlayback: (courseId: string, lessonId: string) => void;
}

const AcademyContext = createContext<AcademyState | null>(null);

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<AcademyView>("home");
  const [role, setRole] = useState<AcademyRole>("learner");
  const [selectedProgrammeId, setSelectedProgrammeId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [viewHistory, setViewHistory] = useState<AcademyView[]>(["home"]);

  const setView = useCallback((view: AcademyView) => {
    setCurrentView(view);
    setViewHistory((prev) => [...prev, view]);
  }, []);

  const goBack = useCallback(() => {
    setViewHistory((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.slice(0, -1);
      setCurrentView(next[next.length - 1]);
      return next;
    });
  }, []);

  const navigateToProgramme = useCallback(
    (programmeId: string) => {
      setSelectedProgrammeId(programmeId);
      setView("programme-detail");
    },
    [setView]
  );

  const navigateToCourse = useCallback(
    (courseId: string) => {
      setSelectedCourseId(courseId);
      setView("course-detail");
    },
    [setView]
  );

  const navigateToLesson = useCallback(
    (courseId: string, lessonId: string) => {
      setSelectedCourseId(courseId);
      setSelectedLessonId(lessonId);
      setView("course-player");
    },
    [setView]
  );

  // ── Mutable learner progress ──
  const [progressState, setProgressState] = useState<Record<string, LearningProgress>>(LEARNING_PROGRESS);
  // lesson playback positions: courseId -> lessonId -> seconds
  const [playback, setPlayback] = useState<Record<string, Record<string, number>>>({});

  const markLessonComplete = useCallback((courseId: string, lessonId: string, durationMinutes = 0) => {
    setProgressState((prev) => {
      const p = prev[courseId];
      if (p?.completedLessons.includes(lessonId)) return prev;
      const base: LearningProgress = p ?? {
        learnerId: DEMO_LEARNER.id,
        courseId,
        completedLessons: [],
        completedModules: [],
        quizScores: {},
        assignmentScores: {},
        projectScores: {},
        totalTimeSpent: 0,
        lastAccessedAt: new Date().toISOString(),
      };
      return {
        ...prev,
        [courseId]: {
          ...base,
          completedLessons: [...base.completedLessons, lessonId],
          totalTimeSpent: base.totalTimeSpent + durationMinutes,
          lastAccessedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const recordQuizScore = useCallback((courseId: string, lessonId: string, score: number, passed: boolean) => {
    setProgressState((prev) => {
      const base: LearningProgress = prev[courseId] ?? {
        learnerId: DEMO_LEARNER.id,
        courseId,
        completedLessons: [],
        completedModules: [],
        quizScores: {},
        assignmentScores: {},
        projectScores: {},
        totalTimeSpent: 0,
        lastAccessedAt: new Date().toISOString(),
      };
      return {
        ...prev,
        [courseId]: {
          ...base,
          quizScores: { ...base.quizScores, [lessonId]: Math.max(score, base.quizScores[lessonId] ?? 0) },
          completedLessons: passed && !base.completedLessons.includes(lessonId)
            ? [...base.completedLessons, lessonId]
            : base.completedLessons,
          lastAccessedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const recordSubmission = useCallback(
    (courseId: string, lessonId: string, kind: "assignment" | "project" | "lab", score: number) => {
      setProgressState((prev) => {
        const base: LearningProgress = prev[courseId] ?? {
          learnerId: DEMO_LEARNER.id,
          courseId,
          completedLessons: [],
          completedModules: [],
          quizScores: {},
          assignmentScores: {},
          projectScores: {},
          totalTimeSpent: 0,
          lastAccessedAt: new Date().toISOString(),
        };
        const scores =
          kind === "assignment"
            ? { assignmentScores: { ...base.assignmentScores, [lessonId]: score } }
            : kind === "project"
              ? { projectScores: { ...base.projectScores, [lessonId]: score } }
              : {};
        return {
          ...prev,
          [courseId]: {
            ...base,
            ...scores,
            completedLessons: base.completedLessons.includes(lessonId)
              ? base.completedLessons
              : [...base.completedLessons, lessonId],
            lastAccessedAt: new Date().toISOString(),
          },
        };
      });
    },
    []
  );

  const savePlayback = useCallback((courseId: string, lessonId: string, seconds: number) => {
    setPlayback((prev) => {
      const forCourse = prev[courseId] ?? {};
      if (Math.abs((forCourse[lessonId] ?? 0) - seconds) < 1) return prev;
      return { ...prev, [courseId]: { ...forCourse, [lessonId]: seconds } };
    });
  }, []);

  const clearPlayback = useCallback((courseId: string, lessonId: string) => {
    setPlayback((prev) => {
      const forCourse = prev[courseId];
      if (!forCourse || !(lessonId in forCourse)) return prev;
      const next = { ...forCourse };
      delete next[lessonId];
      return { ...prev, [courseId]: next };
    });
  }, []);

  // Data accessors
  const getProgramme = useCallback((id: string) => PROGRAMMES.find((p) => p.id === id), []);
  const getCourse = useCallback((id: string) => COURSES.find((c) => c.id === id), []);
  const getProgrammeCourses = useCallback(
    (programmeId: string) => COURSES.filter((c) => c.programmeId === programmeId),
    []
  );
  const getInstructor = useCallback((id: string) => INSTRUCTORS.find((i) => i.id === id), []);
  const getEnrollment = useCallback(
    (courseId: string) => ENROLLMENTS.find((e) => e.courseId === courseId),
    []
  );
  const getProgress = useCallback(
    (courseId: string) => LEARNING_PROGRESS[courseId],
    []
  );

  const value: AcademyState = {
    currentView,
    setView,
    role,
    setRole,
    selectedProgrammeId,
    setSelectedProgrammeId,
    selectedCourseId,
    setSelectedCourseId,
    selectedLessonId,
    setSelectedLessonId,
    getProgramme,
    getCourse,
    getProgrammeCourses,
    getInstructor,
    learner: DEMO_LEARNER,
    enrollments: ENROLLMENTS,
    progress: progressState,
    certificates: CERTIFICATES,
    markLessonComplete,
    recordQuizScore,
    recordSubmission,
    playbackPositions: playback,
    savePlayback,
    clearPlayback,
    getEnrollment,
    getProgress,
    navigateToProgramme,
    navigateToCourse,
    navigateToLesson,
    goBack,
  };

  return <AcademyContext.Provider value={value}>{children}</AcademyContext.Provider>;
}

export function useAcademy() {
  const ctx = useContext(AcademyContext);
  if (!ctx) throw new Error("useAcademy must be used within AcademyProvider");
  return ctx;
}
