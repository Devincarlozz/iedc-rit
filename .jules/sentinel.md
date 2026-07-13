## 2026-06-23 - Data-Driven URL Sanitization
**Vulnerability:** XSS via `javascript:` protocol injection in data-driven link attributes.
**Learning:** Components often use `rel="noopener noreferrer"` for external links, but may neglect to sanitize the `href` itself when it comes from a data file (like `team.js`). Even if the current data is safe, it creates a vulnerability if the data source is ever compromised or updated with untrusted input.
**Prevention:** Always wrap data-driven URLs in a `sanitizeUrl` helper that checks for dangerous protocols like `javascript:`, `data:`, and `vbscript:`.

## 2026-06-25 - Iframe Sandboxing for External Embeds
**Vulnerability:** Un-sandboxed third-party iframes (e.g., Google Maps) allow full script access and potential top-level navigation hijacks.
**Learning:** Developers often treat official third-party embeds as "safe" and omit the `sandbox` attribute. However, defense-in-depth requires restricting iframe capabilities to the absolute minimum required for functionality.
**Prevention:** All external iframes must implement the `sandbox` attribute with specific permissions: `allow-scripts allow-same-origin allow-popups allow-forms`.
