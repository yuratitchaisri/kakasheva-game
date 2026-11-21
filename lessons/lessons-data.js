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
    minutes: "3:27",
    sheet: "media/p2-exam3-math-division-remainder-sheet.pdf",
    sheetLabel: "ใบสอน 1 หน้า (พิมพ์ A4)",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-history-symbols", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "สัญลักษณ์ของชาติไทย", title: "สัญลักษณ์ของชาติไทย", emoji: "🚩",
    desc: "ธงชาติ 3 สี 5 แถบ และความหมายของสี · เวลาเชิญธง · เพลงชาติ · พระมหากษัตริย์ · พระพุทธรูป",
    video: "media/p1-exam3-history-symbols.mp4", poster: "media/p1-exam3-history-symbols-poster.jpg", minutes: "3:48",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-history-identity", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "เอกลักษณ์ของชาติไทย", title: "เอกลักษณ์ของชาติไทย", emoji: "🗺️",
    desc: "แผนที่รูปขวานและประเทศเพื่อนบ้านตามทิศ · อาหารไทย · ประเพณีสงกรานต์ ลอยกระทง",
    video: "media/p1-exam3-history-identity.mp4", poster: "media/p1-exam3-history-identity-poster.jpg", minutes: "3:35",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-social-family-school", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "สังคมศึกษา", chapter: "ครอบครัว · โรงเรียน", title: "ครอบครัวและโรงเรียนของเรา", emoji: "👨‍👩‍👧",
    desc: "ปู่ย่า ตายาย · หน้าที่พ่อแม่และลูก · คนในโรงเรียน · สิทธิ บทบาท หน้าที่ · ประชาธิปไตย",
    video: "media/p1-exam3-social-family-school.mp4", poster: "media/p1-exam3-social-family-school-poster.jpg", minutes: "4:29",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-math-time", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "คณิตศาสตร์", chapter: "บทที่ 7 เวลา", title: "เวลา — นาฬิกา 24 ชั่วโมง", emoji: "⏰",
    desc: "อ่านนาฬิกา · กลางวัน/กลางคืน · เที่ยงคืน = 0 นาฬิกา · เขียนเวลา · หน่วยเวลา · วันผลิต/วันหมดอายุ · โจทย์ระยะเวลา",
    video: "media/p2-exam3-math-time.mp4", poster: "media/p2-exam3-math-time-poster.jpg", minutes: "6:01",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-math-geometry", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "คณิตศาสตร์", chapter: "บทที่ 9 รูปเรขาคณิต", title: "รูปเรขาคณิต — รูป กับ ทรง", emoji: "🔷",
    desc: "รูป 2 มิติ vs ทรง 3 มิติ · ทรงต่าง ๆ จากของใช้ · นับด้านและมุม · ชื่อรูปหลายเหลี่ยม · วงกลม vs วงรี · แบบรูปซ้ำ",
    video: "media/p2-exam3-math-geometry.mp4", poster: "media/p2-exam3-math-geometry-poster.jpg", minutes: "3:53",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-history-r9", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "บุคคลสำคัญ", title: "พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช (ร.9)", emoji: "👑",
    desc: "พระราชประวัติ · เส้นเวลาปีสำคัญ · พระราชกรณียกิจ 4 ประเภทโครงการ",
    video: "media/p2-exam3-history-r9.mp4", poster: "media/p2-exam3-history-r9-poster.jpg", minutes: "4:59",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-history-queen", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "บุคคลสำคัญ", title: "สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชชนนีพันปีหลวง", emoji: "👑",
    desc: "พระราชประวัติ · ลำดับพระยศ · พระราชกรณียกิจ 3 ด้าน (ป่า ช้าง เต่า ศิลปาชีพ หมอ)",
    video: "media/p2-exam3-history-queen.mp4", poster: "media/p2-exam3-history-queen-poster.jpg", minutes: "4:15",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-social", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "สังคมศึกษา", chapter: "ครอบครัว · โรงเรียน · ชุมชน", title: "ครอบครัว โรงเรียน ชุมชนของเรา", emoji: "🏘️",
    desc: "หน้าที่ สิทธิ เสรีภาพ · ผอ. กับ รองผอ. · ผู้ใหญ่บ้าน กับ กำนัน · ทำแบบนี้ → ได้ผลแบบนี้",
    video: "media/p2-exam3-social.mp4", poster: "media/p2-exam3-social-poster.jpg", minutes: "6:58",
    added: "21 พ.ย. 2569"
  }
];
