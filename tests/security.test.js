import { describe, it } from 'node:test'
import assert from 'node:assert'
import { sanitizeUrl } from '../src/utils/security.js'

describe('sanitizeUrl security tests', () => {
  it('blocks dangerous protocol schemes', () => {
    assert.strictEqual(sanitizeUrl('javascript:alert(1)'), '#')
    assert.strictEqual(sanitizeUrl('JavaScript:alert(1)'), '#')
    assert.strictEqual(sanitizeUrl('data:text/html,<script>alert(1)</script>'), '#')
    assert.strictEqual(sanitizeUrl('vbscript:msgbox(1)'), '#')
    assert.strictEqual(sanitizeUrl('blob:https://evil.com/uuid'), '#')
    assert.strictEqual(sanitizeUrl('ftp://evil.com'), '#')
  })

  it('blocks obfuscated schemes with zero-width or control characters', () => {
    assert.strictEqual(sanitizeUrl('jav\0ascript:alert(1)'), '#')
    assert.strictEqual(sanitizeUrl('jav\u200Bascript:alert(1)'), '#')
    assert.strictEqual(sanitizeUrl('jav\u200Cascript:alert(1)'), '#')
    assert.strictEqual(sanitizeUrl('jav\uFEFFascript:alert(1)'), '#')
  })

  it('blocks protocol-relative URLs', () => {
    assert.strictEqual(sanitizeUrl('//evil.com'), '#')
    assert.strictEqual(sanitizeUrl('//evil.com/phish'), '#')
    assert.strictEqual(sanitizeUrl('/\\evil.com'), '#')
  })

  it('allows safe relative paths and anchors', () => {
    assert.strictEqual(sanitizeUrl('/connect'), '/connect')
    assert.strictEqual(sanitizeUrl('/events/hackrit'), '/events/hackrit')
    assert.strictEqual(sanitizeUrl('./about'), './about')
    assert.strictEqual(sanitizeUrl('#join-wite'), '#join-wite')
  })

  it('allows safe whitelisted protocols', () => {
    assert.strictEqual(sanitizeUrl('https://instagram.com/iedcrit'), 'https://instagram.com/iedcrit')
    assert.strictEqual(sanitizeUrl('http://localhost:5173'), 'http://localhost:5173')
    assert.strictEqual(sanitizeUrl('mailto:iedc@rit.ac.in'), 'mailto:iedc@rit.ac.in')
    assert.strictEqual(sanitizeUrl('tel:+919876543210'), 'tel:+919876543210')
  })

  it('handles null, undefined, empty, and whitespace strings safely', () => {
    assert.strictEqual(sanitizeUrl(''), '#')
    assert.strictEqual(sanitizeUrl('   '), '#')
    assert.strictEqual(sanitizeUrl(null), '#')
    assert.strictEqual(sanitizeUrl(undefined), '#')
    assert.strictEqual(sanitizeUrl(12345), '#')
  })
})
