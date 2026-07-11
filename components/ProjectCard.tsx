import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-4 overflow-hidden border border-ink/10 p-6 transition-colors hover:border-moss"
    >
      {project.status === "in-progress" && (
        <div
          aria-label="施工中"
          className="absolute -right-12 top-5 flex w-44 flex-col gap-1 rotate-45 py-1.5 shadow-sm"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #f5c518 0 10px, #141412 10px 20px)",
          }}
        >
          <span className="bg-ink py-1 text-center font-heading text-sm font-bold tracking-[0.2em] text-[#f5c518]">
            施工中
          </span>
        </div>
      )}

      <h3 className="font-heading text-2xl tracking-tight group-hover:text-moss transition-colors">
        {project.title}
      </h3>
      <p className="font-body text-base leading-relaxed text-ink/70">
        {project.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-heading text-[11px] uppercase tracking-widest text-ink/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
