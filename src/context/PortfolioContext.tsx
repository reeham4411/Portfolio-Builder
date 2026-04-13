"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  PortfolioData,
  TemplateId,
  BuilderStep,
  Skill,
  Project,
  Experience,
} from "@/types/portfolio";

const defaultData: PortfolioData = {
  templateId: "minimalist",
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    bio: "",
    avatar: "",
  },
  skills: [],
  projects: [],
  experience: [],
};

interface PortfolioContextType {
  data: PortfolioData;
  currentStep: BuilderStep;
  setCurrentStep: (step: BuilderStep) => void;
  updateTemplate: (id: TemplateId) => void;
  updatePersonalInfo: (info: Partial<PortfolioData["personalInfo"]>) => void;
  updateSkills: (skills: Skill[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperience: (experience: Experience[]) => void;
  publishedId: string | null;
  publishPortfolio: () => string;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [currentStep, setCurrentStep] = useState<BuilderStep>("template");
  const [publishedId, setPublishedId] = useState<string | null>(null);

  const updateTemplate = (id: TemplateId) =>
    setData((d) => ({ ...d, templateId: id }));
  const updatePersonalInfo = (info: Partial<PortfolioData["personalInfo"]>) =>
    setData((d) => ({ ...d, personalInfo: { ...d.personalInfo, ...info } }));
  const updateSkills = (skills: Skill[]) => setData((d) => ({ ...d, skills }));
  const updateProjects = (projects: Project[]) =>
    setData((d) => ({ ...d, projects }));
  const updateExperience = (experience: Experience[]) =>
    setData((d) => ({ ...d, experience }));

  const publishPortfolio = () => {
    const id = Math.random().toString(36).substring(2, 10);
    if (typeof window !== "undefined") {
      localStorage.setItem(`portfolio_${id}`, JSON.stringify(data));
    }
    setPublishedId(id);
    return id;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        currentStep,
        setCurrentStep,
        updateTemplate,
        updatePersonalInfo,
        updateSkills,
        updateProjects,
        updateExperience,
        publishedId,
        publishPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx)
    throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
