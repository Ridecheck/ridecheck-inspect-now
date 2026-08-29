import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { Faq } from "@/components/landing/Faq";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCta } from "@/components/landing/StickyCta";

const TITLE = "Locations | RideCheck Vehicle Inspections";
const DESCRIPTION = "Mobile pre-purchase inspections across Melbourne and Sydney, with Adelaide coming soon.";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/locations" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div id="top" className="pb-20 sm:pb-0">
      <SiteHeader />
      <main>
        <ServiceArea />
        <Faq />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
