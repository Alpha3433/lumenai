import React from "react";
import { Columns2, Columns3 } from "lucide-react";

const GENERIC_PROMPT_POINTS = [
  { ok: false, text: "Unstructured, messy output" },
  { ok: false, text: "Manual formatting required" },
  { ok: false, text: "No embedded business insight" },
  { ok: false, text: "Copy-paste to docs/spreadsheets" },
  { ok: false, text: "Time-consuming review process" },
  { ok: false, text: "Can't repeat with consistent quality" },
];

const LUMEN_PLATFORM_POINTS = [
  { ok: true, text: "Structured business plan (sections, charts, rationale)" },
  { ok: true, text: "Auto-formatting & export options" },
  { ok: true, text: "Strategic scoring and actionable insights" },
  { ok: true, text: "One-click updates & shareable links" },
  { ok: true, text: "Fast, repeatable, & reliable results" },
  { ok: true, text: "Expert templates & AI guidance built-in" },
];

const ComparisonSection = () => (
  <section className="py-20 px-4 bg-gradient-to-b from-[#F1F0FB] to-white dark:from-gray-950/80 dark:to-gray-900">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block mb-4 px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
          Why Lumen AI is Different
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Same Prompt, Smarter Output
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          See how our purpose-built platform goes beyond basic AI prompts—saving you hours and delivering real, measurable business value.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Generic LLM Prompt Side */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg flex flex-col p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-2">
              <Columns2 className="h-6 w-6 text-gray-400" />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
              Generic AI Language Model
            </span>
          </div>
          {/* Begin Video Box */}
          <div className="mb-6 w-full rounded-xl overflow-hidden shadow aspect-video bg-black">
            <iframe
              src="https://player.vimeo.com/video/1077299488?h=52c03e4c37&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1"
              title="Untitled video - Made with Clipchamp (4)"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              className="w-full h-full pointer-events-none"
              allowFullScreen
            />
          </div>
          {/* End Video Box */}
          <ul className="space-y-4 flex-1 mb-4">
            {GENERIC_PROMPT_POINTS.map((pt, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <svg width="20" height="20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#F87171" strokeWidth="2" fill="#FEF2F2" />
                  <line x1="7" y1="7" x2="13" y2="13" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
                  <line x1="13" y1="7" x2="7" y2="13" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{pt.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <div className="bg-red-50 dark:bg-gray-900/20 py-2 px-3 rounded text-sm text-red-500 text-center font-medium">
              Frustrating and labor-intensive.
            </div>
          </div>
        </div>
        {/* Lumen AI Platform Side */}
        <div className="relative bg-gradient-to-br from-purple-100 via-blue-50 to-white dark:from-purple-800/50 dark:via-blue-900/30 dark:to-gray-950 rounded-2xl border border-purple-200 dark:border-purple-700 shadow-2xl flex flex-col p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-purple-200 dark:bg-purple-800/50 p-2">
              <Columns3 className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-semibold text-purple-700 dark:text-purple-100 text-lg">
              Lumen AI
            </span>
          </div>
          <ul className="space-y-4 flex-1 mb-4">
            {LUMEN_PLATFORM_POINTS.map((pt, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <svg width="20" height="20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#4ADE80" strokeWidth="2" fill="#F0FDF4" />
                  <path d="M6 11l3 3 5-5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{pt.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <div className="bg-green-50 dark:bg-green-900/20 py-2 px-3 rounded text-sm text-green-600 text-center font-medium">
              Professional and truly effective.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ComparisonSection;
