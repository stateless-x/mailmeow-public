// Verbatim from docs/copy/landing.md. Markers: **bold** `code` ==highlight== [text](url|@slug) {price} {contact} {LAST_VERIFIED}.
// If a line looks wrong, report it; do not edit it here.
import type { Bi } from '../types';

export interface Faq {
  q: Bi;
  a: Bi;
}

/** §9 "What is mailmeow": the same text on the landing and as the lead of /about. */
export const WHAT_IS: Bi = {
  th: 'mailmeow คือ email API ที่เรียกใช้แบบเดียวกับ Resend SDK Node.js ของ Resend เลยใช้ต่อได้ แค่ยืนยันโดเมนกับ mailmeow แล้วเปลี่ยน base URL กับ API key ส่งอีเมลผ่าน AWS SES ที่สิงคโปร์ และเช็กผ่าน API ได้ว่าแต่ละฉบับส่งแล้ว ถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม ภูรินท์ บุรีวงศ์ (Pooh) ทำไว้ใช้กับแอปของตัวเองก่อน และอยากเปิดให้คนไทยที่ทำแอปกับ AI ใช้ด้วย ตอนนี้ยังไม่เปิดให้สมัคร ลงชื่อรอใช้ได้ก่อน',
  en: "mailmeow is an email API that you call the same way as Resend, so Resend's Node.js SDK keeps working. Verify your domain on mailmeow, then change the base URL and API key. It sends through AWS SES in Singapore, and the API tells you whether each email was sent, delivered, bounced or marked as spam. Pooh (Purin Buriwong) built it for his own apps first and wants to open it to Thai builders who make apps with AI. It is not open for signup yet; join the waitlist.",
};

