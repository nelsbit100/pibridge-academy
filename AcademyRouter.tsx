// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Router & Shell
// ──────────────────────────────────────────────────────────────

import { AcademyProvider, useAcademy } from "./AcademyContext";
import { AcademyLanding } from "./Public/AcademyLanding";
import { ProgrammeList, ProgrammeDetail } from "./Public/ProgrammeList";
import { CourseDetail } from "./Public/CourseDetail";
import { LearnerDashboard } from "./Learner/LearnerDashboard";
import { CoursePlayer } from "./Learner/CoursePlayer";
import { ProfessionalProfile } from "./Learner/ProfessionalProfile";
import { CareerDiscovery } from "./Learner/CareerDiscovery";
import { CareerPathProgression } from "./Learner/CareerPathProgression";
import { LivePresentation } from "./Learner/LivePresentation";
import { AIInterviewer } from "./Learner/AIInterviewer";
import { PaymentCheckout } from "./Learner/PaymentCheckout";
import { EmployerPortal } from "./Public/EmployerPortal";
import { BusinessOSPage } from "./Public/BusinessOSPage";
import { SecurePage } from "./Public/SecurePage";
import { InstructorDashboard } from "./Instructor/InstructorDashboard";
import { AdminDashboard } from "./Admin/AdminDashboard";
import {
  GraduationCap, BookOpen, Shield, User, Settings, ChevronDown,
  LayoutDashboard, Award, FileText,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import type { AcademyRole } from "./types";

// ── Scroll Reveal Observer ──
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function AcademyNav() {
  const { role, setRole, currentView, setView } = useAcademy();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const ROLES: { key: AcademyRole; label: string; icon: typeof GraduationCap }[] = [
    { key: "learner", label: "Learner", icon: User },
    { key: "instructor", label: "Instructor", icon: BookOpen },
    { key: "admin", label: "Admin", icon: Shield },
  ];

  const roleInfo = ROLES.find((r) => r.key === role) || ROLES[0];
  const RoleIcon = roleInfo.icon;

  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setView("home")} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#003135] flex items-center justify-center group-hover:bg-[#3D52A0] transition-colors duration-500">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-[#003135] text-sm hidden sm:block tracking-tight">PiBridge Academy</span>
        </button>

        {/* Center Nav */}
        <div className="flex items-center gap-0.5">
          {[
            { key: "home", label: "Home" },
            { key: "programmes", label: "Programmes" },
            ...(role === "learner"
              ? [
                  { key: "learner-dashboard", label: "Dashboard" },
                  { key: "profile", label: "My Profile" },
                  { key: "certificates", label: "Certificates" },
                ]
              : []),
            ...(role === "instructor"
              ? [{ key: "instructor-dashboard", label: "Dashboard" }]
              : []),
            ...(role === "admin"
              ? [
                  { key: "admin-dashboard", label: "Dashboard" },
                  { key: "admin-users", label: "Users" },
                ]
              : []),
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hidden md:block ${
                currentView === item.key
                  ? "text-[#3D52A0] bg-[#3D52A0]/[0.06] font-semibold"
                  : "text-[#7A8A95] hover:text-[#003135]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 glass rounded-xl text-sm text-[#7A8A95] hover:text-[#003135] transition-all duration-200"
          >
            <RoleIcon className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">{roleInfo.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#9AAAB5] transition-transform duration-200 ${roleMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {roleMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setRoleMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-44 glass-strong rounded-xl shadow-glass-lg z-50 overflow-hidden animate-scale-in">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.key}
                      onClick={() => {
                        setRole(r.key);
                        setRoleMenuOpen(false);
                        if (r.key === "learner") setView("learner-dashboard");
                        else if (r.key === "instructor") setView("instructor-dashboard");
                        else if (r.key === "admin") setView("admin-dashboard");
                      }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-all duration-150 ${
                        role === r.key
                          ? "bg-[#3D52A0]/[0.06] text-[#3D52A0] font-semibold"
                          : "text-[#7A8A95] hover:text-[#003135]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function AcademyViewRouter() {
  const { currentView, setView } = useAcademy();

  switch (currentView) {
    // Public
    case "home":
      return <AcademyLanding />;
    case "programmes":
      return <ProgrammeList />;
    case "programme-detail":
      return <ProgrammeDetail />;
    case "course-detail":
      return <CourseDetail />;

    // Learner
    case "learner-dashboard":
      return <LearnerDashboard />;
    case "course-player":
      return <CoursePlayer />;
    case "my-courses":
      return <LearnerDashboard />;
    case "certificates":
      return <LearnerDashboard />;
    case "quiz":
      return <CoursePlayer />;
    case "assignments":
      return <LearnerDashboard />;
    case "profile":
      return <ProfessionalProfile />;

    // Instructor
    case "instructor-dashboard":
      return <InstructorDashboard />;
    case "manage-courses":
      return <InstructorDashboard />;
    case "grading":
      return <InstructorDashboard />;

    // Career & Commerce
    case "career-discovery":
      return <CareerDiscovery onBack={() => setView("home")} onSelectProgramme={(progId) => { /* would set programme context */ setView("programme-detail"); }} />;
    case "career-path":
      return <CareerPathProgression
        domain="cybersecurity"
        completedTierIds={[]}
        stats={{ coursesCompleted: 3, averageQuizScore: 78, projectsCompleted: 2, hasPresentation: false, hasInterview: false, competencyLevel: "Developing" }}
        onSelectProgramme={(progId) => setView("programme-detail")}
        onStartPresentation={(tierId) => setView("live-presentation")}
        onStartInterview={(tierId) => setView("ai-interview")}
        onBack={() => setView("home")}
      />;
    case "live-presentation":
      return <LivePresentation
        projectTitle="SOC Incident Investigation Capstone"
        projectDescription="Complete SOC investigation report with timeline, IOCs, and detection rules"
        programmeId="prog-cyber-foundation"
        tierName="foundation"
        onComplete={(score, feedback) => setView("learner-dashboard")}
        onBack={() => setView("learner-dashboard")}
      />;
    case "ai-interview":
      return <AIInterviewer
        projectTitle="SOC Incident Investigation Capstone"
        projectDescription="Complete SOC investigation report with timeline, IOCs, and detection rules"
        domain="cybersecurity"
        programmeId="prog-cyber-foundation"
        tierName="foundation"
        onComplete={(score, readiness) => setView("learner-dashboard")}
        onBack={() => setView("learner-dashboard")}
      />;
    case "payment-checkout":
      return <PaymentCheckout
        item={{ name: "Cybersecurity Foundations Programme", description: "Complete programme with 9 courses, labs, and capstone", amount: 5500, currency: "GHS" }}
        onSuccess={() => setView("learner-dashboard")}
        onBack={() => setView("programmes")}
      />;
    case "employer-portal":
      return <EmployerPortal onBack={() => setView("home")} />;

    // Platforms
    case "businessos":
      return <BusinessOSPage onBack={() => setView("home")} />;
    case "secure":
      return <SecurePage onBack={() => setView("home")} />;

    // Admin
    case "admin-dashboard":
      return <AdminDashboard />;
    case "admin-users":
      return <AdminDashboard />;
    case "admin-courses":
      return <AdminDashboard />;
    case "admin-programmes":
      return <AdminDashboard />;
    case "admin-reports":
      return <AdminDashboard />;

    default:
      return <AcademyLanding />;
  }
}

function AcademyShell() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-aliceblue text-[#003135] font-sans">
      <AcademyNav />
      <AcademyViewRouter />
    </div>
  );
}

export function AcademyApp() {
  return (
    <AcademyProvider>
      <AcademyShell />
    </AcademyProvider>
  );
}
