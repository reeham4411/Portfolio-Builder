import { PortfolioData } from "@/types/portfolio";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function MinimalistTemplate({ data }: { data: PortfolioData }) {
  const { personalInfo: p, skills, projects, experience } = data;
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-3xl mx-auto px-8 py-16">
        {/* Header */}
        <header className="mb-16 pb-10 border-b border-gray-100">
          <h1
            className="text-5xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {p.name || "Your Name"}
          </h1>
          <p className="text-xl text-gray-500 mb-6">
            {p.title || "Your Title"}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {p.email && (
              <a
                href={`mailto:${p.email}`}
                className="flex items-center gap-1.5 hover:text-gray-700"
              >
                <Mail size={14} />
                {p.email}
              </a>
            )}
            {p.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {p.location}
              </span>
            )}
           {p.github && (
  <a
    href={p.github}
    className="flex items-center gap-1.5 hover:text-gray-700"
  >
    <FaGithub size={14} />
    GitHub
  </a>
)}

{p.linkedin && (
  <a
    href={p.linkedin}
    className="flex items-center gap-1.5 hover:text-gray-700"
  >
    <FaLinkedin size={14} />
    LinkedIn
  </a>
)}
          </div>
        </header>

        {p.bio && (
          <section className="mb-14">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
              About
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{p.bio}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="px-3 py-1 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
              Projects
            </h2>
            <div className="space-y-8">
              {projects.map((pr) => (
                <div key={pr.id}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-lg">{pr.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      {pr.liveUrl && (
                        <a
                          href={pr.liveUrl}
                          className="text-gray-400 hover:text-gray-700"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {pr.githubUrl && (
                        <a
                          href={pr.githubUrl}
                          className="text-gray-400 hover:text-gray-700"
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    {pr.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pr.techStack.map((t) => (
                      <span key={t} className="text-xs text-gray-400 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((ex) => (
                <div key={ex.id}>
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-semibold">{ex.role}</h3>
                      <p className="text-gray-500">{ex.company}</p>
                    </div>
                    <span className="text-sm text-gray-400 shrink-0">
                      {ex.startDate} — {ex.current ? "Present" : ex.endDate}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {ex.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
