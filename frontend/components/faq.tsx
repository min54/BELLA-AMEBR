"use client";

import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Faq() {
  const { t } = useLanguage();

  return (
    <section className="my-16">
      <h3 className="text-xl font-bold mb-8">{t.faqTitle}</h3>
      <div className="space-y-2">
        {t.faqs.map((faq) => (
          <details
            key={faq.q}
            className="group border border-slate-100 rounded-xl overflow-hidden bg-white"
          >
            <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors list-none">
              <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90 shrink-0" />
              <span className="text-slate-900 font-medium">{faq.q}</span>
            </summary>
            <div className="px-4 pb-4 pl-11 text-slate-600 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
