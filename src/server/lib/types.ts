import type { auth } from "@/lib/auth.js";
import type { app } from "../app.js";

export type AppType = typeof app;

export interface AppVariables {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
}
