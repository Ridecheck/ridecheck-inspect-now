import { generateText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import type { Drivetrain } from "./ev-detect";

const schema = z.object({
  drivetrain: z.string(),
});

const SYSTEM = `You classify the drivetrain of a used car from a short buyer-typed description or listing URL.
Answer with exactly one of: ev, phev, hybrid, ice, unknown.
- ev = fully battery electric
- phev = plug-in hybrid
- hybrid = conventional (non plug-in) hybrid
- ice = petrol, diesel, LPG
- unknown = not enough information to tell
Answer only from what the text implies about the specific make/model/variant.`;

function coerce(value: unknown): Drivetrain {
  const v = String(value ?? "").trim().toLowerCase();
  if (v === "ev") return "ev";
  if (v === "phev") return "phev";
  // A conventional hybrid is covered by the standard inspection.
  if (v === "hybrid" || v === "ice") return "ice";
  return "unknown";
}

/** AI fallback for vehicle strings the local rules can't classify. */
export async function classifyVehicleWithAi(input: string): Promise<Drivetrain> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) return "unknown";

  const gateway = createLovableAiGatewayProvider(key);

  try {
    const { output } = await generateText({
      model: gateway("google/gemini-3.6-flash"),
      output: Output.object({ schema }),
      system: SYSTEM,
      prompt: input.slice(0, 400),
    });
    return coerce(output?.drivetrain);
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      const match = /\b(ev|phev|hybrid|ice)\b/i.exec(error.text ?? "");
      return coerce(match?.[1]);
    }
    // Rate limits, credit exhaustion, network — never block the booking form.
    console.error("classifyVehicleWithAi failed", error);
    return "unknown";
  }
}
