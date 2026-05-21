"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AnnouncementBanner() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div
      className="w-full py-3 px-4 text-center text-sm font-medium"
      style={{ backgroundColor: "var(--fp-surface)", color: "var(--fp-text-muted)", borderBottom: "1px solid var(--fp-border)" }}
    >
      <span className="opacity-70" style={{ color: "var(--fp-text)" }}>New paths added — </span>
      Boxing, Martial Arts, and Athletic Performance are now live.{" "}
      <Link
        href="/paths"
        className="underline underline-offset-2 hover:opacity-70 transition-opacity"
        style={{ color: "var(--fp-accent)" }}
      >
        Explore now →
      </Link>
    </div>
  );
}
