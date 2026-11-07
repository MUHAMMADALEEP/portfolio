// ===== 1. Tabs (Skills page) =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function animateBars(container) {
  const fills = container.querySelectorAll('.skill-fill');
  fills.forEach(function (fill) {
    fill.style.width = '0';
    setTimeout(function () {
      fill.style.width = fill.dataset.level + '%';
    }, 50);
  });
}

tabButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    tabButtons.forEach(function (b) { b.classList.remove('active'); });
    tabContents.forEach(function (c) { c.classList.remove('active'); });

    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    target.classList.add('active');
    animateBars(target);
  });
});

// ===== 2. Animated skill bars (on page load) =====
const firstTab = document.querySelector('.tab-content.active');
if (firstTab) {
  animateBars(firstTab);
}

// ===== 3. Project filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const filter = btn.dataset.filter;

    filterButtons.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    projectCards.forEach(function (card) {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// ===== 4. Project modal =====
const modal = document.getElementById('modal');
const detailButtons = document.querySelectorAll('.details-btn');

if (modal) {
  detailButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = btn.closest('.project-card');
      document.getElementById('modal-title').textContent = card.dataset.title;
      document.getElementById('modal-problem').textContent = card.dataset.problem;
      document.getElementById('modal-role').textContent = card.dataset.role;
      document.getElementById('modal-tools').textContent = card.dataset.tools;
      document.getElementById('modal-outcome').textContent = card.dataset.outcome;
      modal.classList.add('open');
    });
  });

  document.getElementById('modal-close').addEventListener('click', function () {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

// ===== 5. Contact form validation (compulsory) =====
const form = document.getElementById('contact-form');

function showError(fieldId, message) {
  document.getElementById(fieldId + '-error').textContent = message;
  document.getElementById(fieldId).classList.add('invalid');
}

function clearError(fieldId) {
  document.getElementById(fieldId + '-error').textContent = '';
  document.getElementById(fieldId).classList.remove('invalid');
}

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const success = document.getElementById('form-success');
    let valid = true;

    success.textContent = '';

    if (name === '') {
      showError('name', 'Please enter your name.');
      valid = false;
    } else {
      clearError('name');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      showError('email', 'Please enter your email.');
      valid = false;
    } else if (!emailPattern.test(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError('email');
    }

    if (subject === '') {
      showError('subject', 'Please enter a subject.');
      valid = false;
    } else {
      clearError('subject');
    }

    if (message.length < 10) {
      showError('message', 'Message must be at least 10 characters.');
      valid = false;
    } else {
      clearError('message');
    }

    if (valid) {
      success.textContent = 'Thank you, ' + name + '! Your message has been sent.';
      form.reset();
    }
  });
}

// ===== 6. Read more toggle (About page) =====
const readMoreBtn = document.getElementById('read-more-btn');
const moreText = document.getElementById('more-text');

if (readMoreBtn) {
  readMoreBtn.addEventListener('click', function () {
    moreText.classList.toggle('show');
    if (moreText.classList.contains('show')) {
      readMoreBtn.textContent = 'Read less';
    } else {
      readMoreBtn.textContent = 'Read more';
    }
  });
}

// ===== 7. Automatic copyright year =====
const yearSpans = document.querySelectorAll('.year');
yearSpans.forEach(function (span) {
  span.textContent = new Date().getFullYear();
});

// ===== 8. Hamburger menu =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}