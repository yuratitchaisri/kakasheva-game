/* ===== เกมทบทวนบทเรียน Kaka & Sheva — game engine ===== */
(function () {
  "use strict";

  // ---------- ค่าคงที่ของเกม ----------
  var SAVE_KEY = "ksl_save_v1";
  var COINS_PER_CORRECT = 10;
  var COMBO_BONUS = 5;        // โบนัสเมื่อตอบถูกติดกัน >=3
  var COMBO_AT = 3;
  var XP_PER_CORRECT = 10;
  var GACHA_COST = 50;
  var DUP_REFUND = 15;
  var LEVEL_SIZE = 6;         // จำนวนข้อต่อ 1 ด่าน
  var PASS_RATIO = 0.6;       // ผ่านด่าน (ปลดล็อกด่านถัดไป)

  var CHEERS = ["เก่งมากกก!", "สุดยอด!", "ถูกต้องงง!", "เยี่ยมเลย!", "ปังมาก!", "ฉลาดจัง!"];
  var COMFORTS = ["ไม่เป็นไรน้า", "ลองใหม่นะ เกือบแล้ว!", "ค่อยๆ คิดนะ", "ครั้งหน้าต้องได้!"];

  var FAM_KEY = "ksl_family_v1";

  // ---------- state ----------
  var save = loadSave();
  var family = loadFamily();
  var current = null;   // ชื่อโปรไฟล์ที่เลือกอยู่ (Kaka/Sheva)
  var curQuiz = null;   // วิชาที่เลือกอยู่
  var session = null;   // การเล่นด่านปัจจุบัน
  var root = document.getElementById("app");
  var audioCtx = null;

  // ---------- utilities ----------
  function $(sel, ctx) { return (ctx || root).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || root).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function todayStr() { var d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function dayStr(offset) { var d = new Date(); d.setDate(d.getDate() + offset); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }

  function loadSave() {
    try {
      var s = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (s && typeof s === "object") return s;
    } catch (e) {}
    return {};
  }
  function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} }

  // ---------- family config (PIN + รางวัล ใช้ร่วมทั้งบ้าน) ----------
  function loadFamily() {
    try {
      var f = JSON.parse(localStorage.getItem(FAM_KEY));
      if (f && f.reward) return f;
    } catch (e) {}
    return { pin: null, reward: { emoji: "🎁", name: "ของเล่น 100 บาท", cost: 10 } };
  }
  function saveFamily() { try { localStorage.setItem(FAM_KEY, JSON.stringify(family)); } catch (e) {} }

  function profile(name) {
    if (!save[name]) {
      save[name] = { buddy: null, coins: 0, xp: 0, stickers: [], streak: { count: 0, lastDay: null }, levels: {}, wrong: {} };
    }
    var p = save[name];
    // เผื่อ save เก่าไม่มี field ครบ
    if (!p.stickers) p.stickers = [];
    if (!p.streak) p.streak = { count: 0, lastDay: null };
    if (!p.levels) p.levels = {};
    if (!p.wrong) p.wrong = {};
    // ---- ธนาคารดาว: migration จากดาวเดิมที่มีอยู่ ----
    if (p.starBank === undefined) {
      var sum = 0;
      Object.keys(p.levels).forEach(function (qid) {
        var lv = p.levels[qid];
        Object.keys(lv).forEach(function (i) { sum += (lv[i].stars || 0); });
      });
      p.starBank = sum;
      p.ledger = sum > 0 ? [{ type: "game", amount: sum, note: "ดาวสะสมเดิม", date: todayStr() }] : [];
    }
    if (!p.ledger) p.ledger = [];
    return p;
  }

  // เพิ่ม/ลดดาวในธนาคาร + บันทึก ledger
  function addStars(p, amount, type, note) {
    p.starBank = Math.max(0, p.starBank + amount);
    p.ledger.push({ type: type, amount: amount, note: note, date: todayStr() });
  }

  function buddyStage(p) { return p.xp < 60 ? 1 : (p.xp < 180 ? 2 : 3); }

  // ---------- ข้อมูล quiz ----------
  function quizzesFor(childName) {
    return (window.QUIZ_DATA.quizzes || []).filter(function (q) { return q.child === childName; });
  }
  // หั่น quiz เป็นด่านๆ
  function levelsOf(quiz) {
    var out = [], qs = quiz.questions, i;
    for (i = 0; i < qs.length; i += LEVEL_SIZE) out.push(qs.slice(i, i + LEVEL_SIZE));
    return out;
  }

  // ---------- เสียง (Web Audio, สังเคราะห์เอง) ----------
  function beep(freqs, dur, type) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var t0 = audioCtx.currentTime;
      freqs.forEach(function (f, i) {
        var o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = type || "sine"; o.frequency.value = f;
        var s = t0 + i * (dur * 0.7);
        g.gain.setValueAtTime(0.0001, s);
        g.gain.exponentialRampToValueAtTime(0.25, s + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, s + dur);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(s); o.stop(s + dur);
      });
    } catch (e) {}
  }
  function soundCorrect() { beep([660, 880, 1180], 0.16, "triangle"); }
  function soundWrong() { beep([200, 150], 0.22, "sawtooth"); }
  function soundReward() { beep([523, 659, 784, 1047], 0.18, "triangle"); }

  // ---------- confetti ----------
  function confetti(n) {
    var c = document.getElementById("confetti");
    var colors = ["#FF5A9E", "#9B5DE5", "#4EA8FF", "#45D67A", "#FFD54A", "#FF8A3D"];
    for (var i = 0; i < (n || 40); i++) {
      var p = document.createElement("div");
      p.className = "confetti-piece";
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = pick(colors);
      p.style.animationDuration = (1 + Math.random() * 1.2) + "s";
      p.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      c.appendChild(p);
      (function (el) { setTimeout(function () { el.remove(); }, 2400); })(p);
    }
  }

  function toast(msg) {
    var t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }

  // ---------- HUD ----------
  function hudHTML(p, backTo) {
    var b = window.BUDDIES[p.buddy];
    return '<div class="hud">' +
      (backTo ? '<button class="back" data-back="' + backTo + '">⟵</button>' : '') +
      '<span class="who">' + (b ? '<span class="mini-buddy buddy-svg">' + b.svg(buddyStage(p)) + '</span>' : '') + esc(current) + '</span>' +
      '<span class="spacer"></span>' +
      '<span class="chip stars">⭐ ' + p.starBank + '</span>' +
      '<span class="chip streak">🔥 ' + p.streak.count + '</span>' +
      '<span class="chip coins">🪙 ' + p.coins + '</span>' +
      '</div>';
  }

  // ---------- หน้าเลือกโปรไฟล์ ----------
  function screenProfile() {
    var names = ["Kaka", "Sheva"];
    var cards = names.map(function (name) {
      var p = save[name];
      var b = p && p.buddy ? window.BUDDIES[p.buddy] : null;
      var has = quizzesFor(name).length > 0;
      return '<div class="profile-card" data-profile="' + name + '">' +
        (b ? '<span class="buddy-svg">' + b.svg(buddyStage(p)) + '</span>'
           : '<div class="empty-buddy">' + (name === "Kaka" ? "🦊" : "🐰") + '</div>') +
        '<div class="name">' + name + '</div>' +
        '<div class="sub">' + (has ? (p ? "🪙 " + p.coins + " · 🔥 " + p.streak.count : "แตะเพื่อเริ่ม!") : "ยังไม่มีเกม") + '</div>' +
        '</div>';
    }).join("");
    root.innerHTML =
      '<h1>🎮 เกมทบทวนบทเรียน</h1>' +
      '<p class="center muted">เลือกว่าใครจะเล่นน้า</p>' +
      '<div class="profile-grid">' + cards + '</div>' +
      '<p class="footnote">เล่นทบทวนทุกวันเพื่อสะสมเหรียญและสติกเกอร์ 🎁</p>';
    $all(".profile-card").forEach(function (el) {
      el.onclick = function () { chooseProfile(el.getAttribute("data-profile")); };
    });
  }

  function chooseProfile(name) {
    current = name;
    var p = profile(name);
    if (quizzesFor(name).length === 0) {
      root.innerHTML = hudHTML(p, "profile") +
        '<div class="q-card center"><div style="font-size:3rem">🚧</div>' +
        '<h2>ยังไม่มีเกมสำหรับ ' + esc(name) + '</h2>' +
        '<p class="muted">คุณพ่อกำลังเตรียมบทเรียนให้อยู่นะ<br>ตอนนี้ลองเล่นของ Kaka ก่อนได้เลย!</p>' +
        '<button class="btn big blue" data-back="profile">⟵ กลับ</button></div>';
      wireBack();
      return;
    }
    if (!p.buddy) { screenBuddyPick(); return; }
    dailyCheck(p);
    screenSubjects();
  }

  // ---------- เลือก Buddy ----------
  function screenBuddyPick() {
    var p = profile(current);
    var opts = Object.keys(window.BUDDIES).map(function (k) {
      var b = window.BUDDIES[k];
      return '<div class="buddy-opt" data-buddy="' + k + '">' +
        '<span class="buddy-svg">' + b.svg(1) + '</span>' +
        '<div class="name">' + esc(b.name) + '</div></div>';
    }).join("");
    root.innerHTML =
      '<h1>เลือกเพื่อนคู่ใจ</h1>' +
      '<p class="center muted">เพื่อนจะช่วยเชียร์ ' + esc(current) + ' ตอนเล่น!</p>' +
      '<div class="buddy-pick">' + opts + '</div>' +
      '<button class="btn big green" id="confirmBuddy" disabled>เริ่มเล่นเลย! ▶</button>';
    var chosen = null;
    $all(".buddy-opt").forEach(function (el) {
      el.onclick = function () {
        $all(".buddy-opt").forEach(function (e) { e.classList.remove("sel"); });
        el.classList.add("sel"); chosen = el.getAttribute("data-buddy");
        $("#confirmBuddy").disabled = false;
      };
    });
    $("#confirmBuddy").onclick = function () {
      if (!chosen) return;
      p.buddy = chosen; persist();
      dailyCheck(p);
      screenSubjects();
    };
  }

  // ---------- daily streak ----------
  function dailyCheck(p) {
    var today = todayStr();
    if (p.streak.lastDay === today) return;
    if (p.streak.lastDay === dayStr(-1)) p.streak.count += 1; else p.streak.count = 1;
    p.streak.lastDay = today;
    var bonus = 10 + Math.min(p.streak.count, 7) * 5;
    p.coins += bonus;
    persist();
    setTimeout(function () { toast("🔥 เข้าเล่นวันที่ " + p.streak.count + " ได้ +" + bonus + " 🪙"); soundReward(); }, 400);
  }

  // ---------- หน้าเลือกวิชา ----------
  function screenSubjects() {
    var p = profile(current);
    var list = quizzesFor(current);
    var cards = list.map(function (q) {
      var levels = levelsOf(q), done = 0, stars = 0;
      levels.forEach(function (_, idx) { var r = levelRecord(p, q.id, idx); if (r.done) done++; stars += r.stars; });
      var allDone = done === levels.length;
      return '<div class="subject-card' + (allDone ? " done" : "") + '" data-qid="' + q.id + '">' +
        '<div class="s-emoji">' + q.emoji + '</div>' +
        '<div class="s-name">' + esc(q.subject) + '</div>' +
        '<div class="s-prog">' + (done > 0 ? "ผ่าน " + done + "/" + levels.length + " · ⭐" + stars : "แตะเริ่มเล่น!") + '</div></div>';
    }).join("");
    root.innerHTML = hudHTML(p, "profile") +
      '<h1>เลือกวิชา 📚</h1>' +
      '<p class="center muted">' + esc(current) + ' จะทบทวนวิชาไหนดี?</p>' +
      rewardBannerHTML(p) +
      '<div class="subject-grid">' + cards + '</div>' +
      '<div class="btn-row">' +
      '<button class="btn green" data-reward="1">🎁 ของรางวัล</button>' +
      '<button class="btn blue" data-shop="1">🧸 สติกเกอร์</button>' +
      '</div>';
    wireBack();
    $all(".subject-card").forEach(function (el) {
      el.onclick = function () {
        var qid = el.getAttribute("data-qid");
        curQuiz = list.filter(function (q) { return q.id === qid; })[0];
        screenMap();
      };
    });
    $("[data-shop]").onclick = screenShop;
    $all("[data-reward]").forEach(function (el) { el.onclick = screenReward; });
  }

  // แบนเนอร์ความคืบหน้าดาว → รางวัล (ใช้ในหน้าเลือกวิชา)
  function rewardBannerHTML(p) {
    var cost = family.reward.cost, have = p.starBank;
    var pct = Math.min(100, Math.round((have / cost) * 100));
    var msg = have >= cost
      ? '🎉 แลก ' + esc(family.reward.emoji + " " + family.reward.name) + ' ได้แล้ว!'
      : 'อีก <b>' + (cost - have) + '</b> ⭐ ได้ ' + esc(family.reward.emoji + " " + family.reward.name) + '!';
    return '<div class="reward-banner" data-reward="1">' +
      '<div class="rb-top"><span>⭐ ดาวสะสม <b>' + have + '</b> / ' + cost + '</span><span>' + msg + '</span></div>' +
      '<div class="progress-bar"><i style="width:' + pct + '%"></i></div></div>';
  }

  // ---------- แผนที่ด่าน ----------
  function levelRecord(p, quizId, idx) {
    var q = p.levels[quizId] || {};
    return q[idx] || { stars: 0, done: false };
  }

  function screenMap() {
    var p = profile(current);
    var quiz = curQuiz;                       // วิชาที่เลือกจากหน้าเลือกวิชา
    var levels = levelsOf(quiz);
    var b = window.BUDDIES[p.buddy];

    var nodes = levels.map(function (chunk, idx) {
      var rec = levelRecord(p, quiz.id, idx);
      var prevDone = idx === 0 || levelRecord(p, quiz.id, idx - 1).done;
      var locked = !prevDone;
      var stars = "";
      for (var s = 0; s < 3; s++) stars += (s < rec.stars ? "⭐" : "☆");
      var cls = "level-node" + (rec.done ? " done" : "") + (locked ? " locked" : "");
      return '<div class="' + cls + '" data-level="' + idx + '">' +
        '<div class="num">' + (locked ? "🔒" : (idx + 1)) + '</div>' +
        '<div class="info"><div class="t">ด่าน ' + (idx + 1) + '</div>' +
        '<div class="s">' + chunk.length + ' ข้อ · ' + (rec.done ? "ผ่านแล้ว" : (locked ? "ยังล็อกอยู่" : "แตะเพื่อเล่น!")) + '</div></div>' +
        '<div class="stars">' + stars + '</div></div>';
    }).join("");

    // ด่านทบทวนข้อผิด
    var wrong = (p.wrong[quiz.id] || []);
    var reviewNode = wrong.length > 0
      ? '<div class="level-node review" data-review="1">' +
        '<div class="num">💪</div>' +
        '<div class="info"><div class="t">ด่านทบทวน</div><div class="s">ข้อที่เคยพลาด ' + wrong.length + ' ข้อ</div></div>' +
        '<div class="stars">🔁</div></div>'
      : '';

    root.innerHTML = hudHTML(p, "subjects") +
      '<div class="world-head"><div class="big-emoji buddy-bounce">' + quiz.emoji + '</div>' +
      '<h2>' + esc(quiz.worldName) + '</h2>' +
      '<p class="muted">' + esc(quiz.subject) + ' · ' + esc(quiz.grade) + ' · สอบครั้งที่ ' + quiz.exam + '</p></div>' +
      '<div class="level-map">' + nodes + reviewNode + '</div>' +
      '<button class="btn big pink" data-shop="1">🎁 ตู้สะสมสติกเกอร์</button>';

    wireBack();
    $all(".level-node").forEach(function (el) {
      if (el.classList.contains("locked")) return;
      el.onclick = function () {
        if (el.getAttribute("data-review")) startReview(quiz);
        else startLevel(quiz, parseInt(el.getAttribute("data-level"), 10));
      };
    });
    $("[data-shop]").onclick = screenShop;
  }

  // ---------- เริ่มด่าน ----------
  function startLevel(quiz, idx) {
    var chunk = levelsOf(quiz)[idx];
    session = { quiz: quiz, levelIdx: idx, questions: chunk, i: 0, correct: 0, combo: 0, review: false };
    renderQuestion();
  }
  function startReview(quiz) {
    var p = profile(current);
    var wrongIds = p.wrong[quiz.id] || [];
    var qs = quiz.questions.filter(function (q) { return wrongIds.indexOf(q.id) >= 0; });
    session = { quiz: quiz, levelIdx: -1, questions: shuffle(qs), i: 0, correct: 0, combo: 0, review: true };
    renderQuestion();
  }

  // ---------- แสดงคำถาม ----------
  var TAGS = { mc: "เลือกคำตอบ", fill: "เติมคำ", sort: "จำแนกลงกล่อง", order: "เรียงลำดับ" };

  function renderQuestion() {
    var p = profile(current);
    var q = session.questions[session.i];
    var total = session.questions.length;
    var pct = Math.round((session.i / total) * 100);

    var head = hudHTML(p, "map") +
      '<div class="progress-bar"><i style="width:' + pct + '%"></i></div>' +
      '<div class="q-count">ข้อ ' + (session.i + 1) + ' / ' + total + (session.review ? " · ทบทวน 💪" : "") + '</div>';

    var body = '<div class="q-card"><span class="q-tag">' + TAGS[q.type] + '</span>';
    if (q.type === "mc") body += renderMC(q);
    else if (q.type === "fill") body += renderFill(q);
    else if (q.type === "sort") body += renderSort(q);
    else if (q.type === "order") body += renderOrder(q);
    body += '</div><div id="answerArea"></div>';

    root.innerHTML = head + body;
    wireBack();
    if (q.type === "mc") wireMC(q);
    else if (q.type === "fill") wireFill(q);
    else if (q.type === "sort") wireSort(q);
    else if (q.type === "order") wireOrder(q);
  }

  // ----- MC -----
  function renderMC(q) {
    var keys = ["ก", "ข", "ค", "ง", "จ"];
    var html = '<div class="q-prompt">' + esc(q.prompt) + '</div><div class="choices">';
    q.choices.forEach(function (c, i) {
      html += '<button class="choice" data-i="' + i + '"><span class="key">' + keys[i] + '</span><span>' + esc(c) + '</span></button>';
    });
    return html + '</div>';
  }
  function wireMC(q) {
    $all(".choice").forEach(function (el) {
      el.onclick = function () {
        var i = parseInt(el.getAttribute("data-i"), 10);
        var ok = i === q.answer;
        $all(".choice").forEach(function (e) {
          e.disabled = true;
          var ei = parseInt(e.getAttribute("data-i"), 10);
          if (ei === q.answer) e.classList.add("correct");
          else if (ei === i) e.classList.add("wrong");
          else e.classList.add("dim");
        });
        answered(ok, q, "คำตอบที่ถูกคือ <b>" + keys(q.answer) + " " + esc(q.choices[q.answer]) + "</b>");
      };
    });
  }
  function keys(i) { return ["ก.", "ข.", "ค.", "ง.", "จ."][i]; }

  // ----- FILL (แตะเลือกคำ) -----
  function renderFill(q) {
    var parts = q.prompt.split("___");
    var sentence = "";
    parts.forEach(function (t, i) {
      sentence += esc(t);
      if (i < parts.length - 1) sentence += '<span class="blank-slot" data-slot="' + i + '"></span>';
    });
    var opts = shuffle(q.options);
    var bank = opts.map(function (w, i) {
      return '<button class="word-chip" data-word="' + esc(w) + '">' + esc(w) + '</button>';
    }).join("");
    return '<div class="q-prompt" style="font-size:1.05rem;color:#8a8aa0">เติมคำให้ถูกต้อง</div>' +
      '<div class="fill-sentence">' + sentence + '</div>' +
      '<div class="word-bank">' + bank + '</div>' +
      '<button class="btn big green" id="checkFill" disabled style="margin-top:14px">ตรวจคำตอบ ✓</button>';
  }
  function wireFill(q) {
    var slots = $all(".blank-slot");
    var fills = new Array(slots.length).fill(null); // word string per slot
    function refresh() {
      $("#checkFill").disabled = fills.indexOf(null) >= 0;
    }
    $all(".word-chip").forEach(function (chip) {
      chip.onclick = function () {
        if (chip.classList.contains("used")) return;
        var slot = fills.indexOf(null);
        if (slot < 0) return;
        var w = chip.getAttribute("data-word");
        fills[slot] = w;
        var sEl = slots[slot];
        sEl.textContent = w; sEl.classList.add("filled");
        sEl.setAttribute("data-chip", w);
        chip.classList.add("used");
        refresh();
      };
    });
    slots.forEach(function (sEl, idx) {
      sEl.onclick = function () {
        if (fills[idx] == null) return;
        var w = fills[idx];
        fills[idx] = null; sEl.textContent = ""; sEl.classList.remove("filled");
        // คืน chip
        var chip = $all(".word-chip").filter(function (c) { return c.getAttribute("data-word") === w && c.classList.contains("used"); })[0];
        if (chip) chip.classList.remove("used");
        refresh();
      };
    });
    $("#checkFill").onclick = function () {
      var ok = true, i;
      for (i = 0; i < q.blanks.length; i++) {
        if (q.blanks[i].indexOf(fills[i]) < 0) { ok = false; break; }
      }
      slots.forEach(function (sEl, idx) {
        sEl.classList.add(q.blanks[idx].indexOf(fills[idx]) >= 0 ? "filled" : "");
      });
      $all(".word-chip").forEach(function (c) { c.disabled = true; });
      $("#checkFill").style.display = "none";
      var ans = q.blanks.map(function (b) { return b[0]; }).join(" , ");
      answered(ok, q, "คำตอบที่ถูกคือ <b>" + esc(ans) + "</b>");
    };
  }

  // ----- SORT (แตะของ → แตะกล่อง) -----
  function renderSort(q) {
    var items = shuffle(q.items);
    var itemHTML = items.map(function (it) {
      return '<button class="sort-item" data-item="' + esc(it) + '">' + esc(it) + '</button>';
    }).join("");
    var binNames = Object.keys(q.bins);
    var binHTML = binNames.map(function (bn) {
      return '<div class="sort-bin" data-bin="' + esc(bn) + '"><div class="bin-title">' + esc(bn) + '</div><div class="drop"></div></div>';
    }).join("");
    return '<div class="q-prompt">' + esc(q.prompt) + '</div>' +
      '<p class="muted" style="text-align:center;margin:6px 0">แตะของ แล้วแตะกล่องที่ใช่</p>' +
      '<div class="sort-items">' + itemHTML + '</div>' +
      '<div class="sort-bins">' + binHTML + '</div>' +
      '<button class="btn big green" id="checkSort" disabled style="margin-top:14px">ตรวจคำตอบ ✓</button>';
  }
  function wireSort(q) {
    var placed = {}; // item -> binName
    var totalItems = q.items.length;
    var selected = null;
    function selectItem(el) {
      if (selected === el) { el.classList.remove("sel"); selected = null; return; }
      $all(".sort-item").forEach(function (e) { e.classList.remove("sel"); });
      el.classList.add("sel"); selected = el;
    }
    function refresh() { $("#checkSort").disabled = Object.keys(placed).length < totalItems; }
    function bindItems() {
      $all(".sort-items .sort-item").forEach(function (el) {
        el.onclick = function () { selectItem(el); };
      });
    }
    bindItems();
    $all(".sort-bin").forEach(function (bin) {
      bin.onclick = function () {
        if (!selected) return;
        var item = selected.getAttribute("data-item");
        var bn = bin.getAttribute("data-bin");
        placed[item] = bn;
        // ย้ายเข้า drop (แตะเพื่อเอากลับได้)
        var span = document.createElement("span");
        span.textContent = item; span.setAttribute("data-item", item);
        span.onclick = function (ev) {
          ev.stopPropagation();
          if ($("#checkSort").style.display === "none") return; // ตรวจแล้วห้ามแก้
          delete placed[item];
          span.remove();
          var back = document.createElement("button");
          back.className = "sort-item"; back.setAttribute("data-item", item); back.textContent = item;
          $(".sort-items").appendChild(back);
          back.onclick = function () { selectItem(back); };
          refresh();
        };
        $(".drop", bin).appendChild(span);
        selected.classList.add("fly");
        (function (elm) { setTimeout(function () { elm.remove(); }, 380); })(selected);
        selected = null;
        refresh();
      };
    });
    $("#checkSort").onclick = function () {
      var ok = true;
      Object.keys(placed).forEach(function (item) {
        var correctBin = null;
        Object.keys(q.bins).forEach(function (bn) { if (q.bins[bn].indexOf(item) >= 0) correctBin = bn; });
        var good = placed[item] === correctBin;
        if (!good) ok = false;
      });
      // ระบายสีถูก/ผิด
      $all(".sort-bin").forEach(function (bin) {
        var bn = bin.getAttribute("data-bin");
        $all(".drop span", bin).forEach(function (sp) {
          var it = sp.getAttribute("data-item");
          if (q.bins[bn].indexOf(it) < 0) sp.classList.add("bad");
        });
      });
      $("#checkSort").style.display = "none";
      var ansParts = Object.keys(q.bins).map(function (bn) { return "<b>" + esc(bn) + "</b>: " + esc(q.bins[bn].join(", ")); });
      answered(ok, q, "เฉลย — " + ansParts.join(" · "));
    };
  }

  // ----- ORDER (เรียงคำเป็นประโยค) -----
  function renderOrder(q) {
    var toks = shuffle(q.seq);
    var bank = toks.map(function (w) {
      return '<button class="word-chip" data-word="' + esc(w) + '">' + esc(w) + '</button>';
    }).join("");
    return '<div class="q-prompt">' + esc(q.prompt) + '</div>' +
      '<p class="muted" style="text-align:center;margin:6px 0">แตะคำเรียงให้เป็นประโยคที่ถูก</p>' +
      '<div class="order-answer" id="orderAns"></div>' +
      '<div class="word-bank">' + bank + '</div>' +
      '<button class="btn big green" id="checkOrder" disabled style="margin-top:14px">ตรวจคำตอบ ✓</button>';
  }
  function wireOrder(q) {
    var ansEl = $("#orderAns");
    var placed = []; // [{word, chip, span}]
    function refresh() { $("#checkOrder").disabled = placed.length < q.seq.length; }
    $all(".word-chip").forEach(function (chip) {
      chip.onclick = function () {
        if (chip.classList.contains("used")) return;
        chip.classList.add("used");
        var w = chip.getAttribute("data-word");
        var span = document.createElement("span");
        span.className = "order-tok"; span.textContent = w;
        var rec = { word: w, chip: chip, span: span };
        span.onclick = function () {
          if ($("#checkOrder").style.display === "none") return; // ตรวจแล้วห้ามแก้
          chip.classList.remove("used");
          var i = placed.indexOf(rec); if (i >= 0) placed.splice(i, 1);
          span.remove(); refresh();
        };
        placed.push(rec); ansEl.appendChild(span); refresh();
      };
    });
    $("#checkOrder").onclick = function () {
      var got = placed.map(function (r) { return r.word; });
      var ok = got.length === q.seq.length && got.every(function (w, i) { return w === q.seq[i]; });
      $all(".word-chip").forEach(function (c) { c.disabled = true; });
      $("#checkOrder").style.display = "none";
      answered(ok, q, "ประโยคที่ถูกคือ <b>" + esc(q.seq.join(" ")) + "</b>");
    };
  }

  // ---------- หลังตอบ (ทุกชนิดเรียกอันนี้) ----------
  function answered(ok, q, correctLine) {
    var p = profile(current);
    var buddy = window.BUDDIES[p.buddy];
    var gained = 0;
    if (ok) {
      session.correct++;
      session.combo++;
      var mult = session.combo >= COMBO_AT ? 2 : 1;
      gained = COINS_PER_CORRECT * mult + (mult === 2 ? COMBO_BONUS : 0);
      p.coins += gained; p.xp += XP_PER_CORRECT;
      persist();
      confetti(mult === 2 ? 60 : 36); soundCorrect();
    } else {
      session.combo = 0;
      soundWrong();
    }

    var fb = '<div class="feedback ' + (ok ? "ok" : "no") + '">' +
      '<div class="head">' + (ok ? "✅ " + pick(CHEERS) : "❌ " + pick(COMFORTS)) + '</div>' +
      (ok ? '<div>+' + gained + ' 🪙' + (session.combo >= COMBO_AT ? '  🔥 คอมโบ x2!' : '') + '</div>' : '<div>' + correctLine + '</div>') +
      '<div class="explain">💡 ' + esc(q.explain) + '</div></div>';

    var buddyView = '<div class="center"><span class="buddy-svg ' + (ok ? "buddy-happy" : "buddy-sad") + '" style="width:90px;height:90px">' + buddy.svg(buddyStage(p)) + '</span></div>';

    var last = session.i >= session.questions.length - 1;
    var area = $("#answerArea");
    area.innerHTML = buddyView + fb + '<button class="btn big blue" id="nextBtn">' + (last ? "ดูผลด่านนี้ 🏁" : "ข้อต่อไป ▶") + '</button>';
    // อัปเดต HUD เหรียญ
    var chip = $(".hud .coins"); if (chip) chip.textContent = "🪙 " + p.coins;
    $("#nextBtn").onclick = function () {
      if (last) finishLevel();
      else { session.i++; renderQuestion(); window.scrollTo(0, 0); }
    };
    area.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ---------- จบด่าน ----------
  function finishLevel() {
    var p = profile(current);
    var quiz = session.quiz;
    var total = session.questions.length;
    var ratio = session.correct / total;
    var stars = ratio >= 1 ? 3 : (ratio >= 0.8 ? 2 : (ratio >= PASS_RATIO ? 1 : 0));

    // อัปเดตข้อผิดสะสม (สำหรับด่านทบทวน)
    var wrongSet = {};
    (p.wrong[quiz.id] || []).forEach(function (id) { wrongSet[id] = true; });
    session.questions.forEach(function (q) {
      // ตรวจว่าข้อนี้ตอบถูกไหมในเซสชันนี้ — เราไม่ได้เก็บรายข้อ จึงคำนวณจาก wrong ใหม่ด้านล่าง
    });

    // เก็บรายข้อถูก/ผิดจริง: ต้องบันทึกตอนตอบ — ทำ fallback: recompute ไม่ได้ จึงเก็บใน session
    // (session.wrongIds ถูกเติมใน answered ด้านล่างแทน)
    (session.wrongIds || []).forEach(function (id) { wrongSet[id] = true; });
    (session.rightIds || []).forEach(function (id) { delete wrongSet[id]; });
    p.wrong[quiz.id] = Object.keys(wrongSet).map(Number);

    // บันทึกด่าน + เข้าธนาคารดาว (เฉพาะด่านปกติ ไม่ใช่ทบทวน)
    var starDelta = 0, crossed = false;
    if (!session.review) {
      if (!p.levels[quiz.id]) p.levels[quiz.id] = {};
      var rec = p.levels[quiz.id][session.levelIdx] || { stars: 0, done: false };
      var prevStars = rec.stars;
      rec.stars = Math.max(rec.stars, stars);
      if (stars >= 1) rec.done = true;
      p.levels[quiz.id][session.levelIdx] = rec;
      // ดาวเข้า bank เฉพาะส่วนที่ดีขึ้นจริง (เล่นซ้ำได้เท่าเดิม = ไม่เพิ่ม)
      starDelta = rec.stars - prevStars;
      if (starDelta > 0) {
        var beforeBank = p.starBank;
        addStars(p, starDelta, "game", "ด่าน " + (session.levelIdx + 1) + " " + quiz.subject);
        if (beforeBank < family.reward.cost && p.starBank >= family.reward.cost) crossed = true;
      }
    }
    persist();

    var starHTML = "";
    for (var s = 0; s < 3; s++) starHTML += '<span' + (s < stars ? '' : ' class="dim"') + '>⭐</span>';
    var buddy = window.BUDDIES[p.buddy];
    var msg = stars === 3 ? "สุดยอดดด! เก่งเต็มดาว!" : (stars >= 1 ? "ผ่านด่านแล้ว เยี่ยมมาก!" : "เกือบแล้ว ลองอีกครั้งนะ!");

    if (stars >= 1) { confetti(80); soundReward(); }

    var starLine = starDelta > 0
      ? '<div class="reward-line star">+' + starDelta + ' ⭐ เข้าธนาคารดาว! (มี ' + p.starBank + ' ⭐)</div>'
      : '<div class="reward-line muted-line">⭐ ดาวสะสม: ' + p.starBank + '</div>';
    var crossLine = crossed
      ? '<div class="cross-banner">🎉 ดาวครบแลก ' + esc(family.reward.emoji + " " + family.reward.name) + ' ได้แล้ว! บอกคุณพ่อคุณแม่เลย</div>'
      : '';

    root.innerHTML = hudHTML(p, "map") +
      '<div class="result-card">' +
      '<span class="buddy-svg buddy-happy" style="width:130px;height:130px">' + buddy.svg(buddyStage(p)) + '</span>' +
      '<h2>' + msg + '</h2>' +
      '<div class="result-stars">' + starHTML + '</div>' +
      '<p>ตอบถูก ' + session.correct + ' / ' + total + ' ข้อ</p>' +
      starLine + crossLine +
      '<div class="reward-line muted-line">🪙 เหรียญ: ' + p.coins + '</div>' +
      '<button class="btn big green" id="toMap">กลับแผนที่ 🗺️</button>' +
      '<button class="btn big pink" id="toReward">🎁 ดูของรางวัล</button>' +
      '<button class="btn big blue" id="toShop">🧸 ตู้สะสมสติกเกอร์</button>' +
      '</div>';
    if (crossed) { confetti(120); soundReward(); }
    $("#toMap").onclick = screenMap;
    $("#toReward").onclick = screenReward;
    $("#toShop").onclick = screenShop;
    wireBack();
    session = null;
  }

  // ---------- ตู้สะสม / กล่องสุ่ม ----------
  function screenShop() {
    var p = profile(current);
    var owned = {};
    p.stickers.forEach(function (id) { owned[id] = true; });
    var grid = window.STICKERS.map(function (s) {
      var have = owned[s.id];
      return '<div class="sticker ' + s.rarity + (have ? '' : ' locked') + '">' +
        '<span class="em">' + (have ? s.emoji : "❓") + '</span>' +
        '<span class="nm">' + (have ? esc(s.name) : "???") + '</span></div>';
    }).join("");
    var got = p.stickers.length, all = window.STICKERS.length;
    root.innerHTML = hudHTML(p, "subjects") +
      '<div class="shop-top">' +
      '<h2>🎁 ตู้สะสมสติกเกอร์</h2>' +
      '<p>สะสมได้แล้ว <b>' + got + ' / ' + all + '</b> ชิ้น</p>' +
      '<button class="btn big orange" id="gacha">เปิดกล่องสุ่ม (' + GACHA_COST + ' 🪙)</button>' +
      '<p class="muted" style="font-size:.85rem">ตอบคำถามถูกเพื่อสะสมเหรียญมาเปิดกล่องน้า</p>' +
      '</div>' +
      '<div class="sticker-grid">' + grid + '</div>';
    wireBack();
    var g = $("#gacha");
    g.disabled = p.coins < GACHA_COST;
    g.onclick = doGacha;
  }

  function doGacha() {
    var p = profile(current);
    if (p.coins < GACHA_COST) return;
    p.coins -= GACHA_COST;
    // สุ่มตามความหายาก
    var r = Math.random(), rarity = r < 0.70 ? "common" : (r < 0.95 ? "rare" : "gold");
    var poolAll = window.STICKERS.filter(function (s) { return s.rarity === rarity; });
    var owned = {}; p.stickers.forEach(function (id) { owned[id] = true; });
    var fresh = poolAll.filter(function (s) { return !owned[s.id]; });
    var dup = false, sticker;
    if (fresh.length > 0) { sticker = pick(fresh); p.stickers.push(sticker.id); }
    else { sticker = pick(poolAll); dup = true; p.coins += DUP_REFUND; }
    persist();
    confetti(70); soundReward();

    var rarityTxt = { common: "ธรรมดา", rare: "หายาก ✨", gold: "ทองคำ 🌟" }[sticker.rarity];
    root.innerHTML = hudHTML(p, "subjects") +
      '<div class="q-card gacha-pop">' +
      '<div class="em">' + sticker.emoji + '</div>' +
      '<h2>' + (dup ? "ได้ซ้ำ!" : "ได้สติกเกอร์ใหม่!") + '</h2>' +
      '<p><b>' + esc(sticker.name) + '</b> (' + rarityTxt + ')</p>' +
      (dup ? '<p class="muted">มีอยู่แล้ว คืนให้ +' + DUP_REFUND + ' 🪙</p>' : '<p class="muted">เก็บเข้าตู้เรียบร้อย 🎉</p>') +
      '<button class="btn big green" id="again" ' + (p.coins < GACHA_COST ? "disabled" : "") + '>เปิดอีกกล่อง (' + GACHA_COST + ' 🪙)</button>' +
      '<button class="btn big blue" id="backShop">ดูตู้สะสม</button>' +
      '</div>';
    wireBack();
    $("#again").onclick = doGacha;
    $("#backShop").onclick = screenShop;
  }

  // ---------- หน้าของรางวัล (ดาว → ของจริง) ----------
  function ledgerRowsHTML(p, limit) {
    var items = p.ledger.slice().reverse();
    if (limit) items = items.slice(0, limit);
    if (items.length === 0) return '<p class="muted center">ยังไม่มีประวัติ</p>';
    return items.map(function (e) {
      var icon = e.type === "redeem" ? "🎁" : (e.type === "grant" ? "💖" : "⭐");
      var amt = (e.amount > 0 ? "+" : "") + e.amount;
      return '<div class="ledger-row"><span>' + icon + ' ' + esc(e.note) + '</span>' +
        '<span class="' + (e.amount < 0 ? "neg" : "pos") + '">' + amt + ' ⭐</span></div>';
    }).join("");
  }

  function screenReward() {
    var p = profile(current);
    var cost = family.reward.cost, have = p.starBank;
    var canRedeem = have >= cost;
    var pct = Math.min(100, Math.round((have / cost) * 100));
    root.innerHTML = hudHTML(p, "subjects") +
      '<h1>🎁 ของรางวัล</h1>' +
      '<div class="reward-hero">' +
      '<div class="rh-balance">⭐ <b>' + have + '</b></div>' +
      '<div class="muted">ดาวสะสมของ ' + esc(current) + '</div>' +
      '</div>' +
      '<div class="reward-card' + (canRedeem ? " ready" : "") + '">' +
      '<div class="rc-emoji">' + family.reward.emoji + '</div>' +
      '<div class="rc-name">' + esc(family.reward.name) + '</div>' +
      '<div class="rc-cost">ใช้ ' + cost + ' ⭐</div>' +
      '<div class="progress-bar"><i style="width:' + pct + '%"></i></div>' +
      '<div class="rc-status">' + (canRedeem ? "🎉 ครบแล้ว แลกได้เลย!" : "อีก " + (cost - have) + " ⭐") + '</div>' +
      '<button class="btn big ' + (canRedeem ? "green" : "") + '" id="redeemBtn"' + (canRedeem ? "" : " disabled") + '>ขอแลกรางวัล 🔒</button>' +
      '</div>' +
      '<h2 style="font-size:1.2rem">ประวัติล่าสุด</h2>' +
      '<div class="ledger">' + ledgerRowsHTML(p, 5) + '</div>' +
      '<button class="btn big blue" id="parentBtn">โหมดพ่อแม่ 🔒</button>';
    wireBack();
    $("#redeemBtn").onclick = function () {
      if (p.starBank < cost) return;
      askPin("ใส่ PIN เพื่อแลกรางวัล", function (ok) {
        if (!ok) return;
        addStars(p, -cost, "redeem", "แลก " + family.reward.name);
        persist();
        confetti(140); soundReward();
        toast("🎉 แลกสำเร็จ! บอกคุณพ่อคุณแม่รับ " + family.reward.name);
        screenReward();
      });
    };
    $("#parentBtn").onclick = function () {
      askPin("ใส่ PIN โหมดพ่อแม่", function (ok) { if (ok) screenParent(); });
    };
  }

  // ---------- โหมดพ่อแม่ ----------
  function screenParent() {
    var p = profile(current);
    root.innerHTML = hudHTML(p, "reward") +
      '<h1>👨‍👩‍👧 โหมดพ่อแม่</h1>' +
      '<p class="center muted">จัดการดาวและของรางวัลของ ' + esc(current) + '</p>' +

      '<div class="q-card">' +
      '<h2 style="font-size:1.15rem">⭐ เพิ่ม/ลดดาว (ความดีนอกเกม)</h2>' +
      '<p class="center">ดาวตอนนี้: <b id="pBank">' + p.starBank + '</b> ⭐</p>' +
      '<input class="txt" id="grantNote" placeholder="เหตุผล เช่น ช่วยงานบ้าน" />' +
      '<div class="btn-row">' +
      '<button class="btn green" data-grant="1">+1</button>' +
      '<button class="btn green" data-grant="5">+5</button>' +
      '<button class="btn orange" data-grant="-1">−1</button>' +
      '</div></div>' +

      '<div class="q-card">' +
      '<h2 style="font-size:1.15rem">🎁 ตั้งค่าของรางวัล</h2>' +
      '<label class="fld">ชื่อรางวัล<input class="txt" id="rName" value="' + esc(family.reward.name) + '" /></label>' +
      '<label class="fld">Emoji<input class="txt" id="rEmoji" value="' + esc(family.reward.emoji) + '" maxlength="4" /></label>' +
      '<label class="fld">ใช้กี่ดาว<input class="txt" id="rCost" type="number" min="1" value="' + family.reward.cost + '" /></label>' +
      '<button class="btn green" id="saveReward">บันทึกรางวัล</button>' +
      '</div>' +

      '<div class="q-card">' +
      '<h2 style="font-size:1.15rem">📜 ประวัติทั้งหมด</h2>' +
      '<div class="ledger">' + ledgerRowsHTML(p, 0) + '</div></div>' +

      '<button class="btn big blue" id="changePin">เปลี่ยน PIN</button>' +
      '<button class="btn big" data-back="reward">⟵ กลับหน้าของรางวัล</button>';
    wireBack();

    $all("[data-grant]").forEach(function (el) {
      el.onclick = function () {
        var amt = parseInt(el.getAttribute("data-grant"), 10);
        var note = ($("#grantNote").value || "").trim() || (amt > 0 ? "ความดีพิเศษ" : "ปรับดาว");
        addStars(p, amt, "grant", note);
        persist();
        $("#pBank").textContent = p.starBank;
        toast((amt > 0 ? "เพิ่ม " : "ลด ") + Math.abs(amt) + " ⭐ ให้ " + current);
      };
    });
    $("#saveReward").onclick = function () {
      var name = ($("#rName").value || "").trim();
      var emoji = ($("#rEmoji").value || "").trim() || "🎁";
      var cost = Math.max(1, parseInt($("#rCost").value, 10) || 1);
      if (name) family.reward.name = name;
      family.reward.emoji = emoji;
      family.reward.cost = cost;
      saveFamily();
      toast("บันทึกของรางวัลแล้ว ✓");
    };
    $("#changePin").onclick = function () {
      family.pin = null; saveFamily();
      askPin("ตั้ง PIN ใหม่", function () { toast("ตั้ง PIN ใหม่แล้ว ✓"); });
    };
  }

  // ---------- แป้น PIN ----------
  function askPin(title, cb) {
    var setMode = !family.pin;
    var entered = "";
    var ov = document.createElement("div");
    ov.className = "pin-overlay";
    function render() {
      var dots = "";
      for (var i = 0; i < 4; i++) dots += '<span class="pin-dot' + (i < entered.length ? " on" : "") + '"></span>';
      var keys = "";
      ["1","2","3","4","5","6","7","8","9","","0","⌫"].forEach(function (k) {
        keys += k === "" ? '<span></span>' : '<button class="pin-key" data-k="' + k + '">' + k + '</button>';
      });
      ov.innerHTML = '<div class="pin-box">' +
        '<div class="pin-title">' + esc(setMode ? "ตั้ง PIN 4 หลัก (ครั้งแรก)" : title) + '</div>' +
        '<div class="pin-dots">' + dots + '</div>' +
        '<div class="pin-pad">' + keys + '</div>' +
        '<button class="btn pin-cancel">ยกเลิก</button></div>';
      $all(".pin-key", ov).forEach(function (b) {
        b.onclick = function () {
          var k = b.getAttribute("data-k");
          if (k === "⌫") entered = entered.slice(0, -1);
          else if (entered.length < 4) entered += k;
          render();
          if (entered.length === 4) submit();
        };
      });
      $(".pin-cancel", ov).onclick = function () { ov.remove(); cb(false); };
    }
    function submit() {
      if (setMode) { family.pin = entered; saveFamily(); ov.remove(); cb(true); }
      else if (entered === family.pin) { ov.remove(); cb(true); }
      else { entered = ""; var box = $(".pin-box", ov); box.classList.add("shake"); setTimeout(function () { box.classList.remove("shake"); }, 400); render(); }
    }
    render();
    document.body.appendChild(ov);
  }

  // ---------- ปุ่มย้อนกลับ ----------
  function wireBack() {
    $all("[data-back]").forEach(function (el) {
      el.onclick = function () {
        var to = el.getAttribute("data-back");
        if (to === "profile") { current = null; curQuiz = null; screenProfile(); }
        else if (to === "subjects") { curQuiz = null; screenSubjects(); }
        else if (to === "reward") screenReward();
        else if (to === "map") screenMap();
      };
    });
  }

  // ---------- บันทึกถูก/ผิดรายข้อ (hook เข้า answered) ----------
  // ต้องเก็บ rightIds/wrongIds สำหรับด่านทบทวน — patch เข้า session ใน answered
  var _answered = answered;
  answered = function (ok, q, line) {
    if (session) {
      if (!session.rightIds) { session.rightIds = []; session.wrongIds = []; }
      (ok ? session.rightIds : session.wrongIds).push(q.id);
    }
    return _answered(ok, q, line);
  };

  // ---------- start ----------
  screenProfile();
})();
