import { Hono } from "hono";
import { z } from "zod";
import { ProjectRole } from "../../../prisma/generated/enums";
import { projectService } from "../features/project/project.service";
import { guard } from "../lib/guard";
import type { AppVariables } from "../lib/types";
import { validate } from "../lib/validate";

export const createSchema = z.object({
  name: z.string(),
});

export const addMemberSchema = z.object({
  userId: z.string(),
  role: z.enum(ProjectRole),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(ProjectRole),
});

export const projectRoute = new Hono<AppVariables>()
  .post("/", guard(), validate("json", createSchema), async (c) => {
    const currentUser = c.get("user");
    const { name } = c.req.valid("json");
    const result = await projectService.createProject(currentUser.id, name);
    return c.json(result);
  })
  .get("/", guard(), async (c) => {
    const currentUser = c.get("user");
    const result = await projectService.getProjects(currentUser.id);
    return c.json(result);
  })
  .get("/:id", guard(), async (c) => {
    const id = c.req.param("id");
    const result = await projectService.getProject(id);
    return c.json(result);
  })
  .get("/:id/full", guard(), async (c) => {
    const id = c.req.param("id");
    const result = await projectService.getProjectFull(id);
    return c.json(result);
  })
  .post("/:id/members", guard(), validate("json", addMemberSchema), async (c) => {
    const projectId = c.req.param("id");
    const { userId, role } = c.req.valid("json");
    const result = await projectService.addMemberToProject(projectId, userId, role);
    return c.json(result);
  })
  .patch("/:projectId/members/:userId", guard(), validate("json", updateMemberRoleSchema), async (c) => {
    const projectId = c.req.param("projectId");
    const userId = c.req.param("userId");
    const { role } = c.req.valid("json");
    const result = await projectService.updateMemberRoleInProject(projectId, userId, role);
    return c.json(result);
  })
  .delete("/:projectId/members/:userId", guard(), async (c) => {
    const projectId = c.req.param("projectId");
    const userId = c.req.param("userId");
    const result = await projectService.removeMember(projectId, userId);
    return c.json(result);
  });
