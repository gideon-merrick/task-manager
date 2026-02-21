"use client";

import { Projects } from "@/components/projects";

export default function HomePage() {
  return (
    <div>
      <Projects.Root>
        <main className="mx-auto w-full max-w-4xl p-8">
          <Projects.Header />
          <section className="mt-8">
            <Projects.List />
          </section>
          <Projects.Modal />
        </main>
      </Projects.Root>
    </div>
  );
}
