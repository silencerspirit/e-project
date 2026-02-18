(() => {
  const filterButtons: HTMLButtonElement[] = Array.from(document.querySelectorAll('[data-listing-filter]'));
  const cards: HTMLLIElement[] = Array.from(document.querySelectorAll('[data-listing-card]'));

  const activeClasses = ['bg-primary', 'text-primary-foreground'];
  const inactiveClasses = ['bg-secondary', 'text-foreground', 'hover:bg-secondary'];

  function setActiveFilter(button: HTMLButtonElement) {
    if (button.dataset.active === button.dataset.filter) return;

    filterButtons.forEach((b) => {
      b.classList.remove(...activeClasses);
      b.classList.add(...inactiveClasses);
      b.dataset.active = button.dataset.filter;
      b.setAttribute('aria-pressed', 'false');
    });

    button.classList.add(...activeClasses);
    button.classList.remove(...inactiveClasses);
    button.setAttribute('aria-pressed', 'true');

    if (typeof button.dataset.all !== 'undefined') {
      cards.forEach((card) => card.classList.remove('hidden'));
      return;
    }

    cards.forEach((card) => {
      const isMatch = card.dataset.type === button.dataset.filter;
      card.classList.toggle('hidden', !isMatch);
    });
  }

  filterButtons.forEach((filterButton) => filterButton.addEventListener('click', () => setActiveFilter(filterButton)));
})();
