import { AlertCircle, Plus } from "lucide-react";
import { useProjectContext } from "../lib/project-context";
import { ProjectBoardColumn } from "./project-board-column";

export function ProjectBoard() {
  const { project } = useProjectContext();
  if (project.isLoading) {
    return <BoardSkeleton />;
  }
  if (project.isError) {
    return <BoardError />;
  }
  const boards = [...(project.data?.boards ?? [])].sort((a, b) => a.position - b.position);

  return (
    <div className="flex min-h-full items-start gap-4 overflow-x-auto p-6">
      {boards.map((board) => (
        <ProjectBoardColumn board={board} key={board.id} />
      ))}

      <button
        className="btn btn-ghost btn-sm h-10 min-w-36 shrink-0 gap-2 border border-base-200 border-dashed text-base-content/40 hover:border-base-300 hover:text-base-content"
        type="button"
      >
        <Plus className="h-4 w-4" />
        Add board
      </button>
    </div>
  );
}

function BoardSkeleton() {
  return (
    <div className="flex gap-4 p-6">
      {[1, 2, 3].map((i) => (
        <div className="flex w-72 min-w-72 shrink-0 flex-col gap-3" key={i}>
          <div className="skeleton h-5 w-28 rounded" />
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((j) => (
              <div className="skeleton h-24 w-full rounded-xl" key={j} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BoardError() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="alert alert-error alert-soft w-auto gap-2" role="alert">
        <AlertCircle className="h-5 w-5" />
        Failed to load board. Please try again.
      </div>
    </div>
  );
}
