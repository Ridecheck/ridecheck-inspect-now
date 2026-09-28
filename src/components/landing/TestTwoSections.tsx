import {
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  ClipboardCheck,
  FileText,
  MapPin,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroCar from "@/assets/hero-red-bmw-m3.jpg";
import { faqs, GOOGLE_REVIEWS_URL, packages, reviews } from "@/lib/ridecheck";

const processSteps = [
  {
    icon: MapPin,
    title: "Enter the car’s location",
    body: "Tell us where the vehicle is and check live coverage.",
  },
  {
    icon: CalendarDays,
    title: "Pick a time",
    body: "Choose an available inspection day and time.",
  },
  {
    icon: Car,
    title: "We inspect it",
    body: "We come to the car and send your report the same day.",
  },
];

const proof = [
  { icon: Star, value: "350+", label: "5-star reviews" },
  { icon: Wrench, value: "6+ years", label: "Inspection experience" },
  { icon: Car, value: "Mobile", label: "We come to the vehicle" },
  { icon: FileText, value: "Same day", label: "Detailed digital report" },
];

export function TestTwoProcess() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <h2 className="text-3xl font-extrabold text-ink">How it works</h2>
        <p className="mt-2 text-muted-foreground">Get the car inspected in three clear steps.</p>
        <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-0">
          {processSteps.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="relative flex gap-4 md:px-6 md:first:pl-0 md:not-last:border-r md:not-last:border-border">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-extrabold text-signal">
                {index + 1}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-signal" aria-hidden />
                  <h3 className="text-base font-bold text-ink">{title}</h3>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TestTwoPackages() {
  return (
    <section className="bg-haze">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <h2 className="text-3xl font-extrabold text-ink">Choose your inspection</h2>
        <p className="mt-2 text-muted-foreground">Same independent standard. Two levels of detail.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`relative flex flex-col overflow-hidden rounded-xl bg-card p-6 shadow-soft ${pkg.popular ? "border-2 border-signal" : "border border-border"}`}
            >
              {pkg.popular && (
                <span className="absolute right-5 top-0 rounded-b-md bg-signal px-4 py-1.5 text-xs font-bold uppercase text-signal-foreground">
                  Most popular
                </span>
              )}
              <h3 className="pr-24 text-xl font-extrabold text-ink">{pkg.name}</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{pkg.blurb}</p>
              <p className="mt-4 text-4xl font-extrabold text-signal">${pkg.price}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" strokeWidth={3} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-6 h-12 w-full rounded-md text-base font-semibold">
                <Link to="/book" search={{ pkg: pkg.name }}>
                  Book {pkg.name.replace(" Inspection", "")} Inspection
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestTwoProof() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 py-8 sm:px-8 lg:grid-cols-4">
        {proof.map(({ icon: Icon, value, label }, index) => (
          <div key={label} className={`flex items-center gap-3 py-4 lg:px-6 ${index % 2 === 1 ? "pl-4" : "pr-4"} lg:not-first:border-l lg:not-first:border-border`}>
            <Icon className="h-7 w-7 shrink-0 text-signal" aria-hidden />
            <div>
              <p className="font-bold text-ink">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestTwoReviewsFaq() {
  return (
    <>
      <section className="bg-haze">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-extrabold text-ink">Car buyers are saying…</h2>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener" className="text-sm font-bold text-signal underline-offset-4 hover:underline">
              See all Google reviews
            </a>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {reviews.slice(0, 3).map((review) => (
              <figure key={review.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-limited text-limited" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-3 line-clamp-5 text-sm leading-relaxed text-foreground">“{review.body}”</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-ink">— {review.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <h2 className="text-3xl font-extrabold text-ink">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-7 grid items-start gap-3 md:grid-cols-2">
            {faqs.slice(0, 4).map((faq) => (
              <AccordionItem key={faq.q} value={faq.q} className="rounded-lg border border-border bg-card px-4 shadow-soft">
                <AccordionTrigger className="text-left font-semibold text-ink hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

export function TestTwoClosingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img src={heroCar} alt="Red BMW ready for a RideCheck inspection" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-ink/70" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <ClipboardCheck className="mx-auto h-9 w-9 text-signal" aria-hidden />
        <h2 className="mt-4 text-3xl font-extrabold text-ink-foreground">Think you’ve found the right car?</h2>
        <p className="mt-2 text-ink-foreground/75">Check it before you buy it.</p>
        <Button asChild size="lg" className="mt-6 h-12 rounded-md px-8 text-base font-semibold shadow-lift">
          <Link to="/book">
            Book an inspection
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </Link>
        </Button>
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-foreground/70">
          <ShieldCheck className="h-4 w-4 text-protected" aria-hidden />
          Independent advice. No dealer associations.
        </p>
      </div>
    </section>
  );
}