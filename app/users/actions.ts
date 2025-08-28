"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateUserState = { error?: string };
export type EditUserState = { error?: string; ok?: boolean };

export async function createUser(
  _prevState: CreateUserState,
  data: FormData
): Promise<CreateUserState> {
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();

  if (!name || !email) {
    throw new Error("Name and email are required");
  }
  try {
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "This email is already associated with an account." };
    }
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/users");
  redirect("/users/list");
}

export async function editUser(_prevState: EditUserState, data: FormData) {
  try {
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const userId = String(data.get("id") ?? "").trim();

    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
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

export async function deleteUser(userId: string) {
  await prisma.user.delete({
    where: { id: userId },
  });
  revalidatePath("/users");
  redirect("/users/list");
}
