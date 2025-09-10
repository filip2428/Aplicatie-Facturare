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

type DeleteDialogProps = {
  formId?: string;
  inputType?: "User" | "Customer" | "Invoice";
};

export default function DeleteDialog({
  formId,
  inputType = "User",
}: DeleteDialogProps) {
  const handleConfirm = () => {
    if (!formId) return;
    const form = document.getElementById(formId) as HTMLFormElement | null;
    form?.requestSubmit();
  };
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
            // form={formId}
            onClick={handleConfirm}
          >
            Delete {inputType}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
