export type ApiError = { ok: false; error: string };
export type CreateUserResponse =
  | { ok: true; user: { id: string; name: string; email: string } }
  | ApiError;

export async function apiCreateUser(input: {
  name: string;
  email: string;
}): Promise<CreateUserResponse> {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}

export async function apiEditUser(input: {
  id: string;
  name: string;
  email: string;
}): Promise<CreateUserResponse> {
  const response = await fetch("/api/users", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}

export async function apiDeleteUser(input: {
  id: string;
}): Promise<{ ok: true } | ApiError> {
  const response = await fetch("/api/users", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}
