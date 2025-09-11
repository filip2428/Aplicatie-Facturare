import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function deleteCustomer(customerId: string) {
  try {
    await prisma.customer.delete({
      where: { id: customerId },
    });
    return { ok: true as const };
  } catch (error) {
    return {
      ok: false as const,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function createCustomer(input: {
  name: string;
  email: string;
  phone: string;
  address: string;
  cif: string;
}) {
  try {
    const customer = await prisma.customer.create({ data: input });
    return { ok: true as const, customer };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ok: false as const,
        error: "This email is already associated with an account.",
      };
    }
    return {
      ok: false as const,
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function editCustomer(input: {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cif: string;
}) {
  try {
    const customer = await prisma.customer.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        address: input.address,
        cif: input.cif,
      },
    });
    return { ok: true as const, customer };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ok: false as const,
        error: "This email or CIF is already associated with an account.",
      };
    }
    return {
      ok: false as const,
      error: "Something went wrong. Please try again.",
    };
  }
}
