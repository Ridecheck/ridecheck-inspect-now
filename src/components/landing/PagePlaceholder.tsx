import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCta } from "@/components/landing/StickyCta";

type PagePlaceholderProps = {
  title: string;
  intro: string;
};

export function PagePlaceholder({ title, intro }: PagePlaceholderProps) {
  return (
    <div className="pb-20 sm:pb-0">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="label-caps text-signal">RideCheck</p>
        <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base text-muted-foreground">{intro}</p>

        <div className="mt-8 rounded-2xl border border-dashed border-border bg-secondary/40 p-8">
          <p className="text-sm font-semibold text-ink">This page is coming soon.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Content for this section is being written. In the meantime you can
            book an inspection online in under two minutes.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-md font-semibold">
            <Link to="/book">
              Book Inspection
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
