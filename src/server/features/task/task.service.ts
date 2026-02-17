import { db } from "@/lib/db";

export const taskService = {
  createTask: async (
    boardId: string,
    title: string,
    description: string | null,
    position: number,
    parentId: string | null
  ) => {
    return await db.task.create({
      data: {
        boardId,
        title,
        description,
        position,
        parentId,
      },
    });
  },

  getTask: async (taskId: string) => {
    return await db.task.findUnique({
      where: { id: taskId },
      include: {
        assignees: {
          include: {
            user: {
              select: { id: true, name: true, image: true },
            },
          },
        },
        subtasks: {
          orderBy: { position: "asc" },
        },
      },
    });
  },

  updateTask: async (
    taskId: string,
    data: {
      title?: string;
      description?: string | null;
      deadline?: Date | null;
    }
  ) => {
    return await db.task.update({
      where: { id: taskId },
      data,
    });
  },

  deleteTask: async (taskId: string) => {
    return await db.task.delete({
      where: { id: taskId },
    });
  },

  moveTask: async (taskId: string, boardId: string, position: number, parentId: string | null) => {
    return await db.task.update({
      where: { id: taskId },
      data: {
        boardId,
        position,
        parentId,
      },
    });
  },
};
