function setupModalHandlers() {
  document.querySelector('.ticket-outer.bg-pink')?.addEventListener('click', () => {
    new bootstrap.Modal(document.getElementById('aboutModal')).show();
  });

  document.querySelector('.ticket-outer.bg-green')?.addEventListener('click', () => {
    new bootstrap.Modal(document.getElementById('shopModal')).show();
  });

  document.querySelector('.ticket-outer.bg-blue')?.addEventListener('click', () => {
    new bootstrap.Modal(document.getElementById('portfolioModal')).show();
  });
}
