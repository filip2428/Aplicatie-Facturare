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
