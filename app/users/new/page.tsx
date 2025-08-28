"use client";

import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { createUser, type CreateUserState } from "../actions";
import { useActionState } from "react";

export default function CreateUserPage() {
  const [state, formAction, isPending] = useActionState<
    CreateUserState,
    FormData
  >(createUser, {});

  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-extrabold tracking-tight py-10">
        Create User Page
      </h1>
      <form
        action={formAction}
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
          />
        </label>
        <div className="text-right">
          <button
            type="submit"
            className={`mt-2 px-4 py-2 rounded text-white border 
    ${
      isPending
        ? "bg-gray-500 cursor-not-allowed opacity-70"
        : "bg-red-800 hover:bg-red-900"
    }`}
            disabled={isPending}
          >
            Add User
          </button>
        </div>
      </form>
      {state.error && (
        <p className="text-center text-red-500 font-semibold mt-4">
          {state.error}
        </p>
      )}
    </>
  );
}
