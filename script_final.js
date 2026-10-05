const data = {
  relation: {
    code: "BPD / BORDERLINE PERSONALITY DISORDER",
    title: "邊緣型",
    sub: "關係",
    headline: "當關係成為重要訊號，距離也開始說話。",
    desc: "這裡不是對人的定義，而是將相關心理特徵轉譯成「觀看焦點」來理解。",
    notice: "關係、回應、距離、語氣",
    miss: "事件也可能存在其他解釋。",
    symbol: `<div class="card-symbol relation-symbol lab-symbol" aria-label="RELATION graphic"><i></i><i></i></div>`
  },
  rule: {
    code: "ASPD / ANTISOCIAL PERSONALITY DISORDER",
    title: "反社會型",
    sub: "規則",
    headline: "當規則不再是中心，世界可能被理解成一組可通過的界線。",
    desc: "我們將規則、界線與後果轉譯成視覺路徑，而不是把人簡化成標籤。",
    notice: "規則、限制、利益、後果",
    miss: "規則背後也存在他人的感受與需求。",
    symbol: `<div class="card-symbol rule-symbol lab-symbol" aria-label="RULE graphic"></div>`
  },
  self: {
    code: "NPD / NARCISSISTIC PERSONALITY DISORDER",
    title: "自戀型",
    sub: "自我",
    headline: "當自我成為中心，所有資訊都會重新排列位置。",
    desc: "中心、比較與自我價值被轉譯成版面中的視覺權重。",
    notice: "自我價值、地位、回饋",
    miss: "他人也擁有獨立的觀看位置。",
    symbol: `<div class="card-symbol self-symbol lab-symbol" aria-label="SELF graphic"><i></i></div>`
  },
  gaze: {
    code: "AvPD / AVOIDANT PERSONALITY DISORDER",
    title: "逃避型",
    sub: "目光",
    headline: "當他人的目光變得重要，自己也可能開始退到畫面之外。",
    desc: "距離、觀看與退縮被轉譯成空間尺度。",
    notice: "評價、拒絕、尷尬、目光",
    miss: "別人的反應不一定等於否定。",
    symbol: `<div class="card-symbol gaze-symbol lab-symbol" aria-label="GAZE graphic"><i></i><i></i></div>`
  },
  attention: {
    code: "HPD / HISTRIONIC PERSONALITY DISORDER",
    title: "表演型",
    sub: "注意力",
    headline: "當注意力成為訊號，畫面裡的每個元素都在爭取被看見。",
    desc: "我們以焦點競爭與視覺層級表現注意力的轉移。",
    notice: "反應、關注、表達、回饋",
    miss: "安靜不代表不存在，也不代表沒有價值。",
    symbol: `<div class="card-symbol attention-symbol lab-symbol" aria-label="ATTENTION graphic"><i></i><i></i><i></i></div>`
  },
  reality: {
    code: "DELUSION / PSYCHOTIC-SPECTRUM TOPIC",
    title: "妄想型",
    sub: "現實解讀",
    headline: "當某個信念成為主要解釋，線索會開始彼此連結。",
    desc: "此處不是把妄想當人格類型，而是探討「現實如何被解讀」這個主題。",
    notice: "線索、巧合、因果、信念",
    miss: "同一線索可能存在不只一種解釋。",
    symbol: `<div class="card-symbol reality-symbol lab-symbol" aria-label="REALITY graphic"><i></i><i></i><i></i><i></i></div>`
  }
};

