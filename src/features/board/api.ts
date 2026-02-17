import { api } from "@/lib/api";

export async function addBoard(projectId: string, name: string, position: number) {
  const response = await api.board.projects[":projectId"].boards.$post({
    param: { projectId },
    json: { name, position },
  });
  if (!response.ok) {
    throw new Error("Failed to add board to project.");
  }
  return await response.json();
}

export async function updateBoard(boardId: string, name: string) {
  const response = await api.board.boards[":boardId"].$patch({
    param: { boardId },
    json: { name },
  });
  if (!response.ok) {
    throw new Error("Failed to update board.");
  }
  return await response.json();
}

export async function reorderBoard(projectId: string, orderedBoardIds: string[]) {
  const response = await api.board.projects[":projectId"].boards.reorder.$patch({
    param: { projectId },
    json: { orderedBoardIds },
  });
  if (!response.ok) {
    throw new Error("Failed to reorder boards in project.");
  }
  return await response.json();
}

export async function deleteBoard(boardId: string) {
  const response = await api.board.boards[":boardId"].$delete({ param: { boardId } });
  if (!response.ok) {
    throw new Error("Failed to delete board in project.");
  }
  return await response.json();
}
