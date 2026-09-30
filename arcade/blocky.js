/* ตัวละครบล็อกสไตล์ Roblox — วาดด้วยโค้ดล้วน (ไม่ใช้ภาพจากเกมจริง เรื่องลิขสิทธิ์)
 * Blocky.draw(ctx, skin, x, footY, height, {back, run, face})  · Blocky.img(id, px) → dataURL
 * สัดส่วนแบบ R6: หัว 1.25×1.2 · ลำตัว 2×2 · แขน/ขา 1×2 (หน่วย u = height / 5.4)
 */
(function () {
  'use strict';
  var SKIN = '#F5CD30';          // ผิวเหลืองแบบ Noob
  var TAN = '#EAB892';           // ผิวคน

  // p = ราคา (เพชร) · 0 = ฟรี
  var SKINS = [
    { id: 'noob', n: 'นูบ', p: 0, head: SKIN, torso: '#0D69AC', arms: SKIN, legs: '#A4BD47' },
    { id: 'bacon', n: 'ผมเบคอน', p: 0, head: TAN, torso: '#2E8B57', arms: TAN, legs: '#1F3B73', hair: 'bacon', hairC: '#8B4A1C' },
    { id: 'pinky', n: 'สาวผมชมพู', p: 300, head: TAN, torso: '#FF6FB5', arms: TAN, legs: '#7B61FF', hair: 'long', hairC: '#FF8FCB' },
    { id: 'guest', n: 'เกสต์', p: 300, head: TAN, torso: '#F4F4F4', arms: TAN, legs: '#2B2B2B', hat: 'cap', hatC: '#1B1B1B', extra: ['gstar'] },
    { id: 'zombie', n: 'ซอมบี้ใจดี', p: 500, head: '#7FB069', torso: '#3E7CB1', arms: '#7FB069', legs: '#5B4636', extra: ['torn'] },
    { id: 'ninja', n: 'นินจา', p: 600, head: '#222', torso: '#222', arms: '#222', legs: '#222', hat: 'hood', hatC: '#222', extra: ['band', 'belt'] },
    { id: 'cat', n: 'แมวเหมียว', p: 600, head: '#FFFFFF', torso: '#FFB347', arms: '#FFFFFF', legs: '#FF8C42', hat: 'ears', hatC: '#FFB347' },
    { id: 'pirate', n: 'โจรสลัด', p: 800, head: TAN, torso: '#B22222', arms: TAN, legs: '#3B2A1A', hat: 'pirate', hatC: '#1B1B1B', extra: ['patch', 'belt'] },
    { id: 'knight', n: 'อัศวิน', p: 1000, head: '#C0C6CF', torso: '#AEB6C1', arms: '#9AA3AF', legs: '#7D8794', hat: 'helmet', hatC: '#C0C6CF', extra: ['cross'] },
    { id: 'robot', n: 'หุ่นยนต์', p: 1000, head: '#9CA3AF', torso: '#6B7280', arms: '#9CA3AF', legs: '#4B5563', hat: 'antenna', hatC: '#EF4444', face: 'robot' },
    { id: 'astro', n: 'นักบินอวกาศ', p: 1200, head: '#FFFFFF', torso: '#F1F5F9', arms: '#FFFFFF', legs: '#E2E8F0', hat: 'astro', hatC: '#FFFFFF', extra: ['flag'] },
    { id: 'princess', n: 'เจ้าหญิง', p: 1200, head: TAN, torso: '#C084FC', arms: TAN, legs: '#C084FC', hair: 'long', hairC: '#FDE047', hat: 'crown', hatC: '#FACC15', extra: ['skirt'] },
    { id: 'dino', n: 'ชุดไดโนเสาร์', p: 1500, head: TAN, torso: '#4ADE80', arms: '#4ADE80', legs: '#22C55E', hat: 'dino', hatC: '#22C55E' },
    { id: 'hero', n: 'ซูเปอร์ฮีโร่', p: 2000, head: TAN, torso: '#2563EB', arms: '#2563EB', legs: '#DC2626', hair: 'spiky', hairC: '#1F2937', extra: ['cape', 'belt', 'logo'] },
    { id: 'rainbow', n: 'โปรสายรุ้ง', p: 2500, head: TAN, torso: 'rainbow', arms: TAN, legs: '#111827', hair: 'spiky', hairC: '#A855F7', extra: ['shades'] },
    { id: 'gold', n: 'ราชาทองคำ', p: 5000, head: '#FACC15', torso: '#EAB308', arms: '#FACC15', legs: '#CA8A04', hat: 'crown', hatC: '#FDE68A', extra: ['cape', 'shades'], capeC: '#7C3AED' }
  ];
  // บอสประจำวิชา (หน้าโหด ตัวใหญ่)
  var BOSSES = {
    thai: { head: '#7FB069', torso: '#6D28D9', arms: '#7FB069', legs: '#3F3F46', face: 'angry', extra: ['torn'] },
    math: { head: '#9CA3AF', torso: '#374151', arms: '#9CA3AF', legs: '#1F2937', hat: 'antenna', hatC: '#EF4444', face: 'robotAngry' },
    mathinter: { head: '#38BDF8', torso: '#0284C7', arms: '#38BDF8', legs: '#075985', face: 'angry', hat: 'horns', hatC: '#FDE68A' },
    sci: { head: '#312E81', torso: '#1E1B4B', arms: '#312E81', legs: '#1E1B4B', face: 'glow' },
    sciinter: { head: '#65A30D', torso: '#3F6212', arms: '#65A30D', legs: '#365314', face: 'angry', hat: 'leaf', hatC: '#16A34A' },
    social: { head: '#EF4444', torso: '#991B1B', arms: '#EF4444', legs: '#450A0A', face: 'angry', hat: 'horns', hatC: '#1F2937' },
    history: { head: '#27272A', torso: '#18181B', arms: '#3F3F46', legs: '#18181B', hat: 'helmet', hatC: '#27272A', face: 'glow', extra: ['cape'], capeC: '#7F1D1D' },
    english: { head: '#86EFAC', torso: '#7C3AED', arms: '#86EFAC', legs: '#4C1D95', face: 'alien' },
    mix: { head: '#A855F7', torso: '#581C87', arms: '#A855F7', legs: '#3B0764', face: 'glow', hat: 'crown', hatC: '#FACC15', extra: ['cape'], capeC: '#DB2777' }
  };
  var BY = {}; SKINS.forEach(function (s) { BY[s.id] = s; });

  function rr(c, x, y, w, h, r, col) {
    r = Math.min(r, w / 2, h / 2);
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    c.fillStyle = col; c.fill();
  }
  function shade(hex, k) {
    if (hex[0] !== '#' || hex.length !== 7) return hex;
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function f(v) { return Math.max(0, Math.min(255, Math.round(v * k))); }
    return 'rgb(' + f(r) + ',' + f(g) + ',' + f(b) + ')';
  }
  function fillOf(c, col, x, y, w, h) {
    if (col !== 'rainbow') return col;
    var g = c.createLinearGradient(x, y, x, y + h);
    ['#EF4444', '#F97316', '#FACC15', '#22C55E', '#3B82F6', '#A855F7'].forEach(function (s, i) { g.addColorStop(i / 5, s); });
    return g;
  }

  // o: {back:bool, run:phase(rad), face:'smile'|...}
  function draw(c, s, x, footY, height, o) {
    if (typeof s === 'string') s = BY[s] || SKINS[0];
    o = o || {};
    var u = height / 5.4, back = !!o.back, ph = o.run || 0;
    var swing = o.run == null ? 0 : Math.sin(ph);
    var lw = u * 0.96, ol = Math.max(1, u * 0.07);
    c.save();
    c.lineJoin = 'round';
    var torsoY = footY - 4 * u, legY = footY - 2 * u, headH = u * 1.2, headW = u * 1.25, headY = torsoY - headH - u * 0.04;
    var ex = s.extra || [];
    // ผ้าคลุม (ด้านหน้า = วาดก่อนให้อยู่ข้างหลังตัว)
    if (ex.indexOf('cape') >= 0 && !back) rr(c, x - u * 1.1, torsoY + u * 0.1, u * 2.2, u * 3.6, u * 0.2, s.capeC || '#DC2626');
    // ขา (ก้าวสลับ: ขาที่ยกจะสั้นลง)
    var liftL = Math.max(0, swing) * 0.45 * u, liftR = Math.max(0, -swing) * 0.45 * u;
    rr(c, x - lw - u * 0.02, legY, lw, 2 * u - liftL, u * 0.12, shade(s.legs, 0.92));
    rr(c, x + u * 0.02, legY, lw, 2 * u - liftR, u * 0.12, s.legs);
    if (ex.indexOf('skirt') >= 0) { c.fillStyle = shade(s.torso, 0.9); c.beginPath(); c.moveTo(x - u, legY - u * 0.05); c.lineTo(x + u, legY - u * 0.05); c.lineTo(x + u * 1.35, legY + u * 1.2); c.lineTo(x - u * 1.35, legY + u * 1.2); c.closePath(); c.fill(); }
    // แขน (แกว่งสลับกับขา)
    var armL = -swing * 0.3 * u, armR = swing * 0.3 * u;
    rr(c, x - 2 * u, torsoY + armL, lw, 2 * u, u * 0.14, shade(s.arms, 0.9));
    rr(c, x + 2 * u - lw, torsoY + armR, lw, 2 * u, u * 0.14, s.arms);
    // ลำตัว
    rr(c, x - u, torsoY, 2 * u, 2 * u, u * 0.1, fillOf(c, s.torso, x - u, torsoY, 2 * u, 2 * u));
    if (!back) {
      if (ex.indexOf('belt') >= 0) { c.fillStyle = '#3B2A1A'; c.fillRect(x - u, torsoY + 1.7 * u, 2 * u, u * 0.22); c.fillStyle = '#FACC15'; c.fillRect(x - u * 0.15, torsoY + 1.7 * u, u * 0.3, u * 0.22); }
      if (ex.indexOf('torn') >= 0) { c.fillStyle = shade(s.head, 1); c.beginPath(); c.moveTo(x - u, torsoY + 2 * u); c.lineTo(x - u * 0.6, torsoY + 1.5 * u); c.lineTo(x - u * 0.2, torsoY + 2 * u); c.fill(); c.beginPath(); c.moveTo(x + u * 0.3, torsoY + 2 * u); c.lineTo(x + u * 0.7, torsoY + 1.55 * u); c.lineTo(x + u, torsoY + 2 * u); c.fill(); }
      if (ex.indexOf('logo') >= 0) { c.fillStyle = '#FACC15'; c.beginPath(); c.moveTo(x, torsoY + u * 0.35); c.lineTo(x + u * 0.55, torsoY + u * 0.75); c.lineTo(x, torsoY + u * 1.25); c.lineTo(x - u * 0.55, torsoY + u * 0.75); c.closePath(); c.fill(); }
      if (ex.indexOf('gstar') >= 0) { c.fillStyle = '#1B1B1B'; c.font = 'bold ' + u * 0.9 + 'px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('G', x, torsoY + u * 0.95); }
      if (ex.indexOf('cross') >= 0) { c.fillStyle = '#DC2626'; c.fillRect(x - u * 0.12, torsoY + u * 0.3, u * 0.24, u * 1.3); c.fillRect(x - u * 0.55, torsoY + u * 0.7, u * 1.1, u * 0.24); }
      if (ex.indexOf('flag') >= 0) { c.fillStyle = '#2563EB'; c.fillRect(x + u * 0.25, torsoY + u * 0.3, u * 0.5, u * 0.35); }
    }
    if (ex.indexOf('cape') >= 0 && back) { rr(c, x - u * 1.1, torsoY + u * 0.05, u * 2.2, u * 3.4, u * 0.2, s.capeC || '#DC2626'); }
    // หัว
    var hx = x - headW / 2;
    if (s.hat === 'hood' || s.hat === 'dino') rr(c, hx - u * 0.12, headY - u * 0.12, headW + u * 0.24, headH + u * 0.2, u * 0.3, s.hatC);
    rr(c, hx, headY, headW, headH, u * 0.28, s.head);
    // ผม
    if (s.hair) {
      var hc = s.hairC;
      if (s.hair === 'bacon') {
        rr(c, hx - u * 0.04, headY - u * 0.12, headW + u * 0.08, back ? headH * 0.95 : u * 0.42, u * 0.2, hc);
        c.fillStyle = shade(hc, 1.45); for (var i = 0; i < 4; i++) c.fillRect(hx + u * (0.1 + i * 0.3), headY - u * 0.05, u * 0.12, back ? headH * 0.8 : u * 0.3);
      } else if (s.hair === 'long') {
        rr(c, hx - u * 0.1, headY - u * 0.14, headW + u * 0.2, u * 0.5, u * 0.22, hc);
        rr(c, hx - u * 0.18, headY, u * 0.34, headH + u * 0.9, u * 0.15, hc);
        rr(c, hx + headW - u * 0.16, headY, u * 0.34, headH + u * 0.9, u * 0.15, hc);
        if (back) rr(c, hx - u * 0.1, headY, headW + u * 0.2, headH + u * 0.9, u * 0.2, hc);
      } else if (s.hair === 'spiky') {
        c.fillStyle = hc; c.beginPath(); c.moveTo(hx - u * 0.05, headY + u * 0.35);
        for (var k = 0; k <= 5; k++) { c.lineTo(hx + headW * k / 5, headY - (k % 2 ? u * 0.45 : u * 0.05)); }
        c.lineTo(hx + headW + u * 0.05, headY + u * 0.35); c.closePath(); c.fill();
        if (back) rr(c, hx, headY, headW, headH * 0.85, u * 0.25, hc);
      }
    }
    // หน้า
    if (!back && s.hat !== 'astro') face(c, s.face || 'smile', x, headY, headW, headH, u);
    // หมวก / ของบนหัว
    var hat = s.hat, hcol = s.hatC;
    if (hat === 'cap') { rr(c, hx - u * 0.05, headY - u * 0.12, headW + u * 0.1, u * 0.5, u * 0.2, hcol); if (!back) rr(c, hx - u * 0.05, headY + u * 0.3, headW + u * 0.45, u * 0.16, u * 0.08, hcol); }
    else if (hat === 'crown') { c.fillStyle = hcol; c.beginPath(); c.moveTo(hx + u * 0.1, headY + u * 0.05); c.lineTo(hx + u * 0.1, headY - u * 0.45); c.lineTo(hx + headW * 0.3, headY - u * 0.15); c.lineTo(x, headY - u * 0.55); c.lineTo(hx + headW * 0.7, headY - u * 0.15); c.lineTo(hx + headW - u * 0.1, headY - u * 0.45); c.lineTo(hx + headW - u * 0.1, headY + u * 0.05); c.closePath(); c.fill(); c.fillStyle = '#EF4444'; c.beginPath(); c.arc(x, headY - u * 0.12, u * 0.09, 0, 7); c.fill(); }
    else if (hat === 'helmet') { rr(c, hx - u * 0.08, headY - u * 0.1, headW + u * 0.16, headH + u * 0.16, u * 0.25, hcol); if (!back) { c.fillStyle = '#111'; c.fillRect(hx + u * 0.12, headY + headH * 0.38, headW - u * 0.24, u * 0.16); if (s.face === 'glow') { c.fillStyle = '#F87171'; c.fillRect(hx + u * 0.25, headY + headH * 0.4, u * 0.2, u * 0.1); c.fillRect(hx + headW - u * 0.45, headY + headH * 0.4, u * 0.2, u * 0.1); } } c.fillStyle = '#DC2626'; c.fillRect(x - u * 0.08, headY - u * 0.45, u * 0.16, u * 0.4); }
    else if (hat === 'hood') { if (!back) { rr(c, hx + u * 0.1, headY + headH * 0.3, headW - u * 0.2, u * 0.34, u * 0.1, TAN); c.fillStyle = '#111'; c.fillRect(hx + u * 0.3, headY + headH * 0.38, u * 0.14, u * 0.14); c.fillRect(hx + headW - u * 0.44, headY + headH * 0.38, u * 0.14, u * 0.14); } }
    else if (hat === 'ears') { c.fillStyle = hcol; [[hx + u * 0.05, 1], [hx + headW - u * 0.45, 1]].forEach(function (e) { c.beginPath(); c.moveTo(e[0], headY + u * 0.05); c.lineTo(e[0] + u * 0.2, headY - u * 0.4); c.lineTo(e[0] + u * 0.4, headY + u * 0.05); c.closePath(); c.fill(); }); }
    else if (hat === 'pirate') { c.fillStyle = hcol; c.beginPath(); c.moveTo(hx - u * 0.3, headY + u * 0.1); c.quadraticCurveTo(x, headY - u * 0.9, hx + headW + u * 0.3, headY + u * 0.1); c.closePath(); c.fill(); c.fillStyle = '#fff'; c.font = u * 0.35 + 'px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; if (!back) c.fillText('☠', x, headY - u * 0.2); }
    else if (hat === 'antenna') { c.fillStyle = '#6B7280'; c.fillRect(x - u * 0.05, headY - u * 0.45, u * 0.1, u * 0.45); c.fillStyle = hcol; c.beginPath(); c.arc(x, headY - u * 0.5, u * 0.14, 0, 7); c.fill(); }
    else if (hat === 'astro') { rr(c, hx - u * 0.15, headY - u * 0.15, headW + u * 0.3, headH + u * 0.25, u * 0.4, hcol); if (!back) { rr(c, hx + u * 0.08, headY + u * 0.2, headW - u * 0.16, headH * 0.55, u * 0.2, '#1E3A8A'); c.fillStyle = 'rgba(255,255,255,.6)'; c.fillRect(hx + u * 0.2, headY + u * 0.28, u * 0.2, u * 0.12); } }
    else if (hat === 'dino') { c.fillStyle = shade(hcol, 0.8); for (var d = 0; d < 3; d++) { c.beginPath(); var dx = hx + u * (0.15 + d * 0.38); c.moveTo(dx, headY - u * 0.08); c.lineTo(dx + u * 0.18, headY - u * 0.45); c.lineTo(dx + u * 0.36, headY - u * 0.08); c.fill(); } if (!back) { c.fillStyle = '#fff'; for (var t = 0; t < 4; t++) { c.beginPath(); var tx = hx + u * (0.12 + t * 0.27); c.moveTo(tx, headY - u * 0.02); c.lineTo(tx + u * 0.12, headY + u * 0.15); c.lineTo(tx + u * 0.24, headY - u * 0.02); c.fill(); } } }
    else if (hat === 'horns') { c.fillStyle = hcol; [hx + u * 0.05, hx + headW - u * 0.3].forEach(function (e, i) { c.beginPath(); c.moveTo(e, headY + u * 0.05); c.lineTo(e + (i ? u * 0.35 : -u * 0.1), headY - u * 0.5); c.lineTo(e + u * 0.25, headY + u * 0.05); c.fill(); }); }
    else if (hat === 'leaf') { c.fillStyle = hcol; c.beginPath(); c.ellipse(x + u * 0.2, headY - u * 0.25, u * 0.35, u * 0.15, -0.5, 0, 7); c.fill(); c.fillStyle = '#3F6212'; c.fillRect(x - u * 0.03, headY - u * 0.3, u * 0.06, u * 0.3); }
    if (!back && ex.indexOf('band') >= 0) { c.fillStyle = '#DC2626'; c.fillRect(hx - u * 0.1, headY + u * 0.08, headW + u * 0.2, u * 0.16); }
    if (!back && ex.indexOf('patch') >= 0) { c.fillStyle = '#111'; c.fillRect(hx + headW * 0.58, headY + headH * 0.3, u * 0.3, u * 0.26); c.fillRect(hx, headY + headH * 0.28, headW, u * 0.05); }
    if (!back && ex.indexOf('shades') >= 0) { c.fillStyle = '#111'; rr(c, hx + u * 0.08, headY + headH * 0.3, headW - u * 0.16, u * 0.28, u * 0.08, '#111'); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(hx + u * 0.2, headY + headH * 0.33, u * 0.18, u * 0.06); }
    c.restore();
  }

  function face(c, f, x, hy, hw, hh, u) {
    var ey = hy + hh * 0.42, ex = hw * 0.2;
    if (f === 'robot' || f === 'robotAngry') {
      rr(c, x - hw * 0.38, ey - u * 0.14, hw * 0.76, u * 0.3, u * 0.1, '#111');
      c.fillStyle = f === 'robot' ? '#22D3EE' : '#EF4444';
      c.fillRect(x - ex - u * 0.08, ey - u * 0.06, u * 0.16, u * 0.14); c.fillRect(x + ex - u * 0.08, ey - u * 0.06, u * 0.16, u * 0.14);
      return;
    }
    if (f === 'glow') { c.fillStyle = '#FDE047'; c.shadowColor = '#FDE047'; c.shadowBlur = u * 0.5; c.fillRect(x - ex - u * 0.12, ey - u * 0.05, u * 0.24, u * 0.12); c.fillRect(x + ex - u * 0.12, ey - u * 0.05, u * 0.24, u * 0.12); c.shadowBlur = 0; return; }
    if (f === 'alien') { c.fillStyle = '#111'; [-1, 1].forEach(function (sd) { c.beginPath(); c.ellipse(x + sd * ex, ey, u * 0.17, u * 0.26, sd * 0.5, 0, 7); c.fill(); }); return; }
    c.fillStyle = '#111';
    if (f === 'angry') {
      [-1, 1].forEach(function (sd) { c.beginPath(); c.ellipse(x + sd * ex, ey + u * 0.03, u * 0.09, u * 0.12, 0, 0, 7); c.fill(); c.fillRect(x + sd * ex - u * 0.15, ey - u * 0.2 + (sd > 0 ? 0 : 0), u * 0.3, u * 0.06); });
      c.strokeStyle = '#111'; c.lineWidth = u * 0.07; c.beginPath(); c.arc(x, hy + hh * 0.95, hw * 0.2, Math.PI * 1.15, Math.PI * 1.85); c.stroke();
      return;
    }
    [-1, 1].forEach(function (sd) { c.beginPath(); c.ellipse(x + sd * ex, ey, u * 0.08, u * 0.13, 0, 0, 7); c.fill(); });
    c.strokeStyle = '#111'; c.lineWidth = u * 0.07; c.lineCap = 'round';
    c.beginPath(); c.arc(x, hy + hh * 0.5, hw * 0.24, Math.PI * 0.2, Math.PI * 0.8); c.stroke();
  }

  var cache = {};
  function img(id, px) {
    var key = id + '@' + px;
    if (cache[key]) return cache[key];
    var cv = document.createElement('canvas'); cv.width = px; cv.height = px;
    var c = cv.getContext('2d');
    draw(c, id, px / 2, px * 0.97, px * 0.86, {});
    return (cache[key] = cv.toDataURL());
  }

  window.Blocky = { SKINS: SKINS, BOSSES: BOSSES, BY: BY, draw: draw, img: img };
})();
