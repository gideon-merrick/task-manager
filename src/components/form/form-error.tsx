import { useFormContext } from "./form-context";

export function FormError() {
  const form = useFormContext();

  return (
    <form.Subscribe
      children={(state) => {
        const error = state.errorMap.onSubmit;
        return error && typeof error === "string" ? (
          <div className="alert alert-error" role="alert">
            <span>{error}</span>
          </div>
        ) : null;
      }}
    />
  );
}
