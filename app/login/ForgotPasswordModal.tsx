"use client";

import { useState, useActionState, useEffect } from "react";
import { X, Mail, CheckCircle } from "lucide-react";
import { useFormStatus } from "react-dom"; // ✅ Add useFormStatus here

type State = { message?: string; error?: string } | null;

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [state, formAction] = useActionState(forgotPasswordAction, null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset when modal is closed/opened
  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      setEmail("");
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Reset Password</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          {/* Success Message */}
          {state?.message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>{state.message}</div>
            </div>
          )}

          {/* Error Message */}
          {state?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitted}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Submit Button - Now directly inside the form */}
            <SubmitButton isSubmitted={isSubmitted} />
          </form>
        </div>

        <div className="p-6 border-t text-center">
          <button
            onClick={handleClose}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

// ✅ Correct Submit Button - Must be inside <form>
function SubmitButton({ isSubmitted }: { isSubmitted: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || isSubmitted}
      className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
                ${
                  isSubmitted
                    ? "bg-green-600 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }
                ${pending ? "opacity-90 cursor-wait" : ""}
                disabled:cursor-not-allowed
            `}
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Sending Reset Link...
        </>
      ) : isSubmitted ? (
        <>
          <CheckCircle className="w-5 h-5" />
          Link Sent Successfully
        </>
      ) : (
        "Send Reset Link"
      )}
    </button>
  );
}

// Server Action
async function forgotPasswordAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const email = formData.get("email");

  const res = await fetch(
    "https://api.stanneschaplaincy.com/auth/forgot-password/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    },
  );

  const data = await res.json();

  if (res.ok) {
    return { message: data.message };
  } else {
    return { error: data.error || "Something went wrong" };
  }
}
