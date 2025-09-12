"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectClient from "@/components/SelectClient";
import DatePicker from "@/components/DatePicker";
import { Input } from "@/components/ui/input";
import FetchForm from "./FetchForm";
import { apiCreateInvoice } from "@/lib/api/invoices";

type Customer = { id: string; name: string; email: string };

export default function NewInvoiceForm({
  customers,
}: {
  customers: Customer[];
}) {
  const router = useRouter();
  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [amount, setAmount] = useState(0);
  const [dueDate, setDueDate] = useState(tommorow);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const amt = Number(amount);
    if (!selectedCustomer) return setError("Selectează un client.");
    if (!amount || isNaN(amt) || amt <= 0)
      return setError("Introdu o sumă > 0.");
    if (!dueDate) return setError("Alege o dată scadentă.");

    setIsPending(true);
    try {
      const res = await apiCreateInvoice({
        customerId: selectedCustomer,
        total: amt,
        dueDate, // trimitem YYYY-MM-DD (string)
      });

      if (!res.ok) {
        setError(res.error ?? "Nu s-a putut crea factura.");
        return;
      }

      router.refresh();
      router.push("/invoices/list");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <FetchForm onSubmit={onSubmit} isPending={isPending} error={error}>
      <label className="block text-left">
        Customer:
        <div className="mt-2">
          <SelectClient
            customers={customers}
            selectedCustomer={selectedCustomer}
            onChange={setSelectedCustomer}
          />
        </div>
      </label>

      <label className="block text-left">
        Issue amount:
        <Input
          name="amount"
          placeholder="0.00"
          type="number"
          step="0.01"
          min="0.00"
          className="mt-2"
          //   value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </label>

      <label className="block text-left">
        Due date:
        <div className="mt-2">
          <DatePicker value={dueDate} onChange={setDueDate} />
        </div>
      </label>
    </FetchForm>
  );
}
