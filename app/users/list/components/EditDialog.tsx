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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiEditUser } from "@/lib/api/users";
// import { editUser, EditUserState } from "../../actions";

type EditDialogProps = {
  formId?: string;
  userName: string;
  userEmail: string;
  userId: string;
};

// const initialState: EditUserState = { error: undefined, ok: false };

function EditForm({
  userId,
  userName,
  userEmail,
  onSuccess,
}: {
  userId: string;
  userName: string;
  userEmail: string;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    const res = await apiEditUser({
      id: userId,
      name: name.trim(),
      email: email.trim(),
    });
    setIsPending(false);
    if (!res.ok) {
      setError(res.error || "An error occurred");
      return;
    }
    router.refresh();
    router.push("/users/list");
    onSuccess();
  }
  return (
    <>
      <form onSubmit={onSubmit} className="mt-4">
        <div className="grid gap-4">
          <input type="hidden" name="id" value={userId} />
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              id="name-1"
              name="name"
              defaultValue={userName}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Email</Label>
            <Input
              id="username-1"
              name="email"
              defaultValue={userEmail}
              onChange={(e) => setEmail(e.target.value)}
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

export default function EditDialog({
  formId,
  userName,
  userEmail,
  userId,
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <EditForm
            userId={userId}
            userName={userName}
            userEmail={userEmail}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
