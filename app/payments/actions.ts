"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function payInvoice(formData: FormData) {
  const invoiceId = String(formData.get("invoiceId"));
  const amount = parseFloat(String(formData.get("amount")));
  if (!invoiceId) return;

  await prisma.payments.create({
    data: {
      amount,
      invoiceId,
    },
  });

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      status: "PAID",
    },
  });
  revalidatePath("/payments");
  redirect("/payments");
}

export type PartialPayInvoiceState = { error?: string; ok: boolean };

export async function partialPayInvoice(
  _prevState: PartialPayInvoiceState,
  formData: FormData
) {
  try {
    const invoiceId = String(formData.get("invoiceId"));
    const amount = parseFloat(String(formData.get("amount")));
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });
    if (!invoice) throw new Error("Invoice not found.");
    if (!invoiceId || !amount) {
      throw new Error("All fields are required.");
    }
    if (amount <= 0) {
      throw new Error("Amount must be a positive number.");
    }
    if (isNaN(amount)) {
      throw new Error("Amount must be a valid number.");
    }
    // if (amount > invoice.total - (invoice.amountPaid ?? 0)) {
    //   throw new Error("Amount exceeds the remaining balance.");
    // }
    const amountPaid = await prisma.payments.aggregate({
      _sum: { amount: true },
      where: { invoiceId },
    });
    const status =
      (amountPaid._sum.amount ?? 0) + amount >= invoice.total
        ? "PAID"
        : "PARTIALLY_PAID";
    await prisma.payments.create({
      data: {
        amount,
        invoiceId,
      },
    });
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status },
    });
    revalidatePath("/payments");
    return { ok: true };
  } catch (error) {
    return {
      error: `Something went wrong. Please try again. ${error}`,
      ok: false,
    };
  }
}
