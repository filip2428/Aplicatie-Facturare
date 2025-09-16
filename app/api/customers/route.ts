import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";
import {
  deleteCustomer,
  createCustomer,
  editCustomer,
  buildOrderBy,
  buildWhere,
} from "@/server/customers/customer.service";
import {
  DeleteCustomerSchema,
  CreateCustomerSchema,
  EditCustomerSchema,
} from "@/server/customers/customer.schemas";

export async function DELETE(request: Request) {
  try {
    const json = await request.json();
    const body = DeleteCustomerSchema.parse(json);
    const result = await deleteCustomer(body.id);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    revalidatePath("/customers");
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = CreateCustomerSchema.parse(json);
    const result = await createCustomer(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    revalidatePath("/customers");
    return NextResponse.json(
      { ok: true, customer: result.customer },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const json = await request.json();
    const body = EditCustomerSchema.parse(json);
    const result = await editCustomer(body);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 409 }
      );
    }
    revalidatePath("/customers");
    return NextResponse.json(
      { ok: true, customer: result.customer },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const first = error.issues[0];
      const msg = first ? `${first.message}` : "Validation failed";

      return NextResponse.json(
        { ok: false, error: msg, details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: (error as Error).message ?? "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;

  const where = buildWhere(q);
  const orderBy = buildOrderBy(sort);

  const customers = await prisma.customer.findMany({ where, orderBy });

  return NextResponse.json({ ok: true, customers }, { status: 200 });
}
