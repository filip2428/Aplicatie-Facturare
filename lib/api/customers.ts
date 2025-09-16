export type ApiError = { ok: false; error: string };
export type CreateCustomerResponse =
  | {
      ok: true;
      customer: {
        id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        cif: string;
      };
    }
  | ApiError;

export async function apiDeleteCustomer(input: {
  id: string;
}): Promise<{ ok: true } | ApiError> {
  const response = await fetch("/api/customers", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}

export async function apiCreateCustomer(input: {
  name: string;
  email: string;
  phone: string;
  address: string;
  cif: string;
}): Promise<CreateCustomerResponse> {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}

export async function apiEditCustomer(input: {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cif: string;
}): Promise<CreateCustomerResponse> {
  const response = await fetch("/api/customers", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}

export type GetCustomersResponse =
  | {
      ok: true;
      customers: Array<{
        id: string;
        name: string | null;
        email: string | null;
        phone: string | null;
        address: string | null;
        cif: string | null;
      }>;
    }
  | { ok: false; error: string };

export async function apiGetCustomers(params?: {
  q?: string;
  sort?: "newest" | "oldest" | "az" | "za";
}): Promise<GetCustomersResponse> {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", params.q);
  if (params?.sort) qs.set("sort", params.sort);

  const isServer = typeof window === "undefined";
  const base = isServer
    ? process.env.NEXT_PUBLIC_APP_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`
    : "";

  const res = await fetch(`${base}/api/customers?${qs.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return res.json();
}
