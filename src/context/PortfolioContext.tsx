"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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

const STORAGE_KEY = "portfolio_builder_draft";
const STEP_KEY = "portfolio_builder_step";
const PORTFOLIO_ID_KEY = "portfolio_builder_portfolio_id";

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [currentStep, setCurrentStep] = useState<BuilderStep>("template");

  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedDraft = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STEP_KEY);
    const savedPortfolioId = localStorage.getItem(PORTFOLIO_ID_KEY);

    if (savedDraft) {
      try {
        setData(JSON.parse(savedDraft));
      } catch {
        console.error("Failed to parse saved draft");
      }
    }

    if (savedStep) {
      setCurrentStep(savedStep as BuilderStep);
    }

    if (savedPortfolioId) {
      setPortfolioId(savedPortfolioId);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STEP_KEY, currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (portfolioId) {
      localStorage.setItem(PORTFOLIO_ID_KEY, portfolioId);
    } else {
      localStorage.removeItem(PORTFOLIO_ID_KEY);
    }
  }, [portfolioId]);

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

  const saveDraft = async (): Promise<string> => {
    const res = await fetch("/api/portfolio/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        portfolioId,
        title: `${data.personalInfo.name || "Untitled"} Portfolio`,
        templateId: data.templateId,
        content: data,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to save draft");
    }

    const savedId = result.portfolio?.id;

    if (!savedId) {
      throw new Error("No portfolio id returned from save route");
    }

    setPortfolioId(savedId);
    return savedId;
  };

  const publishPortfolio = async () => {
    try {
      setIsPublishing(true);
      setError(null);

      let currentPortfolioId = portfolioId;

      if (!currentPortfolioId) {
        currentPortfolioId = await saveDraft();
      }

      const res = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portfolioId: currentPortfolioId,
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
