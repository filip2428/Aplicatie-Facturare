import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
});

export const EditUserSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
});

export const DeleteUserSchema = z.object({
  id: z.string().trim().min(1),
});

export type CreateUserBody = z.infer<typeof CreateUserSchema>;
export type EditUserBody = z.infer<typeof EditUserSchema>;
