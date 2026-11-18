// Verbatim from docs/copy/migrate.md.
import type { Bi } from '../types';
import type { Faq } from './landing';

export const MIGRATE = {
  h1: { th: 'ย้ายจาก Resend มา mailmeow', en: 'Switch from Resend to mailmeow' },
  lead: {
    th: 'แอปที่ส่งอีเมลผ่าน Resend อยู่ ย้ายมา mailmeow ได้โดยแทบไม่ต้องแก้โค้ด ยืนยันโดเมน เปลี่ยนค่าใน .env 2 ตัว แล้วลองส่ง อยากกลับก็แค่เปลี่ยนค่ากลับ ตอนนี้ mailmeow ยังไม่เปิดให้สมัคร ลงชื่อรอใช้ได้ก่อน',
    en: "If your app sends email through Resend, you can move it to mailmeow with almost no code changes. Verify your domain, change two env vars, then send a test. Want to go back? Change them back. mailmeow isn't open for signup yet, so join the waitlist first.",
  },
  audience: {
    heading: { th: 'หน้านี้เหมาะกับใคร', en: 'Who this is for' },
    body: {
      th: 'คนที่ส่งอีเมลจากแอปด้วยแพ็กเกจ `resend` บน Node.js หรือเรียก API ของ Resend ตรง ๆ และอยากลอง mailmeow โดยไม่ต้องเขียนโค้ดส่งอีเมลใหม่',
      en: 'Anyone sending email from their app with the `resend` package on Node.js, or by calling Resend\'s API directly, who wants to try mailmeow without rewriting their email code.',
    },
  },
  steps: {
    heading: { th: 'ย้ายใน 3 ขั้น', en: 'Switch in three steps' },
    one: {
      title: { th: 'ยืนยันโดเมนกับ mailmeow', en: 'Verify your domain on mailmeow' },
      body: {
        th: 'ค่า DNS ที่ตั้งไว้กับ Resend ไม่ย้ายตามมา ต้องเพิ่มค่า DKIM และ SPF ของ mailmeow ให้โดเมนอีกครั้ง ค่าเดิมของ Resend ยังไม่ต้องลบ ถ้ามี DMARC อยู่แล้ว ใช้ของเดิมต่อได้',
        en: "Your Resend DNS records don't carry over. Add mailmeow's DKIM and SPF records; you don't need to remove Resend's yet. Already have a DMARC record? Keep it.",
      },
    },
    two: {
      title: { th: 'เปลี่ยนค่าใน .env 2 ตัว', en: 'Change two env vars' },
      body: {
        th: 'สร้าง API key ของ mailmeow แล้วเปลี่ยนค่า 2 ตัวนี้ แพ็กเกจ `resend` อ่าน `RESEND_BASE_URL` เอง หรือจะส่ง `baseUrl` ตอนสร้าง client ก็ได้',
        en: 'Create a mailmeow API key, then change these two values. The `resend` package reads `RESEND_BASE_URL` on its own, or you can pass `baseUrl` to its constructor.',
      },
      code: 'RESEND_BASE_URL=https://api.mailmeow.dev\nRESEND_API_KEY=mm_live_xxxxxxxxxxxx',
      note: {
        th: 'ถ้าเรียก API ตรง เปลี่ยน URL จาก `https://api.resend.com` เป็น `https://api.mailmeow.dev` แล้วใช้ API key ของ mailmeow ข้อมูลที่ส่งและได้กลับมาเหมือนเดิม',
        en: 'Calling the API directly? Change the URL from `https://api.resend.com` to `https://api.mailmeow.dev` and use a mailmeow key. Request and response bodies stay the same.',
      },
    },
    three: {
      title: { th: 'ลองส่ง 1 ฉบับ', en: 'Send a test' },
      body: {
        th: 'ส่งอีเมลหาตัวเองด้วยโค้ดเดิม แล้วเช็กสถานะผ่าน `GET /emails/{id}` ว่าส่งแล้วหรือถึงแล้ว อยากลองก่อนยืนยันโดเมน ใช้ API key ที่ขึ้นต้นด้วย `mm_test_` ได้ อีเมลจะไม่ไปถึงใครจริง',
        en: 'Send one email to yourself with your existing code, then check its status with `GET /emails/{id}`. Want to try before verifying your domain? Use a `mm_test_` key: nothing reaches a real inbox.',
      },
    },
  },
  same: {
    heading: { th: 'อะไรที่เหมือนเดิม', en: 'What stays the same' },
    items: [
      {
        th: '`POST /emails` `GET /emails` และ `GET /emails/{id}` รับและตอบแบบเดียวกับ Resend',
        en: '`POST /emails`, `GET /emails` and `GET /emails/{id}` take and return the same shapes as Resend.',
      },
      {
        th: 'error มีหน้าตาแบบเดียวกับของ Resend โค้ดที่จัดการ error อยู่แล้วใช้ต่อได้',
        en: "Errors use Resend's shape, so your existing error handling keeps working.",
      },
      {
        th: 'ใช้ idempotency key กันส่งซ้ำได้เหมือนเดิม',
        en: "Idempotency keys work the same way, so a retry doesn't send twice.",
      },
      {
        th: 'ลายเซ็นใช้แบบเดียวกับ Svix และข้อมูลที่ส่งมาหน้าตาเหมือนเดิม โค้ดตรวจลายเซ็นใช้ต่อได้ แค่เพิ่ม endpoint ใน mailmeow อีกครั้ง แล้วใช้ secret `whsec_` ตัวใหม่',
        en: 'Signatures are Svix-compatible and payloads have the same shape, so your verifier keeps working. Add your endpoint again in mailmeow and use the new `whsec_` secret.',
      },
    ] as Bi[],
  },
  unsupported: {
    heading: { th: 'อะไรที่ยังไม่รองรับ', en: 'Not supported yet' },
    intro: {
      th: 'ถ้าส่งฟิลด์เหล่านี้มา mailmeow จะตอบ 422 พร้อมบอกชื่อฟิลด์ ไม่ส่งอีเมลแบบเงียบ ๆ',
      en: 'If you send these fields, mailmeow returns a `422` that names the field. It never drops them silently.',
    },
    items: [
      {
        th: '`attachments` (ไฟล์แนบ) `scheduled_at` (ตั้งเวลาส่ง) `template` และ `topic_id`',
        en: '`attachments`, `scheduled_at`, `template` and `topic_id`',
      },
      {
        th: 'ยังไม่นับการเปิดอ่านและการคลิก ยังไม่มีการส่งทีละหลายฉบับ (batch) Audiences และ Broadcasts API',
        en: "Opens and clicks aren't tracked yet. Batch send, Audiences and the Broadcasts API aren't available yet.",
      },
      {
        th: 'อีเมลทดสอบอย่าง `delivered@resend.dev` ใช้ไม่ได้ ให้ใช้ API key `mm_test_` แทน',
        en: "Test addresses like `delivered@resend.dev` don't apply. Use a `mm_test_` key instead.",
      },
    ] as Bi[],
  },
  back: {
    heading: { th: 'อยากกลับไป Resend', en: 'Switching back' },
    body: {
      th: 'เปลี่ยนค่าใน .env 2 ตัวกลับเป็นของ Resend ส่วนอื่นไม่ต้องแก้',
      en: 'Set the two env vars back to your Resend values. Nothing else changes.',
    },
  },
  cta: {
    heading: { th: 'อยากลองย้ายมาตอนเปิด', en: 'Want to switch when it opens?' },
    body: { th: 'ลงชื่อไว้ เปิดให้ใช้เมื่อไร จะส่งอีเมลไปบอก', en: "Join the waitlist and we'll email you when it opens." },
    button: { th: 'ลงชื่อรอใช้', en: 'Join the waitlist' },
    underButton: { th: 'ไม่ต้องใช้บัตร', en: 'No card needed' },
  },
  // copy/migrate.md names no FAQ heading; reuses landing.md §8.
  faqHeading: { th: 'คำถามที่พบบ่อย', en: 'Questions people ask' },
  faq: [
    {
      q: { th: 'ต้องแก้โค้ดไหม', en: 'Do I need to change my code?' },
      a: {
        th: 'ส่วนใหญ่ไม่ต้อง ถ้าใช้ SDK Node.js ของ Resend หรือเรียก API ตรง เปลี่ยนแค่ base URL กับ API key ถ้าโค้ดส่งฟิลด์ที่ยังไม่รองรับ จะได้ 422 ที่บอกชื่อฟิลด์ ต้องเอาฟิลด์นั้นออกก่อน',
        en: "Usually not. With Resend's Node.js SDK or direct API calls, you change only the base URL and key. If your code sends a field we don't support yet, you get a `422` naming it, and you need to remove that field.",
      },
    },
    {
      q: { th: 'ค่า DNS ที่ตั้งกับ Resend ใช้ต่อได้ไหม', en: 'Do my Resend DNS records still work?' },
      a: {
        th: 'ไม่ได้ ต้องยืนยันโดเมนกับ mailmeow แล้วเพิ่มค่า DKIM และ SPF ของ mailmeow ส่วน DMARC ใช้ของเดิมได้',
        en: 'No. Verify your domain on mailmeow and add its DKIM and SPF records. Your DMARC record can stay as it is.',
      },
    },
    {
      q: { th: 'SDK ภาษาอื่นของ Resend ใช้ได้ไหม', en: "Do Resend's other SDKs work?" },
      a: {
        th: 'ที่ทดสอบแล้วคือ SDK Node.js ภาษาอื่นยังไม่ได้ทดสอบ แต่ API รับคำขอแบบเดียวกับ Resend ถ้าลองแล้วติด บอกเราที่ {contact}',
        en: "We've tested the Node.js SDK. Other languages aren't tested yet, but the API takes the same requests as Resend. If something breaks, tell us at {contact}.",
      },
    },
  ] as Faq[],
};
