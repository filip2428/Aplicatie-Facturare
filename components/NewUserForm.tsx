import { Input } from "@/components/ui/input";
// import { createUser } from "../app/users/actions";

export default function NewUserForm({
  children = null,
}: {
  children?: React.ReactNode;
}) {
  return (
    <form className="text-center space-y-4 max-w-md mx-auto p-6 bg-neutral-800/60 rounded-xl">
      <label className="block text-left">
        Name:
        <Input
          name="name"
          placeholder="Name Surname"
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
      {children}
      <div className="text-right">
        <button
          type="submit"
          className="border-1 mt-2 px-4 py-2 rounded bg-red-800 hover:bg-red-900 text-white align-right"
        >
          Add User
        </button>
      </div>
    </form>
  );
}
