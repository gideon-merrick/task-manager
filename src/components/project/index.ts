import { ProjectBoard } from "./ui/project-board";
import { ProjectBoardColumn } from "./ui/project-board-column";
import { ProjectRoot } from "./ui/project-root";
import { ProjectTaskAssignees } from "./ui/project-task-assignees";
import { ProjectTaskCard } from "./ui/project-task-card";

export * from "./lib/project-types";

export const Project = {
  Board: ProjectBoard,
  BoardColumn: ProjectBoardColumn,
  Root: ProjectRoot,
  TaskAssignees: ProjectTaskAssignees,
  TaskCard: ProjectTaskCard,
};
