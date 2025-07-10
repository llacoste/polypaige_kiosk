window.addEventListener('load', () => {
  resizeViewport();
  setupScreensaverActivityListeners();
  setupModalHandlers();
  showScreensaver();
  screensaverTimeout = setTimeout(showScreensaver, screensaverDelay);

  document.addEventListener('touchstart', () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, { once: true });
});

window.addEventListener('resize', resizeViewport);
setupScreensaverActivityListeners();
resetTimer();