export async function GET() {
  try {
    const res = await fetch(
      "https://api.stanneschaplaincy.com/api/daily-verse/",
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch verse" }, { status: 500 });
  }
}