export const LANDING = {
  hero: {
    eyebrow: { th: 'Email API ที่ใช้ SDK Node.js ของ Resend ได้', en: "Email API that works with Resend's Node.js SDK" },
    h1: { th: 'ส่งอีเมลจากแอปได้จริง ==ไม่ต้องเก่ง DNS==', en: 'Email from your app, ==without the DNS headache.==' },
    sub: {
      th: 'ลองด้วย API key ทดสอบได้ ไม่มีอีเมลหลุดไปถึงคนจริง ส่งผ่าน AWS ที่สิงคโปร์ ตอนนี้เปิดให้ลงชื่อรอก่อน',
      en: 'Test keys never reach real inboxes. Sent through AWS in Singapore. Join the waitlist while we finish it.',
    },
    cta: { th: 'ลงชื่อรอใช้', en: 'Join the waitlist' },
    underCta: { th: 'ไม่ต้องใช้บัตร', en: 'No card needed' },
  },
  problem: {
    heading: { th: 'ส่งอีเมลจากแอป ไม่ควรยากขนาดนี้', en: "Sending email from your app shouldn't be this hard" },
    body: {
      th: 'แค่อยากให้แอปส่งรหัส OTP หรืออีเมลยืนยัน แต่พอเจอคำว่า DNS SPF DKIM ก็ไม่รู้จะเริ่มตรงไหน ส่งไปแล้วบางฉบับยังเข้า spam อีก',
      en: 'You just want your app to send a login code. Then you hit words like DNS, SPF and DKIM. And some emails still land in spam.',
    },
    turn: {
      th: 'mailmeow เตรียมค่า DNS ของโดเมนให้ครบ และกำลังทำหน้าตั้งค่าที่บอกทีละขั้นว่าต้องก๊อปอะไรไปวางตรงไหน แล้วเช็กให้ว่าครบหรือยัง',
      en: "mailmeow prepares every DNS value for your domain, and we're building a setup page that shows what to copy where, then checks it for you.",
    },
  },
  aiCoding: {
    heading: { th: 'ทำมาให้คนที่เขียนแอปกับ AI', en: 'Made for building with AI' },
    items: [
      {
        th: '**API key ไม่หลุดง่าย** ถ้าเผลอใส่ API key ไว้ในโค้ดหน้าเว็บ ระบบจะไม่ยอมส่ง และบอกวิธีย้าย API key ไปไว้ฝั่ง server',
        en: "**Keys that don't leak easily.** Put a key in browser code by mistake? We block the send and show you how to move it to your server.",
      },
      {
        th: '**ลองได้ ไม่ต้องกลัวพลาด** API key ทดสอบไม่ส่งอีเมลไปถึงคนจริงสักฉบับ',
        en: '**Test without fear.** Test keys never send to real people.',
      },
      {
        th: '**รู้ว่าอีเมลไปถึงไหน** เช็กสถานะได้ทาง API หรือ webhook ว่าส่งแล้ว ถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม',
        en: '**Know where every email went.** Check through the API or a webhook: sent, delivered, bounced or marked as spam.',
      },
      {
        th: '**Prompt พร้อมใช้** (เร็ว ๆ นี้) สำหรับ Cursor Lovable Bolt และ Claude Code',
        en: '**Ready prompts** (coming) for Cursor, Lovable, Bolt and Claude Code',
      },
    ] as Bi[],
  },
  steps: {
    heading: { th: 'พอเปิดให้ใช้ เริ่มได้ใน 3 ขั้น', en: 'When it opens: three steps to your first email' },
    items: [
      {
        title: { th: 'สมัครแล้วรับ API key ทดสอบ', en: 'Sign up, get a test key' },
        body: { th: 'ลองส่งได้ทันที ยังไม่ต้องตั้งโดเมน', en: 'Send test emails right away. No domain setup yet.' },
      },
      {
        title: { th: 'ให้ AI ต่อระบบให้', en: 'Let your AI do the typing' },
        body: {
          th: '(เร็ว ๆ นี้) ก๊อป prompt ไปวางในเครื่องมือ AI ที่ใช้อยู่ ให้ AI เขียนโค้ดส่งอีเมลให้',
          en: '(Coming) Paste our prompt into your AI tool and let it write the email code.',
        },
      },
      {
        title: { th: 'ยืนยันโดเมน แล้วส่งจริง', en: 'Verify your domain and go live' },
        body: { th: 'ก๊อปค่า DNS ไปวางตามขั้นตอน เสร็จแล้วเปลี่ยนเป็น API key จริงได้เลย', en: 'Copy the DNS values step by step, then switch to a live key.' },
      },
    ] as { title: Bi; body: Bi }[],
  },
  business: {
    heading: { th: 'เร็ว ๆ นี้ สำหรับร้านค้าและธุรกิจ', en: 'Coming for shops and businesses' },
    items: [
      {
        th: '**ใช้กับ WordPress ได้** (เร็ว ๆ นี้) ตั้งค่า SMTP ครั้งเดียว ฟอร์มติดต่อและใบเสร็จก็ส่งถึงลูกค้าจริง',
        en: '**Works with WordPress** (coming). Set up SMTP once. Contact forms and receipts reach your customers.',
      },
      {
        th: '**เทมเพลตไทยและอังกฤษ** (เร็ว ๆ นี้) รหัส OTP ต้อนรับลูกค้าใหม่ รีเซ็ตรหัสผ่าน และใบเสร็จ',
        en: '**Thai and English templates** (coming): login codes, welcome, password reset and receipts.',
      },
      {
        th: '**ถามเป็นภาษาไทยได้** ติดตรงไหน ส่งอีเมลมาที่ {contact}',
        en: '**Ask in Thai or English.** Stuck? Email {contact}.',
      },
    ] as Bi[],
  },
  resend: {
    heading: { th: 'ย้ายจาก Resend ได้ โค้ดเดิมแทบไม่ต้องแก้', en: 'Switching from Resend' },
    body: {
      th: 'ยืนยันโดเมนกับ mailmeow แล้วเปลี่ยนค่าใน .env 2 ตัว SDK Node.js ของ Resend ใช้ต่อได้เลย อยากกลับก็แค่เปลี่ยนค่ากลับ',
      en: "Verify your domain on mailmeow, then change two env vars. Resend's Node SDK keeps working. Want to go back? Change them back.",
    },
    link: { th: 'ดูวิธีย้าย', en: 'See how to switch' },
  },
  pricing: {
    heading: { th: 'ราคาที่วางไว้', en: 'Planned pricing' },
    intro: {
      th: 'ตอนนี้ยังไม่เก็บเงิน และราคายังไม่สรุป เลยขอถามในฟอร์มว่าจ่ายราคานี้ไหม',
      en: "Nothing is on sale yet and prices aren't final, so the form asks whether you'd pay this.",
    },
    plans: [
      {
        name: { th: 'ฟรี', en: 'Free' },
        price: { th: 'ฟรี ไม่ต้องใส่บัตร', en: 'Free, no card needed' },
        lines: [
          { th: 'ส่งได้เดือนละ 3,000 ฉบับ วันละไม่เกิน 100', en: '3,000 emails a month, up to 100 a day' },
          { th: '1 โดเมน', en: '1 domain' },
          { th: 'ดูประวัติอีเมลย้อนหลัง 7 วัน', en: '7 days of email history' },
          { th: 'อีเมลทั่วไป เช่น รหัส OTP และใบเสร็จ', en: 'Everyday emails, like sign-in codes and receipts' },
        ],
      },
      {
        name: { th: 'Starter', en: 'Starter' },
        price: { th: '{price} ต่อเดือน (ประมาณ {thb})', en: '{price} a month (about {thb})' },
        lines: [
          { th: 'ส่งได้เดือนละ 20,000 ฉบับ', en: '20,000 emails a month' },
          { th: 'โดเมนไม่จำกัด', en: 'Unlimited domains' },
          { th: 'ดูประวัติอีเมลย้อนหลัง 30 วัน', en: '30 days of email history' },
          { th: 'ส่งแคมเปญได้ เช่น จดหมายข่าว', en: 'Campaigns, like newsletters' },
        ],
      },
    ],
    allPlans: {
      th: 'ทุกแผนมีแอปและสมาชิกในทีมไม่จำกัด คิดตามจำนวนอีเมลที่ส่งอย่างเดียว',
      en: 'Every plan includes unlimited apps and team members. You pay only for the emails you send.',
    },
    thbNote: {
      th: 'ราคาบาทเป็นแค่ค่าประมาณ ตอนจ่ายจริงเป็น USD ผ่านบัตร',
      en: 'Baht prices are approximate. You would pay in USD by card.',
    },
  },
  faqHeading: { th: 'คำถามที่พบบ่อย', en: 'Questions people ask' },
  whatIsHeading: { th: 'mailmeow คืออะไร', en: 'What is mailmeow' },
  faq: [
    {
      q: { th: 'ใช้ SDK ของ Resend กับ mailmeow ได้ไหม', en: "Does Resend's SDK work with mailmeow?" },
      a: {
        th: 'ได้ SDK Node.js ของ Resend ใช้กับ mailmeow ได้โดยไม่ต้องแก้โค้ด หลังยืนยันโดเมนแล้วเปลี่ยนแค่ base URL กับ API key บางอย่าง เช่น ไฟล์แนบ และการตั้งเวลาส่ง ยังไม่รองรับ',
        en: "Yes. Resend's Node.js SDK works with mailmeow without code changes: verify your domain, then change the base URL and API key. A few things, like attachments and scheduled sends, aren't supported yet.",
      },
    },
    {
      q: { th: 'ไม่รู้เรื่อง DNS เลย ทำได้ไหม', en: "I don't know DNS. Can I still do this?" },
      a: {
        th: 'ได้ mailmeow เตรียมค่า DKIM SPF และ DMARC ของโดเมนให้ แค่ก๊อปไปวางในที่ตั้งค่า DNS ส่วนหน้าที่บอกทีละขั้นและเช็กให้ว่าครบหรือยัง กำลังทำอยู่',
        en: 'Yes. mailmeow prepares the DKIM, SPF and DMARC values for your domain; you paste them into your DNS settings. A step-by-step page that checks them for you is in progress.',
      },
    },
    {
      q: { th: 'อีเมลจะเข้า spam ไหม', en: 'Will my emails go to spam?' },
      a: {
        th: 'mailmeow เตรียมค่า DKIM SPF และ DMARC ให้ครบ แค่ก๊อปไปวางในที่ตั้งค่า DNS และหยุดส่งไปยังอีเมลที่ตีกลับหรือถูกแจ้งสแปมให้เอง ช่วยให้โดเมนน่าเชื่อถือขึ้น แต่ไม่มีบริการไหนรับประกันได้ว่าทุกฉบับจะเข้ากล่องจดหมาย',
        en: 'mailmeow prepares your DKIM, SPF and DMARC values for you to paste into your DNS, and stops sending to addresses that bounce or report spam. That helps keep your domain trusted, but no service can promise every email reaches the inbox.',
      },
    },
    {
      q: { th: 'API key ทดสอบส่งถึงอีเมลจริงไหม', en: 'Can a test key email real people?' },
      a: {
        th: 'ไม่ส่ง API key ที่ขึ้นต้นด้วย `mm_test_` ไม่ส่งอีเมลไปถึงใครจริง แต่สถานะจะขึ้นเหมือนส่งจริง ลองระบบได้เต็มที่',
        en: 'No. Keys starting with `mm_test_` never reach a real inbox, but statuses show up as if they did, so you can try everything.',
      },
    },
    {
      q: { th: 'ใส่ API key ในโค้ดหน้าเว็บแล้วได้ 403 ทำไม', en: 'Why do I get a 403 when my API key is in browser code?' },
      a: {
        th: 'เพราะใครเปิดหน้าเว็บก็เห็น API key นั้นได้ mailmeow เลยไม่ยอมส่ง และบอกใน error ว่าย้าย API key ไปไว้ฝั่ง server ยังไง',
        en: 'Anyone who opens the page could copy that key, so mailmeow refuses the send and the error explains how to move the key to your server.',
      },
    },
    {
      q: { th: 'ใช้กับภาษาอะไรได้บ้าง', en: 'Which languages work?' },
      a: {
        th: 'ภาษาไหนที่ส่ง HTTP ได้ก็ใช้ได้ ถ้าเขียน Node.js ใช้ SDK ของ Resend ได้เลย ทดสอบแล้ว',
        en: "Any language that can make an HTTP request. On Node.js you can use Resend's SDK; we've tested it.",
      },
    },
    {
      q: { th: 'mailmeow ส่งผ่านอะไร', en: 'What does mailmeow send through?' },
      a: { th: 'ส่งผ่าน AWS SES ที่สิงคโปร์', en: 'AWS SES in Singapore.' },
    },
    {
      q: { th: 'ฟรีจริงไหม', en: 'Is the free plan really free?' },
      a: {
        th: 'ที่วางไว้คือฟรีเดือนละ 3,000 ฉบับ ไม่ต้องใส่บัตร ตัวเลขนี้อาจปรับก่อนเปิดใช้',
        en: 'The plan is 3,000 free emails a month, no card. The number may change before launch.',
      },
    },
    {
      q: { th: 'จ่ายเงินยังไง', en: 'How will I pay?' },
      a: {
        th: 'ตั้งใจให้จ่ายเป็น USD ผ่านบัตรเครดิตหรือเดบิต ตอนนี้ยังไม่เก็บเงิน ถ้าอยากจ่ายผ่าน PromptPay บอกในฟอร์มได้',
        en: 'In USD by credit or debit card. Nothing is charged yet. Want PromptPay? Tell us in the form.',
      },
    },
  ] as Faq[],
  finalCta: {
    heading: { th: 'ลงชื่อไว้ก่อน เปิดให้ใช้เมื่อไรเราส่งอีเมลบอกทันที', en: "Be first in line. We'll email you the day it opens." },
    cta: { th: 'ลงชื่อรอใช้', en: 'Join the waitlist' },
  },
};

/** §13 /about */
export const ABOUT = {
  h1: { th: 'mailmeow คืออะไร ใครทำ', en: 'What mailmeow is, and who makes it' },
  whoHeading: { th: 'ใครทำ', en: 'Who makes it' },
  byline: {
    th: '[ภูรินท์ บุรีวงศ์ (Pooh)](https://pooh.fyi) นักพัฒนาเทคโนโลยีเพื่อธุรกิจ ทำ mailmeow คนเดียว เริ่มจากใช้ส่งอีเมลในแอปของตัวเอง',
    en: '[Pooh (Purin Buriwong)](https://pooh.fyi), Business Technology Engineer, builds mailmeow on his own. He made it to send email from his own apps first.',
  },
  worksHeading: { th: 'ใช้ได้แล้วตอนนี้', en: 'What works today' },
  plannedHeading: { th: 'ยังไม่มี', en: 'Not built yet' },
  note: {
    th: 'ราคาทุกตัวยังเป็นแผน ยังไม่สรุป ข้อมูลหน้านี้เช็กล่าสุด {LAST_VERIFIED}',
    en: 'All prices are planned, not final. Last checked {LAST_VERIFIED}.',
  },
};
