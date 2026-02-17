import { api } from "@/lib/api";

export async function assignUserToTask(taskId: string, userId: string) {
  const response = await api.assignee.tasks[":taskId"].assignees.$post({
    param: { taskId },
    json: { userId },
  });
  if (!response.ok) {
    throw new Error("Failed to assign user to task.");
  }
  return await response.json();
}

export async function unassignUserToTask(taskId: string, userId: string) {
  const response = await api.assignee.tasks[":taskId"].assignees[":userId"].$delete({
    param: { taskId, userId },
  });
  if (!response.ok) {
    throw new Error("Failed to unassign user to task.");
  }
  return await response.json();
}
