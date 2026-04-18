"use client";

import { motion } from "motion/react";
import { CheckCircle2, Gift, UserCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function BenefitsRequirements() {
  const { t } = useLanguage();

  return (
    <section className="grid gap-6 md:grid-cols-2 mb-16">
      <motion.div
        whileHover={{ y: -4 }}
        className="p-6 rounded-2xl border border-rose-100 bg-white shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1.5 rounded-lg bg-rose-50">
            <Gift className="w-4 h-4 text-rose-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{t.benefitsTitle}</h3>
        </div>
        <ul className="space-y-4">
          {t.benefits.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-slate-600"
            >
              <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 pt-4 border-t border-rose-50 text-xs text-slate-400 leading-relaxed">
          {t.benefitsNote}
        </p>
      </motion.div>

      <motion.div
        whileHover={{ y: -4 }}
        className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="p-1.5 rounded-lg bg-slate-100">
            <UserCheck className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{t.requirementsTitle}</h3>
        </div>
        <ul className="space-y-4">
          {t.requirements.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-3 text-slate-600"
            >
              <div className="w-5 h-5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-rose-500">
                  {i + 1}
                </span>
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
