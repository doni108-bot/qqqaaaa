const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function getInlineScript() {
  const match = html.match(/<script>([\s\S]*?)<\/script>/);

  assert.ok(match, 'Expected an inline script in index.html');
  return match[1];
}

function countMatches(pattern) {
  return [...html.matchAll(pattern)].length;
}

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  toggle(name) {
    if (this.values.has(name)) {
      this.values.delete(name);
      return false;
    }

    this.values.add(name);
    return true;
  }

  remove(name) {
    this.values.delete(name);
  }

  contains(name) {
    return this.values.has(name);
  }
}

class FakeElement {
  constructor() {
    this.listeners = {};
    this.classList = new FakeClassList();
    this.children = [];
  }

  addEventListener(type, handler) {
    this.listeners[type] ??= [];
    this.listeners[type].push(handler);
  }

  dispatch(type, event = {}) {
    for (const handler of this.listeners[type] ?? []) {
      handler(event);
    }
  }

  querySelectorAll(selector) {
    return selector === 'a' ? this.children : [];
  }
}

function bootNavigationScript() {
  const hamburger = new FakeElement();
  const navLinks = new FakeElement();

  navLinks.children = [new FakeElement(), new FakeElement(), new FakeElement(), new FakeElement()];

  const document = {
    getElementById(id) {
      if (id === 'hamburger') {
        return hamburger;
      }

      if (id === 'navLinks') {
        return navLinks;
      }

      throw new Error(`Unexpected element request: ${id}`);
    }
  };

  vm.runInNewContext(getInlineScript(), { document });

  return { hamburger, navLinks };
}

test('document keeps Arabic and mobile-first metadata intact', () => {
  assert.match(html, /<html lang="ar" dir="rtl">/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1\.0" \/>/);
  assert.match(html, /<meta name="theme-color" content="#1a1a2e" \/>/);
  assert.match(html, /<meta name="mobile-web-app-capable" content="yes" \/>/);
  assert.match(html, /<meta name="apple-mobile-web-app-capable" content="yes" \/>/);
  assert.match(html, /<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" \/>/);
});

test('core sections and navigation links remain available', () => {
  assert.match(html, /<section class="section" id="features">/);
  assert.match(html, /<section class="section" id="status">/);
  assert.match(html, /<section class="section" id="wiki">/);
  assert.match(html, /<li><a href="#features">المميزات<\/a><\/li>/);
  assert.match(html, /<li><a href="#status">الحالة<\/a><\/li>/);
  assert.match(html, /<li><a href="#wiki">Wiki<\/a><\/li>/);
  assert.match(html, /<a href="https:\/\/github\.com\/doni108-bot\/qqqaaaa" target="_blank">GitHub<\/a>/);
});

test('feature cards, status rows, and wiki links are fully rendered', () => {
  assert.equal(countMatches(/<div class="card">/g), 4);
  assert.equal(countMatches(/<div class="status-row">/g), 5);
  assert.equal(countMatches(/<li><a href=/g), 4);
  assert.match(html, /<span class="badge warn">⚠ راجع الإعدادات<\/span>/);
  assert.match(html, /<li><a href="docs\/wiki\.md">📖 دليل البدء السريع<\/a><\/li>/);
  assert.match(html, /<li><a href="https:\/\/github\.com\/doni108-bot\/qqqaaaa\/actions" target="_blank">⚙️ سجل الأتمتة<\/a><\/li>/);
});

test('hamburger click toggles the mobile navigation menu', () => {
  const { hamburger, navLinks } = bootNavigationScript();

  hamburger.dispatch('click');
  assert.equal(navLinks.classList.contains('open'), true);

  hamburger.dispatch('click');
  assert.equal(navLinks.classList.contains('open'), false);
});

test('keyboard interactions only toggle the mobile menu for Enter and Space', () => {
  const { hamburger, navLinks } = bootNavigationScript();

  hamburger.dispatch('keydown', { key: 'Enter' });
  assert.equal(navLinks.classList.contains('open'), true);

  hamburger.dispatch('keydown', { key: ' ' });
  assert.equal(navLinks.classList.contains('open'), false);

  hamburger.dispatch('keydown', { key: 'Escape' });
  assert.equal(navLinks.classList.contains('open'), false);
});

test('clicking a navigation link closes the mobile menu', () => {
  const { navLinks } = bootNavigationScript();

  navLinks.classList.toggle('open');
  navLinks.children[0].dispatch('click');

  assert.equal(navLinks.classList.contains('open'), false);
});
