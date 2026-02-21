import type { ReactNode } from "react";
import { useFullProject } from "@/features/project/queries";
import { ProjectContext } from "../lib/project-context";

interface Props {
  children: ReactNode;
  projectId: string;
}

export function ProjectRoot({ projectId, children }: Props) {
  const project = useFullProject(projectId);

  return <ProjectContext.Provider value={{ project }}>{children}</ProjectContext.Provider>;
}
