import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/landing/PagePlaceholder";

const TITLE = "FAQs | RideCheck Vehicle Inspections";
const DESCRIPTION = "Answers to the most common questions about our pre-purchase vehicle inspections.";

export const Route = createFileRoute("/faqs")({
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
  return <PagePlaceholder title="Frequently Asked Questions" intro={DESCRIPTION} />;
}
