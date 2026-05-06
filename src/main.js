function initUI() {
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  hamburger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      navLinks.classList.toggle('open');
    }
  });

  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

if (typeof module !== 'undefined') {
  module.exports = { initUI };
} else {
  initUI();
}
