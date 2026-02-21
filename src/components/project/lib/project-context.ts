import { createContext, useContext } from "react";
import type { useFullProject } from "@/features/project/queries";

interface ProjectContextValue {
  project: ReturnType<typeof useFullProject>;
}

export const ProjectContext = createContext<ProjectContextValue | null>(null);

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within Project.Root");
  }
  return context;
}
