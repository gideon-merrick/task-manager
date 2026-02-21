import { useState } from "react";
import { useCreateProject } from "@/features/project/mutations";
import { useProjectsContext } from "../lib/projects-context";

export function ProjectsModal() {
  const { modalOpen, setModalOpen } = useProjectsContext();
  const [name, setName] = useState("");
  const createProject = useCreateProject();

  const handleClose = () => {
    setName("");
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      return;
    }
    await createProject.mutateAsync(name.trim());
    handleClose();
  };

  return (
    <dialog className="modal" open={modalOpen}>
      <div className="modal-box">
        <h3 className="mb-4 font-bold text-lg">New Project</h3>
        <input
          className="input w-full"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="My awesome project"
          value={name}
        />
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={handleClose} type="button">
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={createProject.isPending}
            onClick={handleSubmit}
            type="button"
          >
            {createProject.isPending && <span className="loading loading-spinner" />}
            Create Project
          </button>
        </div>
      </div>
      <form className="modal-backdrop" method="dialog">
        <button onClick={handleClose} type="button">
          close
        </button>
      </form>
    </dialog>
  );
}
