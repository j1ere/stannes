// app/prayer/readings/page.tsx
// Route: /prayer/readings

import { BookOpen, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import ShareButton from "./ShareButton";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Cache: revalidate at UTC midnight
───────────────────────────────────────────── */
function secondsUntilMidnightUTC(): number {
  const now = new Date();
  const midnight = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );
  return Math.max(60, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

async function getReadings(): Promise<ReadingsData> {
  const res = await fetch(
    "https://api.stanneschaplaincy.com/api/calendar/daily/",
    { next: { revalidate: secondsUntilMidnightUTC() } }
  );
  if (!res.ok) throw new Error("Failed to fetch readings");
  return res.json();
}

/* ─────────────────────────────────────────────
   SEO — generateMetadata
   Gospel reference + opening text as the
   description so every share preview leads
   with what the Gospel is about.
───────────────────────────────────────────── */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getReadings();

    const gospel = data.readings.find((r) => r.section === "Gospel");

    // First ~200 chars of Gospel text, newlines collapsed to spaces
    const gospelSnippet = gospel
      ? gospel.text.replace(/\n+/g, " ").trim().slice(0, 200) + "…"
      : "Read today's Catholic daily readings.";

    const title = gospel
      ? `${gospel.reference} — ${data.feast}`
      : `Daily Readings · ${formatDate(data.date)}`;

    const description = gospel
      ? `Gospel: ${gospel.reference} · ${gospelSnippet}`
      : gospelSnippet;

    const url = "https://stanneschaplaincy.com/prayer/readings";
    const siteName = "St. Anne's Chaplaincy";

    return {
      title,
      description,
      keywords: [
        "Catholic daily readings",
        "Mass readings today",
        data.feast,
        data.lectionary,
        "Bible readings",
        "lectionary",
        "USCCB readings",
        "daily Scripture",
      ],
      authors: [{ name: siteName }],
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: "/images/chaplaincylogo-removebg-preview.png",
            width: 1200,
            height: 630,
            alt: "St. Anne's Catholic Chaplaincy Church at Maseno University – Archdiocese of Kisumu",
          },
        ],
        siteName,
        locale: "en_US",
        type: "article",
        publishedTime: data.date,
        section: "Religion & Spirituality",
        tags: ["Catholic", "Bible", "Lectionary", data.feast],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        site: "@StAnnesChaplaincy",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      },
    };
  } catch {
    return {
      title: "Daily Readings — St. Anne's Chaplaincy",
      description: "Read today's Catholic daily readings.",
    };
  }
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const SECTION_ACCENTS: Record<string, string> = {
  "Reading I":               "border-amber-500  text-amber-700  dark:text-amber-400",
  "Responsorial Psalm":      "border-green-600  text-green-700  dark:text-green-400",
  "Reading II":              "border-orange-500 text-orange-700 dark:text-orange-400",
  "Verse Before the Gospel": "border-sky-500    text-sky-700    dark:text-sky-400",
  Gospel:                    "border-red-600    text-red-700    dark:text-red-500",
};
const DEFAULT_ACCENT = "border-stone-400 text-stone-600 dark:text-stone-400";

function getAccent(section: string) {
  return SECTION_ACCENTS[section] ?? DEFAULT_ACCENT;
}

