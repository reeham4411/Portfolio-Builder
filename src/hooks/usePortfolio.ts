import { usePortfolio as usePortfolioContext } from "@/context/PortfolioContext";
import { useMemo } from "react";
import { BuilderStep } from "@/types/portfolio";

const STEP_ORDER: BuilderStep[] = [
  "template",
  "personal",
  "skills",
  "projects",
  "experience",
  "publish",
];

export function usePortfolio() {
  const ctx = usePortfolioContext();

  const completionScore = useMemo(() => {
    const { personalInfo: p, skills, projects, experience } = ctx.data;
    let score = 0;
    // Template chosen = always 1 point
    score += 1;
    // Personal info
    if (p.name) score += 1;
    if (p.title) score += 1;
    if (p.email) score += 1;
    if (p.bio) score += 1;
    // Sections
    if (skills.length > 0) score += 1;
    if (projects.length > 0) score += 1;
    if (experience.length > 0) score += 1;
    return Math.round((score / 8) * 100);
  }, [ctx.data]);

  const currentStepIndex = useMemo(
    () => STEP_ORDER.indexOf(ctx.currentStep),
    [ctx.currentStep]
  );

  const isStepCompleted = useMemo(() => {
    const { personalInfo: p, skills, projects, experience } = ctx.data;
    return {
      template: true,
      personal: !!(p.name && p.title && p.email),
      skills: skills.length > 0,
      projects: projects.length > 0,
      experience: experience.length > 0,
      publish: false,
    } as Record<BuilderStep, boolean>;
  }, [ctx.data]);

  const goToNextStep = () => {
    const next = STEP_ORDER[currentStepIndex + 1];
    if (next) ctx.setCurrentStep(next);
  };

  const goToPrevStep = () => {
    const prev = STEP_ORDER[currentStepIndex - 1];
    if (prev) ctx.setCurrentStep(prev);
  };

  const canGoNext = currentStepIndex < STEP_ORDER.length - 1;
  const canGoPrev = currentStepIndex > 0;

  const missingFields = useMemo(() => {
    const { personalInfo: p, skills, projects, experience } = ctx.data;
    const missing: string[] = [];
    if (!p.name) missing.push("Full name");
    if (!p.title) missing.push("Professional title");
    if (!p.email) missing.push("Email address");
    if (!p.bio) missing.push("Bio / About me");
    if (skills.length === 0) missing.push("At least one skill");
    if (projects.length === 0) missing.push("At least one project");
    return missing;
  }, [ctx.data]);

  const isReadyToPublish = missingFields.length === 0;

  return {
    ...ctx,
    completionScore,
    currentStepIndex,
    isStepCompleted,
    goToNextStep,
    goToPrevStep,
    canGoNext,
    canGoPrev,
    missingFields,
    isReadyToPublish,
    stepOrder: STEP_ORDER,
  };
}