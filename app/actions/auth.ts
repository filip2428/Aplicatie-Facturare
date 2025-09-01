// "use server";

// import { SignJWT, jwtVerify } from "jose";
// import bcrypt from "bcrypt";
// import { PrismaClient } from "@prisma/client";
// import { cookies } from "next/headers";
// // import { redirect } from "next/dist/server/api-utils";
// import { redirect } from "next/navigation";

// const prisma = new PrismaClient();

// // cheie JWT
// const secret = new TextEncoder().encode(
//   process.env.AUTH_SECRET ?? "dev-secret-schimba"
// );

// export async function loginAction(_prev: unknown, formData: FormData) {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");

//   // 1) caută admin
//   const admin = await prisma.admin.findUnique({
//     where: { email },
//     select: { id: true, email: true, passwordHash: true, name: true },
//   });
//   if (!admin) return { error: "Email not found." };

//   // 2) verifică parola
//   if (!admin?.passwordHash) {
//     return { error: "Incorrect password." };
//   }

//   const ok = await bcrypt.compare(password, admin.passwordHash);
//   if (!ok) return { error: "Email sau parolă incorecte." };

//   // 3) semnează JWT
//   const token = await new SignJWT({ aid: admin.id, email: admin.email })
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(secret);

//   // 4) setează cookie (OBS: await cookies())
//   const jar = await cookies();
//   jar.set("session", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 zile
//   });

//   return { error: null };
// }

// export async function logoutAction() {
//   const jar = await cookies();
//   jar.delete("session");
//   redirect("/login");
// }

// export async function getSessionAdmin() {
//   const jar = await cookies();
//   const token = jar.get("session")?.value;
//   if (!token) return null;

//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return { id: payload.aid as string, email: payload.email as string };
//   } catch {
//     return null;
//   }
// }
