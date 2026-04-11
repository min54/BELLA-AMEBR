import type { Metadata } from "next";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://funny-lebkuchen-57b10a.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "2026 Bella Korea Clinic Ambassador",
  description:
    "한국 거주 일본인을 위한 Bella Korea Clinic 2026 공식 앰배서더 모집 — プレミアムビューティージャーニー",
  openGraph: {
    title: "2026 Bella Korea Clinic Ambassador",
    description:
      "한국 거주 일본인을 위한 Bella Korea Clinic 2026 공식 앰배서더 모집",
    type: "website",
    locale: "ja_JP",
    alternateLocale: ["ko_KR"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
