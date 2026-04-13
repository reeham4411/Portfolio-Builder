"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PortfolioData } from "@/types/portfolio";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import BoldTemplate from "@/components/templates/Boldtemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import Link from "next/link";

const demoData: PortfolioData = {
  templateId: "bold",
  personalInfo: {
    name: "Alex Rivera",
    title: "Senior Full-Stack Engineer",
    email: "alex@example.com",
    phone: "",
    location: "San Francisco, CA",
    website: "alexrivera.dev",
    linkedin: "linkedin.com/in/alexrivera",
    github: "github.com/alexrivera",
    bio: "I build scalable web applications with a focus on developer experience and performance. 5 years crafting products used by millions.",
    avatar: "",
  },
  skills: [
    { id: "1", name: "React", level: 5, category: "Frontend" },
    { id: "2", name: "TypeScript", level: 5, category: "Frontend" },
    { id: "3", name: "Node.js", level: 4, category: "Backend" },
    { id: "4", name: "PostgreSQL", level: 4, category: "Backend" },
    { id: "5", name: "Docker", level: 3, category: "DevOps" },
    { id: "6", name: "Figma", level: 3, category: "Design" },
  ],
  projects: [
    {
      id: "1",
      title: "Realtime Dashboard",
      description:
        "A live analytics dashboard handling 10k+ concurrent users with WebSocket streaming and efficient data visualization.",
      techStack: ["React", "Node.js", "Redis", "D3.js"],
      liveUrl: "#",
      githubUrl: "#",
      imageUrl: "",
    },
    {
      id: "2",
      title: "E-Commerce Platform",
      description:
        "Full-featured e-commerce solution with inventory management, payment processing, and a custom CMS.",
      techStack: ["Next.js", "Stripe", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      imageUrl: "",
    },
  ],
  experience: [
    {
      id: "1",
      company: "Stripe",
      role: "Senior Software Engineer",
      startDate: "2022-03",
      endDate: "",
      current: true,
      description:
        "Leading the frontend architecture for Stripe's billing dashboard, working cross-functionally with design and backend teams.",
    },
    {
      id: "2",
      company: "Vercel",
      role: "Software Engineer",
      startDate: "2020-01",
      endDate: "2022-02",
      current: false,
      description:
        "Contributed to Next.js core and built internal tooling to improve deployment pipeline performance by 40%.",
    },
  ],
};

export default function PreviewPage() {
  const params = useParams();

  const [portfolioData] = useState<PortfolioData | null>(() => {
    if (params.id === "demo") {
      return demoData;
    }
    const stored = localStorage.getItem(`portfolio_${params.id}`);
    return stored ? JSON.parse(stored) : null;
  });

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-(--bg) text-(--text)">
        <p className="text-(--text-muted)">Portfolio not found.</p>
        <Link href="/builder" className="text-(--accent) hover:underline">
          Build yours →
        </Link>
      </div>
    );
  }

  const Template =
    portfolioData.templateId === "bold"
      ? BoldTemplate
      : portfolioData.templateId === "creative"
        ? CreativeTemplate
        : MinimalistTemplate;

  return (
    <div className="relative">
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/builder"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-black shadow-lg hover:scale-105 transition-all"
          style={{ background: "linear-gradient(135deg, #7c6aff, #ff6b9d)" }}
        >
          Build yours with folio →
        </Link>
      </div>
      <Template data={portfolioData} />
    </div>
  );
}
