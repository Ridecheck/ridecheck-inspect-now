import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/landing/PagePlaceholder";

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
  }),
  component: Page,
});

function Page() {
  return <PagePlaceholder title="Pricing" intro={DESCRIPTION} />;
}
