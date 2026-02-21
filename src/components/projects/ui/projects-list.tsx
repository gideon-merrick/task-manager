import { FolderOpen } from "lucide-react";
import { useProjectsContext } from "../lib/projects-context";
import { ProjectsRow } from "./projects-row";

export function ProjectsList() {
  const { projects } = useProjectsContext();

  if (projects.isLoading) {
    return (
      <ul className="list rounded-box bg-base-100 shadow-sm">
        {[1, 2, 3].map((i) => (
          <ProjectSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (projects.isError) {
    return <div className="alert alert-error">Failed to load projects.</div>;
  }

  if (!projects.data?.length) {
    return (
      <div className="py-16 text-center text-base-content/40">
        <FolderOpen className="mx-auto mb-4 h-12 w-12 opacity-30" />
        <p className="text-sm">No projects yet.</p>
      </div>
    );
  }

  return (
    <ul className="list rounded-box bg-base-100 shadow-sm">
      {projects.data.map((p) => (
        <ProjectsRow key={p.id} projectId={p.id} />
      ))}
    </ul>
  );
}

function ProjectSkeleton() {
  return (
    <li className="list-row items-center">
      <div className="skeleton h-10 w-10 rounded-lg" />
      <div className="list-col-grow space-y-2">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton h-3 w-20" />
      </div>
    </li>
  );
}
