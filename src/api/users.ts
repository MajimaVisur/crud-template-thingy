import { jsonResponse, formatUser } from "../lib/http";
import { getUserFromRequest } from "../lib/jwt";
import * as posts from "../lib/posts";

export async function usersHandler(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);

    if (url.pathname === "/api/users/me" && req.method === "GET") {
      const user = await getUserFromRequest(req);
      if (!user) return jsonResponse({ error: "Missing or invalid token" }, 401);
      return jsonResponse({ user: formatUser(user) });
    }

    if (url.pathname === "/api/users/posts" && req.method === "GET") {
      const user = await getUserFromRequest(req);
      if (!user) return jsonResponse({ error: "Missing or invalid token" }, 401);
      const rows = await posts.getPostsByUser(user.id);
      return jsonResponse({ posts: rows });
    }

    return jsonResponse({ error: "Not found" }, 404);
  } catch (err) {
    console.error("Users handler error", err);
    return jsonResponse({ error: "Server error" }, 500);
  }
}

export default usersHandler;