// 更新觀看實驗室 (LAB) 内容與圖形
function updateLab(k) {
  const d = data[k];
  if (!d) return;

  document.getElementById("lab-code").textContent = d.code;
  document.getElementById("lab-title").textContent = d.title;
  document.getElementById("lab-subtitle").textContent = d.sub;
  document.getElementById("lab-headline").textContent = d.headline;
  document.getElementById("lab-desc").textContent = d.desc;
  document.getElementById("notice").textContent = d.notice;
  document.getElementById("miss").textContent = d.miss;

  document.querySelectorAll(".lab-menu button").forEach(b => {
    b.classList.toggle("active", b.dataset.lab === k);
  });

  const art = document.getElementById("stage-art");
  art.dataset.theme = k;
  art.classList.remove("shifted");
  art.innerHTML = `<div class="lab-symbol-wrap">${d.symbol}</div>`;

  const symbol = art.querySelector(".lab-symbol");
  const wrap = art.querySelector(".lab-symbol-wrap");

  const toggleShift = () => {
    const shifted = art.classList.toggle("shifted");
    if (symbol) symbol.setAttribute("aria-pressed", shifted ? "true" : "false");
    art.classList.remove("lab-pulse");
    void art.offsetWidth; // 觸發 reflow 重新播動畫
    art.classList.add("lab-pulse");
  };

  if (wrap) {
    wrap.addEventListener("click", toggleShift);
  }
}

// 綁定 SHIFT 按鈕
document.getElementById("shiftBtn").addEventListener("click", () => {
  const art = document.getElementById("stage-art");
  if (!art) return;
  const shifted = art.classList.toggle("shifted");
  art.classList.remove("lab-pulse");
  void art.offsetWidth;
  art.classList.add("lab-pulse");
});

// 測驗邏輯與其他事件
const questions = [
  ["朋友已讀你的訊息，但三個小時沒有回覆。你第一個注意到的是？", ["我們是不是發生了什麼？", "他為什麼不遵守基本的回應？", "是不是我不值得被回覆？", "他是不是覺得我很奇怪？", "他是不是根本不在意我？", "這件事是不是另有原因？"]],
  ["一群人正在聊天，但沒有人接你的話。你首先注意到？", ["氣氛是不是變了？", "這種互動有沒有一個規則？", "是不是我的表現不夠好？", "大家是不是正在看我？", "我要不要做點什麼讓自己被注意？", "也許我漏掉了某個關鍵訊號。"]],
  ["你發表一個作品，大家沒有反應。你會先想到？", ["他們是不是不喜歡我了？", "評價的標準到底是什麼？", "是不是作品沒有證明我的能力？", "是不是大家覺得我很差？", "是不是我應該再讓大家注意到它？", "他們沒有反應可能代表什麼？"]],
  ["一個你信任的人突然改變態度。你第一個想法？", ["我們之間是不是出現裂縫？", "他為什麼改變規則？", "是不是我失去了原本的位置？", "是不是我做了讓他不舒服的事？", "他是不是故意讓我注意到？", "改變背後是不是存在另一個原因？"]],
  ["你發現一個看似巧合的事情。你會？", ["它是不是和某個人有關？", "這是否違反原本的規則？", "它是否和我有特殊關係？", "別人會不會怎麼看這件事？", "我要不要把這個巧合告訴大家？", "這些線索是否真的能支持同一個解釋？"]]
];

let currentQ = 0, scores = { relation: 0, rule: 0, self: 0, gaze: 0, attention: 0, reality: 0 };
const keys = Object.keys(data);

document.addEventListener("mousemove", e => {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (dot) { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; }
  if (ring) { ring.style.left = e.clientX + "px"; ring.style.top = e.clientY + "px"; }
});

document.querySelectorAll(".scroll-btn").forEach(b => b.addEventListener("click", () => {
  document.querySelector(b.dataset.target)?.scrollIntoView({ behavior: "smooth" });
}));

document.querySelectorAll(".view-choices button").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".view-choices button").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  const k = btn.dataset.view, d = data[k];
  const reveal = document.getElementById("event-reveal");
  reveal.querySelector(".reveal-code b").textContent = d.title;
  reveal.querySelector("h3").innerHTML = `你注意到的是<br><strong>${d.sub}。</strong>`;
  reveal.querySelector("p").textContent = d.headline;
  reveal.classList.add("show");
  document.querySelector(".phone").style.transform = `rotate(${({ relation: -2, rule: 0, self: 2, gaze: -1, attention: 1, reality: 3 }[k])}deg) scale(1.02)`;
}));

