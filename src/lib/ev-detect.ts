/**
 * Rule-based EV / PHEV detection from free-text vehicle input.
 *
 * Layer 1 of the detection wrapper: instant, offline, zero cost. When this
 * returns "unknown" for something that looks like a real vehicle, the caller
 * falls back to the AI classifier in `ev-detect.functions.ts`.
 */

export type Drivetrain = "ev" | "phev" | "ice" | "unknown";

export type EvDetection = {
  drivetrain: Drivetrain;
  /** 0–1. Rules that match a specific model score higher than generic keywords. */
  confidence: number;
};

const UNKNOWN: EvDetection = { drivetrain: "unknown", confidence: 0 };

/** Full-electric model / brand signals. */
const EV_PATTERNS: RegExp[] = [
  /\btesla\b/,
  /\bmodel\s?(s|3|x|y)\b/,
  /\bpolestar\b/,
  /\bbyd\b|\batto\s?3\b|\bdolphin\b|\bseal\b|\bsealion\b/,
  /\bioniq\s?(5|6)\b/,
  /\bev6\b|\bev5\b|\bev9\b|\bniro\s?ev\b|\bsoul\s?ev\b/,
  /\bkona\s?electric\b/,
  /\bmg\s?4\b|\bmg\s?zs\s?ev\b|\bmg\s?s5\b/,
  /\bid\.?\s?(3|4|5|buzz)\b/,
  /\bi3\b|\bi4\b|\bi5\b|\bi7\b|\bix\b|\bix1\b|\bix3\b/,
  /\beq[abcesv]\b|\beqxx\b/,
  /\be-?tron\b/,
  /\bleaf\b|\bariya\b/,
  /\bzoe\b|\bmegane\s?e-?tech\b/,
  /\bbolt\b|\bmach-?e\b|\blightning\b/,
  /\btaycan\b|\bmacan\s?(4|turbo)?\s?electric\b/,
  /\bgwm\s?ora\b|\bora\b/,
  /\bcupra\s?born\b/,
  /\bbz4x\b|\bux\s?300e\b|\brz\b/,
  /\bfully\s?electric\b|\bbattery\s?electric\b|\bbev\b/,
  /\belectric\b/,
  /\bkwh\b/,
];

/** Plug-in hybrid signals. */
const PHEV_PATTERNS: RegExp[] = [
  /\bphev\b/,
  /\bplug-?\s?in\b/,
  /\boutlander\s?phev\b|\beclipse\s?cross\s?phev\b/,
  /\bxc(40|60|90)\s?recharge\b|\brecharge\b/,
  /\b330e\b|\b530e\b|\bx5\s?45e\b|\bxdrive\d+e\b/,
  /\bprius\s?prime\b|\brav4\s?prime\b/,
  /\bhaval\s?h6\s?phev\b|\bjolion\s?phev\b/,
  /\bsealion\s?6\b|\bshark\s?6\b/,
];

/** Things that clearly mean combustion, used for the reverse prompt. */
const ICE_PATTERNS: RegExp[] = [
  /\bdiesel\b/,
  /\bturbo\s?diesel\b|\btdi\b|\bcrdi\b/,
  /\bpetrol\b|\bunleaded\b/,
  /\bv8\b|\bv6\b/,
  /\bhilux\b|\branger\b|\bnavara\b|\btriton\b|\bd-?max\b/,
];

function normalise(input: string) {
  return input.toLowerCase().replace(/[_+]/g, " ");
}

/**
 * Detects drivetrain from a vehicle description and/or a listing URL.
 * Listing URLs are matched on their text only — we don't fetch the page.
 */
export function detectDrivetrain(vehicle: string, listing = ""): EvDetection {
  const text = normalise(`${vehicle} ${listing}`).trim();
  if (text.length < 2) return UNKNOWN;

  for (const re of PHEV_PATTERNS) {
    if (re.test(text)) return { drivetrain: "phev", confidence: 0.9 };
  }
  for (const re of EV_PATTERNS) {
    if (re.test(text)) return { drivetrain: "ev", confidence: 0.9 };
  }
  // Conventional hybrid: covered by the standard inspection, not the EV path.
  if (/\bhybrid\b/.test(text)) return { drivetrain: "ice", confidence: 0.6 };
  for (const re of ICE_PATTERNS) {
    if (re.test(text)) return { drivetrain: "ice", confidence: 0.7 };
  }
  return UNKNOWN;
}

/** Worth spending an AI call on? Ignores empty or one-word fragments. */
export function looksLikeVehicleInput(vehicle: string, listing = "") {
  const text = `${vehicle} ${listing}`.trim();
  if (text.length < 6) return false;
  if (/https?:\/\//.test(listing)) return true;
  return vehicle.trim().split(/\s+/).length >= 2;
}

export function isElectrified(d: Drivetrain) {
  return d === "ev" || d === "phev";
}
