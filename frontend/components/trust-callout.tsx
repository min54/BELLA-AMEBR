"use client";

import { useLanguage } from "@/components/language-provider";

export function TrustCallout() {
  const { t } = useLanguage();

  return (
    <section className="mb-16 border-y border-slate-200 py-10">
      <div className="grid gap-10 md:grid-cols-2 md:gap-0">
        <div className="md:pr-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">
            {t.trustLabel}
          </p>
          <p className="text-[15px] text-slate-700 leading-[1.8]">
            {t.trust}
          </p>
        </div>
        <div className="md:pl-10 md:border-l md:border-slate-200">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">
            {t.doctorLabel}
          </p>
          <p className="text-[15px] text-slate-700 leading-[1.8]">
            {t.doctor}
          </p>
        </div>
      </div>
    </section>
  );
}
