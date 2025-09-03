import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Search = {
  q?: string;
  sort?: "newest" | "oldest" | "high" | "low";
  reset?: "users" | "customers" | "invoices" | undefined;
};

export default function SortForm({ sort, q, reset }: Search) {
  return (
    <form
      method="GET"
      className="flex w-fit mx-auto items-center gap-2 rounded-md border border-white/10 bg-neutral-900/40 p-2 text-sm"
    >
      <select
        name="sort"
        defaultValue={sort}
        className="h-8 rounded-md border bg-neutral-900 px-2 text-sm"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="high">Highest Invoice</option>
        <option value="low">Lowest Invoice</option>
        <option value="soonest">Soon Due Date</option>
        <option value="late">Late Due Date</option>
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
