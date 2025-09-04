"use client";

import SelectClient from "@/components/SelectClient";
import { useState } from "react";

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
                <li key={inv.id} className="bg-neutral-900/60 p-3 rounded">
                  <div className="font-semibold">Invoice #{inv.number}</div>
                  <div className="text-sm text-gray-300">
                    Total: {inv.total} | Amount paid: {inv.amountPaid}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}
