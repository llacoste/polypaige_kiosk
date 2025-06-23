let screensaverTimeout;
const screensaverDelay = 10000;

function showScreensaver() {
  document.getElementById('landingContent').style.display = 'none';
  document.getElementById('screensaver').style.display = 'block';
}

function resetTimer() {
  clearTimeout(screensaverTimeout);
  document.getElementById('screensaver').style.display = 'none';
  document.getElementById('landingContent').style.display = 'flex';
  screensaverTimeout = setTimeout(showScreensaver, screensaverDelay);
}

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('touchstart', resetTimer);

screensaverTimeout = setTimeout(showScreensaver, screensaverDelay);
