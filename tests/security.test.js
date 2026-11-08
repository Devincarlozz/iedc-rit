import test from 'node:test'
import assert from 'node:assert/strict'
import { sanitizeUrl, sanitize, validateEmail, rateLimitCheck, generateFormToken, validateFormToken } from '../src/utils/security.js'

test('sanitizeUrl allows safe http and https URLs', () => {
  assert.equal(sanitizeUrl('https://example.com'), 'https://example.com')
  assert.equal(sanitizeUrl('http://localhost:3000/path?a=1'), 'http://localhost:3000/path?a=1')
})

test('sanitizeUrl allows mailto and tel links', () => {
  assert.equal(sanitizeUrl('mailto:iedc@rit.ac.in'), 'mailto:iedc@rit.ac.in')
  assert.equal(sanitizeUrl('tel:+919876543210'), 'tel:+919876543210')
})

test('sanitizeUrl allows safe relative links and anchor hashes', () => {
  assert.equal(sanitizeUrl('/connect'), '/connect')
  assert.equal(sanitizeUrl('./about'), './about')
  assert.equal(sanitizeUrl('#join-wite'), '#join-wite')
})

test('sanitizeUrl blocks dangerous protocols', () => {
  assert.equal(sanitizeUrl('javascript:alert(1)'), '#')
  assert.equal(sanitizeUrl('JAVASCRIPT:alert(1)'), '#')
  assert.equal(sanitizeUrl('data:text/html,<script>alert(1)</script>'), '#')
  assert.equal(sanitizeUrl('vbscript:msgbox(1)'), '#')
  assert.equal(sanitizeUrl('blob:https://example.com/uuid'), '#')
})

test('sanitizeUrl blocks obfuscated javascript: URLs (zero-width & control chars)', () => {
  assert.equal(sanitizeUrl('java\u200Bscript:alert(1)'), '#')
  assert.equal(sanitizeUrl('java\uFEFFscript:alert(1)'), '#')
  assert.equal(sanitizeUrl('\x01javascript:alert(1)'), '#')
  assert.equal(sanitizeUrl('  java\tscript:alert(1)'), '#')
})

test('sanitizeUrl blocks protocol-relative URLs', () => {
  assert.equal(sanitizeUrl('//evil.com'), '#')
  assert.equal(sanitizeUrl('/\\evil.com'), '#')
})

test('sanitizeUrl handles empty, invalid, and non-string inputs safely', () => {
  assert.equal(sanitizeUrl(''), '#')
  assert.equal(sanitizeUrl('   '), '#')
  assert.equal(sanitizeUrl(null), '#')
  assert.equal(sanitizeUrl(undefined), '#')
  assert.equal(sanitizeUrl(12345), '#')
})
