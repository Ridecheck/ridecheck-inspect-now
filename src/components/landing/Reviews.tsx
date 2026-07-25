import { Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL, reviews } from "@/lib/ridecheck";

export function Reviews() {
  return (
    <section id="reviews" className="bg-haze">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Don't take our word for it
          </h2>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-soft hover:bg-secondary"
          >
            <span className="font-display text-lg font-extrabold text-ink">5.0</span>
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-signal text-signal" />
              ))}
            </span>
            <span className="text-muted-foreground">130+ Google reviews</span>
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="flex" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-signal text-signal" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                {review.body}
              </blockquote>
              <figcaption className="mt-5 text-sm font-bold text-ink">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
