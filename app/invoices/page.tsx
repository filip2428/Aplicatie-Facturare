import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import GhostButton from "@/components/GhostButton";

export default async function InvoicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Invoices Page
      </h1>
      <div className="flex justify-center mt-10">
        <GhostButton href="/invoices/list" textSize="lg">
          Current Invoices List
        </GhostButton>
        <GhostButton href="/invoices/new" textSize="lg">
          Create New Invoice
        </GhostButton>
      </div>
    </>
  );
}
