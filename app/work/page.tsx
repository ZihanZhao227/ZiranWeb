import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects.json";
import type { Project } from "@/types/project";

export const metadata: Metadata = {
  title: "作品 / Lab",
};

const allProjects = projects as Project[];

export default function WorkPage() {
  const done = allProjects.filter((p) => p.status === "done");
  const inProgress = allProjects.filter((p) => p.status === "in-progress");

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-20 px-6 py-16 md:px-0 md:py-24">
        <h1 className="font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
          作品 <span className="text-moss">展示</span>
        </h1>

        {inProgress.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-ink/50">
              进行中
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {inProgress.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {done.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-ink/50">
              已完工
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {done.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
