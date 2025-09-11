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
import { useState } from "react";
import DatePicker from "../../../../components/DatePicker";
import { useRouter } from "next/navigation";
import { apiEditInvoice } from "@/lib/api/invoices";

type EditDialogProps = {
  invoiceId: string;
  invoiceTotal: number;
  invoiceDueDate: Date;
};

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
  const router = useRouter();
  const [total, setTotal] = useState(invoiceTotal);
  const [dueDate, setDueDate] = useState(invoiceDueDate);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    const res = await apiEditInvoice({
      id: invoiceId,
      total: total,
      dueDate: dueDate,
    });
    setIsPending(false);
    if (!res.ok) {
      setError(res.error || "An error occurred");
      return;
    }
    router.refresh();
    router.push("/invoices/list");
    onSuccess();
  }
  return (
    <>
      <form onSubmit={onSubmit} className="mt-4">
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
              onChange={(e) => setTotal(Number(e.target.value))}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Invoice Due Date</Label>
            <DatePicker
              defaultDate={invoiceDueDate}
              value={dueDate}
              onChange={setDueDate}
            />
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
      {error && (
        <p className="text-center text-red-500 font-semibold mt-4">{error}</p>
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
