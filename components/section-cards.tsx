import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export async function SectionCards() {
  const totalCustomers = await prisma.customer.count();
  const totalUsers = await prisma.user.count();
  const totalAmountPaid = await prisma.invoice.aggregate({
    _sum: { amountPaid: true },
  });
  const totalAmountIssued = await prisma.invoice.aggregate({
    _sum: { total: true },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-4 max-w-350 mx-auto">
      <Card className="bg-neutral-900 border border-red-800/60 shadow-lg rounded-xl text-white flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="text-red-400 font-semibold">
            Total Amount Issued Using EasyInvoice
          </CardDescription>
          <CardTitle className="text-3xl font-bold mt-2 text-white">
            {totalAmountIssued._sum.total ?? 0}{" "}
            <span className="text-red-500">RON</span>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-neutral-900 border border-red-800/60 shadow-lg rounded-xl text-white flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="text-red-400 font-semibold">
            Total Amount Paid Using EasyInvoice
          </CardDescription>
          <CardTitle className="text-3xl font-bold mt-2 text-white">
            {totalAmountPaid._sum.amountPaid ?? 0}{" "}
            <span className="text-red-500">RON</span>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-neutral-900 border border-red-800/60 shadow-lg rounded-xl text-white flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="text-red-400 font-semibold">
            Total Customers
          </CardDescription>
          <CardTitle className="text-3xl font-bold mt-2 text-white">
            {totalCustomers}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-neutral-900 border border-red-800/60 shadow-lg rounded-xl text-white flex flex-col justify-between">
        <CardHeader>
          <CardDescription className="text-red-400 font-semibold">
            Active Accounts
          </CardDescription>
          <CardTitle className="text-3xl font-bold mt-2 text-white">
            {totalUsers}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
