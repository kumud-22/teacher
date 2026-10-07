const questions = [
  {
    q: "Pick your classroom superpower.",
    options: [
      ["🦅", "Detect whispering from 50 metres away"],
      ["👁️", "Spot unfinished homework instantly"],
      ["🧠", "Remember every student's name"],
      ["⏰", "Freeze time during exams"]
    ]
  },
  {
    q: "A student says: “I forgot my homework.” Your instinct is…",
    options: [
      ["😐", "The legendary silent stare"],
      ["📋", "Write it down immediately"],
      ["😂", "Give them one more chance"],
      ["🤨", "Ask 17 follow-up questions"]
    ]
  },
  {
    q: "Choose your ideal classroom.",
    options: [
      ["🤫", "Perfect silence"],
      ["🎉", "Controlled chaos"],
      ["💡", "Creative and interactive"],
      ["☕", "Anything that survives Monday morning"]
    ]
  },
  {
    q: "Choose your teacher power-up.",
    options: [
      ["📚", "Infinite knowledge"],
      ["⚡", "Unlimited energy"],
      ["🎤", "Instant attention"],
      ["🕵️", "Homework detective mode"]
    ]
  },
  {
    q: "Pick your most likely classroom catchphrase.",
    options: [
      ["👀", "“Interesting. Very interesting.”"],
      ["📝", "“Take out a sheet of paper.”"],
      ["🔔", "“We have exactly five minutes.”"],
      ["😎", "“Okay, let's make this interesting.”"]
    ]
  }
];

let current = 0;
let answers = [];

const questionArea = document.getElementById("questionArea");
const qNumber = document.getElementById("qNumber");
const progressBar = document.getElementById("progressBar");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const resultContent = document.getElementById("resultContent");

function renderQuestion() {
  const item = questions[current];
  qNumber.textContent = current + 1;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
  questionArea.innerHTML = `
    <div class="question-kicker">AI INPUT • CHOICE ${current + 1}</div>
    <div class="question">${item.q}</div>
    <div class="options">
      ${item.options.map((o,i) => `
        <button class="option ${answers[current] === i ? "selected" : ""}" data-index="${i}">
          <span class="letter">${String.fromCharCode(65+i)}</span>
          ${o[0]} ${o[1]}
        </button>`).join("")}
    </div>`;
  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => {
      answers[current] = Number(btn.dataset.index);
      renderQuestion();
    });
  });
  backBtn.disabled = current === 0;
  nextBtn.textContent = current === questions.length - 1 ? "Analyze with AI →" : "Next →";
}

nextBtn.addEventListener("click", () => {
  if (answers[current] === undefined) {
    nextBtn.animate([{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"translateX(0)"}], {duration:180});
    return;
  }
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
});

backBtn.addEventListener("click", () => {
  if (current > 0) { current--; renderQuestion(); }
});

document.getElementById("againBtn").addEventListener("click", () => {
  current = 0; answers = [];
  result.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
  window.scrollTo({top:0, behavior:"smooth"});
});

document.getElementById("printBtn").addEventListener("click", () => window.print());

function showResult() {
  const resultData = generateProfile();
  resultContent.innerHTML = `
    <div class="profile-head">
      <div class="avatar">${resultData.emoji}</div>
      <div>
        <div class="type">${resultData.title}</div>
        <div class="subtitle">${resultData.subtitle}</div>
      </div>
    </div>
    <div class="grid">
      <div class="card"><h3>Teaching style</h3><p>${resultData.style}</p></div>
      <div class="card"><h3>Special ability</h3><p>${resultData.power}</p></div>
      <div class="card"><h3>Weakness</h3><p>${resultData.weakness}</p></div>
      <div class="card"><h3>Classroom status</h3><p>${resultData.status}</p></div>
    </div>
    <div class="quote">💬 ${resultData.catchphrase}</div>
    <div class="scores">
      ${resultData.scores.map(s => `
        <div class="score">
          <div class="score-row"><span>${s[0]}</span><strong>${s[1]}%</strong></div>
          <div class="bar"><i style="width:${s[1]}%"></i></div>
        </div>`).join("")}
    </div>`;
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  window.scrollTo({top:0, behavior:"smooth"});
}

function generateProfile() {
  // Deterministic, offline-safe "AI-style" engine.
  // Replace this function with an API call later if you want live generative AI.
  const picks = answers.map((a,i) => questions[i].options[a][1].toLowerCase());
  const joined = picks.join(" ");

  let profile;
  if (joined.includes("whispering") || joined.includes("attention")) {
    profile = {
      emoji:"🦅", title:"The Legendary Commander",
      subtitle:"The classroom has been notified.",
      style:"High awareness, quick reactions, and absolutely no tolerance for mysterious whispering.",
      power:"Can detect a suspicious conversation from an impressive distance.",
      weakness:"Students who suddenly become extremely quiet.",
      status:"Authority level: MAXIMUM",
      catchphrase:"“Interesting. Very interesting.”",
      scores:[["Homework radar",98],["Classroom awareness",97],["Chaos tolerance",61],["Monday energy",74]]
    };
  } else if (joined.includes("creative") || joined.includes("interesting")) {
    profile = {
      emoji:"🎨", title:"The Creative Professor",
      subtitle:"Learning, but make it interesting.",
      style:"Turns ordinary lessons into experiments, stories, debates and unexpected questions.",
      power:"Can turn a boring topic into something students actually want to discuss.",
      weakness:"A classroom that is completely silent for more than 12 seconds.",
      status:"Creativity level: OVERCLOCKED",
      catchphrase:"“Okay, let's make this interesting.”",
      scores:[["Creativity",99],["Student engagement",95],["Chaos tolerance",88],["Homework radar",69]]
    };
  } else if (joined.includes("homework detective") || joined.includes("unfinished homework")) {
    profile = {
      emoji:"🕵️", title:"The Homework Detective",
      subtitle:"No assignment left behind.",
      style:"Calm, observant and mysteriously aware of exactly who did—and did not—finish the work.",
      power:"Can identify a missing assignment before the register is opened.",
      weakness:"The phrase “I left it at home.”",
      status:"Investigation: ALWAYS ACTIVE",
      catchphrase:"“I have one question… where is your homework?”",
      scores:[["Homework radar",100],["Detective mode",99],["Chaos tolerance",63],["Patience",78]]
    };
  } else {
    profile = {
      emoji:"☕", title:"The Chaos Coordinator",
      subtitle:"Order is optional. Learning is not.",
      style:"Keeps the room moving, adapts quickly and somehow makes controlled chaos look like a lesson plan.",
      power:"Can regain classroom attention at exactly the right moment.",
      weakness:"Monday mornings.",
      status:"Classroom balance: STABLE-ISH",
      catchphrase:"“We have exactly five minutes. Let's do this.”",
      scores:[["Adaptability",94],["Energy",91],["Chaos tolerance",96],["Monday energy",54]]
    };
  }

  // Small variation based on the visitor's choices.
  const seed = answers.reduce((a,b)=>a+b,0);
  profile.scores = profile.scores.map((s,i)=>[s[0], Math.min(100, s[1] + ((seed+i)%5)-2)]);
  return profile;
}

renderQuestion();
