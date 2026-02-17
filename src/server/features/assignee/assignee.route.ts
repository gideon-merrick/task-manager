import { Hono } from "hono";
import { z } from "zod";
import { guard } from "@/server/lib/guard";
import type { AppVariables } from "@/server/lib/types";
import { validate } from "@/server/lib/validate";
import { assigneeService } from "./assignee.service";

export const assignUserSchema = z.object({
  userId: z.string(),
});

export const assigneeRoute = new Hono<AppVariables>()
  .post("/tasks/:taskId/assignees", guard(), validate("json", assignUserSchema), async (c) => {
    const taskId = c.req.param("taskId");
    const { userId } = c.req.valid("json");
    const result = await assigneeService.assignUserToTask(taskId, userId);
    return c.json(result);
  })
  .delete("/tasks/:taskId/assignees/:userId", guard(), async (c) => {
    const taskId = c.req.param("taskId");
    const userId = c.req.param("userId");
    const result = await assigneeService.unassignUserFromTask(taskId, userId);
    return c.json(result);
  });
