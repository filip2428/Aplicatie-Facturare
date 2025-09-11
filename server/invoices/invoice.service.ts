import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function deleteInvoice(userId: string) {
  try {
    await prisma.invoice.delete({
      where: { id: userId },
    });
    return { ok: true as const };
  } catch (error) {
    return {
      ok: false as const,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function createInvoice(input: {
  customerId: string;
  total: number;
  dueDate: Date;
}) {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        customerId: input.customerId,
        total: input.total,
        dueDate: input.dueDate,
        number: `INV-${Date.now()}`,
        status: "UNPAID",
      },
    });
    return { ok: true as const, invoice };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return { ok: false as const, error: "Client does not exist." };
      }
    }
    return {
      ok: false as const,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function editInvoice(input: {
  id: string;
  total: number;
  dueDate: Date;
}) {
  try {
    const invoice = await prisma.invoice.update({
      where: { id: input.id },
      data: { total: input.total, dueDate: input.dueDate },
    });
    return { ok: true as const, invoice };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return { ok: false as const, error: "Client does not exist." };
      }
    }
    return {
      ok: false as const,
      error: "Something went wrong. Please try again.",
    };
  }
}
