import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhatsIncluded } from "@/components/landing/WhatsIncluded";
import { SampleReport } from "@/components/landing/SampleReport";
import { Faq } from "@/components/landing/Faq";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCta } from "@/components/landing/StickyCta";
import inspectionCarAsset from "@/assets/inspection-car-m3.png.asset.json";
import { inspectionCategories } from "@/lib/ridecheck";

const TITLE = "How It Works | RideCheck Vehicle Inspections";
const DESCRIPTION = "Book online, we dispatch a local inspector, and you get a full report with photos and video.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div id="top" className="pb-20 sm:pb-0">
      <SiteHeader />
      <main>
        <HowItWorks />
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
        <SampleReport />
        <Faq />
        <ServiceArea />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
