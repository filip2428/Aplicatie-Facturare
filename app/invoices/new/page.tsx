import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import NewInvoiceForm from "./newInvoiceForm";

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
      <NewInvoiceForm customers={customers} />
    </>
  );
}
