// app/check-email/page.tsx
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function CheckEmailPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {/* Optional background decorations */}
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-white/20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <Mail className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">Check Your Email</h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            We&apos;ve sent a verification link to <br />
            <span className="font-medium text-gray-900">{email}</span>
          </p>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Click the link in the email to verify your account.<br />
              The link will expire in 24 hours.
            </p>

            <div className="pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}