import { notFound } from "next/navigation";
import { getPortfolioBySlug } from "@/lib/portfolio";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import BoldTemplate from "@/components/templates/Boldtemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import type { PortfolioData } from "@/types/portfolio";
import Link from "next/link";
import { Share2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);
  if (!portfolio) return { title: "Portfolio not found" };

  const name = portfolio.content_json?.personalInfo?.name ?? "Portfolio";
  const title = portfolio.content_json?.personalInfo?.title ?? "";

  return {
    title: `${name} — ${title}`,
    description: portfolio.content_json?.personalInfo?.bio ?? "",
  };
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) notFound();

  const data: PortfolioData = {
    templateId: portfolio.template_id,
    personalInfo: portfolio.content_json.personalInfo,
    skills: portfolio.content_json.skills ?? [],
    projects: portfolio.content_json.projects ?? [],
    experience: portfolio.content_json.experience ?? [],
  };

  const Template =
    data.templateId === "bold"
      ? BoldTemplate
      : data.templateId === "creative"
        ? CreativeTemplate
        : MinimalistTemplate;

  return (
    <div className="relative">
      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/signup"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black shadow-lg hover:scale-105 transition-all"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), var(--accent-2))",
          }}
        >
          <Share2 size={14} />
          Build yours with folio
        </Link>
      </div>

      <Template data={data} />
    </div>
  );
}
