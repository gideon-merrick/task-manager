import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
});

export type User = typeof auth.$Infer.Session.session;
export type Session = typeof auth.$Infer.Session.user;
