"use client";

import * as React from "react";
import type { Language } from "@/lib/api";
import { content, type LocalizedContent } from "@/lib/content";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: LocalizedContent;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = React.useState<Language>("JP");
  const value = React.useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: content[lang] }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
