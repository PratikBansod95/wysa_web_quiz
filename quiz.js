const DIMENSIONS = {
  strategist: {
    label: "Strategist",
    short: "Sees patterns, reframes problems, thinks in systems.",
    strength: "You usually step back before stepping in.",
    risk: "You can become so busy improving the map that you delay the move.",
    improve: "Translate one insight into one small test within 24 hours.",
    insider:
      "People like you are often mistaken for being slow. The truth: you are usually protecting the team from solving the wrong problem. Your failure mode is not laziness; it is elegant delay.",
  },
  explorer: {
    label: "Explorer",
    short: "Learns by trying, poking, testing, moving.",
    strength: "You create momentum faster than most people.",
    risk: "You can generate more starts than finishes.",
    improve: "Keep only 2 active experiments at a time and kill the rest.",
    insider:
      "Fast movers often believe their issue is discipline. Usually it is not. It is unclosed loops. Once you start seeing every unfinished idea as a tax on attention, your output jumps.",
  },
  connector: {
    label: "Connector",
    short: "Builds trust, alignment, and momentum through people.",
    strength: "You reduce friction and get others moving.",
    risk: "You can over-index on alignment and under-index on decision-making.",
    improve: "Ask for input, then force a decision point and move.",
    insider:
      "This style looks soft from outside, but in messy orgs it is a leverage superpower. The trap is confusing social harmony with progress.",
  },
  builder: {
    label: "Builder",
    short: "Executes, closes loops, ships, and gets tangible movement.",
    strength: "You turn ambiguity into visible progress.",
    risk: "You can become efficient at climbing the wrong hill.",
    improve: "Before starting, write the success metric in one sentence.",
    insider:
      "Reliable executors are usually overused by teams. Everyone sends work to the person who ships. Your hidden risk is becoming the company's task sink.",
  },
};

