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

function startBackgroundMusic() {
  const music = document.getElementById('backgroundMusic');
  if (music && music.paused) {
    music.volume = 0.3; // Adjust volume as needed
    music.play().catch((err) => {
      console.warn("Music play failed:", err);
    });
  }
}

function fadeInMusic() {
  const music = document.getElementById('backgroundMusic');
  if (!music) return;

  music.volume = 0;
  music.play().catch(console.warn);

  let vol = 0;
  const interval = setInterval(() => {
    vol += 0.05;
    if (vol >= 0.3) {
      music.volume = 0.3;
      clearInterval(interval);
    } else {
      music.volume = vol;
    }
  }, 200);
}

document.addEventListener('pointerdown', fadeInMusic, { once: true });
document.addEventListener('touchstart', fadeInMusic, { once: true });