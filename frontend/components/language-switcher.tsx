"use client";

import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/api";

const LANGS: Language[] = ["KR", "JP"];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex justify-end mb-8 sticky top-4 z-50">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-full p-1 shadow-sm flex gap-1">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              lang === l
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:text-slate-900",
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
