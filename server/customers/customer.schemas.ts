import { z } from "zod";
export const DeleteCustomerSchema = z.object({
  id: z.string().trim().min(1),
});

export const CreateCustomerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  address: z.string().trim().min(1, "Address is required"),
  cif: z.string().trim().min(1, "CIF is required"),
});

export const EditCustomerSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  address: z.string().trim().min(1, "Address is required"),
  cif: z.string().trim().min(1, "CIF is required"),
});
