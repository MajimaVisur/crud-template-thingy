import postsHandler from "./api/posts";
import authHandler from "./api/auth";
import usersHandler from "./api/users";
import adminHandler from "./api/admin";

const mimeTypes: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".tsx": "application/javascript",
  ".ts": "application/javascript",
  ".json": "application/json",
};

Bun.serve({
  port: 3000,
  async fetch(req: Request) {
    const url = new URL(req.url);

    // API routes
    if (url.pathname.startsWith("/api/posts")) return postsHandler(req);
    if (url.pathname.startsWith("/api/auth")) return authHandler(req);
    if (url.pathname.startsWith("/api/users")) return usersHandler(req);
    if (url.pathname.startsWith("/api/admin")) return adminHandler(req);

    // Serve static files
    let filePath = url.pathname;
    if (filePath === "/") filePath = "/index.html";

    const ext = filePath.substring(filePath.lastIndexOf("."));
    const mimeType = mimeTypes[ext] || "application/octet-stream";

    try {
      const file = Bun.file(`./src${filePath}`);
      if (await file.exists()) {
        return new Response(file, {
          headers: { "Content-Type": mimeType },
        });
      }
    } catch (err) {
      // File doesn't exist
    }

    // Only use SPA fallback for non-file requests (no extension)
    if (!filePath.includes(".")) {
      const indexFile = Bun.file("./src/index.html");
      return new Response(indexFile, {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log("Server running on http://localhost:3000");
