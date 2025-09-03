import Header from "@/components/Header";
import SelectClient from "@/components/SelectClient";
import DatePicker from "@/components/DatePicker";
import { Input } from "@/components/ui/input";
import FetchForm from "./FetchForm";
import { prisma } from "@/lib/prisma";

export default async function InvoicesNewPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Create New Invoice
      </h1>
      <FetchForm>
        <label className="block text-left">
          Customer:
          <SelectClient customers={customers} />
        </label>
        <label className="block text-left">
          Issue amount:
          <Input
            name="amount"
            placeholder="0.00"
            type="number"
            className="mt-2"
            min={"0.00"}
            // required
          />
        </label>
        <label className="block text-left">
          Due date:
          <DatePicker />
        </label>
      </FetchForm>
    </>
  );
}
