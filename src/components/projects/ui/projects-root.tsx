import { type ReactNode, useState } from "react";
import { useProjects } from "@/features/project/queries";
import { ProjectsContext } from "../lib/projects-context";

export function ProjectsRoot({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const projects = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, modalOpen, setModalOpen }}>
      {children}
    </ProjectsContext.Provider>
  );
}
