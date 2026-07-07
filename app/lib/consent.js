/**
 * Centralized cookie-consent module for siudit.co.il.
 *
 * Single source of truth for consent state, persistence and Google Consent Mode
 * signalling. The banner, the settings dialog and the footer trigger all read
 * and write through here so consent logic is never scattered across components.
 *
 * Supported optional categories reflect the ACTUAL implementation:
 *   - analytics  -> analytics_storage        (GA via GTM)
 *   - marketing  -> ad_storage / ad_user_data / ad_personalization (Google/Meta via GTM)
 * "Necessary" cookies are always active and are not user-controllable.
 */

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "siudit_cookie_consent_v1";

/** Fired on window whenever consent state changes (UI sync). */
export const CONSENT_EVENT = "siudit:consent-change";
/** Fired on window to request opening the settings dialog directly. */
export const OPEN_SETTINGS_EVENT = "siudit:open-cookie-settings";

/** @typedef {{ analytics: boolean, marketing: boolean }} ConsentPrefs */
/** @typedef {{ version: number, analytics: boolean, marketing: boolean, updatedAt: string }} StoredConsent */

/** All optional categories default to denied before an explicit choice. */
export function defaultPrefs() {
  return { analytics: false, marketing: false };
}

/**
 * @returns {StoredConsent | null} stored decision, or null if none/invalid/outdated.
 */
export function readConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

/** @returns {boolean} whether a valid, current-version decision exists. */
export function hasConsentDecision() {
  return readConsent() !== null;
}

/** @returns {ConsentPrefs} effective preferences (stored decision or denied defaults). */
export function getPrefs() {
  const stored = readConsent();
  if (!stored) return defaultPrefs();
  return { analytics: stored.analytics, marketing: stored.marketing };
}

/**
 * Maps preferences to Google Consent Mode v2 signals and pushes an update.
 * Safe no-op if gtag is unavailable.
 * @param {ConsentPrefs} prefs
 */
export function applyToGoogleConsent(prefs) {
  if (typeof window === "undefined") return;
  const analytics = prefs.analytics ? "granted" : "denied";
  const marketing = prefs.marketing ? "granted" : "denied";
  const gtag =
    typeof window.gtag === "function"
      ? window.gtag
      : function () {
          (window.dataLayer = window.dataLayer || []).push(arguments);
        };
  gtag("consent", "update", {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  });
  (window.dataLayer = window.dataLayer || []).push({
    event: "cookie_consent_update",
    consent_analytics: prefs.analytics,
    consent_marketing: prefs.marketing,
  });
}

/**
 * Persists a decision, updates Consent Mode and notifies listeners.
 * @param {ConsentPrefs} prefs
 */
export function saveConsent(prefs) {
  const clean = { analytics: !!prefs.analytics, marketing: !!prefs.marketing };
  if (typeof window !== "undefined") {
    try {
      /** @type {StoredConsent} */
      const record = {
        version: CONSENT_VERSION,
        analytics: clean.analytics,
        marketing: clean.marketing,
        updatedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* storage unavailable — consent applies for this session only */
    }
    applyToGoogleConsent(clean);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: clean }));
  }
  return clean;
}

export function acceptAll() {
  return saveConsent({ analytics: true, marketing: true });
}

export function rejectNonEssential() {
  return saveConsent({ analytics: false, marketing: false });
}

/** Requests the settings dialog to open (used by footer / legal pages). */
export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}
