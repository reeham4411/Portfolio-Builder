import { PortfolioData } from "@/types/portfolio";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function CreativeTemplate({ data }: { data: PortfolioData }) {
  const { personalInfo: p, skills, projects, experience } = data;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#f7f4ef",
        fontFamily: "'Playfair Display', serif",
        color: "#1a1a1a",
      }}
    >
      <div
        className="relative"
        style={{ background: "#1a1a1a", color: "#f7f4ef" }}
      >
        <div className="max-w-5xl mx-auto px-8 py-20 grid grid-cols-5 gap-8 items-end">
          <div className="col-span-3">
            <div
              className="text-xs font-sans tracking-[0.3em] uppercase mb-4"
              style={{ color: "#f0c040" }}
            >
              {p.title || "Your Title"}
            </div>

            <h1 className="text-8xl font-black leading-none">
              {(p.name || "Your Name").split(" ")[0]}
            </h1>

            <h1
              className="text-8xl font-black leading-none text-right -mr-4"
              style={{ color: "#f0c040" }}
            >
              {(p.name || "Your Name").split(" ").slice(1).join(" ")}
            </h1>
          </div>

          <div className="col-span-2">
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: "#999" }}
            >
              {p.bio}
            </p>

            <div className="mt-4 text-xs font-sans" style={{ color: "#555" }}>
              {p.location} · {p.email}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16">
        {skills.length > 0 && (
          <section className="mb-20">
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="text-5xl font-black">Skills</h2>
              <div className="flex-1 h-px" style={{ background: "#ddd" }} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((s) => (
                <div
                  key={s.id}
                  className="p-4 rounded-xl font-sans"
                  style={{ background: "#1a1a1a", color: "#f7f4ef" }}
                >
                  <div className="text-sm font-medium">{s.name}</div>

                  <div
                    className="mt-2 h-1 rounded-full"
                    style={{ background: "#333" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(s.level / 5) * 100}%`,
                        background: "#f0c040",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-20">
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="text-5xl font-black">Projects</h2>
              <div className="flex-1 h-px" style={{ background: "#ddd" }} />
            </div>

            <div className="space-y-6">
              {projects.map((pr, i) => (
                <div
                  key={pr.id}
                  className={`p-8 rounded-2xl flex gap-8 ${
                    i % 2 === 1 ? "flex-row-reverse" : ""
                  }`}
                  style={{
                    background: i % 2 === 0 ? "#1a1a1a" : "#eee8dc",
                    color: i % 2 === 0 ? "#f7f4ef" : "#1a1a1a",
                  }}
                >
                  <div className="flex-1">
                    <h3 className="text-3xl font-black mb-3">{pr.title}</h3>

                    <p className="font-sans text-sm leading-relaxed opacity-70 mb-4">
                      {pr.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {pr.techStack.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-3 py-1 rounded-full"
                          style={{
                            background: "#f0c04020",
                            border: "1px solid #f0c04040",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 justify-start pt-1">
                    {pr.liveUrl && (
                      <a
                        href={pr.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-sans opacity-60 hover:opacity-100"
                      >
                        <ExternalLink size={13} /> Live
                      </a>
                    )}

                    {pr.githubUrl && (
                      <a
                        href={pr.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-sans opacity-60 hover:opacity-100"
                      >
                        <FaGithub size={13} /> Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="text-5xl font-black">Experience</h2>
              <div className="flex-1 h-px" style={{ background: "#ddd" }} />
            </div>

            {experience.map((ex) => (
              <div key={ex.id} className="mb-8 grid grid-cols-4 gap-8">
                <div className="font-sans text-sm" style={{ color: "#888" }}>
                  <div>{ex.startDate}</div>
                  <div>{ex.current ? "Present" : ex.endDate}</div>
                </div>

                <div className="col-span-3">
                  <h3 className="text-2xl font-black">{ex.role}</h3>

                  <div
                    className="font-sans text-sm mb-2"
                    style={{ color: "#f0c040" }}
                  >
                    {ex.company}
                  </div>

                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "#555" }}
                  >
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
