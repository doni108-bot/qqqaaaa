function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Auto-initialize in browser context; export for tests in Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initHamburgerMenu };
} else {
  initHamburgerMenu();
}
