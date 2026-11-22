/* สื่อการเรียนรู้ที่พ่อทำให้ลูก (คลิปสอน + ใบสอน 1 หน้า)
 * เพิ่มบทเรียนใหม่: เพิ่ม object ท้าย LESSONS แล้ววางไฟล์ไว้ใน lessons/media/ (ชื่อไฟล์ภาษาอังกฤษ ไม่มีชื่อลูก)
 * grade = ชั้น · exam = สอบครั้งที่ · year = ปีการศึกษา
 */
var LESSONS = [
  {
    id: "p2-e3-math-divrem",
    child: "Kaka",
    grade: "ป.2",
    year: 2569,
    exam: 3,
    subject: "คณิตศาสตร์",
    chapter: "บทที่ 6 การหาร",
    title: "หารแบบมีเศษ",
    emoji: "➗",
    desc: "เศษคืออะไร · กฎทอง: เศษต้องน้อยกว่าตัวหาร · กบกระโดดบนเส้นจำนวน · หารยาวมีเศษ · ตรวจคำตอบ · โจทย์ปัญหา",
    video: "media/p2-exam3-math-division-remainder.mp4",
    poster: "media/p2-exam3-math-division-remainder-poster.jpg",
    minutes: "4:23",
    sheet: "media/p2-exam3-math-division-remainder-sheet.pdf",
    sheetLabel: "ใบสอน 1 หน้า (พิมพ์ A4)",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-history-symbols", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "สัญลักษณ์ของชาติไทย", title: "สัญลักษณ์ของชาติไทย", emoji: "🚩",
    desc: "ธงชาติ 3 สี 5 แถบ และความหมายของสี · เวลาเชิญธง · เพลงชาติ · พระมหากษัตริย์ · พระพุทธรูป",
    video: "media/p1-exam3-history-symbols.mp4", poster: "media/p1-exam3-history-symbols-poster.jpg", minutes: "6:30",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-history-identity", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "เอกลักษณ์ของชาติไทย", title: "เอกลักษณ์ของชาติไทย", emoji: "🗺️",
    desc: "แผนที่รูปขวานและประเทศเพื่อนบ้านตามทิศ · อาหารไทย · ประเพณีสงกรานต์ ลอยกระทง",
    video: "media/p1-exam3-history-identity.mp4", poster: "media/p1-exam3-history-identity-poster.jpg", minutes: "6:22",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-social-family-school", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "สังคมศึกษา", chapter: "ครอบครัว · โรงเรียน", title: "ครอบครัวและโรงเรียนของเรา", emoji: "👨‍👩‍👧",
    desc: "ปู่ย่า ตายาย · หน้าที่พ่อแม่และลูก · คนในโรงเรียน · สิทธิ บทบาท หน้าที่ · ประชาธิปไตย",
    video: "media/p1-exam3-social-family-school.mp4", poster: "media/p1-exam3-social-family-school-poster.jpg", minutes: "9:06",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-math-time", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "คณิตศาสตร์", chapter: "บทที่ 7 เวลา", title: "เวลา — นาฬิกา 24 ชั่วโมง", emoji: "⏰",
    desc: "อ่านนาฬิกา · กลางวัน/กลางคืน · เที่ยงคืน = 0 นาฬิกา · เขียนเวลา · หน่วยเวลา · วันผลิต/วันหมดอายุ · โจทย์ระยะเวลา",
    video: "media/p2-exam3-math-time.mp4", poster: "media/p2-exam3-math-time-poster.jpg", minutes: "8:33",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-math-geometry", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "คณิตศาสตร์", chapter: "บทที่ 9 รูปเรขาคณิต", title: "รูปเรขาคณิต — รูป กับ ทรง", emoji: "🔷",
    desc: "รูป 2 มิติ vs ทรง 3 มิติ · ทรงต่าง ๆ จากของใช้ · นับด้านและมุม · ชื่อรูปหลายเหลี่ยม · วงกลม vs วงรี · แบบรูปซ้ำ",
    video: "media/p2-exam3-math-geometry.mp4", poster: "media/p2-exam3-math-geometry-poster.jpg", minutes: "5:55",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-history-r9", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "บุคคลสำคัญ", title: "พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช (ร.9)", emoji: "👑",
    desc: "พระราชประวัติ · เส้นเวลาปีสำคัญ · พระราชกรณียกิจ 4 ประเภทโครงการ",
    video: "media/p2-exam3-history-r9.mp4", poster: "media/p2-exam3-history-r9-poster.jpg", minutes: "7:14",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-history-queen", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "บุคคลสำคัญ", title: "สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชชนนีพันปีหลวง", emoji: "👑",
    desc: "พระราชประวัติ · ลำดับพระยศ · พระราชกรณียกิจ 3 ด้าน (ป่า ช้าง เต่า ศิลปาชีพ หมอ)",
    video: "media/p2-exam3-history-queen.mp4", poster: "media/p2-exam3-history-queen-poster.jpg", minutes: "6:01",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-social", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "สังคมศึกษา", chapter: "ครอบครัว · โรงเรียน · ชุมชน", title: "ครอบครัว โรงเรียน ชุมชนของเรา", emoji: "🏘️",
    desc: "หน้าที่ สิทธิ เสรีภาพ · ผอ. กับ รองผอ. · ผู้ใหญ่บ้าน กับ กำนัน · ทำแบบนี้ → ได้ผลแบบนี้",
    video: "media/p2-exam3-social.mp4", poster: "media/p2-exam3-social-poster.jpg", minutes: "10:25",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-thai-finals", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "หลักภาษา", title: "มาตราตัวสะกด ตรงมาตรา · ไม่ตรงมาตรา", emoji: "🔤",
    desc: "ตัวสะกดคืออะไร · 4 แม่ตรงมาตรา · 4 แม่ไม่ตรงมาตรา · ระวัง ย/ว ที่เป็นสระ · ฎ ฏ ฐ · นับคำในประโยค",
    video: "media/p2-exam3-thai-finals.mp4", poster: "media/p2-exam3-thai-finals-poster.jpg", minutes: "7:07",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-thai-cluster-lead", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "หลักภาษา", title: "คำควบกล้ำ และ อักษรนำ", emoji: "🗣️",
    desc: "ควบแท้ vs ควบไม่แท้ · ทร อ่านเป็น ซ · อักษรนำ 1 พยางค์ vs 2 พยางค์ (ข ถ ส ต) · กับดักทะนุถนอม",
    video: "media/p2-exam3-thai-cluster-lead.mp4", poster: "media/p2-exam3-thai-cluster-lead-poster.jpg", minutes: "7:37",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-thai-phasaphathi", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "ภาษาพาที บทที่ 7–9", title: "นักคิดสมองใส · โลกร้อน · รักพ่อรักแม่", emoji: "📗",
    desc: "รุ้งกินน้ำเกิดอย่างไร · สาเหตุและวิธีลดโลกร้อน · พระราชกรณียกิจ ร.9 กับ พระพันปีหลวง",
    video: "media/p2-exam3-thai-phasaphathi.mp4", poster: "media/p2-exam3-thai-phasaphathi-poster.jpg", minutes: "6:29",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-thai-darun", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "ดรุณศึกษา บทที่ 40, 42", title: "ทุบหม้อแตกกลับได้เมือง · จุดเอียนตุนดูเล่น", emoji: "📜",
    desc: "เจ้าตากทุบหม้อ · บางปลาสร้อย = ชลบุรี · เอียนตุน = ร้านไฟ = กระโจมไฟ · อิวอ๋องกับพระนางโปซู",
    video: "media/p2-exam3-thai-darun.mp4", poster: "media/p2-exam3-thai-darun-poster.jpg", minutes: "6:51",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-sci-light", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "วิทยาศาสตร์", chapter: "แสงและการมองเห็น", title: "แสงมาจากไหน เดินทางอย่างไร", emoji: "💡",
    desc: "แหล่งกำเนิดแสง ธรรมชาติ/มนุษย์สร้าง · ดวงจันทร์ไม่ใช่ · การทดลองกระดาษเจาะรู · แสงไปทุกทิศทางเป็นแนวตรง · วาดรังสีของแสง",
    video: "media/p2-exam3-sci-light.mp4", poster: "media/p2-exam3-sci-light-poster.jpg", minutes: "7:00",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-sci-eye", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "วิทยาศาสตร์", chapter: "แสงและการมองเห็น", title: "ตาและการมองเห็น", emoji: "👁️",
    desc: "ส่วนประกอบของตา 5 ส่วน · ม่านตา vs รูม่านตา · เรามองเห็นได้อย่างไร · การทดลองกระบอกกระดาษ · ดูแลดวงตาให้ปลอดภัย",
    video: "media/p2-exam3-sci-eye.mp4", poster: "media/p2-exam3-sci-eye-poster.jpg", minutes: "7:06",
    added: "22 พ.ย. 2569"
  }
];
