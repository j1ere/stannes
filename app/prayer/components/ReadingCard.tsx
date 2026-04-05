// prayer/components/ReadingCard.tsx
import Link from "next/link";

const SECTION_ACCENTS: Record<string, { border: string; label: string; bg: string }> = {
  "Reading I":               { border: "border-amber-500",  label: "text-amber-700 dark:text-amber-400",  bg: "bg-amber-50 dark:bg-amber-950/20"  },
  "Responsorial Psalm":      { border: "border-green-600",  label: "text-green-700 dark:text-green-400",  bg: "bg-green-50 dark:bg-green-950/20"  },
  "Reading II":              { border: "border-orange-500", label: "text-orange-700 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/20" },
  "Verse Before the Gospel": { border: "border-sky-500",    label: "text-sky-700 dark:text-sky-400",      bg: "bg-sky-50 dark:bg-sky-950/20"      },
  "Gospel":                  { border: "border-red-600",    label: "text-red-700 dark:text-red-500",      bg: "bg-red-50 dark:bg-red-950/20"      },
};

const DEFAULT_ACCENT = {
  border: "border-stone-400",
  label: "text-stone-600 dark:text-stone-400",
  bg: "bg-stone-50 dark:bg-stone-900/20",
};

function slugify(section: string) {
  return section.toLowerCase().replace(/\s+/g, "-");
}

function getExcerpt(text: string, maxLen = 120) {
  // Strip leading "R ..." refrain lines for the excerpt
  const clean = text.replace(/^R[\s\xa0][^\n]*\n?/, "").trim();
  const first = clean.split("\n").find((l) => l.trim().length > 20) ?? clean;
  return first.trim().length > maxLen
    ? first.trim().slice(0, maxLen).trimEnd() + "…"
    : first.trim();
}

type ReadingCardProps = {
  section: string;
  reference: string;
  text: string;
};

export default function ReadingCard({ section, reference, text }: ReadingCardProps) {
  const accent = SECTION_ACCENTS[section] ?? DEFAULT_ACCENT;
  const slug = slugify(section);
  const excerpt = getExcerpt(text);

  return (
    <Link
      href={`/prayer/reading/${slug}`}
      className={`
        group relative flex flex-col
        bg-white dark:bg-stone-900
        border border-stone-200 dark:border-stone-700
        border-l-4 ${accent.border}
        rounded-2xl overflow-hidden
        hover:shadow-md transition-all duration-200
        hover:-translate-y-0.5
      `}
    >
      {/* Coloured header strip */}
      <div className={`px-5 pt-5 pb-4 ${accent.bg}`}>
        <span className={`text-xs font-semibold tracking-widest uppercase ${accent.label}`}>
          {section}
        </span>
        <h3 className="mt-1 text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug">
          {reference}
        </h3>
      </div>

      {/* Excerpt */}
      <div className="px-5 py-4 flex-1">
        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed italic">
          "{excerpt}"
        </p>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-4">
        <span className={`text-xs font-medium ${accent.label} group-hover:underline underline-offset-2`}>
          Read full text →
        </span>
      </div>
    </Link>
  );
}