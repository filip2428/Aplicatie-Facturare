import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createUser, editUser, deleteUser } from "@/server/user.service";
import {
  CreateUserSchema,
  EditUserSchema,
  DeleteUserSchema,
} from "@/server/user.schemas";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = CreateUserSchema.parse(json);
    const result = await createUser(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    revalidatePath("/users");
    return NextResponse.json({ ok: true, user: result.user }, { status: 201 });
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
    const body = EditUserSchema.parse(json);
    const result = await editUser(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    revalidatePath("/users");
    return NextResponse.json({ ok: true, user: result.user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const json = await request.json();
    const body = DeleteUserSchema.parse(json);
    const result = await deleteUser(body.id);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    revalidatePath("/users");
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
