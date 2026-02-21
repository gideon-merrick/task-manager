import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFullProject } from "@/features/project/queries";

interface Props {
  projectId: string;
}

export function ProjectsRow({ projectId }: Props) {
  const { data: project, isLoading, isError } = useFullProject(projectId);
  if (isLoading) {
    return <ProjectRowSkeleton />;
  }
  if (isError || !project) {
    return <li className="list-row items-center text-error text-sm">Failed to load project details.</li>;
  }
  const visible = project.members.slice(0, 4);
  const overflow = project.members.length - 4;

  return (
    <li className="list-row items-center">
      <div className="avatar avatar-placeholder">
        <div className="w-12 rounded-full bg-neutral text-neutral-content">
          <span className="font-bold text-xl">{project.name[0].toUpperCase()}</span>
        </div>
      </div>
      <div className="list-col-grow">
        <div className="font-medium">{project.name}</div>
        <div className="text-base-content/50 text-xs">#{project.id.slice(0, 8)}</div>
      </div>
      <div className="avatar-group -space-x-2">
        {visible.map((member) => (
          <div className="avatar" key={member.id}>
            <div className="w-8 rounded-full">
              {member.user.image ? (
                <Image alt={member.user.name} height={32} src={member.user.image} width={32} />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral text-neutral-content">
                  <span className="text-[10px]">{member.user.name[0].toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {overflow > 0 && (
          <div className="avatar avatar-placeholder">
            <div className="w-8 rounded-full bg-base-300 text-base-content">
              <span className="text-[10px]">+{overflow}</span>
            </div>
          </div>
        )}
      </div>
      <Link className="btn btn-secondary" href={`project/${project.id}`}>
        Open <ArrowRight size={16} />
      </Link>
    </li>
  );
}

function ProjectRowSkeleton() {
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
