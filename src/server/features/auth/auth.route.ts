import { Hono } from "hono";
import { auth } from "@/lib/auth";

export const authRoute = new Hono().all("/*", (c) => {
  return auth.handler(c.req.raw);
});
