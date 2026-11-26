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
    video: "media/p2-exam3-math-division-remainder-1.mp4",
    parts: [
      { title: "รู้จักเศษ", video: "media/p2-exam3-math-division-remainder-1.mp4", minutes: "2:53" },
      { title: "หารยาว และโจทย์ปัญหา", video: "media/p2-exam3-math-division-remainder-2.mp4", minutes: "3:11" }
    ],
    poster: "media/p2-exam3-math-division-remainder-poster.jpg",
    minutes: "6:04",
    sheet: "media/p2-exam3-math-division-remainder-sheet.pdf",
    sheetLabel: "ใบสอน 1 หน้า (พิมพ์ A4)",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-history-symbols", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "สัญลักษณ์ของชาติไทย", title: "สัญลักษณ์ของชาติไทย", emoji: "🚩",
    desc: "ธงชาติ 3 สี 5 แถบ และความหมายของสี · เวลาเชิญธง · เพลงชาติ · พระมหากษัตริย์ · พระพุทธรูป",
    video: "media/p1-exam3-history-symbols-1.mp4",
    parts: [
      { title: "ธงชาติไทย", video: "media/p1-exam3-history-symbols-1.mp4", minutes: "3:28" },
      { title: "เพลงชาติ พระมหากษัตริย์", video: "media/p1-exam3-history-symbols-2.mp4", minutes: "3:26" }
    ], poster: "media/p1-exam3-history-symbols-poster.jpg", minutes: "6:53",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-history-identity", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "เอกลักษณ์ของชาติไทย", title: "เอกลักษณ์ของชาติไทย", emoji: "🗺️",
    desc: "แผนที่รูปขวานและประเทศเพื่อนบ้านตามทิศ · อาหารไทย · ประเพณีสงกรานต์ ลอยกระทง",
    video: "media/p1-exam3-history-identity-1.mp4",
    parts: [
      { title: "แผนที่และอาหารไทย", video: "media/p1-exam3-history-identity-1.mp4", minutes: "3:29" },
      { title: "ประเพณีไทย", video: "media/p1-exam3-history-identity-2.mp4", minutes: "3:10" }
    ], poster: "media/p1-exam3-history-identity-poster.jpg", minutes: "6:39",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p1-exam3-social-family-school", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "สังคมศึกษา", chapter: "ครอบครัว · โรงเรียน", title: "ครอบครัวและโรงเรียนของเรา", emoji: "👨‍👩‍👧",
    desc: "ปู่ย่า ตายาย · หน้าที่พ่อแม่และลูก · คนในโรงเรียน · สิทธิ บทบาท หน้าที่ · ประชาธิปไตย",
    video: "media/p1-exam3-social-family-school-1.mp4",
    parts: [
      { title: "ครอบครัวของเรา", video: "media/p1-exam3-social-family-school-1.mp4", minutes: "2:05" },
      { title: "สิทธิ และคนในโรงเรียน", video: "media/p1-exam3-social-family-school-2.mp4", minutes: "2:57" },
      { title: "เด็กดี กับประชาธิปไตย", video: "media/p1-exam3-social-family-school-3.mp4", minutes: "3:33" }
    ], poster: "media/p1-exam3-social-family-school-poster.jpg", minutes: "8:35",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-math-time", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "คณิตศาสตร์", chapter: "บทที่ 7 เวลา", title: "เวลา — นาฬิกา 24 ชั่วโมง", emoji: "⏰",
    desc: "อ่านนาฬิกา · กลางวัน/กลางคืน · เที่ยงคืน = 0 นาฬิกา · เขียนเวลา · หน่วยเวลา · วันผลิต/วันหมดอายุ · โจทย์ระยะเวลา",
    video: "media/p2-exam3-math-time-1.mp4",
    parts: [
      { title: "อ่านนาฬิกา", video: "media/p2-exam3-math-time-1.mp4", minutes: "4:42" },
      { title: "เขียนเวลาและวันที่", video: "media/p2-exam3-math-time-2.mp4", minutes: "4:12" },
      { title: "ระยะเวลาและโจทย์", video: "media/p2-exam3-math-time-3.mp4", minutes: "3:28" }
    ], poster: "media/p2-exam3-math-time-poster.jpg", minutes: "12:22",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-math-geometry", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "คณิตศาสตร์", chapter: "บทที่ 9 รูปเรขาคณิต", title: "รูปเรขาคณิต — รูป กับ ทรง", emoji: "🔷",
    desc: "รูป 2 มิติ vs ทรง 3 มิติ · ทรงต่าง ๆ จากของใช้ · นับด้านและมุม · ชื่อรูปหลายเหลี่ยม · วงกลม vs วงรี · แบบรูปซ้ำ",
    video: "media/p2-exam3-math-geometry-1.mp4",
    parts: [
      { title: "รูป กับ ทรง", video: "media/p2-exam3-math-geometry-1.mp4", minutes: "3:15" },
      { title: "รูปหลายเหลี่ยม", video: "media/p2-exam3-math-geometry-2.mp4", minutes: "2:24" },
      { title: "วงกลม วงรี แบบรูปซ้ำ", video: "media/p2-exam3-math-geometry-3.mp4", minutes: "2:40" }
    ], poster: "media/p2-exam3-math-geometry-poster.jpg", minutes: "8:19",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-history-r9", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "บุคคลสำคัญ", title: "พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช (ร.9)", emoji: "👑",
    desc: "พระราชประวัติ · เส้นเวลาปีสำคัญ · พระราชกรณียกิจ 4 ประเภทโครงการ",
    video: "media/p2-exam3-history-r9-1.mp4",
    parts: [
      { title: "พระราชประวัติพ่อหลวง", video: "media/p2-exam3-history-r9-1.mp4", minutes: "4:28" },
      { title: "ไทม์ไลน์และโครงการ", video: "media/p2-exam3-history-r9-2.mp4", minutes: "3:53" }
    ], poster: "media/p2-exam3-history-r9-poster.jpg", minutes: "8:21",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-history-queen", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ประวัติศาสตร์", chapter: "บุคคลสำคัญ", title: "สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชชนนีพันปีหลวง", emoji: "👑",
    desc: "พระราชประวัติ · ลำดับพระยศ · พระราชกรณียกิจ 3 ด้าน (ป่า ช้าง เต่า ศิลปาชีพ หมอ)",
    video: "media/p2-exam3-history-queen-1.mp4",
    parts: [
      { title: "พระราชประวัติและพระยศ", video: "media/p2-exam3-history-queen-1.mp4", minutes: "3:58" },
      { title: "งานที่ทรงทำเพื่อคนไทย", video: "media/p2-exam3-history-queen-2.mp4", minutes: "3:09" }
    ], poster: "media/p2-exam3-history-queen-poster.jpg", minutes: "7:07",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-social", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "สังคมศึกษา", chapter: "ครอบครัว · โรงเรียน · ชุมชน", title: "ครอบครัว โรงเรียน ชุมชนของเรา", emoji: "🏘️",
    desc: "หน้าที่ สิทธิ เสรีภาพ · ผอ. กับ รองผอ. · ผู้ใหญ่บ้าน กับ กำนัน · ทำแบบนี้ → ได้ผลแบบนี้",
    video: "media/p2-exam3-social-1.mp4",
    parts: [
      { title: "หน้าที่ สิทธิ ครอบครัว", video: "media/p2-exam3-social-1.mp4", minutes: "3:28" },
      { title: "ทำแล้วได้ผล และโรงเรียน", video: "media/p2-exam3-social-2.mp4", minutes: "4:25" },
      { title: "ชุมชนของเรา", video: "media/p2-exam3-social-3.mp4", minutes: "4:13" }
    ], poster: "media/p2-exam3-social-poster.jpg", minutes: "12:07",
    added: "21 พ.ย. 2569"
  },
  {
    id: "p2-exam3-thai-finals", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "หลักภาษา", title: "มาตราตัวสะกด ตรงมาตรา · ไม่ตรงมาตรา", emoji: "🔤",
    desc: "ตัวสะกดคืออะไร · 4 แม่ตรงมาตรา · 4 แม่ไม่ตรงมาตรา · ระวัง ย/ว ที่เป็นสระ · ฎ ฏ ฐ · นับคำในประโยค",
    video: "media/p2-exam3-thai-finals-1.mp4",
    parts: [
      { title: "ตรงมาตรา 4 แม่", video: "media/p2-exam3-thai-finals-1.mp4", minutes: "3:45" },
      { title: "ไม่ตรงมาตรา + นับคำ", video: "media/p2-exam3-thai-finals-2.mp4", minutes: "5:09" }
    ], poster: "media/p2-exam3-thai-finals-poster.jpg", minutes: "8:54",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-thai-cluster-lead", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "หลักภาษา", title: "คำควบกล้ำ และ อักษรนำ", emoji: "🗣️",
    desc: "ควบแท้ vs ควบไม่แท้ · ทร อ่านเป็น ซ · อักษรนำ 1 พยางค์ vs 2 พยางค์ (ข ถ ส ต) · กับดักทะนุถนอม",
    video: "media/p2-exam3-thai-cluster-lead-1.mp4",
    parts: [
      { title: "ควบกล้ำแท้ ไม่แท้", video: "media/p2-exam3-thai-cluster-lead-1.mp4", minutes: "3:52" },
      { title: "อักษรนำ", video: "media/p2-exam3-thai-cluster-lead-2.mp4", minutes: "3:02" },
      { title: "กับดักข้อสอบ", video: "media/p2-exam3-thai-cluster-lead-3.mp4", minutes: "2:47" }
    ], poster: "media/p2-exam3-thai-cluster-lead-poster.jpg", minutes: "9:42",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-thai-phasaphathi", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "ภาษาพาที บทที่ 7–9", title: "นักคิดสมองใส · โลกร้อน · รักพ่อรักแม่", emoji: "📗",
    desc: "รุ้งกินน้ำเกิดอย่างไร · สาเหตุและวิธีลดโลกร้อน · พระราชกรณียกิจ ร.9 กับ พระพันปีหลวง",
    video: "media/p2-exam3-thai-phasaphathi-1.mp4",
    parts: [
      { title: "นักคิดสมองใส + โลกร้อน", video: "media/p2-exam3-thai-phasaphathi-1.mp4", minutes: "4:26" },
      { title: "รักพ่อรักแม่ + กับดัก", video: "media/p2-exam3-thai-phasaphathi-2.mp4", minutes: "3:51" }
    ], poster: "media/p2-exam3-thai-phasaphathi-poster.jpg", minutes: "8:17",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-thai-darun", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "ดรุณศึกษา บทที่ 40, 42", title: "ทุบหม้อแตกกลับได้เมือง · จุดเอียนตุนดูเล่น", emoji: "📜",
    desc: "เจ้าตากทุบหม้อ · บางปลาสร้อย = ชลบุรี · เอียนตุน = ร้านไฟ = กระโจมไฟ · อิวอ๋องกับพระนางโปซู",
    video: "media/p2-exam3-thai-darun-1.mp4",
    parts: [
      { title: "ทุบหม้อได้เมือง", video: "media/p2-exam3-thai-darun-1.mp4", minutes: "3:48" },
      { title: "จุดไฟเล่นเสียเมือง", video: "media/p2-exam3-thai-darun-2.mp4", minutes: "2:33" },
      { title: "กับดักข้อสอบ", video: "media/p2-exam3-thai-darun-3.mp4", minutes: "2:18" }
    ], poster: "media/p2-exam3-thai-darun-poster.jpg", minutes: "8:40",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-sci-light", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "วิทยาศาสตร์", chapter: "แสงและการมองเห็น", title: "แสงมาจากไหน เดินทางอย่างไร", emoji: "💡",
    desc: "แหล่งกำเนิดแสง ธรรมชาติ/มนุษย์สร้าง · ดวงจันทร์ไม่ใช่ · การทดลองกระดาษเจาะรู · แสงไปทุกทิศทางเป็นแนวตรง · วาดรังสีของแสง",
    video: "media/p2-exam3-sci-light-1.mp4",
    parts: [
      { title: "แสงมาจากไหน", video: "media/p2-exam3-sci-light-1.mp4", minutes: "3:52" },
      { title: "แสงเดินทางอย่างไร", video: "media/p2-exam3-sci-light-2.mp4", minutes: "4:12" }
    ], poster: "media/p2-exam3-sci-light-poster.jpg", minutes: "8:04",
    added: "22 พ.ย. 2569"
  },
  {
    id: "p2-exam3-sci-eye", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "วิทยาศาสตร์", chapter: "แสงและการมองเห็น", title: "ตาและการมองเห็น", emoji: "👁️",
    desc: "ส่วนประกอบของตา 5 ส่วน · ม่านตา vs รูม่านตา · เรามองเห็นได้อย่างไร · การทดลองกระบอกกระดาษ · ดูแลดวงตาให้ปลอดภัย",
    video: "media/p2-exam3-sci-eye-1.mp4",
    parts: [
      { title: "ส่วนประกอบของตา", video: "media/p2-exam3-sci-eye-1.mp4", minutes: "3:32" },
      { title: "เรามองเห็นได้อย่างไร", video: "media/p2-exam3-sci-eye-2.mp4", minutes: "2:32" },
      { title: "ดูแลดวงตาให้ปลอดภัย", video: "media/p2-exam3-sci-eye-3.mp4", minutes: "2:08" }
    ], poster: "media/p2-exam3-sci-eye-poster.jpg", minutes: "8:12",
    added: "22 พ.ย. 2569"
  }
];
