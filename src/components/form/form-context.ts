import type { useForm } from "@tanstack/react-form";
import { createContext, useContext } from "react";

export const FormContext = createContext<unknown | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormRoot");
  }
  return context as ReturnType<typeof useForm>;
}
