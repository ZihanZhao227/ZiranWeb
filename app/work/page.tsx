import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";
import projects from "@/data/projects.json";
import type { Project } from "@/types/project";

export const metadata: Metadata = {
  title: "Work / Lab",
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
          Work <span className="text-moss">Showcase</span>
        </h1>

        {inProgress.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-ink/50">
              In Progress
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {inProgress.map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.1}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {done.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-ink/50">
              Completed
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {done.map((project, index) => (
                <FadeIn key={project.id} delay={index * 0.1}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
