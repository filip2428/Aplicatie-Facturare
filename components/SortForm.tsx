import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Search = {
  q?: string;
  sort?: "newest" | "oldest" | "az" | "za";
  reset?: "users" | "customers";
};

export default function SortForm({ sort, q, reset }: Search) {
  return (
    <form
      method="GET"
      className="flex w-fit mx-auto items-center gap-2 rounded-md border border-white/10 bg-neutral-900/40 p-2 text-sm"
    >
      <Input
        id="q"
        name="q"
        defaultValue={q}
        placeholder="Search…"
        className="h-8 w-48 px-2 text-sm"
      />
      <select
        name="sort"
        defaultValue={sort}
        className="h-8 rounded-md border bg-neutral-900 px-2 text-sm"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="az">A–Z</option>
        <option value="za">Z–A</option>
      </select>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="h-8 px-3 text-sm"
      >
        Apply
      </Button>
      <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-sm">
        <a href={`/${reset}/list`}>Reset</a>
      </Button>
    </form>
  );
}
