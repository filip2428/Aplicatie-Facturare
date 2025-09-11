import { z } from "zod";
export const DeleteInvoiceSchema = z.object({
  id: z.string().trim().min(1),
});

export const CreateInvoiceSchema = z.object({
  customerId: z.string().trim().min(1),
  dueDate: z.coerce.date(),
  total: z.number().positive(),
});

export const EditInvoiceSchema = z.object({
  id: z.string().trim().min(1),
  dueDate: z.coerce.date(),
  total: z.number().positive(),
});