const QUESTIONS = [
  {
    id: 1,
    category: "Monday Morning",
    prompt:
      "You open work. There's a half-finished project, a weird exciting idea, and one teammate who clearly needs help. What do you naturally do first?",
    options: [
      { text: "Step back and figure out what actually matters before touching anything.", scores: { strategist: 3, builder: 1 } },
      { text: "Poke the exciting idea for 10 minutes just to see if there's something there.", scores: { explorer: 3 } },
      { text: "Reply to the teammate and help them get unstuck.", scores: { connector: 3, builder: 1 } },
      { text: "Go straight back to the unfinished thing and push it forward.", scores: { builder: 3 } },
    ],
  },
  {
    id: 2,
    category: "After a Miss",
    prompt: "Something you worked on last week landed with a thud. Barely any response. Your first instinct is to...",
    options: [
      { text: "Question whether the original problem was framed properly.", scores: { strategist: 3 } },
      { text: "Ship a scrappier variation quickly and test again.", scores: { explorer: 3, builder: 1 } },
      { text: "Talk to people and figure out what they made of it.", scores: { connector: 3 } },
      { text: "Polish the current version and try to make it stronger.", scores: { builder: 3 } },
    ],
  },
  {
    id: 3,
    category: "Shiny Object",
    prompt: "You discover a cool tool or tactic that could maybe help your work. What usually happens?",
    options: [
      { text: "You start mapping where it fits in the broader system before touching it.", scores: { strategist: 3 } },
      { text: "You try it immediately because you think best with your hands.", scores: { explorer: 3 } },
      { text: "You send it to a few people and discuss whether it's worth using.", scores: { connector: 3 } },
      { text: "You save it and stay on current work unless there's a strong reason to switch.", scores: { builder: 3, strategist: 1 } },
    ],
  },
  {
    id: 4,
    category: "Productive Week",
    prompt: "A week feels genuinely good to you when...",
    options: [
      { text: "You understood something important that changed the direction.", scores: { strategist: 3 } },
      { text: "You tested multiple ideas and learned fast.", scores: { explorer: 3 } },
      { text: "You had strong collaboration and the room moved together.", scores: { connector: 3 } },
      { text: "You finished things that had been hanging open.", scores: { builder: 3 } },
    ],
  },
  {
    id: 5,
    category: "Slow Project",
    prompt: "A project is dragging. Not failing exactly. Just slow, foggy, and mildly annoying. Your move?",
    options: [
      { text: "Pause and rethink the shape of the problem.", scores: { strategist: 3 } },
      { text: "Create a tiny test to force signal fast.", scores: { explorer: 3, builder: 1 } },
      { text: "Pull in the right people and make the bottleneck visible.", scores: { connector: 3 } },
      { text: "Increase structure, tasks, and deadlines.", scores: { builder: 3 } },
    ],
  },
  {
    id: 6,
    category: "When Stuck",
    prompt: "You are properly stuck. Not fake-stuck. Real stuck. What is most like you?",
    options: [
      { text: "Reframe the question until the path becomes clearer.", scores: { strategist: 3 } },
      { text: "Try a different route entirely and see what breaks open.", scores: { explorer: 3 } },
      { text: "Ask someone sharp and compare thinking.", scores: { connector: 3, strategist: 1 } },
      { text: "Keep pushing on the same thread until something moves.", scores: { builder: 3 } },
    ],
  },
  {
    id: 7,
    category: "Side-Idea Attack",
    prompt: "A better idea appears mid-project. Classic. You usually...",
    options: [
      { text: "Pause and reconsider whether the whole direction should change.", scores: { strategist: 3 } },
      { text: "Spin up a tiny side test because ignoring it feels impossible.", scores: { explorer: 3 } },
      { text: "Talk it through before deciding whether it deserves oxygen.", scores: { connector: 3 } },
      { text: "Write it down and finish the current thing first.", scores: { builder: 3 } },
    ],
  },
  {
    id: 8,
    category: "Looking Back",
    prompt: "At the end of a month, what makes you feel most quietly proud?",
    options: [
      { text: "You now see the system more clearly than you did 30 days ago.", scores: { strategist: 3 } },
      { text: "You turned uncertainty into signal through repeated tests.", scores: { explorer: 3 } },
      { text: "You created trust, momentum, and useful alignment.", scores: { connector: 3 } },
      { text: "You shipped work that visibly moved things forward.", scores: { builder: 3 } },
    ],
  },
  {
    id: 9,
    category: "Urgent Ping",
    prompt: "You get an urgent message asking for help on something that was not in your plan. What tends to happen?",
    options: [
      { text: "You first ask whether this is actually the highest-leverage thing to do.", scores: { strategist: 3 } },
      { text: "You jump in quickly, solve the immediate piece, and figure out the rest on the fly.", scores: { explorer: 2, builder: 1 } },
      { text: "You help because dropped balls and blocked people bother you deeply.", scores: { connector: 3 } },
      { text: "You slot it into execution mode and close it fast.", scores: { builder: 3 } },
    ],
  },
  {
    id: 10,
    category: "Ambiguous Ask",
    prompt: "Someone says, 'Can you look into this?' with almost no context. Your natural response?",
    options: [
      { text: "Define the real question before doing any work.", scores: { strategist: 3 } },
      { text: "Start exploring and trust that the shape will emerge.", scores: { explorer: 3 } },
      { text: "Talk to the people around it until the ask becomes clearer.", scores: { connector: 3 } },
      { text: "Turn it into a checklist and start knocking pieces out.", scores: { builder: 3 } },
    ],
  },
];

let step = 0;
let answers = [];
let analysisTimer = null;

const app = document.getElementById("app");

function getScores() {
  const base = { strategist: 0, explorer: 0, connector: 0, builder: 0 };
  answers.forEach((answer) => {
    Object.entries(answer.scores).forEach(([k, v]) => {
      base[k] += v;
    });
  });
  return base;
}

