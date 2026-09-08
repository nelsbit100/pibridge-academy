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
    progress: LEARNING_PROGRESS,
    certificates: CERTIFICATES,
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
