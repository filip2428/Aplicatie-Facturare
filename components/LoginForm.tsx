"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm({
  defaultCallbackUrl = "/users",
}: {
  defaultCallbackUrl?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setErr(null);
        setPending(true);

        const fd = new FormData(e.currentTarget);
        const email = String(fd.get("email") ?? "");
        const password = String(fd.get("password") ?? "");

        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: defaultCallbackUrl,
        });

        setPending(false);

        if (res?.ok) {
          router.push(res.url ?? defaultCallbackUrl);
        } else {
          setErr("Incorrect email or password.");
        }
      }}
      className="space-y-3"
    >
      {err && (
        <div className="rounded-md border border-red-800/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {err}
        </div>
      )}

      <Input
        name="email"
        type="email"
        placeholder="you@example.com"
        className="h-9"
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="••••••••"
        className="h-9"
        required
      />
      <Button type="submit" className="w-full h-9" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