function normalizeScoresToThirty(scores) {
  const entries = Object.entries(scores);
  const totalRaw = entries.reduce((sum, [, value]) => sum + value, 0);
  if (!totalRaw) return { strategist: 0, explorer: 0, connector: 0, builder: 0 };

  const scaled = entries.map(([key, value]) => {
    const exact = (value / totalRaw) * 30;
    const floored = Math.floor(exact);
    return { key, exact, floored, remainder: exact - floored };
  });

  let allocated = scaled.reduce((sum, item) => sum + item.floored, 0);
  let remaining = 30 - allocated;

  scaled
    .sort((a, b) => b.remainder - a.remainder)
    .forEach((item) => {
      if (remaining > 0) {
        item.floored += 1;
        remaining -= 1;
      }
    });

  return scaled.reduce((acc, item) => {
    acc[item.key] = item.floored;
    return acc;
  }, {});
}

function persistLatestResult(rawScores, normalizedScores, summary) {
  const payload = {
    savedAt: new Date().toISOString(),
    normalizedScores,
    nextMoves: summary.actionPlan.slice(0, 4),
    primary: summary.primary,
    secondary: summary.secondary,
  };
  try {
    localStorage.setItem("workBrainLatestResult", JSON.stringify(payload));
  } catch {
    // Ignore storage failures (private mode / quota).
  }
}

function getTopTwo(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => key);
}

function getAntiPatterns(scores) {
  const { strategist, explorer, connector, builder } = scores;
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0][0];
  const second = sorted[1][0];
  const gap = sorted[0][1] - sorted[1][1];
  const patterns = [];

  if (explorer >= 18 && builder <= 12) {
    patterns.push({
      title: "Scattered Momentum",
      body: "You are good at generating motion, but some of your energy leaks into parallel starts. This feels exciting in the moment and expensive a week later.",
      fix: "Cap active experiments at 2. Keep a visible kill list.",
    });
  }

  if (strategist >= 18 && builder <= 12) {
    patterns.push({
      title: "Elegant Delay",
      body: "You probably see the problem better than most people around you. But insight can become a hiding place if it never converts into a test or decision.",
      fix: "For every reframing, force one concrete next move within 24 hours.",
    });
  }

  if (connector >= 18 && strategist + builder < 30) {
    patterns.push({
      title: "Alignment Gravity",
      body: "You may be spending too much energy keeping the room coherent. Useful, yes. But progress stalls when the group feeling becomes more important than the actual move.",
      fix: "Set explicit decision points: input ends here, action starts here.",
    });
  }

  if (builder >= 18 && strategist <= 12) {
    patterns.push({
      title: "Execution Treadmill",
      body: "You are likely trusted because you get things done. The danger is becoming productive on tasks that should never have existed.",
      fix: "Before execution, write: what changes if this works?",
    });
  }

  if (gap <= 2) {
    patterns.push({
      title: "Hybrid Brain",
      body: "Your work style is mixed rather than pure. That is usually a strength. The catch: hybrids need stronger operating rules, otherwise you switch modes too often and feel inconsistent.",
      fix: "Choose a default mode for each project phase based on your top two styles.",
    });
  }

  if (patterns.length === 0) {
    patterns.push({
      title: "Stable Core, Predictable Blind Spot",
      body: `Your strongest mode is ${DIMENSIONS[top].label}. That gives you repeatable value. It also creates a predictable blind spot whenever you overuse it.`,
      fix: `Borrow one behavior each week from ${DIMENSIONS[second].label} to stay balanced.`,
    });
  }

  return patterns.slice(0, 2);
}

