// Variáveis fáceis de editar.
const resultado = "menino";

const fullscreenBtn = document.getElementById("fullscreen-btn");
const ultrasoundVideo = document.getElementById("ultrasound-video");
const videoTip = document.getElementById("video-tip");
const videoError = document.getElementById("video-error");
const suspenseStage = document.getElementById("suspense-stage");
const revealBtn = document.getElementById("reveal-btn");
const countdownEl = document.getElementById("countdown");

const textos = {
  menino: {
    titulo: "É MENINO!",
    mensagem: "Nosso príncipe está chegando!",
  },
  menina: {
    titulo: "É MENINA!",
    mensagem: "Nossa princesa está chegando!",
  },
};

async function enableFullscreen() {
  const target = document.documentElement;
  if (document.fullscreenElement) return;

  try {
    if (target.requestFullscreen) await target.requestFullscreen();
  } catch (error) {
    // Alguns navegadores podem bloquear fullscreen.
  }
}

function getResultadoFinal() {
  return resultado.toLowerCase() === "menina" ? "menina" : "menino";
}

function liberarRevelacao() {
  videoError.classList.add("hidden");
  suspenseStage.classList.remove("hidden");
  videoTip.textContent = "Perfeito! Agora clique em revelar para descobrir 💙";
}

function handleVideoError() {
  videoError.classList.remove("hidden");
  videoTip.textContent = "Se preferir, você pode continuar sem o vídeo. Para Vercel, confirme se o arquivo está como ultrassom.mp4 na raiz.";
  suspenseStage.classList.remove("hidden");
}

function abrirPaginaDeRevelacao() {
  const chave = getResultadoFinal();
  const sexoTexto = textos[chave].titulo;
  const frase = textos[chave].mensagem;

  const params = new URLSearchParams({
    sexo: sexoTexto,
    frase,
  });

  window.location.href = `revelacao.html?${params.toString()}`;
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
    abrirPaginaDeRevelacao();
  }, 950);
}

async function startReveal() {
  await enableFullscreen();
  revealBtn.classList.add("hidden");
  runCountdown();
}

ultrasoundVideo.addEventListener("ended", liberarRevelacao);
ultrasoundVideo.addEventListener("error", handleVideoError);
fullscreenBtn.addEventListener("click", enableFullscreen);
revealBtn.addEventListener("click", startReveal);
