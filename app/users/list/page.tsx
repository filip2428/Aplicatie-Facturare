import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import ListItems from "@/components/ListItems";
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

  const users = await prisma.user.findMany({ where, orderBy });

  return (
    <>
      <Header />
      <SortForm q={q} sort={sort} reset="users" />
      <ListItems users={users} />
    </>
  );
}
