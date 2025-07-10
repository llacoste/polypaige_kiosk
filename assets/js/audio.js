function startBackgroundMusic() {
  const music = document.getElementById('backgroundMusic');
  if (music && music.paused) {
    music.volume = 0.3; // Default target volume
    music.play().catch((err) => {
      console.warn("Music play failed:", err);
    });
  }
}

function fadeInMusic() {
  const music = document.getElementById('backgroundMusic');
  if (!music) return;

  music.volume = 0;
  music.play().catch((err) => {
    console.warn("Music play failed:", err);
  });

  let vol = 0;
  const targetVolume = 0.3;
  const step = 0.05;
  const interval = setInterval(() => {
    vol += step;
    if (vol >= targetVolume) {
      music.volume = targetVolume;
      clearInterval(interval);
    } else {
      music.volume = vol;
    }
  }, 200);
}

// Trigger music once on any user interaction
function handleFirstInteraction() {
  fadeInMusic();

  // Remove all listeners after first interaction
  document.removeEventListener('pointermove', handleFirstInteraction);
  document.removeEventListener('pointerdown', handleFirstInteraction);
  document.removeEventListener('touchstart', handleFirstInteraction);
}

// Attach listeners for interaction-based autoplay
document.addEventListener('pointermove', handleFirstInteraction);
document.addEventListener('pointerdown', handleFirstInteraction);
document.addEventListener('touchstart', handleFirstInteraction);
