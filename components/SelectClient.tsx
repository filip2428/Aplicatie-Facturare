import { prisma } from "@/lib/prisma";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function SelectClient() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a customer" />
      </SelectTrigger>
      <SelectContent className="bg-neutral-900">
        <SelectGroup>
          <SelectLabel className="text-neutral-100">Customers</SelectLabel>
          {customers.map((customer) => {
            return (
              <SelectItem
                value={customer.name}
                key={customer.id}
                className="text-neutral-50"
              >
                {customer.name} | {customer.email}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
