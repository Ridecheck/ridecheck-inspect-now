import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BookingConfirmationEmail } from "@/lib/email-templates/booking-confirmation";
import { InternalJobAlertEmail } from "@/lib/email-templates/internal-job-alert";
import type { BookingEmailData } from "@/lib/email-templates/types";
import { cn } from "@/lib/utils";

const TITLE = "Email preview | RideCheck";
const DESCRIPTION = "Internal preview of RideCheck booking emails.";

export const Route = createFileRoute("/email-preview")({
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
  component: Page,
});

const SAMPLES: Record<string, { label: string; data: BookingEmailData }> = {
  asap: {
    label: "ASAP · Standard",
    data: {
      reference: "RC-4821",
      customerName: "Alex Nguyen",
      customerEmail: "alex.nguyen@example.com",
      customerPhone: "0412 998 771",
      vehicle: "2019 Mazda CX-5 Akera",
      suburb: "Preston",
      state: "VIC",
      timing: "ASAP — next available",
      packageName: "Standard Inspection",
      packagePrice: 299,
      addOns: [],
      total: 299,
      notes: "",
    },
  },
  scheduled: {
    label: "Scheduled · EV + add-on",
    data: {
      reference: "RC-4837",
      customerName: "Priya Sharma",
      customerEmail: "priya.sharma@example.com",
      customerPhone: "0433 210 654",
      vehicle: "2022 Tesla Model 3 Long Range",
      suburb: "Newtown",
      state: "NSW",
      timing: "Thursday 30 July — Morning (8am – 12pm)",
      packageName: "EV Inspection + Aviloo Battery Test",
      packagePrice: 489,
      addOns: [{ name: "Video Walkthrough", price: 50 }],
      total: 539,
      notes: "Seller only available before 10am. Car is in a basement car park.",
    },
  },
};

type TemplateKey = "customer" | "internal";

function Page() {
  const [sample, setSample] = useState<keyof typeof SAMPLES>("asap");
  const [template, setTemplate] = useState<TemplateKey>("customer");
  const [html, setHtml] = useState<string>("");

  const data = SAMPLES[sample].data;

  const element = useMemo(
    () =>
      template === "customer" ? (
        <BookingConfirmationEmail {...data} />
      ) : (
        <InternalJobAlertEmail {...data} />
      ),
    [template, data],
  );

  useEffect(() => {
    let active = true;
    setHtml("");
    import("@react-email/render").then(async ({ render }) => {
      const out = await render(element, { pretty: false });
      if (active) setHtml(out);
    });
    return () => {
      active = false;
    };
  }, [element]);

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Internal preview
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Booking emails</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Exactly what sends after a successful payment. Nothing on this page is
          delivered — it renders the same templates the live flow will use.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="inline-flex rounded-full border bg-background p-1">
            {(
              [
                ["customer", "Customer confirmation"],
                ["internal", "Internal job alert"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTemplate(key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  template === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="inline-flex rounded-full border bg-background p-1">
            {(Object.keys(SAMPLES) as (keyof typeof SAMPLES)[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSample(key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  sample === key
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {SAMPLES[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-[600px] overflow-hidden rounded-2xl border bg-background shadow-sm">
            <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-3">
              <span className="text-xs font-semibold text-muted-foreground">
                {template === "customer"
                  ? `To: ${data.customerEmail}`
                  : "To: ops@ridecheck"}
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                {template === "customer"
                  ? `Your inspection is booked — ${data.reference}`
                  : `New job ${data.reference}`}
              </span>
            </div>
            {html ? (
              <iframe
                title="Email preview"
                srcDoc={html}
                className="h-[900px] w-full border-0 bg-white"
              />
            ) : (
              <div className="flex h-[900px] items-center justify-center text-sm text-muted-foreground">
                Rendering…
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
