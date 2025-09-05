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
};

export default function PayDialog({ formId }: DeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className=" bg-green-800 hover:bg-green-700 text-white text-sm"
          type="button"
        >
          Pay
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Pay</DialogTitle>
          <DialogDescription>
            Are you sure you want to pay this invoice? Money will be sent to the
            customer.
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
            className="bg-green-700 hover:bg-green-800"
            form={formId}
          >
            Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
