import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { BookingWizard } from "@/components/landing/BookingWizard";
import { Packages } from "@/components/landing/Packages";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhatsIncluded } from "@/components/landing/WhatsIncluded";
import inspectionCarAsset from "@/assets/inspection-car-m3.png.asset.json";
import { inspectionCategories } from "@/lib/ridecheck";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { RecentlyInspected } from "@/components/landing/RecentlyInspected";
import { InspectionVideos } from "@/components/landing/InspectionVideos";
import { Reviews } from "@/components/landing/Reviews";
import { Faq } from "@/components/landing/Faq";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCta } from "@/components/landing/StickyCta";
import { faqs, PHONE_DISPLAY } from "@/lib/ridecheck";

const TITLE = "Pre-Purchase Car Inspection Sydney | RideCheck";
const DESCRIPTION =
  "Independent mobile pre-purchase car inspections across Greater Sydney. Same-day report with 90+ photos, video and free PPSR. No dealer associations. From $299.";

export const Route = createFileRoute("/sydney")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sydney" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sydney" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutomotiveBusiness",
          name: "RideCheck Vehicle Inspections Sydney",
          description: DESCRIPTION,
          telephone: PHONE_DISPLAY,
          areaServed: ["Sydney"],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "350",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: SydneyPage,
});

function SydneyPage() {
  return (
    <div id="top" className="pb-20 sm:pb-0">
      <SiteHeader />
      <main>
        <Hero city="sydney" />
        <BookingWizard city="sydney" />
        <Packages />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <WhatsIncluded
          categories={inspectionCategories}
          image={inspectionCarAsset.url}
          imageAlt="Red BMW M3 Competition with the inspected area highlighted"
          heading={
            <>
              Every <span className="text-signal">RideCheck</span> inspection is
              thorough. And it shows.
            </>
          }
          intro="We inspect 100+ points across every key area of the vehicle, so you know exactly what you're buying."
        />
        <RecentlyInspected />
        <InspectionVideos />
        <div id="reviews">
          <Reviews />
        </div>
        <div id="faq">
          <Faq />
        </div>
        <ServiceArea city="sydney" />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
