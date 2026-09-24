const dialog = document.getElementById('video-dialog') as HTMLDialogElement | null;
const video = document.getElementById('video-dialog-player') as HTMLVideoElement | null;
const title = document.getElementById('video-dialog-title');
const errorMessage = document.getElementById('video-dialog-error');
const closeBtn = dialog?.querySelector<HTMLButtonElement>('[data-video-close]');
const triggers = document.querySelectorAll<HTMLButtonElement>('.watch-trigger');

let lastFocused: HTMLElement | null = null;

const resetError = () => {
  if (!video || !errorMessage) return;
  errorMessage.hidden = true;
  video.hidden = false;
};

const showError = () => {
  if (!video || !errorMessage) return;
  video.hidden = true;
  errorMessage.hidden = false;
};

const openVideo = (src: string, label: string, trigger: HTMLElement) => {
  if (!dialog || !video || !title) return;

  lastFocused = trigger;
  resetError();
  title.textContent = label;
  video.src = src;
  video.load();
  dialog.showModal();
  document.body.classList.add('video-dialog-open');

  video.play().catch(() => {
    /* autoplay pode ser bloqueado; os controles nativos permanecem disponíveis */
  });
};

const cleanupVideo = () => {
  if (!video) return;
  video.pause();
  video.removeAttribute('src');
  video.load();
};

triggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const src = trigger.dataset.videoSrc;
    const label = trigger.dataset.videoTitle ?? 'Vídeo';
    if (!src) return;
    openVideo(src, label, trigger);
  });
});

closeBtn?.addEventListener('click', () => {
  dialog?.close();
});

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

dialog?.addEventListener('close', () => {
  cleanupVideo();
  document.body.classList.remove('video-dialog-open');
  lastFocused?.focus();
});

video?.addEventListener('error', () => {
  if (video.getAttribute('src')) {
    showError();
  }
});
