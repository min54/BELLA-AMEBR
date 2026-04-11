"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function LineCta() {
  const { t } = useLanguage();
  const lineUrl = process.env.NEXT_PUBLIC_LINE_URL ?? "#";

  return (
    <div className="flex justify-center mb-16">
      <motion.a
        href={lineUrl}
        target={lineUrl === "#" ? undefined : "_blank"}
        rel={lineUrl === "#" ? undefined : "noopener noreferrer"}
        whileHover={{ y: -4 }}
        className="flex items-center gap-3 px-8 py-4 bg-[#06C755] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
      >
        <MessageCircle className="w-6 h-6" />
        {t.lineContact}
      </motion.a>
    </div>
  );
}
