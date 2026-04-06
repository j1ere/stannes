"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

type State = {
  error?: string;
  success?: string;
} | null;

type Props = {
  uid: string;
  token: string;
};

async function resetPasswordAction(
  prevState: State,
  formData: FormData,
  uid: string,
  token: string,
): Promise<State> {
  const newPassword = formData.get("new_password");
  const confirmPassword = formData.get("confirm_password");

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const res = await fetch(
    `https://api.stanneschaplaincy.com/auth/reset-password/${uid}/${token}/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    },
  );

  const data = await res.json();

  if (res.ok) {
    // Redirect to login with success message
    redirect("/login?reset=success");
  } else {
    return { error: data.error || "Failed to reset password" };
  }
}

export default function ResetPasswordForm({ uid, token }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, formAction] = useActionState(
    (prevState: State, formData: FormData) =>
      resetPasswordAction(prevState, formData, uid, token),
    null,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-bounce"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-gray-600 mt-2">
              Create a new password for your account
            </p>
          </div>

          {state?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600 text-sm">{state.error}</p>
            </div>
          )}

          <form action={formAction} className="space-y-6">
            {/* New Password */}
            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="new_password"
                  name="new_password"
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
