import Header from "@/components/Header";
import DeleteDialog from "@/components/DeleteDialog";
import EditDialogCustomer from "@/app/customers/list/components/EditDialogCustomer";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import SortForm from "@/components/SortForm";
import { apiGetCustomers } from "@/lib/api/customers";

type Search = {
  q?: string;
  sort?: "newest" | "oldest" | "az" | "za";
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const params = searchParams;

  const q = (params.q ?? "").trim();
  const sort = (params.sort ?? "newest") as Search["sort"];

  const res = await apiGetCustomers({ q, sort });
  if (!res.ok) {
    throw new Error(res.error);
  }
  const { customers } = res;

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
                  <DeleteDialog inputType="Customer" itemId={customer.id} />
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
