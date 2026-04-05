// login/loginForm.tsx
"use client"

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Key } from "lucide-react";
import { useFormStatus } from "react-dom";
import { loginAction } from "./actions";
import ForgotPasswordModal from "./ForgotPasswordModal";   // ← New component


type State = {
  error?: string;
} | null;


type LoginFormProps = {
  reset: boolean;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-3 px-4 rounded-lg font-medium"
    >
      {pending ? "Signing In..." : "Sign In"}
    </button>
  );
}

export default function LoginForm({ reset }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);

    const [state, formAction] = useActionState(loginAction, null);
    const { pending } = useFormStatus();


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 flex items-center justify-center p-4">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                {/* ... your decorative divs ... */}
            </div>

            {/* Back to Home */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium">Back to Home</span>
            </Link>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-600 mt-2">Sign in to access your CSA account</p>
                    </div>

                    {state?.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                            <p className="text-red-600 text-sm">{state.error}</p>
                        </div>
                    )}
                     {/* ✅ Reset success alert */}
                      {reset && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                          <p className="text-green-700 text-sm">
                            Password reset successful! You can now sign in with your new password.
                          </p>
                        </div>
                      )}


                    <form action={formAction} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowForgotModal(true)}
                                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        <SubmitButton />
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                            Sign up here
                        </Link>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <ForgotPasswordModal 
                isOpen={showForgotModal} 
                onClose={() => setShowForgotModal(false)} 
            />
        </div>
    );
}