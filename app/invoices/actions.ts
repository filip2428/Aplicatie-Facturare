"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateInvoiceState = { error?: string };
export type EditInvoiceState = { error?: string; ok?: boolean };

export async function createInvoice(
  _prevState: CreateInvoiceState,
  data: FormData
): Promise<CreateInvoiceState> {
  try {
    const customerId = String(data.get("customer") ?? "").trim();
    const amount = parseFloat(String(data.get("amount") ?? "").trim());
    const dueDate = String(data.get("date") ?? "").trim();

    if (!customerId || !amount || !dueDate) {
      throw new Error("All fields are required.");
    }
    if (amount <= 0) {
      throw new Error("Amount must be a positive number.");
    }
    if (isNaN(amount)) {
      throw new Error("Amount must be a valid number.");
    }
    await prisma.invoice.create({
      data: {
        customerId,
        total: amount,
        dueDate: new Date(dueDate),
        number: `INV-${Date.now()}`,
        status: "UNPAID",
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return { error: "Client does not exist." };
      }
    }
    return { error: `Something went wrong. Please try again. ${error}` };
  }
  revalidatePath("/invoices");
  redirect("/invoices");
}

export async function deleteInvoice(invoiceId: string) {
  await prisma.invoice.delete({ where: { id: invoiceId } });
  revalidatePath("/invoices");
  redirect("/invoices/list");
}

export async function editInvoice(
  _prevState: EditInvoiceState,
  data: FormData
) {
  try {
    const total = parseFloat(String(data.get("total") ?? "").trim());
    const dueDate = String(data.get("date") ?? "").trim();

    if (!total || !dueDate) {
      throw new Error("All fields are required.");
    }
    if (total <= 0) {
      throw new Error("Amount must be a positive number.");
    }
    if (isNaN(total)) {
      throw new Error("Amount must be a valid number.");
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: String(data.get("id") ?? "").trim() },
    });
    if (!invoice) throw new Error("Invoice not found.");
    await prisma.invoice.update({
      where: { id: String(data.get("id") ?? "").trim() },
      data: {
        total,
        dueDate: new Date(dueDate),
        status:
          invoice.amountPaid === total
            ? "PAID"
            : invoice.amountPaid > 0
            ? "PARTIALLY_PAID"
            : "UNPAID",
      },
    });
    revalidatePath("/invoices");
    return { ok: true };
  } catch (error) {
    return { error: `Something went wrong. Please try again. ${error}` };
  }
  //   redirect("/invoices/list");
}
