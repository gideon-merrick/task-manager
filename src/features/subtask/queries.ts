import { useQuery } from "@tanstack/react-query";
import { getSubtasks } from "./api";
import { subtaskKeys } from "./keys";

export function useSubtasks(taskId: string, enabled = true) {
  return useQuery({
    queryKey: subtaskKeys.list(taskId),
    queryFn: () => getSubtasks(taskId),
    enabled: enabled && !!taskId,
  });
}
