import Header from "@/components/Header";
import { Input } from "@/components/ui/input";

export default function CustomersPage() {
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Customers Page
      </h1>
      <form className="text-center space-y-4 max-w-md mx-auto p-6 bg-neutral-800/60 rounded-xl">
        <label className="block text-left">
          Name:
          <Input placeholder="Customer Name" type="text" className="mt-2" />
        </label>
        <label className="block text-left">
          Email:
          <Input placeholder="Customer Email" type="text" className="mt-2" />
        </label>
        <div className="text-right">
          <button
            type="submit"
            className="border-1 mt-2 px-4 py-2 rounded bg-red-800 hover:bg-red-900 text-white align-right"
          >
            Add Customer
          </button>
        </div>
      </form>
    </>
  );
}
