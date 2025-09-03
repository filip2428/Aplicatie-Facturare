"use client";

import { createInvoice, type CreateInvoiceState } from "../actions";
import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle, AlertTriangle, X, CheckCircle2Icon } from "lucide-react";

export default function FetchForm({ children }: { children: React.ReactNode }) {
  const [state, formAction, isPending] = useActionState<
    CreateInvoiceState,
    FormData
  >(createInvoice, {});

  return (
    <>
      <form
        className="text-center space-y-4 max-w-md mx-auto p-6 bg-neutral-800/60 rounded-xl"
        action={formAction}
      >
        {children}
        <div className="text-right">
          <button
            type="submit"
            className={`border-1 mt-2 px-4 py-2 rounded bg-red-800 hover:bg-red-900 text-white align-right ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Invoice"}
            {/* Create Invoice */}
          </button>
        </div>
      </form>
      {state.error && (
        <div className="fixed left-1/2 bottom-16 z-50 translate-x-[-50%]">
          <Alert
            variant="destructive"
            className="
        inline-flex w-fit max-w-md
        items-start gap-3 border-l-4 border-red-500/80
        bg-red-950/40 text-red-200 ring-1 ring-inset ring-red-400/20
        backdrop-blur-sm shadow-lg shadow-red-900/20
        animate-in fade-in-50 slide-in-from-top-2
        break-words center
      "
          >
            <AlertTriangle />
            <div>
              <AlertTitle className="text-red-100">Heads up!</AlertTitle>
              <AlertDescription className="text-red-200/90">
                {state.error}
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
}
