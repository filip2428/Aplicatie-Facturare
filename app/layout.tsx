import type { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from "./providers/SessionProvider";

export const metadata: Metadata = {
  title: "EasyInvoice",
  description: "Your money. Our responsibility",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900 to-red-800 text-white">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
