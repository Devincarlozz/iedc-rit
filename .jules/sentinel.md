## 2026-06-23 - Data-Driven URL Sanitization
**Vulnerability:** XSS via `javascript:` protocol injection in data-driven link attributes.
**Learning:** Components often use `rel="noopener noreferrer"` for external links, but may neglect to sanitize the `href` itself when it comes from a data file (like `team.js`). Even if the current data is safe, it creates a vulnerability if the data source is ever compromised or updated with untrusted input.
**Prevention:** Always wrap data-driven URLs in a `sanitizeUrl` helper that checks for dangerous protocols like `javascript:`, `data:`, and `vbscript:`.

## 2026-11-01 - Protocol Scheme Obfuscation via Control and Zero-Width Characters
**Vulnerability:** XSS filter bypass in `sanitizeUrl` where protocols like `javascript:` or `data:` are obfuscated using zero-width characters (e.g., `\u200B`) or ASCII control characters (e.g., `\x00`).
**Learning:** Browsers often ignore zero-width and control characters when parsing protocol schemes, leading them to execute payloads like `java\u200Bscript:alert(1)` even if a filter only strips standard whitespace (`\s`).
**Prevention:** Strip all zero-width characters (`[\u200B-\u200D\uFEFF\u00AD]`) and ASCII/extended control characters (`[\x00-\x1F\x7F-\x9F]`) prior to analyzing URL schemes.
