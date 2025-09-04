"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative transition-colors ${
        isActive ? "text-red-500" : "text-white hover:text-gray-600"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-red-500"></span>
      )}
    </Link>
  );
}
