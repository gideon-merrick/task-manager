import { Hono } from "hono";
import { z } from "zod";
import { assigneeService } from "../features/assignee/service";
import { guard } from "../lib/guard";
import type { AppVariables } from "../lib/types";
import { validate } from "../lib/validate";

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
