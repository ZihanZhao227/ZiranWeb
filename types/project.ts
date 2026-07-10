export type ProjectStatus = "done" | "in-progress";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  githubUrl: string;
  tags: string[];
}
