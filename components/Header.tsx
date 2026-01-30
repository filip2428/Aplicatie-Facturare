"use client";

import Link from "next/link";
import Logo from "../public/whitelogo.svg";
import BlackLogo from "../public/logo.svg";
import ActiveLink from "./ActiveLink";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

function formatName(name?: string | null) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export default function Header() {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);

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
          {/* <ActiveLink href="/users">Users</ActiveLink> */}
          <ActiveLink href="/customers">Customers</ActiveLink>
          <ActiveLink href="/invoices">Invoices</ActiveLink>
          <ActiveLink href="/payments">Payments</ActiveLink>
          <ActiveLink href="/chat">AI Assistant</ActiveLink>

          <div className="ml-6">
            {session ? (
              <InteractiveHoverButton
                onClick={() => signOut({ callbackUrl: "/login" })}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="inline-flex min-w-[130px]  gap-2 rounded-full border  bg-white/5 px-4 py-1.5 text-sm text-white/90 hover:bg-rose-500/20 hover:border-rose-500 hover:text-white transition"
              >
                <span
                  className={`h-2 w-2 rounded-full transition ${
                    isHovered ? "bg-rose-400" : "bg-emerald-400"
                  }`}
                />
                {isHovered
                  ? "Sign Out"
                  : `Hello, ${formatName(session?.user?.name)}`}
              </InteractiveHoverButton>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
