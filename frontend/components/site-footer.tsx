"use client";

import { Globe, Instagram, MapPin } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const INSTAGRAM_URL = "https://www.instagram.com/bellakorea_clinic/";
const WEBSITE_URL = "https://renovoh.net/";
// TODO: replace with real clinic address
const ADDRESS_LABEL = "서울특별시 강남구 테헤란로 123";
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_LABEL,
)}`;

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="pt-12 border-t border-slate-100 text-center">
      <div className="flex justify-center gap-6 mb-8">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-slate-400 hover:text-slate-900 transition-colors"
        >
          <Instagram className="w-5 h-5" />
        </a>
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
