"use client";

// app/prayer/readings/ShareButton.tsx
// Floating share button — uses Web Share API on mobile,
// falls back to a popover with individual platform links on desktop.

import { useState, useRef, useEffect } from "react";
import { Share2, X, Copy, Check } from "lucide-react";

interface ShareButtonProps {
  shareUrl: string;
  shareText: string;
  feast: string;
}

const platforms = [
  {
    name: "WhatsApp",
    color: "hover:bg-green-50 dark:hover:bg-green-950 hover:text-green-700 dark:hover:text-green-400",
    icon: (
      // WhatsApp SVG icon
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.523 5.855L.057 23.882a.5.5 0 0 0 .612.612l6.086-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.855 9.855 0 0 1-5.032-1.378l-.36-.214-3.733.894.929-3.654-.235-.376A9.855 9.855 0 0 1 2.1 12C2.1 6.532 6.532 2.1 12 2.1c5.468 0 9.9 4.432 9.9 9.9 0 5.468-4.432 9.9-9.9 9.9z"/>
      </svg>
    ),
    getUrl: (text: string, url: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    name: "Telegram",
    color: "hover:bg-sky-50 dark:hover:bg-sky-950 hover:text-sky-600 dark:hover:text-sky-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    getUrl: (text: string, url: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    name: "Twitter / X",
    color: "hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    getUrl: (text: string, url: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    name: "Facebook",
    color: "hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-400",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    getUrl: (_: string, url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
];

export default function ShareButton({ shareUrl, shareText, feast }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleShare() {
    // Try native Web Share API first (great on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Daily Readings — ${feast}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or API failed — fall through to popover
      }
    }
    setOpen((v) => !v);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = `${shareText} ${shareUrl}`;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popover */}
      {open && (
        <div
          className="
            bg-white dark:bg-stone-900
            border border-stone-200 dark:border-stone-700
            rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-stone-950/50
            p-3 w-52
            animate-in fade-in slide-in-from-bottom-2 duration-150
          "
          role="dialog"
          aria-label="Share this page"
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-semibold tracking-wider uppercase text-stone-400 dark:text-stone-500">
              Share readings
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-0.5">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.getUrl(shareText, shareUrl)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3
                  w-full px-3 py-2.5 rounded-xl
                  text-sm font-medium
                  text-stone-600 dark:text-stone-400
                  transition-colors duration-100
                  ${p.color}
                `}
              >
                {p.icon}
                {p.name}
              </a>
            ))}

            {/* Divider */}
            <div className="my-1 border-t border-stone-100 dark:border-stone-800" />

            {/* Copy link */}
            <button
              onClick={handleCopy}
              className="
                flex items-center gap-3
                w-full px-3 py-2.5 rounded-xl
                text-sm font-medium
                text-stone-600 dark:text-stone-400
                hover:bg-stone-100 dark:hover:bg-stone-800
                hover:text-stone-900 dark:hover:text-stone-100
                transition-colors duration-100
              "
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={handleShare}
        aria-label="Share daily readings"
        aria-expanded={open}
        className="
          flex items-center gap-2
          bg-white dark:bg-stone-900
          border border-stone-200 dark:border-stone-700
          text-stone-700 dark:text-stone-300
          hover:bg-stone-50 dark:hover:bg-stone-800
          rounded-full px-4 py-2.5
          shadow-md shadow-stone-200/60 dark:shadow-stone-950/60
          text-sm font-medium
          transition-colors duration-150
          active:scale-95
        "
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
    </div>
  );
}