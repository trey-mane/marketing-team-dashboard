"use client";

export default function SprintButton() {
  return (
    <a
      href="https://www.michelettimedia.com/gotwatts30daysprint"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-80"
      style={{
        background: "linear-gradient(135deg, #F97316, #EF4444)",
        color: "#fff",
        textDecoration: "none",
        boxShadow: "0 0 16px #F9731640",
      }}
    >
      ⚡ Current 30 Day Sprint
    </a>
  );
}
