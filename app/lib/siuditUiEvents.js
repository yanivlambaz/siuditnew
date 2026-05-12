/**
 * Lightweight UI bus so fixed CTAs can defer to modals / third-party widgets.
 *
 * Native integrations:
 * - `PremiumLeadDialog`, `QuickLeadModal`: dispatch `siudit:overlay` when open changes.
 * - `ScrollFloatingLeadCta`: dispatches `siudit:floating-cta` for height reservation.
 *
 * Third-party cookie banners / chat widgets without dialog semantics: set
 * `data-siudit-ui-blocker="true"` on the fixed root so `CitiesStickyContact` hides.
 */

export const SIUDIT_OVERLAY_EVENT = "siudit:overlay";
export const SIUDIT_FLOATING_CTA_EVENT = "siudit:floating-cta";

/**
 * @param {boolean} open
 * @param {string} [source]
 */
export function dispatchSiuditOverlay(open, source = "unknown") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(SIUDIT_OVERLAY_EVENT, {
      detail: { open, source },
    }),
  );
}

/**
 * @param {boolean} visible
 */
export function dispatchSiuditFloatingCta(visible) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(SIUDIT_FLOATING_CTA_EVENT, {
      detail: { visible },
    }),
  );
}
