export {};

const dialog = document.getElementById('video-dialog') as HTMLDialogElement | null;
const video = document.getElementById('video-dialog-player') as HTMLVideoElement | null;
const title = document.getElementById('video-dialog-title');
const errorMessage = document.getElementById('video-dialog-error');
const loadingIndicator = document.getElementById('video-dialog-loading');
const closeBtn = dialog?.querySelector<HTMLButtonElement>('[data-video-close]');
const triggers = document.querySelectorAll<HTMLButtonElement>('.watch-trigger');

let lastFocused: HTMLElement | null = null;
let requestId = 0;
let isCleaningUp = false;

const setLoading = (show: boolean) => {
  loadingIndicator?.toggleAttribute('hidden', !show);
};

const setError = (show: boolean) => {
  if (!video || !errorMessage) return;
  errorMessage.hidden = !show;
  video.hidden = show;
};

const onReady = () => {
  setLoading(false);
};

const onError = (thisRequest: number) => () => {
  if (!video || !dialog) return;
  // Ignora eventos de erro que não pertencem à abertura atual, que ocorrem
  // durante a limpeza (remoção proposital de src) ou quando o diálogo já fechou.
  if (thisRequest !== requestId) return;
  if (isCleaningUp) return;
  if (!dialog.open) return;
  if (!video.getAttribute('src')) return;

  const code = video.error?.code;
  if (code === MediaError.MEDIA_ERR_ABORTED) return;

  setLoading(false);
  setError(true);
};

const clearVideoListeners = (handler: EventListener) => {
  if (!video) return;
  video.removeEventListener('loadeddata', onReady);
  video.removeEventListener('canplay', onReady);
  video.removeEventListener('playing', onReady);
  video.removeEventListener('error', handler);
};

const openVideo = (src: string, label: string, poster: string | undefined, trigger: HTMLElement) => {
  if (!dialog || !video || !title) return;

  const thisRequest = ++requestId;
  isCleaningUp = false;
  lastFocused = trigger;

  // Garante que qualquer mídia/estado da abertura anterior não vaze para esta.
  video.pause();
  video.removeAttribute('src');
  video.load();

  setError(false);
  setLoading(true);
  video.hidden = false;
  title.textContent = label;

  if (poster) {
    video.poster = poster;
  } else {
    video.removeAttribute('poster');
  }

  const errorHandler = onError(thisRequest);
  video.addEventListener('loadeddata', onReady);
  video.addEventListener('canplay', onReady);
  video.addEventListener('playing', onReady);
  video.addEventListener('error', errorHandler);
  video.dataset.errorHandlerAttached = 'true';
  (video as unknown as { __errorHandler?: EventListener }).__errorHandler = errorHandler;

  video.src = src;

  if (!dialog.open) {
    dialog.showModal();
    document.body.classList.add('video-dialog-open');
  }

  video.load();

  video.play().catch(() => {
    // Autoplay bloqueado não é um erro de carregamento: o vídeo permanece
    // visível, com controles nativos, para o usuário iniciar manualmente.
    if (thisRequest === requestId) setLoading(false);
  });
};

const closeVideo = () => {
  isCleaningUp = true;

  if (video) {
    const attachedHandler = (video as unknown as { __errorHandler?: EventListener }).__errorHandler;
    if (attachedHandler) clearVideoListeners(attachedHandler);
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      /* alguns navegadores rejeitam antes de metadados carregarem; sem problema */
    }
    video.removeAttribute('src');
    video.removeAttribute('poster');
    video.load();
  }

  setError(false);
  setLoading(false);
  document.body.classList.remove('video-dialog-open');
  lastFocused?.focus();
  isCleaningUp = false;
};

triggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const src = trigger.dataset.videoSrc;
    const label = trigger.dataset.videoTitle ?? 'Vídeo';
    const poster = trigger.dataset.videoPoster;
    if (!src) return;
    openVideo(src, label, poster, trigger);
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
  closeVideo();
});
