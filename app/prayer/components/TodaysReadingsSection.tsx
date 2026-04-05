// prayer/components/TodaysReadingsSection.tsx
// Drop this server component into prayer/page.tsx in place of the hardcoded section.
// It fetches from your Django API and renders ReadingCard for each reading.

import ReadingCard from "./ReadingCard";

interface Reading {
  section: string;
  reference: string;
  reference_url: string;
  text: string;
}

interface ReadingsData {
  date: string;
  feast: string;
  lectionary: string;
  readings: Reading[];
}

async function getReadings(): Promise<ReadingsData> {
  const res = await fetch(
    "https://chaplaincyb.onrender.com/api/calendar/daily/",
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch readings");
  return res.json();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function TodaysReadingsSection() {
  const data = await getReadings();

  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-950 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 mb-2">
            {formatDate(data.date)}
          </p>
          <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
            Today's Mass Readings
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-500">
            {data.feast} &middot; {data.lectionary}
          </p>
        </div>

        {/* Reading cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.readings.map((reading, index) => (
            <ReadingCard
              key={`${reading.section}-${index}`}
              section={reading.section}
              reference={reading.reference}
              text={reading.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
