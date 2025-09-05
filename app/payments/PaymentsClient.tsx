"use client";

import SelectClient from "@/components/SelectClient";
import { useState } from "react";
import PayDialog from "@/components/PayDialog";
import { payInvoice } from "./actions";
import PartialPayDialog from "@/components/PartialPayDialog";

export default function PaymentsClient({
  customers,
  invoices,
}: {
  customers: Array<{ id: string; name: string; email: string }>;
  invoices: Array<{
    id: string;
    number: string;
    total: number;
    customerId: string;
    amountPaid: number | null;
  }>;
}) {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  return (
    <>
      <div className="space-y-6 w-3xl mx-auto">
        <label className="block text-left">
          Customer:
          <SelectClient customers={customers} onChange={setSelectedCustomer} />
        </label>
        {selectedCustomer && (
          <ul className="space-y-2">
            {invoices
              .filter((inv) => inv.customerId === selectedCustomer)
              .map((inv) => (
                <li
                  key={inv.id}
                  className="bg-neutral-900/60 p-3 rounded flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">Invoice #{inv.number}</div>
                    <div className="text-sm text-gray-300">
                      Total: {inv.total} | Amount paid: {inv.amountPaid}
                    </div>
                  </div>
                  {inv.amountPaid !== inv.total && (
                    <div className="flex items-center gap-2">
                      <PartialPayDialog
                        formId={`pay-invoice-form-${inv.id}`}
                        invoiceId={inv.id}
                        maxAmount={inv.total - (inv.amountPaid ?? 0)}
                        amountPaid={inv.amountPaid ?? 0}
                      />
                      <form
                        id={`pay-invoice-form-${inv.id}`}
                        action={payInvoice}
                      >
                        <PayDialog formId={`pay-invoice-form-${inv.id}`} />
                        <input type="hidden" name="invoiceId" value={inv.id} />
                        <input
                          type="hidden"
                          name="amount"
                          value={inv.total - (inv.amountPaid ?? 0)}
                        />
                      </form>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}
