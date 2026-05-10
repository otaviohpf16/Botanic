/**
 * MANGABEIRA - SCRIPT.JS
 * Interações e funcionalidades dinâmicas
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================ */
    /* 1. EFEITOS DE TOQUE (Feedbacks visuais)                      */
    /* ============================================================ */
    const interactiveElements = document.querySelectorAll('.ficha-card, .audio-card, .hero-curiosity');

    interactiveElements.forEach(el => {
      el.addEventListener('touchstart', () => el.classList.add('pressed'));
      el.addEventListener('mousedown', () => el.classList.add('pressed'));

      const removePress = () => el.classList.remove('pressed');
      el.addEventListener('touchend', removePress);
      el.addEventListener('touchcancel', removePress);
      el.addEventListener('mouseup', removePress);
      el.addEventListener('mouseleave', removePress);
    });


    /* ============================================================ */
    /* 2. FUNCIONALIDADE AR / 3D                                     */
    /* ============================================================ */
    const arBtn = document.getElementById('ar-btn');
    const modelOverlay = document.getElementById('model-overlay');
    const modelClose = document.getElementById('model-close');

    arBtn.addEventListener('click', () => {
      // Verificamos se o navegador suporta WebXR (AR)
      // model-viewer lida internamente com o botão nativo,
      // mas aqui abrimos o modal como garantia/contexto extra.
      modelOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // trava scroll
    });

    modelClose.addEventListener('click', () => {
      modelOverlay.classList.remove('active');
      document.body.style.overflow = ''; // libera scroll
    });


    /* ============================================================ */
    /* 3. AUDIODESCRIÇÃO (Web Speech API)                            */
    /* ============================================================ */
    const audioCard = document.getElementById('audio-player');
    const audioPlayBtn = document.getElementById('audio-btn-ui');
    const audioIcon = document.getElementById('audio-icon');

    let isSpeaking = false;
    let synth = window.speechSynthesis;
    let utterance = null;

    // Conteúdo formatado para descrição clara
    const textToRead = "Audiodescrição da Mangabeira. A Mangabeira é uma árvore de tronco retorcido e casca acastanhada. Símbolo do Cerrado e da Restinga brasileira. Possui flores brancas perfumadas e frutos amarelados e moles quando maduros. O fruto, a mangaba, é comestível e seu látex branco tem usos históricos para vedação e medicina tradicional.";

    function toggleAudio() {
      if (!('speechSynthesis' in window)) {
        alert("Desculpe, seu dispositivo não suporta audiodescrição automática.");
        return;
      }

      if (isSpeaking) {
        synth.cancel();
        isSpeaking = false;
        audioPlayBtn.classList.remove('playing');
        audioIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      } else {
        utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.0;

        utterance.onend = () => {
          isSpeaking = false;
          audioPlayBtn.classList.remove('playing');
          audioIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
        };

        synth.speak(utterance);
        isSpeaking = true;
        audioPlayBtn.classList.add('playing');
        // Ícone de stop/pause
        audioIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      }
    }

    audioCard.addEventListener('click', toggleAudio);
    // Acessibilidade por teclado
    audioCard.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') toggleAudio();
    });


    /* ============================================================ */
    /* 4. PLAYER DE LIBRAS                                          */
    /* ============================================================ */
    const video = document.getElementById('libras-video');
    const overlay = document.getElementById('libras-overlay');
    const videoWrap = document.querySelector('.libras-video-wrap');

    function toggleVideo() {
      if (video.paused) {
        video.play();
        overlay.classList.add('hidden');
      } else {
        video.pause();
        overlay.classList.remove('hidden');
      }
    }

    videoWrap.addEventListener('click', toggleVideo);

    video.addEventListener('ended', () => {
      overlay.classList.remove('hidden');
    });

    // Se o usuário clicar nos controles nativos, o overlay deve sumir
    video.addEventListener('play', () => {
        overlay.classList.add('hidden');
    });
    video.addEventListener('pause', () => {
        if (Math.abs(video.duration - video.currentTime) > 0.5) {
            overlay.classList.remove('hidden');
        }
    });

});
