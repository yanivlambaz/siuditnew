"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CookieConsentBanner from "./CookieConsentBanner";
import {
  hasConsentDecision,
  getPrefs,
  acceptAll,
  rejectNonEssential,
  saveConsent,
  OPEN_SETTINGS_EVENT,
} from "../../lib/consent";

const CookieSettingsDialog = dynamic(() => import("./CookieSettingsDialog"), {
  ssr: false,
});

/**
 * Global orchestrator for cookie consent.
 * - Shows the compact banner when no valid decision exists.
 * - Opens the settings dialog directly when the footer trigger fires
 *   (never re-opens the initial banner for returning users).
 * Consent Mode defaults + restore already ran in the layout bootstrap, so this
 * component never re-applies consent on mount (avoids duplicate consent events).
 */
export default function CookieConsentManager() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setBannerOpen(!hasConsentDecision());
  }, []);

  useEffect(() => {
    function onOpenSettings() {
      setBannerOpen(false);
      setSettingsOpen(true);
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
  }, []);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    setBannerOpen(false);
    setSettingsOpen(false);
  }, []);

  const handleRejectNonEssential = useCallback(() => {
    rejectNonEssential();
    setBannerOpen(false);
    setSettingsOpen(false);
  }, []);

  const handleSave = useCallback((prefs) => {
    saveConsent(prefs);
    setBannerOpen(false);
    setSettingsOpen(false);
  }, []);

  return (
    <>
      <CookieConsentBanner
        open={bannerOpen}
        onAcceptAll={handleAcceptAll}
        onRejectNonEssential={handleRejectNonEssential}
        onOpenSettings={() => {
          setBannerOpen(false);
          setSettingsOpen(true);
        }}
      />
      {settingsOpen ? (
        <CookieSettingsDialog
          initialPrefs={getPrefs()}
          onClose={() => setSettingsOpen(false)}
          onSave={handleSave}
          onAcceptAll={handleAcceptAll}
          onRejectNonEssential={handleRejectNonEssential}
        />
      ) : null}
    </>
  );
}
