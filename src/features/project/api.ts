import { api } from "@/lib/api";
import type { ProjectRole } from "../../../prisma/generated/enums";

export async function createProject(name: string) {
  const response = await api.project.$post({ json: { name } });
  if (!response.ok) {
    throw new Error("Failed to create new project.");
  }
  return await response.json();
}

export async function getProjects() {
  const response = await api.project.$get();
  if (!response.ok) {
    throw new Error("Failed to get projects.");
  }
  return await response.json();
}

export async function getProject(projectId: string) {
  const response = await api.project[":id"].$get({ param: { id: projectId } });
  if (!response.ok) {
    throw new Error("Failed to get project.");
  }
  return await response.json();
}

export async function getFullProject(projectId: string) {
  const response = await api.project[":id"].full.$get({ param: { id: projectId } });
  if (!response.ok) {
    throw new Error("Failed to get full project.");
  }
  return await response.json();
}

export async function addMember(projectId: string, userId: string, role: ProjectRole) {
  const response = await api.project[":id"].members.$post({
    param: { id: projectId },
    json: { role, userId },
  });
  if (!response.ok) {
    throw new Error("Failed to add member to project.");
  }
  return await response.json();
}

export async function updateMemberRole(projectId: string, userId: string, newRole: ProjectRole) {
  const response = await api.project[":projectId"].members[":userId"].$patch({
    param: { projectId, userId },
    json: { role: newRole },
  });
  if (!response.ok) {
    throw new Error("Failed to update member role in project.");
  }
  return await response.json();
}

export async function removeMember(projectId: string, userId: string) {
  const response = await api.project[":projectId"].members[":userId"].$delete({
    param: { projectId, userId },
  });
  if (!response.ok) {
    throw new Error("Failed to delete member from project.");
  }
  return await response.json();
}
