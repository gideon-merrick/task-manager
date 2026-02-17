import { Hono } from "hono";
import { z } from "zod";
import { guard } from "@/server/lib/guard";
import type { AppVariables } from "@/server/lib/types";
import { validate } from "@/server/lib/validate";
import { taskService } from "./task.service";

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  position: z.number(),
  parentId: z.string().nullable().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  deadline: z.date().nullable().optional(),
});

export const moveTaskSchema = z.object({
  boardId: z.string(),
  position: z.number(),
  parentId: z.string().nullable().optional(),
});

export const taskRoute = new Hono<AppVariables>()
  .post("/boards/:boardId/tasks", guard(), validate("json", createTaskSchema), async (c) => {
    const boardId = c.req.param("boardId");
    const { title, description = null, position, parentId = null } = c.req.valid("json");
    const result = await taskService.createTask(boardId, title, description, position, parentId);
    return c.json(result);
  })
  .get("/tasks/:taskId", guard(), async (c) => {
    const taskId = c.req.param("taskId");
    const result = await taskService.getTask(taskId);
    return c.json(result);
  })
  .patch("/tasks/:taskId", guard(), validate("json", updateTaskSchema), async (c) => {
    const taskId = c.req.param("taskId");
    const data = c.req.valid("json");
    const result = await taskService.updateTask(taskId, {
      ...data,
      deadline: data.deadline ? new Date(data.deadline) : data.deadline,
    });
    return c.json(result);
  })
  .delete("/tasks/:taskId", guard(), async (c) => {
    const taskId = c.req.param("taskId");
    const result = await taskService.deleteTask(taskId);
    return c.json(result);
  })
  .patch("/tasks/:taskId/move", guard(), validate("json", moveTaskSchema), async (c) => {
    const taskId = c.req.param("taskId");
    const { boardId, position, parentId = null } = c.req.valid("json");
    const result = await taskService.moveTask(taskId, boardId, position, parentId);
    return c.json(result);
  });
