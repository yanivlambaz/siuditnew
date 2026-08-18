import { forwardLeadToGhl } from "../../lib/forwardLeadToGhl";
import { hasAnyAttributionValue, resolveAttributionFromRequest } from "../../lib/attribution";

function normalizeString(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function digitsOnly(value) {
  return normalizeString(value).replace(/[^\d]/g, "");
}

function isValidPhoneIL(phoneDigits) {
  // Accept common Israeli formats:
  // - Mobile: 05Xxxxxxxx (10 digits)
  // - With country code: 9725XXXXXXXX (12 digits) or 972XXXXXXXXX (12 digits)
  if (!/^\d+$/.test(phoneDigits)) return false;
  if (phoneDigits.length < 9 || phoneDigits.length > 13) return false;
  return true;
}

function optionalField(body, key) {
  const value = normalizeString(body?.[key]);
  return value || undefined;
}

const WEBHOOK_FAILURE_MESSAGE = "שליחה נכשלה. נסו שוב בעוד רגע.";

export async function POST(request) {
  console.log("[lead] lead API request received");

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "גוף בקשה לא תקין" }, { status: 400 });
  }

  const name = normalizeString(body?.name);
  const city = normalizeString(body?.city);
  const serviceType = normalizeString(body?.serviceType);
  const phoneRaw = normalizeString(body?.phone);
  const phoneDigits = digitsOnly(phoneRaw);

  const allowedServiceTypes = new Set(["בית", "בית חולים"]);

  if (!name || name.length < 2) {
    return Response.json({ ok: false, error: "נא להזין שם תקין" }, { status: 400 });
  }
  if (!phoneDigits || !isValidPhoneIL(phoneDigits)) {
    return Response.json({ ok: false, error: "נא להזין טלפון תקין" }, { status: 400 });
  }
  if (!city || city.length < 2) {
    return Response.json({ ok: false, error: "נא להזין עיר" }, { status: 400 });
  }
  if (!allowedServiceTypes.has(serviceType)) {
    return Response.json({ ok: false, error: "נא לבחור סוג שירות" }, { status: 400 });
  }

  const formType = optionalField(body, "formType") || optionalField(body, "source");
  const email = optionalField(body, "email");
  const message = optionalField(body, "message");
  const page = optionalField(body, "page");
  const service = optionalField(body, "service");
  // Optional structured intake fields (used by the nurse matching flow).
  // Additive and backward compatible: existing forms simply omit them.
  const careLocation = optionalField(body, "careLocation");
  const urgency = optionalField(body, "urgency");

  const attribution = resolveAttributionFromRequest(body, request.headers.get("cookie"));

  const validatedLeadPayload = {
    name,
    phone: phoneDigits,
    city,
    serviceType,
    ...(formType ? { formType } : {}),
    ...(email ? { email } : {}),
    ...(message ? { message } : {}),
    ...(page ? { page } : {}),
    ...(service ? { service } : {}),
    ...(careLocation ? { careLocation } : {}),
    ...(urgency ? { urgency } : {}),
    ...(hasAnyAttributionValue(attribution) ? { attribution } : {}),
    timestamp: new Date().toISOString(),
  };

  const webhookResult = await forwardLeadToGhl(validatedLeadPayload);

  if (!webhookResult.ok) {
    return Response.json({ ok: false, error: WEBHOOK_FAILURE_MESSAGE }, { status: 503 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
