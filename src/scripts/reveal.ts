export {};
const targets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-mask, [data-medal]');

if (targets.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((target) => observer.observe(target));
} else {
  targets.forEach((target) => target.classList.add('is-visible'));
}

// Deslocamento discreto do número "25K" durante a rolagem (somente desktop, sem redução de movimento)
const parallaxSlow = document.querySelector<HTMLElement>('[data-parallax-slow]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

if (parallaxSlow && !prefersReducedMotion && isFinePointer) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = parallaxSlow.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    const shift = Math.max(Math.min(-center * 0.04, 14), -14);
    parallaxSlow.style.transform = `translateY(${shift.toFixed(1)}px)`;
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
