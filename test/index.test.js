/**
 * @jest-environment jsdom
 */
'use strict';

const { initHamburgerMenu } = require('../src/main.js');

const SAMPLE_HTML = `
  <ul id="navLinks">
    <li><a href="#features">المميزات</a></li>
    <li><a href="#status">الحالة</a></li>
    <li><a href="#wiki">Wiki</a></li>
    <li><a href="https://github.com/doni108-bot/qqqaaaa" target="_blank">GitHub</a></li>
  </ul>
  <div id="hamburger" aria-label="قائمة" role="button" tabindex="0">
    <span></span><span></span><span></span>
  </div>
`;

describe('initHamburgerMenu', () => {
  let hamburger, navLinks;

  beforeEach(() => {
    document.body.innerHTML = SAMPLE_HTML;
    initHamburgerMenu();
    hamburger = document.getElementById('hamburger');
    navLinks  = document.getElementById('navLinks');
  });

  // ── Click behaviour ────────────────────────────────────────────────────────

  test('clicking hamburger adds "open" class to navLinks', () => {
    hamburger.click();
    expect(navLinks.classList.contains('open')).toBe(true);
  });

  test('clicking hamburger a second time removes "open" class (toggle)', () => {
    hamburger.click();
    hamburger.click();
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('clicking hamburger three times ends with "open" class present', () => {
    hamburger.click();
    hamburger.click();
    hamburger.click();
    expect(navLinks.classList.contains('open')).toBe(true);
  });

  // ── Keyboard behaviour ─────────────────────────────────────────────────────

  test('pressing Enter on hamburger toggles "open" class on', () => {
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(true);
  });

  test('pressing Enter twice toggles "open" class off', () => {
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('pressing Space on hamburger toggles "open" class on', () => {
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(true);
  });

  test('pressing Space twice toggles "open" class off', () => {
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('pressing Tab does NOT toggle "open" class', () => {
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('pressing Escape does NOT toggle "open" class', () => {
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('pressing ArrowDown does NOT toggle "open" class', () => {
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  // ── Nav-link close behaviour ───────────────────────────────────────────────

  test('clicking a nav link removes "open" class when menu is open', () => {
    navLinks.classList.add('open');
    navLinks.querySelector('a').click();
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('clicking a nav link when menu is already closed keeps it closed', () => {
    navLinks.querySelector('a').click();
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('every nav link closes the menu when clicked', () => {
    const links = Array.from(navLinks.querySelectorAll('a'));
    expect(links.length).toBeGreaterThan(0);
    links.forEach(link => {
      navLinks.classList.add('open');
      link.click();
      expect(navLinks.classList.contains('open')).toBe(false);
    });
  });

  // ── Mixed click + keyboard sequences ──────────────────────────────────────

  test('menu can be opened by click then closed by nav-link click', () => {
    hamburger.click();
    expect(navLinks.classList.contains('open')).toBe(true);
    navLinks.querySelector('a').click();
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('menu can be opened by keyboard then closed by nav-link click', () => {
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(true);
    navLinks.querySelector('a').click();
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  // ── Robustness / missing elements ─────────────────────────────────────────

  test('does not throw when hamburger element is missing', () => {
    document.body.innerHTML = '<ul id="navLinks"><li><a href="#">link</a></li></ul>';
    expect(() => initHamburgerMenu()).not.toThrow();
  });

  test('does not throw when navLinks element is missing', () => {
    document.body.innerHTML = '<div id="hamburger"></div>';
    expect(() => initHamburgerMenu()).not.toThrow();
  });

  test('does not throw when both elements are missing', () => {
    document.body.innerHTML = '';
    expect(() => initHamburgerMenu()).not.toThrow();
  });
});
