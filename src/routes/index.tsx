import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { BookingWizard } from "@/components/landing/BookingWizard";
import { Packages } from "@/components/landing/Packages";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhatsIncluded } from "@/components/landing/WhatsIncluded";
import inspectionCarAsset from "@/assets/hero-inspection-diagram.png.asset.json";
import { inspectionCategories } from "@/lib/ridecheck";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { RecentlyInspected } from "@/components/landing/RecentlyInspected";
import { InspectionVideos } from "@/components/landing/InspectionVideos";
import { Reviews } from "@/components/landing/Reviews";
import { Faq } from "@/components/landing/Faq";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCta } from "@/components/landing/StickyCta";
import { faqs, PHONE_DISPLAY } from "@/lib/ridecheck";

const TITLE = "Pre-Purchase Car Inspection Melbourne & Sydney | RideCheck";
const DESCRIPTION =
  "Independent mobile pre-purchase car inspections in Melbourne and Sydney. Same-day report with 90+ photos, video and free PPSR. No dealer associations. From $299.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutomotiveBusiness",
          name: "RideCheck Vehicle Inspections",
          description: DESCRIPTION,
          telephone: PHONE_DISPLAY,
          areaServed: ["Melbourne", "Sydney"],
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
  component: Index,
});

function Index() {
  return (
    <div id="top" className="pb-20 sm:pb-0">
      <SiteHeader />
      <main>
        <Hero />
        <BookingWizard />
        <Packages />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <WhatsIncluded
          categories={inspectionCategories}
          image={inspectionCarAsset.url}
          imageAlt="Silver BMW M3 sedan diagram highlighting the inspected area"

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
        <ServiceArea />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
