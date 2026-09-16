/**
 * Shared coverage check used by both the Check Availability popup and the
 * booking flow, so an area behaves the same no matter where it's entered.
 *
 * Prototype rule: every location is covered by default. The literal suburb
 * "test" (any case) or a clearly interstate postcode (not starting 2, 3 or 5)
 * falls outside coverage and gets the "We might be able to help." flow.
 */
export function isAreaCovered(suburb: string, postcode?: string) {
  if (suburb.trim().toLowerCase() === "test") return false;
  return !/\b[0146789]\d{3}\b/.test(`${suburb} ${postcode ?? ""}`);
}
