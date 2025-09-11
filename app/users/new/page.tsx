"use client";

import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { apiCreateUser } from "@/lib/api/users";
import { useState } from "react";

export default function CreateUserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const result = await apiCreateUser({
      name: name.trim(),
      email: email.trim(),
    });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
    router.push("/users");
  }

  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Create User
      </h1>
      <form
        onSubmit={onSubmit}
        className="text-center space-y-4 max-w-md mx-auto p-6 bg-neutral-800/60 rounded-xl"
      >
        <label className="block text-left">
          Name:
          <Input
            name="name"
            placeholder="Username"
            type="text"
            className="mt-2"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block text-left">
          Email:
          <Input
            name="email"
            placeholder="xyz@email.com"
            type="email"
            className="mt-2"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <div className="text-right">
          <button
            type="submit"
            className={`border-1 mt-2 px-4 py-2 rounded bg-red-800 hover:bg-red-900 text-white align-right ${
              pending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={pending}
          >
            {pending ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
      {error && (
        <p className="text-center text-red-500 font-semibold mt-4">{error}</p>
      )}
    </>
  );
}
