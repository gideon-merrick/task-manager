"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useFormContext } from "./form-context";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "form"> {
  name: string;
  icon: ReactNode;
}

export function FormField({ name, icon, ...inputProps }: Props) {
  const form = useFormContext();

  return (
    <form.Field
      children={(field) => (
        <div>
          <label className="input input-bordered flex w-full items-center gap-2">
            {icon}
            <input
              className="grow"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              value={(field.state.value as string) ?? ""}
              {...inputProps}
            />
          </label>
          {field.state.meta.errors.length > 0 && (
            <p className="mt-1 text-error text-sm">{field.state.meta.errors.join(", ")}</p>
          )}
        </div>
      )}
      name={name}
    />
  );
}
