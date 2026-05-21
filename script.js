// Variável fácil de editar para definir o resultado final.
const resultado = "menino";
const nomeDoBebe = "Warlles Batista Noleto Junior";

const fullscreenBtn = document.getElementById("fullscreen-btn");
const ultrasoundSection = document.getElementById("ultrasound-section");
const ultrasoundVideo = document.getElementById("ultrasound-video");
const videoTip = document.getElementById("video-tip");
const videoError = document.getElementById("video-error");
const suspenseStage = document.getElementById("suspense-stage");
const revealBtn = document.getElementById("reveal-btn");
const restartBtn = document.getElementById("restart-btn");
const countdownEl = document.getElementById("countdown");
const revealPage = document.getElementById("reveal-page");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const babyNameEl = document.getElementById("baby-name");
const confettiContainer = document.getElementById("confetti-container");
const balloonsContainer = document.getElementById("balloons");
const page = document.getElementById("page");

const textos = {
  menino: { titulo: "É MENINO!", mensagem: "Nosso príncipe está chegando!" },
  menina: { titulo: "É MENINA!", mensagem: "Nossa princesa está chegando!" },
};


async function enableFullscreen() {
  const target = document.documentElement;

  if (document.fullscreenElement) {
    return;
  }

  try {
    if (target.requestFullscreen) {
      await target.requestFullscreen();
    }
  } catch (error) {
    // Em alguns celulares o navegador pode bloquear; o site continua normal.
  }
}

function clearEffects() {
  confettiContainer.innerHTML = "";
  balloonsContainer.innerHTML = "";
}

function launchConfetti() {
  for (let i = 0; i < 110; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = Math.random() > 0.25 ? "#6db5ff" : "#c9e7ff";
    piece.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(piece);
  }
}

function launchBalloons() {
  for (let i = 0; i < 14; i += 1) {
    const balloon = document.createElement("span");
    balloon.className = "balloon";
    balloon.style.left = `${4 + i * 7}%`;
    balloon.style.animationDuration = `${5 + Math.random() * 2.2}s`;
    balloon.style.animationDelay = `${Math.random() * 0.7}s`;
    balloonsContainer.appendChild(balloon);
  }
}

function applyRevealResult() {
  const chave = resultado.toLowerCase() === "menina" ? "menina" : "menino";
  resultTitle.textContent = textos[chave].titulo;
  resultMessage.textContent = textos[chave].mensagem;
  babyNameEl.textContent = `${nomeDoBebe} 💙`;

  page.classList.add("revealed");
  revealPage.classList.remove("hidden");

  launchConfetti();
  launchBalloons();
}

function runCountdown() {
  const sequence = ["3", "2", "1"];
  let index = 0;

  countdownEl.textContent = sequence[index];
  countdownEl.classList.add("active");

  const timer = setInterval(() => {
    index += 1;

    if (index < sequence.length) {
      countdownEl.textContent = sequence[index];
      countdownEl.classList.remove("active");
      void countdownEl.offsetWidth;
      countdownEl.classList.add("active");
      return;
    }

    clearInterval(timer);
    countdownEl.textContent = "";
    applyRevealResult();
  }, 950);
}

function liberarRevelacao() {
  videoError.classList.add("hidden");
  suspenseStage.classList.remove("hidden");
  videoTip.textContent = "Perfeito! Agora clique em revelar para descobrir 💙";
}

async function startReveal() {
  await enableFullscreen();
  revealBtn.classList.add("hidden");
  runCountdown();
}

function resetExperience() {
  clearEffects();
  revealPage.classList.add("hidden");
  page.classList.remove("revealed");
  countdownEl.textContent = "";
  countdownEl.classList.remove("active");
  revealBtn.classList.remove("hidden");
  suspenseStage.classList.add("hidden");
  ultrasoundSection.classList.remove("hidden");
  ultrasoundVideo.currentTime = 0;
  ultrasoundVideo.pause();
  videoTip.textContent = "O botão de revelação será liberado quando o vídeo terminar.";
}

function handleVideoError() {
  videoError.classList.remove("hidden");
  videoTip.textContent = "Se preferir, você pode continuar sem o vídeo. Dica: no iPhone, .mov costuma funcionar melhor.";
  suspenseStage.classList.remove("hidden");
}

ultrasoundVideo.addEventListener("ended", liberarRevelacao);
ultrasoundVideo.addEventListener("error", handleVideoError);
fullscreenBtn.addEventListener("click", enableFullscreen);
revealBtn.addEventListener("click", startReveal);
restartBtn.addEventListener("click", resetExperience);
