"use client";

import Link from "next/link";
import Logo from "../public/whitelogo.svg";
import BlackLogo from "../public/logo.svg";
import ActiveLink from "./ActiveLink";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-transparent backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-12">
        <Link href="/" className="flex items-center group">
          <img
            src={Logo.src}
            alt="Logo"
            className="absolute inset-0 h-40 w-40 object-contain transition-opacity duration-300 group-hover:opacity-0 translate-x-50 translate-y-3"
          />
          <img
            src={BlackLogo.src}
            alt="Logo"
            className="absolute inset-0 h-40 w-40 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 translate-x-50 translate-y-3"
          />
        </Link>

        <nav className="flex items-center gap-6 text-xl py-2">
          <ActiveLink href="/users">Users</ActiveLink>
          <ActiveLink href="/customers">Customers</ActiveLink>
          <ActiveLink href="/invoices">Invoices</ActiveLink>
          <ActiveLink href="/payments">Payments</ActiveLink>

          <div className="ml-6">
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="rounded bg-neutral-900 px-3 py-1 text-white hover:bg-neutral-800 text-base"
              >
                Logout
              </button>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
