"use client";

import { Camera } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const IMAGES = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
];

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section className="my-16">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
        <Camera className="w-5 h-5 text-slate-900" />
        {t.galleryTitle}
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-2xl group cursor-pointer"
          >
            <img
              src={src}
              alt={`Clinic ${i + 1}`}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
