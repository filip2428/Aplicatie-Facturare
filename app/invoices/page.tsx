import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function InvoicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-50">
        Invoices Page
      </h1>
    </>
  );
}
