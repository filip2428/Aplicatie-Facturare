"use client";

import SelectClient from "@/components/SelectClient";
import { useState } from "react";
import PayDialog from "@/components/PayDialog";
import { payInvoice } from "./actions";
import PartialPayDialog from "@/components/PartialPayDialog";

export default function PaymentsClient({
  customers,
  invoices,
  payments,
}: {
  customers: Array<{ id: string; name: string; email: string }>;
  invoices: Array<{
    id: string;
    number: string;
    total: number;
    customerId: string;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    invoiceId: string;
    createdAt: Date;
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
              .map((inv) => {
                const invoicePayments = payments.filter(
                  (p) => p.invoiceId === inv.id
                );
                const amountPaid = invoicePayments.reduce(
                  (sum, p) => sum + p.amount,
                  0
                );
                return (
                  <li
                    key={inv.id}
                    className="bg-neutral-900/60 p-3 rounded flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold">Invoice #{inv.number}</div>
                      <div className="text-sm text-gray-300">
                        Total: {inv.total} | Amount paid: {amountPaid} |
                        Remaining: {inv.total - amountPaid}
                      </div>
                    </div>
                    {amountPaid !== inv.total && (
                      <div className="flex items-center gap-2">
                        <PartialPayDialog
                          formId={`pay-invoice-form-${inv.id}`}
                          invoiceId={inv.id}
                          maxAmount={inv.total - (amountPaid ?? 0)}
                          amountPaid={amountPaid ?? 0}
                        />
                        <form
                          id={`pay-invoice-form-${inv.id}`}
                          action={payInvoice}
                        >
                          <PayDialog formId={`pay-invoice-form-${inv.id}`} />
                          <input
                            type="hidden"
                            name="invoiceId"
                            value={inv.id}
                          />
                          <input
                            type="hidden"
                            name="amount"
                            value={inv.total - (amountPaid ?? 0)}
                          />
                        </form>
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </>
  );
}
