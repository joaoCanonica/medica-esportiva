export {};
const heroVisual = document.getElementById('hero-visual');
const hero = document.querySelector('.hero');

requestAnimationFrame(() => {
  heroVisual?.classList.add('hero-ready');
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
const isWideEnough = window.matchMedia('(min-width: 900px)').matches;

if (heroVisual && hero && !prefersReducedMotion && isFinePointer && isWideEnough) {
  const maxShift = 16;
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(Math.max(1 - rect.bottom / (rect.height + window.innerHeight), 0), 1);
    const shift = (progress - 0.5) * maxShift * 2;
    heroVisual.style.transform = `translateY(${shift.toFixed(1)}px)`;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  update();
}
