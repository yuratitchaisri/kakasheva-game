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
  },
  {
    id: "p1-exam3-thai-finals", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "หลักภาษาไทย", title: "มาตราตัวสะกด · กระจายคำ", emoji: "🏠",
    desc: "แม่ ก กา · ตัวสะกดคืออะไร · 8 มาตรา กก กด กบ กง กน กม เกย เกอว · กับดัก ว ในสระอัว · กระจายคำเป็นตาราง · อ่านคำใหม่",
    video: "media/p1-exam3-thai-finals-1.mp4",
    parts: [
      { title: "แม่ ก กา และตัวสะกด", video: "media/p1-exam3-thai-finals-1.mp4", minutes: "2:13" },
      { title: "มาตราตัวสะกด 8 แม่", video: "media/p1-exam3-thai-finals-2.mp4", minutes: "3:29" },
      { title: "กระจายคำ และอ่านคำใหม่", video: "media/p1-exam3-thai-finals-3.mp4", minutes: "3:15" }
    ], poster: "media/p1-exam3-thai-finals-poster.jpg", minutes: "8:57",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-thai-phasaphathi", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "ภาษาพาที บทที่ 7–9", title: "เพื่อนรัก เพื่อนเล่น · พูดเพราะ · เกือบไป", emoji: "🐘",
    desc: "ภูผากับลูกช้างใบโบก ใบบัว · เสียงกระดึงกระพรวน · ควาญโพบอกว่าช้างชอบคนพูดเพราะ · งูแผ่แม่เบี้ยขวางทาง · คำใหม่ในบท",
    video: "media/p1-exam3-thai-phasaphathi-1.mp4",
    parts: [
      { title: "บทที่ 7 เพื่อนรัก เพื่อนเล่น", video: "media/p1-exam3-thai-phasaphathi-1.mp4", minutes: "2:50" },
      { title: "บทที่ 8 พูดเพราะ", video: "media/p1-exam3-thai-phasaphathi-2.mp4", minutes: "2:54" },
      { title: "บทที่ 9 เกือบไป", video: "media/p1-exam3-thai-phasaphathi-3.mp4", minutes: "3:04" }
    ], poster: "media/p1-exam3-thai-phasaphathi-poster.jpg", minutes: "8:48",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-thai-darun", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "ภาษาไทย", chapter: "ดรุณศึกษา บทที่ 37 · 45", title: "นกเขาเปล้า · นายสุข · อ่านเรื่องนอกบทเรียน", emoji: "🕊️",
    desc: "นกช่วยมดเพราะเมตตา มดช่วยนกเพราะกตัญญู · นายสุขสุภาพ มีน้ำใจ ได้รูปถ่าย · อ่านเรื่องที่ไม่เคยอ่าน: ใคร ทำอะไร ที่ไหน เพราะอะไร",
    video: "media/p1-exam3-thai-darun-1.mp4",
    parts: [
      { title: "บทที่ 37 นกเขาเปล้า", video: "media/p1-exam3-thai-darun-1.mp4", minutes: "3:11" },
      { title: "บทที่ 45 นายสุข", video: "media/p1-exam3-thai-darun-2.mp4", minutes: "3:42" },
      { title: "อ่านเรื่องนอกบทเรียน", video: "media/p1-exam3-thai-darun-3.mp4", minutes: "2:56" }
    ], poster: "media/p1-exam3-thai-darun-poster.jpg", minutes: "9:49",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-math-position-shapes", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "คณิตศาสตร์", chapter: "บทที่ 7–8", title: "ตำแหน่ง · อันดับที่ · รูปเรขาคณิต", emoji: "🔺",
    desc: "คนแรก คนสุดท้าย · ข้างหน้า ข้างหลัง ระหว่าง · ซ้าย ขวา · อันดับที่ · ทรง 3 มิติ 4 แบบ · รูป 2 มิติ ด้าน มุม",
    video: "media/p1-exam3-math-position-shapes-1.mp4",
    parts: [
      { title: "ตำแหน่ง และ อันดับที่", video: "media/p1-exam3-math-position-shapes-1.mp4", minutes: "3:34" },
      { title: "รูปเรขาคณิต 3 มิติ", video: "media/p1-exam3-math-position-shapes-2.mp4", minutes: "3:14" },
      { title: "รูปเรขาคณิต 2 มิติ", video: "media/p1-exam3-math-position-shapes-3.mp4", minutes: "3:44" }
    ], poster: "media/p1-exam3-math-position-shapes-poster.jpg", minutes: "10:32",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-math-numbers", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "คณิตศาสตร์", chapter: "บทที่ 9–10", title: "จำนวนถึง 100 · การบวก การลบ", emoji: "🔢",
    desc: "ตัวเลขไทย · หลักสิบ หลักหน่วย · รูปกระจาย · มากกว่า น้อยกว่า · เรียงลำดับ · ตั้งบวกทด · ตั้งลบยืม · โจทย์ปัญหา",
    video: "media/p1-exam3-math-numbers-1.mp4",
    parts: [
      { title: "จำนวนถึง 100", video: "media/p1-exam3-math-numbers-1.mp4", minutes: "3:00" },
      { title: "มากกว่า น้อยกว่า เรียงลำดับ", video: "media/p1-exam3-math-numbers-2.mp4", minutes: "2:55" },
      { title: "บวก ลบ และโจทย์ปัญหา", video: "media/p1-exam3-math-numbers-3.mp4", minutes: "4:16" }
    ], poster: "media/p1-exam3-math-numbers-poster.jpg", minutes: "10:10",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-sci-materials", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "วิทยาศาสตร์", chapter: "วัตถุและสมบัติของวัสดุ", title: "วัสดุรอบตัวเรา", emoji: "🧸",
    desc: "ของเล่น · ของใช้ · วัสดุ 8 ชนิด · ทำจากวัสดุชนิดเดียวหรือหลายชนิด · สมบัติของวัสดุ · จัดกลุ่มด้วยเกณฑ์",
    video: "media/p1-exam3-sci-materials-1.mp4",
    parts: [
      { title: "ของเล่น ของใช้ และวัสดุ", video: "media/p1-exam3-sci-materials-1.mp4", minutes: "3:09" },
      { title: "ชนิดเดียว หลายชนิด และสมบัติของวัสดุ", video: "media/p1-exam3-sci-materials-2.mp4", minutes: "3:32" },
      { title: "จัดกลุ่มวัสดุ", video: "media/p1-exam3-sci-materials-3.mp4", minutes: "2:46" }
    ], poster: "media/p1-exam3-sci-materials-poster.jpg", minutes: "9:28",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-sci-rocks", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "วิทยาศาสตร์", chapter: "หินในธรรมชาติ", title: "หินรอบตัวเรา", emoji: "⛰️",
    desc: "แหล่งที่พบหิน · สี รูปทรง เนื้อหิน ลวดลาย รูพรุน น้ำหนัก · ทดสอบความแข็งด้วยการขูด · ประโยชน์ของหิน",
    video: "media/p1-exam3-sci-rocks-1.mp4",
    parts: [
      { title: "หินพบที่ไหน หน้าตาเป็นอย่างไร", video: "media/p1-exam3-sci-rocks-1.mp4", minutes: "2:57" },
      { title: "ความแข็ง และประโยชน์ของหิน", video: "media/p1-exam3-sci-rocks-2.mp4", minutes: "3:22" }
    ], poster: "media/p1-exam3-sci-rocks-poster.jpg", minutes: "6:19",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-mathinter-numbers", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "Math-Inter", chapter: "Unit 11–14 · Numbers to 100", title: "Numbers to 100 · Add & Subtract", emoji: "🔢",
    desc: "tens and ones · number words · more than / less than · greatest / smallest · add & subtract · word problems (left, how many more)",
    video: "media/p1-exam3-mathinter-numbers-1.mp4",
    parts: [
      { title: "Tens and Ones", video: "media/p1-exam3-mathinter-numbers-1.mp4", minutes: "2:58" },
      { title: "Compare and Order", video: "media/p1-exam3-mathinter-numbers-2.mp4", minutes: "3:13" },
      { title: "Add, Subtract and Word Problems", video: "media/p1-exam3-mathinter-numbers-3.mp4", minutes: "3:58" }
    ], poster: "media/p1-exam3-mathinter-numbers-poster.jpg", minutes: "10:09",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-mathinter-time", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "Math-Inter", chapter: "Unit 15 · Time", title: "Time · o'clock & half past", emoji: "⏰",
    desc: "hour hand · minute hand · What time is it? · o'clock · half past · อ่านเข็มสั้นให้ถูก",
    video: "media/p1-exam3-mathinter-time-1.mp4",
    parts: [
      { title: "o'clock", video: "media/p1-exam3-mathinter-time-1.mp4", minutes: "2:33" },
      { title: "half past", video: "media/p1-exam3-mathinter-time-2.mp4", minutes: "3:21" }
    ], poster: "media/p1-exam3-mathinter-time-poster.jpg", minutes: "5:54",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-sciinter-plants-colours", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "Science-Inter", chapter: "Unit 3–4", title: "Growing Plants · Colours", emoji: "🌱",
    desc: "ส่วนของต้นไม้ (roots stem leaf flower fruit) · เมล็ดโตเป็นต้นไม้ · ต้นไม้ต้องการ 4 อย่าง · 3 สีหลัก · ผสมสีได้ green orange purple",
    video: "media/p1-exam3-sciinter-plants-colours-1.mp4",
    parts: [
      { title: "The Parts of a Plant", video: "media/p1-exam3-sciinter-plants-colours-1.mp4", minutes: "3:10" },
      { title: "How Plants Grow · What Plants Need", video: "media/p1-exam3-sciinter-plants-colours-2.mp4", minutes: "2:54" },
      { title: "Colours · Mixing Colours", video: "media/p1-exam3-sciinter-plants-colours-3.mp4", minutes: "2:50" }
    ], poster: "media/p1-exam3-sciinter-plants-colours-poster.jpg", minutes: "8:54",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p1-exam3-english", child: "Sheva", grade: "ป.1", year: 2569, exam: 3,
    subject: "English", chapter: "Unit 7–9", title: "Wild Animals · My Clothes · Can", emoji: "🦁",
    desc: "What is this? It is a… · What are they? They are… · Is it…? · has got / have got · can / can't · Action words · อ่านเรื่องสั้น",
    video: "media/p1-exam3-english-1.mp4",
    parts: [
      { title: "Wild Animals", video: "media/p1-exam3-english-1.mp4", minutes: "3:05" },
      { title: "My Clothes · Can / Can't", video: "media/p1-exam3-english-2.mp4", minutes: "3:35" },
      { title: "Action Words · Reading", video: "media/p1-exam3-english-3.mp4", minutes: "2:59" }
    ], poster: "media/p1-exam3-english-poster.jpg", minutes: "9:38",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p2-exam3-mathinter-word-fractions", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "Math-Inter", chapter: "Unit 7–8", title: "Word Problems & Fractions", emoji: "🧮",
    desc: "keywords: altogether · left · how many more · fewer · farther · 2-step problems · numerator · denominator · add/subtract fractions",
    video: "media/p2-exam3-mathinter-word-fractions-1.mp4",
    parts: [
      { title: "Keywords บอกว่า บวก หรือ ลบ", video: "media/p2-exam3-mathinter-word-fractions-1.mp4", minutes: "3:09" },
      { title: "2-step problems โจทย์ 2 ขั้น", video: "media/p2-exam3-mathinter-word-fractions-2.mp4", minutes: "2:49" },
      { title: "Fractions เศษส่วน", video: "media/p2-exam3-mathinter-word-fractions-3.mp4", minutes: "3:31" }
    ], poster: "media/p2-exam3-mathinter-word-fractions-poster.jpg", minutes: "9:30",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p2-exam3-mathinter-shapes", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "Math-Inter", chapter: "Unit 9", title: "Shapes, Solid Figures & Patterns", emoji: "🔷",
    desc: "circle · semicircle · quarter circle · square · rectangle · cube · cuboid · sphere · cylinder · cone · corners · what comes next?",
    video: "media/p2-exam3-mathinter-shapes-1.mp4",
    parts: [
      { title: "Shapes รูปแบน ๆ", video: "media/p2-exam3-mathinter-shapes-1.mp4", minutes: "3:22" },
      { title: "Solid figures & Patterns", video: "media/p2-exam3-mathinter-shapes-2.mp4", minutes: "4:21" }
    ], poster: "media/p2-exam3-mathinter-shapes-poster.jpg", minutes: "7:43",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p2-exam3-sciinter-light", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "Science-Inter", chapter: "Unit 3 Light", title: "Light · Colours · Shadows", emoji: "🌈",
    desc: "What is light? · Sources of light (natural / artificial) · Light in everyday life · Rainbow 7 colours · Shadows",
    video: "media/p2-exam3-sciinter-light-1.mp4",
    parts: [
      { title: "What is light? · Sources of light", video: "media/p2-exam3-sciinter-light-1.mp4", minutes: "3:38" },
      { title: "Light and colours · Shadows", video: "media/p2-exam3-sciinter-light-2.mp4", minutes: "4:56" }
    ], poster: "media/p2-exam3-sciinter-light-poster.jpg", minutes: "8:34",
    added: "27 พ.ย. 2569"
  },
  {
    id: "p2-exam3-english", child: "Kaka", grade: "ป.2", year: 2569, exam: 3,
    subject: "English", chapter: "Grammar Units", title: "Present Simple · Farm · Town · Clothes", emoji: "🔤",
    desc: "Present Simple (+ −) · So do I / I don't · can / can't · Where is/are · How many · Prepositions · has got / have got · Unseen",
    video: "media/p2-exam3-english-1.mp4",
    parts: [
      { title: "Present Simple (+ −)", video: "media/p2-exam3-english-1.mp4", minutes: "3:13" },
      { title: "At the farm · My town", video: "media/p2-exam3-english-2.mp4", minutes: "3:24" },
      { title: "Our clothes · Unseen", video: "media/p2-exam3-english-3.mp4", minutes: "3:36" }
    ], poster: "media/p2-exam3-english-poster.jpg", minutes: "10:13",
    added: "27 พ.ย. 2569"
  }
];
