import { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronUp, Phone, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/ridecheck";
import { CheckAvailabilitySheet } from "@/components/landing/CheckAvailabilitySheet";

const NUDGE_KEY = "ridecheck-availability-nudge-shown";
const NUDGE_VISIBLE_MS = 6000;

export function StickyCta() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [nudgeClosing, setNudgeClosing] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const closeNudge = () => {
    if (!nudge) return;
    clearTimers();
    setNudgeClosing(true);
    timers.current.push(
      setTimeout(() => {
        setNudge(false);
        setNudgeClosing(false);
        setPulse(false);
      }, 220),
    );
  };

  // Step 2/3/4: show once per session just past the hero, pulse, then auto-dismiss.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(NUDGE_KEY)) return;

    const showNudge = () => {
      window.removeEventListener("scroll", onScroll);
      sessionStorage.setItem(NUDGE_KEY, "1");
      timers.current.push(
        setTimeout(() => {
          setNudge(true);
          setPulse(true);
          timers.current.push(
            setTimeout(() => {
              setNudgeClosing(true);
              timers.current.push(
                setTimeout(() => {
                  setNudge(false);
                  setNudgeClosing(false);
                  setPulse(false);
                }, 220),
              );
            }, NUDGE_VISIBLE_MS),
          );
        }, 400),
      );
    };

    const onScroll = () => {
      // Trigger once the hero is roughly two-thirds scrolled out of view.
      const hero = document.querySelector("main section, section");
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom > window.innerHeight * 0.8) return;
      } else {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable <= 0 || window.scrollY / scrollable < 0.15) return;
      }
      showNudge();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimers();
    };
  }, []);

  // Step 6: tapping outside closes the nudge and the phone bubble.
  useEffect(() => {
    if (!nudge && !phoneOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (barRef.current?.contains(e.target as Node)) return;
      setPhoneOpen(false);
      closeNudge();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  });

  const openSheet = () => {
    closeNudge();
    setPhoneOpen(false);
    setOpen(true);
  };

  return (
    <>
      <div ref={barRef} className="fixed inset-x-0 bottom-0 z-50 sm:hidden">
        {nudge && (
          <div
            className={`mx-auto mb-1.5 w-[84%] ${nudgeClosing ? "animate-nudge-out" : "animate-nudge-in"}`}
          >
            <div className="relative rounded-2xl border border-signal/20 bg-background px-4 py-3 pr-9 shadow-soft">
              <span
                className="pointer-events-none absolute inset-0 rounded-2xl bg-signal/5"
                aria-hidden
              />
              <p className="relative text-sm font-bold text-ink">
                Not sure if we cover your area?
              </p>
              <p className="relative mt-0.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                Check availability below
                <ArrowDown className="h-3.5 w-3.5 text-signal" aria-hidden />
              </p>
              <button
                type="button"
                onClick={closeNudge}
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
          {phoneOpen && (
            <div className="animate-nudge-in absolute bottom-[calc(100%-0.25rem)] left-3 w-64 rounded-2xl border border-border bg-card p-4 pr-9 shadow-soft">
              <p className="text-sm font-bold text-ink">Need help with your booking?</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Give us a call</p>
              <a
                href={PHONE_HREF}
                className="mt-1 block text-lg font-extrabold text-signal"
              >
                {PHONE_DISPLAY}
              </a>
              <button
                type="button"
                onClick={() => setPhoneOpen(false)}
                aria-label="Close"
                className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground transition hover:text-ink"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 rounded-md px-4"
              aria-label="Need help? Show our phone number"
              aria-expanded={phoneOpen}
              onClick={() => {
                closeNudge();
                setPhoneOpen((v) => !v);
              }}
            >
              <Phone className="h-5 w-5" aria-hidden />
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 flex-1 rounded-md text-base font-semibold"
            >
              <Link to="/book">Book Inspection</Link>
            </Button>
          </div>
        </div>
      </div>

      <CheckAvailabilitySheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
