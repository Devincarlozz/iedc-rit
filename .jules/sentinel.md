## 2026-06-23 - Data-Driven URL Sanitization
**Vulnerability:** XSS via `javascript:` protocol injection in data-driven link attributes.
**Learning:** Components often use `rel="noopener noreferrer"` for external links, but may neglect to sanitize the `href` itself when it comes from a data file (like `team.js`). Even if the current data is safe, it creates a vulnerability if the data source is ever compromised or updated with untrusted input.
**Prevention:** Always wrap data-driven URLs in a `sanitizeUrl` helper that checks for dangerous protocols like `javascript:`, `data:`, and `vbscript:`.

## 2026-06-24 - Iframe Sandbox Hardening
**Vulnerability:** Overly permissive iframe capabilities in third-party embeds.
**Learning:** Third-party iframes (like Google Maps) can execute scripts or navigate the parent window if not properly sandboxed. Even if the provider is trusted, sandboxing provides defense-in-depth against supply chain attacks or provider-side vulnerabilities.
**Prevention:** All iframes must implement the `sandbox` attribute, explicitly allowing only the minimum required permissions (e.g., `allow-scripts allow-same-origin allow-popups allow-forms` for interactive maps).
