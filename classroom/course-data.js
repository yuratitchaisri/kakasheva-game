/* รายการคลิป + เอกสาร คอร์สครูต้น — ⚠️ ไฟล์นี้สร้างอัตโนมัติด้วย tools/kruton_build.py ห้ามแก้มือ
 *
 * ไฟล์จริงอยู่ที่ N:\My Drive\ACP\kruton (บัญชี yuratit · แชร์อ่านให้ kakasheva.platon ที่ iPad ลูก login)
 * id = รหัสคอร์ส · ความคืบหน้าผูกกับ id นี้ ห้ามเปลี่ยนหลังลูกเริ่มใช้
 * learned = true → เรียนสดไปแล้ว ขึ้นเป็นดูจบตั้งแต่แรก
 * docGroups = เอกสารระดับคอร์ส · parent: true = กล่องพ่อแม่ (เฉลย)
 * parts = ตอนย่อย (tools/clip_split.py) · ถ้ามี หน้าเว็บให้ดู/ติ๊กทีละตอน · link ของครั้ง = คลิปเต็ม
 * file = path อ้างอิงใน kruton/ (ไม่แสดงบนเว็บ) · link ว่าง = หน้าเว็บขึ้น "รอลิงก์"
 */
var COURSES = [
  {
    id: "TA 1 102 ป.1",
    child: "Sheva",
    label: "เชว่า · TA 1 102 (เทอม 1)",
    course: "TA 1 102 ป.1 คณิตศาสตร์ แข่งขัน ปี 2569",
    docGroups: [
      { title: "เอกสารเรียน (ใช้ทั้งคอร์ส)", docs: [
        { name: "ชุดที่ 1 จำนวน และการบวก", link: "https://drive.google.com/file/d/1zA90GcLPIE8VnG8WJ1c88oeX96BSw7mp/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 ชุดที่ 1 จำนวน และการบวก.pdf" },
        { name: "ชุดที่ 2 การลบ และ การบวก ลบ ระคน", link: "https://drive.google.com/file/d/1AMAYwIZuIUCsr8yLQoFMHDo1LH7CDPyc/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 ชุดที่ 2 การลบ และ การบวก ลบ ระคน.pdf" },
        { name: "ชุดที่ 3 แผนภูมิรูปภาพ และการวัดน้ำหนัก", link: "https://drive.google.com/file/d/1wmj6PrGmaMugyN-MHQWN_3bQp4bpHcR6/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 ชุดที่ 3 แผนภูมิรูปภาพ และการวัดน้ำหนัก.pdf" },
        { name: "ชุดที่ 4 การบอกตำแหน่ง และ รูปเรขาคณิต และ แบบรูป", link: "https://drive.google.com/file/d/18K7tD4Du7-cITkz6-9W_rKNH1w9lidOW/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 ชุดที่ 4 การบอกตำแหน่ง และ รูปเรขาคณิต และ แบบรูป.pdf" }
      ] },
      { title: "แบบฝึกเพิ่มเติม", docs: [
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 1", link: "https://drive.google.com/file/d/110l7oUecf1vqAC-oExnN8ToL3W-BiR4u/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 1.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 2", link: "https://drive.google.com/file/d/1dJiiooxBXo98o66tmMJBSPx_3wBSVHph/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 2.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 3", link: "https://drive.google.com/file/d/1iWxTcKEkAnQPWopb8SjiyxviZJl9ToD7/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 3.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 4", link: "https://drive.google.com/file/d/1mv3u6h4M5mNsiqSLcL0io34zZfL3iy3P/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 4.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 5", link: "https://drive.google.com/file/d/1rf2Zp7arRxykBJHpXBBfUNjKzCWoGkM2/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 5.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 6", link: "https://drive.google.com/file/d/1FIIBPaWuhnAFKmEQID4_mePW2dU3gec8/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 6.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 7", link: "https://drive.google.com/file/d/1mr2IWNKsr7t5IpFpQdKqlyUZQYazjqZT/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 7.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 8", link: "https://drive.google.com/file/d/1KrmGdaTIshLL-BdLsxikAllQNilfT-WG/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 8.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 9", link: "https://drive.google.com/file/d/1wLEvlNfcLIhsIpiT8sV01bDMBTRHQSof/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 9.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 10", link: "https://drive.google.com/file/d/10VIVIjiNyT1VO8C1lyrZQZwJSwcT-3tw/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 10.pdf" }
      ] },
      { title: "เฉลยแบบฝึก", parent: true, docs: [
        { name: "เฉลย แบบฝึก ชุดที่ 1", link: "https://drive.google.com/file/d/199tmyt6rhqXYUlkOQChOWJLFGziWbT01/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 1 เฉลย.pdf" },
        { name: "เฉลย แบบฝึก ชุดที่ 2", link: "https://drive.google.com/file/d/1Z58GVEdt6yQkdo68sSIghhxGUUKATpLH/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 2 เฉลย.pdf" },
        { name: "เฉลย แบบฝึก ชุดที่ 3", link: "https://drive.google.com/file/d/1sG4HGd-yZ0O2Qn9zxNAQGFujQTDdKPcQ/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 3 เฉลย.pdf" },
        { name: "เฉลย แบบฝึก ชุดที่ 4", link: "https://drive.google.com/file/d/1ZCffQUL2cdnI8O4VHFybgYPkcu9sRLFp/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 4 เฉลย.pdf" },
        { name: "เฉลย แบบฝึก ชุดที่ 5", link: "https://drive.google.com/file/d/1vLoj7obQAN4EuGrrSUMMLnyGKCoRDfvm/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 5 เฉลย.pdf" },
        { name: "เฉลย แบบฝึก ชุดที่ 6", link: "https://drive.google.com/file/d/1_CZtuC4OJqZk-gQuUltVYjx-AX6Vfjmb/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 6 เฉลย.pdf" },
        { name: "เฉลย แบบฝึก ชุดที่ 7", link: "https://drive.google.com/file/d/1qOFfapgjxw6_OZQIWHkNjQ0Jsc71JvAa/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 7 เฉลย.pdf" },
        { name: "เฉลย แบบฝึก ชุดที่ 8", link: "https://drive.google.com/file/d/17ZiwymUYD1kIGYtmOKHMHTy-ByPomAsC/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 8 เฉลย.pdf" },
        { name: "เฉลย แบบฝึก ชุดที่ 9", link: "https://drive.google.com/file/d/1qgN6jksbmtqCfO37pD1PW2MwpUDbT9iS/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 แบบฝึกเพิ่มเติม ชุดที่ 9 เฉลย.pdf" }
      ] }
    ],
    episodes: [
      { no: 1, date: "9 พ.ค. 2569", link: "https://drive.google.com/file/d/12GvqMuCG_2TXnIOnKJY7xjqcxdjRDLmL/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 32, link: "https://drive.google.com/file/d/1WBy5F7OueHTR9IGkXLH6DGpQL2XReDh5/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 33, link: "https://drive.google.com/file/d/1e7_QJSeKyO-Gjsi5_Lry3rDrb5myYKw1/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 37, link: "https://drive.google.com/file/d/1DJV5g-0n5GxiFmWaQKwm7zDHtAyWymyN/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 2, date: "16 พ.ค. 2569", link: "https://drive.google.com/file/d/1m0pHZQwhqiEEmiKrwjGQ2h2TM7tIpxMb/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1N52SPgOZIgz16gkyx4397kBiK_9c1LF-/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 32, link: "https://drive.google.com/file/d/1e9vEj-zvy8UQSHYYAezVNqIT_y0QEa08/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/1QQ4JluFQPMb2lISS3UHemliNoEnzoQ-7/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 3, date: "23 พ.ค. 2569", link: "https://drive.google.com/file/d/1cTwXDxcM8MXw9mSsl5ENAiRcKOHDhY6b/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 34, link: "https://drive.google.com/file/d/102PomEl73bQtftBEdSfSt9Rw6wFHlqW3/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 33, link: "https://drive.google.com/file/d/1gV86Qu_XcCH6y29YywRZe4ALMNvzY1jk/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 38, link: "https://drive.google.com/file/d/1QCBsGRCkJY1drVidv43v7NcT3jmRiG8C/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 4, date: "30 พ.ค. 2569", link: "https://drive.google.com/file/d/1hMQO9yRjmSjWiHhVdTj6t9YFWSw-8vGF/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 37, link: "https://drive.google.com/file/d/1hadTAdV-rYlaFWrTTOa4e8XjH_DLvEfM/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 32, link: "https://drive.google.com/file/d/1X926sgrAwZMk6tiqV7tQSS6q9DyC5cRS/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/1W4tDXzyOFnOpflZPJ5_QLVycZNjhjg9S/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 5, date: "13 มิ.ย. 2569", link: "https://drive.google.com/file/d/1oax65qBqWt1SGjV7NvgTRwwuTzV5y-3Y/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 36, link: "https://drive.google.com/file/d/1ej8jbb8klCRleeKDB20o4RkGVAzOda0W/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 31, link: "https://drive.google.com/file/d/10cGE1EnViMTEEtV50IFqeRiTwM_0--34/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 33, link: "https://drive.google.com/file/d/1wvDaI8eHrbic5RfDrkdRigZKNJZz9es3/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 6, date: "20 มิ.ย. 2569", link: "https://drive.google.com/file/d/1hB5Ux7Ob5hWsJidENBjbLuSzHN1cjNqD/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 31, link: "https://drive.google.com/file/d/12XuJdeqQ-__Gjr8URDEqRXvopC1a9Gjy/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 33, link: "https://drive.google.com/file/d/1XfhdLuHW3PgW0x__6A2sRdQKQzdoTgBs/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 36, link: "https://drive.google.com/file/d/1j5VP4YQic8XgP-bWOiSFTgkv37p7dUGL/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 7, date: "27 มิ.ย. 2569", link: "https://drive.google.com/file/d/1OitZZHFltVOyOBkIEokIAjoBLD-oR67n/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 32, link: "https://drive.google.com/file/d/1FgBdEgtXwnuK9jlaJ6LwF76qJF_ibMqC/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 33, link: "https://drive.google.com/file/d/1uL-lrMfDTFzH4Ivmd53OausOUuwgpWwS/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 37, link: "https://drive.google.com/file/d/171JFfrGW0mxpklIMxtHslwRrnOwIB9gb/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 8, date: "4 ก.ค. 2569", link: "https://drive.google.com/file/d/1PEHbQ6D1T-QfjBE0PolBjQzMaPHQkqnl/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1rtzK2opWpf-MoZkomjwplACzt0pHd3_F/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 32, link: "https://drive.google.com/file/d/12qj9l49sIA7Wf2ciuAFKJVqjmF9C3-9m/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 32, link: "https://drive.google.com/file/d/1yO9kVNBp40Ir91PMvhQXeRy0V-K8VAd6/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 9, date: "11 ก.ค. 2569", link: "https://drive.google.com/file/d/1WH28DetT6L3ypc8HtZOPMb4x0-UifZKU/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1yZ1e6ZNJFcFWlPR7A5CoI1md-1ZFYp64/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 33, link: "https://drive.google.com/file/d/1DcWGN77W3r-Zd_hODda-s1kTUrQtY6S7/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 32, link: "https://drive.google.com/file/d/1eM8y9r59b5Jdsxg7jVQY-o5h9waRwQRu/view", file: "kruton/p1/TA1-102/ตอนย่อย/TA 1 102 ป.1 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569 ตอน 3 จาก 3.mp4" }
      ] }
    ]
  },
  {
    id: "TA 2 102 ป.1",
    child: "Sheva",
    label: "เชว่า · TA 2 102 (เทอม 2)",
    course: "TA 2 102 ป.1 คณิตศาสตร์ แข่งขัน ปี 2569",
    docGroups: [
      { title: "เอกสารเรียน (ใช้ทั้งคอร์ส)", docs: [
        { name: "ชุดที่ 1", link: "https://drive.google.com/file/d/1U9VIAfkBxP3WaUYZnGZqBQV4KVLBDddE/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เอกสารเรียน ชุดที่ 1.pdf" },
        { name: "ชุดที่ 2", link: "https://drive.google.com/file/d/1YPTBfKFiQUDYmEU-qxzm-G85lo_32-cr/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เอกสารเรียน ชุดที่ 2.pdf" },
        { name: "ชุดที่ 3", link: "https://drive.google.com/file/d/1I541ChpiAKmr-P9ii_Tf4fFJeBMnV3Ec/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เอกสารเรียน ชุดที่ 3.pdf" },
        { name: "ชุดที่ 4", link: "https://drive.google.com/file/d/1K04_CHvQs4E97g7mEqb9pwAVP1JWpdgG/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เอกสารเรียน ชุดที่ 4.pdf" },
        { name: "ชุดที่ 5", link: "https://drive.google.com/file/d/1X43Cq44fqWKAa94kVSNYx_q6eOQsAafc/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เอกสารเรียน ชุดที่ 5.pdf" },
        { name: "ชุดที่ 6", link: "https://drive.google.com/file/d/1bcPpumEaEozMfTdbZWBIw_Hf_7mF93Iv/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เอกสารเรียน ชุดที่ 6.pdf" }
      ] },
      { title: "การบ้านเสริม", docs: [
        { name: "การบ้านเสริม ครั้งที่ 1", link: "https://drive.google.com/file/d/1Zpk6ZjFTrl2uFMoH8asX82un0g0DTLcX/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 1 เอกสาร-การบ้านเสริม ครั้งที่ 1.pdf" },
        { name: "การบ้านเสริม ครั้งที่ 2", link: "https://drive.google.com/file/d/1focARnxL97ST9O4RPh6sYtV2CPfMRurT/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 2 เอกสาร-การบ้านเสริม ครั้งที่ 2.pdf" },
        { name: "การบ้านเสริม ครั้งที่ 3", link: "https://drive.google.com/file/d/1qjWt1YZMg9Io6ejaznaUQIDPrEgRQniG/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 3 เอกสาร-การบ้านเสริม ครั้งที่ 3.pdf" },
        { name: "การบ้านเสริม ครั้งที่ 4", link: "https://drive.google.com/file/d/12eVVrM09x7YqEFnmfb-Pt8KuEQ6r7QmL/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 4 เอกสาร-การบ้านเสริม ครั้งที่ 4.pdf" },
        { name: "การบ้านเสริม ครั้งที่ 5", link: "https://drive.google.com/file/d/1StLSZBh9ioevHKgRaXtdUqWAl-dEvvYE/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 5 เอกสาร-การบ้านเสริม ครั้งที่ 5.pdf" },
        { name: "การบ้านเสริม ครั้งที่ 6", link: "https://drive.google.com/file/d/1qafvsriXF1yk6gNhyw3ykcHl393VelgK/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 6 เอกสาร-การบ้านเสริม ครั้งที่ 6.pdf" },
        { name: "การบ้านเสริม ครั้งที่ 7", link: "https://drive.google.com/file/d/1vDkWKcpYDzaWNu4mh0GOEDLw7Ormgv65/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 7 เอกสาร-การบ้านเสริม ครั้งที่ 7.pdf" },
        { name: "การบ้านเสริม ครั้งที่ 8 (สัปดาห์หยุด 5 ก.ย.)", link: "https://drive.google.com/file/d/1LUUQAW5ehrBOXWLaPgQgJ6z-rDzTp3sn/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 7 เอกสาร-การบ้านเสริม ครั้งที่ 8 (สัปดาห์หยุด 5 ก.ย.).pdf" },
        { name: "การบ้านเสริม ครั้งที่ 9", link: "https://drive.google.com/file/d/1u-JpLxWQoP8GBstPQRqzCNOtWPU6Epis/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 8 เอกสาร-การบ้านเสริม ครั้งที่ 9.pdf" },
        { name: "การบ้านเสริม ครั้งที่ 10", link: "https://drive.google.com/file/d/1zBEjiqDn-4JejFHeXpgLh3XEtIsF6fJm/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 9 เอกสาร-การบ้านเสริม ครั้งที่ 10.pdf" }
      ] }
    ],
    episodes: [
      { no: 1, date: "18 ก.ค. 2569", learned: true, link: "https://drive.google.com/file/d/1PK1xOTPPvRntEHt14PV0vIb3zZaUrLZy/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 34, link: "https://drive.google.com/file/d/1SUBT5-s3RYCQzLYzrmGo77bjaNoImgCX/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 36, link: "https://drive.google.com/file/d/1BM7La3G-CO1BcyXnM7PQvVGPJTvBp0vN/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 31, link: "https://drive.google.com/file/d/1qKGF4TKxxPWtCNAR0Haa3UfnG1q1XOz_/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 2, date: "25 ก.ค. 2569", learned: true, link: "https://drive.google.com/file/d/1f2-SIrWoUzysoMXzZA6ZFSH04eYZE-y6/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 33, link: "https://drive.google.com/file/d/1iFcAqxFtp_NO2NLE9rUj9QJCAzMZkrya/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 33, link: "https://drive.google.com/file/d/1jumUQTRV52yHrWUsnZ1y8OMZot9cEMXz/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/1c9KfDT-CR-eQSCc_do6kq-UmTDEfVSH5/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 3, date: "1 ส.ค. 2569", link: "https://drive.google.com/file/d/1uuGBueG4k5LQ6vHXcFLEqXowNfPpdzpF/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1AkkdqcEWdMMx7Ul-hNutNO2gKV2BmiBB/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 26, link: "https://drive.google.com/file/d/1YnajgDCNzbJUdjeasEF8lKGPkSnhLoJZ/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/1NUEuw6xXVgQHfJ6dZ_aYfbOXILL0HfP5/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 4, date: "8 ส.ค. 2569", link: "https://drive.google.com/file/d/1hW5Wl5ggjdEugC-8PRtzj98xXczoh5z0/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1Mkz4HmXkfTRaZTOAWg-2uDCspNnoV3Uy/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 31, link: "https://drive.google.com/file/d/1sQNboMU9kiz_a2EXmTfAcFjndoRl-CpI/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 36, link: "https://drive.google.com/file/d/1YVkZKXDWY9J3Be-50L5-TogNHLzPS2KX/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 5, date: "15 ส.ค. 2569", link: "https://drive.google.com/file/d/1Ln_Bkzuk_10nVULzMJ9RMj2RROgo6G6I/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 37, link: "https://drive.google.com/file/d/1BH9cIPJaja4w7NEFIk5Goi2CCymr1XFM/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 36, link: "https://drive.google.com/file/d/1kjJF2_6LyM3SzFXlQAVBw77ACNH042OL/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 33, link: "https://drive.google.com/file/d/1iAIadu8d2i5hr4kek9Qo-Ofsnb-UHJv1/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 6, date: "22 ส.ค. 2569", link: "https://drive.google.com/file/d/1OQCAhI0L2BQ44MWYvqs7TgHpAsOq2n-N/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 33, link: "https://drive.google.com/file/d/1Gq14Fqth2CwAKo9eu_GT45nLhcm8GIii/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 37, link: "https://drive.google.com/file/d/1CqiFDQrrQUorJRVox6Pabph21sqX26Bq/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 32, link: "https://drive.google.com/file/d/12JVYV5PbFnf6rxKU746CuAn8FprWSJ-1/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 7, date: "29 ส.ค. 2569", link: "https://drive.google.com/file/d/1kwKNUCHf2BLt1dBz2HytzbZ-mxKvKAHN/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1euElhz0asNO7-Ffx713hDuZC-QN8z4MT/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 31, link: "https://drive.google.com/file/d/1p04OtGdN3pM5HLE6aDSuvezHWluf9aXv/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/18t7i9GnrfBzyCRJzv6xl-F6Yaxvl0wLN/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 8, date: "12 ก.ย. 2569", link: "https://drive.google.com/file/d/1roaN8ejE5TeIAHjhLUPso-xRsGIt-nyT/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 33, link: "https://drive.google.com/file/d/1rLS7sp5pOYuKJNRclzwbxoVjCWp_pZ2h/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 33, link: "https://drive.google.com/file/d/1KOKNIVDMM-tguruSgTwmYbxWYnMzz2Q8/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 34, link: "https://drive.google.com/file/d/1vJC6h1y2VsK6uasCg5Rn-l600fpfPeT1/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 9, date: "20 ก.ย. 2569", link: "https://drive.google.com/file/d/19-5OFhuI3qNseLMKhDTTcrHk1c3_wwr0/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1YjnjK7Ah1CUHj4bXD-Y56jGpUV21AymO/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 34, link: "https://drive.google.com/file/d/1WyF-Mg5Aw_hVGZX_ZjGE93rgzsTXd-_8/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 30, link: "https://drive.google.com/file/d/1p4B0RbcRE7Jkwor8teiDUq1fE9tvVEZi/view", file: "kruton/p1/TA2-102/ตอนย่อย/TA 2 102 ป.1 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569 ตอน 3 จาก 3.mp4" }
      ] }
    ]
  },
  {
    id: "TA 1 101 ป.2",
    child: "Kaka",
    label: "กาก้า · TA 1 101 (เทอม 1)",
    course: "TA 1 101 ป.2 คณิตศาสตร์ แข่งขัน ปี 2569",
    docGroups: [
      { title: "เอกสารเรียน (ใช้ทั้งคอร์ส)", docs: [
        { name: "ชุดที่ 1 รูปเรขาคณิต 2 มิติ และ 3 มิติ", link: "https://drive.google.com/file/d/1bt9PLgpbbdz74mCIY_N9LwNfYlwYSoH8/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เอกสารเรียนชุดที่ 1 รูปเรขาคณิต 2 มิติ และ 3 มิติ.pdf" },
        { name: "ชุดที่ 2 โจทย์ปัญหาหน่วยต่าง ๆ", link: "https://drive.google.com/file/d/146nEu35hMO6fGEfmAXg7Xa2pHY73tW6K/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เอกสารเรียนชุดที่ 2 โจทย์ปัญหาหน่วยต่าง ๆ.pdf" }
      ] },
      { title: "แบบฝึกเพิ่มเติม", docs: [
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 1", link: "https://drive.google.com/file/d/11kgEO3NLkpBBVV7Qb3jGNcE79h26wEBX/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 1.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 2", link: "https://drive.google.com/file/d/161XVRnkVPsmdpEyylBPqxVWi6Biqq--i/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 2.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 3", link: "https://drive.google.com/file/d/1t2Cqe0br08HsMoBu-hkujPCxjZsWgVM0/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 3.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 4", link: "https://drive.google.com/file/d/1m-ATonjPUtrsNPEqSh2n8L-jcDJLXxmY/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 4.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 5", link: "https://drive.google.com/file/d/15l2-Y15WEAh8VMtmwbWljpWw-iPSPqS3/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 5.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 6", link: "https://drive.google.com/file/d/1-inkBfhrb7gaID2Fr4YKKADOVyRgjpzX/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 6.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 7", link: "https://drive.google.com/file/d/1_PFJTj7l0qRzasxCSdfKQ39KIU6Xpt91/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 7.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 8", link: "https://drive.google.com/file/d/1e5fTrnV_w9S6A7JT0UVAM63XfnOqKunu/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 8.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 9", link: "https://drive.google.com/file/d/15wBY9ImWTtYn4uW3iXJwc7qty4z2dwmK/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 9.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 10", link: "https://drive.google.com/file/d/1xN4wumJOA42G1se44RSxHFY_sCOCIDp2/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 10.pdf" }
      ] }
    ],
    episodes: [
      { no: 1, date: "9 พ.ค. 2569", link: "https://drive.google.com/file/d/1Fp__FAc5-t9hyfDwV6DASgkG2BwpuDet/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 36, link: "https://drive.google.com/file/d/1scKtWGGhclPgnK7pV3a-QhxscEo5vva2/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 39, link: "https://drive.google.com/file/d/11cf7h8sxMvH_BsmHXU5-e_W_-G3-HpfW/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 42, link: "https://drive.google.com/file/d/1k-pUSH9M_Sq7etpIJc1Sn0qAixfd3IjZ/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 2, date: "16 พ.ค. 2569", link: "https://drive.google.com/file/d/10YVXmwDnJpJgXf00np651Y1FhI3ZSsKV/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 40, link: "https://drive.google.com/file/d/1utju2k9cdIOWr_fragxADeDR3WxiFoTb/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 39, link: "https://drive.google.com/file/d/1OVN9G8MLdEFbfXx8a2JWyuq0_DDZLOeC/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/1lB8aHDM5vQDQ_u3MofLAP4DxFlwommAI/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 3, date: "23 พ.ค. 2569", link: "https://drive.google.com/file/d/1n7aTJZ2tyTz5k8edpA-xtY5DdzgvnUMz/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 40, link: "https://drive.google.com/file/d/1LwOsEgRPqLqfR6y-V9WiRosnTKqubO6Q/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 40, link: "https://drive.google.com/file/d/1eDqHzE8YxvnPd2tZabHVrbA8rgjjGCeM/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 37, link: "https://drive.google.com/file/d/11xV6QncaOtPBspfOV3fQr-oc1HLRMlu7/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 4, date: "30 พ.ค. 2569", link: "https://drive.google.com/file/d/1iQ5I0CiHWvuAgm-jS3nL-trAbznnud9K/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 37, link: "https://drive.google.com/file/d/1KHi1NTllS9VZ_UgZ2_0iQSps1L5Kzfij/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 40, link: "https://drive.google.com/file/d/190w-SS8-SI4boc-O2g8c10atkSH7V4Rk/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 38, link: "https://drive.google.com/file/d/14UCxRoNCk8aEaqlMJcsOuqyXJbYGCKJ3/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 5, date: "13 มิ.ย. 2569", link: "https://drive.google.com/file/d/1bCj-RgJjE0iL3IvpkePTDhmGVrgAYXAf/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 36, link: "https://drive.google.com/file/d/12U-G4jp5qIW-NO_wSFs6Vlx8yoQ421FW/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 40, link: "https://drive.google.com/file/d/1_IGPD3W769xDlyWiNg4G5LBII-An3ORw/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 38, link: "https://drive.google.com/file/d/1DnPQx3kq7NdKZfa4J_c48ZfQa3P31li7/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 6, date: "20 มิ.ย. 2569", link: "https://drive.google.com/file/d/1yh63xYSIyMn7eMRSpXFHIdpTGyB56GTa/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 37, link: "https://drive.google.com/file/d/1KqdA24oWH9A1zaZRnLsGaHZ5HE-ZegbR/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 39, link: "https://drive.google.com/file/d/1ghKoIw0l_-PthQMl4s-J45pkjjHsxM9s/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 34, link: "https://drive.google.com/file/d/10jVsN8gbfLXz2tv1nAZmdvH3HcZtgskb/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 7, date: "27 มิ.ย. 2569", link: "https://drive.google.com/file/d/1AmzKifbA6qv-3jOQC0keDrxwQeaGIJwa/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 41, link: "https://drive.google.com/file/d/1Ncj_PzizAfxVVi_-8aYwurOhUHgSwfHr/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 38, link: "https://drive.google.com/file/d/101iBq-IssfWV4I594wGbDygfor2VZKRU/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/1F6PpZrWlJG_Cf-Sl0A4ppFdoe0h30Fh6/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 8, date: "4 ก.ค. 2569", link: "https://drive.google.com/file/d/1YEfCASupgViSFrE8HForu1w7uSJ5FryA/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 39, link: "https://drive.google.com/file/d/1PoKzbRUT4odJzCVuph_oYhpofbkTblsr/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 34, link: "https://drive.google.com/file/d/1H88yiU9WpCC1JZ5a-WVt_kkRW2BmSNWn/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 40, link: "https://drive.google.com/file/d/10rIZvM1zQZmjvGLF0mG3K-j-f7mvZ42b/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 9, date: "11 ก.ค. 2569", link: "https://drive.google.com/file/d/1W0eh3U66O5msEPYPu-icgw-uqWaAyrW-/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 37, link: "https://drive.google.com/file/d/1KQQitmWhq0E9mZuQnHS4-MmosV8Q8pBx/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 40, link: "https://drive.google.com/file/d/1mfpjAYOrirWb1lhez1fmNWk9it3cnDaS/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 36, link: "https://drive.google.com/file/d/1-R7BXxF_TfNic3z6VRzuwMoqq8pll2Cx/view", file: "kruton/p2/TA1-101/ตอนย่อย/TA 1 101 ป.2 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569 ตอน 3 จาก 3.mp4" }
      ] }
    ]
  },
  {
    id: "TA 2 101 ป.2",
    child: "Kaka",
    label: "กาก้า · TA 2 101 (เทอม 2)",
    course: "TA 2 101 ป.2 คณิตศาสตร์ แข่งขัน ปี 2569",
    docGroups: [
      { title: "เอกสารเรียน (ใช้ทั้งคอร์ส)", docs: [
        { name: "ชุดที่ 1", link: "https://drive.google.com/file/d/1C2lMAbEPuMziLp9Gi_C7II2CcR5d12x2/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เอกสารเรียนชุดที่ 1.pdf" },
        { name: "ชุดที่ 2", link: "https://drive.google.com/file/d/1Bku0gAJSz6pDgZnnzqloR63P2WUTTc8-/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เอกสารเรียนชุดที่ 2.pdf" },
        { name: "ชุดที่ 3", link: "https://drive.google.com/file/d/1tuXMbH_9Tgq8WYt0NTqPnojQ_yJmu8Qw/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เอกสารเรียนชุดที่ 3.pdf" }
      ] },
      { title: "แบบฝึกเพิ่มเติม", docs: [
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 1", link: "https://drive.google.com/file/d/1eZZ5NyHURoeReZ4jvjblhoJs7Emi3f4_/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 1.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 2", link: "https://drive.google.com/file/d/1h8_aUWwtFUy8A-DgqECPCDZSRL5AvmlB/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 2.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 3", link: "https://drive.google.com/file/d/17fZRDWUhK3yPojl9x3ZsDpapK-bOrxzz/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 3.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 4", link: "https://drive.google.com/file/d/1Gd7-YNBOS10dnbXRifztvSZVNQV2-c5M/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 4.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 5", link: "https://drive.google.com/file/d/1-qNbzAR8HfNBgVJ4KEzFOPN5o9VUgVis/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 5.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 6", link: "https://drive.google.com/file/d/1ID5RnPuPTnw1nZWc2Bk0FLhNC-ElWrcn/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 6.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 7", link: "https://drive.google.com/file/d/1aIOmWWF9UzQis9r23YNyIwHNY-qk_JZF/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 7.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 8", link: "https://drive.google.com/file/d/1znbwsgeygXF4cW8xKZ_Gc6vr8RpwuEkT/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 8.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 9", link: "https://drive.google.com/file/d/1EapwaQ1GNdfuYnHBTKnmqVJZbzKPoclm/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 9.pdf" },
        { name: "แบบฝึกเพิ่มเติม ชุดที่ 10", link: "https://drive.google.com/file/d/1f5x8VQcA6r7a7mVENK8TzgwbqMXQuNQ4/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 แบบฝึกเพิ่มเติมชุดที่ 10.pdf" }
      ] }
    ],
    episodes: [
      { no: 1, date: "18 ก.ค. 2569", learned: true, link: "https://drive.google.com/file/d/1ueKffgMFkz1ecR9AdMFAJlmoR7ABmkZY/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1tTT_0k-ef86HYnpARwoWaB_nocojJOpo/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 41, link: "https://drive.google.com/file/d/1pgwYRQSHJM2KPz9JojydsefFB1hOaYep/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 38, link: "https://drive.google.com/file/d/1E2W90k7Al1WcGDGhq2eI6UhUnORnPqrC/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 2, date: "25 ก.ค. 2569", learned: true, link: "https://drive.google.com/file/d/1tvm8RdlG0fY1r2EQdWZ3QLk4I7UV37bK/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 40, link: "https://drive.google.com/file/d/1tC7-f3I-Wo9kaUtGlU-1yM9eMSkGm5mv/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 35, link: "https://drive.google.com/file/d/1RVV3OJGtI9J2_wmBzjzVqmymag8sjkK9/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 39, link: "https://drive.google.com/file/d/121pyJ7feKeDJr3hrZWqXkmRlgD3NhurC/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 3, date: "1 ส.ค. 2569", link: "https://drive.google.com/file/d/1Nl09V0abkOvPrSYqmsFIoDbsX4My2y4m/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 40, link: "https://drive.google.com/file/d/1TnDWyC5ZKlQeVTp-I5v4bv1utBl7StNM/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 40, link: "https://drive.google.com/file/d/1L94e8AB1qCPclMPn5Nqs8TVw9-r21Xt3/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 36, link: "https://drive.google.com/file/d/1j21sBbhvP02za1fDggh1fQfRZubrAzTN/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 4, date: "8 ส.ค. 2569", link: "https://drive.google.com/file/d/1Zf-kEM939L5vthiIKd7bKYF4KLinfw8X/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 41, link: "https://drive.google.com/file/d/1UFD-byYEjKlN71voLhwDgYHrtnxryfer/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 33, link: "https://drive.google.com/file/d/1XKUGXG9lD8stifKZUquN8IF-rRN5T-LY/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 40, link: "https://drive.google.com/file/d/1e8Z7oYBLKUsnCZdto7U4mFl3CAm54nN4/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 5, date: "15 ส.ค. 2569", link: "https://drive.google.com/file/d/1YmMPTMjETjhq9mlloBYqF33VZYkSQ3mu/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 38, link: "https://drive.google.com/file/d/15LMRy9XQpkve006cK12a-tlAKLX2Ua0e/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 41, link: "https://drive.google.com/file/d/1qb1bxLk6zpgXDh8xV4s83q-oTBlDeWIa/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/1fKKLnm0Urxl2u_f0lPEt28_H2nu3-EpO/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 6, date: "22 ส.ค. 2569", link: "https://drive.google.com/file/d/15lX6t6WGBX0n3FMRWwKaYpCpXQ3vMeYk/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 39, link: "https://drive.google.com/file/d/1zGTlIzP2OZsNkNq9DpIu9onUydfj--CK/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 37, link: "https://drive.google.com/file/d/1SR8pIqeNIB34o3-gCHnPnut7hZtZ_Dvf/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 40, link: "https://drive.google.com/file/d/154uOeMNyC4H0ZP79eCmVNVIHiVUqM1ER/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 7, date: "29 ส.ค. 2569", link: "https://drive.google.com/file/d/1h6XtLnHRQxOPY50saEM0rnwuOkwt1QpD/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569.mp4", docs: [], parts: [
        { no: 1, min: 35, link: "https://drive.google.com/file/d/1lZfWSGbpJRd2SV6UMNp7JHTx0V-2egYz/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 39, link: "https://drive.google.com/file/d/1B8eF5BwRdvlg_sxfQoU9yguNYFUMJPMI/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 39, link: "https://drive.google.com/file/d/1PEorrLE4WyMQScC639rgXpPwqDZgOeD4/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 8, date: "12 ก.ย. 2569", link: "https://drive.google.com/file/d/18TKYfNJsoWS1sIrH6f0g_cipfhoaWREk/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 34, link: "https://drive.google.com/file/d/1SNwtB0cPPXVRVpNnxlpUSuWTUg-aF8h4/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 40, link: "https://drive.google.com/file/d/1zy26_wX94UwPeq2tddhm2fhvrVW8r1xR/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 36, link: "https://drive.google.com/file/d/1oABXOdl9ObCONto32GJrRSSYqe7ZmhMd/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569 ตอน 3 จาก 3.mp4" }
      ] },
      { no: 9, date: "20 ก.ย. 2569", link: "https://drive.google.com/file/d/1ecPVB34zRlRPUiXfVOLGebn4A_AOTD_x/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569.mp4", docs: [], parts: [
        { no: 1, min: 39, link: "https://drive.google.com/file/d/1GiVE0QRVl1opwAY-xcZUBgxkOpfKu_Pz/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569 ตอน 1 จาก 3.mp4" },
        { no: 2, min: 39, link: "https://drive.google.com/file/d/1BHhQyTbn69ZOzjIYz8JSjVYHOoFEDZGU/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569 ตอน 2 จาก 3.mp4" },
        { no: 3, min: 35, link: "https://drive.google.com/file/d/17WwarcmLRwosmo_0FjdTplmG6mNsrWai/view", file: "kruton/p2/TA2-101/ตอนย่อย/TA 2 101 ป.2 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569 ตอน 3 จาก 3.mp4" }
      ] }
    ]
  }
];
