/* รายการคลิป + เอกสาร คอร์สครูต้น — ⚠️ ไฟล์นี้สร้างอัตโนมัติด้วย tools/kruton_build.py ห้ามแก้มือ
 *
 * ไฟล์จริงอยู่ที่ N:\My Drive\ACP\kruton (บัญชี yuratit · แชร์อ่านให้ kakasheva.platon ที่ iPad ลูก login)
 * id = รหัสคอร์ส · ความคืบหน้าผูกกับ id นี้ ห้ามเปลี่ยนหลังลูกเริ่มใช้
 * learned = true → เรียนสดไปแล้ว ขึ้นเป็นดูจบตั้งแต่แรก
 * docGroups = เอกสารระดับคอร์ส · parent: true = กล่องพ่อแม่ (เฉลย)
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
      { no: 1, date: "9 พ.ค. 2569", link: "https://drive.google.com/file/d/12GvqMuCG_2TXnIOnKJY7xjqcxdjRDLmL/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569.mp4", docs: [] },
      { no: 2, date: "16 พ.ค. 2569", link: "https://drive.google.com/file/d/1m0pHZQwhqiEEmiKrwjGQ2h2TM7tIpxMb/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569.mp4", docs: [] },
      { no: 3, date: "23 พ.ค. 2569", link: "https://drive.google.com/file/d/1cTwXDxcM8MXw9mSsl5ENAiRcKOHDhY6b/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569.mp4", docs: [] },
      { no: 4, date: "30 พ.ค. 2569", link: "https://drive.google.com/file/d/1hMQO9yRjmSjWiHhVdTj6t9YFWSw-8vGF/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569.mp4", docs: [] },
      { no: 5, date: "13 มิ.ย. 2569", link: "https://drive.google.com/file/d/1oax65qBqWt1SGjV7NvgTRwwuTzV5y-3Y/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569.mp4", docs: [] },
      { no: 6, date: "20 มิ.ย. 2569", link: "https://drive.google.com/file/d/1hB5Ux7Ob5hWsJidENBjbLuSzHN1cjNqD/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569.mp4", docs: [] },
      { no: 7, date: "27 มิ.ย. 2569", link: "https://drive.google.com/file/d/1OitZZHFltVOyOBkIEokIAjoBLD-oR67n/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569.mp4", docs: [] },
      { no: 8, date: "4 ก.ค. 2569", link: "https://drive.google.com/file/d/1PEHbQ6D1T-QfjBE0PolBjQzMaPHQkqnl/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569.mp4", docs: [] },
      { no: 9, date: "11 ก.ค. 2569", link: "https://drive.google.com/file/d/1WH28DetT6L3ypc8HtZOPMb4x0-UifZKU/view", file: "kruton/p1/TA1-102/TA 1 102 ป.1 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569.mp4", docs: [] }
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
      { no: 1, date: "18 ก.ค. 2569", learned: true, link: "https://drive.google.com/file/d/1PK1xOTPPvRntEHt14PV0vIb3zZaUrLZy/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569.mp4", docs: [] },
      { no: 2, date: "25 ก.ค. 2569", learned: true, link: "https://drive.google.com/file/d/1f2-SIrWoUzysoMXzZA6ZFSH04eYZE-y6/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569.mp4", docs: [] },
      { no: 3, date: "1 ส.ค. 2569", link: "https://drive.google.com/file/d/1uuGBueG4k5LQ6vHXcFLEqXowNfPpdzpF/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569.mp4", docs: [] },
      { no: 4, date: "8 ส.ค. 2569", link: "https://drive.google.com/file/d/1hW5Wl5ggjdEugC-8PRtzj98xXczoh5z0/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569.mp4", docs: [] },
      { no: 5, date: "15 ส.ค. 2569", link: "https://drive.google.com/file/d/1Ln_Bkzuk_10nVULzMJ9RMj2RROgo6G6I/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569.mp4", docs: [] },
      { no: 6, date: "22 ส.ค. 2569", link: "https://drive.google.com/file/d/1OQCAhI0L2BQ44MWYvqs7TgHpAsOq2n-N/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569.mp4", docs: [] },
      { no: 7, date: "29 ส.ค. 2569", link: "https://drive.google.com/file/d/1kwKNUCHf2BLt1dBz2HytzbZ-mxKvKAHN/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569.mp4", docs: [] },
      { no: 8, date: "12 ก.ย. 2569", link: "https://drive.google.com/file/d/1roaN8ejE5TeIAHjhLUPso-xRsGIt-nyT/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569.mp4", docs: [] },
      { no: 9, date: "20 ก.ย. 2569", link: "https://drive.google.com/file/d/19-5OFhuI3qNseLMKhDTTcrHk1c3_wwr0/view", file: "kruton/p1/TA2-102/TA 2 102 ป.1 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569.mp4", docs: [] }
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
      { no: 1, date: "9 พ.ค. 2569", link: "https://drive.google.com/file/d/1Fp__FAc5-t9hyfDwV6DASgkG2BwpuDet/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 1 วันที่ 9 พฤษภาคม 2569.mp4", docs: [] },
      { no: 2, date: "16 พ.ค. 2569", link: "https://drive.google.com/file/d/10YVXmwDnJpJgXf00np651Y1FhI3ZSsKV/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 2 วันที่ 16 พฤษภาคม 2569.mp4", docs: [] },
      { no: 3, date: "23 พ.ค. 2569", link: "https://drive.google.com/file/d/1n7aTJZ2tyTz5k8edpA-xtY5DdzgvnUMz/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 3 วันที่ 23 พฤษภาคม 2569.mp4", docs: [] },
      { no: 4, date: "30 พ.ค. 2569", link: "https://drive.google.com/file/d/1iQ5I0CiHWvuAgm-jS3nL-trAbznnud9K/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 4 วันที่ 30 พฤษภาคม 2569.mp4", docs: [] },
      { no: 5, date: "13 มิ.ย. 2569", link: "https://drive.google.com/file/d/1bCj-RgJjE0iL3IvpkePTDhmGVrgAYXAf/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 5 วันที่ 13 มิถุนายน 2569.mp4", docs: [] },
      { no: 6, date: "20 มิ.ย. 2569", link: "https://drive.google.com/file/d/1yh63xYSIyMn7eMRSpXFHIdpTGyB56GTa/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 6 วันที่ 20 มิถุนายน 2569.mp4", docs: [] },
      { no: 7, date: "27 มิ.ย. 2569", link: "https://drive.google.com/file/d/1AmzKifbA6qv-3jOQC0keDrxwQeaGIJwa/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 7 วันที่ 27 มิถุนายน 2569.mp4", docs: [] },
      { no: 8, date: "4 ก.ค. 2569", link: "https://drive.google.com/file/d/1YEfCASupgViSFrE8HForu1w7uSJ5FryA/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 8 วันที่ 4 กรกฎาคม 2569.mp4", docs: [] },
      { no: 9, date: "11 ก.ค. 2569", link: "https://drive.google.com/file/d/1W0eh3U66O5msEPYPu-icgw-uqWaAyrW-/view", file: "kruton/p2/TA1-101/TA 1 101 ป.2 เรียนครั้งที่ 9 วันที่ 11 กรกฎาคม 2569.mp4", docs: [] }
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
      { no: 1, date: "18 ก.ค. 2569", learned: true, link: "https://drive.google.com/file/d/1ueKffgMFkz1ecR9AdMFAJlmoR7ABmkZY/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 1 วันที่ 18 กรกฎาคม 2569.mp4", docs: [] },
      { no: 2, date: "25 ก.ค. 2569", learned: true, link: "https://drive.google.com/file/d/1tvm8RdlG0fY1r2EQdWZ3QLk4I7UV37bK/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 2 วันที่ 25 กรกฎาคม 2569.mp4", docs: [] },
      { no: 3, date: "1 ส.ค. 2569", link: "https://drive.google.com/file/d/1Nl09V0abkOvPrSYqmsFIoDbsX4My2y4m/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 3 วันที่ 1 สิงหาคม 2569.mp4", docs: [] },
      { no: 4, date: "8 ส.ค. 2569", link: "https://drive.google.com/file/d/1Zf-kEM939L5vthiIKd7bKYF4KLinfw8X/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 4 วันที่ 8 สิงหาคม 2569.mp4", docs: [] },
      { no: 5, date: "15 ส.ค. 2569", link: "https://drive.google.com/file/d/1YmMPTMjETjhq9mlloBYqF33VZYkSQ3mu/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 5 วันที่ 15 สิงหาคม 2569.mp4", docs: [] },
      { no: 6, date: "22 ส.ค. 2569", link: "https://drive.google.com/file/d/15lX6t6WGBX0n3FMRWwKaYpCpXQ3vMeYk/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 6 วันที่ 22 สิงหาคม 2569.mp4", docs: [] },
      { no: 7, date: "29 ส.ค. 2569", link: "https://drive.google.com/file/d/1h6XtLnHRQxOPY50saEM0rnwuOkwt1QpD/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 7 วันที่ 29 สิงหาคม 2569.mp4", docs: [] },
      { no: 8, date: "12 ก.ย. 2569", link: "https://drive.google.com/file/d/18TKYfNJsoWS1sIrH6f0g_cipfhoaWREk/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 8 วันที่ 12 กันยายน 2569.mp4", docs: [] },
      { no: 9, date: "20 ก.ย. 2569", link: "https://drive.google.com/file/d/1ecPVB34zRlRPUiXfVOLGebn4A_AOTD_x/view", file: "kruton/p2/TA2-101/TA 2 101 ป.2 เรียนครั้งที่ 9 วันที่ 20 กันยายน 2569.mp4", docs: [] }
    ]
  }
];
