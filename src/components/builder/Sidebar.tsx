"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import TemplateSelector from "./TemplateSelector";
import PersonalInfoForm from "./sections/PersonalInfoForm";
import SkillsForm from "./sections/SkillsForm";
import ProjectsForm from "./sections/ProjectsForm";
import ExperienceForm from "./sections/ExperienceForm";
import PublishPanel from "./PublishPanel";

export default function Sidebar() {
  const { currentStep } = usePortfolio();
  const panels: Record<string, React.ReactNode> = {
    template: <TemplateSelector />,
    personal: <PersonalInfoForm />,
    skills: <SkillsForm />,
    projects: <ProjectsForm />,
    experience: <ExperienceForm />,
    publish: <PublishPanel />,
  };
  return <div className="h-full overflow-y-auto">{panels[currentStep]}</div>;
}
