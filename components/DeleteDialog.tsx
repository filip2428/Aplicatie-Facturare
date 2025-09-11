"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { apiDeleteUser } from "@/lib/api/users";
import { apiDeleteCustomer } from "@/lib/api/customers";
import { apiDeleteInvoice } from "@/lib/api/invoices";

type DeleteDialogProps = {
  itemId?: string;
  inputType?: "User" | "Customer" | "Invoice";
};

export default function DeleteDialog({
  itemId,
  inputType = "User",
}: DeleteDialogProps) {
  const router = useRouter();

  async function handleConfirm() {
    if (inputType === "User") {
      if (!itemId) return;
      const res = await apiDeleteUser({ id: itemId });
      if (!res.ok) {
        return;
      }
      router.refresh();
      router.push(`/users/list`);
    }
    if (inputType === "Customer") {
      if (!itemId) return;
      const res = await apiDeleteCustomer({ id: itemId });
      if (!res.ok) {
        return;
      }
      router.refresh();
      router.push(`/customers/list`);
    }
    if (inputType === "Invoice") {
      if (!itemId) return;
      const res = await apiDeleteInvoice({ id: itemId });
      if (!res.ok) {
        return;
      }
      router.refresh();
      router.push(`/invoices/list`);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="px-3 py-1 rounded bg-red-800 hover:bg-red-900 text-white text-sm"
          type="button"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Delete {inputType}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {inputType}? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-neutral-800 hover:bg-neutral-900">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-red-700 hover:bg-red-800"
            onClick={handleConfirm}
          >
            Delete {inputType}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
