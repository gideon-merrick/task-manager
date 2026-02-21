import Image from "next/image";
import type { Task } from "../lib/project-types";

interface Props {
  assignees: Task["assignees"];
}

export function ProjectTaskAssignees({ assignees }: Props) {
  if (assignees.length === 0) {
    return null;
  }
  const visible = assignees.slice(0, 3);
  const overflow = assignees.length - visible.length;

  return (
    <div className="avatar-group -space-x-2">
      {visible.map(({ id, user }) =>
        user.image ? (
          <div className="avatar h-5 w-5" key={id}>
            <div className="w-5 rounded-full">
              <Image alt={user.name} fill src={user.image} />
            </div>
          </div>
        ) : (
          <div className="avatar avatar-placeholder h-5 w-5" key={id}>
            <div className="w-5 rounded-full bg-neutral text-[9px] text-neutral-content">
              <span>{user.name[0].toUpperCase()}</span>
            </div>
          </div>
        )
      )}
      {overflow > 0 && (
        <div className="avatar avatar-placeholder h-5 w-5">
          <div className="w-5 rounded-full bg-base-300 text-[9px] text-base-content">
            <span>+{overflow}</span>
          </div>
        </div>
      )}
    </div>
  );
}
