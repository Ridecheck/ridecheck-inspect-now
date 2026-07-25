import { Star } from "lucide-react";
import { GOOGLE_REVIEWS_URL, reviews } from "@/lib/ridecheck";

export function Reviews() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-caps text-signal">Reviews</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Don't take our word for it
          </h2>
        </div>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-secondary"
        >
          <span className="font-display text-lg font-extrabold">5.0</span>
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
            className="flex flex-col rounded-lg border border-border bg-card p-6"
          >
            <div className="flex" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-signal text-signal" aria-hidden />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed">
              {review.body}
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold">
              {review.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
