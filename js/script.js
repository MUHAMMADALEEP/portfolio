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