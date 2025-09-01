import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
// import { deleteUser, editUser, type EditUserState } from "../actions";
import { deleteCustomer } from "../actions";
import DeleteDialog from "@/components/DeleteDialog";
import EditDialogCustomer from "@/components/EditDialogCustomer";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import SortForm from "@/components/SortForm";

type Search = {
  q?: string;
  sort?: "newest" | "oldest" | "az" | "za";
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;

  const q = (params.q ?? "").trim();
  const sort = (params.sort ?? "newest") as Search["sort"];
  const where = q
    ? {
        OR: [
          { name: { startsWith: q, mode: "insensitive" as const } },
          { email: { startsWith: q, mode: "insensitive" as const } },
        ],
      }
    : undefined;

  const orderBy =
    sort === "oldest"
      ? { createdAt: "asc" as const }
      : sort === "newest"
      ? { createdAt: "desc" as const }
      : sort === "az"
      ? [{ name: "asc" as const }, { email: "asc" as const }]
      : sort === "za"
      ? [{ name: "desc" as const }, { email: "desc" as const }]
      : { createdAt: "desc" as const };

  const customers = await prisma.customer.findMany({ where, orderBy });

  return (
    <>
      <Header />
      <SortForm q={q} sort={sort} reset="customers" />
      <div className="space-y-3 pt-10 px-5 max-w-3xl mx-auto">
        <ScrollArea className="h-[520px] overflow-hidden rounded-lg border border-white/10 bg-black/20">
          <h1 className="text-2xl font-bold mx-4 my-4">Customers</h1>
          <ul className="space-y-2">
            {customers.map((customer) => (
              <li
                key={customer.id}
                className="flex items-center justify-between rounded bg-neutral-900/60 p-3 mx-3 my-3"
              >
                <div>
                  <div className="font-semibold">{customer.name}</div>
                  <div className="text-sm text-gray-300">{customer.email}</div>
                </div>
                <div className="flex space-x-2">
                  <EditDialogCustomer
                    formId={`edit-user-form-${customer.id}`}
                    customerName={customer.name ?? ""}
                    customerEmail={customer.email ?? ""}
                    customerId={customer.id ?? ""}
                    customerAddress={customer.address ?? ""}
                    customerCif={customer.cif ?? ""}
                    customerPhone={customer.phone ?? ""}
                  />
                  <form
                    action={deleteCustomer.bind(null, customer.id)}
                    id={`delete-user-form-${customer.id}`}
                  >
                    <DeleteDialog
                      formId={`delete-user-form-${customer.id}`}
                      inputType="Customer"
                    />
                  </form>
                </div>
              </li>
            ))}
          </ul>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </>
  );
}
