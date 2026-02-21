import { createContext, useContext } from "react";
import type { useProjects } from "@/features/project/queries";

interface ProjectsContextValue {
  modalOpen: boolean;
  projects: ReturnType<typeof useProjects>;
  setModalOpen: (open: boolean) => void;
}

export const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function useProjectsContext() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjectsContext must be used within Projects.Root");
  }
  return context;
}
