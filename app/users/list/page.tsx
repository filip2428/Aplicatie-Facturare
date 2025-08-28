import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import { deleteUser, editUser, type EditUserState } from "../actions";
import DeleteDialog from "@/components/DeleteDialog";
import EditDialog from "@/components/EditDialog";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header />
      <div className="space-y-3 pt-10 px-5 max-w-3xl mx-auto">
        <ScrollArea className="h-[520px] overflow-hidden rounded-lg border border-white/10 bg-black/20">
          <h1 className="text-2xl font-bold mx-4 my-4">Users</h1>
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between rounded bg-neutral-900/60 p-3 mx-3 my-3"
              >
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-300">{user.email}</div>
                </div>
                <div className="flex space-x-2">
                  <EditDialog
                    formId={`edit-user-form-${user.id}`}
                    userName={user.name ?? ""}
                    userEmail={user.email ?? ""}
                    userId={user.id ?? ""}
                  />
                  <form
                    action={deleteUser.bind(null, user.id)}
                    id={`delete-user-form-${user.id}`}
                  >
                    <DeleteDialog formId={`delete-user-form-${user.id}`} />
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
