// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" }, // nu scriem sesiuni în DB; folosim JWT

  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        const email = (creds?.email ?? "").toString().trim().toLowerCase();
        const password = (creds?.password ?? "").toString();
        if (!email || !password) return null;

        // include explicit passwordHash ca să fie tipul corect
        const user = await prisma.admin.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, passwordHash: true },
        });
        if (!user?.passwordHash) return null;

        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;

        // Minim pentru JWT & session
        return { id: user.id, email: user.email, name: user.name ?? null };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as any).id; // atașăm id-ul în JWT la login
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) (session.user as any).id = token.id; // expunem id în session.user.id
      return session;
    },
  },

  pages: {
    signIn: "/login", // pagina ta de login din App Router
  },

  secret: process.env.NEXTAUTH_SECRET,
};
