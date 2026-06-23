/**
 * Centralized Security Utilities for IEDC RIT
 * 
 * Single source of truth for all input sanitization, rate limiting,
 * validation, and security helpers used across the application.
 */

/**
 * Sanitize user input by stripping dangerous characters.
 * Removes HTML tags, script injection chars, backticks, zero-width
 * characters, and control characters. Trims and caps length.
 * 
 * @param {string} str - Raw user input
 * @param {number} maxLength - Maximum allowed length (default 500)
 * @returns {string} Sanitized string
 */
export function sanitize(str, maxLength = 500) {
  if (typeof str !== 'string') return ''
  return str
    // Strip zero-width characters
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '')
    // Strip control characters (except newline/tab)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Strip HTML/script injection characters and backticks
    .replace(/[<>"'&;`]/g, '')
    .trim()
    .slice(0, maxLength)
}

/**
 * Client-side rate limiter using localStorage.
 * Tracks submission timestamps and rejects if threshold is exceeded
 * within the given time window.
 * 
 * @param {string} key - Unique localStorage key for this form/action
 * @param {number} maxAttempts - Max submissions allowed in window (default 3)
 * @param {number} windowMs - Time window in milliseconds (default 10 minutes)
 * @returns {boolean} true if submission is allowed, false if rate limited
 */
export function rateLimitCheck(key, maxAttempts = 3, windowMs = 10 * 60 * 1000) {
  try {
    const now = Date.now()
    const raw = localStorage.getItem(key)
    let history = []

    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          // Only keep entries that are valid numbers within the window
          history = parsed.filter(t => typeof t === 'number' && now - t < windowMs)
        }
      } catch {
        // Corrupted data — reset
        localStorage.removeItem(key)
      }
    }

    if (history.length >= maxAttempts) return false

    history.push(now)
    localStorage.setItem(key, JSON.stringify(history))
    return true
  } catch {
    // localStorage unavailable (private browsing, etc.) — allow submission
    return true
  }
}

/**
 * Validate an email address with an RFC-compliant regex.
 * More thorough than a simple `includes('@')` check.
 * 
 * @param {string} email - Email address to validate
 * @returns {boolean} true if valid email format
 */
export function validateEmail(email) {
  if (typeof email !== 'string') return false
  // RFC 5322 simplified — covers 99.9% of real-world addresses
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Generate a cryptographically random form token (CSRF-like nonce).
 * Stored in sessionStorage to verify form submissions came from our pages.
 * 
 * @param {string} formId - Unique identifier for the form
 * @returns {string} Generated token
 */
export function generateFormToken(formId) {
  try {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    const token = Array.from(array, b => b.toString(16).padStart(2, '0')).join('')
    sessionStorage.setItem(`iedc_token_${formId}`, token)
    return token
  } catch {
    // Fallback for environments without crypto
    const fallback = Date.now().toString(36) + Math.random().toString(36).slice(2)
    try {
      sessionStorage.setItem(`iedc_token_${formId}`, fallback)
    } catch {
      // sessionStorage unavailable
    }
    return fallback
  }
}

/**
 * Validate a previously generated form token.
 * Consumes the token on successful validation to prevent replay.
 * 
 * @param {string} formId - Unique identifier for the form
 * @param {string} token - Token to validate
 * @returns {boolean} true if token matches and is valid
 */
export function validateFormToken(formId, token) {
  try {
    const stored = sessionStorage.getItem(`iedc_token_${formId}`)
    if (!stored || stored !== token) return false
    // Consume the token — one-time use
    sessionStorage.removeItem(`iedc_token_${formId}`)
    return true
  } catch {
    // sessionStorage unavailable — skip validation
    return true
  }
}

/**
 * Sanitize a URL to prevent javascript:, data:, and vbscript: injection.
 * Returns '#' for any disallowed protocol. Allows http:, https:, mailto:,
 * tel:, relative paths, and hash anchors.
 * 
 * @param {string} url - URL to sanitize
 * @returns {string} Safe URL or '#' if blocked
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return '#'

  const trimmed = url.trim()

  // Allow relative paths, hash anchors, and protocol-relative URLs
  if (trimmed.startsWith('/') || trimmed.startsWith('#') || trimmed.startsWith('./')) {
    return trimmed
  }

  // Check for dangerous protocols (case-insensitive, whitespace-stripped)
  const normalized = trimmed.replace(/\s/g, '').toLowerCase()
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'blob:']

  for (const proto of dangerousProtocols) {
    if (normalized.startsWith(proto)) {
      return '#'
    }
  }

  // Allow safe protocols
  const safeProtocols = ['http:', 'https:', 'mailto:', 'tel:']
  const hasProtocol = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)

  if (hasProtocol) {
    const protocol = trimmed.slice(0, trimmed.indexOf(':') + 1).toLowerCase()
    if (!safeProtocols.includes(protocol)) {
      return '#'
    }
  }

  return trimmed
}
