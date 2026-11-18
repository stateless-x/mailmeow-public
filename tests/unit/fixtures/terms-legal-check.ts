// Sentences in docs/copy/terms.md that carried a [legal check] marker (`unsettled` is empty: terms.md has no [?]).
// A segment is the text since the previous marker (Thai) or the last sentence before it (English), marker removed.
// The visible page never shows a marker. A test checks every entry still appears in the copy.
export const TERMS_MARKERS = {
  legalCheck: {
    th: [
      'ข้อตกลงนี้ใช้กับทุกคนที่เข้าร่วม Workspace ใน mailmeow เมื่อกดรับคำเชิญเข้า Workspace ถือว่าคุณยอมรับข้อตกลงนี้',
      'ภูรินท์ บุรีวงศ์ (Pooh) ให้บริการ mailmeow ในฐานะบุคคลธรรมดา',
      'ช่วงทดลองนี้เราไม่รับประกันว่าระบบจะใช้ได้ตลอดเวลา ระบบอาจล่มหรือส่งช้าได้',
      'อีเมลแคมเปญต้องใส่ header `List-Unsubscribe` และ `List-Unsubscribe-Post` ด้วย Gmail และ Outlook จะได้แสดงปุ่มยกเลิกรับข่าวให้ผู้รับ ถ้ามีคนกดยกเลิก ต้องหยุดส่งแคมเปญให้คนนั้นภายใน 2 วัน',
      'เนื้อหาที่ผิดกฎหมาย รวมถึงเนื้อหาที่ขัดกับกฎหมายไทย',
      'จำนวนส่งต่อวันและต่อเดือน: Workspace ใหม่ทุกแห่ง รวมถึงแพ็กเกจที่จ่ายเงิน เริ่มที่วันละ 100 ฉบับ และเราเพิ่มให้ได้ แต่ละแพ็กเกจมีจำนวนต่อเดือนของตัวเอง แพ็กเกจ Free จะหยุดส่งเมื่อถึงจำนวนต่อวันหรือต่อเดือน เจ้าของจะได้อีเมลแจ้ง และเห็นแถบแจ้งใน dashboard แพ็กเกจที่จ่ายเงินส่งเกินจำนวนต่อเดือนได้ และจ่ายค่าส่วนเกิน',
      'เราหยุดส่งเองได้ด้วย ถ้าเห็นว่า Workspace ใช้งานผิดข้อตกลงนี้ เราต้องบันทึกเหตุผลทุกครั้ง และจะส่งอีเมลบอกเหตุผลให้เจ้าของ Workspace',
      'ถ้าใช้งานผิดข้อตกลงนี้อย่างร้ายแรง เช่น ส่ง phishing หรือมัลแวร์ เราอาจปิด Workspace นั้น',
      'นโยบายความเป็นส่วนตัวอยู่ที่ /privacy ครอบคลุมทั้งข้อมูลจากฟอร์มลงชื่อรอใช้ และข้อมูลของคนที่ใช้ dashboard และ API ข้อมูลใน Workspace เป็นไปตามข้อด้านล่างนี้',
      'เนื้อหาอีเมลเก็บไว้ 7 วันในแพ็กเกจ Free และ 30 วันในแพ็กเกจที่จ่ายเงิน ส่วนข้อมูลอื่นของอีเมล ได้แก่ ที่อยู่ผู้รับ ชื่อเรื่อง และสถานะการส่ง เก็บไว้ 90 วัน จากนั้นเราลบจริง ไม่ได้แค่ซ่อน ผู้รับที่ถูกบล็อกเก็บไว้จนกว่าจะเอาออก',
      'เจ้าของลบ Workspace ได้ โดยพิมพ์ชื่อ Workspace เพื่อยืนยัน ภายใน 7 วัน เราจะลบข้อมูลทั้งหมดของ Workspace นั้น ได้แก่ อีเมล ประวัติสถานะ API key ทุกอัน webhook ทุกตัว และรายชื่อผู้รับที่ถูกบล็อก',
      'หน้าจอแอดมินของเราเห็นแค่ตัวเลขรวม ถ้าเราต้องเปิดดูอีเมลหรือผู้รับของ Workspace ไหนเพื่อช่วยแก้ปัญหา ต้องบันทึกเหตุผลก่อนทุกครั้ง ทุกครั้งที่เปิดดูจะลงบันทึกไว้ และเจ้าของ Workspace นั้นเห็นบันทึกนี้ได้',
      'คุณรับผิดชอบทุกอย่างที่ส่งด้วย API key ของคุณ',
      'ถ้าเราแก้ข้อตกลงนี้ เราจะเปลี่ยนเวอร์ชันและวันที่ด้านบน และส่งอีเมลบอกเจ้าของทุก Workspace ก่อนข้อตกลงใหม่มีผล',
      'ถ้ายังใช้ mailmeow ต่อหลังวันนั้น ถือว่ายอมรับข้อตกลงใหม่',
      'ข้อตกลงนี้ใช้กฎหมายไทย',
    ],
    en: [
      'When you accept a workspace invite, you accept these terms.',
      'mailmeow is run by Pooh (Purin Buriwong), as an individual.',
      'The service may go down or send late.',
      'When someone unsubscribes, stop sending them campaigns within 2 days.',
      'Illegal content, including anything against Thai law',
      'Paid plans can send past the monthly limit and pay for the extra emails.',
      'We must record a reason each time, and we email the workspace owner that reason.',
      'For serious abuse, such as sending phishing or malware, we may close the workspace.',
      'Data in your workspace is handled as set out below.',
      'Blocked addresses are kept until they are removed.',
      'Within 7 days we purge all of its data: emails, events, keys, webhooks and blocked addresses.',
      "Every such access is logged, and that workspace's owner can see it.",
      'You are responsible for everything sent with your keys.',
      'If we change these terms, we change the version and date at the top and email every workspace owner before the new version takes effect.',
      'If you keep using mailmeow after that date, you accept the new version.',
      'These terms are governed by the laws of Thailand.',
    ],
  },
  unsettled: {
    th: [
    ],
    en: [
    ],
  },
};
