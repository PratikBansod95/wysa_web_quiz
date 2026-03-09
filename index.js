(function () {
  const titleEl = document.getElementById("work-card-title");
  const subtitleEl = document.getElementById("work-card-subtitle");
  const ctaEl = document.getElementById("work-card-cta");
  const retakeEl = document.getElementById("work-card-retake");
  const avatarWrapEl = document.getElementById("work-card-avatar");
  const panelEl = document.getElementById("work-result-panel");
  const rightCard = document.querySelector(".hero-card-right");

  if (!titleEl || !subtitleEl || !ctaEl || !retakeEl || !avatarWrapEl || !panelEl || !rightCard) return;

  let saved;
  try {
    saved = JSON.parse(localStorage.getItem("workBrainLatestResult") || "null");
  } catch {
    saved = null;
  }

  if (!saved || !saved.normalizedScores) {
    return;
  }

  const scores = saved.normalizedScores;
  const profile = [
    { label: "Strategist", value: Number(scores.strategist) || 0, color: "#5b2fde" },
    { label: "Explorer", value: Number(scores.explorer) || 0, color: "#7c56f0" },
    { label: "Connector", value: Number(scores.connector) || 0, color: "#9f7cf7" },
    { label: "Builder", value: Number(scores.builder) || 0, color: "#3f23b2" },
  ];

  panelEl.hidden = false;
  rightCard.classList.add("has-result");
  titleEl.innerHTML = "Your work pattern<br />snapshot";
  subtitleEl.textContent = "Based on your latest quiz";
  ctaEl.textContent = "VIEW FULL RESULT";
  ctaEl.onclick = () => {
    window.location.href = "quiz.html#result";
  };
  retakeEl.hidden = false;
  avatarWrapEl.style.display = "none";
  retakeEl.addEventListener("click", () => {
    window.location.href = "quiz.html";
  });

  panelEl.innerHTML = `
    <p class="result-panel-head">Your Score Snapshot</p>
    <div class="result-panel-grid">
      <div class="result-score-list" aria-label="Work profile scores">
        ${profile
          .map(
            (item) => `
              <div class="result-score-row">
                <span class="result-score-label"><i style="background:${item.color};"></i>${item.label}</span>
                <span>${item.value}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
})();
