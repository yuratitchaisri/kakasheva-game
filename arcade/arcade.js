/* ฮีโร่ตะลุยสอบ — เกมวิ่ง 3 เลนตอบคำถาม + ด่านยิงฟองสบู่ (vanilla JS · ไม่มี server)
 * ข้อมูลคำถาม: window.ARCADE_DATA (web/arcade/data-exam3.js สร้างด้วย tools/game_build.py)
 * ความคืบหน้า: localStorage "ksl_arcade_v1"
 */
(function () {
  'use strict';

  var DATA = window.ARCADE_DATA || { kids: {} };
  var SAVE_KEY = 'ksl_arcade_v1';
  var FONT = '"Mali","Thonburi","Leelawadee UI","Noto Sans Thai",system-ui,sans-serif';
  var app = document.getElementById('app');

  // ---------- ตัวละครบล็อกสไตล์ Roblox (web/arcade/blocky.js) ----------
  var SK = window.Blocky;
  var HEROES = SK.SKINS;
  function heroImg(id, px) { return '<img class="av" src="' + SK.img(id, px * 2) + '" width="' + px + '" height="' + px + '" alt="">'; }
  // ตัวละคร + ของที่ใส่อยู่ของลูกคนนั้น
  function lookObj(kid, over) { var l = {}, b = K(kid).look; for (var x in b) l[x] = b[x]; if (over) for (var y in over) l[y] = over[y]; return SK.compose(l); }
  function lookImg(kid, px, over, back) { return '<img class="av" src="' + SK.img(lookObj(kid, over), px * 2, back ? { back: true } : null) + '" width="' + px + '" height="' + px + '" alt="">'; }
  var DEFAULT_HERO = { Kaka: 'noob', Sheva: 'bacon' };

  // ---------- ธีมของแต่ละวิชา ----------
  var THEMES = {
    thai:      { c: ['#f472b6', '#db2777'], sky: ['#ffd1e8', '#fff5d6'], grass: ['#86efac', '#6ee7a0'], road: ['#a8a29e', '#9c958f'], deco: ['🌳', '🌸', '🏯'], rock: '🌵', boss: '👹', bossName: 'ปีศาจสะกดผิด' },
    math:      { c: ['#60a5fa', '#2563eb'], sky: ['#bfdbfe', '#eff6ff'], grass: ['#a7f3d0', '#8ee8c2'], road: ['#94a3b8', '#8a99ae'], deco: ['🌲', '📐', '🏢'], rock: '🧱', boss: '🤖', bossName: 'หุ่นยนต์คิดเลขผิด' },
    mathinter: { c: ['#22d3ee', '#0891b2'], sky: ['#a5f3fc', '#ecfeff'], grass: ['#bbf7d0', '#a3eec0'], road: ['#9ca3af', '#8f96a3'], deco: ['🌴', '🔷', '🏙️'], rock: '📦', boss: '🦑', bossName: 'หมึกยักษ์ตัวเลข' },
    sci:       { c: ['#fbbf24', '#d97706'], sky: ['#fde68a', '#fffbeb'], grass: ['#bef264', '#a8e05a'], road: ['#a8a29e', '#9c958f'], deco: ['🌻', '🔦', '🌳'], rock: '🛢️', boss: '🌚', bossName: 'ราชาเงามืด' },
    sciinter:  { c: ['#a3e635', '#65a30d'], sky: ['#d9f99d', '#f7fee7'], grass: ['#86efac', '#74e39b'], road: ['#a8a29e', '#9c958f'], deco: ['🌱', '🌈', '🌳'], rock: '🌵', boss: '🐛', bossName: 'หนอนจอมกิน' },
    social:    { c: ['#34d399', '#059669'], sky: ['#bbf7d0', '#f0fdf4'], grass: ['#86efac', '#74e39b'], road: ['#a8a29e', '#9c958f'], deco: ['🏠', '🏫', '🌳'], rock: '🚧', boss: '😈', bossName: 'จอมป่วนกติกา' },
    history:   { c: ['#c084fc', '#7e22ce'], sky: ['#e9d5ff', '#faf5ff'], grass: ['#a7f3d0', '#94e8c0'], road: ['#b8a58a', '#ab987c'], deco: ['🛕', '🏯', '🌳'], rock: '🗿', boss: '🐉', bossName: 'มังกรขี้ลืม' },
    english:   { c: ['#fb7185', '#e11d48'], sky: ['#fecdd3', '#fff1f2'], grass: ['#86efac', '#74e39b'], road: ['#a1a1aa', '#94949d'], deco: ['🏙️', '🌳', '🚌'], rock: '🚧', boss: '👾', bossName: 'Space Monster' }
  };
  THEMES.mix = { c: ['#7c3aed', '#db2777'], sky: ['#c4b5fd', '#fce7f3'], grass: ['#f0abfc', '#e7a0f5'], road: ['#a78bfa', '#9d80f3'], deco: ['⭐', '🌈', '🏰'], rock: '🚧', boss: '👑', bossName: 'ราชาปีศาจรวมวิชา' };
  function theme(key) { return THEMES[key] || THEMES.thai; }

  // ---------- บันทึก ----------
  var S = load();
  function load() {
    var d;
    try { d = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { d = null; }
    d = d || {};
    d.kids = d.kids || {};
    d.settings = d.settings || {};
    if (d.settings.sound === undefined) d.settings.sound = true;
    if (d.settings.voice === undefined) d.settings.voice = true;
    if (d.settings.limit === undefined) d.settings.limit = 30;
    return d;
  }
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) {} }
  function K(name) {
    var k = S.kids[name];
    if (!k) {
      k = S.kids[name] = { coins: 0, hero: DEFAULT_HERO[name] || 'noob', owned: [], stars: {}, wrong: {}, subj: {}, days: {}, gift: '' };
    }
    if (!SK.BY[k.hero]) k.hero = DEFAULT_HERO[name] || 'noob';   // เซฟเก่าที่เป็นอีโมจิ
    k.look = k.look || { base: k.hero }; if (!SK.BY[k.look.base]) k.look.base = k.hero;
    k.inv = (k.inv || []).filter(function (id) { return SK.IT[id]; });
    for (var sl in k.look) if (sl !== 'base' && k.look[sl] && k.inv.indexOf(k.look[sl]) < 0) delete k.look[sl];
    k.owned = (k.owned || []).filter(function (id) { return SK.BY[id]; });
    return k;
  }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dayRec(k) { var t = today(); k.days[t] = k.days[t] || { sec: 0, q: 0, ok: 0 }; return k.days[t]; }

  // ---------- ตัวช่วย ----------
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function kidInfo(name) { return DATA.kids[name] || {}; }
  function beginner(name) { return (kidInfo(name).reader || '') === 'beginner'; }
  function starStr(n, max) { var s = ''; for (var i = 0; i < (max || 3); i++) s += i < n ? '⭐' : '☆'; return s; }

  // ---------- เสียง (สังเคราะห์ ไม่ต้องมีไฟล์) ----------
  var AC = null;
  function audio() {
    if (!S.settings.sound) return null;
    try {
      if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
    } catch (e) { AC = null; }
    return AC;
  }
  function tone(f, dur, type, vol, when, slide) {
    var ac = audio(); if (!ac) return;
    var t = ac.currentTime + (when || 0);
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(vol || 0.15, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  var SFX = {
    coin: function () { tone(988, 0.07, 'square', 0.06); tone(1319, 0.12, 'square', 0.06, 0.06); },
    good: function () { tone(523, 0.1, 'triangle', 0.18); tone(659, 0.1, 'triangle', 0.18, 0.09); tone(784, 0.22, 'triangle', 0.18, 0.18); },
    bad: function () { tone(180, 0.35, 'sawtooth', 0.12, 0, 90); },
    jump: function () { tone(330, 0.18, 'square', 0.06, 0, 660); },
    bump: function () { tone(110, 0.2, 'square', 0.12, 0, 60); },
    pop: function () { tone(700, 0.08, 'sine', 0.2, 0, 1400); },
    hit: function () { tone(220, 0.15, 'square', 0.12, 0, 80); tone(90, 0.25, 'sawtooth', 0.1, 0.05); },
    win: function () { [523, 659, 784, 1047, 784, 1047].forEach(function (f, i) { tone(f, 0.18, 'triangle', 0.16, i * 0.13); }); },
    lose: function () { [392, 330, 262, 196].forEach(function (f, i) { tone(f, 0.25, 'triangle', 0.14, i * 0.2); }); },
    click: function () { tone(660, 0.05, 'sine', 0.08); }
  };

  // ---------- อ่านออกเสียง ----------
  var voices = [];
  function loadVoices() { try { voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch (e) { voices = []; } }
  if (window.speechSynthesis) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  var EMOJI_RE;
  try { EMOJI_RE = new RegExp('[\\p{Extended_Pictographic}\\u{1F1E6}-\\u{1F1FF}\\u{1F3FB}-\\u{1F3FF}\\uFE0F\\u200D\\u20E3]', 'gu'); } catch (e) { EMOJI_RE = /[\uD800-\uDFFF️‍]/g; }
  function stripEmoji(s) { return String(s || '').replace(EMOJI_RE, '').replace(/_{2,}/g, ' ... ').replace(/\s+/g, ' ').trim(); }
  function speak(parts, lang) {
    if (!S.settings.voice || !window.speechSynthesis) return;
    try {
      speechSynthesis.cancel();
      var code = lang === 'en' ? 'en' : 'th';
      var v = null;
      for (var i = 0; i < voices.length; i++) if ((voices[i].lang || '').toLowerCase().indexOf(code) === 0) { v = voices[i]; if (/Kanya|Samantha|Google/.test(v.name)) break; }
      (Array.isArray(parts) ? parts : [parts]).forEach(function (p) {
        var t = stripEmoji(p); if (!t) return;
        var u = new SpeechSynthesisUtterance(t);
        u.lang = code === 'en' ? 'en-US' : 'th-TH'; if (v) u.voice = v;
        u.rate = code === 'en' ? 0.85 : 0.95;
        speechSynthesis.speak(u);
      });
    } catch (e) {}
  }
  function hush() { try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {} }

  // ---------- โจทย์คณิตสุ่ม ----------
  function uniq3(ans, cands) {
    var out = [ans];
    for (var i = 0; i < cands.length && out.length < 3; i++) { var c = cands[i]; if (c !== undefined && c !== null && out.indexOf(c) < 0 && !(typeof c === 'number' && c < 0)) out.push(c); }
    var k = 2; while (out.length < 3) { var x = typeof ans === 'number' ? ans + k++ : ans + k++; if (out.indexOf(x) < 0) out.push(x); }
    return out.map(String);
  }
  function genQ(g, lang) {
    var en = lang === 'en', a, b, ans, q, say, t = g.type, max = g.max || 100, guard = 0;
    if (t === 'add') {
      do { a = rnd(1, max - 1); b = rnd(1, max - a); guard++; } while (!g.carry && (a % 10) + (b % 10) >= 10 && guard < 50);
      ans = a + b; q = a + ' + ' + b + ' = ?'; say = en ? 'What is ' + a + ' plus ' + b + '?' : a + ' บวก ' + b + ' ได้เท่าไร';
      return { q: q, say: say, c: uniq3(ans, shuffle([ans + 1, ans - 1, ans + 10, ans - 10])), ex: a + ' + ' + b + ' = ' + ans, gen: t };
    }
    if (t === 'sub') {
      do { a = rnd(2, max); b = rnd(1, a - 1); guard++; } while (!g.carry && (a % 10) < (b % 10) && guard < 50);
      ans = a - b; q = a + ' − ' + b + ' = ?'; say = en ? 'What is ' + a + ' minus ' + b + '?' : a + ' ลบ ' + b + ' ได้เท่าไร';
      return { q: q, say: say, c: uniq3(ans, shuffle([ans + 1, ans - 1, ans + 10, a + b])), ex: a + ' − ' + b + ' = ' + ans, gen: t };
    }
    if (t === 'mul') {
      var f = pick(g.facts || [2, 3, 4, 5, 10]); b = rnd(1, g.upto || 12); ans = f * b;
      if (Math.random() < 0.5) { a = f; } else { a = b; b = f; }
      q = a + ' × ' + b + ' = ?'; say = en ? 'What is ' + a + ' times ' + b + '?' : a + ' คูณ ' + b + ' ได้เท่าไร';
      return { q: q, say: say, c: uniq3(ans, shuffle([ans + f, ans - f, ans + 1, a + b])), ex: a + ' × ' + b + ' = ' + ans, gen: t };
    }
    if (t === 'div') {
      var d = pick(g.facts || [2, 3, 4, 5, 10]); ans = rnd(1, g.upto || 10); a = d * ans;
      q = a + ' ÷ ' + d + ' = ?'; say = en ? 'What is ' + a + ' divided by ' + d + '?' : a + ' หารด้วย ' + d + ' ได้เท่าไร';
      return { q: q, say: say, c: uniq3(ans, shuffle([ans + 1, ans - 1, d, ans + 2])), ex: d + ' × ' + ans + ' = ' + a + ' จึงได้ ' + ans, gen: t };
    }
    if (t === 'compare') {
      a = rnd(0, max); b = Math.random() < 0.15 ? a : rnd(0, max);
      if (Math.random() < 0.5 && a !== b) { b = (Math.floor(a / 10) === Math.floor(b / 10)) ? b : (a % 10) * 10 + Math.floor(a / 10); if (b > max) b = rnd(0, max); }
      var L = en ? ['> greater', '< less', '= equal'] : ['> มากกว่า', '< น้อยกว่า', '= เท่ากับ'];
      var right = a > b ? L[0] : a < b ? L[1] : L[2];
      q = a + ' ◯ ' + b; say = en ? 'Compare ' + a + ' and ' + b : 'เปรียบเทียบ ' + a + ' กับ ' + b;
      return { q: q, say: say, c: [right].concat(L.filter(function (x) { return x !== right; })), ex: a + (a > b ? ' > ' : a < b ? ' < ' : ' = ') + b, gen: t };
    }
    if (t === 'tens') {
      var n; do { n = rnd(11, Math.max(12, max - 1)); guard++; } while (n % 10 === Math.floor(n / 10) && guard < 50);
      var tt = Math.floor(n / 10), o = n % 10;
      function lab(x, y) { return en ? x + ' tens ' + y + ' ones' : x + ' สิบ ' + y + ' หน่วย'; }
      var cands = [lab(o, tt), lab(tt, (o + 1) % 10), lab(tt + 1, o)];
      q = n + ' = ?'; say = en ? n + ' is how many tens and ones?' : n + ' มีกี่สิบ กี่หน่วย';
      return { q: q, say: say, c: uniq3(lab(tt, o), cands), ex: n + ' = ' + lab(tt, o), gen: t };
    }
    return null;
  }

  // ---------- เตรียมคิวคำถามของด่าน ----------
  function prepMc(m, subj, li, qi) {
    return { id: subj.key + ':' + li + ':' + qi, q: m.q, say: m.say, c: m.c.slice(0, 3), ex: m.ex || '', clock: m.clock, lang: subj.lang, gen: m.gen, skey: subj.key, sname: subj.name };
  }
  function buildQueue(kid, subj, li, nOver) {
    var beg = beginner(kid), nQ, levels, mcs = [], gens = [], sorts = [];
    if (li === 'boss') {
      levels = subj.levels; nQ = beg ? 9 : 12;
    } else { levels = [subj.levels[li]]; nQ = beg ? 7 : 10; }
    if (nOver) nQ = nOver;
    levels.forEach(function (lv) {
      var idx = subj.levels.indexOf(lv);
      (lv.mc || []).forEach(function (m, qi) { mcs.push(prepMc(m, subj, idx, qi)); });
      (lv.gen || []).forEach(function (g) { gens.push(g); });
      (lv.sort || []).forEach(function (s) { sorts.push(s); });
    });
    // เอาข้อที่เคยตอบผิดขึ้นก่อน (ทบทวนจุดอ่อน) แล้วค่อยสุ่ม
    var k = K(kid);
    mcs = shuffle(mcs);
    mcs.sort(function (a, b) { var wa = k.wrong[a.id] ? k.wrong[a.id].n : 0, wb = k.wrong[b.id] ? k.wrong[b.id].n : 0; return (wb > 0) - (wa > 0); });
    var wrongFirst = mcs.filter(function (m) { return k.wrong[m.id]; }).slice(0, Math.ceil(nQ / 3));
    var rest = shuffle(mcs.filter(function (m) { return wrongFirst.indexOf(m) < 0; }));
    var nGen = gens.length ? Math.round(nQ * (mcs.length ? 0.35 : 1)) : 0;
    var chosen = wrongFirst.concat(rest).slice(0, nQ - nGen);
    for (var i = 0; i < nGen; i++) { var gq = genQ(pick(gens), subj.lang); if (gq) { gq.id = 'gen:' + subj.key + ':' + gq.gen; gq.lang = subj.lang; gq.skey = subj.key; gq.sname = subj.name; chosen.push(gq); } }
    chosen = shuffle(chosen).map(function (q) { return { kind: 'q', q: q }; });
    if (sorts.length) {
      var sp = shuffle(sorts);
      var nb = li === 'boss' ? 2 : 1;
      for (var j = 0; j < nb && j < sp.length; j++) {
        var at = Math.round(chosen.length * (j + 1) / (nb + 1));
        chosen.splice(at, 0, { kind: 'blast', s: sp[j], lang: subj.lang });
      }
    }
    return chosen;
  }

  // =====================================================================
  //  โหมดผจญภัย (โหมดหลัก) — ด่านต่อกันไปเรื่อย ๆ · 1 ด่าน = 1 วิชา สลับวิชาทุกด่าน
  //  ทุก 5 ด่าน = บอสใหญ่คละวิชา (เป็นช่วง ๆ วิชาละ 2–3 ข้อ ไม่สลับทุกข้อ) · ทุก 10 ด่าน = กล่องสมบัติ
  //  เกมเลือกวิชาให้เอง: เน้นวิชาที่ยังมีด่านไม่ได้ดาว + วิชาที่ผิดบ่อย · ไม่ซ้ำ 2 ด่านล่าสุด
  // =====================================================================
  function advState(k) { k.adv = k.adv || { lv: 1, recent: [], log: {} }; return k.adv; }
  function subjByKey(kid, key) { return (kidInfo(kid).subjects || []).filter(function (s) { return s.key === key; })[0]; }
  function advPick(kid) {
    var k = K(kid), a = advState(k), subs = kidInfo(kid).subjects || [];
    if (a.cur && a.cur.n === a.lv && (a.cur.boss || subjByKey(kid, a.cur.skey))) return a.cur;   // แพ้แล้วเล่นใหม่ = ด่านเดิม
    var n = a.lv;
    if (n % 5 === 0) { a.cur = { n: n, boss: true }; save(); return a.cur; }
    var cands = subs.filter(function (s) { return a.recent.indexOf(s.key) < 0; });
    if (!cands.length) cands = subs;
    var ws = cands.map(function (s) {
      var zero = s.levels.filter(function (_, i) { return !k.stars[s.key + ':' + i]; }).length / s.levels.length;
      var wr = Object.keys(k.wrong).filter(function (id) { return id.indexOf(s.key + ':') === 0 || id.indexOf('gen:' + s.key + ':') === 0; }).length;
      return 1 + 2 * zero + Math.min(3, wr * 0.3);
    });
    var tot = ws.reduce(function (x, y) { return x + y; }, 0), r = Math.random() * tot, si = 0;
    for (; si < ws.length - 1; si++) { r -= ws[si]; if (r <= 0) break; }
    var sj = cands[si], li = 0, bs = 99;
    sj.levels.forEach(function (_, i) { var st = k.stars[sj.key + ':' + i] || 0; if (st < bs) { bs = st; li = i; } });   // ด่านที่ดาวน้อยสุด (เรียงตามบท)
    if (bs >= 3) li = rnd(0, sj.levels.length - 1);
    a.cur = { n: n, skey: sj.key, li: li }; save();
    return a.cur;
  }
  function buildMix(kid) {
    var beg = beginner(kid), subs = shuffle(kidInfo(kid).subjects || []).slice(0, 4), per = beg ? 2 : 3, out = [];
    subs.forEach(function (sj) {
      var li = rnd(0, sj.levels.length - 1);
      buildQueue(kid, sj, li, per + 2).filter(function (it) { return it.kind === 'q'; }).slice(0, per).forEach(function (it) { out.push(it); });
    });
    var withSort = shuffle((kidInfo(kid).subjects || []).filter(function (sj) { return sj.levels.some(function (l) { return l.sort && l.sort.length; }); }));
    if (withSort.length) {
      var sj = withSort[0], lv = shuffle(sj.levels.filter(function (l) { return l.sort && l.sort.length; }))[0];
      out.splice(Math.round(out.length / 2), 0, { kind: 'blast', s: pick(lv.sort), lang: sj.lang });
    }
    return out;
  }
  var MIX = { key: 'mix', name: 'บอสใหญ่คละวิชา', emoji: '👑', lang: 'th', levels: [] };

  // =====================================================================
  //  หน้าจอเมนู
  // =====================================================================
  var cur = { kid: null, subj: null };
  var view = 'home';

  function render() {
    hush();
    if (view === 'home') return renderHome();
    if (view === 'adv') return renderAdv();
    if (view === 'world') return renderWorld();
    if (view === 'levels') return renderLevels();
    if (view === 'shop') return renderShop();
    if (view === 'cards') return renderCards();
    if (view === 'parent') return renderParent();
  }
  function go(v) { view = v; render(); app.scrollTop = 0; }

  function totalStars(kid) {
    var k = K(kid), got = 0, max = 0;
    (kidInfo(kid).subjects || []).forEach(function (s) {
      max += (s.levels.length + 1) * 3;
      for (var key in k.stars) if (key.indexOf(s.key + ':') === 0) got += k.stars[key];
    });
    return { got: got, max: max };
  }
  function subjStars(kid, s) {
    var k = K(kid), got = 0;
    for (var key in k.stars) if (key.indexOf(s.key + ':') === 0) got += k.stars[key];
    return { got: got, max: (s.levels.length + 1) * 3 };
  }

  function renderHome() {
    var names = Object.keys(DATA.kids);
    var h = '<div class="home"><h1 class="logo">🏃 ฮีโร่ตะลุยสอบ</h1>' +
      '<p class="sub">' + esc(DATA.title || 'ทบทวนสอบ') + ' · วิ่งชนประตูคำตอบที่ถูก ถล่มบอส!</p><div class="kids">';
    names.forEach(function (n) {
      var info = kidInfo(n), k = K(n), ts = totalStars(n);
      h += '<button class="kidcard" data-act="kid" data-kid="' + esc(n) + '"><div class="hero">' + lookImg(n, 130) + '</div><b>' + esc(info.label || n) + '</b>' +
        '<div class="meta">' + esc(info.grade || '') + '</div><div class="meta">💎 ' + k.coins + ' · ⭐ ' + ts.got + '/' + ts.max + '</div></button>';
    });
    h += '</div><div class="homefoot"><button class="btn small gray" data-act="parent">👨‍👩‍👧 สำหรับพ่อแม่</button>' +
      '<button class="btn small gray" data-act="sound">' + (S.settings.sound ? '🔊 เสียงเปิด' : '🔇 เสียงปิด') + '</button>' +
      '<a href="./">🏠 หน้าแรก</a></div></div>';
    app.innerHTML = h;
  }

  function topbar(title, back) {
    var k = K(cur.kid);
    return '<div class="topbar"><button class="iconbtn" data-act="back" data-to="' + back + '">⬅️</button><div class="title">' + title + '</div>' +
      '<span class="pill">💎 ' + k.coins + '</span><button class="iconbtn" data-act="shop" title="ห้องแต่งตัว">👕</button></div>';
  }

  function renderWorld() {
    var info = kidInfo(cur.kid), k = K(cur.kid), h = topbar('📚 ฝึกรายวิชา · เลือกวิชาเอง', 'adv');
    h += '<div class="worlds">';
    (info.subjects || []).forEach(function (s, i) {
      var th = theme(s.key), st = subjStars(cur.kid, s), bossDone = (k.stars[s.key + ':boss'] || 0) > 0;
      h += '<button class="world" style="background:linear-gradient(160deg,' + th.c[0] + ',' + th.c[1] + ')" data-act="subj" data-i="' + i + '">' +
        '<span class="boss">' + (bossDone ? '🏆' : th.boss) + '</span><div class="em">' + s.emoji + '</div><div class="nm">' + esc(s.name) + '</div>' +
        '<div class="st">⭐ ' + st.got + ' / ' + st.max + '</div><div class="bar"><i style="width:' + Math.round(100 * st.got / st.max) + '%"></i></div></button>';
    });
    h += '</div>';
    app.innerHTML = h;
    dailyGift();
  }

  function renderAdv() {
    var info = kidInfo(cur.kid), k = K(cur.kid), a = advState(k), nx = advPick(cur.kid), n = a.lv;
    var h = topbar(lookImg(cur.kid, 34) + ' ' + esc(info.label || cur.kid) + ' · ผจญภัย', 'home');
    var sj = nx.boss ? null : subjByKey(cur.kid, nx.skey), th = theme(nx.boss ? 'mix' : nx.skey);
    var what = nx.boss ? '⚔️ <b>บอสใหญ่!</b> คละหลายวิชา' : sj.emoji + ' <b>' + esc(sj.name) + '</b> — ' + esc(sj.levels[nx.li].title);
    var toChest = 10 - ((n - 1) % 10) - 1;
    h += '<div class="adv"><div class="advcard" style="background:linear-gradient(160deg,' + th.c[0] + ',' + th.c[1] + ')">' +
      '<div class="advhero">' + lookImg(cur.kid, 150) + '<img class="av" width="120" height="120" src="' + bossImg(nx.boss ? 'mix' : nx.skey) + '"></div>' +
      '<div class="advn">ด่าน ' + n + '</div><div class="advwhat">' + what + '</div>' +
      '<div class="advbtns"><button class="btn green advgo" data-act="advplay">▶ ผจญภัยต่อ!</button><button class="btn advdress" data-act="shop">👕 แต่งตัว<small>' + k.inv.length + '/' + SK.ITEMS.length + ' ชิ้น</small></button></div>' +
      '<div class="advsub">🎁 ผ่านด่าน = ได้ของแต่งตัว 1 ชิ้น · ' + (n % 5 === 0 ? '⚔️ ด่านบอสได้ของหายาก!' : toChest === 0 ? '💰 ด่านนี้ได้ของระดับตำนาน!' : 'อีก ' + toChest + ' ด่านถึงกล่องสมบัติ') + '</div></div>';
    // เส้นทาง: ด่านที่ผ่านมา 3 ด่าน → ด่านปัจจุบัน → ด่านข้างหน้า
    h += '<div class="trail">';
    for (var i = Math.max(1, n - 3); i <= n + 6; i++) {
      var cls = 'tn', ic = '❓', sub = '';
      if (i < n) { var lg = a.log[i] || {}; cls += ' done'; ic = lg.e || '✅'; sub = starStr(lg.st || 0); }
      else if (i === n) { cls += ' now'; ic = nx.boss ? '⚔️' : sj.emoji; sub = 'ตอนนี้'; }
      else if (i % 5 === 0) { cls += ' boss'; ic = '⚔️'; sub = 'บอส'; }
      if (i > n && i % 10 === 0) { ic = '🎁'; sub = 'บอส+สมบัติ'; }
      h += '<div class="' + cls + '"><div class="ti">' + ic + '</div><div class="tl">' + i + '</div><div class="ts">' + sub + '</div></div>';
    }
    h += '</div><div class="advfoot"><button class="btn blue" data-act="practice">📚 ฝึกรายวิชา (เลือกวิชาเอง)</button></div></div>';
    app.innerHTML = h;
    dailyGift();
  }

  function dailyGift() {
    var k = K(cur.kid), t = today();
    if (k.gift === t) return;
    k.gift = t; k.coins += 30; save();
    setTimeout(function () {
      modalMenu('<div class="big">🎁</div><h2>ของขวัญประจำวัน!</h2><p class="q">มาเล่นวันนี้ ได้ 💎 30 เพชร</p>' +
        '<div class="row"><button class="btn green" data-close>เย่! 🎉</button></div>', function () { render(); });
      SFX.win();
    }, 250);
  }

  function levelUnlocked(s, i) {
    var k = K(cur.kid);
    if (i === 'boss') return s.levels.every(function (_, j) { return (k.stars[s.key + ':' + j] || 0) > 0; });
    return i === 0 || (k.stars[s.key + ':' + (i - 1)] || 0) > 0;
  }

  function renderLevels() {
    var s = cur.subj, th = theme(s.key), k = K(cur.kid);
    var h = topbar(s.emoji + ' ' + esc(s.name), 'world') + '<div class="path">';
    s.levels.forEach(function (lv, i) {
      var open = levelUnlocked(s, i), st = k.stars[s.key + ':' + i] || 0;
      h += '<div class="node' + (open ? '' : ' locked') + '">' +
        '<button class="ic" style="background:linear-gradient(160deg,' + th.c[0] + ',' + th.c[1] + ')" data-act="' + (open ? 'play' : 'locked') + '" data-i="' + i + '">' + (open ? (lv.emoji || '⭐') : '🔒') + '</button>' +
        '<button class="tx" style="background:none;text-align:left;color:inherit" data-act="' + (open ? 'play' : 'locked') + '" data-i="' + i + '"><b>ด่าน ' + (i + 1) + ' · ' + esc(lv.title) + '</b>' +
        '<small>' + (lv.sort && lv.sort.length ? '🏃 วิ่ง + 🎯 ยิงฟอง' : '🏃 วิ่งตอบคำถาม') + '</small></button>' +
        '<span class="stars">' + starStr(st) + '</span>' +
        '<button class="cards" data-act="cards" data-i="' + i + '">📚 ทบทวน</button></div>';
    });
    var bo = levelUnlocked(s, 'boss'), bs = k.stars[s.key + ':boss'] || 0;
    h += '<div class="node bossnode' + (bo ? '' : ' locked') + '"><button class="ic" style="background:#000" data-act="' + (bo ? 'play' : 'locked') + '" data-i="boss">' + (bo ? th.boss : '🔒') + '</button>' +
      '<button class="tx" style="background:none;text-align:left;color:inherit" data-act="' + (bo ? 'play' : 'locked') + '" data-i="boss"><b>👑 บอสใหญ่: ' + esc(th.bossName) + '</b><small>' + (bo ? 'คละทุกด่าน · ยากสุด!' : 'ผ่านทุกด่านก่อนนะ') + '</small></button>' +
      '<span class="stars">' + starStr(bs) + '</span></div>';
    h += '</div>';
    app.innerHTML = h;
  }

  function renderCards() {
    var s = cur.subj, lv = s.levels[cur.cardLevel];
    var h = topbar('📚 ' + esc(lv.title), 'levels') + '<div class="sheet"><div class="card"><h3>' + (lv.emoji || '') + ' การ์ดความรู้ — อ่านแล้วไปวิ่งกัน!</h3>';
    (lv.mc || []).forEach(function (m) {
      h += '<div class="flash"><div style="flex:1">' + esc(m.q) + (m.clock ? ' 🕒' + esc(m.clock) : '') + '<div class="x">' + esc(m.ex || '') + '</div></div><div class="a">✅ ' + esc(m.c[0]) + '</div></div>';
    });
    h += '</div>';
    (lv.sort || []).forEach(function (so) {
      h += '<div class="card"><h3>🎯 ' + esc(so.rule) + '</h3><div>✅ ' + so.yes.map(esc).join(' · ') + '</div><div style="color:#b91c1c;margin-top:6px">❌ ' + so.no.map(esc).join(' · ') + '</div>' +
        (so.ex ? '<div class="x" style="color:#7c6fb0;margin-top:6px">💡 ' + esc(so.ex) + '</div>' : '') + '</div>';
    });
    h += '<div style="text-align:center;margin:14px"><button class="btn green" data-act="play" data-i="' + cur.cardLevel + '">🏃 ไปวิ่งด่านนี้!</button></div></div>';
    app.innerHTML = h;
  }

  function renderShop() {
    var k = K(cur.kid), tab = cur.tab || 'base', look = k.look;
    var rcol = function (r) { return SK.RARITY[r].col; };
    var h = topbar('👕 ห้องแต่งตัว', cur.shopBack || 'adv') + '<div class="closet"><div class="cprev">' +
      '<div class="cfig">' + lookImg(cur.kid, 240, null, cur.backView) + '</div>' +
      '<button class="btn small blue" data-act="turn">🔄 หมุนดู' + (cur.backView ? 'ด้านหน้า' : 'ด้านหลัง') + '</button>' +
      '<div class="ccount">ของสะสม <b>' + k.inv.length + '</b> / ' + SK.ITEMS.length + ' ชิ้น</div>' +
      '<div class="clegend">' + ['c', 'r', 'e', 'l'].map(function (r) { return '<span style="background:' + rcol(r) + '">' + SK.RARITY[r].n + '</span>'; }).join('') + '</div></div>' +
      '<div class="cright"><div class="ctabs">' + SK.SLOTS.map(function (sl) {
        var n = sl.k === 'base' ? '' : ' <small>' + SK.ITEMS.filter(function (it) { return it.slot === sl.k && k.inv.indexOf(it.id) >= 0; }).length + '/' + SK.ITEMS.filter(function (it) { return it.slot === sl.k; }).length + '</small>';
        return '<button class="' + (tab === sl.k ? 'on' : '') + '" data-act="tab" data-tab="' + sl.k + '">' + sl.e + ' ' + sl.n + n + '</button>';
      }).join('') + '</div><div class="cgrid">';
    if (tab === 'base') {
      HEROES.forEach(function (x, i) {
        var own = x.p === 0 || k.owned.indexOf(x.id) >= 0, on = look.base === x.id;
        h += '<div class="citem' + (on ? ' on' : '') + '">' + lookImg(cur.kid, 110, { base: x.id }) + '<b>' + esc(x.n) + '</b>' +
          (on ? '<span class="pill">✅ ใช้อยู่</span>' : own ? '<button class="btn small green" data-act="wear" data-i="' + i + '">เลือกตัวนี้</button>' :
            '<button class="btn small' + (k.coins >= x.p ? '' : ' gray') + '" data-act="buy" data-i="' + i + '">💎 ' + x.p + '</button>') + '</div>';
      });
    } else {
      var none = !look[tab];
      h += '<div class="citem' + (none ? ' on' : '') + '" data-act="equip" data-slot="' + tab + '" data-id="">' + lookImg(cur.kid, 110, (function () { var o = {}; o[tab] = null; return o; })()) + '<b>ไม่ใส่</b>' + (none ? '<span class="pill">✅</span>' : '') + '</div>';
      SK.ITEMS.filter(function (it) { return it.slot === tab; }).forEach(function (it) {
        var own = k.inv.indexOf(it.id) >= 0, on = look[tab] === it.id, o = {}; o[tab] = it.id;
        if (own) h += '<div class="citem' + (on ? ' on' : '') + '" style="border-color:' + rcol(it.r) + '" data-act="equip" data-slot="' + tab + '" data-id="' + it.id + '">' + lookImg(cur.kid, 110, o, tab === 'back') +
          '<b>' + esc(it.n) + '</b><span class="rar" style="background:' + rcol(it.r) + '">' + SK.RARITY[it.r].n + '</span>' + (on ? '<span class="pill">✅ ใส่อยู่</span>' : '') + '</div>';
        else h += '<div class="citem locked" style="border-color:' + rcol(it.r) + '"><div class="lk">❓</div><b>???</b><span class="rar" style="background:' + rcol(it.r) + '">' + SK.RARITY[it.r].n + '</span><small>🔒 ผ่านด่านเพื่อสุ่มได้</small></div>';
      });
    }
    app.innerHTML = h + '</div></div></div>';
  }

  // ---------- สุ่มของรางวัล ----------
  var LOOT_W = { normal: { c: 70, r: 25, e: 5, l: 0 }, boss: { c: 0, r: 55, e: 37, l: 8 }, chest: { c: 0, r: 0, e: 45, l: 55 } };
  function rollLoot(kid, tier) {
    var k = K(kid), w = LOOT_W[tier] || LOOT_W.normal, pool = {}, tot = 0;
    SK.ITEMS.forEach(function (it) { if (k.inv.indexOf(it.id) < 0) (pool[it.r] = pool[it.r] || []).push(it); });
    var rs = Object.keys(pool);
    if (!rs.length) return null;
    var ws = rs.map(function (r) { return w[r] || 0; });
    if (!ws.some(function (x) { return x > 0; })) ws = rs.map(function (r) { return { c: 1, r: 2, e: 3, l: 4 }[r]; });   // ระดับที่ตั้งไว้หมดแล้ว → ให้ระดับใกล้เคียง
    ws.forEach(function (x) { tot += x; });
    var r = Math.random() * tot, i = 0;
    for (; i < ws.length - 1; i++) { r -= ws[i]; if (r <= 0) break; }
    var it = pick(pool[rs[i]]);
    k.inv.push(it.id); save();
    return it;
  }

  // ---------- หน้าพ่อแม่ ----------
  function renderParent() {
    var h = '<div class="topbar"><button class="iconbtn" data-act="back" data-to="home">⬅️</button><div class="title">👨‍👩‍👧 สำหรับพ่อแม่</div></div><div class="sheet">';
    h += '<div class="card"><h3>⚙️ ตั้งค่า</h3>' +
      '<p>เวลาเล่นต่อวัน (ต่อคน): <select data-set="limit">' + [0, 15, 20, 30, 45, 60].map(function (m) { return '<option value="' + m + '"' + (S.settings.limit === m ? ' selected' : '') + '>' + (m ? m + ' นาที' : 'ไม่จำกัด') + '</option>'; }).join('') + '</select>' +
      ' <small>(ครบเวลาแล้วเกมให้พักสายตา · ด่านที่เล่นอยู่เล่นจนจบได้)</small></p>' +
      '<p><label><input type="checkbox" data-set="voice"' + (S.settings.voice ? ' checked' : '') + '> อ่านโจทย์ออกเสียง</label> &nbsp; ' +
      '<label><input type="checkbox" data-set="sound"' + (S.settings.sound ? ' checked' : '') + '> เสียงประกอบ</label></p></div>';
    Object.keys(DATA.kids).forEach(function (n) {
      var info = kidInfo(n), k = K(n);
      var days = Object.keys(k.days).sort().slice(-7);
      var tq = 0, tok = 0; days.forEach(function (d) { tq += k.days[d].q; tok += k.days[d].ok; });
      var td = k.days[today()] || { sec: 0 };
      h += '<div class="card"><h3>' + lookImg(n, 30) + ' ' + esc(info.label || n) + ' ' + esc(info.grade || '') + '</h3><div class="kv">' +
        '<div>เล่นวันนี้<b>' + Math.round(td.sec / 60) + ' นาที</b></div>' +
        '<div>ตอบ 7 วันล่าสุด<b>' + tq + ' ข้อ</b></div>' +
        '<div>ถูก (7 วัน)<b>' + (tq ? Math.round(100 * tok / tq) : 0) + '%</b></div>' +
        '<div>ดาวรวม<b>' + totalStars(n).got + '/' + totalStars(n).max + '</b></div></div>';
      h += '<table class="t"><tr><th>วัน</th><th>นาที</th><th>ตอบ</th><th>ถูก</th></tr>';
      days.forEach(function (d) { var r = k.days[d]; h += '<tr><td>' + d + '</td><td><span class="barline" style="width:' + Math.min(160, Math.round(r.sec / 15)) + 'px"></span> ' + Math.round(r.sec / 60) + '</td><td>' + r.q + '</td><td>' + (r.q ? Math.round(100 * r.ok / r.q) : 0) + '%</td></tr>'; });
      h += '</table><h3 style="margin-top:12px">รายวิชา</h3><table class="t"><tr><th>วิชา</th><th>ดาว</th><th>ตอบ</th><th>ถูก</th></tr>';
      (info.subjects || []).forEach(function (s) {
        var r = k.subj[s.key] || { q: 0, ok: 0 }, st = subjStars(n, s);
        h += '<tr><td>' + s.emoji + ' ' + esc(s.name) + '</td><td>' + st.got + '/' + st.max + '</td><td>' + r.q + '</td><td>' + (r.q ? Math.round(100 * r.ok / r.q) + '%' : '—') + '</td></tr>';
      });
      h += '</table>';
      var wr = Object.keys(k.wrong).map(function (id) { return k.wrong[id]; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 15);
      h += '<h3 style="margin-top:12px">🔴 ข้อที่ผิดบ่อย (ควรติว)</h3>';
      if (!wr.length) h += '<p>ยังไม่มี</p>';
      wr.forEach(function (w) { h += '<div class="flash"><div style="flex:1">' + esc(w.s) + ' · ' + esc(w.q) + '<div class="x">ลูกตอบ: ' + esc(w.last || '-') + '</div></div><div class="a">✅ ' + esc(w.a) + ' <small>(ผิด ' + w.n + ')</small></div></div>'; });
      h += '<div class="row" style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn small green" data-act="bonus" data-kid="' + esc(n) + '">🎁 ให้เพชรพิเศษ +50</button>' +
        '<button class="btn small gray" data-act="reset" data-kid="' + esc(n) + '">ล้างความคืบหน้า</button></div></div>';
    });
    app.innerHTML = h + '</div>';
  }

  function parentGate(then) {
    var a = rnd(12, 19), b = rnd(6, 9);
    modalMenu('<h2>👨‍👩‍👧 เฉพาะพ่อแม่</h2><p class="q">' + a + ' × ' + b + ' = ?</p><input id="pg" inputmode="numeric" style="font-size:28px;width:140px;text-align:center;border-radius:14px;border:2px solid #c4b5fd;padding:6px">' +
      '<div class="row"><button class="btn gray" data-close>ยกเลิก</button><button class="btn green" id="pgok">ตกลง</button></div>');
    var ok = document.getElementById('pgok');
    ok.onclick = function () { var v = parseInt(document.getElementById('pg').value, 10); closeModal(); if (v === a * b) then(); };
  }

  // ---------- modal บนหน้าเมนู ----------
  var menuModal = null;
  function modalMenu(html, onClose) {
    closeModal();
    menuModal = document.createElement('div'); menuModal.className = 'modal'; menuModal.style.position = 'fixed'; menuModal.style.zIndex = 50;
    menuModal.innerHTML = '<div class="panel">' + html + '</div>';
    menuModal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) { closeModal(); if (onClose) onClose(); } });
    document.body.appendChild(menuModal);
  }
  function closeModal() { if (menuModal) { menuModal.remove(); menuModal = null; } }

  // ---------- event ของเมนู ----------
  app.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]'); if (!t) return;
    var act = t.getAttribute('data-act'); audio(); SFX.click();
    if (act === 'kid') { cur.kid = t.getAttribute('data-kid'); go('adv'); }
    else if (act === 'advplay') { startAdv(); }
    else if (act === 'practice') { go('world'); }
    else if (act === 'back') { go(t.getAttribute('data-to')); }
    else if (act === 'subj') { cur.subj = kidInfo(cur.kid).subjects[+t.getAttribute('data-i')]; go('levels'); }
    else if (act === 'shop') { cur.shopBack = view === 'shop' ? cur.shopBack : view; if (view !== 'shop') cur.tab = 'base'; go('shop'); }
    else if (act === 'cards') { cur.cardLevel = +t.getAttribute('data-i'); go('cards'); }
    else if (act === 'locked') { modalMenu('<div class="big">🔒</div><h2>ยังเปิดไม่ได้</h2><p class="q">ผ่านด่านก่อนหน้าให้ได้อย่างน้อย ⭐ 1 ดวงก่อนนะ</p><div class="row"><button class="btn" data-close>โอเค</button></div>'); }
    else if (act === 'play') { var i = t.getAttribute('data-i'); startLevel(i === 'boss' ? 'boss' : +i); }
    else if (act === 'buy') {
      var x = HEROES[+t.getAttribute('data-i')], k = K(cur.kid);
      if (k.coins < x.p) { modalMenu('<div class="big">💎</div><h2>เพชรยังไม่พอ</h2><p class="q">ขาดอีก ' + (x.p - k.coins) + ' เพชร — ไปวิ่งเก็บเพิ่มกัน!</p><div class="row"><button class="btn" data-close>ไปวิ่ง!</button></div>'); return; }
      k.coins -= x.p; k.owned.push(x.id); k.hero = k.look.base = x.id; save(); SFX.win(); renderShop();
      modalMenu('<div class="big">' + lookImg(cur.kid, 170) + '</div><h2>ได้ ' + esc(x.n) + ' แล้ว!</h2><div class="row"><button class="btn green" data-close>เจ๋ง!</button></div>');
    }
    else if (act === 'wear') { var kw = K(cur.kid); kw.hero = kw.look.base = HEROES[+t.getAttribute('data-i')].id; save(); renderShop(); }
    else if (act === 'tab') { cur.tab = t.getAttribute('data-tab'); renderShop(); }
    else if (act === 'turn') { cur.backView = !cur.backView; renderShop(); }
    else if (act === 'equip') { var ke = K(cur.kid), sl = t.getAttribute('data-slot'), id = t.getAttribute('data-id'); if (id) ke.look[sl] = id; else delete ke.look[sl]; save(); SFX.pop(); renderShop(); }
    else if (act === 'sound') { S.settings.sound = !S.settings.sound; save(); renderHome(); }
    else if (act === 'parent') { parentGate(function () { go('parent'); }); }
    else if (act === 'bonus') { K(t.getAttribute('data-kid')).coins += 50; save(); renderParent(); }
    else if (act === 'reset') {
      var n = t.getAttribute('data-kid');
      if (confirm('ล้างความคืบหน้าของ ' + n + ' ทั้งหมด (ดาว เพชร ตัวละคร ประวัติ)?')) { delete S.kids[n]; save(); renderParent(); }
    }
  });
  app.addEventListener('change', function (e) {
    var t = e.target, k = t.getAttribute('data-set'); if (!k) return;
    if (k === 'limit') S.settings.limit = +t.value; else S.settings[k] = t.checked;
    save();
  });

  // =====================================================================
  //  ตัวเกม
  // =====================================================================
  var G = null;

  function timeUp() {
    var k = K(cur.kid), lim = S.settings.limit, td = dayRec(k);
    if (lim && td.sec >= lim * 60) {
      modalMenu('<div class="big">👀💤</div><h2>วันนี้เล่นครบ ' + lim + ' นาทีแล้ว</h2><p class="q">พักสายตากันนะ มองไกล ๆ ออกไปนอกหน้าต่าง<br>พรุ่งนี้มาตะลุยต่อ! 🌈</p><div class="row"><button class="btn green" data-close>โอเค</button></div>');
      return true;
    }
    return false;
  }
  function startLevel(li) {
    if (timeUp()) return;
    G = new Game(cur.kid, cur.subj, li);
  }
  function startAdv() {
    if (timeUp()) return;
    var nx = advPick(cur.kid);
    if (nx.boss) G = new Game(cur.kid, MIX, 'mix', nx);
    else G = new Game(cur.kid, subjByKey(cur.kid, nx.skey), nx.li, nx);
  }

  var Z_NEAR = 3, FAR = 70, STOP_Z = 6;

  function Game(kid, subj, li, adv) {
    var g = this;
    g.kid = kid; g.subj = subj; g.li = li; g.adv = adv || null; g.th = theme(subj.key); g.beg = beginner(kid);
    g.look = lookObj(kid); g.shotE = g.look.hand ? g.look.hand.shot : '🔥';
    if (adv) g.lvTitle = 'ด่าน ' + adv.n + ' · ' + (adv.boss ? '⚔️ บอสใหญ่คละวิชา' : subj.emoji + ' ' + subj.name + ' — ' + subj.levels[li].title);
    else g.lvTitle = li === 'boss' ? '👑 บอสใหญ่' : 'ด่าน ' + (li + 1) + ' · ' + subj.levels[li].title;
    g.queue = adv && adv.boss ? buildMix(kid) : buildQueue(kid, subj, li, adv ? (beginner(kid) ? 6 : 8) : 0);
    g.maxHp = g.queue.reduce(function (s, it) { return s + (it.kind === 'blast' ? 2 : 1); }, 0);
    g.hearts = g.beg ? 4 : 3; g.maxHearts = g.hearts;
    g.coins = 0; g.mist = 0; g.okN = 0; g.combo = 0; g.missed = []; g.requeued = {};
    g.speed = g.beg ? 6 : 7.5; g.dist = 0; g.t = 0;
    g.player = { lane: 0, x: 0, jump: 0, jv: 0, stun: 0, run: 0, scale: 1, ts: 1 };
    g.morph = 0; g.morphUp = true;
    g.objs = []; g.parts = []; g.shots = []; g.bubbles = [];
    g.gate = null; g.cooldown = 1.5; g.state = 'intro';
    g.nextCoin = 6; g.nextRock = 25; g.nextDeco = 0;
    g.bossShake = 0; g.bossFlash = 0; g.bossY = 0; g.shake = 0;
    g.startT = Date.now(); g.playSec = 0;
    g.build();
    g.intro();
  }

  Game.prototype.build = function () {
    var g = this;
    var el = document.createElement('div'); el.id = 'play';
    el.innerHTML = '<canvas></canvas>' +
      '<div class="hud"><button class="iconbtn" data-g="pause">⏸</button><span class="hearts"></span>' +
      '<div class="bosshp"><span>' + g.th.boss + '</span><div class="b"><i></i></div></div><span class="coins">💎 0</span></div>' +
      '<div class="qbox hidden"><button class="say" data-g="say">🔊</button><div class="qt"></div><svg class="clock" viewBox="0 0 100 100" style="display:none"></svg></div>' +
      '<div class="cards3 hidden"><button class="c0" data-g="lane" data-l="-1"></button><button class="c1" data-g="lane" data-l="0"></button><button class="c2" data-g="lane" data-l="1"></button></div>' +
      '<div class="askhint hidden">👆 แตะเลือกคำตอบ</div><button class="jumpbtn" data-g="jump">⤴️</button>' +
      '<button class="scratchbtn hidden" data-g="scratch">✏️ กระดาษทด</button>';
    document.body.appendChild(el);
    g.el = el; g.cv = el.querySelector('canvas'); g.cx = g.cv.getContext('2d');
    g.qbox = el.querySelector('.qbox'); g.qt = el.querySelector('.qt'); g.clockEl = el.querySelector('.clock');
    g.cards = el.querySelector('.cards3'); g.cardBtns = g.cards.querySelectorAll('button');
    g.heartsEl = el.querySelector('.hearts'); g.hpEl = el.querySelector('.bosshp i'); g.coinEl = el.querySelector('.coins');
    g.jumpBtn = el.querySelector('.jumpbtn'); g.askEl = el.querySelector('.askhint'); g.scratchBtn = el.querySelector('.scratchbtn');
    g.strokes = []; g.penSeen = false;
    g.updHud();
    g.resize = g.resize.bind(g); window.addEventListener('resize', g.resize); g.resize();

    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-g]'); if (!b) return;
      var a = b.getAttribute('data-g');
      if (a === 'pause') g.pause();
      else if (a === 'say') g.sayQ(true);
      else if (a === 'jump') g.doJump();
      else if (a === 'scratch') g.openScratch();
      else if (a === 'lane') g.choose(+b.getAttribute('data-l'));
    });
    // สัมผัส: ปัดซ้าย/ขวา = เปลี่ยนเลน · ปัดขึ้น = กระโดด · แตะ = ไปเลนนั้น / ยิงฟอง
    var sx = 0, sy = 0, st = 0;
    g.cv.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; st = Date.now(); if (g.state === 'blast') g.tapBubble(e.clientX, e.clientY); });
    g.cv.addEventListener('pointerup', function (e) {
      if (g.state !== 'run' && g.state !== 'ask') return;
      var dx = e.clientX - sx, dy = e.clientY - sy, ask = g.state === 'ask';
      if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) { var nl = g.player.lane + (dx > 0 ? 1 : -1); if (ask) g.choose(nl); else g.setLane(nl); }
      else if (dy < -35 && !ask) g.doJump();
      else if (Date.now() - st < 400) {
        var w = g.W, lw = g.laneW, tl = e.clientX < w / 2 - lw / 2 ? -1 : e.clientX > w / 2 + lw / 2 ? 1 : 0;
        if (g.gate && !g.gate.chosen) g.choose(tl); else g.setLane(tl);
      }
    });
    g.onKey = function (e) {
      if (!G || G !== g) return;
      if (e.key === 'ArrowLeft') { if (g.state === 'ask') g.choose(g.player.lane - 1); else g.setLane(g.player.lane - 1); }
      else if (e.key === 'ArrowRight') { if (g.state === 'ask') g.choose(g.player.lane + 1); else g.setLane(g.player.lane + 1); }
      else if (e.key === 'Enter' && g.state === 'ask') g.choose(g.player.lane);
      else if (e.key === 'ArrowUp' || e.key === ' ') g.doJump();
      else if (e.key === 'Escape') g.pause();
    };
    window.addEventListener('keydown', g.onKey);
    g.onVis = function () { if (document.hidden && (g.state === 'run' || g.state === 'blast' || g.state === 'ask')) g.pause(); };   // ตอนเปิดกระดาษทด (state scratch) เกมหยุดอยู่แล้ว
    document.addEventListener('visibilitychange', g.onVis);
    g.last = performance.now();
    g.loop = g.loop.bind(g); g.raf = requestAnimationFrame(g.loop);
  };

  Game.prototype.resize = function () {
    var g = this, dpr = Math.min(window.devicePixelRatio || 1, 2);
    g.W = window.innerWidth; g.H = window.innerHeight;
    g.cv.width = g.W * dpr; g.cv.height = g.H * dpr; g.cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.laneW = Math.min(g.W * 0.27, g.H * 0.42);
    var cw = Math.min(g.W * 0.94, g.laneW * 3.1);
    g.cards.style.width = cw + 'px';
    g.layoutHud();
  };
  Game.prototype.layoutHud = function () {
    var g = this, qb = g.qbox.getBoundingClientRect();
    var top = g.qbox.classList.contains('hidden') ? 60 : qb.bottom + 8;
    g.cards.style.top = top + 'px';
    var cb = g.cards.classList.contains('hidden') ? top : g.cards.getBoundingClientRect().bottom;
    g.hudBottom = cb;
    g.horizon = Math.max(g.H * 0.36, cb + g.bossSize() * 1.12 + 8);
    g.groundY = g.H * 0.87;
  };

  Game.prototype.updHud = function () {
    var g = this, h = '';
    for (var i = 0; i < g.maxHearts; i++) h += i < g.hearts ? '❤️' : '🤍';
    g.heartsEl.textContent = h;
    var hp = g.hpLeft();
    g.hpEl.style.width = Math.max(0, Math.min(100, 100 * hp / g.maxHp)) + '%';
    g.coinEl.textContent = '💎 ' + g.coins;
  };
  Game.prototype.hpLeft = function () {
    var hp = this.queue.reduce(function (s, it) { return s + (it.kind === 'blast' ? 2 : 1); }, 0);
    if (this.gate) hp += 1;
    if (this.state === 'blast') hp += 2;
    return hp;
  };

  Game.prototype.toast = function (txt, ms, color) {
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = txt;
    if (color) t.style.textShadow = '0 4px 0 ' + color + ', 0 0 18px rgba(0,0,0,.35)';
    this.el.appendChild(t); setTimeout(function () { t.remove(); }, ms || 900);
  };

  Game.prototype.intro = function () {
    var g = this;
    g.modal('<div class="big">' + lookImg(g.kid, 120) + ' <span style="font-size:40px">⚔️</span> <img class="av" width="110" height="110" src="' + bossImg(g.subj.key) + '"></div><h2>' + esc(g.lvTitle) + '</h2>' +
      '<p class="q">' + esc(g.th.bossName) + ' มาแล้ว!<br>วิ่งเข้า <b>ประตูคำตอบที่ถูก</b> เพื่อยิงบอส 🔥</p>' +
      '<p class="ex">⏸ เกมจะ<b>หยุดรอ</b>ให้เลือกคำตอบ ไม่ต้องรีบ · 👆 แตะการ์ดคำตอบ (หรือแตะประตู)<br>✅ ตอบถูก = ตัวใหญ่ขึ้น 💪 · ❌ ตอบผิด = ตัวเล็กลง · ⤴️ = กระโดดข้ามสิ่งกีดขวาง' + (g.queue.some(function (x) { return x.kind === 'blast'; }) ? '<br>🎯 ด่านฟอง: แตะเฉพาะฟองที่ตรงกติกา' : '') + '</p>' +
      '<div class="row"><button class="btn green" data-m="go">▶ เริ่มเลย!</button></div>', function (a) {
        if (a === 'go') { audio(); g.countdown(); }
      });
  };
  Game.prototype.countdown = function () {
    var g = this, n = 3;
    (function step() {
      if (n > 0) { g.toast(String(n), 700); tone(440, 0.12, 'square', 0.08); n--; setTimeout(step, 700); }
      else { g.toast('ลุย! 🏃', 700, '#16a34a'); tone(880, 0.25, 'square', 0.1); g.state = 'run'; }
    })();
  };

  Game.prototype.modal = function (html, cb) {
    var g = this; g.closeModal();
    var m = document.createElement('div'); m.className = 'modal'; m.innerHTML = '<div class="panel">' + html + '</div>';
    m.addEventListener('click', function (e) { var b = e.target.closest('[data-m]'); if (!b || b.disabled) return; SFX.click(); var a = b.getAttribute('data-m'); g.closeModal(); if (cb) cb(a); });
    g.el.appendChild(m); g.modalEl = m;
    return m;
  };
  Game.prototype.closeModal = function () { if (this.modalEl) { this.modalEl.remove(); this.modalEl = null; } };

  Game.prototype.pause = function () {
    var g = this; if (g.state !== 'run' && g.state !== 'blast' && g.state !== 'ask') return;
    g.prevState = g.state; g.state = 'pause'; hush();
    g.modal('<div class="big">⏸</div><h2>พักแป๊บนึง</h2><div class="row"><button class="btn gray" data-m="quit">🚪 ออกจากด่าน</button><button class="btn green" data-m="resume">▶ เล่นต่อ</button></div>', function (a) {
      if (a === 'resume') { g.state = g.prevState; g.last = performance.now(); }
      else g.quit();
    });
  };

  Game.prototype.quit = function () {
    var g = this; g.recordTime();
    cancelAnimationFrame(g.raf); window.removeEventListener('resize', g.resize); window.removeEventListener('keydown', g.onKey);
    document.removeEventListener('visibilitychange', g.onVis);
    hush(); g.el.remove(); G = null; save(); render();
  };
  Game.prototype.recordTime = function () {
    var g = this, sec = Math.round((Date.now() - g.startT) / 1000) - g.playSec;
    if (sec > 0 && sec < 3600) { dayRec(K(g.kid)).sec += sec; g.playSec += sec; }
  };

  // เลือกคำตอบ (แตะการ์ด/แตะประตู) → ล็อกเลน แล้ววิ่งต่อผ่านประตูนั้น
  Game.prototype.choose = function (l) {
    var g = this;
    if (!g.gate || g.gate.chosen || (g.state !== 'run' && g.state !== 'ask')) return;
    l = clamp(l, -1, 1); g.gate.chosen = true; g.player.lane = l; g.markCard(); SFX.click();
    g.askEl.classList.add('hidden'); g.cards.classList.remove('asking');
    if (g.state === 'ask') g.state = 'run';
  };
  Game.prototype.setLane = function (l) {
    var g = this; if (g.state !== 'run' || (g.gate && g.gate.chosen)) return;   // เลือกคำตอบแล้ว = ล็อกเลน
    l = clamp(l, -1, 1); if (l === g.player.lane) return;
    g.player.lane = l; tone(500 + l * 80, 0.05, 'sine', 0.05); g.markCard();
  };
  Game.prototype.markCard = function () {
    var g = this;
    for (var i = 0; i < 3; i++) g.cardBtns[i].classList.toggle('sel', g.gate && i - 1 === g.player.lane);
  };
  Game.prototype.doJump = function () {
    var p = this.player; if (this.state !== 'run' || p.jump > 0.01) return;
    p.jv = 7.5; p.jump = 0.02; SFX.jump();
  };

  // ---------- คำถามถัดไป ----------
  Game.prototype.nextItem = function () {
    var g = this, it = g.queue.shift();
    if (!it) { g.win(); return; }
    if (it.kind === 'blast') { g.startBlast(it.s, it.lang); return; }
    var q = it.q, labels = shuffle(q.c);
    // ประตูโผล่ไม่ไกล แล้ววิ่งมาหยุดรอตรงหน้า (STOP_Z) จนกว่าจะเลือกคำตอบ — ไม่มีจับเวลา
    g.gate = { q: q, labels: labels, right: labels.indexOf(q.c[0]) - 1, z: 24, item: it, chosen: false };
    g.objs = g.objs.filter(function (o) { return o.k !== 'rock' || o.z < 16 || o.z > 31; });
    g.qt.textContent = q.q;
    g.qbox.classList.remove('hidden', 'rule');
    if (q.clock) { g.clockEl.style.display = ''; g.clockEl.innerHTML = clockSvg(q.clock); } else g.clockEl.style.display = 'none';
    for (var i = 0; i < 3; i++) { g.cardBtns[i].textContent = labels[i]; }
    g.cards.classList.remove('hidden');
    g.jumpBtn.style.display = '';
    g.layoutHud(); g.markCard();
    g.strokes = []; g.scratchBtn.classList.toggle('hidden', !g.isCalc());
    g.sayQ(false);
  };
  Game.prototype.sayQ = function (force) {
    var g = this;
    if (g.state === 'blast' && g.blast) { speak(g.blast.s.rule, g.blast.lang); return; }
    if (!g.gate) return;
    var q = g.gate.q, en = q.lang === 'en';
    if (!force && !g.beg && !en) return; // Kaka อ่านเองได้ → อ่านให้ฟังเฉพาะวิชาอังกฤษหรือเมื่อกด 🔊
    var parts = [q.say || q.q];
    if (g.beg || force) {
      var nm = en ? ['Left', 'Middle', 'Right'] : ['ซ้าย', 'กลาง', 'ขวา'];
      g.gate.labels.forEach(function (l, i) { if (stripEmoji(l)) parts.push(nm[i] + ' ' + l); });
    }
    speak(parts, en ? 'en' : 'th');
  };

  var bossCache = {};
  function bossImg(key) {
    if (bossCache[key]) return bossCache[key];
    var cv = document.createElement('canvas'); cv.width = cv.height = 220;
    SK.draw(cv.getContext('2d'), SK.BOSSES[key] || SK.BOSSES.thai, 110, 214, 190, {});
    return (bossCache[key] = cv.toDataURL());
  }

  function clockSvg(hm) {
    var p = String(hm).split(':'), h = (+p[0]) % 12, m = +p[1] || 0;
    var s = '<circle cx="50" cy="50" r="46" fill="#fff" stroke="#7c3aed" stroke-width="5"/>';
    for (var i = 1; i <= 12; i++) { var a = i * Math.PI / 6; s += '<text x="' + (50 + 35 * Math.sin(a)).toFixed(1) + '" y="' + (54 - 35 * Math.cos(a)).toFixed(1) + '" font-size="11" text-anchor="middle" font-weight="700" fill="#2b2350">' + i + '</text>'; }
    var ha = (h + m / 60) * Math.PI / 6, ma = m * Math.PI / 30;
    s += '<line x1="50" y1="50" x2="' + (50 + 22 * Math.sin(ha)).toFixed(1) + '" y2="' + (50 - 22 * Math.cos(ha)).toFixed(1) + '" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>';
    s += '<line x1="50" y1="50" x2="' + (50 + 34 * Math.sin(ma)).toFixed(1) + '" y2="' + (50 - 34 * Math.cos(ma)).toFixed(1) + '" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>';
    return s + '<circle cx="50" cy="50" r="4" fill="#2b2350"/>';
  }

  // ---------- ผ่านประตู ----------
  Game.prototype.passGate = function () {
    var g = this, gt = g.gate, lane = Math.round(g.player.x), q = gt.q;
    g.gate = null; g.markCard(); g.scratchBtn.classList.add('hidden');
    var sk = q.skey || g.subj.key, k = K(g.kid), dr = dayRec(k), sr = k.subj[sk] = k.subj[sk] || { q: 0, ok: 0 };
    dr.q++; sr.q++;
    var px = g.W / 2 + g.player.x * g.laneW, py = g.groundY;
    if (lane === gt.right) {
      dr.ok++; sr.ok++; g.okN++; g.combo++;
      var gain = 10 + Math.min(g.combo - 1, 5) * 2; g.coins += gain;
      SFX.good(); g.burst(px, py - 80, ['⭐', '✨', '🎉'], 14);
      g.toast(pick(['เยี่ยม!', 'ถูกต้อง!', 'สุดยอด!', 'เก่งมาก!', 'ว้าว!']) + (g.combo > 2 ? ' x' + g.combo : '') + ' +' + gain, 900, '#16a34a');
      g.shots.push({ x: px, y: py - 60, t: 0 });
      g.grow(true);
      if (!g.beg) g.speed = Math.min(11, g.speed + 0.2);
      if (k.wrong[q.id]) { k.wrong[q.id].n = Math.max(0, k.wrong[q.id].n - 1); if (!k.wrong[q.id].n) delete k.wrong[q.id]; }
      g.cards.classList.add('hidden'); g.qbox.classList.add('hidden'); g.layoutHud();
      g.cooldown = 1.3; g.updHud(); save();
    } else {
      g.combo = 0; g.mist++; g.hearts--; g.shake = 0.4; g.grow(false);
      SFX.bad(); g.burst(px, py - 60, ['💥', '💢'], 8);
      var chosen = gt.labels[lane + 1];
      g.missed.push({ q: q.q, a: q.c[0], you: chosen });
      var w = k.wrong[q.id] = k.wrong[q.id] || { q: q.gen ? 'โจทย์สุ่ม เช่น ' + q.q : q.q, a: q.gen ? q.c[0] : q.c[0], s: q.sname || g.subj.name, n: 0 };
      w.n++; w.last = chosen;
      // ข้อที่ผิดวนกลับมาท้ายคิวอีกรอบ (บอสฟื้นพลัง) ไม่เกิน 2 ครั้งต่อข้อ
      g.requeued[q.id] = (g.requeued[q.id] || 0) + 1;
      if (g.requeued[q.id] <= 2) g.queue.push(gt.item);
      g.updHud(); save();
      g.state = 'wrong'; g.cards.classList.add('hidden'); g.qbox.classList.add('hidden');
      setTimeout(function () {   // รอให้เห็นตัวหดก่อน แล้วค่อยขึ้นเฉลย
      var m = g.modal('<div class="big">😵</div><h2>ยังไม่ถูกนะ</h2><div class="q">' + esc(q.q) + '</div>' +
        (q.clock ? '<svg viewBox="0 0 100 100" style="width:110px;height:110px">' + clockSvg(q.clock) + '</svg>' : '') +
        '<div class="ans">✅ ' + esc(q.c[0]) + '</div><div class="ex">' + esc(q.ex || '') + '</div>' +
        (g.requeued[q.id] <= 2 ? '<p class="ex">🔁 ข้อนี้จะกลับมาอีกครั้ง จำไว้นะ!</p>' : '') +
        '<div class="row"><button class="btn green" data-m="ok" disabled>เข้าใจแล้ว ▶</button></div>', function () {
          g.layoutHud();
          if (g.hearts <= 0) g.lose(); else { g.state = 'run'; g.cooldown = 1.0; g.last = performance.now(); }
        });
      speak((q.lang === 'en' ? 'The answer is ' : 'คำตอบที่ถูกคือ ') + (stripEmoji(q.c[0]) || ''), q.lang);
      setTimeout(function () { var b = m.querySelector('[data-m]'); if (b) b.disabled = false; }, g.beg ? 2200 : 1500);
      }, 900);
    }
  };
  // ---------- กระดาษทด (เฉพาะข้อคำนวณ) — รองรับ Apple Pencil + กันฝ่ามือ ----------
  Game.prototype.isCalc = function () {
    var q = this.gate && this.gate.q; if (!q) return false;
    var k = q.skey || this.subj.key;
    return k === 'math' || k === 'mathinter';
  };
  Game.prototype.openScratch = function () {
    var g = this; if (!g.gate || (g.state !== 'run' && g.state !== 'ask')) return;
    g.scPrev = g.state; g.state = 'scratch'; hush(); SFX.click();
    var el = document.createElement('div'); el.className = 'scratch';
    var pens = [['#111827', 'ดำ'], ['#2563eb', 'น้ำเงิน'], ['#dc2626', 'แดง']];
    el.innerHTML = '<div class="sbar"><div class="sq"></div>' +
      '<div class="stools">' + pens.map(function (x, i) { return '<button class="pen' + (i === 0 ? ' on' : '') + '" data-s="pen" data-c="' + x[0] + '" style="background:' + x[0] + '" title="' + x[1] + '"></button>'; }).join('') +
      '<button data-s="undo">↩️ ย้อน</button><button data-s="clear">🧽 ล้าง</button><button class="close" data-s="close">✖ ปิด</button></div></div>' +
      '<canvas></canvas><div class="schoices"><span>ทดเสร็จแล้ว ตอบเลย 👉</span>' +
      g.gate.labels.map(function (l, i) { return '<button class="c' + i + '" data-s="pick" data-l="' + (i - 1) + '">' + esc(l) + '</button>'; }).join('') + '</div>';
    g.el.appendChild(el); g.scEl = el;
    el.querySelector('.sq').textContent = g.gate.q.q;
    if (g.gate.q.clock) el.querySelector('.sq').insertAdjacentHTML('beforeend', ' <svg viewBox="0 0 100 100" style="width:64px;height:64px;vertical-align:middle">' + clockSvg(g.gate.q.clock) + '</svg>');
    var cv = el.querySelector('canvas'), c = cv.getContext('2d'), color = pens[0][0], cur = null;
    g.scCv = cv; g.scCtx = c;
    function size() {
      var r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = r.width * dpr; cv.height = r.height * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); g.scRedraw();
    }
    g.scSize = size; window.addEventListener('resize', size); setTimeout(size, 0);
    function pt(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top, e.pressure || 0.5]; }
    cv.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'pen') g.penSeen = true;
      if (g.penSeen && e.pointerType === 'touch') return;   // มี Apple Pencil แล้ว = ไม่วาดด้วยนิ้ว/ฝ่ามือ
      e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (x) {}
      cur = { c: color, pen: e.pointerType === 'pen', pts: [pt(e)], id: e.pointerId }; g.strokes.push(cur); g.scRedraw();
    });
    cv.addEventListener('pointermove', function (e) {
      if (!cur || e.pointerId !== cur.id) return;
      var evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e]; if (!evs.length) evs = [e];
      evs.forEach(function (ev) { cur.pts.push(pt(ev)); });
      g.scStroke(cur, cur.pts.length - evs.length - 1);
    });
    function end(e) { if (cur && e.pointerId === cur.id) cur = null; }
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-s]'); if (!b) return;
      var a = b.getAttribute('data-s');
      if (a === 'pen') { color = b.getAttribute('data-c'); el.querySelectorAll('.pen').forEach(function (x) { x.classList.toggle('on', x === b); }); }
      else if (a === 'undo') { g.strokes.pop(); g.scRedraw(); }
      else if (a === 'clear') { g.strokes = []; g.scRedraw(); }
      else if (a === 'close') g.closeScratch();
      else if (a === 'pick') { var l = +b.getAttribute('data-l'); g.closeScratch(); g.choose(l); }
    });
  };
  Game.prototype.scRedraw = function () {
    var g = this, cv = g.scCv, c = g.scCtx; if (!cv) return;
    var r = cv.getBoundingClientRect(), W = r.width, H = r.height;
    c.clearRect(0, 0, W, H); c.fillStyle = '#fff'; c.fillRect(0, 0, W, H);
    c.strokeStyle = '#dbeafe'; c.lineWidth = 1;   // ตารางแบบสมุดกราฟ ช่วยตั้งหลักเลขให้ตรง
    for (var x = 44; x < W; x += 44) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 44; y < H; y += 44) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    g.strokes.forEach(function (st) { g.scStroke(st, 0); });
  };
  Game.prototype.scStroke = function (st, from) {
    var c = this.scCtx, pts = st.pts; if (!c) return;
    c.strokeStyle = st.c; c.fillStyle = st.c; c.lineCap = 'round'; c.lineJoin = 'round';
    if (pts.length === 1) { c.beginPath(); c.arc(pts[0][0], pts[0][1], 2.5, 0, 7); c.fill(); return; }
    for (var i = Math.max(1, from); i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i];
      c.lineWidth = st.pen ? 1.5 + b[2] * 4.5 : 4;
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
    }
  };
  Game.prototype.closeScratch = function () {
    var g = this; if (!g.scEl) return;
    window.removeEventListener('resize', g.scSize);
    g.scEl.remove(); g.scEl = null; g.scCv = null; g.scCtx = null;
    g.state = g.scPrev || 'ask'; g.last = performance.now();
  };

  // แปลงร่าง: ถูก = ตัวใหญ่ขึ้น · ผิด = ตัวเล็กลง
  Game.prototype.grow = function (up) {
    var g = this, p = g.player, before = p.ts;
    p.ts = up ? Math.min(1.6, p.ts + 0.1) : Math.max(0.6, p.ts - 0.1);
    g.morph = 0.7; g.morphUp = up;
    var x = g.W / 2 + p.x * g.laneW, y = g.groundY - g.laneW * 0.5 * p.ts;
    if (up) { g.burst(x, y, ['✨', '⭐', '💪'], 12); if (p.ts > before) g.floatTxt(x, y - g.laneW * 0.6, 'แปลงร่าง! ⬆', '#7c3aed'); tone(400, 0.35, 'sine', 0.12, 0, 900); }
    else { g.burst(x, y, ['💨', '💫'], 8); if (p.ts < before) g.floatTxt(x, y - g.laneW * 0.4, 'ตัวเล็กลง ⬇', '#dc2626'); tone(700, 0.35, 'sine', 0.1, 0, 250); }
  };

  // ---------- ด่านยิงฟอง ----------
  Game.prototype.startBlast = function (s, lang) {
    var g = this, n = g.beg ? 5 : 7;
    var items = shuffle(s.yes).slice(0, n).map(function (x) { return { t: x, yes: true }; })
      .concat(shuffle(s.no).slice(0, n).map(function (x) { return { t: x, yes: false }; }));
    g.blast = { s: s, lang: lang || g.subj.lang, items: shuffle(items), spawnT: 0.8, hit: 0, bad: 0, miss: 0, total: Math.min(n, s.yes.length) };
    g.bubbles = [];
    g.state = 'blast';
    g.qt.textContent = '🎯 ' + s.rule; g.qbox.classList.remove('hidden'); g.qbox.classList.add('rule');
    g.clockEl.style.display = 'none'; g.cards.classList.add('hidden'); g.jumpBtn.style.display = 'none'; g.scratchBtn.classList.add('hidden'); g.layoutHud();
    g.toast('🎯 ด่านยิงฟอง!', 1200, '#0ea5e9');
    speak(s.rule, g.blast.lang);
  };
  Game.prototype.tapBubble = function (x, y) {
    var g = this, best = null, bd = 1e9;
    g.bubbles.forEach(function (b) { if (b.dead) return; var d = Math.hypot(b.x - x, b.y - y); if (d < b.r * 1.15 && d < bd) { bd = d; best = b; } });
    if (!best) return;
    if (best.yes) {
      best.dead = true; g.blast.hit++; g.coins += 5; SFX.pop(); g.burst(best.x, best.y, ['✨', '⭐', '💎'], 10);
      g.floatTxt(best.x, best.y, '+5', '#16a34a');
      g.player.ts = Math.min(1.6, g.player.ts + 0.03); g.morph = 0.3; g.morphUp = true;
    } else {
      best.dead = true; best.bad = true; g.blast.bad++; g.mist++; g.hearts--; g.shake = 0.3; SFX.bad(); g.grow(false);
      g.burst(best.x, best.y, ['💢'], 6); g.floatTxt(best.x, best.y, '✖ ไม่ใช่!', '#dc2626');
      g.missed.push({ q: g.blast.s.rule, a: 'ไม่ต้องแตะ “' + best.t + '”', you: 'แตะ' });
      if (g.hearts <= 0) { g.updHud(); g.lose(); return; }
    }
    g.updHud();
  };
  Game.prototype.endBlast = function () {
    var g = this, b = g.blast, acc = b.total ? b.hit / b.total : 1;
    g.state = 'run'; g.blast = null; g.bubbles = [];
    g.qbox.classList.add('hidden'); g.qbox.classList.remove('rule'); g.jumpBtn.style.display = ''; g.layoutHud();
    if (b.hit + b.bad + b.miss === 0) { g.cooldown = 0.5; return; }
    var ok = acc >= 0.6 && b.bad === 0;
    g.toast('🎯 ถูก ' + b.hit + '/' + b.total + (ok ? ' · บอสโดน 2 ที!' : ''), 1400, ok ? '#16a34a' : '#f97316');
    if (ok) { g.shots.push({ x: g.W / 2, y: g.H * 0.7, t: 0, big: true }); SFX.good(); }
    if (b.miss > 0 && b.miss >= b.total / 2) g.mist++;
    g.cooldown = 1.6; g.updHud();
  };

  // ---------- จบด่าน ----------
  Game.prototype.win = function () {
    var g = this; g.state = 'bossdie'; g.dieT = 0; SFX.hit(); hush();
    g.cards.classList.add('hidden'); g.qbox.classList.add('hidden');
    setTimeout(function () { g.results(true); }, 1700);
  };
  Game.prototype.lose = function () {
    var g = this; g.state = 'lose'; SFX.lose(); hush();
    g.cards.classList.add('hidden'); g.qbox.classList.add('hidden');
    setTimeout(function () { g.results(false); }, 600);
  };
  Game.prototype.results = function (won) {
    var g = this, k = K(g.kid), key = g.subj.key + ':' + g.li;
    var stars = !won ? 0 : g.mist === 0 ? 3 : g.mist <= 2 ? 2 : 1;
    var sizeB = won ? Math.max(0, Math.round((g.player.scale - 1) * 150)) : 0;
    var prev = g.subj.key === 'mix' ? 3 : (k.stars[key] || 0), bonus = won ? stars * 10 + (stars > prev ? 20 : 0) + sizeB : 0;
    if (stars > prev && g.subj.key !== 'mix') k.stars[key] = stars;   // ด่านผจญภัยนับดาวให้ด่านรายวิชาด้วย
    var chest = 0;
    if (g.adv && won) {
      var a = advState(k), n = g.adv.n;
      a.log[n] = { e: g.adv.boss ? '⚔️' : g.subj.emoji, st: stars };
      Object.keys(a.log).forEach(function (x) { if (+x < n - 30) delete a.log[x]; });
      if (!g.adv.boss) { a.recent = [g.subj.key].concat(a.recent).slice(0, 2); }
      a.lv = n + 1; a.cur = null; a.best = Math.max(a.best || 0, n);
      if (n % 10 === 0) { chest = 100; bonus += chest; }
    }
    // ของรางวัล: ผจญภัยได้ทุกด่านที่ชนะ · ฝึกรายวิชาได้เมื่อได้ดาวด่านนั้นครั้งแรก (เล่นซ้ำมีลุ้น 35%)
    var loot = null, lootGem = 0;
    if (won) {
      var tier = g.adv ? (g.adv.n % 10 === 0 ? 'chest' : g.adv.boss ? 'boss' : 'normal') : (g.li === 'boss' ? 'boss' : 'normal');
      if (g.adv || prev === 0 || g.li === 'boss' || Math.random() < 0.35) { loot = rollLoot(g.kid, tier); if (!loot) { lootGem = 30; bonus += 30; } }
    }
    k.coins += g.coins + bonus;
    g.recordTime(); save();
    if (won) SFX.win();
    var lootHtml = loot ? '<div class="loot" style="--rc:' + SK.RARITY[loot.r].col + '"><div class="lbox">🎁</div></div>' : lootGem ? '<p class="q">🎉 สะสมของครบทุกชิ้นแล้ว! รับ 💎 +30 แทน</p>' : '';
    var miss = '';
    var seen = {};
    g.missed = g.missed.filter(function (m) { var k = m.q + '|' + m.a; if (seen[k]) return false; seen[k] = 1; return true; });
    if (g.missed.length) {
      miss = '<div class="miss"><b style="color:#9a3412">📝 จำให้แม่น:</b>' + g.missed.slice(0, 8).map(function (m) { return '<div>' + esc(m.q) + ' → <b>' + esc(m.a) + '</b></div>'; }).join('') + '</div>';
    }
    var nextBtn = '';
    if (g.adv) { if (won) nextBtn = '<button class="btn green" data-m="advnext">ด่าน ' + (g.adv.n + 1) + ' ▶</button>'; }
    else if (won && g.li !== 'boss') {
      var ni = g.li + 1 < g.subj.levels.length ? g.li + 1 : 'boss';
      if (levelUnlocked(g.subj, ni)) nextBtn = '<button class="btn green" data-m="next" data-n="' + ni + '">ด่านต่อไป ▶</button>';
    }
    var html = won
      ? '<div class="big">' + lookImg(g.kid, loot ? 80 : Math.round(80 + 50 * Math.min(g.player.scale, 1.6))) + '</div><h2>🏆 ชนะ ' + esc(g.th.bossName) + '!</h2><div class="stars">' + [0, 1, 2].map(function (i) { return '<span style="animation-delay:' + (0.2 + i * 0.25) + 's">' + (i < stars ? '⭐' : '☆') + '</span>'; }).join('') + '</div>' +
        (chest ? '<p class="q" style="font-size:26px">🎁 เปิดกล่องสมบัติ! 💎 +' + chest + '</p>' : '') + '<p class="q">ตอบถูก ' + g.okN + ' ข้อ · 💎 +' + (g.coins + bonus) + '</p><p class="ex">💪 ตัวใหญ่ x' + g.player.scale.toFixed(1) + (sizeB ? ' → โบนัส 💎 +' + sizeB : '') + '</p>' + (stars < 3 ? '<p class="ex">ตอบถูกหมดไม่พลาดเลย = ⭐⭐⭐</p>' : '<p class="ex">เพอร์เฟกต์! ไม่พลาดสักข้อ 🎉</p>')
      : '<div class="big">💔</div><h2>หัวใจหมดแล้ว</h2><p class="q">ไม่เป็นไร! อ่านข้อที่พลาดแล้วลองใหม่นะ<br>💎 เก็บได้ ' + g.coins + ' เพชร</p>';
    var againBtn = g.adv ? (won ? '' : '<button class="btn" data-m="advagain">🔁 ลองใหม่</button>') : '<button class="btn" data-m="again">🔁 เล่นอีก</button>';
    var m = g.modal(html + lootHtml + miss + '<div class="row"><button class="btn gray" data-m="map">🗺️ แผนที่</button>' + againBtn + nextBtn + '</div>', function (a) {
      var kid = g.kid, subj = g.subj, li = g.li;
      g.quit();
      if (a === 'advnext' || a === 'advagain') { startAdv(); }
      else if (a === 'again') { startLevel(li); }
      else if (a === 'next') { startLevel(li + 1 < subj.levels.length ? li + 1 : 'boss'); }
    });
    g.state = 'done';
    if (loot) {
      var lb = m.querySelector('.loot');
      setTimeout(function () {   // กล่องสั่น แล้วเปิดออก
        SFX.win();
        var o = {}; o[loot.slot] = loot.id;
        lb.classList.add('open');
        lb.innerHTML = '<div class="lnew">✨ ได้ของใหม่! ✨</div><div class="lfig">' + lookImg(g.kid, 120, o) + '</div>' +
          '<div class="lname">' + esc(loot.n) + '</div><span class="rar" style="background:' + SK.RARITY[loot.r].col + '">' + SK.RARITY[loot.r].n + '</span> ' +
          '<button class="btn small green" data-loot="1">👕 ใส่เลย!</button>';
        lb.querySelector('[data-loot]').onclick = function () {
          K(g.kid).look[loot.slot] = loot.id; save(); SFX.pop();
          this.textContent = '✅ ใส่แล้ว'; this.disabled = true;
          var big = m.querySelector('.panel > .big'); if (big) big.innerHTML = lookImg(g.kid, 130);
        };
      }, 1100);
    }
  };

  // ---------- เอฟเฟกต์ ----------
  Game.prototype.burst = function (x, y, ems, n) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, v = 120 + Math.random() * 260;
      this.parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 150, life: 0.9 + Math.random() * 0.4, e: pick(ems), s: 18 + Math.random() * 18 });
    }
  };
  Game.prototype.floatTxt = function (x, y, txt, col) { this.parts.push({ x: x, y: y, vx: 0, vy: -90, life: 0.9, txt: txt, col: col, s: 28 }); };

  // ---------- เฟรม ----------
  Game.prototype.loop = function (now) {
    var g = this, dt = clamp((now - g.last) / 1000, 0, 0.05); g.last = now;   // กัน dt ติดลบ (timestamp ของ rAF อาจอยู่ก่อน performance.now())
    g.update(dt); g.draw();
    g.raf = requestAnimationFrame(g.loop);
  };

  Game.prototype.proj = function (z) {
    var p = Z_NEAR / (Math.max(z, -Z_NEAR + 0.3) + Z_NEAR);
    return { p: p, y: this.horizon + (this.groundY - this.horizon) * p };
  };

  Game.prototype.update = function (dt) {
    var g = this, p = g.player;
    g.t += dt;
    // อนุภาค / กระสุนทำงานทุกสถานะ
    g.parts.forEach(function (o) { o.x += o.vx * dt; o.y += o.vy * dt; if (!o.txt) o.vy += 500 * dt; o.life -= dt; });
    g.parts = g.parts.filter(function (o) { return o.life > 0; });
    g.shots.forEach(function (s) { s.t += dt * 1.8; });
    var hitNow = g.shots.filter(function (s) { return s.t >= 1; });
    if (hitNow.length) { g.bossFlash = 0.3; g.bossShake = 0.35; SFX.hit(); var bx = g.W / 2, by = g.horizon - g.bossSize() * 0.55; g.burst(bx, by, ['💥', '🔥', '⭐'], 12); }
    g.shots = g.shots.filter(function (s) { return s.t < 1; });
    g.bossFlash = Math.max(0, g.bossFlash - dt); g.bossShake = Math.max(0, g.bossShake - dt); g.shake = Math.max(0, g.shake - dt);
    if (g.state === 'bossdie') { g.dieT += dt; if (Math.random() < 0.5) g.burst(g.W / 2 + rnd(-60, 60), g.horizon - g.bossSize() * 0.5 + rnd(-40, 40), ['💥', '⭐', '🎉', '✨'], 3); }

    p.scale += (p.ts - p.scale) * Math.min(1, dt * 6); g.morph = Math.max(0, g.morph - dt);
    if (g.state === 'ask') { p.x += clamp(p.lane - p.x, -dt * 9, dt * 9); return; }
    var moving = g.state === 'run' || g.state === 'blast' || g.state === 'intro' || g.state === 'bossdie';
    var v = g.state === 'run' ? g.speed : g.state === 'blast' ? 2.5 : g.state === 'intro' ? 2 : g.state === 'bossdie' ? 3 : 0;
    if (!moving) return;
    if (g.state === 'run' || g.state === 'blast') { g.playTick = (g.playTick || 0) + dt; }

    // ผู้เล่น
    p.x += clamp(p.lane - p.x, -dt * 9, dt * 9);
    p.run += dt * (4 + v * 0.5);
    if (p.jump > 0) { p.jump += p.jv * dt; p.jv -= 22 * dt; if (p.jump <= 0) { p.jump = 0; p.jv = 0; } }
    p.stun = Math.max(0, p.stun - dt);

    var dz = v * dt; g.dist += dz;
    g.objs.forEach(function (o) { o.pz = o.z; o.z -= dz; });
    if (g.gate) { g.gate.z -= dz; }

    // ของบนถนน
    if (g.state === 'run') {
      if (g.dist >= g.nextCoin) {
        var ln = rnd(-1, 1);
        for (var i = 0; i < 4; i++) g.objs.push({ k: 'coin', lane: ln, z: FAR + i * 2.2 });
        g.nextCoin = g.dist + rnd(14, 26);
      }
      var gateNear = g.gate && Math.abs(g.gate.z - FAR) < 9;
      if (g.dist >= g.nextRock && !gateNear && !g.gate) {
        g.objs.push({ k: 'rock', lane: rnd(-1, 1), z: FAR });
        g.nextRock = g.dist + (g.beg ? rnd(55, 80) : rnd(26, 42));
      }
    }
    if (g.dist >= g.nextDeco) {
      g.objs.push({ k: 'deco', side: -1, z: FAR, e: pick(g.th.deco) }); g.objs.push({ k: 'deco', side: 1, z: FAR + 3, e: pick(g.th.deco) });
      g.nextDeco = g.dist + 7;
    }
    // ชน
    g.objs.forEach(function (o) {
      if (o.pz > 0 && o.z <= 0) {
        if (o.k === 'coin' && Math.abs(p.x - o.lane) < 0.5) { o.gone = true; g.coins++; SFX.coin(); g.updHud(); }
        if (o.k === 'rock' && Math.abs(p.x - o.lane) < 0.45 && p.jump < 0.35 && !p.stun) {
          p.stun = 1; g.shake = 0.25; SFX.bump(); var lost = Math.min(3, g.coins); g.coins -= lost; g.updHud();
          g.floatTxt(g.W / 2 + p.x * g.laneW, g.groundY - 120, lost ? '-' + lost + ' 💎' : 'โอ๊ย!', '#dc2626');
        }
      }
    });
    g.objs = g.objs.filter(function (o) { return !o.gone && o.z > -2.5; });

    if (g.state === 'run') {
      if (g.gate && !g.gate.chosen && g.gate.z <= STOP_Z) {
        g.gate.z = STOP_Z; g.state = 'ask';
        g.askEl.classList.remove('hidden'); g.cards.classList.add('asking');
      }
      else if (g.gate && g.gate.z <= 0) g.passGate();
      else if (!g.gate) { g.cooldown -= dt; if (g.cooldown <= 0 && !g.shots.length) g.nextItem(); }
    }
    if (g.state === 'blast') g.updBlast(dt);
  };

  Game.prototype.updBlast = function (dt) {
    var g = this, b = g.blast; if (!b) return;
    b.spawnT -= dt;
    var r = Math.max(46, Math.min(g.W, g.H) * 0.085);
    if (b.spawnT <= 0 && b.items.length) {
      var it = b.items.shift();
      var x = rnd(Math.round(r * 1.2), Math.round(g.W - r * 1.2));
      g.bubbles.push({ x: x, y: g.H + r, r: r, t: it.t, yes: it.yes, vy: (g.beg ? g.H / 13 : g.H / 9.5) * (0.85 + Math.random() * 0.3), ph: Math.random() * 6 });
      b.spawnT = g.beg ? 2.2 : 1.6;
    }
    var top = g.hudBottom + 10;
    g.bubbles.forEach(function (o) {
      o.y -= o.vy * dt; o.ph += dt * 2; o.x += Math.sin(o.ph) * 20 * dt;
      if (!o.dead && o.y < top - o.r * 0.2) { o.dead = true; o.escaped = true; if (o.yes) { b.miss++; g.floatTxt(o.x, top + 30, 'หลุดไป!', '#f97316'); g.missed.push({ q: b.s.rule, a: 'ต้องแตะ “' + o.t + '”', you: 'ปล่อยหลุด' }); } }
    });
    g.bubbles = g.bubbles.filter(function (o) { return !o.dead; });
    if (!b.items.length && !g.bubbles.length) g.endBlast();
  };

  Game.prototype.bossSize = function () { return Math.min(this.W, this.H) * 0.17; };

  // ---------- วาด ----------
  Game.prototype.draw = function () {
    var g = this, c = g.cx, W = g.W, H = g.H, th = g.th;
    c.save();
    if (g.shake > 0) c.translate((Math.random() - 0.5) * 16 * g.shake / 0.4, (Math.random() - 0.5) * 16 * g.shake / 0.4);
    // ท้องฟ้า
    var sky = c.createLinearGradient(0, 0, 0, g.horizon);
    sky.addColorStop(0, th.sky[0]); sky.addColorStop(1, th.sky[1]);
    c.fillStyle = sky; c.fillRect(-20, -20, W + 40, g.horizon + 20);
    // เมฆ
    c.font = '48px ' + FONT; c.textAlign = 'center'; c.textBaseline = 'middle'; c.globalAlpha = 0.9;
    for (var i = 0; i < 4; i++) { var cxp = ((i * 311 + g.t * 12) % (W + 200)) - 100; c.fillText('☁️', cxp, g.hudBottom + 10 + (i % 2) * 30); }
    c.globalAlpha = 1;
    // พื้น + ถนนแบบแถบสลับสี
    c.fillStyle = th.grass[0]; c.fillRect(-20, g.horizon, W + 40, H - g.horizon + 20);
    var seg = 3, base = -(g.dist % (seg * 2)) - seg * 2;
    var bands = [];
    for (var k = 0; ; k++) { var z0 = base + k * seg, z1 = z0 + seg; if (z0 > FAR) break; if (z1 < -2.6) continue; bands.push([Math.max(z0, -2.6), Math.min(z1, FAR), k % 2]); }
    for (var bi = bands.length - 1; bi >= 0; bi--) {
      var bd = bands[bi], a = g.proj(bd[0]), b2 = g.proj(bd[1]), alt = bd[2];
      c.fillStyle = th.grass[alt]; c.fillRect(-20, b2.y, W + 40, a.y - b2.y + 1);
      var rw0 = g.laneW * 1.62 * a.p, rw1 = g.laneW * 1.62 * b2.p, cx0 = W / 2;
      quad(c, cx0 - rw0 * 1.07, a.y, cx0 + rw0 * 1.07, a.y, cx0 + rw1 * 1.07, b2.y, cx0 - rw1 * 1.07, b2.y, alt ? '#ffffff' : '#ef4444');
      quad(c, cx0 - rw0, a.y, cx0 + rw0, a.y, cx0 + rw1, b2.y, cx0 - rw1, b2.y, th.road[alt]);
      if (alt) {
        [-0.5, 0.5].forEach(function (lx) {
          var dw0 = 5 * a.p, dw1 = 5 * b2.p, x0 = cx0 + lx * g.laneW * a.p, x1 = cx0 + lx * g.laneW * b2.p;
          quad(c, x0 - dw0, a.y, x0 + dw0, a.y, x1 + dw1, b2.y, x1 - dw1, b2.y, 'rgba(255,255,255,.85)');
        });
      }
    }
    c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(0, g.horizon - 2, W, 3);
    c.fillStyle = '#000'; // emoji บน canvas (Windows) ใช้ความโปร่งของ fillStyle — ต้องทึบก่อนวาด

    // บอส
    g.drawBoss();

    // ของบนถนน (ไกล → ใกล้)
    var list = g.objs.slice();
    if (g.gate && g.gate.z < FAR + 5) list.push({ k: 'gate', z: g.gate.z, gate: g.gate });
    list.sort(function (a, b) { return b.z - a.z; });
    list.forEach(function (o) { if (o.z > FAR + 5) return; g.drawObj(o); });

    // ผู้เล่น
    g.drawPlayer();

    // กระสุนไฟ
    g.shots.forEach(function (s) {
      var bx = W / 2, by = g.horizon - g.bossSize() * 0.55, t = s.t;
      var x = s.x + (bx - s.x) * t, y = s.y + (by - s.y) * t - Math.sin(t * Math.PI) * 80;
      c.font = (s.big ? 70 : 46) * (1 - t * 0.5) + 'px ' + FONT; c.fillText(s.big ? '☄️' : g.shotE, x, y);
    });

    // ฟองสบู่
    g.bubbles.forEach(function (o) { g.drawBubble(o); });

    // อนุภาค
    g.parts.forEach(function (o) {
      c.globalAlpha = Math.min(1, o.life * 1.5);
      if (o.txt) { c.font = 'bold ' + o.s + 'px ' + FONT; c.lineWidth = 5; c.strokeStyle = '#fff'; c.strokeText(o.txt, o.x, o.y); c.fillStyle = o.col; c.fillText(o.txt, o.x, o.y); }
      else { c.fillStyle = '#000'; c.font = o.s + 'px ' + FONT; c.fillText(o.e, o.x, o.y); }
    });
    c.globalAlpha = 1;
    c.restore();
  };

  function quad(c, x1, y1, x2, y2, x3, y3, x4, y4, col) {
    c.fillStyle = col; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineTo(x3, y3); c.lineTo(x4, y4); c.closePath(); c.fill();
  }

  Game.prototype.drawBoss = function () {
    var g = this, c = g.cx, sz = g.bossSize(), x = g.W / 2, y = g.horizon - sz * 0.55 + Math.sin(g.t * 2) * 6;
    if (g.state === 'done' || g.state === 'lose' && false) return;
    if (g.state === 'bossdie') { var k = Math.max(0, 1 - g.dieT / 1.5); if (!k) return; c.globalAlpha = k; sz *= 1 + g.dieT * 0.6; }
    if (g.bossShake > 0) x += (Math.random() - 0.5) * 24;
    c.fillStyle = 'rgba(0,0,0,.18)'; c.beginPath(); c.ellipse(x, g.horizon + 2, sz * 0.4, sz * 0.08, 0, 0, 7); c.fill();
    if (g.bossFlash > 0) { c.shadowColor = '#fff'; c.shadowBlur = 40; }
    SK.draw(c, SK.BOSSES[g.subj.key] || SK.BOSSES.thai, x, g.horizon + Math.sin(g.t * 2) * 4, sz * 1.05, { run: g.state === 'bossdie' ? null : g.t * 2.5 });
    c.shadowBlur = 0; c.globalAlpha = 1; c.textAlign = 'center'; c.textBaseline = 'middle';
  };

  Game.prototype.drawObj = function (o) {
    var g = this, c = g.cx, pr = g.proj(o.z), P = pr.p, cx0 = g.W / 2;
    c.fillStyle = '#000';
    if (o.k === 'deco') {
      if (o.z < 0.4) return;
      var x = cx0 + o.side * g.laneW * 2.3 * P, s = g.laneW * 0.55 * P;
      c.font = s + 'px ' + FONT; c.fillText(o.e, x, pr.y - s * 0.45); return;
    }
    if (o.k === 'coin') {
      var s2 = g.laneW * 0.3 * P, x2 = cx0 + o.lane * g.laneW * P;
      c.save(); c.translate(x2, pr.y - s2 * 0.9); c.scale(Math.max(0.2, Math.abs(Math.cos(g.t * 5 + o.z))), 1);
      c.font = s2 + 'px ' + FONT; c.fillText('💎', 0, 0); c.restore(); return;
    }
    if (o.k === 'rock') {
      var s3 = g.laneW * 0.48 * P, x3 = cx0 + o.lane * g.laneW * P;
      c.font = s3 + 'px ' + FONT; c.fillText(g.th.rock, x3, pr.y - s3 * 0.42); return;
    }
    if (o.k === 'gate') {
      var gt = o.gate, cols = ['#ec4899', '#f59e0b', '#0ea5e9'];
      for (var i = 0; i < 3; i++) {
        var gx = cx0 + (i - 1) * g.laneW * P, gw = g.laneW * 0.9 * P, gh = g.laneW * 0.95 * P, bh = gh * 0.42;
        var top = pr.y - gh;
        c.fillStyle = '#6b4f2a'; c.fillRect(gx - gw / 2, top, Math.max(2, gw * 0.06), gh); c.fillRect(gx + gw / 2 - Math.max(2, gw * 0.06), top, Math.max(2, gw * 0.06), gh);
        c.fillStyle = cols[i]; roundRect(c, gx - gw / 2, top, gw, bh, 10 * P); c.fill();
        c.lineWidth = Math.max(1, 4 * P); c.strokeStyle = '#fff'; c.stroke();
        // ม่านโปร่งให้รู้ว่าวิ่งทะลุได้
        c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(gx - gw / 2 + gw * 0.06, top + bh, gw * 0.88, gh - bh);
        if (P > 0.12) fitText(c, gt.labels[i], gx, top + bh / 2, gw * 0.9, bh * 0.9);
      }
    }
  };

  function roundRect(c, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }

  // ตัดบรรทัดภาษาไทยตามคำ (Intl.Segmenter) — ไม่ตัดกลางสระ/วรรณยุกต์
  var SEG = null; try { SEG = new Intl.Segmenter('th', { granularity: 'word' }); } catch (e) {}
  function words(t) {
    if (SEG) { var out = []; var it = SEG.segment(t); for (var s of it) out.push(s.segment); return out; }
    var parts = t.split(/(\s+)/); if (parts.length > 1) return parts;
    return Array.from(t).reduce(function (acc, ch) { if (acc.length && /[ัิ-ฺ็-๎]/.test(ch)) acc[acc.length - 1] += ch; else acc.push(ch); return acc; }, []);
  }
  function fitText(c, text, x, y, maxW, maxH) {
    var px = Math.floor(maxH * 0.62);
    c.font = 'bold ' + px + 'px ' + FONT;
    var w = c.measureText(text).width;
    var lines = [text];
    if (w > maxW) {
      var ws = words(text), best = null;
      for (var i = 1; i < ws.length; i++) {
        var l1 = ws.slice(0, i).join('').trim(), l2 = ws.slice(i).join('').trim();
        var m = Math.max(c.measureText(l1).width, c.measureText(l2).width);
        if (!best || m < best.m) best = { m: m, l: [l1, l2] };
      }
      if (best && best.m < w * 0.8) { lines = best.l; w = best.m; px = Math.floor(maxH * 0.42); }
      c.font = 'bold ' + px + 'px ' + FONT; w = Math.max.apply(null, lines.map(function (l) { return c.measureText(l).width; }));
      if (w > maxW) { px = Math.max(6, Math.floor(px * maxW / w)); c.font = 'bold ' + px + 'px ' + FONT; }
    }
    c.fillStyle = '#fff'; c.lineWidth = Math.max(2, px / 7); c.strokeStyle = 'rgba(0,0,0,.35)';
    lines.forEach(function (l, i) { var yy = y + (i - (lines.length - 1) / 2) * px * 1.12; c.strokeText(l, x, yy); c.fillText(l, x, yy); });
  }

  Game.prototype.drawPlayer = function () {
    var g = this, c = g.cx, p = g.player, h = g.laneW * 0.78 * p.scale;
    var x = g.W / 2 + p.x * g.laneW, jumpPx = p.jump * g.laneW * 0.35;
    var runningNow = g.state === 'run' || g.state === 'intro' || g.state === 'blast';
    var bob = runningNow ? Math.abs(Math.sin(p.run)) * h * 0.04 : 0;
    var foot = g.groundY + h * 0.02 - jumpPx - bob;
    c.fillStyle = 'rgba(0,0,0,.22)'; c.beginPath(); c.ellipse(x, g.groundY + 4, h * 0.32, h * 0.07, 0, 0, 7); c.fill();
    if (g.morph > 0) {   // วงแสงตอนแปลงร่าง
      var k = g.morph / 0.7;
      c.strokeStyle = g.morphUp ? 'rgba(250,204,21,' + k + ')' : 'rgba(239,68,68,' + k + ')';
      c.lineWidth = 10 * k; c.beginPath(); c.arc(x, foot - h * 0.5, h * (0.75 + (1 - k) * 0.6), 0, 7); c.stroke();
    }
    c.save(); c.translate(x, foot); c.rotate((p.lane - p.x) * -0.25); c.translate(-x, -foot);
    if (p.stun > 0 && Math.floor(g.t * 12) % 2) c.globalAlpha = 0.4;
    if (g.state === 'ask' || (g.gate && g.gate.z < 9)) c.globalAlpha = 0.55;   // โปร่งให้เห็นประตู
    SK.draw(c, g.look, x, foot, h, { back: true, run: runningNow ? p.run : null });
    c.restore(); c.globalAlpha = 1;
    c.textAlign = 'center'; c.textBaseline = 'middle';
    if (g.combo >= 3 && g.state === 'run') { c.font = 'bold 22px ' + FONT; c.fillStyle = '#f97316'; c.fillText('🔥 x' + g.combo, x, foot - h - 16); }
  };

  Game.prototype.drawBubble = function (o) {
    var c = this.cx, r = o.r;
    var grd = c.createRadialGradient(o.x - r * 0.35, o.y - r * 0.35, r * 0.1, o.x, o.y, r);
    grd.addColorStop(0, 'rgba(255,255,255,.95)'); grd.addColorStop(0.7, 'rgba(186,230,253,.85)'); grd.addColorStop(1, 'rgba(56,189,248,.9)');
    c.fillStyle = grd; c.beginPath(); c.arc(o.x, o.y, r, 0, 7); c.fill();
    c.lineWidth = 3; c.strokeStyle = 'rgba(255,255,255,.95)'; c.stroke();
    // emoji บรรทัดบน + คำบรรทัดล่าง
    var t = o.t, em = '', rest = t;
    var m = t.match(/^((?:\p{Extended_Pictographic}|️|‍|[\u{1F1E6}-\u{1F1FF}])+)\s*(.*)$/u);
    if (m) { em = m[1]; rest = m[2]; }
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#000';
    if (em && rest) {
      c.font = (r * 0.62) + 'px ' + FONT; c.fillText(em, o.x, o.y - r * 0.28);
      c.fillStyle = '#1e1b4b'; fitDark(c, rest, o.x, o.y + r * 0.38, r * 1.6, r * 0.5);
    } else if (em) { c.font = (r * 0.95) + 'px ' + FONT; c.fillText(em, o.x, o.y + r * 0.05); }
    else fitDark(c, rest, o.x, o.y, r * 1.7, r * 0.75);
  };
  function fitDark(c, text, x, y, maxW, maxH) {
    var px = Math.floor(maxH * 0.75); c.font = 'bold ' + px + 'px ' + FONT;
    var w = c.measureText(text).width; if (w > maxW) { px = Math.max(8, Math.floor(px * maxW / w)); c.font = 'bold ' + px + 'px ' + FONT; }
    c.fillStyle = '#1e1b4b'; c.fillText(text, x, y);
  }

  // ช่องทางให้หน้าเทสต์ (tools/test-arcade.html) เข้าถึงเกมที่กำลังเล่น
  window.__arcade = { game: function () { return G; } };

  // ---------- เริ่ม ----------
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!G) render(); });
  // ?kid=Kaka เปิดตรงไปที่แผนที่ของลูกคนนั้น
  var qk = (location.search.match(/[?&]kid=([^&]+)/) || [])[1];
  if (qk && DATA.kids[decodeURIComponent(qk)]) { cur.kid = decodeURIComponent(qk); view = 'adv'; }
  render();
})();
