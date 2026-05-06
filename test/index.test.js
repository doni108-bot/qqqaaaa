'use strict';

/**
 * @jest-environment jsdom
 */

const { initUI } = require('../src/main');

function buildDOM() {
  document.body.innerHTML = `
    <div class="hamburger" id="hamburger" role="button" tabindex="0">
      <span></span><span></span><span></span>
    </div>
    <ul id="navLinks">
      <li><a href="#features">Features</a></li>
      <li><a href="#status">Status</a></li>
      <li><a href="#wiki">Wiki</a></li>
      <li><a href="https://github.com" target="_blank">GitHub</a></li>
    </ul>
  `;
}

describe('initUI – hamburger click', () => {
  beforeEach(() => {
    buildDOM();
    initUI();
  });

  test('click opens the menu (adds "open" class)', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.click();

    expect(navLinks.classList.contains('open')).toBe(true);
  });

  test('second click closes the menu (removes "open" class)', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.click();
    hamburger.click();

    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('three clicks leave menu open again', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.click();
    hamburger.click();
    hamburger.click();

    expect(navLinks.classList.contains('open')).toBe(true);
  });
});

describe('initUI – hamburger keydown', () => {
  beforeEach(() => {
    buildDOM();
    initUI();
  });

  test('Enter key toggles menu open', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(navLinks.classList.contains('open')).toBe(true);
  });

  test('Enter key toggles menu closed when already open', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('Space key toggles menu open', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

    expect(navLinks.classList.contains('open')).toBe(true);
  });

  test('Space key toggles menu closed when already open', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('Tab key does NOT toggle the menu', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('Escape key does NOT toggle the menu', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('ArrowDown key does NOT toggle the menu', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

    expect(navLinks.classList.contains('open')).toBe(false);
  });
});

describe('initUI – nav link clicks close the menu', () => {
  beforeEach(() => {
    buildDOM();
    initUI();
  });

  test('clicking a link removes "open" class', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    const firstLink = navLinks.querySelector('a');

    hamburger.click();
    expect(navLinks.classList.contains('open')).toBe(true);

    firstLink.click();
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('clicking a link when menu is already closed keeps it closed', () => {
    const navLinks  = document.getElementById('navLinks');
    const firstLink = navLinks.querySelector('a');

    firstLink.click();
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('every nav link closes the menu', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    const links = Array.from(navLinks.querySelectorAll('a'));

    links.forEach((link) => {
      hamburger.click(); // open
      expect(navLinks.classList.contains('open')).toBe(true);

      link.click(); // close via link
      expect(navLinks.classList.contains('open')).toBe(false);
    });
  });
});

describe('initUI – interaction mix', () => {
  beforeEach(() => {
    buildDOM();
    initUI();
  });

  test('menu opened by keyboard can be closed by clicking a link', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    const firstLink = navLinks.querySelector('a');

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(true);

    firstLink.click();
    expect(navLinks.classList.contains('open')).toBe(false);
  });

  test('menu opened by click can be closed by Enter key', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.click();
    expect(navLinks.classList.contains('open')).toBe(true);

    hamburger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(navLinks.classList.contains('open')).toBe(false);
  });
});
