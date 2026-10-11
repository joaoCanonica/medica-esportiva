export {};
// A barra fixa só aparece quando nenhum bloco que já tem os mesmos CTAs
// (hero, contato, rodapé) está visível na tela.
const bar = document.querySelector<HTMLElement>('.mobile-cta-bar');
const blockers = Array.from(
  document.querySelectorAll<HTMLElement>('.hero, #contato, .site-footer')
);

if (bar && 'IntersectionObserver' in window) {
  const visible = new Set<Element>();
  const update = () => bar.classList.toggle('is-shown', visible.size === 0);

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    update();
  });

  blockers.forEach((el) => observer.observe(el));
  update();
} else {
  bar?.classList.add('is-shown');
}
