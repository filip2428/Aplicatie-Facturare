"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateCustomerState = { error?: string };
export type EditCustomerState = { error?: string; ok?: boolean };

export async function createCustomer(
  _prevState: CreateCustomerState,
  data: FormData
): Promise<CreateCustomerState> {
  try {
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const cif = String(data.get("cif") ?? "").trim();

    if (!name || !email || !phone || !address || !cif) {
      throw new Error("All fields are required");
    }
    await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        cif,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        error: "This email / CIF is already associated with an account.",
      };
    }
    return { error: `Something went wrong. Please try again. ${error}` };
  }
  revalidatePath("/customers");
  redirect("/customers/list");
}

export async function editCustomer(
  _prevState: EditCustomerState,
  data: FormData
) {
  try {
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const cif = String(data.get("cif") ?? "").trim();
    const userId = String(data.get("id") ?? "").trim();

    if (!name || !email || !phone || !address || !cif || !userId) {
      throw new Error("Name and email are required");
    }

    await prisma.customer.update({
      where: { id: userId },
      data: {
        name,
        email,
        phone,
        address,
        cif,
      },
    });
    revalidatePath("/users");
    // redirect("/users/list");
    return { ok: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "This email is already associated with an account." };
    }
    return { error: `Something went wrong. Please try again. ${error}` };
  }
}

export async function deleteCustomer(userId: string) {
  await prisma.customer.delete({
    where: { id: userId },
  });
  revalidatePath("/customers");
  redirect("/customers/list");
}
