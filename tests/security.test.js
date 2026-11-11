import test from 'node:test'
import assert from 'node:assert/strict'
import { sanitizeUrl, sanitize, validateEmail, generateFormToken, validateFormToken, rateLimitCheck } from '../src/utils/security.js'

test('sanitizeUrl allows valid web URLs and relative paths', () => {
  assert.equal(sanitizeUrl('https://example.com'), 'https://example.com')
  assert.equal(sanitizeUrl('http://example.com/path?foo=bar'), 'http://example.com/path?foo=bar')
  assert.equal(sanitizeUrl('mailto:test@example.com'), 'mailto:test@example.com')
  assert.equal(sanitizeUrl('tel:+1234567890'), 'tel:+1234567890')
  assert.equal(sanitizeUrl('/about'), '/about')
  assert.equal(sanitizeUrl('#section'), '#section')
  assert.equal(sanitizeUrl('./assets/logo.png'), './assets/logo.png')
})

test('sanitizeUrl blocks dangerous protocols and evasions', () => {
  assert.equal(sanitizeUrl('javascript:alert(1)'), '#')
  assert.equal(sanitizeUrl('JAVASCRIPT:alert(1)'), '#')
  assert.equal(sanitizeUrl('data:text/html,<script>alert(1)</script>'), '#')
  assert.equal(sanitizeUrl('vbscript:msgbox(1)'), '#')
  assert.equal(sanitizeUrl('blob:https://example.com/uuid'), '#')
  assert.equal(sanitizeUrl('ftp://example.com'), '#')
  assert.equal(sanitizeUrl('file:///etc/passwd'), '#')

  // Zero-width evasion
  assert.equal(sanitizeUrl('j\u200Bavascript:alert(1)'), '#')
  assert.equal(sanitizeUrl('j\uFEFFavascript:alert(1)'), '#')

  // Control characters evasion
  assert.equal(sanitizeUrl('j\x01avascript:alert(1)'), '#')
  assert.equal(sanitizeUrl('j\x1Favascript:alert(1)'), '#')

  // Protocol-relative URLs
  assert.equal(sanitizeUrl('//evil.com'), '#')
  assert.equal(sanitizeUrl('/\\evil.com'), '#')

  // Invalid types / empty
  assert.equal(sanitizeUrl(''), '#')
  assert.equal(sanitizeUrl('   '), '#')
  assert.equal(sanitizeUrl(null), '#')
  assert.equal(sanitizeUrl(undefined), '#')
})
