import { db } from "@/lib/db";
import type { ProjectRole } from "../../../../prisma/generated/enums";

export const projectService = {
  createProject: async (userId: string, name: string) => {
    return await db.project.create({
      data: {
        name,
        members: {
          create: {
            userId,
            role: "OWNER",
          },
        },
      },
    });
  },

  getProjects: async (userId: string) => {
    return await db.project.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      select: {
        id: true,
        name: true,
        members: {
          where: { userId },
          select: { role: true },
        },
      },
    });
  },

  getProject: async (projectId: string) => {
    return await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        boards: {
          orderBy: { position: "asc" },
        },
      },
    });
  },

  getProjectFull: async (projectId: string) => {
    return await db.project.findUnique({
      where: { id: projectId },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, image: true },
            },
          },
        },
        boards: {
          orderBy: { position: "asc" },
          include: {
            tasks: {
              where: { parentId: null },
              orderBy: { position: "asc" },
              include: {
                assignees: {
                  include: {
                    user: {
                      select: { id: true, name: true, image: true },
                    },
                  },
                },
                _count: {
                  select: { subtasks: true },
                },
              },
            },
          },
        },
      },
    });
  },

  addMemberToProject: async (projectId: string, userId: string, role: ProjectRole) => {
    return await db.projectMember.create({
      data: {
        projectId,
        userId,
        role,
      },
    });
  },

  updateMemberRoleInProject: async (projectId: string, userId: string, role: ProjectRole) => {
    return await db.projectMember.update({
      where: {
        projectId_userId: { projectId, userId },
      },
      data: { role },
    });
  },

  removeMember: async (projectId: string, userId: string) => {
    return await db.projectMember.delete({
      where: {
        projectId_userId: { projectId, userId },
      },
    });
  },
};
