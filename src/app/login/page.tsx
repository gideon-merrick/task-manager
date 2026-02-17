"use client";

import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/form/form-error";
import { FormField } from "@/components/form/form-field";
import { FormRoot } from "@/components/form/form-root";
import { FormSubmit } from "@/components/form/form-submit";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (c) => {
          console.log(c.error);
          throw new Error(c.error.message || "Something went wrong. Please try again.");
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 justify-center text-center font-bold text-2xl">Sign In</h2>
          <FormRoot defaultValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
            <FormField icon={<Mail />} name="email" placeholder="james@mail.com" type="email" />
            <FormField icon={<Lock />} name="password" placeholder="********" type="password" />
            <FormError />
            <FormSubmit>Log In</FormSubmit>
          </FormRoot>
          <div className="divider">OR</div>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link className="link link-primary" href="/register">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
