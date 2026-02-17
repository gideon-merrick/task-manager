import { useQuery } from "@tanstack/react-query";
import { getFullProject, getProject, getProjects } from "./api";
import { projectKeys } from "./keys";

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: getProjects,
  });
}

export function useProject(projectId: string, enabled = true) {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => getProject(projectId),
    enabled: enabled && !!projectId,
  });
}

export function useFullProject(projectId: string, enabled = true) {
  return useQuery({
    queryKey: projectKeys.full(projectId),
    queryFn: () => getFullProject(projectId),
    enabled: enabled && !!projectId,
  });
}
