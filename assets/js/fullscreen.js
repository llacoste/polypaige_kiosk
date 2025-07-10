export function enableFullscreenOnce() {
  document.addEventListener('touchstart', () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, { once: true });
}