document.querySelectorAll(".view-card").forEach(card => card.addEventListener("click", () => {
  updateLab(card.dataset.theme);
  document.querySelector("#lab").scrollIntoView({ behavior: "smooth" });
}));

document.querySelectorAll(".lab-menu button").forEach(b => b.addEventListener("click", () => updateLab(b.dataset.lab)));

const intro = document.getElementById("testIntro"), question = document.getElementById("question");
document.getElementById("startTest").addEventListener("click", () => {
  intro.style.display = "none";
  question.style.display = "block";
  currentQ = 0;
  scores = { relation: 0, rule: 0, self: 0, gaze: 0, attention: 0, reality: 0 };
  renderQ();
});

function renderQ() {
  const [q, ans] = questions[currentQ];
  document.getElementById("qNum").textContent = `0${currentQ + 1} / 05`;
  document.getElementById("qProgress").textContent = "●".repeat(currentQ + 1) + "○".repeat(4 - currentQ);
  document.getElementById("qText").textContent = q;
  const box = document.getElementById("answers");
  box.innerHTML = "";
  ans.forEach((txt, i) => {
    const b = document.createElement("button");
    b.className = "answer";
    b.textContent = txt;
    b.addEventListener("click", () => {
      scores[keys[i]]++;
      if (currentQ < 4) { currentQ++; renderQ(); } else { showResult(); }
    });
    box.appendChild(b);
  });
}

function showResult() {
  question.style.display = "none";
  document.querySelector("#result").scrollIntoView({ behavior: "smooth" });
  let winner = keys.reduce((a, b) => scores[a] >= scores[b] ? a : b);
  const d = data[winner];
  document.getElementById("resultTitle").textContent = d.title;
  document.getElementById("resultChinese").textContent = d.sub;
  document.getElementById("resultNotice").textContent = d.notice + "。";
  document.getElementById("resultMiss").textContent = d.miss;
  const bars = document.getElementById("resultBars");
  bars.innerHTML = "";
  keys.forEach(k => {
    const pct = Math.round(scores[k] / 5 * 100);
    bars.innerHTML += `<div class="bar-row"><span>${data[k].title}</span><div class="bar"><i style="width:${pct}%"></i></div><span>${pct}%</span></div>`;
  });
}

document.getElementById("retryTest").addEventListener("click", () => {
  document.querySelector("#test").scrollIntoView({ behavior: "smooth" });
  intro.style.display = "block";
  question.style.display = "none";
});

// 初始化載入第一個實驗室項目
document.addEventListener('DOMContentLoaded', () => {
  updateLab("relation");
  initHeroEffects();
});

/* Hero 背景 3D 效果與 GSAP 視差 */
function initHeroEffects() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const particleCount = 1800;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorNeon = new THREE.Color('#FF3B30');
  const colorWhite = new THREE.Color('#FFD400');

  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 25 + 2;
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 40;

    positions[i * 3] = radius * Math.cos(theta);
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = radius * Math.sin(theta);

    const mixedColor = Math.random() > 0.66 ? colorNeon : (Math.random() > 0.5 ? colorWhite : new THREE.Color('#27C93F'));
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.002;
    particles.rotation.x += (mouseY - particles.rotation.x) * 0.02;
    particles.rotation.z += (mouseX - particles.rotation.z) * 0.02;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* Modal 彈窗控制 */
function openMerchModal(tag, title, desc, imgSrc) {
  document.getElementById('modal-tag').innerText = tag;
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-desc').innerText = desc;
  document.getElementById('modal-img').src = imgSrc;
  document.getElementById('merch-modal').classList.add('active');
}

function closeMerchModal() {
  document.getElementById('merch-modal').classList.remove('active');
}

document.getElementById('merch-modal')?.addEventListener('click', function(e) {
  if (e.target === this) closeMerchModal();
});

