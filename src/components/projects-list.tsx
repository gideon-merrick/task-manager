import { FolderOpen, Plus } from "lucide-react";
import { useState } from "react";
import { useProjects } from "@/features/project/queries";
import { NewProjectModal } from "./new-project-modal";
import { ProjectRow } from "./project-row";

export function ProjectsList() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: projects, isLoading, isError } = useProjects();

  const renderContent = () => {
    if (isLoading) {
      return (
        <ul className="list rounded-box bg-base-100 shadow-sm">
          {[1, 2, 3].map((i) => (
            <li className="list-row items-center" key={i}>
              <div className="skeleton h-10 w-10 rounded-lg" />
              <div className="list-col-grow space-y-2">
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-3 w-20" />
              </div>
            </li>
          ))}
        </ul>
      );
    }

    if (isError) {
      return (
        <div className="alert alert-error alert-soft" role="alert">
          Failed to load projects. Please try again.
        </div>
      );
    }

    if (!projects?.length) {
      return (
        <div className="py-16 text-center text-base-content/40">
          <FolderOpen className="mx-auto mb-4 h-12 w-12 opacity-30" />
          <p className="text-sm">No projects yet. Create one to get started.</p>
        </div>
      );
    }

    return (
      <ul className="list rounded-box bg-base-100 shadow-sm">
        {projects.map((project) => (
          <ProjectRow key={project.id} projectId={project.id} />
        ))}
      </ul>
    );
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Projects</h1>
          <p className="mt-0.5 text-base-content/50 text-sm">
            {projects?.length ?? 0} project{projects?.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)} type="button">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          New Project
        </button>
      </div>

      {renderContent()}

      <NewProjectModal onClose={() => setModalOpen(false)} open={modalOpen} />
    </div>
  );
}
