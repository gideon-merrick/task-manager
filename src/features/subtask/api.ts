import { api } from "@/lib/api";

export async function getSubtasks(taskId: string) {
  const response = await api.subtask.tasks[":taskId"].subtasks.$get({ param: { taskId } });
  if (!response.ok) {
    throw new Error("Failed to get subtasks for task.");
  }
  return await response.json();
}
