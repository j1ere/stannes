export default function VerifyFailedPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div>
      <h1>Verification Failed</h1>
      <p>{searchParams.error}</p>
    </div>
  );
}