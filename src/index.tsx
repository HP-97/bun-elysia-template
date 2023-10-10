import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { type PropsWithChildren } from "@kitajs/html";
import { staticPlugin } from "@elysiajs/static";

const BaseHtml = ({ children }: PropsWithChildren) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CHANGEME</title>
  <script src="/public/htmx.min.js"></script>
  <script src="/public/hyperscript.min.js"></script>
</head>

${children}
`;

const app = new Elysia()
  .use(html({ contentType: "text/html; charset=utf-8" }))
  .use(staticPlugin())
  .decorate("getDate", () => Date.now())
  .get("/", () => "Hello Elysia")
  .get("/ping", () => (
    <BaseHtml>
      <p>pong</p>
    </BaseHtml>
  ))
  .get("/polling-news", () => (
    <BaseHtml>
      <div hx-get="/news" hx-trigger="every 2s"></div>
    </BaseHtml>
  ))
  .get("/news", ({ getDate }) => <p>This is the news! {getDate()}</p>)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
