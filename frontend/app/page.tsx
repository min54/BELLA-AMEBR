import { ApplyForm } from "@/components/apply-form";
import { BenefitsRequirements } from "@/components/benefits-requirements";
import { Faq } from "@/components/faq";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LineCta } from "@/components/line-cta";
import { SiteFooter } from "@/components/site-footer";
import { TrustCallout } from "@/components/trust-callout";

export default function HomePage() {
  return (
    <main className="min-h-screen font-sans max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <LanguageSwitcher />
      <Hero />
      <TrustCallout />
      <BenefitsRequirements />
      <Gallery />
      <Faq />
      <ApplyForm />
      <LineCta />
      <SiteFooter />
    </main>
  );
}
