/** Meta Pixel helpers. Event names only — never send form/PII params. */

let lastPageViewKey = null;
let lastLeadKey = null;

function canTrack() {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

export function trackPageView(dedupeKey) {
  if (!canTrack()) return;
  if (dedupeKey != null && dedupeKey === lastPageViewKey) return;
  if (dedupeKey != null) lastPageViewKey = dedupeKey;
  window.fbq("track", "PageView");
}

export function trackLead(dedupeKey) {
  if (!canTrack()) return;
  if (dedupeKey != null && dedupeKey === lastLeadKey) return;
  if (dedupeKey != null) lastLeadKey = dedupeKey;
  window.fbq("track", "Lead");
}

export function trackSchedule() {
  if (!canTrack()) return;
  window.fbq("track", "Schedule");
}
