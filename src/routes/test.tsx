import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { AvailabilityFirstHero } from "@/components/landing/AvailabilityFirstHero";
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

const TITLE = "RideCheck Availability-First Layout Test";
const DESCRIPTION =
  "Internal layout test of the availability-first RideCheck landing page: check your suburb, see inspection dates, pick a package and book.";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestLanding,
});

function TestLanding() {
  return (
    <div id="top" className="pb-20 sm:pb-0">
      <SiteHeader />
      <main>
        <AvailabilityFirstHero />
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
        <ServiceArea />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
