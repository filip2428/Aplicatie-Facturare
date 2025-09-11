export type ApiError = { ok: false; error: string };
export type CreateInvoiceResponse =
  | {
      ok: true;
      invoice: { id: string; customerId: string; total: number; dueDate: Date };
    }
  | ApiError;

export async function apiDeleteInvoice(input: {
  id: string;
}): Promise<{ ok: true } | ApiError> {
  const response = await fetch("/api/invoices", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}

export async function apiCreateInvoice(input: {
  customerId: string;
  total: number;
  dueDate: Date;
}): Promise<CreateInvoiceResponse> {
  const response = await fetch("/api/invoices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}

export async function apiEditInvoice(input: {
  id: string;
  total: number;
  dueDate: Date;
}): Promise<CreateInvoiceResponse> {
  const response = await fetch("/api/invoices", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return response.json();
}
