import { LayoutGrid, Plus } from "lucide-react";
import type { Board } from "../lib/project-types";
import { ProjectTaskCard } from "./project-task-card";

interface Props {
  board: Board;
}

export function ProjectBoardColumn({ board }: Props) {
  const sorted = [...board.tasks].sort((a, b) => a.position - b.position);

  return (
    <div className="flex w-72 min-w-72 shrink-0 flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base-content text-sm">{board.name}</span>
          <span className="badge badge-sm badge-ghost text-base-content/50">{board.tasks.length}</span>
        </div>
        <button
          className="btn btn-ghost btn-xs btn-square text-base-content/40 hover:text-base-content"
          type="button"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {sorted.length === 0 ? (
          <EmptyColumn />
        ) : (
          sorted.map((task) => <ProjectTaskCard key={task.id} task={task} />)
        )}
      </div>
      <button
        className="btn btn-ghost btn-sm w-full justify-start gap-2 text-base-content/40 hover:text-base-content"
        type="button"
      >
        <Plus className="h-4 w-4" />
        Add task
      </button>
    </div>
  );
}

function EmptyColumn() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-base-200 border-dashed py-10 text-base-content/25 text-xs">
      <LayoutGrid className="h-5 w-5" />
      No tasks yet
    </div>
  );
}
