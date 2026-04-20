"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  isLoadingPortfolio: boolean;

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
  const searchParams = useSearchParams();
  const builderId = searchParams.get("id");

  const [data, setData] = useState<PortfolioData>(initialData);
  const [currentStep, setCurrentStep] = useState<BuilderStep>("template");

  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);

  const clearStoredPortfolioId = () => {
    setPortfolioId(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(PORTFOLIO_ID_KEY);
    }
  };

  // local restore only when NOT editing an existing saved portfolio
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (builderId) return;

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
  }, [builderId]);

  // load saved portfolio when editing
  useEffect(() => {
    if (!builderId) return;

    const loadPortfolio = async () => {
      try {
        setIsLoadingPortfolio(true);
        setError(null);

        const res = await fetch(`/api/portfolio/${builderId}`, {
          method: "GET",
          cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Failed to load portfolio");
        }

        const portfolio = result.portfolio;

        setPortfolioId(portfolio.id);
        setPublishedId(portfolio.slug ?? null);

        setData({
          templateId: portfolio.template_id ?? "minimalist",
          personalInfo: {
            name: portfolio.content_json?.personalInfo?.name ?? "",
            title: portfolio.content_json?.personalInfo?.title ?? "",
            email: portfolio.content_json?.personalInfo?.email ?? "",
            phone: portfolio.content_json?.personalInfo?.phone ?? "",
            location: portfolio.content_json?.personalInfo?.location ?? "",
            website: portfolio.content_json?.personalInfo?.website ?? "",
            linkedin: portfolio.content_json?.personalInfo?.linkedin ?? "",
            github: portfolio.content_json?.personalInfo?.github ?? "",
            bio: portfolio.content_json?.personalInfo?.bio ?? "",
            avatar: portfolio.content_json?.personalInfo?.avatar ?? "",
          },
          skills: Array.isArray(portfolio.content_json?.skills)
            ? portfolio.content_json.skills
            : [],
          projects: Array.isArray(portfolio.content_json?.projects)
            ? portfolio.content_json.projects
            : [],
          experience: Array.isArray(portfolio.content_json?.experience)
            ? portfolio.content_json.experience
            : [],
        });

        setCurrentStep("template");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load portfolio");
        }
      } finally {
        setIsLoadingPortfolio(false);
      }
    };

    loadPortfolio();
  }, [builderId]);

  // local autosave only for new/unsaved flow, not edit mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (builderId) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, builderId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (builderId) return;
    localStorage.setItem(STEP_KEY, currentStep);
  }, [currentStep, builderId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (builderId) return;

    if (portfolioId) {
      localStorage.setItem(PORTFOLIO_ID_KEY, portfolioId);
    } else {
      localStorage.removeItem(PORTFOLIO_ID_KEY);
    }
  }, [portfolioId, builderId]);

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

  const saveDraft = async (
    overridePortfolioId?: string | null,
  ): Promise<string> => {
    const res = await fetch("/api/portfolio/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        portfolioId: overridePortfolioId ?? portfolioId,
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

    if (typeof window !== "undefined" && !builderId) {
      localStorage.setItem(PORTFOLIO_ID_KEY, savedId);
    }

    return savedId;
  };

  const publishPortfolio = async () => {
    try {
      setIsPublishing(true);
      setError(null);

      let currentPortfolioId = portfolioId;

      if (!currentPortfolioId) {
        currentPortfolioId = await saveDraft(null);
      }

      let res = await fetch("/api/portfolio/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portfolioId: currentPortfolioId,
          fullName: data.personalInfo.name,
        }),
      });

      let result = await res.json();

      // stale deleted / missing id: clear it, save again, retry publish
      if (!res.ok && res.status === 404) {
        clearStoredPortfolioId();

        currentPortfolioId = await saveDraft(null);

        res = await fetch("/api/portfolio/publish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolioId: currentPortfolioId,
            fullName: data.personalInfo.name,
          }),
        });

        result = await res.json();
      }

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
        isLoadingPortfolio,

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
