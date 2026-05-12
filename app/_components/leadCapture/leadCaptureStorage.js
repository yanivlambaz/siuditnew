/** Client-only localStorage helpers with TTL windows. */

export const MS_12H = 12 * 60 * 60 * 1000;
export const MS_24H = 24 * 60 * 60 * 1000;

export const STORAGE_WELCOME = "siudit:lc:welcomeAt";
export const STORAGE_EXIT = "siudit:lc:exitAt";
export const blogArticleKey = (slug) => `siudit:lc:blog:${slug}`;

export function canShowAfterTTL(storageKey, ttlMs) {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return true;
    const t = Number(raw);
    if (!Number.isFinite(t)) return true;
    return Date.now() - t > ttlMs;
  } catch {
    return true;
  }
}

export function markShownAt(storageKey) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey, String(Date.now()));
  } catch {
    /* private mode */
  }
}

/** Session-scoped flag (once per visit). */
export function hasSessionFlag(key) {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function setSessionFlag(key) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    /* ignore */
  }
}
