import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/landing/PagePlaceholder";

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
  }),
  component: Page,
});

function Page() {
  return <PagePlaceholder title="How It Works" intro={DESCRIPTION} />;
}
