import { api } from "@/lib/api";

export async function createTask(
  boardId: string,
  title: string,
  position: number,
  description?: string,
  parentId?: string
) {
  const response = await api.task.boards[":boardId"].tasks.$post({
    param: { boardId },
    json: { position, title, description, parentId },
  });
  if (!response.ok) {
    throw new Error("Unable to create task in board.");
  }
  return await response.json();
}

export async function getTask(taskId: string) {
  const response = await api.task.tasks[":taskId"].$get({ param: { taskId } });
  if (!response.ok) {
    throw new Error("Failed to get task.");
  }
  return await response.json();
}

export async function updateTask(taskId: string, title?: string, description?: string, deadline?: Date) {
  const response = await api.task.tasks[":taskId"].$patch({
    param: { taskId },
    json: { title, description, deadline },
  });
  if (!response.ok) {
    throw new Error("Failed to update task.");
  }
  return await response.json();
}

export async function deleteTask(taskId: string) {
  const response = await api.task.tasks[":taskId"].$delete({ param: { taskId } });
  if (!response.ok) {
    throw new Error("Failed to delete task.");
  }
  return await response.json();
}

export async function moveTask(taskId: string, boardId: string, position: number, parentId?: string) {
  const response = await api.task.tasks[":taskId"].move.$patch({
    param: { taskId },
    json: { boardId, position, parentId },
  });
  if (!response.ok) {
    throw new Error("Failed to move task.");
  }
  return await response.json();
}
