"use client";

import type { ReactNode } from "react";
import { useFormContext } from "./form-context";

interface Props {
  children: ReactNode;
}

export function FormSubmit({ children }: Props) {
  const form = useFormContext();

  return (
    <form.Subscribe
      children={(state) => (
        <button className="btn btn-primary w-full" disabled={!state.canSubmit} type="submit">
          {state.isSubmitting ? <span className="loading loading-spinner" /> : children}
        </button>
      )}
    />
  );
}
