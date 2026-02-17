"use client";

import { useForm } from "@tanstack/react-form";
import type { ReactNode } from "react";
import { FormContext } from "./form-context";

interface Props<T = Record<string, unknown>> {
  defaultValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  children: ReactNode;
}

export function FormRoot<T = Record<string, unknown>>({ defaultValues, onSubmit, children }: Props<T>) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <FormContext.Provider value={form}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
