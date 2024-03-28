import { Elysia } from "elysia";
import { router } from "./router";
import { logger } from "@bogeychan/elysia-logger";
import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
  .use(
    logger({
      level: "info",
      crlf: true,
    })
  )
  .use(
    swagger({
      provider: "swagger-ui",
      path: "/docs",
      exclude: ["/docs", "/docs/json", "/"],
      documentation: {
        info: {
          title: "Notes API",
          description: "API for notes",
          version: "0.1.0",
          contact: {
            email: "niwaisme@proton.me",
            name: "imniwa",
          },
        },
        tags: [
          { name: "auth", description: "Auth operations" },
          { name: "users", description: "Users operations" },
          { name: "notes", description: "Notes operations" },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    })
  )
  .use(cors())
  .use(router)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
