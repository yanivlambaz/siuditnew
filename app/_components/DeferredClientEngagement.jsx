"use client";

import dynamic from "next/dynamic";

const SiteLeadCaptureOrchestrator = dynamic(
  () => import("./leadCapture/SiteLeadCaptureOrchestrator"),
  { ssr: false, loading: () => null },
);

/**
 * Lead capture (localStorage cadence, exit intent, welcome) — browser-only.
 */
export default function DeferredClientEngagement({
  whatsappHref,
  siteMode = "standard",
}) {
  return <SiteLeadCaptureOrchestrator whatsappHref={whatsappHref} siteMode={siteMode} />;
}
