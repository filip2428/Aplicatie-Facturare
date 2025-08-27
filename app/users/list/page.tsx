import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import { deleteUser } from "../actions";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  console.log(users);

  return (
    <>
      <Header />
      <div className="space-y-3 pt-10 px-5 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Users</h1>
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between rounded bg-neutral-900/60 p-3"
            >
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-300">{user.email}</div>
              </div>
              <div className="flex space-x-2">
                <form action={deleteUser.bind(null, user.id)}>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-red-800 hover:bg-red-900 text-white text-sm"
                  >
                    Delete User
                  </button>
                </form>
                <form>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-blue-800 hover:bg-blue-900 text-white text-sm"
                  >
                    Edit User
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
