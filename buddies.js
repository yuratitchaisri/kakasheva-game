// ตัวการ์ตูนเพื่อนคู่ใจ (Buddy) + สติกเกอร์สะสม — วาดด้วย inline SVG/emoji (ไม่พึ่งรูปภายนอก)
// ตั้งค่าไว้ที่ window.BUDDIES และ window.STICKERS

(function () {
  // สร้างหน้าตัวการ์ตูนสัตว์ — parts ต่างกันตามชนิด, stage 1..3 (โตขึ้น + มงกุฎ)
  // stage 1 = เด็กเล็ก, stage 2 = แก้มชมพู, stage 3 = ใส่มงกุฎ
  function face(opts, stage) {
    const crown = stage >= 3
      ? '<path d="M32 22 L40 34 L50 20 L60 34 L68 22 L64 40 L36 40 Z" fill="#FFD54A" stroke="#E6A700" stroke-width="2" stroke-linejoin="round"/>' +
        '<circle cx="40" cy="24" r="2.4" fill="#FF5A9E"/><circle cx="50" cy="20" r="2.4" fill="#5AC8FF"/><circle cx="60" cy="24" r="2.4" fill="#7BE38A"/>'
      : '';
    const cheeks = stage >= 2
      ? '<circle cx="30" cy="64" r="7" fill="#FF9EC4" opacity="0.7"/><circle cx="70" cy="64" r="7" fill="#FF9EC4" opacity="0.7"/>'
      : '';
    return (
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="buddy-svg">' +
      (opts.ears || '') +
      '<circle cx="50" cy="58" r="34" fill="' + opts.color + '" stroke="' + opts.stroke + '" stroke-width="3"/>' +
      (opts.snout || '') +
      cheeks +
      // ตา
      '<circle cx="38" cy="52" r="7" fill="#fff"/><circle cx="62" cy="52" r="7" fill="#fff"/>' +
      '<circle cx="39" cy="53" r="4" fill="#2b2b2b"/><circle cx="63" cy="53" r="4" fill="#2b2b2b"/>' +
      '<circle cx="40.5" cy="51.5" r="1.4" fill="#fff"/><circle cx="64.5" cy="51.5" r="1.4" fill="#fff"/>' +
      // ปากยิ้ม
      '<path d="M42 68 Q50 76 58 68" fill="none" stroke="#2b2b2b" stroke-width="2.5" stroke-linecap="round"/>' +
      (opts.nose || '') +
      crown +
      '</svg>'
    );
  }

  const DEFS = {
    fox: {
      name: "จิ้งจอกน้อย", emoji: "🦊",
      color: "#FF8A3D", stroke: "#E06A1F",
      ears: '<path d="M22 40 L18 14 L40 30 Z" fill="#FF8A3D" stroke="#E06A1F" stroke-width="3" stroke-linejoin="round"/>' +
            '<path d="M78 40 L82 14 L60 30 Z" fill="#FF8A3D" stroke="#E06A1F" stroke-width="3" stroke-linejoin="round"/>',
      snout: '<ellipse cx="50" cy="70" rx="18" ry="14" fill="#FFF3E6"/>',
      nose: '<circle cx="50" cy="64" r="3.2" fill="#3a2a1a"/>'
    },
    cat: {
      name: "แมวเหมียว", emoji: "🐱",
      color: "#B0B7C3", stroke: "#8891A0",
      ears: '<path d="M24 40 L20 16 L42 32 Z" fill="#B0B7C3" stroke="#8891A0" stroke-width="3" stroke-linejoin="round"/>' +
            '<path d="M76 40 L80 16 L58 32 Z" fill="#B0B7C3" stroke="#8891A0" stroke-width="3" stroke-linejoin="round"/>',
      snout: '',
      nose: '<path d="M47 62 L53 62 L50 66 Z" fill="#FF7EA8"/>' +
            '<path d="M50 66 L50 70" stroke="#7a828f" stroke-width="1.6"/>' +
            '<path d="M20 62 L36 60 M20 68 L36 66" stroke="#7a828f" stroke-width="1.4" stroke-linecap="round"/>' +
            '<path d="M80 62 L64 60 M80 68 L64 66" stroke="#7a828f" stroke-width="1.4" stroke-linecap="round"/>'
    },
    dino: {
      name: "ไดโนน้อย", emoji: "🦖",
      color: "#5FD16A", stroke: "#37A845",
      ears: '<path d="M40 26 L46 16 L50 26 L54 16 L60 26 Z" fill="#37A845" stroke="#2b8a38" stroke-width="2" stroke-linejoin="round"/>',
      snout: '',
      nose: '<circle cx="44" cy="63" r="1.8" fill="#2b6b33"/><circle cx="56" cy="63" r="1.8" fill="#2b6b33"/>'
    },
    bunny: {
      name: "กระต่ายขาว", emoji: "🐰",
      color: "#FFFFFF", stroke: "#E4C6D2",
      ears: '<ellipse cx="38" cy="20" rx="8" ry="22" fill="#FFFFFF" stroke="#E4C6D2" stroke-width="3"/>' +
            '<ellipse cx="38" cy="20" rx="3.5" ry="15" fill="#FFC2DA"/>' +
            '<ellipse cx="62" cy="20" rx="8" ry="22" fill="#FFFFFF" stroke="#E4C6D2" stroke-width="3"/>' +
            '<ellipse cx="62" cy="20" rx="3.5" ry="15" fill="#FFC2DA"/>',
      snout: '',
      nose: '<path d="M47 62 L53 62 L50 66 Z" fill="#FF7EA8"/>'
    }
  };

  const BUDDIES = {};
  Object.keys(DEFS).forEach(function (key) {
    const d = DEFS[key];
    BUDDIES[key] = {
      key: key,
      name: d.name,
      emoji: d.emoji,
      color: d.color,
      svg: function (stage) { return face(d, stage || 1); }
    };
  });

  // สติกเกอร์สะสม — emoji + ระดับความหายาก (common/rare/gold)
  // xpTip = เกร็ดความรู้เล็กๆ โชว์ตอนได้สติกเกอร์
  const STICKERS = [
    { id: "s01", emoji: "🌳", name: "ต้นไม้ใหญ่", rarity: "common" },
    { id: "s02", emoji: "🐶", name: "น้องหมา", rarity: "common" },
    { id: "s03", emoji: "🐱", name: "น้องแมว", rarity: "common" },
    { id: "s04", emoji: "🦋", name: "ผีเสื้อ", rarity: "common" },
    { id: "s05", emoji: "🐟", name: "ปลาทอง", rarity: "common" },
    { id: "s06", emoji: "🌸", name: "ดอกไม้", rarity: "common" },
    { id: "s07", emoji: "🍎", name: "แอปเปิล", rarity: "common" },
    { id: "s08", emoji: "⭐", name: "ดาวดวงน้อย", rarity: "common" },
    { id: "s09", emoji: "🌈", name: "สายรุ้ง", rarity: "rare" },
    { id: "s10", emoji: "🚀", name: "จรวดอวกาศ", rarity: "rare" },
    { id: "s11", emoji: "🦕", name: "ไดโนคอยาว", rarity: "rare" },
    { id: "s12", emoji: "🐉", name: "มังกรน้อย", rarity: "rare" },
    { id: "s13", emoji: "🦉", name: "นกฮูกฉลาด", rarity: "rare" },
    { id: "s14", emoji: "🐢", name: "เต่าน้อย", rarity: "rare" },
    { id: "s15", emoji: "🦁", name: "สิงโตกล้าหาญ", rarity: "rare" },
    { id: "s16", emoji: "👑", name: "มงกุฎทองคำ", rarity: "gold" },
    { id: "s17", emoji: "🏆", name: "ถ้วยรางวัล", rarity: "gold" },
    { id: "s18", emoji: "💎", name: "เพชรวิเศษ", rarity: "gold" },
    { id: "s19", emoji: "🦄", name: "ยูนิคอร์น", rarity: "gold" },
    { id: "s20", emoji: "🌟", name: "ดาวเรืองแสง", rarity: "gold" }
  ];

  window.BUDDIES = BUDDIES;
  window.STICKERS = STICKERS;
  window.STICKER_BY_ID = STICKERS.reduce(function (m, s) { m[s.id] = s; return m; }, {});
})();
