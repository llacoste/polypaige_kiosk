let screensaverTimeout;
const screensaverDelay = 10000;

function showScreensaver() {
  // Hide the main content, show the screensaver
  document.getElementById('landingContent').style.display = 'none';
  document.getElementById('screensaver').style.display = 'block';

  // Close all open modals
  const openModals = document.querySelectorAll('.modal.show');
  openModals.forEach(modalEl => {
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
  });
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