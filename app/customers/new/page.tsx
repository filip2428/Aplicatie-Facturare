"use client";

import Header from "@/components/Header";
import NewUserForm from "@/components/NewUserForm";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { createCustomer, type CreateCustomerState } from "../actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle, AlertTriangle, X, CheckCircle2Icon } from "lucide-react";

export default function CustomersNewPage() {
  const [state, formAction, isPending] = useActionState<
    CreateCustomerState,
    FormData
  >(createCustomer, {});
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Create New Customer
      </h1>
      <form
        action={formAction}
        className="text-center space-y-4 max-w-md mx-auto p-6 bg-neutral-800/60 rounded-xl"
      >
        <label className="block text-left">
          Name:
          <Input
            name="name"
            placeholder="Name / Company"
            type="text"
            className="mt-2"
            required
          />
        </label>
        <label className="block text-left">
          Email:
          <Input
            name="email"
            placeholder="xyz@email.com"
            type="email"
            className="mt-2"
            required
          />
        </label>
        <label className="block text-left">
          Phone Number:
          <Input
            name="phone"
            placeholder="e.g. +40712345678"
            type="tel"
            className="mt-2"
            required
          />
        </label>
        <label className="block text-left">
          Addres:
          <Input
            name="address"
            placeholder="e.g. Street 123, City"
            type="text"
            className="mt-2"
            required
          />
        </label>
        <label className="block text-left">
          CIF:
          <Input
            name="cif"
            placeholder="Ro 123456"
            type="text"
            className="mt-2"
            required
          />
        </label>
        <div className="text-right">
          <button
            type="submit"
            className={`mt-2 px-4 py-2 rounded text-white border 
    ${
      isPending
        ? "bg-gray-500 cursor-not-allowed opacity-70"
        : "bg-red-800 hover:bg-red-900"
    }`}
            disabled={isPending}
          >
            Add Customer
          </button>
        </div>
      </form>
      {state.error && (
        <Alert
          variant="destructive"
          className="
    inline-flex w-fit max-w-md mx-auto
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
      )}
    </>
  );
}
