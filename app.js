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
  var LEVEL_SIZE = 6;         // จำนวนข้อที่สุ่มมาเล่นต่อ 1 ด่าน (คลังของด่านมีมากกว่านี้)
  var PASS_RATIO = 0.6;       // ผ่านด่าน (ปลดล็อกด่านถัดไป)
  var MATCH_PAIRS = 4;        // จำนวนคู่ต่อ 1 บอร์ดจับคู่คำศัพท์
  var MATCH_BOARDS = 5;       // จำนวนบอร์ดสูงสุดต่อ 1 ด่านจับคู่
  var MATCH_ALLOW_MISS = 1;   // จับผิดได้กี่ครั้งต่อบอร์ดถึงยังนับว่าถูก

  // วิชาที่สอนเป็นภาษาอังกฤษ — ใช้เลือกภาษาอ่านออกเสียง + ปลดล็อกด่านจับคู่คำศัพท์
  var EN_SUBJECTS = ["english", "math-inter", "science-inter"];
  function isEnSubject(quiz) { return EN_SUBJECTS.indexOf(quiz.subjectKey) >= 0; }

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
    if (!p.stats) p.stats = {};   // สถิติรายวิชา (dashboard พ่อแม่)
    if (!p.daily) p.daily = {};   // สถิติรายวัน (กราฟ 14 วัน)
    return p;
  }

  // ---------- สถิติสำหรับ dashboard พ่อแม่ ----------
  var MAX_Q_SECONDS = 120;   // กันเวลาเพี้ยนตอนเด็กเปิดค้างไว้แล้วเดินหนี — 1 ข้อนับไม่เกิน 2 นาที
  var DAILY_KEEP = 120;      // เก็บสถิติรายวันย้อนหลังกี่วัน (กัน localStorage บวม)

  function subjStat(p, quizId) {
    if (!p.stats[quizId]) p.stats[quizId] = { plays: 0, a: 0, c: 0, sec: 0, last: null };
    return p.stats[quizId];
  }
  function dayStat(p, day) {
    if (!p.daily[day]) p.daily[day] = { a: 0, c: 0, sec: 0 };
    return p.daily[day];
  }
  // ลบวันเก่าเกิน DAILY_KEEP — เทียบด้วยชุดคีย์ของวันที่ย้อนหลัง (คีย์ไม่ได้เติม 0 หน้า เรียงแบบข้อความไม่ได้)
  function trimDaily(p) {
    var keep = {}, i;
    for (i = 0; i < DAILY_KEEP; i++) keep[dayStr(-i)] = 1;
    Object.keys(p.daily).forEach(function (k) { if (!keep[k]) delete p.daily[k]; });
  }
  function ensureLevel(p, quizId, key) {
    if (!p.levels[quizId]) p.levels[quizId] = {};
    if (!p.levels[quizId][key]) p.levels[quizId][key] = { stars: 0, done: false };
    return p.levels[quizId][key];
  }

  // เพิ่ม/ลดดาวในธนาคาร + บันทึก ledger
  var LEDGER_KEEP = 100;   // หน้าจอโชว์ 5 รายการล่าสุด — เก็บ 100 พอ กันเซฟโตไม่มีเพดาน
  function addStars(p, amount, type, note) {
    p.starBank = Math.max(0, p.starBank + amount);
    p.ledger.push({ type: type, amount: amount, note: note, date: todayStr() });
    if (p.ledger.length > LEDGER_KEEP) p.ledger = p.ledger.slice(-LEDGER_KEEP);
  }

  // ---------- ย้ายเครื่อง: ส่งออก/นำเข้าโค้ดเซฟ (base64 รองรับ UTF-8) ----------
  function b64encode(str) { return btoa(unescape(encodeURIComponent(str))); }
  function b64decode(code) { return decodeURIComponent(escape(atob(code))); }
  // โค้ดเซฟ: ตัด daily (สถิติรายวัน) ออก — เป็นข้อมูลประกอบของเครื่องนั้น ไม่ใช่ความคืบหน้า
  // และเป็นก้อนใหญ่ที่ทำให้โค้ดยาวจนก็อปข้ามเครื่องลำบาก · ดาว/เหรียญ/ด่าน/สถิติรายวิชา ไปครบ
  function exportCode() {
    var lean = {};
    Object.keys(save).forEach(function (name) {
      var c = save[name], copy = {};
      Object.keys(c).forEach(function (k) { if (k !== "daily") copy[k] = c[k]; });
      lean[name] = copy;
    });
    return b64encode(JSON.stringify({ v: 1, save: lean, family: family }));
  }
  function importCode(code) {
    var obj = JSON.parse(b64decode((code || "").trim()));
    if (!obj || typeof obj !== "object" || !obj.save) throw new Error("bad code");
    save = obj.save;
    if (obj.family && obj.family.reward) family = obj.family;
    persist(); saveFamily();
  }
  function copyText(t, el) {
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t); return true; } } catch (e) {}
    try { el.focus(); el.select(); document.execCommand("copy"); return true; } catch (e) {}
    return false;
  }

  // รีเซ็ตความคืบหน้าของเด็กคนนี้ (เก็บ buddy ไว้) — ใช้ตอนพ่อทดสอบเสร็จ
  function resetProgress(p) {
    p.coins = 0; p.xp = 0; p.stickers = [];
    p.streak = { count: 0, lastDay: null };
    p.levels = {}; p.wrong = {};
    p.starBank = 0; p.ledger = [];
    p.stats = {}; p.daily = {};
    persist();
  }

  function buddyStage(p) { return p.xp < 60 ? 1 : (p.xp < 180 ? 2 : 3); }

  // ---------- ข้อมูล quiz ----------
  function quizzesFor(childName) {
    return (window.QUIZ_DATA.quizzes || []).filter(function (q) { return q.child === childName; });
  }
  // หั่น quiz เป็น "คลังข้อ" ของแต่ละด่าน — 1 ด่านมีข้อในคลังมากกว่า LEVEL_SIZE แล้วสุ่มมาเล่น
  // ใช้ field `stage` (0-based) ถ้ามี → เพิ่มข้อเข้าด่านเดิมได้โดยด่านอื่นไม่เลื่อน
  function stagePools(quiz) {
    var qs = quiz.questions, out = [], i;
    var hasStage = qs.some(function (q) { return typeof q.stage === "number"; });
    if (!hasStage) {
      for (i = 0; i < qs.length; i += LEVEL_SIZE) out.push(qs.slice(i, i + LEVEL_SIZE));
      return out;
    }
    qs.forEach(function (q) {
      var s = typeof q.stage === "number" ? q.stage : 0;
      if (!out[s]) out[s] = [];
      out[s].push(q);
    });
    return out.filter(function (pool) { return pool && pool.length > 0; });
  }
  function stageTitle(quiz, idx) {
    var t = (quiz.stageTitles || [])[idx];
    return "ด่าน " + (idx + 1) + (t ? " · " + t : "");
  }

  // สร้าง "มุมมองของรอบนี้" — สลับตำแหน่งตัวเลือก MC ทุกครั้งที่เล่น (จำว่า "ข้อ ง." ไม่ช่วย)
  // ชนิด fill/sort/order สลับคลังคำให้อยู่แล้วตอน render
  function makeView(q) {
    if (q.type !== "mc") return q;
    var order = shuffle(q.choices.map(function (_, i) { return i; }));
    var v = {};
    Object.keys(q).forEach(function (k) { v[k] = q[k]; });
    v.choices = order.map(function (i) { return q.choices[i]; });
    v.answer = order.indexOf(q.answer);
    return v;
  }
  function drawFrom(pool, n) {
    return shuffle(pool).slice(0, Math.min(n, pool.length)).map(makeView);
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
      // นับ "ด่านที่ทำได้เต็มดาว" แทนการรวมดาว — ดาวสะสมมาจากด่านเต็มดาวเท่านั้น จะได้ไม่สับสนกับยอดใน HUD
      var levels = stagePools(q), done = 0, perfect = 0;
      var keys = levels.map(function (_, idx) { return idx; })
        .concat((q.vocabSets || []).map(function (_, si) { return "m" + si; }));
      keys.forEach(function (k) {
        var r = levelRecord(p, q.id, k);
        if (r.done) done++;
        if (r.stars >= 3) perfect++;
      });
      var allDone = done === keys.length;
      return '<div class="subject-card' + (allDone ? " done" : "") + '" data-qid="' + q.id + '">' +
        '<div class="s-emoji">' + q.emoji + '</div>' +
        '<div class="s-name">' + esc(q.subject) + '</div>' +
        '<div class="s-prog">' + (done > 0 ? "ผ่าน " + done + "/" + keys.length + " · เต็มดาว " + perfect : "แตะเริ่มเล่น!") + '</div></div>';
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
    var levels = stagePools(quiz);
    var b = window.BUDDIES[p.buddy];

    function starStr(n) { var s = ""; for (var i = 0; i < 3; i++) s += (i < n ? "⭐" : "☆"); return s; }

    var nodes = levels.map(function (pool, idx) {
      var rec = levelRecord(p, quiz.id, idx);
      var prevDone = idx === 0 || levelRecord(p, quiz.id, idx - 1).done;
      var locked = !prevDone;
      var draw = Math.min(LEVEL_SIZE, pool.length);
      var cls = "level-node" + (rec.done ? " done" : "") + (locked ? " locked" : "");
      var sub = pool.length > draw ? draw + " ข้อ (จาก " + pool.length + ")" : draw + " ข้อ";
      return '<div class="' + cls + '" data-level="' + idx + '">' +
        '<div class="num">' + (locked ? "🔒" : (idx + 1)) + '</div>' +
        '<div class="info"><div class="t">' + esc(stageTitle(quiz, idx)) + '</div>' +
        '<div class="s">' + sub + ' · ' + (rec.done ? "ผ่านแล้ว" : (locked ? "ยังล็อกอยู่" : "แตะเพื่อเล่น!")) + '</div></div>' +
        '<div class="stars">' + starStr(rec.stars) + '</div></div>';
    }).join("");

    // ด่านพิเศษจับคู่คำศัพท์ (เฉพาะวิชาที่สอนเป็นภาษาอังกฤษ) — ปลดล็อกตั้งแต่แรก
    var matchNodes = !isEnSubject(quiz) ? "" : (quiz.vocabSets || []).map(function (set, si) {
      var rec = levelRecord(p, quiz.id, "m" + si);
      return '<div class="level-node match' + (rec.done ? " done" : "") + '" data-match="' + si + '">' +
        '<div class="num">' + (set.emoji || "🔤") + '</div>' +
        '<div class="info"><div class="t">จับคู่คำศัพท์ · ' + esc(set.title) + '</div>' +
        '<div class="s">' + set.pairs.length + ' คู่ · ' + (rec.done ? "ผ่านแล้ว" : "แตะเพื่อเล่น!") + '</div></div>' +
        '<div class="stars">' + starStr(rec.stars) + '</div></div>';
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
      '<div class="level-map">' + nodes + matchNodes + reviewNode + '</div>' +
      '<button class="btn big pink" data-shop="1">🎁 ตู้สะสมสติกเกอร์</button>';

    wireBack();
    $all(".level-node").forEach(function (el) {
      if (el.classList.contains("locked")) return;
      el.onclick = function () {
        if (el.getAttribute("data-review")) startReview(quiz);
        else if (el.getAttribute("data-match")) startMatch(quiz, parseInt(el.getAttribute("data-match"), 10));
        else startLevel(quiz, parseInt(el.getAttribute("data-level"), 10));
      };
    });
    $("[data-shop]").onclick = screenShop;
  }

  // ---------- เริ่มด่าน ----------
  function newSession(quiz, extra) {
    var s = { quiz: quiz, levelIdx: -1, levelLabel: "", kind: "quiz", questions: [], i: 0, correct: 0, combo: 0, review: false, coinsEarned: 0, xpEarned: 0, rightIds: [], wrongIds: [] };
    Object.keys(extra).forEach(function (k) { s[k] = extra[k]; });
    s.startedAt = s.lastAt = Date.now();
    // นับ "จำนวนครั้งที่เข้าเล่น" ตั้งแต่เริ่ม (ออกกลางคันก็ถือว่าเข้าเล่นแล้ว)
    var p = profile(current);
    var st = subjStat(p, quiz.id);
    st.plays++; st.last = todayStr();
    trimDaily(p);
    persist();
    return s;
  }

  function startLevel(quiz, idx) {
    var pool = stagePools(quiz)[idx] || [];
    session = newSession(quiz, { levelIdx: idx, levelLabel: stageTitle(quiz, idx), questions: drawFrom(pool, LEVEL_SIZE) });
    renderQuestion();
  }
  function startReview(quiz) {
    var p = profile(current);
    var wrongIds = p.wrong[quiz.id] || [];
    var qs = quiz.questions.filter(function (q) { return wrongIds.indexOf(q.id) >= 0; });
    session = newSession(quiz, { levelLabel: "ด่านทบทวน", questions: drawFrom(qs, qs.length), review: true });
    renderQuestion();
  }

  // ---------- ด่านจับคู่คำศัพท์ (วิชาภาษาอังกฤษ) ----------
  // สร้างบอร์ดจับคู่สดจาก vocabSets ทุกครั้งที่เล่น — สุ่มคู่ + สุ่มตำแหน่ง จำเฉลยไม่ได้
  function startMatch(quiz, setIdx) {
    var set = (quiz.vocabSets || [])[setIdx];
    if (!set || !set.pairs || set.pairs.length < 2) return;
    var pairs = shuffle(set.pairs);
    var boards = [], i;
    for (i = 0; i < pairs.length && boards.length < MATCH_BOARDS; i += MATCH_PAIRS) {
      var chunk = pairs.slice(i, i + MATCH_PAIRS);
      if (chunk.length < 2) break;   // เหลือคู่เดียว ไม่เป็นบอร์ด
      boards.push({
        id: "m" + setIdx + "-" + boards.length,
        type: "match",
        prompt: set.title,
        pairs: chunk,
        explain: set.explain || "จำเป็นคู่ๆ แล้วจะจำได้แม่นขึ้นนะ"
      });
    }
    if (!boards.length) return;
    session = newSession(quiz, {
      levelIdx: "m" + setIdx, levelLabel: "จับคู่คำศัพท์ " + set.title,
      kind: "match", questions: boards
    });
    renderQuestion();
  }

  // ---------- แสดงคำถาม ----------
  var TAGS = { mc: "เลือกคำตอบ", fill: "เติมคำ", sort: "จำแนกลงกล่อง", order: "เรียงลำดับ", match: "จับคู่คำศัพท์" };

  function renderQuestion() {
    stopSpeak();
    var p = profile(current);
    var q = session.questions[session.i];
    var total = session.questions.length;
    var pct = Math.round((session.i / total) * 100);

    var head = hudHTML(p, "map") +
      '<div class="progress-bar"><i style="width:' + pct + '%"></i></div>' +
      '<div class="q-count">ข้อ ' + (session.i + 1) + ' / ' + total + (session.review ? " · ทบทวน 💪" : "") + '</div>';

    var body = '<div class="q-card"><div class="q-head"><span class="q-tag">' + TAGS[q.type] + '</span>' +
      '<button class="speak-btn" id="speakBtn">🔊 อ่านให้ฟัง</button></div>';
    if (q.type === "mc") body += renderMC(q);
    else if (q.type === "fill") body += renderFill(q);
    else if (q.type === "sort") body += renderSort(q);
    else if (q.type === "order") body += renderOrder(q);
    else if (q.type === "match") body += renderMatch(q);
    body += '</div><div id="answerArea"></div>';

    root.innerHTML = head + body;
    wireBack();
    var sb = $("#speakBtn");
    if (sb) sb.onclick = function () { speakQuestion(session.quiz, q); };
    if (q.type === "mc") wireMC(q);
    else if (q.type === "fill") wireFill(q);
    else if (q.type === "sort") wireSort(q);
    else if (q.type === "order") wireOrder(q);
    else if (q.type === "match") wireMatch(q);
  }

  // ---------- อ่านออกเสียง (Web Speech API — ฟรี, ในตัวเบราว์เซอร์) ----------
  var _utter = null; // เก็บ reference กัน utterance โดน GC (บางเบราว์เซอร์พูดไม่จบ)
  function primeVoices() { try { if (window.speechSynthesis) { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = function () {}; } } catch (e) {} }
  function stopSpeak() { try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {} }
  function speak(text, lang) {
    try {
      var synth = window.speechSynthesis;
      if (!synth || !window.SpeechSynthesisUtterance) { toast("เครื่องนี้ไม่รองรับการอ่านออกเสียง 😢"); return; }
      function go() {
        var u = new window.SpeechSynthesisUtterance(text);
        u.lang = lang; u.rate = 0.85;
        var voices = synth.getVoices() || [];
        var pre = lang.slice(0, 2).toLowerCase();
        var v = voices.filter(function (x) { return x.lang && x.lang.toLowerCase().indexOf(pre) === 0; })[0];
        if (v) u.voice = v;
        else if (pre === "th" && voices.length > 0) toast("เครื่องนี้ยังไม่มีเสียงอ่านภาษาไทย 🔇");
        _utter = u;
        try { synth.resume(); } catch (e) {}  // แก้บั๊ก Chrome ที่ค้าง paused
        synth.speak(u);
      }
      // อย่า cancel() ทันทีก่อน speak() ในจังหวะเดียว (ทำให้ Chrome เงียบ)
      if (synth.speaking || synth.pending) { synth.cancel(); setTimeout(go, 130); }
      else go();
    } catch (e) {}
  }
  function speakQuestion(quiz, q) {
    var en = isEnSubject(quiz);
    var lang = en ? "en-US" : "th-TH";
    var gap = en ? " blank " : " ช่องว่าง ";
    var text = String(q.prompt).split("___").join(gap);
    if (q.type === "mc") {
      var keys = en ? ["A", "B", "C", "D", "E"] : ["ก", "ข", "ค", "ง", "จ"];
      text += ". " + q.choices.map(function (c, i) { return keys[i] + " " + c; }).join(", ");
    } else if (q.type === "fill") {
      text += ". " + (en ? "choose: " : "คำที่ให้เลือก ") + q.options.join(", ");
    } else if (q.type === "sort") {
      text += ". " + q.items.join(", ");
    } else if (q.type === "match") {
      text += ". " + q.pairs.map(function (pr) { return pr[0]; }).join(", ");
    }
    speak(text, lang);
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

  // ----- MATCH (จับคู่คำศัพท์: แตะคำซ้าย → แตะคำขวาที่คู่กัน) -----
  function renderMatch(q) {
    function col(list, side) {
      return list.map(function (o) {
        return '<button class="match-item" data-side="' + side + '" data-pi="' + o.i + '">' + esc(o.w) + '</button>';
      }).join("");
    }
    var left = shuffle(q.pairs.map(function (pr, i) { return { i: i, w: pr[0] }; }));
    var right = shuffle(q.pairs.map(function (pr, i) { return { i: i, w: pr[1] }; }));
    return '<div class="q-prompt">' + esc(q.prompt) + '</div>' +
      '<p class="muted" style="text-align:center;margin:6px 0">แตะคำทางซ้าย แล้วแตะคำที่คู่กันทางขวา</p>' +
      '<div class="match-grid">' +
      '<div class="match-col">' + col(left, "L") + '</div>' +
      '<div class="match-col">' + col(right, "R") + '</div>' +
      '</div>';
  }
  function wireMatch(q) {
    var selL = null, misses = 0, doneCount = 0, finished = false;
    function clearSel() { $all(".match-item.sel").forEach(function (e) { e.classList.remove("sel"); }); selL = null; }
    function flashBad(a, b) {
      a.classList.add("bad"); b.classList.add("bad");
      setTimeout(function () { a.classList.remove("bad"); b.classList.remove("bad"); }, 420);
    }
    $all(".match-item").forEach(function (el) {
      el.onclick = function () {
        if (finished || el.classList.contains("done")) return;
        if (el.getAttribute("data-side") === "L") {
          var wasSel = el.classList.contains("sel");
          clearSel();
          if (!wasSel) { el.classList.add("sel"); selL = el; }
          return;
        }
        if (!selL) return;                       // ยังไม่ได้เลือกคำซ้าย
        var a = selL, b = el;
        if (a.getAttribute("data-pi") === b.getAttribute("data-pi")) {
          a.classList.remove("sel");
          a.classList.add("done"); b.classList.add("done");
          selL = null; doneCount++;
          if (doneCount < q.pairs.length) { soundCorrect(); return; }
          finished = true;
          $all(".match-item").forEach(function (e) { e.disabled = true; });
          var ansLine = q.pairs.map(function (pr) { return "<b>" + esc(pr[0]) + "</b> = " + esc(pr[1]); }).join(" · ");
          answered(misses <= MATCH_ALLOW_MISS, q, "จับผิด " + misses + " ครั้ง — เฉลย " + ansLine);
        } else {
          misses++;
          soundWrong();
          flashBad(a, b);
          clearSel();
        }
      };
    });
  }

  // ---------- หลังตอบ (ทุกชนิดเรียกอันนี้) ----------
  function answered(ok, q, correctLine) {
    var p = profile(current);
    var buddy = window.BUDDIES[p.buddy];
    var gained = 0;
    // ---- สถิติ dashboard: นับข้อ/ข้อถูก/เวลา แยกตามวิชา · ตามด่าน · ตามวัน ----
    var now = Date.now();
    var spent = Math.min(MAX_Q_SECONDS, Math.max(0, Math.round((now - (session.lastAt || now)) / 1000)));
    session.lastAt = now;
    var st = subjStat(p, session.quiz.id);
    st.a++; st.sec += spent; st.last = todayStr();
    var dstat = dayStat(p, todayStr());
    dstat.a++; dstat.sec += spent;
    if (ok) { st.c++; dstat.c++; }
    if (!session.review) {                       // ด่านทบทวนไม่ผูกกับด่านใดด่านหนึ่ง นับรวมที่วิชาพอ
      var lrec = ensureLevel(p, session.quiz.id, session.levelIdx);
      lrec.a = (lrec.a || 0) + 1;
      if (ok) lrec.c = (lrec.c || 0) + 1;
    }

    // เก็บถูก/ผิดรายข้อ แล้ว persist ทันที — กดออกกลางด่านหนีข้อผิดไม่ได้
    (ok ? session.rightIds : session.wrongIds).push(q.id);
    if (session.kind !== "match") {              // id ของบอร์ดจับคู่เป็นของชั่วคราว ไม่เก็บลง wrong
      var wrongList = p.wrong[session.quiz.id] || [];
      var at = wrongList.indexOf(q.id);
      if (ok) { if (at >= 0) wrongList.splice(at, 1); }
      else if (at < 0) wrongList.push(q.id);
      p.wrong[session.quiz.id] = wrongList;
    }

    if (ok) {
      session.correct++;
      session.combo++;
      var mult = session.combo >= COMBO_AT ? 2 : 1;
      gained = COINS_PER_CORRECT * mult + (mult === 2 ? COMBO_BONUS : 0);
      p.coins += gained; p.xp += XP_PER_CORRECT;
      session.coinsEarned += gained; session.xpEarned += XP_PER_CORRECT;
      confetti(mult === 2 ? 60 : 36); soundCorrect();
    } else {
      session.combo = 0;
      soundWrong();
    }
    persist();

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

    // ข้อผิด/ข้อถูกถูกบันทึกลง p.wrong ไปแล้วตั้งแต่ตอนตอบ (ดู answered) ตรงนี้ไม่ต้องคำนวณซ้ำ

    // บันทึกด่าน + เข้าธนาคารดาว (เฉพาะด่านปกติ ไม่ใช่ทบทวน)
    var starDelta = 0, crossed = false;
    if (!session.review) {
      if (!p.levels[quiz.id]) p.levels[quiz.id] = {};
      var rec = p.levels[quiz.id][session.levelIdx] || { stars: 0, done: false };
      var prevStars = rec.stars;
      rec.stars = Math.max(rec.stars, stars);
      if (stars >= 1) rec.done = true;
      p.levels[quiz.id][session.levelIdx] = rec;
      // ⭐ ธนาคารดาว: ได้ 1 ดวง เฉพาะ "ครั้งแรกที่ทำด่านนี้ได้เต็ม 3 ดาว" (ตอบถูกหมดทุกข้อ)
      // ตอบถูกไม่หมด = ผ่านด่าน ปลดล็อกด่านต่อไปได้ แต่ยังไม่ได้ดาวสะสม ต้องกลับมาทำใหม่จนเต็ม
      // เช็ค prevStars < 3 ทำให้เล่นซ้ำไม่ได้ดาวเพิ่ม และเซฟเก่าที่เคยเต็มดาวแล้วก็ไม่ได้ซ้ำ
      if (prevStars < 3 && stars === 3) {
        starDelta = 1;
        var beforeBank = p.starBank;
        addStars(p, 1, "game", session.levelLabel + " " + quiz.subject);
        if (beforeBank < family.reward.cost && p.starBank >= family.reward.cost) crossed = true;
      }
    }
    persist();

    var starHTML = "";
    for (var s = 0; s < 3; s++) starHTML += '<span' + (s < stars ? '' : ' class="dim"') + '>⭐</span>';
    var buddy = window.BUDDIES[p.buddy];
    var msg = stars === 3 ? "สุดยอดดด! เก่งเต็มดาว!" : (stars >= 1 ? "ผ่านด่านแล้ว เยี่ยมมาก!" : "เกือบแล้ว ลองอีกครั้งนะ!");

    if (stars >= 1) { confetti(80); soundReward(); }

    var starLine;
    if (starDelta > 0) {
      starLine = '<div class="reward-line star">+1 ⭐ เข้าธนาคารดาว! (มี ' + p.starBank + ' ⭐)</div>';
    } else if (!session.review && stars < 3) {
      // อธิบายให้เด็กรู้ว่าทำไมยังไม่ได้ดาวสะสม + ชวนกลับมาทำใหม่
      starLine = '<div class="reward-line hint-line">อีกนิดเดียว! ตอบถูก<b>ครบทุกข้อ</b> (เต็ม 3 ดาว) ถึงจะได้ ⭐ สะสม 1 ดวง</div>' +
        '<div class="reward-line muted-line">⭐ ดาวสะสมตอนนี้: ' + p.starBank + '</div>';
    } else {
      starLine = '<div class="reward-line muted-line">⭐ ดาวสะสม: ' + p.starBank + '</div>';
    }
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

  // สรุปจุดที่ควรติว (ใช้ข้อมูล wrong + ความคืบหน้าด่าน)
  function parentStatsHTML(p) {
    var stats = quizzesFor(current).map(function (quiz) {
      var levels = stagePools(quiz), done = 0, perfect = 0, quits = 0;
      var keys = levels.map(function (_, i) { return i; })
        .concat((quiz.vocabSets || []).map(function (_, si) { return "m" + si; }));
      keys.forEach(function (k) {
        var r = levelRecord(p, quiz.id, k);
        if (r.done) done++;
        if (r.stars >= 3) perfect++;
        quits += (r.abandons || 0);
      });
      return { subject: quiz.subject, emoji: quiz.emoji, wrong: (p.wrong[quiz.id] || []).length, done: done, levels: keys.length, perfect: perfect, quits: quits };
    }).filter(function (s) { return s.wrong > 0 || s.done > 0 || s.quits > 0; });
    if (stats.length === 0) return '<p class="muted center">ยังไม่มีข้อมูล — ให้ลูกเล่นก่อนสักหน่อยนะครับ</p>';
    stats.sort(function (a, b) { return b.wrong - a.wrong; });
    return stats.map(function (s) {
      var badge = s.wrong > 0
        ? '<span class="stat-wrong">ยังพลาด ' + s.wrong + ' ข้อ</span>'
        : '<span class="stat-ok">✅ ไม่มีข้อค้าง</span>';
      var quitBadge = s.quits > 0 ? ' · <span class="stat-wrong">ออกกลางด่าน ' + s.quits + ' ครั้ง</span>' : '';
      return '<div class="stat-row"><span>' + s.emoji + ' ' + esc(s.subject) + '</span>' +
        '<span class="stat-meta">' + badge + ' · ผ่าน ' + s.done + '/' + s.levels + ' ด่าน · เต็มดาว ' + s.perfect + ' (= ' + s.perfect + ' ⭐)' + quitBadge + '</span></div>';
    }).join("");
  }

  // ---------- 📊 Dashboard พ่อแม่ ----------
  function fmtDur(sec) {
    if (!sec) return "—";
    if (sec < 60) return sec + " วิ";
    var m = Math.round(sec / 60);
    if (m < 60) return m + " นาที";
    return Math.floor(m / 60) + " ชม. " + (m % 60) + " น.";
  }
  // แยกตัวเลขกับหน่วยสำหรับช่อง KPI (เลขใหญ่บรรทัดเดียว หน่วยอยู่ใต้)
  function durParts(sec) {
    if (!sec) return { v: "0", u: "นาที" };
    if (sec < 60) return { v: String(sec), u: "วินาที" };
    var m = Math.round(sec / 60);
    if (m < 60) return { v: String(m), u: "นาที" };
    return { v: (Math.round(m / 6) / 10).toFixed(1), u: "ชั่วโมง" };
  }
  // ความแม่นยำ → สถานะ (สีมาคู่กับไอคอน+ข้อความเสมอ ไม่ให้สีสื่อความหมายลำพัง)
  function accBand(pct) {
    if (pct >= 85) return { cls: "good", icon: "✅", label: "แม่นแล้ว" };
    if (pct >= 70) return { cls: "mid", icon: "⚠️", label: "พอใช้" };
    return { cls: "bad", icon: "❗", label: "ควรติว" };
  }

  function dashRows(p) {
    return quizzesFor(current).map(function (quiz) {
      var st = p.stats[quiz.id] || { plays: 0, a: 0, c: 0, sec: 0, last: null };
      var pools = stagePools(quiz);
      var keys = pools.map(function (_, i) { return i; })
        .concat((quiz.vocabSets || []).map(function (_, si) { return "m" + si; }));
      var done = 0, perfect = 0, weak = [];
      keys.forEach(function (k) {
        var r = levelRecord(p, quiz.id, k);
        if (r.done) done++;
        if (r.stars >= 3) perfect++;
        if ((r.a || 0) >= 6) {
          weak.push({
            subject: quiz.subject, emoji: quiz.emoji,
            name: typeof k === "number" ? stageTitle(quiz, k)
              : "จับคู่คำศัพท์ " + (((quiz.vocabSets || [])[parseInt(String(k).slice(1), 10)] || {}).title || ""),
            pct: Math.round((r.c || 0) / r.a * 100), a: r.a
          });
        }
      });
      return {
        id: quiz.id, subject: quiz.subject, emoji: quiz.emoji,
        plays: st.plays, a: st.a, c: st.c, sec: st.sec, last: st.last,
        pct: st.a ? Math.round(st.c / st.a * 100) : null,
        done: done, stages: keys.length, perfect: perfect,
        wrong: (p.wrong[quiz.id] || []).length, weak: weak
      };
    });
  }

  function screenDash() {
    var p = profile(current);
    var rows = dashRows(p);
    var totA = 0, totC = 0, totSec = 0;
    rows.forEach(function (r) { totA += r.a; totC += r.c; totSec += r.sec; });
    var days = Object.keys(p.daily).length;

    if (totA === 0) {
      root.innerHTML = hudHTML(p, "parent") +
        '<h1>📊 สถิติการเล่น</h1>' +
        '<div class="q-card dash-empty"><div class="big-emoji">🌱</div>' +
        '<p>ยังไม่มีข้อมูลของ <b>' + esc(current) + '</b></p>' +
        '<p class="muted">สถิติจะเริ่มเก็บตั้งแต่ตอนนี้ — ให้ลูกเล่นสัก 1-2 ด่านแล้วกลับมาดูใหม่นะครับ</p></div>' +
        '<button class="btn big blue" data-back="parent">⟵ กลับโหมดพ่อแม่</button>';
      wireBack();
      return;
    }

    var totPct = Math.round(totC / totA * 100);
    var totBand = accBand(totPct);

    // ---- KPI ----
    var kpi = '<div class="kpi-row">' +
      '<div class="kpi"><div class="k-label">ตอบไปแล้ว</div><div class="k-value">' + totA.toLocaleString("th-TH") + '</div><div class="k-sub">ข้อ</div></div>' +
      '<div class="kpi"><div class="k-label">ตอบถูก</div><div class="k-value">' + totPct + '%</div><div class="k-sub">' + totC.toLocaleString("th-TH") + ' ข้อ</div></div>' +
      '<div class="kpi"><div class="k-label">เวลาเล่นรวม</div><div class="k-value">' + durParts(totSec).v + '</div><div class="k-sub">' + durParts(totSec).u + '</div></div>' +
      '<div class="kpi"><div class="k-label">เข้าเล่น</div><div class="k-value">' + days + '</div><div class="k-sub">วัน</div></div>' +
      '</div>';

    // ---- แท่งเทียบวิชา (สีเดียว = วัดค่าเดียวกัน) ----
    var played = rows.filter(function (r) { return r.a > 0; }).sort(function (a, b) { return b.a - a.a; });
    var never = rows.filter(function (r) { return r.a === 0; });
    var max = played[0].a;
    var bars = played.map(function (r) {
      var w = Math.max(3, Math.round(r.a / max * 100));
      var band = accBand(r.pct);
      var inside = w > 72;   // วัดก่อนวางป้าย: แท่งยาวมากให้ป้ายเข้าไปอยู่ในแท่ง จะได้ไม่ล้นขอบ
      return '<div class="dash-row">' +
        '<div class="d-name">' + r.emoji + ' ' + esc(r.subject) + '</div>' +
        '<div class="d-track"><div class="d-fill" style="width:' + w + '%"></div>' +
        '<span class="d-val' + (inside ? ' in' : '') + '" style="' + (inside ? 'right:8px' : 'left:calc(' + w + '% + 8px)') + '">' + r.a + '</span></div>' +
        '<div class="d-meta"><span class="acc-chip ' + band.cls + '">' + band.icon + ' ' + r.pct + '% ' + band.label + '</span>' +
        '<span class="d-dim">' + r.plays + ' ครั้ง · ' + fmtDur(r.sec) + ' · เต็มดาว ' + r.perfect + '/' + r.stages + '</span></div>' +
        '</div>';
    }).join("");

    var neverLine = never.length
      ? '<div class="dash-note">🕳️ <b>ยังไม่เคยแตะเลย:</b> ' + never.map(function (r) { return r.emoji + " " + esc(r.subject); }).join(" · ") + '</div>'
      : '';

    // ---- กราฟ 14 วันล่าสุด (สีเดียว, ป้ายเฉพาะวันที่มากสุด) ----
    var dayKeys = [], i;
    for (i = 13; i >= 0; i--) dayKeys.push(dayStr(-i));
    var dayVals = dayKeys.map(function (k) { return (p.daily[k] || {}).a || 0; });
    var dMax = Math.max.apply(null, dayVals.concat([1]));
    var dTotal = dayVals.reduce(function (s, v) { return s + v; }, 0);
    var labelled = false;
    var cols = dayKeys.map(function (k, idx) {
      var v = dayVals[idx];
      var h = v ? Math.max(6, Math.round(v / dMax * 100)) : 0;
      // ติดป้ายเฉพาะวันที่มากที่สุดวันเดียว แล้ววางเหนือยอดแท่ง (ไม่ทับตัวแท่ง)
      var tag = "";
      if (!labelled && v === dMax && v > 0) { labelled = true; tag = '<span class="sp-val" style="bottom:calc(' + h + '% + 3px)">' + v + '</span>'; }
      return '<div class="sp-col" title="' + k + ' — ตอบ ' + v + ' ข้อ">' + tag +
        '<div class="sp-bar" style="height:' + h + '%"></div></div>';
    }).join("");
    // แถวป้ายวันที่แยกออกมาเป็นแถวของตัวเอง — กันไม่ให้ทับปุ่มหรือโดนตัด
    var axis = dayKeys.map(function (k, idx) {
      var show = idx === 0 || idx === dayKeys.length - 1 || idx % 3 === 0;
      return '<span class="sp-day">' + (show ? k.split("-")[2] : "") + '</span>';
    }).join("");
    var dayTable = '<table class="dash-tbl"><tr><th>วันที่</th><th>ตอบ</th><th>ถูก</th><th>เวลา</th></tr>' +
      dayKeys.map(function (k, idx) {
        var d = p.daily[k] || { a: 0, c: 0, sec: 0 };
        return '<tr><td>' + k + '</td><td>' + d.a + '</td><td>' + (d.a ? Math.round(d.c / d.a * 100) + '%' : '—') + '</td><td>' + fmtDur(d.sec) + '</td></tr>';
      }).join("") + '</table>';

    // ---- ด่านที่ควรติว ----
    var weak = [];
    rows.forEach(function (r) { weak = weak.concat(r.weak); });
    weak.sort(function (a, b) { return a.pct - b.pct; });
    var weakHTML = weak.slice(0, 5).filter(function (w) { return w.pct < 85; }).map(function (w) {
      var band = accBand(w.pct);
      return '<div class="stat-row"><span>' + w.emoji + ' ' + esc(w.name) + '<br><span class="d-dim">' + esc(w.subject) + ' · ตอบไป ' + w.a + ' ข้อ</span></span>' +
        '<span class="acc-chip ' + band.cls + '">' + band.icon + ' ' + w.pct + '% ' + band.label + '</span></div>';
    }).join("");

    root.innerHTML = hudHTML(p, "parent") +
      '<h1>📊 สถิติการเล่น</h1>' +
      '<p class="center muted">' + esc(current) + ' · ' + totBand.icon + ' ภาพรวมตอบถูก ' + totPct + '% (' + totBand.label + ')</p>' +
      kpi +

      '<div class="q-card">' +
      '<h2 style="font-size:1.15rem">📚 เล่นวิชาไหนเยอะ</h2>' +
      '<p class="muted" style="font-size:.85rem">แท่งยาว = ตอบไปเยอะ (เรียงมากไปน้อย) · ป้ายท้ายแท่งคือจำนวนข้อที่ตอบสะสม</p>' +
      '<div class="dash-list">' + bars + '</div>' + neverLine + '</div>' +

      '<div class="q-card">' +
      '<h2 style="font-size:1.15rem">📅 14 วันล่าสุด</h2>' +
      '<p class="muted" style="font-size:.85rem">จำนวนข้อที่ตอบในแต่ละวัน — รวม ' + dTotal + ' ข้อ</p>' +
      '<div id="sparkWrap"><div class="spark">' + cols + '</div><div class="spark-axis">' + axis + '</div></div>' +
      '<div class="dash-tbl-wrap" id="dayTbl" hidden>' + dayTable + '</div>' +
      '<button class="btn" id="toggleTbl" style="font-size:.9rem;padding:8px 14px">📋 ดูเป็นตาราง</button></div>' +

      (weakHTML ? '<div class="q-card">' +
        '<h2 style="font-size:1.15rem">🎯 ด่านที่ควรติวก่อน</h2>' +
        '<p class="muted" style="font-size:.85rem">ด่านที่ตอบถูกน้อยที่สุด (นับเฉพาะด่านที่เล่นไปแล้วอย่างน้อย 6 ข้อ)</p>' +
        '<div class="stat-list">' + weakHTML + '</div></div>' : '') +

      '<button class="btn big blue" data-back="parent">⟵ กลับโหมดพ่อแม่</button>';

    wireBack();
    $("#toggleTbl").onclick = function () {
      var t = $("#dayTbl"), s = $("#sparkWrap");
      var showTable = t.hasAttribute("hidden");
      if (showTable) { t.removeAttribute("hidden"); s.setAttribute("hidden", ""); this.textContent = "📊 ดูเป็นกราฟ"; }
      else { t.setAttribute("hidden", ""); s.removeAttribute("hidden"); this.textContent = "📋 ดูเป็นตาราง"; }
    };
  }

  // ---------- โหมดพ่อแม่ ----------
  function screenParent() {
    var p = profile(current);
    root.innerHTML = hudHTML(p, "reward") +
      '<h1>👨‍👩‍👧 โหมดพ่อแม่</h1>' +
      '<p class="center muted">จัดการดาวและของรางวัลของ ' + esc(current) + '</p>' +

      '<button class="btn big purple" id="dashBtn">📊 ดูสถิติการเล่นแบบละเอียด</button>' +

      '<div class="q-card">' +
      '<h2 style="font-size:1.15rem">📊 สรุปจุดที่ควรติว</h2>' +
      '<p class="muted" style="font-size:.85rem">เรียงวิชาที่ยังพลาดบ่อยไว้บนสุด — เอาไว้ดูว่าควรทวนเรื่องไหนเพิ่ม</p>' +
      '<div class="stat-list">' + parentStatsHTML(p) + '</div></div>' +

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

      '<div class="q-card">' +
      '<h2 style="font-size:1.15rem">📤 ย้ายเครื่อง (เซฟ/โหลด)</h2>' +
      '<p class="muted">ย้ายความคืบหน้า (ของทั้ง 2 คน + PIN/รางวัล) ไปอีกเครื่อง<br>1) เครื่องเก่า: กดสร้างโค้ด → คัดลอก · 2) เครื่องใหม่: วางโค้ด → โหลด<br><b>⚠️ โค้ดยาวหลักหมื่นตัวอักษร</b> — วางในแอปโน้ต/อีเมลแล้วเปิดที่เครื่องใหม่ อย่าส่งผ่านแชตที่ตัดข้อความยาว · กราฟ 14 วันไม่ย้ายตาม (ดาว เหรียญ ด่าน สถิติรายวิชา ไปครบ)</p>' +
      '<button class="btn green" id="expBtn">📋 สร้าง + คัดลอกโค้ดเซฟ</button>' +
      '<textarea class="txt" id="expOut" readonly rows="3" placeholder="โค้ดเซฟจะขึ้นตรงนี้ (คัดลอกไปวางอีกเครื่อง)"></textarea>' +
      '<div style="height:8px"></div>' +
      '<textarea class="txt" id="impIn" rows="3" placeholder="วางโค้ดเซฟจากอีกเครื่องตรงนี้ แล้วกดโหลด"></textarea>' +
      '<button class="btn orange" id="impBtn">📥 โหลดข้อมูลจากโค้ด</button>' +
      '</div>' +

      '<div class="q-card">' +
      '<h2 style="font-size:1.15rem">♻️ รีเซ็ตความคืบหน้า</h2>' +
      '<p class="muted">ล้างด่าน/ดาว/เหรียญ/สติกเกอร์ของ ' + esc(current) + ' ให้เริ่มนับใหม่ (เก็บเพื่อนคู่ใจไว้) — ใช้ตอนทดสอบเสร็จแล้ว</p>' +
      '<button class="btn orange" id="resetProg">รีเซ็ตความคืบหน้าของ ' + esc(current) + '</button>' +
      '</div>' +

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
    $("#expBtn").onclick = function () {
      var out = $("#expOut");
      out.value = exportCode();
      var okc = copyText(out.value, out);
      toast(okc ? "คัดลอกโค้ดเซฟแล้ว ✓ เอาไปวางอีกเครื่อง" : "สร้างโค้ดแล้ว — กดค้างเลือกคัดลอกเองได้");
    };
    $("#impBtn").onclick = function () {
      var b = $("#impBtn");
      var code = ($("#impIn").value || "").trim();
      if (!code) { toast("วางโค้ดเซฟก่อนนะครับ"); return; }
      if (!b.getAttribute("data-armed")) {
        b.setAttribute("data-armed", "1"); b.classList.remove("orange"); b.classList.add("pink");
        b.textContent = "⚠️ จะเขียนทับข้อมูลเครื่องนี้ กดอีกครั้ง";
        return;
      }
      try {
        importCode(code);
        toast("โหลดข้อมูลสำเร็จ ✓");
        current = null; curQuiz = null;
        screenProfile();
      } catch (e) {
        b.removeAttribute("data-armed"); b.classList.remove("pink"); b.classList.add("orange");
        b.textContent = "📥 โหลดข้อมูลจากโค้ด";
        toast("โค้ดไม่ถูกต้อง ลองคัดลอกใหม่ให้ครบ");
      }
    };
    $("#resetProg").onclick = function () {
      var b = $("#resetProg");
      if (b.getAttribute("data-armed")) {
        resetProgress(profile(current));
        toast("รีเซ็ตความคืบหน้าของ " + current + " แล้ว เริ่มใหม่ได้เลย ✓");
        screenSubjects();
        return;
      }
      b.setAttribute("data-armed", "1");
      b.classList.remove("orange"); b.classList.add("pink");
      b.textContent = "⚠️ แน่ใจ? กดอีกครั้งเพื่อล้าง";
    };
    $("#changePin").onclick = function () {
      family.pin = null; saveFamily();
      askPin("ตั้ง PIN ใหม่", function () { toast("ตั้ง PIN ใหม่แล้ว ✓"); });
    };
    $("#dashBtn").onclick = screenDash;
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

  // ---------- กล่องถามยืนยัน (ใช้โครงเดียวกับแป้น PIN) ----------
  function confirmBox(title, detail, cb) {
    var ov = document.createElement("div");
    ov.className = "pin-overlay";
    ov.innerHTML = '<div class="pin-box">' +
      '<div class="pin-title">' + title + '</div>' +
      '<p class="confirm-detail">' + detail + '</p>' +
      '<button class="btn big green" id="cfmNo">เล่นต่อ ▶</button>' +
      '<button class="btn pin-cancel" id="cfmYes">ออกจากด่าน</button></div>';
    $("#cfmNo", ov).onclick = function () { ov.remove(); cb(false); };
    $("#cfmYes", ov).onclick = function () { ov.remove(); cb(true); };
    document.body.appendChild(ov);
  }

  // ---------- ออกกลางด่าน = ยังไม่ผ่าน + คืนเหรียญที่ได้ในด่านนี้ ----------
  // (ข้อที่ตอบผิดไปแล้วยังคงอยู่ใน p.wrong — ออกไปดูเฉลยแล้วเข้ามาใหม่ไม่ช่วย)
  function abandonSession() {
    if (!session) return;
    var p = profile(current);
    var quiz = session.quiz;
    p.coins = Math.max(0, p.coins - (session.coinsEarned || 0));
    p.xp = Math.max(0, p.xp - (session.xpEarned || 0));
    if (!session.review) {
      if (!p.levels[quiz.id]) p.levels[quiz.id] = {};
      var rec = p.levels[quiz.id][session.levelIdx] || { stars: 0, done: false };
      rec.abandons = (rec.abandons || 0) + 1;
      p.levels[quiz.id][session.levelIdx] = rec;
    }
    persist();
    session = null;
  }

  // ---------- ปุ่มย้อนกลับ ----------
  function wireBack() {
    $all("[data-back]").forEach(function (el) {
      el.onclick = function () {
        var to = el.getAttribute("data-back");
        function go() {
          if (to === "profile") { current = null; curQuiz = null; screenProfile(); }
          else if (to === "subjects") { curQuiz = null; screenSubjects(); }
          else if (to === "reward") screenReward();
          else if (to === "parent") screenParent();
          else if (to === "map") screenMap();
        }
        if (session) {
          confirmBox("ออกจากด่านจริงไหม? 🥺",
            "ด่านนี้จะถือว่า <b>ยังไม่ผ่าน</b> และเหรียญที่ได้ในด่านนี้จะไม่ถูกเก็บ",
            function (yes) { if (yes) { abandonSession(); go(); } });
          return;
        }
        go();
      };
    });
  }

  // ปิดแท็บ/ปิดแอปกลางด่าน = นับเป็นออกกลางด่านเหมือนกัน
  window.addEventListener("pagehide", function () { abandonSession(); });

  // ---------- start ----------
  primeVoices();
  screenProfile();
})();
