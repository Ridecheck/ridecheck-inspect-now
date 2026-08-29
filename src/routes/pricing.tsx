import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Packages } from "@/components/landing/Packages";
import { WhatsIncluded } from "@/components/landing/WhatsIncluded";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Faq } from "@/components/landing/Faq";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCta } from "@/components/landing/StickyCta";
import inspectionCarAsset from "@/assets/inspection-car-m3.png.asset.json";
import { inspectionCategories } from "@/lib/ridecheck";

const TITLE = "Pricing | RideCheck Vehicle Inspections";
const DESCRIPTION = "Straightforward inspection pricing with no hidden fees. Standard from $299, Premium from $379.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div id="top" className="pb-20 sm:pb-0">
      <SiteHeader />
      <main>
        <Packages />
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
        <HowItWorks />
        <Faq />
        <ServiceArea />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
