import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectKeys } from "../project/keys";
import { addBoard, deleteBoard, reorderBoard, updateBoard } from "./api";

export function useAddBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, name, position }: { projectId: string; name: string; position: number }) =>
      addBoard(projectId, name, position),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.full(variables.projectId) });
    },
  });
}

export function useUpdateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId, name }: { boardId: string; name: string; projectId?: string }) =>
      updateBoard(boardId, name),
    onSuccess: (_, variables) => {
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
        queryClient.invalidateQueries({ queryKey: projectKeys.full(variables.projectId) });
      }
    },
  });
}

export function useReorderBoards() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, orderedBoardIds }: { projectId: string; orderedBoardIds: string[] }) =>
      reorderBoard(projectId, orderedBoardIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.full(variables.projectId) });
    },
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ boardId }: { boardId: string; projectId?: string }) => deleteBoard(boardId),
    onSuccess: (_, variables) => {
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
        queryClient.invalidateQueries({ queryKey: projectKeys.full(variables.projectId) });
      }
    },
  });
}
