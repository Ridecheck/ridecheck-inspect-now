import { useEffect, useRef, useState } from "react";
import {
  detectDrivetrain,
  looksLikeVehicleInput,
  type Drivetrain,
} from "@/lib/ev-detect";
import { classifyVehicle } from "@/lib/ev-detect.functions";

/** Session cache so the same string is never classified twice. */
const cache = new Map<string, Drivetrain>();

/**
 * Rules first (instant), AI fallback only when the rules can't tell.
 * Never throws — a failed classification just stays "unknown".
 */
export function useDrivetrainDetection(vehicle: string, listing = "") {
  const rule = detectDrivetrain(vehicle, listing);
  const [aiResult, setAiResult] = useState<Drivetrain>("unknown");
  const latest = useRef("");

  const text = `${vehicle} ${listing}`.trim();
  const needsAi = rule.drivetrain === "unknown" && looksLikeVehicleInput(vehicle, listing);

  useEffect(() => {
    if (!needsAi) {
      setAiResult("unknown");
      return;
    }
    const key = text.toLowerCase();
    latest.current = key;

    const cached = cache.get(key);
    if (cached) {
      setAiResult(cached);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { drivetrain } = await classifyVehicle({ data: { text } });
        cache.set(key, drivetrain as Drivetrain);
        if (latest.current === key) setAiResult(drivetrain as Drivetrain);
      } catch {
        if (latest.current === key) setAiResult("unknown");
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [needsAi, text]);

  return rule.drivetrain !== "unknown" ? rule.drivetrain : aiResult;
}
