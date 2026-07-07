"use client";

import { openCookieSettings } from "../../lib/consent";

/**
 * Opens the cookie settings dialog directly (never re-opens the initial banner).
 * Reused in the footer and on legal pages.
 */
export default function CookiePreferencesButton({ className = "", children }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children || "העדפות עוגיות"}
    </button>
  );
}
