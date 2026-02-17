import { db } from "@/lib/db";

export const assigneeService = {
  assignUserToTask: async (taskId: string, userId: string) => {
    return await db.taskAssignee.create({
      data: {
        taskId,
        userId,
      },
    });
  },

  unassignUserFromTask: async (taskId: string, userId: string) => {
    return await db.taskAssignee.delete({
      where: {
        taskId_userId: { taskId, userId },
      },
    });
  },
};
