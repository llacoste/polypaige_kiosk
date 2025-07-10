// Declare shared state once at the top
let screensaverTimeout;
let lastInteractionTime = Date.now();
const screensaverDelay = 10000;

let lastPointerX = null;
let lastPointerY = null;

function showScreensaver() {
  const landing = document.getElementById('landingContent');
  const screensaver = document.getElementById('screensaver');
  const screensaverContent = document.getElementById('screensaverContent');

  landing.classList.remove('fade-visible');
  landing.classList.add('fade-hidden');

  screensaver.style.display = 'block';
  // trigger reflow so the transition works smoothly
  void screensaverContent.offsetWidth;

  screensaverContent.classList.remove('fade-hidden');
  screensaverContent.classList.add('fade-visible');

  document.querySelectorAll('.modal.show').forEach(modalEl => {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  });
}

function resetTimer(event) {
  if (event?.type === 'pointermove') {
    if (event.clientX === lastPointerX && event.clientY === lastPointerY) return;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
  }

  const now = Date.now();
  if (now - lastInteractionTime < 100) return;

  lastInteractionTime = now;
  clearTimeout(screensaverTimeout);

  const landing = document.getElementById('landingContent');
  const screensaver = document.getElementById('screensaver');
  const screensaverContent = document.getElementById('screensaverContent');

  screensaverContent.classList.remove('fade-visible');
  screensaverContent.classList.add('fade-hidden');

  landing.classList.remove('fade-hidden');
  landing.classList.add('fade-visible');

  // Hide screensaver after fade completes (500ms)
  setTimeout(() => {
    screensaver.style.display = 'none';
  }, 500);

  screensaverTimeout = setTimeout(showScreensaver, screensaverDelay);
}

function resizeViewport() {
  const baseWidth = 1024;
  const baseHeight = 768;

  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;
  const scale = Math.min(scaleX, scaleY);

  document.documentElement.style.setProperty('--scale-factor', scale);
}

// Scale on load and resize
window.addEventListener('resize', resizeViewport);
window.addEventListener('load', resizeViewport);

// Activity events
document.addEventListener('pointermove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('touchstart', resetTimer);

// Launch screensaver immediately
showScreensaver();
screensaverTimeout = setTimeout(showScreensaver, screensaverDelay);

// Modal click handlers
document.querySelector('.ticket-outer.bg-pink')?.addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('aboutModal'));
  modal.show();
});

document.querySelector('.ticket-outer.bg-green')?.addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('shopModal'));
  modal.show();
});

document.querySelector('.ticket-outer.bg-blue')?.addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));
  modal.show();
});

// Trigger fullscreen on first touch
document.addEventListener('touchstart', () => {
  if (document.fullscreenEnabled && !document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}, { once: true });
