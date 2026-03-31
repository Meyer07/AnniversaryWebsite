/*
 * =============================================
 * UPDATE THIS DATE to your real start date!
 * Format: 'YYYY-MM-DDTHH:MM:SS'
 * =============================================
 */
const START = new Date('2023-03-31T00:00:00');

function updateTimer() {
  const now  = new Date();
  const diff = now - START;

  const secs  = Math.floor(diff / 1000) % 60;
  const mins  = Math.floor(diff / 60000) % 60;
  const hours = Math.floor(diff / 3600000) % 24;

  const nowYear    = now.getFullYear();
  const nowMonth   = now.getMonth();
  const nowDay     = now.getDate();
  const startMonth = START.getMonth();
  const startDay   = START.getDate();

  let years  = nowYear - START.getFullYear();
  let months = nowMonth - startMonth;
  if (nowDay < startDay) months--;
  if (months < 0) { years--; months += 12; }

  const refDate = new Date(nowYear, nowMonth, startDay);
  if (refDate > now) refDate.setMonth(refDate.getMonth() - 1);
  const days = Math.floor((now - refDate) / 86400000);

  document.getElementById('t-years').textContent  = years;
  document.getElementById('t-months').textContent = months;
  document.getElementById('t-days').textContent   = days;
  document.getElementById('t-hours').textContent  = hours;
  document.getElementById('t-mins').textContent   = String(mins).padStart(2, '0');
  document.getElementById('t-secs').textContent   = String(secs).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

/* Timeline scroll animations */
const items    = document.querySelectorAll('.timeline-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.2 });

items.forEach(i => observer.observe(i));