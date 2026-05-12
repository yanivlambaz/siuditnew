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

export async function POST(request) {
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

  const lead = {
    name,
    phone: phoneDigits,
    city,
    serviceType,
    createdAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") || "",
    ip: request.headers.get("x-forwarded-for") || "",
  };

  console.log("[lead]", lead);

  return Response.json({ ok: true }, { status: 200 });
}

