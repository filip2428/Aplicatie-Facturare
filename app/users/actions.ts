"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateUserState = { error?: string };
export type EditUserState = { error?: string; ok?: boolean };
