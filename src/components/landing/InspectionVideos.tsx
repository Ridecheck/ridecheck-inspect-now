import { useRef } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";

type InspectionVideo = {
  vehicle: string;
  location: string;
  /** Drop the video URL here when the clip is ready. */
  src?: string;
  poster?: string;
};

const videos: InspectionVideo[] = [
  { vehicle: "VW Golf Alltrack", location: "Melbourne" },
  { vehicle: "Lexus IS 300 F Sport", location: "Sydney" },
  { vehicle: "Land Rover Discovery", location: "Melbourne" },
  { vehicle: "Hyundai i30 2022", location: "Sydney" },
  { vehicle: "Hyundai Tucson", location: "Melbourne" },
  { vehicle: "Toyota RAV4 Hybrid", location: "Sydney" },
];

export function InspectionVideos() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card ? card.clientWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section id="inspection-videos" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="label-caps text-muted-foreground">See us in action</p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
              Real <span className="text-signal">inspections.</span> Real cars.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Short clips from recent jobs, so you know exactly what our
              inspectors check before you buy.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous videos"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ink transition hover:border-signal hover:text-signal"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next videos"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ink transition hover:border-signal hover:text-signal"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((video) => (
            <li
              key={video.vehicle}
              className="w-[70%] shrink-0 snap-start sm:w-[38%] lg:w-[26%]"
            >
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-haze shadow-soft">
                {video.src ? (
                  <video
                    className="h-full w-full object-cover"
                    src={video.src}
                    poster={video.poster}
                    controls
                    playsInline
                    preload="none"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/25 to-ink/70"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 top-0 p-4">
                      <p className="text-sm font-bold leading-snug text-background">
                        {video.vehicle}
                      </p>
                      <p className="text-xs text-background/80">
                        {video.location}
                      </p>
                    </div>
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-background/90 text-signal shadow-soft transition group-hover:scale-105">
                        <Play className="h-6 w-6 fill-current" aria-hidden />
                      </span>
                    </div>
                    <p className="label-caps absolute inset-x-0 bottom-0 p-4 text-background/80">
                      Video coming soon
                    </p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
