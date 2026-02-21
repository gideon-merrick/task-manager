import { CheckSquare, Clock } from "lucide-react";
import { getDeadlineInfo } from "../lib/helpers";
import type { Task } from "../lib/project-types";
import { ProjectTaskAssignees } from "./project-task-assignees";

interface Props {
  task: Task;
}

export function ProjectTaskCard({ task }: Props) {
  const deadline = getDeadlineInfo(task.deadline);

  return (
    <div className="card card-sm group cursor-pointer border border-base-200 bg-base-100 shadow-sm transition-all duration-200 hover:border-base-300 hover:shadow-md">
      <div className="card-body gap-3">
        <p className="font-medium text-base-content text-sm leading-snug transition-colors group-hover:text-primary">
          {task.title}
        </p>

        {task.description && (
          <p className="line-clamp-2 text-base-content/50 text-xs leading-relaxed">{task.description}</p>
        )}

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {task._count.subtasks > 0 && (
              <span className="flex items-center gap-1 text-base-content/40 text-xs">
                <CheckSquare className="h-3 w-3" />
                {task._count.subtasks}
              </span>
            )}
            {deadline && (
              <span className={`badge badge-xs ${deadline.cls} flex items-center gap-1`}>
                <Clock className="h-2.5 w-2.5" />
                {deadline.label}
              </span>
            )}
          </div>
          <ProjectTaskAssignees assignees={task.assignees} />
        </div>
      </div>
    </div>
  );
}
