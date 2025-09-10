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
  searchParams: Search;
}) {
  const q = (searchParams.q ?? "").trim();
  const sort = (searchParams.sort ?? "newest") as Search["sort"];

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
      ? [{ createdAt: "asc" as const }, { id: "asc" as const }]
      : sort === "newest"
      ? [{ createdAt: "desc" as const }, { id: "desc" as const }]
      : sort === "az"
      ? [
          { name: "asc" as const },
          { email: "asc" as const },
          { id: "asc" as const },
        ]
      : [
          { name: "desc" as const },
          { email: "desc" as const },
          { id: "desc" as const },
        ];

  const users = await prisma.user.findMany({ where, orderBy });

  return (
    <>
      <Header />
      <SortForm q={q} sort={sort} reset="users" />
      <ListItems users={users} />
    </>
  );
}
