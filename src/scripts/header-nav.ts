export {};
const header = document.getElementById('site-header');
const openBtn = document.getElementById('menu-open-btn');
const closeBtn = document.getElementById('menu-close-btn');
const menu = document.getElementById('mobile-menu');
const menuLinks = menu ? Array.from(menu.querySelectorAll('a')) : [];
let lastFocused: HTMLElement | null = null;

const setSolidHeader = () => {
  if (!header) return;
  if (window.scrollY > 24) {
    header.classList.add('is-solid');
  } else {
    header.classList.remove('is-solid');
  }
};

setSolidHeader();
window.addEventListener('scroll', setSolidHeader, { passive: true });

const openMenu = () => {
  if (!menu || !openBtn) return;
  lastFocused = document.activeElement as HTMLElement;
  menu.classList.add('is-open');
  document.body.classList.add('menu-open');
  openBtn.setAttribute('aria-expanded', 'true');
  closeBtn?.focus();
  document.addEventListener('keydown', onKeydown);
};

const closeMenu = () => {
  if (!menu || !openBtn) return;
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  openBtn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('keydown', onKeydown);
  (lastFocused ?? openBtn).focus();
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu();
    return;
  }

  if (event.key === 'Tab' && menu) {
    const focusable = [closeBtn, ...menuLinks].filter(Boolean) as HTMLElement[];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
};

openBtn?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

// Indicador de seção ativa
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.navLink ?? ''))
  .filter((el): el is HTMLElement => !!el);

if (sections.length > 0 && 'IntersectionObserver' in window) {
  const setActive = (id: string) => {
    navLinks.forEach((link) => {
      if (link.dataset.navLink === id) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActive(visible.target.id);
      }
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
