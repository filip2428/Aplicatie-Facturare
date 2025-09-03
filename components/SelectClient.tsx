import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectClient({
  customers,
}: {
  customers: Array<{ id: string; name: string; email: string }>;
}) {
  return (
    <Select name="customer" required>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a customer" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900">
        <SelectGroup>
          <SelectLabel className="text-neutral-100">Customers</SelectLabel>
          {customers.map((customer) => (
            <SelectItem
              value={customer.id}
              key={customer.id}
              className="text-neutral-50"
            >
              {customer.name} | {customer.email}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
