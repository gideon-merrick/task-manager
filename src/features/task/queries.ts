import { useQuery } from "@tanstack/react-query";
import { getTask } from "./api";
import { taskKeys } from "./keys";

export function useTask(taskId: string, enabled = true) {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => getTask(taskId),
    enabled: enabled && !!taskId,
  });
}
