import { Hono } from "hono";
import { subtaskService } from "../features/subtask/service";
import { guard } from "../lib/guard";
import type { AppVariables } from "../lib/types";

export const subtaskRoute = new Hono<AppVariables>().get("/tasks/:taskId/subtasks", guard(), async (c) => {
  const taskId = c.req.param("taskId");
  const result = await subtaskService.getSubtasks(taskId);
  return c.json(result);
});
