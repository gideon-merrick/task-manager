"use client";

import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/form/form-field";
import { FormRoot } from "@/components/form/form-root";
import { FormSubmit } from "@/components/form/form-submit";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (value: { name: string; email: string; password: string }) => {
    await authClient.signUp.email({
      name: value.name,
      email: value.email,
      password: value.password,
    });
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-6 justify-center text-center font-bold text-2xl">Register</h2>
          <FormRoot defaultValues={{ name: "", email: "", password: "" }} onSubmit={handleSubmit}>
            <FormField icon={<User />} name="name" placeholder="James" type="text" />
            <FormField icon={<Mail />} name="email" placeholder="james@mail.com" type="email" />
            <FormField icon={<Lock />} name="password" placeholder="********" type="password" />
            <FormSubmit>Register</FormSubmit>
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
