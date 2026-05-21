// Variável fácil de editar para definir o resultado final.
const resultado = "menino";
const nomeDoBebe = "Warlles Batista Noleto Junior";

const revealBtn = document.getElementById("reveal-btn");
const restartBtn = document.getElementById("restart-btn");
const suspenseText = document.getElementById("suspense-text");
const countdownEl = document.getElementById("countdown");
const resultSection = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const babyNameEl = document.getElementById("baby-name");
const confettiContainer = document.getElementById("confetti-container");
const balloonsContainer = document.getElementById("balloons");
const page = document.getElementById("page");
const card = document.getElementById("card");

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
  card.classList.add("celebrate");

  launchConfetti();
  launchBalloons();

  resultSection.classList.remove("hidden");

  setTimeout(() => {
    card.classList.remove("celebrate");
  }, 1100);
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

function resetExperience() {
  clearEffects();
  page.classList.remove("revealed");
  resultSection.classList.add("hidden");
  countdownEl.textContent = "";
  revealBtn.classList.remove("hidden");
  suspenseText.classList.remove("hidden");
}

function startReveal() {
  clearEffects();
  revealBtn.classList.add("hidden");
  suspenseText.classList.add("hidden");
  resultSection.classList.add("hidden");
  runCountdown();
}

revealBtn.addEventListener("click", startReveal);
restartBtn.addEventListener("click", resetExperience);
