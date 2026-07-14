"use client";

import { motion } from "motion/react";
import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col gap-4 overflow-hidden border-[1.5px] border-ink/10 bg-[#F5F1EC] p-6 transition-colors hover:border-moss"
    >
      {project.status === "in-progress" && (
        <div
          aria-label="In Progress"
          className="absolute -right-12 top-5 flex w-44 flex-col gap-1 rotate-45 py-1.5 shadow-sm"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #f5c518 0 10px, #141412 10px 20px)",
          }}
        >
          <span className="bg-ink py-1 text-center font-heading text-xs
           font-bold tracking-[0.2em] text-[#f5c518]">
            In Progress
          </span>
        </div>
      )}

      <h3 className="font-heading text-2xl tracking-tight group-hover:text-moss transition-colors">
        {project.title}
      </h3>
      <p className="font-body text-base leading-relaxed text-ink/70">
        {project.description}
      </p>
      {project.tags && project.tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-moss px-2 py-0.5 text-moss-dark"
              style={{ fontFamily: "monospace", fontSize: "11px" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.a>
  );
}
