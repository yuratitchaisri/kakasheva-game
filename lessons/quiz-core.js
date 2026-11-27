/* แบบทดสอบหลังคลิป — ส่วนกลางที่ใช้ทั้งหน้าคลิป (index.html) และหน้าทำข้อสอบ (quiz.html)
 * เก็บในเครื่อง: localStorage "ksl_quiz_v1"
 *   dev    รหัสสุ่มของเครื่อง (ไม่ใช่ชื่อ)
 *   hist   { <lesson id>: { n: จำนวนรอบที่ส่งแล้ว, last: {score,total,ts}, abandons, round, items: { <item id>: {seen, ok, r} } } }
 *   outbox [ผลที่ยังส่งไม่สำเร็จ]  → flush() ส่งซ้ำทุกครั้งที่เปิดหน้า (server กันซ้ำด้วย rid)
 *   cur    รอบที่ทำค้างอยู่ (เปิดใหม่ทำต่อได้ภายใน 2 ชม.)
 * ออกแบบ/เหตุผล: _context/แผนแบบทดสอบหลังคลิป.md
 */
var KSLQuiz = (function () {
  var KEY = "ksl_quiz_v1";
  var OUTBOX_MAX = 80;

  function rid(n) {
    var a = "abcdefghijkmnpqrstuvwxyz23456789", s = "";
    for (var i = 0; i < n; i++) s += a.charAt(Math.floor(Math.random() * a.length));
    return s;
  }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.v === 1) { s.hist = s.hist || {}; s.outbox = s.outbox || []; return s; }
    } catch (e) {}
    return { v: 1, dev: rid(8), hist: {}, outbox: [], cur: null };
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  function endpoint() { return (window.QUIZ_CONFIG && QUIZ_CONFIG.endpoint) || ""; }

  function enqueue(payload) {
    var s = load();
    s.outbox.push(payload);
    if (s.outbox.length > OUTBOX_MAX) s.outbox = s.outbox.slice(-OUTBOX_MAX);
    save(s);
  }
  function dropFromOutbox(id) {
    var s = load();
    s.outbox = s.outbox.filter(function (p) { return p.rid !== id; });
    save(s);
  }
  function sendOne(p) {
    // text/plain = "simple request" ไม่มี preflight (Apps Script ไม่ตอบ OPTIONS)
    return fetch(endpoint(), { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(p), redirect: "follow" })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error((j && j.err) || "bad"); return true; });
  }
  var flushing = false;
  // ส่งผลที่ค้างทั้งหมดทีละรอบ · cb(จำนวนที่ยังค้าง)
  function flush(cb) {
    var done = function () { flushing = false; if (cb) cb(load().outbox.length); };
    if (flushing) { if (cb) cb(load().outbox.length); return; }
    var list = load().outbox.slice();
    if (!endpoint() || !list.length || !window.fetch) { if (cb) cb(list.length); return; }
    flushing = true;
    var i = 0;
    (function next() {
      if (i >= list.length) return done();
      var p = list[i++];
      sendOne(p).then(function () { dropFromOutbox(p.rid); next(); }, function () { done(); });   // พังข้อแรกก็หยุด (เน็ตหลุด) รอบหน้าค่อยส่ง
    })();
  }
  // ป้ายบนการ์ดคลิป: "ทำแล้ว 2 รอบ · ล่าสุด 8/10"
  function badge(lessonId) {
    var h = load().hist[lessonId];
    if (!h || !h.n || !h.last) return "";
    return "ทำแล้ว " + h.n + " รอบ · ล่าสุด " + h.last.score + "/" + h.last.total;
  }
  return { load: load, save: save, rid: rid, enqueue: enqueue, flush: flush, badge: badge, endpoint: endpoint };
})();
