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
import { apiEditCustomer } from "@/lib/api/customers";
import { useRouter } from "next/navigation";

type EditDialogProps = {
  formId?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCif: string;
};

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
  const router = useRouter();
  const [name, setName] = useState(customerName);
  const [email, setEmail] = useState(customerEmail);
  const [phone, setPhone] = useState(customerPhone);
  const [address, setAddress] = useState(customerAddress);
  const [cif, setCif] = useState(customerCif);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    const res = await apiEditCustomer({
      id: customerId,
      name,
      email,
      phone,
      address,
      cif,
    });
    setIsPending(false);
    if (!res.ok) {
      setError(res.error || "An error occurred");
      return;
    }
    router.refresh();
    router.push("/customers/list");
    onSuccess();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mt-4">
        <div className="grid gap-4">
          <input type="hidden" name="id" value={customerId} />
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="name"
              defaultValue={customerName}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Email</Label>
            <Input
              id="username-1"
              name="email"
              defaultValue={customerEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Phone number</Label>
            <Input
              id="username-1"
              name="phone"
              defaultValue={customerPhone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Address</Label>
            <Input
              id="username-1"
              name="address"
              defaultValue={customerAddress}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">CIF</Label>
            <Input
              id="username-1"
              name="cif"
              defaultValue={customerCif}
              onChange={(e) => setCif(e.target.value)}
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
      {error && (
        <p className="text-center text-red-500 font-semibold mt-4">{error}</p>
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
