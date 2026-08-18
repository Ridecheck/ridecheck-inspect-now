import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BatteryCharging, Check, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { EvHero } from "@/components/landing/EvHero";
import { PackageCards } from "@/components/landing/PackageCards";
import { WhatsIncluded } from "@/components/landing/WhatsIncluded";

import evCar from "@/assets/ev-inspection-diagram.png.asset.json";
import { Reviews } from "@/components/landing/Reviews";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { StickyCta } from "@/components/landing/StickyCta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  evPackages,
  evReasons,
  evSteps,
  evFaqs,
  evInspectionCategories,
} from "@/lib/ridecheck";


const TITLE = "Used EV Inspections with Aviloo Battery Testing | RideCheck";
const DESCRIPTION =
  "Independent used EV and plug-in hybrid inspections in Melbourne and Sydney, including a certified Aviloo battery State of Health test. No dealer affiliations.";

export const Route = createFileRoute("/ev-inspections")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EvInspectionsPage,
});

function EvInspectionsPage() {
  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      <SiteHeader />

      <main>
        <EvHero />


        {/* Why battery health matters */}
        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">
              Why battery health <span className="text-signal">matters</span>
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {evReasons.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <BatteryCharging className="h-6 w-6 text-signal" aria-hidden />
                  <h3 className="mt-3 text-lg font-bold text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Aviloo tests */}
        <section className="bg-haze">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-soft sm:p-9">
              <FileText className="h-7 w-7 text-signal" aria-hidden />
              <h2 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">
                What the Aviloo test tells you
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Aviloo is the independent standard for EV battery diagnostics. Our
                inspector connects to the vehicle on site and reads the pack directly
                &mdash; not the dashboard estimate.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "State of Health (SoH %) — remaining usable capacity vs new",
                  "Degradation benchmarked against the same model and age",
                  "Real-world range today vs original factory range",
                  "Cell-level irregularities and warning signs",
                  "Official Aviloo battery health certificate (PDF) you keep",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="ev-packages" className="bg-background">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
                Choose your <span className="text-signal">EV package</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                EV bookings are a separate service &mdash; a standard inspection never
                includes battery testing.
              </p>
            </div>

            <div className="mt-12">
              <PackageCards packages={evPackages} ev ctaLabel="Book this package" />
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-signal/20 bg-signal/[0.06] px-5 py-4 text-sm text-ink/80">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />
              <p>
                Aviloo battery testing runs on limited days &mdash; we&rsquo;ll confirm
                your slot by SMS.
              </p>
            </div>

          </div>
        </section>

        {/* How it works */}
        <section className="bg-haze">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">
              How EV inspections <span className="text-signal">work</span>
            </h2>
            <ol className="mt-10 space-y-4">
              {evSteps.map((s, i) => (
                <li
                  key={s.title}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-signal text-sm font-extrabold text-signal-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{s.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <WhatsIncluded
          categories={evInspectionCategories}
          image={evCar.url}
          imageAlt="Electric vehicle inspection diagram showing battery, high-voltage and charging checks"
          heading={
            <>
              Every EV inspection covers the{" "}
              <span className="text-signal">battery and the basics</span>.
            </>
          }
          intro="Full pre-purchase inspection plus certified Aviloo battery testing — over 70 EV-specific checks."
          pointsLabel="70+ EV inspection points."
          bookSearch={{ type: "ev" }}
        />

        <Reviews />

        {/* FAQ */}

        <section className="bg-background">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">
              EV inspection <span className="text-signal">questions</span>
            </h2>
            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {evFaqs.map((faq) => (
                <AccordionItem
                  key={faq.q}
                  value={faq.q}
                  className="rounded-xl border border-border bg-card px-5 shadow-soft"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-ink">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-ink">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
            <h2 className="text-3xl font-extrabold text-ink-foreground sm:text-4xl">
              Know the battery before you buy
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-foreground/70">
              Certified Aviloo testing in Melbourne and Sydney. Limited slots each week
              &mdash; book the next available day.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-13 rounded-full px-8 text-base font-semibold shadow-soft"
            >
              <Link to="/book" search={{ type: "ev" }}>
                Book EV inspection
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>

        <ServiceArea />
      </main>

      <SiteFooter />
      <StickyCta />
    </div>
  );

}
