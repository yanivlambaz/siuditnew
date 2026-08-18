import {
  parseAttributionFromSearchParams,
  mergeAttribution,
  emptyAttribution,
  hasAnyAttributionValue,
  resolveAttributionFromRequest,
  flattenAttributionForWebhook,
} from "../app/lib/attribution.js";
import { LEAD_SOURCE } from "../app/lib/leadConfig.js";

const TEST_URL =
  "http://localhost:3000/?utm_source=google&utm_medium=cpc&campaign_id=123456&adgroup_id=789012&ad_id=345678&keyword=%D7%90%D7%97%D7%AA%20%D7%A4%D7%A8%D7%98%D7%99%D7%AA&match_type=exact&target_id=abc123&network=g&device=m&gclid=test-gclid-123";

function buildGhlWebhookPayload(validatedLeadPayload) {
  const { attribution, ...leadFields } = validatedLeadPayload;
  const flatAttribution = attribution ? flattenAttributionForWebhook(attribution) : {};

  return {
    ...leadFields,
    source: LEAD_SOURCE,
    ...(hasAnyAttributionValue(attribution || {})
      ? { attribution: flatAttribution, ...flatAttribution }
      : {}),
  };
}

console.log("=== A. Full Google Ads URL ===");
const fullParams = new URL(TEST_URL).searchParams;
const captured = parseAttributionFromSearchParams(fullParams);
console.log(JSON.stringify(captured, null, 2));
console.assert(captured.keyword === "אחות פרטית", "keyword decode failed");
console.assert(captured.gclid === "test-gclid-123", "gclid failed");

console.log("\n=== B. gclid-only URL ===");
const gclidOnly = parseAttributionFromSearchParams(
  new URLSearchParams("utm_source=google&utm_medium=cpc&gclid=only-gclid-456"),
);
console.log(JSON.stringify(gclidOnly, null, 2));

console.log("\n=== C. Organic URL (no attribution) ===");
const organic = parseAttributionFromSearchParams(new URLSearchParams(""));
console.assert(!hasAnyAttributionValue(organic), "organic should be empty");

console.log("\n=== D. Internal navigation preserves stored attribution ===");
const stored = captured;
const internalNav = parseAttributionFromSearchParams(new URLSearchParams(""));
const afterNav = mergeAttribution(stored, internalNav);
console.assert(afterNav.keyword === "אחות פרטית", "navigation should preserve keyword");

console.log("\n=== E. New campaign overwrites supplied fields only ===");
const updated = mergeAttribution(stored, parseAttributionFromSearchParams(
  new URLSearchParams("campaign_id=999999&gclid=new-gclid"),
));
console.assert(updated.campaign_id === "999999", "campaign_id should update");
console.assert(updated.keyword === "אחות פרטית", "keyword should remain");
console.assert(updated.gclid === "new-gclid", "gclid should update");

console.log("\n=== F. Placeholder values rejected ===");
const placeholders = parseAttributionFromSearchParams(
  new URLSearchParams("campaign_id={campaignid}&keyword={keyword}&gclid={gclid}"),
);
console.assert(!hasAnyAttributionValue(placeholders), "placeholders must be ignored");

console.log("\n=== G. Outbound GHL webhook payload (mock lead, sanitized) ===");
const mockLead = {
  name: "Test User",
  phone: "0501234567",
  city: "תל אביב",
  serviceType: "בית",
  formType: "nurse-matching",
  attribution: captured,
  timestamp: "2026-08-18T12:00:00.000Z",
};

const cookieHeader = `siudit_ads_attr=${encodeURIComponent(JSON.stringify(captured))}`;
const resolved = resolveAttributionFromRequest({ attribution: captured }, cookieHeader);
mockLead.attribution = resolved;

const ghlPayload = buildGhlWebhookPayload(mockLead);
console.log(JSON.stringify(ghlPayload, null, 2));

console.assert(ghlPayload.keyword === "אחות פרטית", "GHL payload missing keyword");
console.assert(ghlPayload.campaign_id === "123456", "GHL payload missing campaign_id");
console.assert(ghlPayload.adgroup_id === "789012", "GHL payload missing adgroup_id");
console.assert(ghlPayload.ad_id === "345678", "GHL payload missing ad_id");
console.assert(ghlPayload.match_type === "exact", "GHL payload missing match_type");
console.assert(ghlPayload.target_id === "abc123", "GHL payload missing target_id");
console.assert(ghlPayload.network === "g", "GHL payload missing network");
console.assert(ghlPayload.device === "m", "GHL payload missing device");
console.assert(ghlPayload.gclid === "test-gclid-123", "GHL payload missing gclid");
console.assert(ghlPayload.attribution?.keyword === "אחות פרטית", "nested attribution missing keyword");

console.log("\nALL ATTRIBUTION TESTS PASSED");
