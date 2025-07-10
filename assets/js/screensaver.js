// screensaver.js

let screensaverTimeout;
let countdownInterval;
let lastInteractionTime = Date.now();
let lastPointerX = null;
let lastPointerY = null;
const screensaverDelay = 10000;
const countdownSeconds = 5;     // countdown duration

function showScreensaver() {
  clearInterval(countdownInterval);
  const countdown = document.getElementById('screensaverCountdown');
  countdown.classList.add('fade-hidden');

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

function startCountdown() {
  let remaining = countdownSeconds;
  const countdown = document.getElementById('screensaverCountdown');
  const numberSpan = document.getElementById('countdownNumber');

  numberSpan.textContent = remaining;
  countdown.classList.remove('fade-hidden');
  countdown.classList.add('fade-visible');

  countdownInterval = setInterval(() => {
    remaining--;
    numberSpan.textContent = remaining;

    if (remaining <= 0) {
      clearInterval(countdownInterval);
      showScreensaver();
    }
  }, 1000);
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
  clearInterval(countdownInterval);

  const countdown = document.getElementById('screensaverCountdown');
  countdown.classList.remove('fade-visible');
  countdown.classList.add('fade-hidden');

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

  screensaverTimeout = setTimeout(startCountdown, screensaverDelay);
}

function setupScreensaverActivityListeners() {
  document.addEventListener('pointermove', resetTimer);
  document.addEventListener('keydown', resetTimer);
  document.addEventListener('touchstart', resetTimer);
}
