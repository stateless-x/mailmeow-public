// Sentences in docs/copy/privacy-product.md that carried a [legal check] (legal view needed) or [?] (fact not settled) marker.
// A segment is the text since the previous marker (Thai) or the last sentence before it (English), marker removed.
// The visible page never shows a marker. A test checks every entry still appears in the copy.
export const PRIVACY_PRODUCT_MARKERS = {
  legalCheck: {
    th: [
      'ข้อมูลบัญชีของคุณ คือ อีเมล session ลิงก์เข้าสู่ระบบ และคำเชิญ เราเป็นผู้ควบคุมข้อมูลส่วนบุคคล',
      'อีเมลที่คุณส่งและข้อมูลของผู้รับ Workspace ของคุณ (คนหรือธุรกิจที่ใช้ Workspace นั้นส่งอีเมล) เป็นผู้ควบคุมข้อมูลส่วนบุคคล เราเป็นผู้ประมวลผลข้อมูลส่วนบุคคล และใช้ข้อมูลนี้แค่เพื่อส่งอีเมลและติดตามสถานะการส่งให้คุณ',
      'ถ้าคุณได้รับอีเมลที่ส่งผ่าน mailmeow และอยากขอดูหรือขอลบข้อมูลของตัวเอง ให้ติดต่อคนหรือธุรกิจที่ส่งอีเมลนั้นมา',
      'หลังลบเนื้อหาอีเมลแล้ว ที่อยู่ผู้รับ ชื่อเรื่อง และสถานะการส่งยังอยู่ในประวัติของ Workspace 90 วัน แล้วเราลบ หรือลบเร็วกว่านั้นถ้าเจ้าของลบ Workspace',
      'AWS อยู่ที่สิงคโปร์ ข้อมูลอีเมลจึงออกไปนอกประเทศไทย',
      'ถ้าเราต้องเปิดดูอีเมลหรือผู้รับของ Workspace ไหนเพื่อช่วยแก้ปัญหา ต้องบันทึกเหตุผลก่อนทุกครั้ง ทุกครั้งที่เปิดดูจะลงบันทึกไว้ และเจ้าของ Workspace นั้นเห็นบันทึกนี้ได้',
      'เจ้าของลบ Workspace ได้ใน dashboard โดยพิมพ์ชื่อ Workspace เพื่อยืนยัน ภายใน 7 วัน เราจะลบข้อมูลทั้งหมดของ Workspace นั้น ได้แก่ อีเมล สถานะการส่ง API key ทุกอัน webhook ทุกตัว และรายชื่อผู้รับที่ถูกบล็อก',
    ],
    en: [
      'For your account (your email, sessions, sign-in links and invites), we are the data controller.',
      'We process that data only to deliver your email and track its delivery.',
      'If you received an email sent through mailmeow and want to see or delete your data, contact the person or business that sent it.',
      "After the body is deleted, the recipient addresses, subject and delivery events stay in the workspace's history for 90 days, then we delete them, or sooner if an owner deletes the workspace.",
      'AWS is in Singapore, so email data leaves Thailand.',
      "Every such access is logged, and that workspace's owner can see it.",
      'Within 7 days we purge all of its data: emails, delivery events, keys, webhooks and blocked addresses.',
    ],
  },
  unsettled: {
    th: [
      'Railway: รัน API และฐานข้อมูล ข้อมูลเก็บอยู่ใน region ของ Railway',
      'บันทึกการทำงานของแอดมิน:',
      'ข้อมูลสำรอง (backup):',
    ],
    en: [
      "Railway: hosts the API and the database, in Railway's region",
      'Admin audit log:',
      'Backups:',
    ],
  },
};