function getSummary(scores) {
  const [primary, secondary] = getTopTwo(scores);
  const primaryMeta = DIMENSIONS[primary];
  const secondaryMeta = DIMENSIONS[secondary];

  const strengths = [
    `Your dominant mode is ${primaryMeta.label}. ${primaryMeta.strength}`,
    `Your secondary mode is ${secondaryMeta.label}. This means you are not one-dimensional; you have a useful backup pattern when work gets messy.`,
    `You are most effective when the job lets you combine ${primaryMeta.label.toLowerCase()} energy with ${secondaryMeta.label.toLowerCase()} discipline.`,
  ];

  const wrong = {
    strategist: "You may spend too long sharpening the lens and not enough time exposing it to reality.",
    explorer: "You may confuse fresh motion with meaningful progress.",
    connector: "You may wait for social confidence before taking directional risk.",
    builder: "You may solve what is in front of you instead of questioning whether it deserves solving.",
  };

  const right = {
    strategist: "You usually improve the quality of the question before the team burns effort on the answer.",
    explorer: "You create signal faster than people who need full certainty to move.",
    connector: "You lower friction and make progress easier for groups, not just for yourself.",
    builder: "You convert ambiguity into visible output, which is rarer than people think.",
  };

  const actionPlan = [
    `This week: lean into what already works. ${right[primary]}`,
    `Watch the trap. ${wrong[primary]}`,
    `Upgrade path: ${primaryMeta.improve}`,
    `Multiplier move: borrow one habit from ${secondaryMeta.label}. ${secondaryMeta.improve}`,
  ];

  const hook =
    primary === "strategist" && secondary === "explorer"
      ? "You have a high-leverage product brain: you can see the shape of the problem and still move fast enough to learn. Your main risk is mode-switching chaos."
      : primary === "explorer" && secondary === "builder"
      ? "You are dangerous in the good way: fast start, real output. Your main risk is clutter from too many partially-alive ideas."
      : primary === "connector" && secondary === "builder"
      ? "You are the kind of operator teams secretly depend on: people move because you move and they trust you. Your risk is absorbing too much of the org's mess."
      : primary === "builder" && secondary === "strategist"
      ? "You have one of the strongest combinations for hard environments: you can ship, and you can think. Your risk is only using the second part when things are already on fire."
      : `Your work style is ${primaryMeta.label} with a strong ${secondaryMeta.label} layer. That mix is more useful than a pure type, but only if you know when each mode should drive.`;

  return {
    primary,
    secondary,
    hook,
    strengths,
    actionPlan,
    insider: `${primaryMeta.insider} ${secondaryMeta.insider}`,
    antiPatterns: getAntiPatterns(scores),
  };
}

function progressPct() {
  if (step === 0) return 0;
  return Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100);
}

function restartQuiz() {
  if (analysisTimer) {
    clearTimeout(analysisTimer);
    analysisTimer = null;
  }
  answers = [];
  step = 0;
  render();
}

async function shareQuiz() {
  const shareTitle = "Work Brain Diagnostic";
  const shareText =
    "I just took this Work Brain Diagnostic and got a surprisingly accurate read on how I work. Try it and compare your result.";
  const shareUrl = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
      return;
    } catch {
      return;
    }
  }

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      window.alert("Share link copied. You can paste it into WhatsApp or any messaging app.");
      return;
    } catch {
      window.alert("Could not copy link on this device.");
    }
  }
}

function renderIntro() {
  return `
    <section class="topbar">
      <div class="logo-box">WB</div>
      <div>
        <h1>Work Brain Diagnostic</h1>
        <p>A scenario-based quiz that reveals how you actually work.</p>
      </div>
    </section>

    <section class="panel panel-pad">
      <div class="badge-row">
        <span class="badge dark">3 min feel</span>
        <span class="badge">10 scenario questions</span>
        <span class="badge">Detailed result</span>
      </div>
      <h2 class="hero-title">The Way You Work Has a Pattern. Discover Your Natural Work Mode.</h2>
      <p class="hero-desc">
        This quiz catches real work behavior in the wild. No obvious "good" answers. No fake productivity theater.
        Just realistic situations, hidden patterns, and a clear summary of where you go right, where you go wrong,
        and how to improve without becoming a different person.
      </p>

      <div class="two-col">
        <article class="info-card">
          <p class="info-title">What you will get</p>
          <p>• Your dominant work archetype and backup mode</p>
          <p>• Your most likely anti-patterns</p>
          <p>• A detailed summary with sharp hooks and insider observations</p>
          <p>• A practical improvement plan, not generic advice</p>
        </article>
        <article class="info-card">
          <p class="info-title">Important</p>
          <p>Pick the answer that feels most like your real default.</p>
          <p>Not your best day. Not your ideal self.</p>
          <p>The more honest you are, the more accurate the result gets.</p>
        </article>
      </div>

      <div class="actions">
        <button class="btn primary" type="button" id="start-btn">Start the quiz</button>
        <span class="inline-note">No sign-up. No score shaming. Just signal.</span>
      </div>
    </section>
  `;
}