/* ─────────────────────────────────────────────
   Psalm renderer
   Splits on double newlines → stanzas, then
   single newlines → verse lines with <br />.
   Refrains (lines starting "R ") get bold italic.
───────────────────────────────────────────── */
function PsalmText({ text }: { text: string }) {
  const stanzas = text
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {stanzas.map((stanza, si) => {
        const isRefrain = /^R[\s\xa0]/.test(stanza);
        const lines = stanza.split("\n").map((l) => l.trim()).filter(Boolean);

        if (isRefrain) {
          return (
            <p
              key={si}
              className="font-semibold italic leading-loose text-stone-700 dark:text-stone-300 text-[1.2rem]"
            >
              {lines.map((line, li) => (
                <span key={li}>
                  {line}
                  {li < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          );
        }

        return (
          <p key={si} className="text-stone-800 dark:text-stone-200 leading-loose text-[1.2rem]">
            {lines.map((line, li) => (
              <span key={li}>
                {line}
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Generic reading renderer
   Paragraphs separated by double newlines;
   lines within each paragraph broken with <br />.
───────────────────────────────────────────── */
function ReadingText({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5">
      {paragraphs.map((para, pi) => {
        const isRubric =
          para.startsWith("Here all") || para.startsWith("The passion");
        const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);

        if (isRubric) {
          return (
            <p
              key={pi}
              className="text-[1.1rem] italic text-stone-500 dark:text-stone-500 border-l-2 border-stone-300 dark:border-stone-600 pl-3 leading-loose"
            >
              {lines.map((line, li) => (
                <span key={li}>
                  {line}
                  {li < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          );
        }

        return (
          <p
            key={pi}
            className="text-stone-800 dark:text-stone-200 leading-[2] text-[1.2rem]"
          >
            {lines.map((line, li) => (
              <span key={li}>
                {line}
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Reading card
───────────────────────────────────────────── */
function ReadingCard({ reading, index }: { reading: Reading; index: number }) {
  const accent = getAccent(reading.section);
  const [borderClass] = accent.split(" ");
  const isPsalm = reading.section === "Responsorial Psalm";

  return (
    <article
      className={`
        relative bg-white dark:bg-stone-900
        border border-stone-200 dark:border-stone-700
        rounded-2xl overflow-hidden
        border-l-4 ${borderClass}
      `}
    >
      <header className="px-6 pt-6 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span
              className={`text-xs font-semibold tracking-widest uppercase ${accent.split(" ").slice(1).join(" ")}`}
            >
              {reading.section}
            </span>
            <h2 className="mt-1 text-lg font-semibold text-stone-900 dark:text-stone-100">
              {reading.reference}
            </h2>
          </div>
          {reading.reference_url && (
            <a
              href={reading.reference_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                shrink-0 flex items-center gap-1.5
                text-xs font-medium
                text-stone-500 dark:text-stone-400
                hover:text-stone-900 dark:hover:text-stone-100
                border border-stone-200 dark:border-stone-700
                rounded-full px-3 py-1.5
                transition-colors duration-150
              "
            >
              <BookOpen className="w-3 h-3" />
              Open Bible
            </a>
          )}
        </div>
      </header>

      <div className="px-6 py-6">
        {isPsalm ? (
          <PsalmText text={reading.text} />
        ) : (
          <ReadingText text={reading.text} />
        )}
      </div>

      <span
        className="
          absolute top-4 right-5
          text-7xl font-bold leading-none
          text-stone-100 dark:text-stone-800
          select-none pointer-events-none
        "
        aria-hidden="true"
      >
        {index + 1}
      </span>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Structured data (JSON-LD)
───────────────────────────────────────────── */
function StructuredData({ data }: { data: ReadingsData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.feast} — Daily Readings`,
    description: `Catholic daily Mass readings for ${formatDate(data.date)}: ${data.feast}.`,
    datePublished: data.date,
    dateModified: data.date,
    author: { "@type": "Organization", name: "St. Anne's Chaplaincy" },
    publisher: {
      "@type": "Organization",
      name: "St. Anne's Chaplaincy",
      url: "https://stanneschaplaincy.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://stanneschaplaincy.com/prayer/readings",
    },
    about: data.readings.map((r) => ({
      "@type": "Thing",
      name: r.reference,
      description: r.section,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default async function ReadingsPage() {
  const data = await getReadings();

  const shareText = `📖 Today's Catholic readings — ${data.feast}\n${formatDate(data.date)}\n\nRead here:`;
  const shareUrl = "https://stanneschaplaincy.com/prayer/readings";

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <StructuredData data={data} />

      {/* Top nav */}
      <nav className="sticky top-0 z-20 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/prayer"
            className="
              flex items-center gap-1.5
              text-sm text-stone-500 dark:text-stone-400
              hover:text-stone-900 dark:hover:text-stone-100
              transition-colors duration-150
            "
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-stone-300 dark:text-stone-700 select-none">/</span>
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300 truncate">
            Daily Readings
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Page header */}
        <header className="mb-10">
          <p className="text-sm tracking-widest uppercase text-stone-400 dark:text-stone-500 mb-2">
            {formatDate(data.date)}
          </p>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50 leading-snug">
            {data.feast}
          </h1>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-500">
            {data.lectionary}
          </p>

          {/* Quick-jump pill nav */}
          <nav aria-label="Jump to reading" className="mt-6 flex flex-wrap gap-2">
            {data.readings.map((r, i) => {
              const accent = getAccent(r.section);
              const [borderClass] = accent.split(" ");
              return (
                <a
                  key={i}
                  href={`#reading-${i}`}
                  className={`
                    text-xs font-medium
                    border-b-2 ${borderClass}
                    text-stone-600 dark:text-stone-400
                    hover:text-stone-900 dark:hover:text-stone-100
                    pb-0.5 transition-colors duration-150
                  `}
                >
                  {r.section}
                </a>
              );
            })}
          </nav>
        </header>

        {/* Reading cards */}
        <div className="space-y-8">
          {data.readings.map((reading, i) => (
            <div key={i} id={`reading-${i}`}>
              <ReadingCard reading={reading} index={i} />
            </div>
          ))}
        </div>

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

      {/* Floating share button (client component) */}
      <ShareButton shareText={shareText} shareUrl={shareUrl} feast={data.feast} />
    </div>
  );
}