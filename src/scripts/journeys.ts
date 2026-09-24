export {};
const app = document.getElementById('journey-app');
if (app) {
  const tabs = Array.from(app.querySelectorAll<HTMLButtonElement>('[data-journey-tab]'));
  const panels = Array.from(app.querySelectorAll<HTMLElement>('[data-journey-panel]'));

  const activate = (index: number, { focus = false }: { focus?: boolean } = {}) => {
    tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.tabIndex = isActive ? 0 : -1;
    });
    panels.forEach((panel, i) => {
      if (i === index) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
    if (focus) tabs[index]?.focus();
  };

  // Estado inicial: só o primeiro painel visível (fallback sem JS mostra todos).
  activate(0);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('focus', () => activate(index));

    tab.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        activate((index + 1) % tabs.length, { focus: true });
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        activate((index - 1 + tabs.length) % tabs.length, { focus: true });
      } else if (event.key === 'Home') {
        event.preventDefault();
        activate(0, { focus: true });
      } else if (event.key === 'End') {
        event.preventDefault();
        activate(tabs.length - 1, { focus: true });
      }
    });
  });
}
