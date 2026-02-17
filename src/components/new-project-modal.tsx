import { useState } from "react";
import { useCreateProject } from "@/features/project/mutations";

interface Props {
  onClose: () => void | Promise<void>;
  open: boolean;
}

export function NewProjectModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const createProject = useCreateProject();

  const handleSubmit = async () => {
    if (!name.trim()) {
      return;
    }
    await createProject.mutateAsync(name.trim());
    setName("");
    onClose();
  };

  return (
    <dialog className="modal" id="new_project_modal" open={open}>
      <div className="modal-box">
        <h3 className="mb-4 font-bold text-lg">New Project</h3>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Project Name</legend>
          <input
            autoFocus
            className="input w-full"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="My awesome project"
            type="text"
            value={name}
          />
        </fieldset>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={!name.trim() || createProject.isPending}
            onClick={handleSubmit}
            type="button"
          >
            {createProject.isPending ? <span className="loading loading-spinner loading-sm" /> : null}
            Create Project
          </button>
        </div>
      </div>
      <form className="modal-backdrop" method="dialog">
        <button onClick={onClose} type="button">
          close
        </button>
      </form>
    </dialog>
  );
}
