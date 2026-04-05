// app/prayer/reading/[type]/page.tsx
// IMPORTANT: This file must be at EXACTLY this path, with square brackets:
//   app/prayer/reading/[type]/page.tsx
// Create the folder with: mkdir -p "app/prayer/reading/[type]"

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, BookOpen } from "lucide-react";

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

const SECTION_ACCENTS: Record<string, string> = {
  "Reading I": "border-amber-500  text-amber-700  dark:text-amber-400",
  "Responsorial Psalm": "border-green-600  text-green-700  dark:text-green-400",
  "Reading II": "border-orange-500 text-orange-700 dark:text-orange-400",
  "Verse Before the Gospel":
    "border-sky-500    text-sky-700    dark:text-sky-400",
  Gospel: "border-red-600    text-red-700    dark:text-red-500",
};

const DEFAULT_ACCENT = "border-stone-400 text-stone-600 dark:text-stone-400";

function slugify(section: string) {
  return section.toLowerCase().replace(/\s+/g, "-");
}

function getAccent(section: string) {
  return SECTION_ACCENTS[section] ?? DEFAULT_ACCENT;
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

function ReadingText({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => {
        const isRefrain = /^R[\s\xa0]/.test(para);
        const isRubric =
          para.startsWith("Here all") || para.startsWith("The passion");

        if (isRefrain) {
          return (
            <p
              key={i}
              className="font-semibold text-stone-700 dark:text-stone-300 italic leading-relaxed text-[1.125rem]"
            >
              {para}
            </p>
          );
        }
        if (isRubric) {
          return (
            <p
              key={i}
              className="text-base italic text-stone-500 dark:text-stone-500 border-l-2 border-stone-300 dark:border-stone-600 pl-3"
            >
              {para}
            </p>
          );
        }
        return (
          <p
            key={i}
            className="text-stone-800 dark:text-stone-200 leading-[1.9] text-[1.125rem]"
          >
            {para}
          </p>
        );
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const data = await getReadings();
  return data.readings.map((r) => ({ type: slugify(r.section) }));
}

// ── Next.js 15: params is a Promise ──────────────────────────────────────────
export default async function ReadingPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params; // ← await here for Next.js 15
  const data = await getReadings();

  const reading = data.readings.find((r) => slugify(r.section) === type);
  if (!reading) notFound();

  const accent = getAccent(reading.section);
  const [borderClass] = accent.split(" ");

  const currentIndex = data.readings.findIndex(
    (r) => slugify(r.section) === type,
  );
  const prev = currentIndex > 0 ? data.readings[currentIndex - 1] : null;
  const next =
    currentIndex < data.readings.length - 1
      ? data.readings[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Sticky nav */}
      <nav className="sticky top-0 z-20 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/prayer"
            className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-150"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-stone-300 dark:text-stone-700 select-none">
            /
          </span>
          <Link
            href="/prayer/readings"
            className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-150"
          >
            All readings
          </Link>
          <span className="text-stone-300 dark:text-stone-700 select-none">
            /
          </span>
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300 truncate">
            {reading.section}
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Page header */}
        <header className="mb-10">
          <p className="text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 mb-1">
            {data.feast}
          </p>
          <span
            className={`text-xs font-semibold tracking-widest uppercase ${accent.split(" ").slice(1).join(" ")}`}
          >
            {reading.section}
          </span>
          <h1 className="mt-1 text-3xl font-bold text-stone-900 dark:text-stone-50 leading-snug">
            {reading.reference}
          </h1>
          {reading.reference_url && (
            <a
              href={reading.reference_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-full px-3 py-1.5 transition-colors duration-150"
            >
              <BookOpen className="w-3 h-3" />
              Open in Bible
            </a>
          )}
        </header>

        {/* Reading text card */}
        <article
          className={`
            bg-white dark:bg-stone-900
            border border-stone-200 dark:border-stone-700
            border-l-4 ${borderClass}
            rounded-2xl px-6 py-8
          `}
        >
          <ReadingText text={reading.text} />
        </article>

        {/* Prev / Next navigation */}
        <nav
          aria-label="Reading navigation"
          className="mt-10 flex items-center justify-between gap-4"
        >
          {prev ? (
            <Link
              href={`/prayer/reading/${slugify(prev.section)}`}
              className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-150"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>
                <span className="block text-xs text-stone-400 dark:text-stone-600">
                  Previous
                </span>
                {prev.section}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/prayer/reading/${slugify(next.section)}`}
              className="flex items-center gap-1.5 text-sm text-right text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-150"
            >
              <span>
                <span className="block text-xs text-stone-400 dark:text-stone-600">
                  Next
                </span>
                {next.section}
              </span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </Link>
          ) : (
            <span />
          )}
        </nav>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-stone-200 dark:border-stone-800 text-center">
          <p className="text-xs text-stone-400 dark:text-stone-600">
            Readings from the{" "}
            <a
              href="https://bible.usccb.org/daily-bible-reading"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              United States Conference of Catholic Bishops
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
