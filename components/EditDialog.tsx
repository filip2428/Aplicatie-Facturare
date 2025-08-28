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
// import { useFormState } from "react-dom";
import { useEffect, useState, useActionState } from "react";
import { editUser, EditUserState } from "../app/users/actions";

type EditDialogProps = {
  formId?: string;
  userName: string;
  userEmail: string;
  userId: string;
};

const initialState: EditUserState = { error: undefined, ok: false };

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
  const [state, formAction] = useActionState<EditUserState, FormData>(
    editUser,
    initialState
  );

  useEffect(() => {
    if (state.ok) onSuccess();
  }, [state.ok, onSuccess]);

  return (
    <>
      <form action={formAction} className="mt-4">
        <div className="grid gap-4">
          <input type="hidden" name="id" value={userId} />
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input id="name-1" name="name" defaultValue={userName} required />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Email</Label>
            <Input
              id="username-1"
              name="email"
              defaultValue={userEmail}
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
            className="bg-green-700 hover:bg-green-800 mt-2"
          >
            Save Changes
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
