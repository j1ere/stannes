// app/verify-email/[uid]/[token]/page.tsx

import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = await params;

  const res = await fetch(
    `https://chaplaincyb.onrender.com/auth/verify-email/${uid}/${token}/`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (res.ok) {
    redirect("/?verified=true");
  } else {
    redirect(
      `/verify-failed?error=${encodeURIComponent(data.error || "Verification failed")}`,
    );
  }
}
