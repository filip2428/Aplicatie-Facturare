import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SelectClient from "@/components/SelectClient";
import PaymentsClient from "./PaymentsClient";

export default async function PaymentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const customers = await prisma.customer.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      number: true,
      total: true,
      customerId: true,
    },
  });
  const payments = await prisma.payments.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, amount: true, invoiceId: true, createdAt: true },
  });

  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Payments Page
      </h1>
      <PaymentsClient
        customers={customers}
        invoices={invoices}
        payments={payments}
      />
    </>
  );
}
