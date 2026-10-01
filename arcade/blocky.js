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

  // ---------- ไอเทมแต่งตัว (ได้จากการผ่านด่าน) ----------
  // r: c=ธรรมดา r=หายาก e=สุดยอด l=ตำนาน
  var RARITY = { c: { n: 'ธรรมดา', col: '#94a3b8' }, r: { n: 'หายาก', col: '#3b82f6' }, e: { n: 'สุดยอด', col: '#a855f7' }, l: { n: 'ตำนาน', col: '#f59e0b' } };
  var SLOTS = [
    { k: 'base', n: 'ตัวละคร', e: '🧍' }, { k: 'hat', n: 'หมวก', e: '🎩' }, { k: 'face', n: 'หน้า', e: '🕶️' },
    { k: 'shirt', n: 'เสื้อ', e: '👕' }, { k: 'pants', n: 'กางเกง', e: '👖' }, { k: 'shoes', n: 'รองเท้า', e: '👟' },
    { k: 'hand', n: 'อาวุธ', e: '⚔️' }, { k: 'back', n: 'หลัง', e: '🦋' }, { k: 'pet', n: 'สัตว์เลี้ยง', e: '🐶' }
  ];
  var ITEMS = [
    // หมวก
    { id: 'cap_red', slot: 'hat', n: 'หมวกแก๊ปแดง', r: 'c', hat: 'cap', c: '#DC2626' },
    { id: 'beanie', slot: 'hat', n: 'หมวกไหมพรม', r: 'c', hat: 'beanie', c: '#2563EB' },
    { id: 'party', slot: 'hat', n: 'หมวกปาร์ตี้', r: 'c', hat: 'party', c: '#EC4899' },
    { id: 'cowboy', slot: 'hat', n: 'หมวกคาวบอย', r: 'r', hat: 'cowboy', c: '#92400E' },
    { id: 'chef', slot: 'hat', n: 'หมวกเชฟ', r: 'r', hat: 'chef', c: '#FFFFFF' },
    { id: 'tophat', slot: 'hat', n: 'หมวกนักมายากล', r: 'r', hat: 'tophat', c: '#111827' },
    { id: 'phones', slot: 'hat', n: 'หูฟังเกมเมอร์', r: 'r', hat: 'headphones', c: '#22C55E' },
    { id: 'wizard', slot: 'hat', n: 'หมวกพ่อมด', r: 'e', hat: 'wizard', c: '#6D28D9' },
    { id: 'viking', slot: 'hat', n: 'หมวกไวกิ้ง', r: 'e', hat: 'viking', c: '#9CA3AF' },
    { id: 'halo', slot: 'hat', n: 'วงแหวนนางฟ้า', r: 'l', hat: 'halo', c: '#FDE047' },
    { id: 'crown_g', slot: 'hat', n: 'มงกุฎราชา', r: 'l', hat: 'crown', c: '#FACC15' },
    // หน้า
    { id: 'glasses', slot: 'face', n: 'แว่นตากลม', r: 'c', acc: 'glasses' },
    { id: 'mustache', slot: 'face', n: 'หนวดเท่', r: 'c', acc: 'mustache' },
    { id: 'shades', slot: 'face', n: 'แว่นกันแดด', r: 'r', acc: 'shades' },
    { id: 'patch', slot: 'face', n: 'ผ้าปิดตาโจรสลัด', r: 'r', acc: 'patch' },
    { id: 'band', slot: 'face', n: 'ผ้าคาดหัวนินจา', r: 'r', acc: 'band' },
    { id: 'visor', slot: 'face', n: 'แว่นไซเบอร์', r: 'e', acc: 'visor' },
    // เสื้อ
    { id: 'tee_red', slot: 'shirt', n: 'เสื้อยืดแดง', r: 'c', c: '#EF4444' },
    { id: 'tee_green', slot: 'shirt', n: 'เสื้อยืดเขียว', r: 'c', c: '#22C55E' },
    { id: 'stripes', slot: 'shirt', n: 'เสื้อลายทาง', r: 'c', c: '#0EA5E9', mark: 'stripes' },
    { id: 'hoodie', slot: 'shirt', n: 'เสื้อฮู้ด', r: 'c', c: '#6B7280', sleeve: true, mark: 'zip' },
    { id: 'jersey', slot: 'shirt', n: 'เสื้อบอลเบอร์ 10', r: 'r', c: '#2563EB', mark: 'num' },
    { id: 'suit', slot: 'shirt', n: 'ชุดสูทหล่อ', r: 'r', c: '#1F2937', sleeve: true, mark: 'suit' },
    { id: 'heart', slot: 'shirt', n: 'เสื้อหัวใจ', r: 'r', c: '#F472B6', mark: 'heart' },
    { id: 'starshirt', slot: 'shirt', n: 'เสื้อดาว', r: 'r', c: '#7C3AED', mark: 'star' },
    { id: 'herosuit', slot: 'shirt', n: 'ชุดซูเปอร์ฮีโร่', r: 'e', c: '#2563EB', sleeve: true, mark: 'logo' },
    { id: 'armor', slot: 'shirt', n: 'เกราะอัศวิน', r: 'e', c: '#94A3B8', sleeve: true, mark: 'armor' },
    { id: 'flame', slot: 'shirt', n: 'เสื้อลายไฟ', r: 'e', c: '#111827', mark: 'flame' },
    { id: 'rainbow', slot: 'shirt', n: 'เสื้อสายรุ้ง', r: 'l', c: 'rainbow', sleeve: true, sc: '#A855F7' },
    { id: 'goldarmor', slot: 'shirt', n: 'เกราะทองคำ', r: 'l', c: '#EAB308', sleeve: true, mark: 'armor' },
    // กางเกง
    { id: 'jeans', slot: 'pants', n: 'กางเกงยีนส์', r: 'c', c: '#1E40AF' },
    { id: 'blackp', slot: 'pants', n: 'กางเกงดำ', r: 'c', c: '#111827' },
    { id: 'shorts', slot: 'pants', n: 'ขาสั้นแดง', r: 'c', c: '#DC2626', pm: 'shorts' },
    { id: 'track', slot: 'pants', n: 'กางเกงวอร์ม', r: 'r', c: '#111827', pm: 'stripes' },
    { id: 'camo', slot: 'pants', n: 'กางเกงลายพราง', r: 'r', c: '#4D7C0F', pm: 'camo' },
    { id: 'skirt', slot: 'pants', n: 'กระโปรงชมพู', r: 'r', c: '#F9A8D4', pm: 'skirt' },
    { id: 'armorlegs', slot: 'pants', n: 'สนับขาเหล็ก', r: 'e', c: '#94A3B8', pm: 'plate' },
    { id: 'goldpants', slot: 'pants', n: 'กางเกงทองคำ', r: 'l', c: '#EAB308', pm: 'plate' },
    // รองเท้า
    { id: 'snk_w', slot: 'shoes', n: 'ผ้าใบขาว', r: 'c', c: '#F8FAFC', st: 'sneaker' },
    { id: 'snk_r', slot: 'shoes', n: 'ผ้าใบแดง', r: 'c', c: '#EF4444', st: 'sneaker' },
    { id: 'boots', slot: 'shoes', n: 'บูทหนัง', r: 'r', c: '#78350F', st: 'boot' },
    { id: 'bootsb', slot: 'shoes', n: 'บูทดำ', r: 'r', c: '#111827', st: 'boot' },
    { id: 'neon', slot: 'shoes', n: 'รองเท้าเรืองแสง', r: 'e', c: '#A3E635', st: 'neon' },
    { id: 'rocket', slot: 'shoes', n: 'รองเท้าจรวด', r: 'l', c: '#EF4444', st: 'rocket' },
    { id: 'goldshoes', slot: 'shoes', n: 'รองเท้าทองคำ', r: 'l', c: '#FACC15', st: 'boot' },
    // อาวุธ (shot = สิ่งที่ยิงใส่บอส)
    { id: 'lolli', slot: 'hand', n: 'อมยิ้มยักษ์', r: 'c', w: 'lolli', c: '#EC4899', shot: '🍭' },
    { id: 'sw_wood', slot: 'hand', n: 'ดาบไม้', r: 'c', w: 'sword', c: '#B45309', shot: '⚔️' },
    { id: 'sw_iron', slot: 'hand', n: 'ดาบเหล็ก', r: 'c', w: 'sword', c: '#CBD5E1', shot: '⚔️' },
    { id: 'bow', slot: 'hand', n: 'ธนู', r: 'r', w: 'bow', c: '#92400E', shot: '🏹' },
    { id: 'hammer', slot: 'hand', n: 'ค้อนยักษ์', r: 'r', w: 'hammer', c: '#64748B', shot: '🔨' },
    { id: 'sw_ice', slot: 'hand', n: 'ดาบน้ำแข็ง', r: 'r', w: 'sword', c: '#7DD3FC', shot: '❄️' },
    { id: 'sw_dia', slot: 'hand', n: 'ดาบเพชร', r: 'e', w: 'sword', c: '#22D3EE', shot: '💎' },
    { id: 'sw_fire', slot: 'hand', n: 'ดาบเพลิง', r: 'e', w: 'sword', c: '#F97316', shot: '🔥' },
    { id: 'wand', slot: 'hand', n: 'ไม้กายสิทธิ์', r: 'e', w: 'wand', c: '#FDE047', shot: '✨' },
    { id: 'laser', slot: 'hand', n: 'ดาบเลเซอร์', r: 'l', w: 'laser', c: '#22D3EE', shot: '⚡' },
    { id: 'sw_rainbow', slot: 'hand', n: 'ดาบสายรุ้ง', r: 'l', w: 'sword', c: 'rainbow', shot: '🌈' },
    // หลัง
    { id: 'cape_r', slot: 'back', n: 'ผ้าคลุมแดง', r: 'c', b: 'cape', c: '#DC2626' },
    { id: 'cape_b', slot: 'back', n: 'ผ้าคลุมน้ำเงิน', r: 'c', b: 'cape', c: '#2563EB' },
    { id: 'bag', slot: 'back', n: 'กระเป๋าเป้', r: 'c', b: 'backpack', c: '#F59E0B' },
    { id: 'w_bfly', slot: 'back', n: 'ปีกผีเสื้อ', r: 'r', b: 'wings', ws: 'butterfly', c: '#F472B6' },
    { id: 'w_bat', slot: 'back', n: 'ปีกค้างคาว', r: 'r', b: 'wings', ws: 'bat', c: '#312E81' },
    { id: 'jet', slot: 'back', n: 'เป้จรวด', r: 'e', b: 'jetpack', c: '#9CA3AF' },
    { id: 'w_angel', slot: 'back', n: 'ปีกนางฟ้า', r: 'e', b: 'wings', ws: 'angel', c: '#FFFFFF' },
    { id: 'w_dragon', slot: 'back', n: 'ปีกมังกร', r: 'l', b: 'wings', ws: 'dragon', c: '#DC2626' },
    // สัตว์เลี้ยง
    { id: 'p_dog', slot: 'pet', retired: true, n: 'น้องหมา', r: 'c', pet: '🐶' },
    { id: 'p_cat', slot: 'pet', retired: true, n: 'น้องแมว', r: 'c', pet: '🐱' },
    { id: 'p_bun', slot: 'pet', retired: true, n: 'กระต่าย', r: 'c', pet: '🐰' },
    { id: 'p_chick', slot: 'pet', retired: true, n: 'ลูกเจี๊ยบ', r: 'c', pet: '🐥' },
    { id: 'p_turtle', slot: 'pet', retired: true, n: 'เต่าน้อย', r: 'r', pet: '🐢' },
    { id: 'p_panda', slot: 'pet', retired: true, n: 'แพนด้า', r: 'r', pet: '🐼' },
    { id: 'p_fox', slot: 'pet', retired: true, n: 'จิ้งจอก', r: 'r', pet: '🦊' },
    { id: 'p_peng', slot: 'pet', retired: true, n: 'เพนกวิน', r: 'e', pet: '🐧' },
    { id: 'p_uni', slot: 'pet', retired: true, n: 'ยูนิคอร์น', r: 'l', pet: '🦄' },
    { id: 'p_dragon', slot: 'pet', retired: true, n: 'มังกรน้อย', r: 'l', pet: '🐲' }
  ];
  // ---------- ของแต่งตัวสัตว์เลี้ยง (เฟส 2) — สุ่มได้จากกล่องรางวัลเหมือนของเด็ก ----------
  ITEMS.push(
    { id: 'pt_party', slot: 'phat', n: 'หมวกปาร์ตี้น้อง', r: 'c', ph: 'party', c: '#F472B6', since: 3 },
    { id: 'pt_cap', slot: 'phat', n: 'หมวกแก๊ปน้อง', r: 'c', ph: 'cap', c: '#2563EB', since: 3 },
    { id: 'pt_flower', slot: 'phat', n: 'มงกุฎดอกไม้', r: 'r', ph: 'flower', c: '#F9A8D4', since: 3 },
    { id: 'pt_crown', slot: 'phat', n: 'มงกุฎน้อย', r: 'e', ph: 'crown', c: '#FACC15', since: 3 },
    { id: 'pt_halo', slot: 'phat', n: 'วงแหวนเทวดาน้อย', r: 'l', ph: 'halo', c: '#FDE047', since: 3 },
    { id: 'pn_bow', slot: 'pneck', n: 'โบว์แดง', r: 'c', pn: 'bow', c: '#EF4444', since: 3 },
    { id: 'pn_bell', slot: 'pneck', n: 'ปลอกคอกระดิ่ง', r: 'c', pn: 'bell', c: '#2563EB', since: 3 },
    { id: 'pn_scarf', slot: 'pneck', n: 'ผ้าพันคอ', r: 'r', pn: 'scarf', c: '#22C55E', since: 3 },
    { id: 'pn_medal', slot: 'pneck', n: 'เหรียญทอง', r: 'e', pn: 'medal', c: '#FACC15', since: 3 },
    { id: 'pb_cape', slot: 'pback', n: 'ผ้าคลุมน้อง', r: 'c', b: 'cape', c: '#7C3AED', since: 3 },
    { id: 'pb_bfly', slot: 'pback', n: 'ปีกผีเสื้อน้อง', r: 'r', b: 'wings', ws: 'butterfly', c: '#93C5FD', since: 3 },
    { id: 'pb_angel', slot: 'pback', n: 'ปีกนางฟ้าน้อง', r: 'e', b: 'wings', ws: 'angel', c: '#FFFFFF', since: 3 },
    { id: 'pb_dragon', slot: 'pback', n: 'ปีกมังกรน้อง', r: 'l', b: 'wings', ws: 'dragon', c: '#7C3AED', since: 3 },
    { id: 'pg_round', slot: 'pglass', n: 'แว่นกลมน้อง', r: 'c', pg: 'round', since: 3 },
    { id: 'pg_shades', slot: 'pglass', n: 'แว่นดำน้อง', r: 'r', pg: 'shades', since: 3 },
    { id: 'pg_heart', slot: 'pglass', n: 'แว่นหัวใจ', r: 'e', pg: 'heart', since: 3 }
  );
  var PET_SLOTS = [{ k: 'phat', n: 'หมวก', e: '🎩' }, { k: 'pneck', n: 'คอ', e: '🎀' }, { k: 'pback', n: 'หลัง', e: '🦋' }, { k: 'pglass', n: 'แว่น', e: '🕶️' }];
  var IT = {}; ITEMS.forEach(function (i) { IT[i.id] = i; });

  // ---------- สัตว์เลี้ยงบล็อก (เฟส 2) — 10 ชนิด · ขั้น 0 ไข่ · 1 ทารก · 2 เด็ก · 3 วัยรุ่น · 4 โตเต็มวัย · 5 ตำนาน ----------
  var PETS = {
    dog: { n: 'หมา', c: '#C08552', b: '#F3D9B1', ear: 'flop', ec: '#8B5A2B', face: 'snout', tail: 'short' },
    cat: { n: 'แมว', c: '#F4A261', b: '#FDE2C4', ear: 'point', ec: '#E76F51', face: 'cat', tail: 'long' },
    bunny: { n: 'กระต่าย', c: '#F1F5F9', b: '#FFFFFF', ear: 'long', ec: '#F9A8D4', face: 'cat', tail: 'puff' },
    panda: { n: 'แพนด้า', c: '#FFFFFF', b: '#FFFFFF', ear: 'round', ec: '#1F2937', face: 'panda', tail: 'none', feet: '#1F2937' },
    dragon: { n: 'มังกร', c: '#4ADE80', b: '#FEF08A', ear: 'horn', ec: '#FACC15', face: 'snout', tail: 'dragon', wing: '#16A34A' },
    unicorn: { n: 'ยูนิคอร์น', c: '#FFFFFF', b: '#FCE7F3', ear: 'point', ec: '#F9A8D4', face: 'snout', tail: 'rainbow', horn: '#FACC15', mane: true },
    fox: { n: 'จิ้งจอก', c: '#F97316', b: '#FFF7ED', ear: 'point', ec: '#7C2D12', face: 'snout', tail: 'fox' },
    penguin: { n: 'เพนกวิน', c: '#1F2937', b: '#FFFFFF', ear: 'none', face: 'beak', tail: 'none', feet: '#F59E0B' },
    chick: { n: 'ลูกเจี๊ยบ', c: '#FDE047', b: '#FEF9C3', ear: 'tuft', ec: '#EAB308', face: 'beak', tail: 'none', feet: '#F59E0B' },
    turtle: { n: 'เต่า', c: '#A3E635', b: '#ECFCCB', ear: 'none', face: 'smile', tail: 'none', shell: '#3F6212' }
  };
  var PET_STARTERS = ['dog', 'cat', 'bunny', 'panda', 'dragon', 'unicorn'];
  var PET_H = [1.7, 1.5, 1.9, 2.3, 2.7, 3.0];   // ความสูงสัตว์ข้างตัวเด็ก (หน่วย u ของเด็ก) ตามขั้น
  function drawPet(c, P, x, foot, h, o) {
    o = o || {}; var sp = PETS[P.sp] || PETS.dog, st = P.stage || 0, L = P.look || {};
    c.save(); c.lineJoin = 'round'; c.lineCap = 'round';
    if (o.run != null) foot -= Math.abs(Math.sin(o.run * 1.3)) * h * 0.1;
    if (st === 0) {   // 🥚 ไข่
      var ew = h * 0.62, eh = h * 0.8, ey = foot - eh / 2;
      c.fillStyle = P.mystery ? '#FDF4FF' : '#FFFBEB'; c.beginPath(); c.ellipse(x, ey, ew / 2, eh / 2, 0, 0, 7); c.fill();
      c.lineWidth = Math.max(1, h * 0.03); c.strokeStyle = 'rgba(0,0,0,.25)'; c.stroke();
      var spot = P.mystery ? '#C084FC' : (sp.c === '#FFFFFF' || sp.c === '#F1F5F9') ? '#F9A8D4' : sp.c;
      c.fillStyle = spot;
      [[-0.2, -0.15, 0.1], [0.18, 0.05, 0.085], [-0.05, 0.25, 0.075], [0.12, -0.3, 0.06]].forEach(function (q) { c.beginPath(); c.arc(x + q[0] * ew * 1.2, ey + q[1] * eh, q[2] * h, 0, 7); c.fill(); });
      if (P.mystery) { c.fillStyle = '#7C3AED'; c.font = 'bold ' + h * 0.3 + 'px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', x, ey); }
      if (P.crack) { c.strokeStyle = '#78350F'; c.lineWidth = Math.max(1, h * 0.025); c.beginPath(); c.moveTo(x - ew * 0.32, ey - eh * 0.04); c.lineTo(x - ew * 0.12, ey + eh * 0.06); c.lineTo(x + ew * 0.05, ey - eh * 0.08); c.lineTo(x + ew * 0.28, ey + eh * 0.05); c.stroke(); }
      c.restore(); return;
    }
    var hr = [0, 0.62, 0.56, 0.53, 0.5, 0.5][st];
    var hs = h * hr, bh = h - hs * 0.85, bw = hs * 0.82, by = foot - bh, hy = by - hs * 0.85, hx = x - hs / 2;
    var line = (sp.c === '#FFFFFF' || sp.c === '#F1F5F9') ? 'rgba(0,0,0,.18)' : null;
    if (st >= 5) {   // ✨ ร่างตำนาน: รัศมีทอง
      var gr = c.createRadialGradient(x, foot - h * 0.5, h * 0.1, x, foot - h * 0.5, h * 0.75);
      gr.addColorStop(0, 'rgba(253,224,71,.55)'); gr.addColorStop(1, 'rgba(253,224,71,0)');
      c.fillStyle = gr; c.beginPath(); c.arc(x, foot - h * 0.5, h * 0.75, 0, 7); c.fill();
    }
    var bk = IT[L.pback];
    if (bk) backItem(c, bk, x, by - hs * 0.15, bw / 2.1, false, o.run != null);
    else if (st >= 5 || (sp.wing && st >= 3)) backItem(c, { b: 'wings', ws: st >= 5 ? 'angel' : 'dragon', c: st >= 5 ? '#FDE68A' : sp.wing }, x, by - hs * 0.15, bw / 2.4, false, false);
    petTail(c, sp, x + bw * 0.42, by + bh * 0.45, hs);
    if (sp.shell) rr(c, x - bw * 0.78, by - hs * 0.05, bw * 1.56, bh * 0.92, bw * 0.45, sp.shell);
    var fc = sp.feet || shade(sp.c, 0.82);
    rr(c, x - bw * 0.44, foot - hs * 0.2, bw * 0.36, hs * 0.2, hs * 0.07, fc); rr(c, x + bw * 0.08, foot - hs * 0.2, bw * 0.36, hs * 0.2, hs * 0.07, fc);
    rr(c, x - bw / 2, by, bw, bh - hs * 0.12, bw * 0.32, sp.c);
    if (line) { c.strokeStyle = line; c.lineWidth = Math.max(1, hs * 0.03); c.stroke(); }
    rr(c, x - bw * 0.3, by + bh * 0.12, bw * 0.6, bh * 0.58, bw * 0.25, sp.b);
    petEars(c, sp, hx, hy, hs);
    if (sp.mane) { ['#F472B6', '#FACC15', '#60A5FA', '#A78BFA'].forEach(function (mc, i) { rr(c, hx - hs * 0.08 + i * hs * 0.1, hy - hs * 0.1 + i * hs * 0.05, hs * 0.22, hs * 0.5, hs * 0.1, mc); }); }
    rr(c, hx, hy, hs, hs, hs * 0.3, sp.c);
    if (line) { c.strokeStyle = line; c.lineWidth = Math.max(1, hs * 0.03); c.stroke(); }
    if (sp.ear === 'horn') { c.fillStyle = sp.ec; [-1, 1].forEach(function (sd) { c.beginPath(); c.moveTo(x + sd * hs * 0.32, hy + hs * 0.05); c.lineTo(x + sd * hs * 0.38, hy - hs * 0.28); c.lineTo(x + sd * hs * 0.18, hy + hs * 0.05); c.fill(); }); }
    if (sp.horn) { c.fillStyle = sp.horn; c.beginPath(); c.moveTo(x - hs * 0.09, hy + hs * 0.04); c.lineTo(x, hy - hs * 0.42); c.lineTo(x + hs * 0.09, hy + hs * 0.04); c.fill(); }
    petFace(c, sp, x, hy, hs);
    var pg = IT[L.pglass]; if (pg) petGlasses(c, pg, x, hy, hs);
    var pn = IT[L.pneck]; if (pn) petNeck(c, pn, x, by, bw, hs);
    var ph = IT[L.phat]; if (ph) petHat(c, ph, x, hx, hy, hs);
    c.restore();
  }
  function petEars(c, sp, hx, hy, hs) {
    var e = sp.ear, ec = sp.ec;
    if (e === 'flop') { rr(c, hx - hs * 0.14, hy + hs * 0.06, hs * 0.3, hs * 0.6, hs * 0.14, ec); rr(c, hx + hs * 0.84, hy + hs * 0.06, hs * 0.3, hs * 0.6, hs * 0.14, ec); }
    else if (e === 'point') { [[hx + hs * 0.05, 1], [hx + hs * 0.65, 1]].forEach(function (q) { c.fillStyle = sp.c; c.beginPath(); c.moveTo(q[0], hy + hs * 0.2); c.lineTo(q[0] + hs * 0.15, hy - hs * 0.3); c.lineTo(q[0] + hs * 0.3, hy + hs * 0.2); c.fill(); c.fillStyle = ec; c.beginPath(); c.moveTo(q[0] + hs * 0.08, hy + hs * 0.12); c.lineTo(q[0] + hs * 0.15, hy - hs * 0.14); c.lineTo(q[0] + hs * 0.22, hy + hs * 0.12); c.fill(); }); }
    else if (e === 'long') { [hx + hs * 0.12, hx + hs * 0.64].forEach(function (ex) { rr(c, ex, hy - hs * 0.75, hs * 0.24, hs * 0.95, hs * 0.12, sp.c); rr(c, ex + hs * 0.06, hy - hs * 0.65, hs * 0.12, hs * 0.75, hs * 0.06, ec); }); }
    else if (e === 'round') { c.fillStyle = ec; [hx + hs * 0.12, hx + hs * 0.88].forEach(function (ex) { c.beginPath(); c.arc(ex, hy + hs * 0.08, hs * 0.17, 0, 7); c.fill(); }); }
    else if (e === 'tuft') { c.fillStyle = ec; [-0.08, 0.04].forEach(function (d) { c.beginPath(); c.moveTo(hx + hs * (0.45 + d), hy + hs * 0.05); c.lineTo(hx + hs * (0.5 + d), hy - hs * 0.22); c.lineTo(hx + hs * (0.57 + d), hy + hs * 0.05); c.fill(); }); }
  }
  function petFace(c, sp, x, hy, hs) {
    var ey = hy + hs * 0.46, ex = hs * 0.2;
    if (sp.face === 'panda') { c.fillStyle = '#1F2937'; [-1, 1].forEach(function (sd) { c.beginPath(); c.ellipse(x + sd * ex, ey + hs * 0.02, hs * 0.13, hs * 0.16, sd * 0.4, 0, 7); c.fill(); }); }
    [-1, 1].forEach(function (sd) {
      c.fillStyle = sp.face === 'panda' ? '#FFFFFF' : '#111827'; c.beginPath(); c.ellipse(x + sd * ex, ey, hs * 0.065, hs * 0.09, 0, 0, 7); c.fill();
      c.fillStyle = sp.face === 'panda' ? '#111827' : '#FFFFFF'; c.beginPath(); c.arc(x + sd * ex + hs * 0.02, ey - hs * 0.03, hs * 0.025, 0, 7); c.fill();
      c.fillStyle = 'rgba(244,114,182,.45)'; c.beginPath(); c.arc(x + sd * hs * 0.33, ey + hs * 0.16, hs * 0.07, 0, 7); c.fill();
    });
    var my = hy + hs * 0.7;
    if (sp.face === 'beak') { c.fillStyle = '#F59E0B'; c.beginPath(); c.moveTo(x - hs * 0.11, my - hs * 0.05); c.lineTo(x + hs * 0.11, my - hs * 0.05); c.lineTo(x, my + hs * 0.1); c.fill(); return; }
    if (sp.face === 'snout') { c.fillStyle = sp.b; c.beginPath(); c.ellipse(x, my, hs * 0.18, hs * 0.12, 0, 0, 7); c.fill(); }
    c.fillStyle = sp.face === 'cat' ? '#F472B6' : '#111827'; c.beginPath(); c.ellipse(x, my - hs * 0.04, hs * 0.05, hs * 0.035, 0, 0, 7); c.fill();
    c.strokeStyle = '#111827'; c.lineWidth = Math.max(1, hs * 0.03);
    c.beginPath(); c.arc(x - hs * 0.05, my + hs * 0.01, hs * 0.05, 0.2, Math.PI - 0.2); c.stroke();
    c.beginPath(); c.arc(x + hs * 0.05, my + hs * 0.01, hs * 0.05, 0.2, Math.PI - 0.2); c.stroke();
    if (sp.face === 'cat') { c.lineWidth = Math.max(1, hs * 0.015); [-1, 1].forEach(function (sd) { for (var i = 0; i < 2; i++) { c.beginPath(); c.moveTo(x + sd * hs * 0.14, my - hs * 0.01 + i * hs * 0.05); c.lineTo(x + sd * hs * 0.4, my - hs * 0.04 + i * hs * 0.08); c.stroke(); } }); }
  }
  function petTail(c, sp, tx, ty, hs) {
    var t = sp.tail; c.lineWidth = hs * 0.14;
    if (t === 'short') rr(c, tx, ty - hs * 0.2, hs * 0.14, hs * 0.26, hs * 0.07, sp.c);
    else if (t === 'long') { c.strokeStyle = sp.c; c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + hs * 0.45, ty - hs * 0.05, tx + hs * 0.35, ty - hs * 0.5); c.stroke(); }
    else if (t === 'puff') { c.fillStyle = '#FFFFFF'; c.beginPath(); c.arc(tx + hs * 0.08, ty, hs * 0.13, 0, 7); c.fill(); c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 1; c.stroke(); }
    else if (t === 'fox') { c.fillStyle = sp.c; c.beginPath(); c.ellipse(tx + hs * 0.25, ty - hs * 0.2, hs * 0.16, hs * 0.36, 0.6, 0, 7); c.fill(); c.fillStyle = '#FFFFFF'; c.beginPath(); c.ellipse(tx + hs * 0.42, ty - hs * 0.45, hs * 0.08, hs * 0.12, 0.6, 0, 7); c.fill(); }
    else if (t === 'dragon') { c.strokeStyle = sp.c; c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + hs * 0.4, ty + hs * 0.1, tx + hs * 0.5, ty - hs * 0.3); c.stroke(); c.fillStyle = sp.ec; c.beginPath(); c.moveTo(tx + hs * 0.42, ty - hs * 0.28); c.lineTo(tx + hs * 0.62, ty - hs * 0.42); c.lineTo(tx + hs * 0.55, ty - hs * 0.2); c.fill(); }
    else if (t === 'rainbow') { ['#F472B6', '#FACC15', '#60A5FA'].forEach(function (rc, i) { c.strokeStyle = rc; c.lineWidth = hs * 0.08; c.beginPath(); c.moveTo(tx, ty + i * hs * 0.06); c.quadraticCurveTo(tx + hs * 0.45, ty + i * hs * 0.06, tx + hs * 0.38, ty - hs * 0.4 + i * hs * 0.06); c.stroke(); }); }
  }
  function petGlasses(c, it, x, hy, hs) {
    var ey = hy + hs * 0.46, ex = hs * 0.2;
    if (it.pg === 'round') { c.strokeStyle = '#111827'; c.lineWidth = Math.max(1, hs * 0.035); [-1, 1].forEach(function (sd) { c.beginPath(); c.arc(x + sd * ex, ey, hs * 0.12, 0, 7); c.stroke(); }); c.beginPath(); c.moveTo(x - ex + hs * 0.12, ey); c.lineTo(x + ex - hs * 0.12, ey); c.stroke(); }
    else if (it.pg === 'shades') { rr(c, x - hs * 0.38, ey - hs * 0.1, hs * 0.76, hs * 0.2, hs * 0.06, '#111827'); }
    else if (it.pg === 'heart') { c.fillStyle = '#EC4899'; [-1, 1].forEach(function (sd) { var cx = x + sd * ex, cy = ey; c.beginPath(); c.moveTo(cx, cy + hs * 0.12); c.bezierCurveTo(cx - hs * 0.2, cy, cx - hs * 0.1, cy - hs * 0.14, cx, cy - hs * 0.04); c.bezierCurveTo(cx + hs * 0.1, cy - hs * 0.14, cx + hs * 0.2, cy, cx, cy + hs * 0.12); c.fill(); }); }
  }
  function petNeck(c, it, x, by, bw, hs) {
    var ny = by + hs * 0.04;
    if (it.pn === 'bow') { c.fillStyle = it.c; c.beginPath(); c.moveTo(x, ny); c.lineTo(x - hs * 0.22, ny - hs * 0.12); c.lineTo(x - hs * 0.22, ny + hs * 0.12); c.fill(); c.beginPath(); c.moveTo(x, ny); c.lineTo(x + hs * 0.22, ny - hs * 0.12); c.lineTo(x + hs * 0.22, ny + hs * 0.12); c.fill(); c.beginPath(); c.arc(x, ny, hs * 0.06, 0, 7); c.fill(); }
    else if (it.pn === 'bell') { rr(c, x - bw * 0.45, ny - hs * 0.04, bw * 0.9, hs * 0.09, hs * 0.04, it.c); c.fillStyle = '#FACC15'; c.beginPath(); c.arc(x, ny + hs * 0.09, hs * 0.07, 0, 7); c.fill(); }
    else if (it.pn === 'scarf') { rr(c, x - bw * 0.48, ny - hs * 0.05, bw * 0.96, hs * 0.13, hs * 0.06, it.c); rr(c, x + bw * 0.12, ny, hs * 0.12, hs * 0.32, hs * 0.05, shade(it.c, 0.85)); }
    else if (it.pn === 'medal') { c.strokeStyle = '#2563EB'; c.lineWidth = hs * 0.05; c.beginPath(); c.moveTo(x - bw * 0.3, ny - hs * 0.05); c.lineTo(x, ny + hs * 0.12); c.lineTo(x + bw * 0.3, ny - hs * 0.05); c.stroke(); c.fillStyle = it.c; c.beginPath(); c.arc(x, ny + hs * 0.17, hs * 0.09, 0, 7); c.fill(); star5(c, x, ny + hs * 0.17, hs * 0.05, '#FFFFFF'); }
  }
  function petHat(c, it, x, hx, hy, hs) {
    var u = hs / 1.25;
    if (it.ph === 'party' || it.ph === 'halo') return newHat(c, it.ph, it.c, hx, hy, hs, hs, u, x);
    if (it.ph === 'cap') { rr(c, hx, hy - hs * 0.08, hs, hs * 0.32, hs * 0.14, it.c); rr(c, hx + hs * 0.5, hy + hs * 0.16, hs * 0.6, hs * 0.1, hs * 0.05, shade(it.c, 0.8)); return; }
    if (it.ph === 'crown') { c.fillStyle = it.c; c.beginPath(); c.moveTo(hx + hs * 0.15, hy + hs * 0.05); c.lineTo(hx + hs * 0.15, hy - hs * 0.3); c.lineTo(hx + hs * 0.33, hy - hs * 0.1); c.lineTo(x, hy - hs * 0.38); c.lineTo(hx + hs * 0.67, hy - hs * 0.1); c.lineTo(hx + hs * 0.85, hy - hs * 0.3); c.lineTo(hx + hs * 0.85, hy + hs * 0.05); c.closePath(); c.fill(); return; }
    if (it.ph === 'flower') { ['#F472B6', '#FDE047', '#A78BFA', '#FB7185', '#60A5FA'].forEach(function (fc, i) { var fx = hx + hs * (0.1 + i * 0.2); c.fillStyle = fc; c.beginPath(); c.arc(fx, hy + hs * 0.02, hs * 0.1, 0, 7); c.fill(); c.fillStyle = '#FDE68A'; c.beginPath(); c.arc(fx, hy + hs * 0.02, hs * 0.035, 0, 7); c.fill(); }); }
  }
  function petImg(P, px) {
    var key = 'pet:' + JSON.stringify(P) + '@' + px;
    if (cache[key]) return cache[key];
    var cv = document.createElement('canvas'); cv.width = px; cv.height = px;
    drawPet(cv.getContext('2d'), P, px / 2, px * 0.96, px * 0.8, {});
    return (cache[key] = cv.toDataURL());
  }

  // รวมตัวละครพื้นฐาน + ของที่ใส่ → object ที่ draw() ใช้วาด
  function compose(look) {
    look = look || {};
    var b = BY[look.base] || SKINS[0], s = {};
    for (var k in b) s[k] = b[k];
    s.extra = (b.extra || []).slice();
    var it;
    if ((it = IT[look.shirt])) {
      s.torso = it.c; s.arms = it.sleeve ? (it.sc || it.c) : b.head;
      s.extra = s.extra.filter(function (e) { return ['logo', 'gstar', 'cross', 'torn', 'flag', 'belt'].indexOf(e) < 0; });
      if (it.mark) s.extra.push(it.mark);
      if (it.mark === 'logo') s.extra.push('belt');
    }
    if ((it = IT[look.pants])) { s.legs = it.c; s.pm = it.pm; s.extra = s.extra.filter(function (e) { return e !== 'skirt'; }); if (it.pm === 'skirt') { s.extra.push('skirt'); s.skirtC = it.c; } }
    if ((it = IT[look.hat])) { s.hat = it.hat; s.hatC = it.c; }
    if ((it = IT[look.face])) { s.facc = it.acc; }
    if ((it = IT[look.shoes])) { s.shoes = it; }
    if ((it = IT[look.hand])) { s.hand = it; }
    if ((it = IT[look.back])) { s.bk = it; s.extra = s.extra.filter(function (e) { return e !== 'cape'; }); if (it.b === 'backpack' || it.b === 'jetpack') s.extra.push('straps'); }
    if ((it = IT[look.pet])) { s.pet = it.pet; }
    return s;
  }

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

  function star5(c, x, y, r, col) {
    c.fillStyle = col; c.beginPath();
    for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr2 = i % 2 ? r * 0.45 : r; c.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2); }
    c.closePath(); c.fill();
  }
  function legMarks(c, s, lxL, lxR, legY, lb, rb, lw, u) {
    var pm = s.pm; if (!pm) return;
    if (pm === 'shorts') { c.fillStyle = s.head; c.fillRect(lxL, legY + u * 0.95, lw, lb - legY - u * 0.95); c.fillRect(lxR, legY + u * 0.95, lw, rb - legY - u * 0.95); }
    else if (pm === 'stripes') { c.fillStyle = '#fff'; c.fillRect(lxL + u * 0.06, legY, u * 0.13, lb - legY); c.fillRect(lxR + lw - u * 0.19, legY, u * 0.13, rb - legY); }
    else if (pm === 'camo') { c.fillStyle = 'rgba(0,0,0,.25)'; [[0.2, 0.3], [0.6, 0.9], [0.3, 1.4]].forEach(function (q) { c.beginPath(); c.ellipse(lxL + u * q[0] + u * 0.2, legY + u * q[1], u * 0.2, u * 0.13, 0.4, 0, 7); c.fill(); c.beginPath(); c.ellipse(lxR + u * (0.9 - q[0]), legY + u * (q[1] + 0.2), u * 0.2, u * 0.13, -0.4, 0, 7); c.fill(); }); }
    else if (pm === 'plate') { c.fillStyle = 'rgba(255,255,255,.45)'; c.fillRect(lxL, legY + u * 0.85, lw, u * 0.28); c.fillRect(lxR, legY + u * 0.85, lw, u * 0.28); }
  }
  function shoes(c, it, lxL, lxR, lb, rb, lw, u, running) {
    var h = it.st === 'boot' ? u * 0.7 : u * 0.42;
    if (it.st === 'neon') { c.shadowColor = it.c; c.shadowBlur = u * 0.6; }
    rr(c, lxL - u * 0.03, lb - h, lw + u * 0.06, h, u * 0.1, shade(it.c, 0.92));
    rr(c, lxR - u * 0.03, rb - h, lw + u * 0.06, h, u * 0.1, it.c);
    c.shadowBlur = 0;
    if (it.st === 'sneaker' || it.st === 'neon') { c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(lxL - u * 0.03, lb - u * 0.09, lw + u * 0.06, u * 0.09); c.fillRect(lxR - u * 0.03, rb - u * 0.09, lw + u * 0.06, u * 0.09); }
    if (it.st === 'rocket') {
      c.fillStyle = '#FDE047'; c.fillRect(lxL + u * 0.15, lb - h + u * 0.1, lw - u * 0.3, u * 0.1); c.fillRect(lxR + u * 0.15, rb - h + u * 0.1, lw - u * 0.3, u * 0.1);
      if (running) { [[lxL, lb], [lxR, rb]].forEach(function (q) { c.fillStyle = '#F97316'; c.beginPath(); c.moveTo(q[0] + u * 0.1, q[1]); c.lineTo(q[0] + lw / 2, q[1] + u * (0.5 + Math.random() * 0.3)); c.lineTo(q[0] + lw - u * 0.1, q[1]); c.fill(); }); }
    }
  }
  function torsoMarks(c, s, ex, x, ty, u) {
    function has(m) { return ex.indexOf(m) >= 0; }
    if (has('stripes')) { c.fillStyle = 'rgba(255,255,255,.55)'; for (var i = 0; i < 3; i++) c.fillRect(x - u, ty + u * (0.35 + i * 0.55), 2 * u, u * 0.2); }
    if (has('suit')) { c.fillStyle = '#fff'; c.beginPath(); c.moveTo(x - u * 0.45, ty); c.lineTo(x + u * 0.45, ty); c.lineTo(x, ty + u * 0.9); c.closePath(); c.fill(); }
    if (has('suit') || has('tie')) { c.fillStyle = '#DC2626'; c.beginPath(); c.moveTo(x - u * 0.12, ty + u * 0.05); c.lineTo(x + u * 0.12, ty + u * 0.05); c.lineTo(x + u * 0.18, ty + u * 0.85); c.lineTo(x, ty + u * 1.05); c.lineTo(x - u * 0.18, ty + u * 0.85); c.closePath(); c.fill(); }
    if (has('zip')) { c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x - u * 0.04, ty, u * 0.08, 2 * u); rr(c, x - u * 0.7, ty + u * 1.15, u * 1.4, u * 0.6, u * 0.12, 'rgba(0,0,0,.18)'); }
    if (has('num')) { c.fillStyle = '#fff'; c.font = 'bold ' + u * 0.95 + 'px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('10', x, ty + u * 1.0); }
    if (has('heart')) { c.fillStyle = '#fff'; c.beginPath(); c.moveTo(x, ty + u * 1.45); c.bezierCurveTo(x - u * 0.9, ty + u * 0.8, x - u * 0.45, ty + u * 0.2, x, ty + u * 0.65); c.bezierCurveTo(x + u * 0.45, ty + u * 0.2, x + u * 0.9, ty + u * 0.8, x, ty + u * 1.45); c.fill(); }
    if (has('star')) star5(c, x, ty + u * 0.95, u * 0.65, '#FDE047');
    if (has('flame')) { ['#F97316', '#FDE047'].forEach(function (col, j) { c.fillStyle = col; c.beginPath(); c.moveTo(x - u, ty + 2 * u); for (var k = 0; k <= 4; k++) { var fx = x - u + k * u / 2; c.lineTo(fx - u * 0.25, ty + 2 * u - u * (j ? 0.5 : 0.9)); c.lineTo(fx, ty + 2 * u - u * (j ? 0.15 : 0.3)); } c.lineTo(x + u, ty + 2 * u); c.closePath(); c.fill(); }); }
    if (has('armor')) { c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(x - u * 0.85, ty + u * 0.2, u * 1.7, u * 0.7); c.fillStyle = 'rgba(0,0,0,.25)'; [[-0.7, 0.3], [0.7, 0.3], [-0.7, 0.8], [0.7, 0.8]].forEach(function (q) { c.beginPath(); c.arc(x + q[0] * u, ty + q[1] * u, u * 0.07, 0, 7); c.fill(); }); }
    if (has('straps')) { c.fillStyle = 'rgba(0,0,0,.45)'; c.fillRect(x - u * 0.75, ty, u * 0.2, u * 1.6); c.fillRect(x + u * 0.55, ty, u * 0.2, u * 1.6); }
  }
  function backItem(c, it, x, ty, u, isBack, running) {
    var col = it.c;
    if (it.b === 'cape') { rr(c, x - u * 1.1, ty + u * (isBack ? 0.05 : 0.1), u * 2.2, u * (isBack ? 3.4 : 3.6), u * 0.2, col); return; }
    if (it.b === 'backpack') { if (isBack) { rr(c, x - u * 0.8, ty + u * 0.25, u * 1.6, u * 1.6, u * 0.25, col); rr(c, x - u * 0.55, ty + u * 1.05, u * 1.1, u * 0.6, u * 0.15, shade(col, 0.8)); } return; }
    if (it.b === 'jetpack') {
      if (isBack) {
        rr(c, x - u * 0.95, ty + u * 0.15, u * 0.8, u * 1.7, u * 0.35, col); rr(c, x + u * 0.15, ty + u * 0.15, u * 0.8, u * 1.7, u * 0.35, col);
        c.fillStyle = '#EF4444'; c.fillRect(x - u * 0.95, ty + u * 0.5, u * 1.9, u * 0.18);
      }
      if (running) { [x - u * 0.55, x + u * 0.55].forEach(function (fx) { c.fillStyle = '#F97316'; c.beginPath(); c.moveTo(fx - u * 0.3, ty + u * 1.85); c.lineTo(fx, ty + u * (2.6 + Math.random() * 0.5)); c.lineTo(fx + u * 0.3, ty + u * 1.85); c.fill(); }); }
      return;
    }
    if (it.b === 'wings') {
      var sy = ty + u * 0.4;
      [-1, 1].forEach(function (sd) {
        c.save(); c.translate(x + sd * u * 0.5, sy); c.scale(sd, 1);
        if (it.ws === 'angel') { c.fillStyle = col; for (var i = 0; i < 3; i++) { c.beginPath(); c.ellipse(u * (0.9 + i * 0.45), -u * (0.2 - i * 0.25), u * 0.85, u * 0.32, -0.5 + i * 0.25, 0, 7); c.fill(); } c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = u * 0.04; c.stroke(); }
        else if (it.ws === 'butterfly') { c.fillStyle = col; c.beginPath(); c.ellipse(u * 1.1, -u * 0.3, u * 0.95, u * 0.7, -0.4, 0, 7); c.fill(); c.fillStyle = '#A78BFA'; c.beginPath(); c.ellipse(u * 0.9, u * 0.7, u * 0.6, u * 0.45, 0.4, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(u * 1.2, -u * 0.35, u * 0.2, 0, 7); c.fill(); }
        else { c.fillStyle = col; c.beginPath(); c.moveTo(0, -u * 0.2); c.lineTo(u * 1.4, -u * 1.0); c.lineTo(u * 2.4, -u * 0.6); c.lineTo(u * 2.0, u * 0.1); c.lineTo(u * 1.7, -u * 0.1); c.lineTo(u * 1.4, u * 0.6); c.lineTo(u * 1.0, u * 0.3); c.lineTo(u * 0.6, u * 0.9); c.closePath(); c.fill(); if (it.ws === 'dragon') { c.fillStyle = '#FDE047'; c.beginPath(); c.moveTo(u * 1.4, -u * 1.0); c.lineTo(u * 1.55, -u * 1.35); c.lineTo(u * 1.65, -u * 0.95); c.fill(); } }
        c.restore();
      });
    }
  }
  function weapon(c, it, hx, hy, u, back) {
    c.save(); c.translate(hx, hy); c.rotate(back ? 0.45 : -0.45);
    var col = it.c;
    function blade(w, len, colr) { var g = colr === 'rainbow' ? fillOf(c, 'rainbow', -w / 2, -len, w, len) : colr; c.fillStyle = g; c.fillRect(-w / 2, -len, w, len); c.beginPath(); c.moveTo(-w / 2, -len); c.lineTo(0, -len - w * 0.9); c.lineTo(w / 2, -len); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(-w * 0.1, -len + u * 0.1, w * 0.2, len - u * 0.2); }
    if (it.w === 'sword') { c.fillStyle = '#5B3A1A'; c.fillRect(-u * 0.09, -u * 0.05, u * 0.18, u * 0.55); c.fillStyle = '#FACC15'; c.fillRect(-u * 0.38, -u * 0.12, u * 0.76, u * 0.14); blade(u * 0.28, u * 2.0, col); }
    else if (it.w === 'laser') { c.fillStyle = '#4B5563'; c.fillRect(-u * 0.1, -u * 0.1, u * 0.2, u * 0.6); c.shadowColor = col; c.shadowBlur = u * 0.8; blade(u * 0.22, u * 2.3, col); c.shadowBlur = 0; }
    else if (it.w === 'wand') { c.fillStyle = '#4C1D95'; c.fillRect(-u * 0.06, -u * 1.5, u * 0.12, u * 1.9); c.shadowColor = col; c.shadowBlur = u * 0.6; star5(c, 0, -u * 1.65, u * 0.45, col); c.shadowBlur = 0; }
    else if (it.w === 'bow') { c.strokeStyle = col; c.lineWidth = u * 0.16; c.beginPath(); c.arc(-u * 0.6, -u * 0.7, u * 1.2, -1.1, 1.1); c.stroke(); c.strokeStyle = '#E5E7EB'; c.lineWidth = u * 0.04; c.beginPath(); c.moveTo(-u * 0.6 + Math.cos(-1.1) * u * 1.2, -u * 0.7 + Math.sin(-1.1) * u * 1.2); c.lineTo(-u * 0.6 + Math.cos(1.1) * u * 1.2, -u * 0.7 + Math.sin(1.1) * u * 1.2); c.stroke(); }
    else if (it.w === 'hammer') { c.fillStyle = '#78350F'; c.fillRect(-u * 0.08, -u * 1.4, u * 0.16, u * 1.8); rr(c, -u * 0.55, -u * 1.85, u * 1.1, u * 0.6, u * 0.1, col); }
    else if (it.w === 'lolli') { c.fillStyle = '#F8FAFC'; c.fillRect(-u * 0.06, -u * 1.2, u * 0.12, u * 1.6); c.fillStyle = col; c.beginPath(); c.arc(0, -u * 1.55, u * 0.55, 0, 7); c.fill(); c.strokeStyle = '#fff'; c.lineWidth = u * 0.1; c.beginPath(); c.arc(0, -u * 1.55, u * 0.3, 0, 5); c.stroke(); }
    c.restore();
  }
  function faceAcc(c, acc, x, hy, hw, hh, u, hx) {
    var ey = hy + hh * 0.42, ex = hw * 0.2;
    if (acc === 'glasses') { c.strokeStyle = '#111'; c.lineWidth = u * 0.07; [-1, 1].forEach(function (sd) { c.beginPath(); c.arc(x + sd * ex, ey, u * 0.2, 0, 7); c.stroke(); }); c.beginPath(); c.moveTo(x - ex + u * 0.2, ey); c.lineTo(x + ex - u * 0.2, ey); c.stroke(); }
    else if (acc === 'shades') { rr(c, hx + u * 0.08, hy + hh * 0.3, hw - u * 0.16, u * 0.28, u * 0.08, '#111'); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(hx + u * 0.2, hy + hh * 0.33, u * 0.18, u * 0.06); }
    else if (acc === 'patch') { c.fillStyle = '#111'; c.fillRect(hx + hw * 0.58, hy + hh * 0.3, u * 0.3, u * 0.26); c.fillRect(hx, hy + hh * 0.28, hw, u * 0.05); }
    else if (acc === 'band') { c.fillStyle = '#DC2626'; c.fillRect(hx - u * 0.05, hy + u * 0.08, hw + u * 0.1, u * 0.16); c.fillRect(hx + hw, hy + u * 0.1, u * 0.3, u * 0.1); }
    else if (acc === 'mustache') { c.fillStyle = '#3B2A1A'; c.beginPath(); c.ellipse(x - u * 0.17, hy + hh * 0.66, u * 0.2, u * 0.08, 0.3, 0, 7); c.ellipse(x + u * 0.17, hy + hh * 0.66, u * 0.2, u * 0.08, -0.3, 0, 7); c.fill(); }
    else if (acc === 'visor') { c.shadowColor = '#22D3EE'; c.shadowBlur = u * 0.4; rr(c, hx - u * 0.04, hy + hh * 0.3, hw + u * 0.08, u * 0.3, u * 0.12, 'rgba(34,211,238,.85)'); c.shadowBlur = 0; }
  }
  function newHat(c, hat, col, hx, hy, hw, hh, u, x) {
    if (hat === 'beanie') { rr(c, hx - u * 0.05, hy - u * 0.28, hw + u * 0.1, u * 0.7, u * 0.32, col); c.fillStyle = '#fff'; c.beginPath(); c.arc(x, hy - u * 0.32, u * 0.16, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(hx - u * 0.05, hy + u * 0.22, hw + u * 0.1, u * 0.14); }
    else if (hat === 'party') { c.fillStyle = col; c.beginPath(); c.moveTo(hx + u * 0.15, hy + u * 0.05); c.lineTo(x, hy - u * 1.0); c.lineTo(hx + hw - u * 0.15, hy + u * 0.05); c.closePath(); c.fill(); c.fillStyle = '#FDE047'; [[-0.2, -0.2], [0.15, -0.5], [0.05, -0.1]].forEach(function (q) { c.beginPath(); c.arc(x + q[0] * u, hy + q[1] * u, u * 0.07, 0, 7); c.fill(); }); c.beginPath(); c.arc(x, hy - u * 1.0, u * 0.13, 0, 7); c.fill(); }
    else if (hat === 'cowboy') { c.fillStyle = col; c.beginPath(); c.ellipse(x, hy + u * 0.05, hw * 0.95, u * 0.2, 0, 0, 7); c.fill(); rr(c, hx + u * 0.12, hy - u * 0.55, hw - u * 0.24, u * 0.62, u * 0.2, shade(col, 1.1)); c.fillStyle = '#3B2A1A'; c.fillRect(hx + u * 0.12, hy - u * 0.12, hw - u * 0.24, u * 0.12); }
    else if (hat === 'chef') { c.fillStyle = '#fff'; [[-0.35, -0.55], [0, -0.75], [0.35, -0.55]].forEach(function (q) { c.beginPath(); c.arc(x + q[0] * u, hy + q[1] * u, u * 0.38, 0, 7); c.fill(); }); rr(c, hx + u * 0.08, hy - u * 0.45, hw - u * 0.16, u * 0.5, u * 0.05, '#fff'); c.strokeStyle = '#E5E7EB'; c.lineWidth = u * 0.04; c.strokeRect(hx + u * 0.08, hy - u * 0.1, hw - u * 0.16, u * 0.15); }
    else if (hat === 'tophat') { rr(c, hx - u * 0.18, hy - u * 0.06, hw + u * 0.36, u * 0.17, u * 0.06, col); rr(c, hx + u * 0.12, hy - u * 0.95, hw - u * 0.24, u * 0.92, u * 0.06, col); c.fillStyle = '#DC2626'; c.fillRect(hx + u * 0.12, hy - u * 0.3, hw - u * 0.24, u * 0.14); }
    else if (hat === 'headphones') { c.strokeStyle = '#111'; c.lineWidth = u * 0.14; c.beginPath(); c.arc(x, hy + u * 0.35, hw * 0.62, Math.PI * 1.05, Math.PI * 1.95); c.stroke(); rr(c, hx - u * 0.22, hy + u * 0.3, u * 0.32, u * 0.55, u * 0.12, col); rr(c, hx + hw - u * 0.1, hy + u * 0.3, u * 0.32, u * 0.55, u * 0.12, col); }
    else if (hat === 'wizard') { c.fillStyle = col; c.beginPath(); c.ellipse(x, hy + u * 0.02, hw * 0.85, u * 0.17, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(hx + u * 0.05, hy); c.lineTo(x + u * 0.35, hy - u * 1.5); c.lineTo(hx + hw - u * 0.05, hy); c.closePath(); c.fill(); star5(c, x, hy - u * 0.45, u * 0.2, '#FDE047'); star5(c, x + u * 0.22, hy - u * 0.95, u * 0.12, '#FDE047'); }
    else if (hat === 'viking') { c.fillStyle = '#F8FAFC'; [-1, 1].forEach(function (sd) { c.beginPath(); c.moveTo(x + sd * hw * 0.45, hy + u * 0.05); c.quadraticCurveTo(x + sd * hw * 0.95, hy - u * 0.2, x + sd * hw * 0.85, hy - u * 0.75); c.lineTo(x + sd * hw * 0.55, hy - u * 0.15); c.closePath(); c.fill(); }); c.fillStyle = col; c.beginPath(); c.ellipse(x, hy + u * 0.1, hw * 0.55, u * 0.45, 0, Math.PI, 0); c.fill(); c.fillStyle = '#FACC15'; c.fillRect(hx, hy + u * 0.02, hw, u * 0.14); }
    else if (hat === 'halo') { c.strokeStyle = col; c.lineWidth = u * 0.13; c.shadowColor = col; c.shadowBlur = u * 0.7; c.beginPath(); c.ellipse(x, hy - u * 0.35, hw * 0.45, u * 0.13, 0, 0, 7); c.stroke(); c.shadowBlur = 0; }
  }
  var NEW_HATS = ['beanie', 'party', 'cowboy', 'chef', 'tophat', 'headphones', 'wizard', 'viking', 'halo'];

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
    var ex = s.extra || [], running = o.run != null;
    if (s.bk && !back) backItem(c, s.bk, x, torsoY, u, false, running);   // ปีก/ผ้าคลุมอยู่หลังตัว
    // ผ้าคลุม (ด้านหน้า = วาดก่อนให้อยู่ข้างหลังตัว)
    if (ex.indexOf('cape') >= 0 && !back) rr(c, x - u * 1.1, torsoY + u * 0.1, u * 2.2, u * 3.6, u * 0.2, s.capeC || '#DC2626');
    // ขา (ก้าวสลับ: ขาที่ยกจะสั้นลง)
    var liftL = Math.max(0, swing) * 0.45 * u, liftR = Math.max(0, -swing) * 0.45 * u;
    rr(c, x - lw - u * 0.02, legY, lw, 2 * u - liftL, u * 0.12, shade(s.legs, 0.92));
    rr(c, x + u * 0.02, legY, lw, 2 * u - liftR, u * 0.12, s.legs);
    var lxL = x - lw - u * 0.02, lxR = x + u * 0.02, lbL = legY + 2 * u - liftL, lbR = legY + 2 * u - liftR;
    legMarks(c, s, lxL, lxR, legY, lbL, lbR, lw, u);
    if (s.shoes) shoes(c, s.shoes, lxL, lxR, lbL, lbR, lw, u, running);
    if (ex.indexOf('skirt') >= 0) { c.fillStyle = s.skirtC || shade(s.torso, 0.9); c.beginPath(); c.moveTo(x - u, legY - u * 0.05); c.lineTo(x + u, legY - u * 0.05); c.lineTo(x + u * 1.35, legY + u * 1.2); c.lineTo(x - u * 1.35, legY + u * 1.2); c.closePath(); c.fill(); }
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
      torsoMarks(c, s, ex, x, torsoY, u);
    }
    if (s.bk && back) backItem(c, s.bk, x, torsoY, u, true, running);
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
    if (NEW_HATS.indexOf(hat) >= 0) newHat(c, hat, hcol, hx, headY, headW, headH, u, x);
    if (!back && s.facc) faceAcc(c, s.facc, x, headY, headW, headH, u, hx);
    if (s.hand) weapon(c, s.hand, back ? x - 2 * u + lw / 2 : x + 2 * u - lw / 2, torsoY + 2 * u + (back ? armL : armR) - u * 0.1, u, back);
    if (s.petObj && !o.noPet) { var pst = s.petObj.stage || 0, phh = u * PET_H[pst]; drawPet(c, s.petObj, x + 2.3 * u + phh * 0.35, footY, phh, { run: o.run }); }
    else if (s.pet && !o.noPet) { c.font = (u * 1.4) + 'px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillStyle = '#000'; c.fillText(s.pet, x + 2.9 * u, footY - Math.abs(Math.sin((o.run || 0) * 1.3)) * u * 0.35); }
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
  function img(id, px, opts) {
    var key = (typeof id === 'string' ? id : JSON.stringify(id)) + '@' + px + (opts && opts.back ? 'b' : '');
    if (cache[key]) return cache[key];
    var cv = document.createElement('canvas'); cv.width = px; cv.height = px;
    var c = cv.getContext('2d'), obj = typeof id === 'string' ? (BY[id] || SKINS[0]) : id;
    var wide = obj.pet || obj.petObj || (obj.bk && obj.bk.b === 'wings');
    draw(c, obj, (obj.pet || obj.petObj) ? px * 0.4 : px / 2, px * 0.97, px * (wide ? 0.74 : 0.84), { back: opts && opts.back });
    return (cache[key] = cv.toDataURL());
  }

  window.Blocky = { PETS: PETS, PET_STARTERS: PET_STARTERS, PET_SLOTS: PET_SLOTS, drawPet: drawPet, petImg: petImg, SKINS: SKINS, BOSSES: BOSSES, BY: BY, draw: draw, img: img, ITEMS: ITEMS, IT: IT, SLOTS: SLOTS, RARITY: RARITY, compose: compose };
})();
