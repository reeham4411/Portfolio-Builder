import { PortfolioData } from "@/types/portfolio";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

export default function BoldTemplate({ data }: { data: PortfolioData }) {
  const { personalInfo: p, skills, projects, experience } = data;
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "#0a0a0a", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #ff6b9d22, #7c6aff22)" }}
      >
        <div className="max-w-4xl mx-auto px-8 py-24">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-6"
            style={{
              background: "#ff6b9d20",
              color: "#ff6b9d",
              border: "1px solid #ff6b9d40",
            }}
          >
            {p.title || "Your Title"}
          </div>
          <h1 className="text-7xl font-black tracking-tight mb-6 leading-none">
            {p.name || "Your Name"}
          </h1>
          <p className="text-gray-400 text-xl max-w-xl leading-relaxed mb-8">
            {p.bio}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {p.email && (
              <a
                href={`mailto:${p.email}`}
                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
              >
                <Mail size={14} />
                {p.email}
              </a>
            )}
            {p.location && (
              <span className="flex items-center gap-2 text-gray-500">
                <MapPin size={14} />
                {p.location}
              </span>
            )}
            {p.github && (
              <a
                href={p.github}
                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
              >
                <Github size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 space-y-20">
        {skills.length > 0 && (
          <section>
            <h2 className="text-4xl font-black mb-8">
              Skills<span style={{ color: "#ff6b9d" }}>.</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <div
                  key={s.id}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ border: "1px solid #333", background: "#111" }}
                >
                  {s.name}
                  <span className="ml-2 text-xs" style={{ color: "#ff6b9d" }}>
                    {"●".repeat(s.level)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-4xl font-black mb-8">
              Projects<span style={{ color: "#ff6b9d" }}>.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((pr) => (
                <div
                  key={pr.id}
                  className="p-6 rounded-2xl group hover:border-[#ff6b9d] transition-all"
                  style={{ background: "#111", border: "1px solid #222" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-xl">{pr.title}</h3>
                    {pr.liveUrl && (
                      <a
                        href={pr.liveUrl}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight size={18} style={{ color: "#ff6b9d" }} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {pr.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pr.techStack.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: "#222", color: "#888" }}
                      >
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
            <h2 className="text-4xl font-black mb-8">
              Experience<span style={{ color: "#ff6b9d" }}>.</span>
            </h2>
            {experience.map((ex) => (
              <div key={ex.id} className="flex gap-8 mb-10 group">
                <div className="shrink-0 text-right text-sm text-gray-600 pt-1 w-28">
                  <div>{ex.startDate}</div>
                  <div>—</div>
                  <div>{ex.current ? "Now" : ex.endDate}</div>
                </div>
                <div
                  className="flex-1 pb-10"
                  style={{ borderLeft: "1px solid #222", paddingLeft: "2rem" }}
                >
                  <h3 className="font-bold text-lg">{ex.role}</h3>
                  <p style={{ color: "#ff6b9d" }} className="text-sm mb-2">
                    {ex.company}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {ex.description}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
