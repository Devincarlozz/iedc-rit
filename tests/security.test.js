import test from 'node:test'
import assert from 'node:assert/strict'
import {
  sanitize,
  rateLimitCheck,
  validateEmail,
  generateFormToken,
  validateFormToken,
  sanitizeUrl
} from '../src/utils/security.js'

test('sanitizeUrl allows safe http and https URLs', () => {
  assert.equal(sanitizeUrl('https://example.com'), 'https://example.com')
  assert.equal(sanitizeUrl('http://example.com/test?a=1'), 'http://example.com/test?a=1')
  assert.equal(sanitizeUrl('https://instagram.com/iedc_rit'), 'https://instagram.com/iedc_rit')
})

test('sanitizeUrl allows safe mailto and tel links', () => {
  assert.equal(sanitizeUrl('mailto:iedc@rit.ac.in'), 'mailto:iedc@rit.ac.in')
  assert.equal(sanitizeUrl('tel:+919876543210'), 'tel:+919876543210')
})

test('sanitizeUrl allows safe relative paths and anchors', () => {
  assert.equal(sanitizeUrl('/about'), '/about')
  assert.equal(sanitizeUrl('./assets/logo.png'), './assets/logo.png')
  assert.equal(sanitizeUrl('#join-wite'), '#join-wite')
})

test('sanitizeUrl blocks javascript: URLs and variations', () => {
  assert.equal(sanitizeUrl('javascript:alert(1)'), '#')
  assert.equal(sanitizeUrl('JAVASCRIPT:alert(1)'), '#')
  assert.equal(sanitizeUrl('   javascript:alert(1)  '), '#')
  assert.equal(sanitizeUrl('java\u200Bscript:alert(1)'), '#')
  assert.equal(sanitizeUrl('java\x00script:alert(1)'), '#')
})

test('sanitizeUrl blocks data:, vbscript:, and blob: schemes', () => {
  assert.equal(sanitizeUrl('data:text/html,<script>alert(1)</script>'), '#')
  assert.equal(sanitizeUrl('vbscript:msgbox("test")'), '#')
  assert.equal(sanitizeUrl('blob:https://example.com/uuid'), '#')
})

test('sanitizeUrl blocks protocol-relative URLs', () => {
  assert.equal(sanitizeUrl('//evil.com/phish'), '#')
  assert.equal(sanitizeUrl('/\\evil.com/phish'), '#')
})

test('sanitizeUrl blocks non-whitelisted protocols', () => {
  assert.equal(sanitizeUrl('ftp://files.example.com'), '#')
  assert.equal(sanitizeUrl('file:///etc/passwd'), '#')
  assert.equal(sanitizeUrl('ws://example.com'), '#')
})

test('sanitizeUrl handles non-string and empty inputs', () => {
  assert.equal(sanitizeUrl(''), '#')
  assert.equal(sanitizeUrl('   '), '#')
  assert.equal(sanitizeUrl(null), '#')
  assert.equal(sanitizeUrl(undefined), '#')
  assert.equal(sanitizeUrl(123), '#')
})

test('sanitize strips dangerous characters and bounds length', () => {
  assert.equal(sanitize('<script>alert("xss")</script>'), 'scriptalert(xss)/script')
  assert.equal(sanitize('hello `world` & "quotes" ; <test>'), 'hello world  quotes  test')
  assert.equal(sanitize('a'.repeat(600), 500).length, 500)
})

test('validateEmail validates format and length', () => {
  assert.equal(validateEmail('test@example.com'), true)
  assert.equal(validateEmail('user.name+tag@domain.co.uk'), true)
  assert.equal(validateEmail('invalid-email'), false)
  assert.equal(validateEmail('@domain.com'), false)
  assert.equal(validateEmail(null), false)
})
