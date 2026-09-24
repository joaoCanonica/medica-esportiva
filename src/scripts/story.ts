export {};
const story = document.querySelector<HTMLElement>('[data-story]');
const steps = document.querySelectorAll<HTMLElement>('[data-story-step]');

if (story && steps.length > 0 && 'IntersectionObserver' in window) {
  const sceneImages = Array.from(story.querySelectorAll<HTMLImageElement>('[data-scene]'));

  const setScene = (scene: string) => {
    story.setAttribute('data-active-scene', scene);
    sceneImages.forEach((img) => {
      img.setAttribute('data-scene-active', img.dataset.scene === scene ? 'true' : 'false');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        const scene = visible.target.getAttribute('data-story-step');
        if (scene) setScene(scene);
      }
    },
    {
      rootMargin: '-30% 0px -45% 0px',
      threshold: [0.2, 0.5, 0.8],
    }
  );

  steps.forEach((step) => observer.observe(step));
}
