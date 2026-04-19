export type TemplateId = "minimalist" | "bold" | "creative";

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  bio: string;
  avatar: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface PortfolioData {
  templateId: TemplateId;
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
}

export type BuilderStep =
  | "template"
  | "personal"
  | "skills"
  | "projects"
  | "experience"
  | "publish";

// Database row types 

export interface PortfolioRow {
  id: string;
  user_id: string;
  title: string;
  slug: string | null;
  template_id: TemplateId;
  content_json: {
    personalInfo: PersonalInfo;
    skills: Skill[];
    projects: Project[];
    experience: Experience[];
  };
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}