"use client";

import { useParams } from "next/navigation";
import { Project } from "@/components/project";

export default function ProjectDashboardPage() {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <Project.Root projectId={params.id}>
        <Project.Board />
      </Project.Root>
    </div>
  );
}
