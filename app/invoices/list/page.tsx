import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import { deleteInvoice } from "../actions";
import DeleteDialog from "@/components/DeleteDialog";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import SortInvoiceForm from "@/components/SortInvoicesForm";
import EditDialogInvoice from "@/components/EditDialogInvoice";

type Search = {
  q?: string;
  sort?: "newest" | "oldest" | "high" | "low" | "soonest" | "late";
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;

  const q = (params.q ?? "").trim();
  const sort = (params.sort ?? "newest") as Search["sort"];
  //   const where = q
  //     ? {
  //         OR: [
  //           { name: { startsWith: q, mode: "insensitive" as const } },
  //           { email: { startsWith: q, mode: "insensitive" as const } },
  //         ],
  //       }
  //     : undefined;

  const orderBy =
    sort === "oldest"
      ? { createdAt: "asc" as const }
      : sort === "newest"
      ? { createdAt: "desc" as const }
      : sort === "high"
      ? [{ total: "desc" as const }]
      : sort === "low"
      ? [{ total: "asc" as const }]
      : sort === "soonest"
      ? [{ dueDate: "asc" as const }]
      : sort === "late"
      ? [{ dueDate: "desc" as const }]
      : { createdAt: "desc" as const };

  //   const invoices = await prisma.invoice.findMany({ where, orderBy });
  const invoices = await prisma.invoice.findMany({
    orderBy,
  });

  return (
    <>
      <Header />
      <SortInvoiceForm q={q} reset="invoices" />
      <div className="space-y-3 pt-10 px-5 max-w-3xl mx-auto">
        <ScrollArea className="h-[520px] overflow-hidden rounded-lg border border-white/10 bg-black/20">
          <h1 className="text-2xl font-bold mx-4 my-4">Customers</h1>
          <ul className="space-y-2">
            {invoices.map(async (invoice) => {
              const customer = await prisma.customer.findUnique({
                where: { id: invoice.customerId },
                select: {
                  name: true,
                  email: true,
                  address: true,
                  cif: true,
                  phone: true,
                },
              });
              return (
                <li
                  key={invoice.id}
                  className="flex items-center justify-between rounded bg-neutral-900/60 p-3 mx-3 my-3"
                >
                  <div>
                    <div className="font-semibold">{customer?.name}</div>
                    <div className="text-sm text-gray-300">
                      {invoice.total} | {invoice.status} |{" Due: "}
                      {invoice.dueDate.toDateString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {/* <EditDialogCustomer
                    formId={`edit-user-form-${invoice.id}`}
                    customerName={invoice.name ?? ""}
                    customerEmail={invoice.email ?? ""}
                    customerId={invoice.id ?? ""}
                    customerAddress={invoice.address ?? ""}
                    customerCif={invoice.cif ?? ""}
                    customerPhone={invoice.phone ?? ""}
                  /> */}
                    <EditDialogInvoice
                      invoiceId={invoice.id}
                      invoiceTotal={invoice.total}
                      invoiceDueDate={invoice.dueDate}
                    />
                    <form
                      action={deleteInvoice.bind(null, invoice.id)}
                      id={`delete-user-form-${invoice.id}`}
                    >
                      <DeleteDialog
                        formId={`delete-user-form-${invoice.id}`}
                        inputType="Invoice"
                      />
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </>
  );
}
