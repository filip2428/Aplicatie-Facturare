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
import { editCustomer, EditCustomerState } from "../app/customers/actions";

type EditDialogProps = {
  formId?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCif: string;
};

const initialState: EditCustomerState = { error: undefined, ok: false };

function EditForm({
  customerId,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  customerCif,
  onSuccess,
}: {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCif: string;
  onSuccess: () => void;
}) {
  const [state, formAction, isPending] = useActionState<
    EditCustomerState,
    FormData
  >(editCustomer, initialState);

  useEffect(() => {
    if (state.ok) onSuccess();
  }, [state.ok, onSuccess]);

  return (
    <>
      <form action={formAction} className="mt-4">
        <div className="grid gap-4">
          <input type="hidden" name="id" value={customerId} />
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="name"
              defaultValue={customerName}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Email</Label>
            <Input
              id="username-1"
              name="email"
              defaultValue={customerEmail}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Phone number</Label>
            <Input
              id="username-1"
              name="phone"
              defaultValue={customerPhone}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Address</Label>
            <Input
              id="username-1"
              name="address"
              defaultValue={customerAddress}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">CIF</Label>
            <Input
              id="username-1"
              name="cif"
              defaultValue={customerCif}
              required
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
      {state.error && (
        <p className="text-center text-red-500 font-semibold mt-4">
          {state.error}
        </p>
      )}
    </>
  );
}

export default function EditDialogCustomer({
  formId,
  customerId,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  customerCif,
}: EditDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <EditForm
            customerId={customerId}
            customerName={customerName}
            customerEmail={customerEmail}
            customerAddress={customerAddress}
            customerCif={customerCif}
            customerPhone={customerPhone}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
