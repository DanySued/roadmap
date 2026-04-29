"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fp-theme");
    if (stored === "light") {
      document.documentElement.classList.add("light");
      setLight(true);
    }
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("fp-theme", next ? "light" : "dark");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: 10,
        border: "1px solid var(--fp-border-2)",
        background: "transparent",
        color: "var(--fp-text-muted)",
        cursor: "pointer",
        transition: "border-color 0.2s, color 0.2s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--fp-accent)";
        e.currentTarget.style.color = "var(--fp-accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--fp-border-2)";
        e.currentTarget.style.color = "var(--fp-text-muted)";
      }}
    >
      {light ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
