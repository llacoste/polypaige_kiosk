let wakeLock = null;

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake lock is active.');

      wakeLock.addEventListener('release', () => {
        console.log('Wake lock was released, attempting to re-request...');
        requestWakeLock(); // Re-acquire on release
      });
    } else {
      console.warn('Wake Lock API not supported on this browser.');
    }
  } catch (err) {
    console.error(`Wake Lock error: ${err.name}, ${err.message}`);
  }
}

// Try requesting on load and when visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    requestWakeLock();
  }
});

window.addEventListener('load', () => {
  requestWakeLock();
});
