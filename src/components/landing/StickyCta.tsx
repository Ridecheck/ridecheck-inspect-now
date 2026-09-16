import { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronUp, Phone, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/ridecheck";
import { CheckAvailabilitySheet } from "@/components/landing/CheckAvailabilitySheet";

const DISCOVERY_KEY = "ridecheck-availability-nudge-shown";
const HESITATION_KEY = "ridecheck-booking-help-shown";
const BOOKING_STARTED_KEY = "ridecheck-booking-started";
const DISCOVERY_VISIBLE_MS = 5000;
const HESITATION_DELAY_MS = 50000;

type Prompt = "discovery" | "hesitation" | null;

export function StickyCta() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>(null);
  const [promptClosing, setPromptClosing] = useState(false);
  const [pulse, setPulse] = useState(false);
  const promptRef = useRef<Prompt>(null);
  const nudgeTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hesitationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setActivePrompt = (next: Prompt) => {
    promptRef.current = next;
    setPrompt(next);
  };

  const clearNudgeTimers = () => {
    nudgeTimers.current.forEach(clearTimeout);
    nudgeTimers.current = [];
  };

  const closePrompt = () => {
    if (!promptRef.current) return;
    clearNudgeTimers();
    setPromptClosing(true);
    nudgeTimers.current.push(
      setTimeout(() => {
        setActivePrompt(null);
        setPromptClosing(false);
        setPulse(false);
      }, 220),
    );
  };

  // Discovery cue: show once per session after roughly 30% page progress.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(DISCOVERY_KEY)) return;

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0 || window.scrollY / scrollable < 0.3) return;

      window.removeEventListener("scroll", onScroll);
      sessionStorage.setItem(DISCOVERY_KEY, "1");
      nudgeTimers.current.push(
        setTimeout(() => {
          if (promptRef.current || sessionStorage.getItem(BOOKING_STARTED_KEY)) return;
          setActivePrompt("discovery");
          setPulse(true);
          nudgeTimers.current.push(setTimeout(closePrompt, DISCOVERY_VISIBLE_MS));
        }, 350),
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearNudgeTimers();
    };
  }, []);

  // Hesitation cue: start the clock after the first meaningful page interaction.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      sessionStorage.getItem(HESITATION_KEY) ||
      sessionStorage.getItem(BOOKING_STARTED_KEY)
    ) return;

    const showWhenClear = () => {
      if (sessionStorage.getItem(BOOKING_STARTED_KEY)) return;
      if (promptRef.current) {
        hesitationTimer.current = setTimeout(showWhenClear, 6000);
        return;
      }
      sessionStorage.setItem(HESITATION_KEY, "1");
      setActivePrompt("hesitation");
    };

    const beginEngagementTimer = () => {
      if (hesitationTimer.current) return;
      hesitationTimer.current = setTimeout(showWhenClear, HESITATION_DELAY_MS);
    };

    window.addEventListener("scroll", beginEngagementTimer, { passive: true });
    window.addEventListener("pointerdown", beginEngagementTimer, { passive: true });
    window.addEventListener("keydown", beginEngagementTimer);
    return () => {
      window.removeEventListener("scroll", beginEngagementTimer);
      window.removeEventListener("pointerdown", beginEngagementTimer);
      window.removeEventListener("keydown", beginEngagementTimer);
      if (hesitationTimer.current) clearTimeout(hesitationTimer.current);
    };
  }, []);

  const markBookingStarted = () => {
    sessionStorage.setItem(BOOKING_STARTED_KEY, "1");
    if (hesitationTimer.current) clearTimeout(hesitationTimer.current);
    hesitationTimer.current = null;
    closePrompt();
  };

  const openSheet = () => {
    markBookingStarted();
    setOpen(true);
  };

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden">
        {prompt && (
          <div
            className={`mx-auto mb-1.5 w-[84%] ${promptClosing ? "animate-nudge-out" : "animate-nudge-in"}`}
            role="status"
          >
            <div className="relative rounded-2xl border border-signal/20 bg-background px-4 py-3 pr-9 shadow-soft">
              <span
                className="pointer-events-none absolute inset-0 rounded-2xl bg-signal/5"
                aria-hidden
              />
              {prompt === "discovery" ? (
                <>
                  <p className="relative text-sm font-bold text-ink">
                    Not sure if we cover your area?
                  </p>
                  <p className="relative mt-0.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    Check availability below
                    <ArrowDown className="h-3.5 w-3.5 text-signal" aria-hidden />
                  </p>
                </>
              ) : (
                <>
                  <p className="relative text-sm font-bold text-ink">
                    Need help with your booking?
                  </p>
                  <p className="relative mt-0.5 text-xs text-muted-foreground">
                    Have a question? We’re happy to help.
                  </p>
                  <a
                    href={PHONE_HREF}
                    onClick={closePrompt}
                    className="relative mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-signal"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    Give us a call
                  </a>
                </>
              )}
              <button
                type="button"
                onClick={closePrompt}
                aria-label="Dismiss"
                className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground transition hover:text-ink"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>
        )}

        <Button
          type="button"
          variant="ghost"
          onClick={openSheet}
          aria-expanded={open}
          className={`relative mx-auto flex h-auto min-h-[3.25rem] w-[84%] flex-col items-center justify-center gap-0 rounded-b-none rounded-t-2xl border-x border-t border-signal/20 bg-background/95 px-5 pb-2 pt-2.5 shadow-[0_-4px_20px_hsl(var(--signal)/0.18)] backdrop-blur transition hover:bg-background hover:shadow-[0_-6px_24px_hsl(var(--signal)/0.24)] ${pulse ? "animate-tab-attention" : ""}`}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            <span className="text-sm font-bold text-signal">Check Availability</span>
            <ChevronUp className="h-4 w-4 text-signal" aria-hidden />
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">
            See if we can inspect your area today
          </span>
        </Button>

        <div className="relative border-t border-border bg-background/95 p-3 backdrop-blur">
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-md px-4"
            >
              <a href={PHONE_HREF} aria-label={`Call RideCheck on ${PHONE_DISPLAY}`}>
                <Phone className="h-5 w-5" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 flex-1 rounded-md text-base font-semibold"
            >
              <Link to="/book" onClick={markBookingStarted}>Book Inspection</Link>
            </Button>
          </div>
        </div>
      </div>

      <CheckAvailabilitySheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}