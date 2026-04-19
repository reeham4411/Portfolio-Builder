"use client";

import React, { createContext, useContext, useState } from "react";
import {
  PortfolioData,
  TemplateId,
  BuilderStep,
  Skill,
  Project,
  Experience,
  PersonalInfo,
} from "@/types/portfolio";

type PortfolioContextType = {
  data: PortfolioData;
  currentStep: BuilderStep;
  publishedId: string | null;
  isPublishing: boolean;
  error: string | null;

  setCurrentStep: (step: BuilderStep) => void;

  updateTemplate: (id: TemplateId) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSkills: (skills: Skill[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperience: (experience: Experience[]) => void;

  publishPortfolio: () => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextType | null>(null);

const initialData: PortfolioData = {
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

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [currentStep, setCurrentStep] = useState<BuilderStep>("template");

  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTemplate = (id: TemplateId) => {
    setData((prev) => ({
      ...prev,
      templateId: id,
    }));
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }));
  };

  const updateSkills = (skills: Skill[]) => {
    setData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const updateProjects = (projects: Project[]) => {
    setData((prev) => ({
      ...prev,
      projects,
    }));
  };

  const updateExperience = (experience: Experience[]) => {
    setData((prev) => ({
      ...prev,
      experience,
    }));
  };

  const publishPortfolio = async () => {
    try {
      setIsPublishing(true);
      setError(null);

      const res = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data,
          templateId: data.templateId,
          fullName: data.personalInfo.name,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Publish failed");
      }

      setPublishedId(result.portfolio.slug);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Publish failed");
      } else {
        setError("Publish failed");
      }
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        currentStep,
        publishedId,
        isPublishing,
        error,

        setCurrentStep,

        updateTemplate,
        updatePersonalInfo,
        updateSkills,
        updateProjects,
        updateExperience,

        publishPortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }

  return context;
}
