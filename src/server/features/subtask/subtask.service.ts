import { db } from "@/lib/db";

export const subtaskService = {
  getSubtasks: async (taskId: string) => {
    return await db.task.findMany({
      where: { parentId: taskId },
      orderBy: { position: "asc" },
      select: {
        id: true,
        title: true,
        position: true,
        _count: {
          select: { subtasks: true },
        },
      },
    });
  },
};
