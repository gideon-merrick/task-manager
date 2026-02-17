import Image from "next/image";
import { useFullProject } from "@/features/project/queries";

interface Props {
  projectId: string;
}

export function ProjectRow({ projectId }: Props) {
  const { data: project, isLoading, isError } = useFullProject(projectId);
  if (isLoading) {
    return (
      <div>
        <li className="list-row items-center">
          <div className="skeleton h-10 w-10 rounded-lg" />
          <div className="list-col-grow space-y-2">
            <div className="skeleton h-4 w-32" />
            <div className="skeleton h-3 w-20" />
          </div>
        </li>
      </div>
    );
  }
  if (isError || !project) {
    return (
      <div>
        <li className="list-row items-center text-error text-sm">Failed to load project.</li>
      </div>
    );
  }

  const visible = project.members.slice(0, 4);
  const overflow = project.members.length - 4;

  return (
    <li className="list-row items-center">
      <div className="avatar avatar-placeholder">
        <div className="w-10 rounded-lg bg-primary text-primary-content">
          <span className="font-bold text-sm">{project.name.slice(0, 2).toUpperCase()}</span>
        </div>
      </div>
      <div className="list-col-grow">
        <div className="font-medium">{project.name}</div>
        <div className="text-base-content/50 text-xs">#{project.id.slice(0, 8)}</div>
      </div>
      <div className="avatar-group -space-x-2">
        {visible.map((member) => (
          <div className="avatar avatar-placeholder" key={member.id}>
            {member.user.image ? (
              <Image alt={member.user.name} src={member.user.image} />
            ) : (
              <span className="text-xs">{member.user.name.slice(0, 2).toUpperCase()}</span>
            )}
          </div>
        ))}
        {overflow > 0 && (
          <div className="avatar avatar-placeholder">
            <div className="w-7 rounded-full bg-base-300 text-base-content ring-2 ring-base-100">
              <span className="text-xs">+{overflow}</span>
            </div>
          </div>
        )}
      </div>
      <button className="btn btn-ghost btn-sm" type="button">
        Open →
      </button>
    </li>
  );
}
