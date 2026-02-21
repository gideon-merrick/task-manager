import { Plus } from "lucide-react";
import { useProjectsContext } from "../lib/projects-context";

export function ProjectsHeader() {
  const { projects, setModalOpen } = useProjectsContext();
  const count = projects.data?.length ?? 0;

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="font-bold text-2xl">Projects</h1>
        <p className="mt-0.5 text-base-content/50 text-sm">
          {count} project{count !== 1 ? "s" : ""}
        </p>
      </div>
      <button className="btn btn-primary" onClick={() => setModalOpen(true)} type="button">
        <Plus className="h-4 w-4" strokeWidth={2.5} />
        New Project
      </button>
    </div>
  );
}
