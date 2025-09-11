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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useActionState } from "react";
import { editInvoice, EditInvoiceState } from "../../actions";
import DatePicker from "../../../../components/DatePicker";

type EditDialogProps = {
  invoiceId: string;
  invoiceTotal: number;
  invoiceDueDate: Date;
};

const initialState: EditInvoiceState = { error: undefined, ok: false };

function EditForm({
  invoiceId,
  invoiceTotal,
  invoiceDueDate,
  onSuccess,
}: {
  invoiceId: string;
  invoiceTotal: number;
  invoiceDueDate: Date;
  onSuccess: () => void;
}) {
  const [state, formAction, isPending] = useActionState<
    EditInvoiceState,
    FormData
  >(editInvoice, initialState);

  useEffect(() => {
    if (state.ok) onSuccess();
  }, [state.ok, onSuccess]);

  return (
    <>
      <form action={formAction} className="mt-4">
        <div className="grid gap-4">
          <input type="hidden" name="id" value={invoiceId} />
          <div className="grid gap-3">
            <Label htmlFor="name-1">Total</Label>
            <Input
              id="name-1"
              name="total"
              type="number"
              defaultValue={invoiceTotal}
              min={0}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Invoice Due Date</Label>
            <DatePicker defaultDate={invoiceDueDate} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-neutral-800 hover:bg-neutral-900 mt-2"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className={`bg-green-700 hover:bg-green-800 mt-2 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
      {state.error && (
        <p className="text-center text-red-500 font-semibold mt-4">
          {state.error}
        </p>
      )}
    </>
  );
}

export default function EditDialogInvoice({
  invoiceId,
  invoiceTotal,
  invoiceDueDate,
}: EditDialogProps) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSuccess = () => {
    setOpen(false);
    setFormKey((k) => k + 1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <EditForm
            invoiceId={invoiceId}
            invoiceTotal={invoiceTotal}
            invoiceDueDate={invoiceDueDate}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
