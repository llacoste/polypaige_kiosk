// screensaver.js

let screensaverTimeout;
let countdownInterval;
let lastInteractionTime = Date.now();
let lastPointerX = null;
let lastPointerY = null;
const screensaverDelay = 10000;
const countdownSeconds = 5;     // countdown duration

function showScreensaver() {
  const landing = document.getElementById('landingContent');
  const screensaver = document.getElementById('screensaver');
  const screensaverContent = document.getElementById('screensaverContent');
  const countdown = document.getElementById('screensaverCountdown');

  landing.classList.remove('fade-visible');
  landing.classList.add('fade-hidden');

  if (countdown) {
    countdown.classList.remove('fade-visible');
    countdown.classList.add('fade-hidden');
  }

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
  // Skip if pointer hasn't moved
  if (event?.type === 'pointermove') {
    if (event.clientX === lastPointerX && event.clientY === lastPointerY) return;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
  }

  const now = Date.now();
  if (now - lastInteractionTime < 100) return;

  lastInteractionTime = now;

  // Clear previous timers
  clearTimeout(screensaverTimeout);
  clearInterval(countdownInterval); // Make sure this is declared at the top of your script

  // Hide the countdown if it was showing
  const countdown = document.getElementById('screensaverCountdown');
  if (countdown) {
    countdown.classList.remove('fade-visible');
    countdown.classList.add('fade-hidden');
  }

  // Unhide landing if this is the first time
  const landing = document.getElementById('landingContent');
  landing.classList.remove('hidden-initially');
  landing.classList.remove('fade-hidden');
  landing.classList.add('fade-visible');

  const screensaver = document.getElementById('screensaver');
  const screensaverContent = document.getElementById('screensaverContent');
  screensaverContent.classList.remove('fade-visible');
  screensaverContent.classList.add('fade-hidden');

  // Hide screensaver after transition
  setTimeout(() => {
    screensaver.style.display = 'none';
  }, 500);

  // Start countdown to show screensaver again
  screensaverTimeout = setTimeout(startCountdown, screensaverDelay);
}

function setupScreensaverActivityListeners() {
  document.addEventListener('pointermove', resetTimer);
  document.addEventListener('keydown', resetTimer);
  document.addEventListener('touchstart', resetTimer);
}

window.addEventListener('load', () => {
  const countdown = document.getElementById('screensaverCountdown');
  if (countdown) {
    countdown.classList.add('fade-hidden');
  }
});