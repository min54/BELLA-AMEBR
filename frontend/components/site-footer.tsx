"use client";

import { Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const WEBSITE_URL = "https://renovoh.net/";
const ADDRESS_LABEL = "서울특별시 마포구 양화로 176 동교동 와이즈파크 5층 (홍대입구역 8번 출구)";
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_LABEL,
)}`;

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="pt-12 border-t border-slate-100 text-center">
      <div className="flex justify-center gap-6 mb-8">
        <a
          href={WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
          className="text-slate-400 hover:text-slate-900 transition-colors"
        >
          <Globe className="w-5 h-5" />
        </a>
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Location: ${ADDRESS_LABEL}`}
          className="text-slate-400 hover:text-slate-900 transition-colors"
        >
          <MapPin className="w-5 h-5" />
        </a>
      </div>
      <p className="text-xs text-slate-400 mb-2">{ADDRESS_LABEL}</p>
      <p className="text-sm text-slate-400">{t.footer}</p>
    </footer>
  );
}
