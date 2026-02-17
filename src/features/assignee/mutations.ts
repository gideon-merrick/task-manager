import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectKeys } from "../project/keys";
import { assignUserToTask, unassignUserToTask } from "./api";

export function useAssignUserToTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) => assignUserToTask(taskId, userId),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

export function useUnassignUserFromTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) => {
      return unassignUserToTask(taskId, userId);
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}
