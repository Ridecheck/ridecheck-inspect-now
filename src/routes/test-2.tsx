import { createFileRoute } from "@tanstack/react-router";
import { AvailabilityFirstHero } from "@/components/landing/AvailabilityFirstHero";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { StickyCta } from "@/components/landing/StickyCta";
import {
  TestTwoClosingCta,
  TestTwoPackages,
  TestTwoProcess,
  TestTwoProof,
  TestTwoReviewsFaq,
} from "@/components/landing/TestTwoSections";

const TITLE = "RideCheck Compact Landing Page Test 2";
const DESCRIPTION =
  "Internal comparison of a compact, availability-led RideCheck landing page for mobile pre-purchase inspections.";

export const Route = createFileRoute("/test-2")({
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
  component: TestTwoLanding,
});

function TestTwoLanding() {
  return (
    <div id="top" className="pb-20 sm:pb-0">
      <SiteHeader />
      <main>
        <AvailabilityFirstHero layout="reference" />
        <TestTwoProcess />
        <TestTwoPackages />
        <TestTwoProof />
        <ServiceArea />
        <TestTwoReviewsFaq />
        <TestTwoClosingCta />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}