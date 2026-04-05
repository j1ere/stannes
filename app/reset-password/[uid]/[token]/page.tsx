// app/reset-password/[uid]/[token]/page.tsx
import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = await params; // unwrap the promise
  return <ResetPasswordForm uid={uid} token={token} />;
}