function renderQuiz() {
  const question = QUESTIONS[step - 1];

  return `
    <section class="topbar">
      <div class="logo-box">WB</div>
      <div>
        <h1>Work Brain Diagnostic</h1>
        <p>A scenario-based quiz that reveals how you actually work.</p>
      </div>
    </section>

    <section class="panel panel-pad progress-wrap">
      <div class="progress-meta">
        <span>Question ${step} / ${QUESTIONS.length}</span>
        <span>${progressPct()}% complete</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${progressPct()}%"></div></div>
    </section>

    <section class="panel panel-pad">
      <p class="category">${question.category}</p>
      <h2 class="question">${question.prompt}</h2>
      <p class="hero-desc">Choose the option that feels most automatic for you.</p>

      <div class="options">
        ${question.options
          .map(
            (opt, i) => `
              <button class="option" type="button" data-opt-index="${i}">
                <span class="option-id">${String.fromCharCode(65 + i)}</span>
                <p>${opt.text}</p>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderResult() {
  const rawScores = getScores();
  const scores = normalizeScoresToThirty(rawScores);
  const summary = getSummary(rawScores);
  persistLatestResult(rawScores, scores, summary);
  const profile = [
    { label: "Strategist", value: scores.strategist, color: "#5b2fde" },
    { label: "Explorer", value: scores.explorer, color: "#7c56f0" },
    { label: "Connector", value: scores.connector, color: "#9f7cf7" },
    { label: "Builder", value: scores.builder, color: "#3f23b2" },
  ];
  const totalProfileScore = profile.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const pieSegments = totalProfileScore
    ? profile
        .map((item) => {
          const start = currentAngle;
          const slice = (item.value / totalProfileScore) * 360;
          currentAngle += slice;
          return `${item.color} ${start.toFixed(2)}deg ${currentAngle.toFixed(2)}deg`;
        })
        .join(", ")
    : "#cbd5e1 0deg 360deg";

  return `
    <section class="topbar">
      <div class="logo-box">WB</div>
      <div>
        <h1>Work Brain Diagnostic</h1>
        <p>Your result is ready.</p>
      </div>
    </section>

    <section class="panel panel-pad">
      <div class="result-top">
        <div class="badge-row result-head">
          <span class="badge" style="background:#dcfce7;color:#166534;">Result ready</span>
          <span class="badge">${DIMENSIONS[summary.primary].label} × ${DIMENSIONS[summary.secondary].label}</span>
        </div>
      </div>
      <h2>Your work brain is <span class="accent">${DIMENSIONS[summary.primary].label}</span> with a strong <span class="accent">${DIMENSIONS[summary.secondary].label}</span> layer.</h2>
      <p class="hero-desc">${summary.hook}</p>

      <div class="result-grid">
        <article class="block soft">
          <h3>Detailed read</h3>
          ${summary.strengths.map((x) => `<p>${x}</p>`).join("")}
          <h3 style="margin-top:14px;">Insider information</h3>
          <p>${summary.insider}</p>
        </article>

        <article class="block white">
          <h3>Your score profile</h3>
          <div class="pie-layout">
            <div class="pie-chart" style="background: conic-gradient(${pieSegments});">
              <div class="pie-center">
                <strong>${totalProfileScore}</strong>
                <span>Total</span>
              </div>
            </div>
            <div class="pie-legend">
              ${profile
                .map(
                  (item) => `
                  <div class="legend-row">
                    <span class="legend-label"><i style="background:${item.color};"></i>${item.label}</span>
                    <span>${item.value}</span>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
          <p style="margin:10px 0 0;font-size:13px;">
            This is a behavioral fingerprint, not a good-vs-bad score.
          </p>
          <div class="score-share">
            <p class="share-copy">Help your team finding their work style</p>
            <div class="actions">
              <button class="btn primary glow" type="button" id="share-btn">Share</button>
            </div>
          </div>
        </article>
      </div>

      <div class="split">
        <article class="panel panel-pad" style="box-shadow:none;">
          <h2 style="font-size:24px;margin:0 0 10px;">Where you go right</h2>
          ${summary.actionPlan.slice(0, 2).map((x) => `<p>${x}</p>`).join("")}
        </article>
        <article class="panel panel-pad" style="box-shadow:none;">
          <h2 style="font-size:24px;margin:0 0 10px;">Where you go wrong</h2>
          ${summary.antiPatterns
            .map(
              (p) => `
              <div class="warn-box">
                <h4>${p.title}</h4>
                <p>${p.body}</p>
                <p class="warn-fix">Fix: ${p.fix}</p>
              </div>
            `
            )
            .join("")}
        </article>
      </div>

      <section class="share">
        <h2 style="font-size:24px;margin:0 0 10px;">What you should do next</h2>
        <div class="plan-grid">
          ${summary.actionPlan
            .map(
              (x, i) => `
              <article class="plan-item">
                <div class="num">${i + 1}</div>
                <p>${x}</p>
              </article>
            `
            )
            .join("")}
        </div>
        <div class="bottom-home-wrap">
          <button class="btn secondary" type="button" id="back-home-btn">Back to home</button>
        </div>
      </section>
    </section>
  `;
}

function renderAnalyzing() {
  return `
    <section class="topbar">
      <div class="logo-box">WB</div>
      <div>
        <h1>Work Brain Diagnostic</h1>
        <p>Analyzing your responses...</p>
      </div>
    </section>

    <section class="panel panel-pad analyzing-screen">
      <div class="pulse-ring" aria-hidden="true"></div>
      <h2>Analyzing your natural work pattern</h2>
      <p>
        We are comparing your response behavior across decision style, momentum, execution, and collaboration signals.
      </p>
      <div class="analyzing-bar">
        <span></span>
      </div>
      <small>This takes around 5 seconds.</small>
    </section>
  `;
}

function render() {
  const isIntro = step === 0;
  const isQuiz = step > 0 && step <= QUESTIONS.length;
  const isAnalyzing = step === QUESTIONS.length + 1;
  const isResult = step > QUESTIONS.length + 1;

  if (isIntro) {
    app.innerHTML = renderIntro();
    document.getElementById("start-btn").addEventListener("click", () => {
      step = 1;
      render();
    });
    return;
  }

  if (isQuiz) {
    app.innerHTML = renderQuiz();
    const currentQuestion = QUESTIONS[step - 1];
    app.querySelectorAll("[data-opt-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const i = Number(button.getAttribute("data-opt-index"));
        answers.push(currentQuestion.options[i]);
        if (answers.length === QUESTIONS.length) {
          step = QUESTIONS.length + 1;
          render();
          if (analysisTimer) clearTimeout(analysisTimer);
          analysisTimer = setTimeout(() => {
            step = QUESTIONS.length + 2;
            analysisTimer = null;
            render();
          }, 5000);
          return;
        } else {
          step += 1;
        }
        render();
      });
    });
    return;
  }

  if (isAnalyzing) {
    app.innerHTML = renderAnalyzing();
    return;
  }

  if (isResult) {
    app.innerHTML = renderResult();
    document.getElementById("share-btn").addEventListener("click", shareQuiz);
    document.getElementById("back-home-btn").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

render();
