export function jsonResponse(data: any, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function formatUser(user: any) {
  return { id: user.id, username: user.username, email: user.email, is_admin: !!user.is_admin };
}
