"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/components/language-provider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <header className="mb-12">
      <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden mb-8 group">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070"
          alt="Clinic Interior"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          {t.title}
        </h1>
        <h2 className="text-lg text-slate-500 font-medium">{t.subtitle}</h2>
      </motion.div>
    </header>
  );
}
