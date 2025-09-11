import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  deleteInvoice,
  createInvoice,
  editInvoice,
} from "@/server/invoices/invoice.service";
import {
  DeleteInvoiceSchema,
  EditInvoiceSchema,
  CreateInvoiceSchema,
} from "@/server/invoices/invoice.schemas";

export async function DELETE(request: Request) {
  try {
    const json = await request.json();
    const body = DeleteInvoiceSchema.parse(json);
    const result = await deleteInvoice(body.id);
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
    const body = CreateInvoiceSchema.parse(json);
    const result = await createInvoice(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    revalidatePath("/invoices");
    return NextResponse.json(
      { ok: true, invoice: result.invoice },
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
    const body = EditInvoiceSchema.parse(json);
    const result = await editInvoice(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    revalidatePath("/invoices");
    return NextResponse.json(
      { ok: true, invoice: result.invoice },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
