const idleRefreshLimit = 30 * 60 * 1000; // 30 minutes
const idleRefreshCheckInterval = 60 * 1000; // every 1 minute

let lastInteractionTime = Date.now();

function updateLastInteractionTime() {
  lastInteractionTime = Date.now();
}

// Listen to common activity events
['pointermove', 'keydown', 'touchstart'].forEach(event =>
  document.addEventListener(event, updateLastInteractionTime)
);

// Optional: reset on tab visibility
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    updateLastInteractionTime();
  }
});

// Check periodically if idle too long
setInterval(() => {
  const now = Date.now();
  const idleTime = now - lastInteractionTime;

  if (idleTime >= idleRefreshLimit) {
    console.log('Idle for 30 minutes — refreshing.');
    location.reload();
  }
}, idleRefreshCheckInterval);
