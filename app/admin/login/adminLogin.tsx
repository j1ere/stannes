// admin/(protected)/login/adminLogin.tsx

"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { adminLoginAction } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-orange-500 text-white font-medium rounded-lg disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign in as Admin"}
    </button>
  );
}

export default function AdminLogin() {
  const [state, formAction] = useActionState(adminLoginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-orange-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage St. Anne's Chaplaincy
          </p>
        </div>

        {state?.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-700 text-sm">{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="redirect" value="/admin" />

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              name="email"
              type="email"
              required
              className="w-full pl-10 pr-3 py-3 border rounded-lg"
              placeholder="admin@stannes.com"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              name="password"
              type="password"
              required
              className="w-full pl-10 pr-3 py-3 border rounded-lg"
              placeholder="Password"
            />
          </div>

          <SubmitButton />
        </form>

        <p className="text-center text-sm">
          <Link href="/" className="text-green-600 hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
