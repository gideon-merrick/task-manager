import { Hono } from "hono";
import { logger } from "hono/logger";
import { assigneeRoute } from "./features/assignee/assignee.route";
import { authRoute } from "./features/auth/auth.route";
import { boardRoute } from "./features/board/board.route";
import { projectRoute } from "./features/project/project.route";
import { subtaskRoute } from "./features/subtask/subtask.route";
import { taskRoute } from "./features/task/task.route";

export type AppType = typeof app;
export const app = new Hono()
  .basePath("/api")
  .use(logger())
  .route("/auth", authRoute)
  .route("/task", taskRoute)
  .route("/board", boardRoute)
  .route("/assignee", assigneeRoute)
  .route("/project", projectRoute)
  .route("/subtask", subtaskRoute);
