// app/login/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

type SP = Promise<{
  error?: string | string[];
  callbackUrl?: string | string[];
}>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/"); // deja logat

  // 👇 Next 15: trebuie să aștepți searchParams
  const sp = await searchParams;
  const error = Array.isArray(sp.error) ? sp.error[0] : sp.error;
  const callbackUrl =
    (Array.isArray(sp.callbackUrl) ? sp.callbackUrl[0] : sp.callbackUrl) ?? "/";

  return (
    <div className="min-h-[100svh] flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md p-6">
        <h1 className="text-lg font-semibold mb-4 text-center">Sign in</h1>

        {error && (
          <div className="mb-4 rounded-md border border-red-800/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {error === "CredentialsSignin"
              ? "Email sau parolă incorecte."
              : "Eroare la autentificare."}
          </div>
        )}

        <LoginForm defaultCallbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
