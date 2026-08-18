"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttributionFromUrl } from "../lib/attributionClient";

/** Invisible client bootstrap — captures Google Ads params on landing and internal navigation. */
export default function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttributionFromUrl(window.location.search);
  }, [pathname]);

  return null;
}
