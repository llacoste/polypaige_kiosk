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

  setTimeout(() => {
    screensaver.style.display = 'none';
  }, 500);

  screensaverTimeout = setTimeout(showScreensaver, screensaverDelay);
}

function setupScreensaverActivityListeners() {
  document.addEventListener('pointermove', resetTimer);
  document.addEventListener('keydown', resetTimer);
  document.addEventListener('touchstart', resetTimer);
}
