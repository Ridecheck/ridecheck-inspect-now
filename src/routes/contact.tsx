import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/landing/PagePlaceholder";

const TITLE = "Contact | RideCheck Vehicle Inspections";
const DESCRIPTION = "Talk to our team about a booking, a report or an inspection in your area.";

export const Route = createFileRoute("/contact")({
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
  return <PagePlaceholder title="Contact RideCheck" intro={DESCRIPTION} />;
}
