import { Hono } from "hono";
import { z } from "zod";
import { boardService } from "../features/board/service";
import { guard } from "../lib/guard";
import type { AppVariables } from "../lib/types";
import { validate } from "../lib/validate";

export const createBoardSchema = z.object({
  name: z.string(),
  position: z.number(),
});

export const updateBoardSchema = z.object({
  name: z.string(),
});

export const reorderBoardsSchema = z.object({
  orderedBoardIds: z.array(z.string()),
});

export const boardRoute = new Hono<AppVariables>()
  .post("/projects/:projectId/boards", guard(), validate("json", createBoardSchema), async (c) => {
    const projectId = c.req.param("projectId");
    const { name, position } = c.req.valid("json");
    const result = await boardService.createBoard(projectId, name, position);
    return c.json(result);
  })
  .patch("/boards/:boardId", guard(), validate("json", updateBoardSchema), async (c) => {
    const boardId = c.req.param("boardId");
    const { name } = c.req.valid("json");
    const result = await boardService.updateBoard(boardId, name);
    return c.json(result);
  })
  .patch("/projects/:projectId/boards/reorder", guard(), validate("json", reorderBoardsSchema), async (c) => {
    const { orderedBoardIds } = c.req.valid("json");
    const result = await boardService.reorderBoards(orderedBoardIds);
    return c.json(result);
  })
  .delete("/boards/:boardId", guard(), async (c) => {
    const boardId = c.req.param("boardId");
    const result = await boardService.deleteBoard(boardId);
    return c.json(result);
  });
