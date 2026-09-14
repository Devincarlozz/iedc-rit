## 2026-06-23 - Data-Driven URL Sanitization
**Vulnerability:** XSS via `javascript:` protocol injection in data-driven link attributes.
**Learning:** Components often use `rel="noopener noreferrer"` for external links, but may neglect to sanitize the `href` itself when it comes from a data file (like `team.js`). Even if the current data is safe, it creates a vulnerability if the data source is ever compromised or updated with untrusted input.
**Prevention:** Always wrap data-driven URLs in a `sanitizeUrl` helper that checks for dangerous protocols like `javascript:`, `data:`, and `vbscript:`.

## 2026-09-14 - Zero-Width and Control Character Protocol Obfuscation
**Vulnerability:** XSS via zero-width characters (e.g., `\u200B`) and control characters injected into dangerous protocol strings (e.g., `java\u200Bscript:`), bypassing protocol checks in `sanitizeUrl`.
**Learning:** Checking for protocol prefixes without first stripping zero-width and control characters allows malicious inputs to bypass `startsWith('javascript:')` while modern browsers still parse and execute the scheme.
**Prevention:** Always strip zero-width (`[\u200B-\u200D\uFEFF\u00AD]`) and control characters (`[\x00-\x1F\x7F-\x9F]`) prior to validating protocols or URLs.
