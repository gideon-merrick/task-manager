import { db } from "@/lib/db";

export const boardService = {
  createBoard: async (projectId: string, name: string, position: number) => {
    return await db.board.create({
      data: {
        projectId,
        name,
        position,
      },
    });
  },

  updateBoard: async (boardId: string, name: string) => {
    return await db.board.update({
      where: { id: boardId },
      data: { name },
    });
  },

  reorderBoards: async (orderedBoardIds: string[]) => {
    return await db.$transaction(
      orderedBoardIds.map((id, index) =>
        db.board.update({
          where: { id },
          data: { position: index },
        })
      )
    );
  },

  deleteBoard: async (boardId: string) => {
    return await db.board.delete({
      where: { id: boardId },
    });
  },
};
