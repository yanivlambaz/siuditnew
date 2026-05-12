/**
 * JSON-LD embedded in <script type="application-ld+json"> must not break out of the tag.
 * Escaping "<" covers "</script>" and similar edge cases from editorial/content strings.
 */
export function serializeJsonLd(data) {
  try {
    return JSON.stringify(data).replace(/</g, "\\u003c");
  } catch (err) {
    console.error("[serializeJsonLd]", err);
    return "{}";
  }
}
