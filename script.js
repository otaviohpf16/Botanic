/* ============ TOUCH INTERACTIONS — FICHA CARDS & CURIOSITY BOX ============ */

function addPressEffect(el) {
  el.addEventListener('touchstart', () => el.classList.add('pressed'), { passive: true });
  el.addEventListener('touchend',   () => el.classList.remove('pressed'), { passive: true });
  el.addEventListener('touchcancel',() => el.classList.remove('pressed'), { passive: true });
  el.addEventListener('mousedown',  () => el.classList.add('pressed'));
  el.addEventListener('mouseup',    () => el.classList.remove('pressed'));
  el.addEventListener('mouseleave', () => el.classList.remove('pressed'));
}

document.querySelectorAll('.ficha-card, .hero-curiosity').forEach(addPressEffect);

/* ============ REALIDADE AUMENTADA — MODEL VIEWER ============ */

const arBtn       = document.getElementById('ar-btn');
const modelOverlay = document.getElementById('model-overlay');
const modelViewer  = document.getElementById('mangaba-model');
const modelClose   = document.getElementById('model-close');

function openAR() {
  if (!modelViewer) return;

  // Try native AR first
  if (modelViewer.canActivateAR) {
    modelViewer.activateAR();
  } else {
    // Fallback: show 3D viewer modal
    modelOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

if (arBtn) {
  arBtn.addEventListener('click', openAR);
  arBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    openAR();
  });
}

if (modelClose) {
  modelClose.addEventListener('click', () => {
    modelOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// When model-viewer AR session starts, close the overlay
if (modelViewer) {
  modelViewer.addEventListener('ar-status', (e) => {
    if (e.detail.status === 'session-started') {
      modelOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ============ AUDIODESCRIÇÃO — WEB SPEECH API ============ */

const audioCard   = document.getElementById('audio-card');
const audioPlayBtn= document.getElementById('audio-play-btn');
const audioIcon   = document.getElementById('audio-icon');

const AUDIO_TEXT = `A mangabeira carrega história antes mesmo de qualquer trilha ou placa existir. Arvoreta de tronco retorcido e casca cinza-acastanhada, ela parece pequena, mas carrega uma história enorme.
Suas flores são brancas por fora e rosadas por dentro, com um perfume adocicado que atrai abelhas durante o dia e mariposas à noite. O fruto, a mangaba, é amarelado, mole ao toque quando maduro, e tem um sabor que mistura doce e levemente ácido.
Mas o que a torna verdadeiramente fascinante é o látex branco que escorre quando qualquer parte dela é cortada. Esse látex foi usado por povos indígenas e quilombolas para impermeabilizar recipientes, fazer botas e como cicatrizante.
No Nordeste, comunidades inteiras vivem da coleta sustentável da mangaba, são as chamadas catadoras de mangaba, reconhecidas como patrimônio cultural vivo.
Ecologicamente, ela alimenta aves, morcegos, quatis e cutias, que dispersam suas sementes pelo Cerrado. Está ameaçada pelo avanço urbano e agrícola.
Ver uma mangabeira de pé num parque urbano é, literalmente, ver resistência.`;

let synth      = window.speechSynthesis;
let utterance  = null;
let isPlaying  = false;

const PLAY_ICON = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE_ICON= `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

function setAudioPlaying(state) {
  isPlaying = state;
  if (audioIcon)   audioIcon.innerHTML = state ? PAUSE_ICON : PLAY_ICON;
  if (audioPlayBtn) audioPlayBtn.classList.toggle('playing', state);
}

function stopAudio() {
  synth.cancel();
  setAudioPlaying(false);
  utterance = null;
}

function startAudio() {
  utterance = new SpeechSynthesisUtterance(AUDIO_TEXT);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.92;
  utterance.pitch = 1.0;

  // Pick a Portuguese voice if available
  const voices = synth.getVoices();
  const ptVoice = voices.find(v => v.lang.startsWith('pt')) ||
                  voices.find(v => v.lang.startsWith('es')) || // fallback
                  voices[0];
  if (ptVoice) utterance.voice = ptVoice;

  utterance.onstart  = () => setAudioPlaying(true);
  utterance.onend    = () => setAudioPlaying(false);
  utterance.onerror  = () => setAudioPlaying(false);
  utterance.onpause  = () => setAudioPlaying(false);
  utterance.onresume = () => setAudioPlaying(true);

  synth.speak(utterance);
  setAudioPlaying(true);
}

function toggleAudio() {
  if (!synth) return;

  if (isPlaying) {
    stopAudio();
  } else {
    stopAudio(); // clear any previous
    startAudio();
  }
}

if (audioCard) {
  audioCard.addEventListener('click', toggleAudio);
}

// Load voices when available
if (synth && synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = () => synth.getVoices();
}

// Stop audio if user navigates away
window.addEventListener('beforeunload', () => { synth && synth.cancel(); });

/* ============ LIBRAS — VIDEO ============ */

const librasVideo   = document.getElementById('libras-video');
const librasOverlay = document.getElementById('libras-overlay');

if (librasVideo) {
  // Click on overlay starts video
  if (librasOverlay) {
    librasOverlay.addEventListener('click', () => {
      librasVideo.play();
      librasOverlay.classList.add('hidden');
    });
  }

  // If user pauses, show overlay again
  librasVideo.addEventListener('pause', () => {
    if (librasVideo.ended) return;
    if (librasOverlay) librasOverlay.classList.remove('hidden');
  });

  librasVideo.addEventListener('ended', () => {
    if (librasOverlay) librasOverlay.classList.remove('hidden');
  });

  // Prevent default controls from hiding overlay if user taps video
  librasVideo.addEventListener('play', () => {
    if (librasOverlay) librasOverlay.classList.add('hidden');
  });
}
