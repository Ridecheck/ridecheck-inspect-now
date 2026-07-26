import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/landing/PagePlaceholder";

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
  }),
  component: Page,
});

function Page() {
  return <PagePlaceholder title="Locations" intro={DESCRIPTION} />;
}
