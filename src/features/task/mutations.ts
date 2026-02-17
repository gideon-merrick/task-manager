import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectKeys } from "../project/keys";
import { createTask, deleteTask, moveTask, updateTask } from "./api";
import { taskKeys } from "./keys";

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      boardId,
      title,
      position,
      description,
      parentId,
    }: {
      boardId: string;
      title: string;
      position: number;
      description?: string;
      parentId?: string;
      projectId?: string;
    }) => createTask(boardId, title, position, description, parentId),
    onSuccess: (_, variables) => {
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
        queryClient.invalidateQueries({ queryKey: projectKeys.full(variables.projectId) });
      }
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      title,
      description,
      deadline,
    }: {
      taskId: string;
      title?: string;
      description?: string;
      deadline?: Date;
      projectId?: string;
    }) => updateTask(taskId, title, description, deadline),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.taskId) });
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
        queryClient.invalidateQueries({ queryKey: projectKeys.full(variables.projectId) });
      }
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId }: { taskId: string; projectId?: string }) => deleteTask(taskId),
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: taskKeys.detail(variables.taskId) });
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
        queryClient.invalidateQueries({ queryKey: projectKeys.full(variables.projectId) });
      }
    },
  });
}

export function useMoveTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      taskId,
      boardId,
      position,
      parentId,
    }: {
      taskId: string;
      boardId: string;
      position: number;
      parentId?: string;
      projectId?: string;
    }) => moveTask(taskId, boardId, position, parentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.taskId) });
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
        queryClient.invalidateQueries({ queryKey: projectKeys.full(variables.projectId) });
      }
    },
  });
}
