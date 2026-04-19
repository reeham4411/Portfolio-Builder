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
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-(--bg) text-(--text) px-6">
        <p className="text-xl md:text-2xl text-(--text-muted)">
          Portfolio not found.
        </p>

        <Link
          href="/builder"
          className="text-xl md:text-2xl font-semibold text-(--accent) hover:underline"
        >
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
    <div className="relative scale-[1.08] origin-top min-h-screen pb-24">
      {/* Floating CTA Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="/builder"
          className="flex items-center gap-3 px-8 py-5 rounded-full text-lg md:text-xl font-semibold text-black shadow-2xl hover:scale-105 transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #7c6aff, #ff6b9d)",
          }}
        >
          Build yours with folio →
        </Link>
      </div>

      {/* Template */}
      <Template data={portfolioData} />
    </div>
  );
}
