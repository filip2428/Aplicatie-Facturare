import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function createUser(input: { name: string; email: string }) {
  try {
    const user = await prisma.user.create({ data: input });
    return { ok: true as const, user };
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

export async function editUser(input: {
  id: string;
  name: string;
  email: string;
}) {
  try {
    const user = await prisma.user.update({
      where: { id: input.id },
      data: { name: input.name, email: input.email },
    });
    return { ok: true as const, user };
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

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
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
