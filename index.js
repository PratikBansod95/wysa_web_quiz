(function () {
  const titleEl = document.getElementById("work-card-title");
  const subtitleEl = document.getElementById("work-card-subtitle");
  const ctaEl = document.getElementById("work-card-cta");
  const avatarWrapEl = document.getElementById("work-card-avatar");
  const panelEl = document.getElementById("work-result-panel");
  const rightCard = document.querySelector(".hero-card-right");

  if (!titleEl || !subtitleEl || !ctaEl || !avatarWrapEl || !panelEl || !rightCard) return;

  let saved;
  try {
    saved = JSON.parse(localStorage.getItem("workBrainLatestResult") || "null");
  } catch {
    saved = null;
  }

  if (!saved || !saved.normalizedScores || !Array.isArray(saved.nextMoves) || saved.nextMoves.length === 0) {
    return;
  }

  const scores = saved.normalizedScores;
  const profile = [
    { label: "Strategist", value: Number(scores.strategist) || 0, color: "#5b2fde" },
    { label: "Explorer", value: Number(scores.explorer) || 0, color: "#7c56f0" },
    { label: "Connector", value: Number(scores.connector) || 0, color: "#9f7cf7" },
    { label: "Builder", value: Number(scores.builder) || 0, color: "#3f23b2" },
  ];

  const total = profile.reduce((sum, item) => sum + item.value, 0);
  let angle = 0;
  const segments = total
    ? profile
        .map((item) => {
          const start = angle;
          const slice = (item.value / total) * 360;
          angle += slice;
          return `${item.color} ${start.toFixed(2)}deg ${angle.toFixed(2)}deg`;
        })
        .join(", ")
    : "#cbd5e1 0deg 360deg";

  const moves = saved.nextMoves.slice(0, 4);
  let activeIndex = 0;

  panelEl.hidden = false;
  rightCard.classList.add("has-result");
  titleEl.innerHTML = "Your work pattern<br />snapshot";
  subtitleEl.textContent = "Based on your latest quiz";
  ctaEl.textContent = "VIEW FULL RESULT";
  avatarWrapEl.style.display = "none";

  panelEl.innerHTML = `
    <p class="result-panel-head">Your Next Move</p>
    <div class="result-panel-grid">
      <div class="result-mini-pie" style="background: conic-gradient(${segments});" aria-label="Work profile pie chart"></div>
      <div class="next-move-slider">
        <p class="next-move-text" id="next-move-text"></p>
        <div class="next-move-dots" id="next-move-dots"></div>
      </div>
    </div>
  `;

  const textEl = document.getElementById("next-move-text");
  const dotsEl = document.getElementById("next-move-dots");
  if (!textEl || !dotsEl) return;

  function renderSlide(index) {
    activeIndex = index;
    textEl.textContent = moves[activeIndex];
    dotsEl.querySelectorAll("button").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeIndex);
    });
  }

  moves.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to move ${i + 1}`);
    dot.addEventListener("click", () => renderSlide(i));
    dotsEl.appendChild(dot);
  });

  renderSlide(0);
  if (moves.length > 1) {
    setInterval(() => {
      const next = (activeIndex + 1) % moves.length;
      renderSlide(next);
    }, 10000);
  }
})();
