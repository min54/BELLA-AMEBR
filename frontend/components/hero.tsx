"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/components/language-provider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <header className="mb-12">
      <div className="rounded-3xl overflow-hidden mb-8 group">
        <img
          src="/model.png"
          alt="Bella Korea Clinic Ambassador"
          className="w-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-rose-50 text-rose-500 border border-rose-200">
          Ambassador
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          {t.title}
        </h1>
        <h2 className="text-lg text-slate-500 font-medium">{t.subtitle}</h2>
      </motion.div>
    </header>
  );
}
