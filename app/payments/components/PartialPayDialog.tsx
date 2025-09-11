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
import { partialPayInvoice, PartialPayInvoiceState } from "../actions";

type PartialPayDialogProps = {
  formId?: string;
  invoiceId: string;
  maxAmount: number;
  amountPaid: number;
};

const initialState: PartialPayInvoiceState = { error: undefined, ok: false };

function PartialPayForm({
  invoiceId,
  maxAmount,
  onSuccess,
}: {
  invoiceId: string;
  maxAmount: number;
  onSuccess: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [state, formAction, isPending] = useActionState<
    PartialPayInvoiceState,
    FormData
  >(partialPayInvoice, initialState);

  useEffect(() => {
    if (state.ok) onSuccess();
  }, [state.ok, onSuccess]);

  const validAmount =
    !!amount && Number(amount) > 0 && Number(amount) <= maxAmount;

  return (
    <>
      <form action={formAction} className="mt-4">
        <input type="hidden" name="invoiceId" value={invoiceId} />
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount to pay (max {maxAmount})</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              max={maxAmount}
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Max: ${maxAmount}`}
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
            disabled={isPending || !validAmount}
          >
            {isPending ? "Paying..." : "Pay"}
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

export default function PartialPayDialog({
  formId,
  invoiceId,
  maxAmount,
  amountPaid,
}: PartialPayDialogProps) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSuccess = () => {
    setOpen(false);
    setFormKey((k) => k + 1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Partial Pay</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Partial Pay Invoice</DialogTitle>
          <DialogDescription>
            Enter an amount to pay (max {maxAmount}). Amount paid so far:{" "}
            {amountPaid}
          </DialogDescription>
        </DialogHeader>
        {open && (
          <PartialPayForm
            invoiceId={invoiceId}
            maxAmount={maxAmount}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
