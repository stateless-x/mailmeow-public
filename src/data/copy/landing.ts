// Verbatim from docs/copy/landing.md. Markers: **bold** `code` ==highlight== [text](url|@slug) {price} {contact} {LAST_VERIFIED}.
// If a line looks wrong, report it; do not edit it here.
import type { Bi } from '../types';

export interface Faq {
  q: Bi;
  a: Bi;
}

/** §9 "What is mailmeow": the same text on the landing and as the lead of /about. */
export const WHAT_IS: Bi = {
  th: 'mailmeow คือ email API สำหรับคนไทยที่ทำแอปกับ AI ใช้ส่งอีเมลจากแอป เช่น รหัส OTP และอีเมลยืนยัน เตรียมค่า SPF DKIM และ DMARC ให้ครบ และบอกได้ทุกฉบับว่าส่งแล้ว ถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม ภูรินท์ บุรีวงศ์ (Pooh) ทำไว้ใช้กับแอปของตัวเองก่อน ตอนนี้ยังไม่เปิดให้สมัคร ลงชื่อรอใช้ได้ก่อน',
  en: "mailmeow is an email API for Thai builders who make apps with AI. It sends email from your app, such as login codes and confirmation emails, prepares your SPF, DKIM and DMARC values, and tells you whether each email was sent, delivered, bounced or marked as spam. Pooh (Purin Buriwong) built it for his own apps first. It is not open for signup yet; join the waitlist.",
};

export const LANDING = {
  hero: {
    h1: { th: 'ลูกค้าไม่ได้รับอีเมล OTP ==อีกแล้ว==', en: "Users didn't get their login code. ==Again.==" },
    sub: {
      th: 'mailmeow คือ email API ที่ส่งอีเมล OTP จากแอปให้ และบอกได้ทุกฉบับว่าถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม ไม่ต้องเก่ง DNS ก็ตั้งค่าเองได้',
      en: "mailmeow is an email API that sends your app's login codes and shows whether each one was delivered, bounced or marked as spam. You don't need to know DNS to set it up.",
    },
    cta: { th: 'ลงชื่อรอใช้', en: 'Join the waitlist' },
    underCta: { th: 'ยังไม่เปิดให้ใช้ ลงชื่อไว้ก่อนได้ ไม่ต้องใช้บัตร', en: 'Not open yet. Join the waitlist, no card needed.' },
    /** The hero card: an example of one email's status, the way the dashboard shows it. */
    demo: {
      label: { th: 'ตัวอย่างหน้าดูสถานะอีเมล', en: 'Example: one email in the dashboard' },
      tag: { th: 'ตัวอย่าง', en: 'Example' },
      subject: { th: 'รหัสเข้าสู่ระบบ 482913', en: 'Your login code: 482913' },
      to: { th: 'ถึง', en: 'To' },
      events: [
        { status: 'queued', label: { th: 'รอคิว', en: 'Queued' }, detail: { th: 'แอปส่งคำขอมาแล้ว', en: 'Your app asked us to send it' }, time: '09:41:02' },
        { status: 'sent', label: { th: 'ส่งแล้ว', en: 'Sent' }, detail: { th: 'กำลังไปที่ gmail.com', en: 'On its way to gmail.com' }, time: '09:41:03' },
        { status: 'delivered', label: { th: 'ส่งถึงแล้ว', en: 'Delivered' }, detail: { th: 'เซิร์ฟเวอร์ของ gmail.com รับแล้ว', en: 'Accepted by gmail.com' }, time: '09:41:05' },
      ] as { status: 'queued' | 'sent' | 'delivered'; label: Bi; detail: Bi; time: string }[],
      note: { th: 'ถ้าตีกลับหรือถูกแจ้งสแปม ก็ขึ้นตรงนี้ พร้อมเหตุผล', en: 'Bounced or marked as spam? It shows here, with the reason.' },
    },
  },
  problem: {
    heading: { th: 'ส่งอีเมลจากแอป ไม่ควรยากขนาดนี้', en: "Sending email from your app shouldn't be this hard" },
    nowLabel: { th: 'ตอนนี้', en: 'Today' },
    fixLabel: { th: 'กับ mailmeow', en: 'With mailmeow' },
    /** Each pain sits beside the fix on the same row. */
    rows: [
      {
        now: { th: 'เจอคำว่า DNS SPF DKIM แล้วไม่รู้จะเริ่มตรงไหน', en: 'DNS, SPF, DKIM: no idea where to start.' },
        fix: { th: 'mailmeow เตรียมค่า DNS ให้ครบ แค่ก๊อปไปวาง', en: 'mailmeow prepares every DNS value. You copy and paste.' },
      },
      {
        now: { th: 'ใช้ Gmail ส่งแก้ขัดไปก่อน แล้วก็ติดลิมิต', en: 'Gmail works as a stopgap, until it hits its limit.' },
        fix: { th: 'ส่งจากโดเมนของแอปเอง ลูกค้าเห็นชื่อแอป ไม่ใช่ @gmail.com', en: "Send from your app's own domain, so users see your app's name, not @gmail.com." },
      },
      {
        now: { th: 'ลูกค้าทักมาว่าไม่ได้รับรหัส แต่ไม่รู้ว่าอีเมลไปติดที่ไหน', en: "A user says the code never came, and you can't tell where the email went." },
        fix: { th: 'เห็นทุกฉบับว่าถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม', en: 'See whether each email was delivered, bounced or marked as spam.' },
      },
    ] as { now: Bi; fix: Bi }[],
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
    heading: { th: 'สำหรับร้านค้าและธุรกิจ', en: 'For shops and businesses' },
    items: [
      {
        th: '**ใช้กับ WordPress ได้** (เร็ว ๆ นี้) ตั้งค่า SMTP ครั้งเดียว ฟอร์มติดต่อและใบเสร็จก็ส่งถึงลูกค้าจริง',
        en: '**Works with WordPress** (coming). Set up SMTP once. Contact forms and receipts reach your customers.',
      },
      {
        th: '**เทมเพลตไทยและอังกฤษ** รหัส OTP ต้อนรับลูกค้าใหม่ รีเซ็ตรหัสผ่าน และใบเสร็จ',
        en: '**Thai and English templates**: login codes, welcome, password reset and receipts.',
      },
      {
        th: '**ถามเป็นภาษาไทยได้** ติดตรงไหน ส่งอีเมลมาที่ {contact}',
        en: '**Ask in Thai or English.** Stuck? Email {contact}.',
      },
    ] as Bi[],
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
      q: { th: 'mailmeow ช่วยเรื่องอีเมล OTP ไม่เข้ายังไง', en: "How does mailmeow help when OTP emails don't arrive?" },
      a: {
        th: 'mailmeow เตรียมค่า SPF DKIM และ DMARC ให้ครบ บอกได้ทุกฉบับว่าถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม และหยุดส่งไปยังที่อยู่ที่ตีกลับให้เอง เลยรู้ว่าต้องแก้ตรงไหน ดูสาเหตุทั้งหมดได้ที่ [อีเมล OTP ไม่เข้า เกิดจากอะไร](@otp-email-not-arriving)',
        en: "mailmeow prepares your SPF, DKIM and DMARC values, shows whether each email was delivered, bounced or marked as spam, and stops sending to addresses that bounce, so you know what to fix. All the usual causes: [OTP emails not arriving?](@otp-email-not-arriving)",
      },
    },
    {
      q: { th: 'ใช้ Gmail ส่งอีเมลจากแอปได้ไหม', en: 'Can I just send app email through Gmail?' },
      a: {
        th: 'ส่งได้ แต่เหมาะกับช่วงลองเท่านั้น Gmail มีลิมิตต่อวัน อีเมลออกจากชื่อ @gmail.com ไม่ใช่โดเมนของแอป และดูไม่ได้ว่าแต่ละฉบับถึงไหม mailmeow ส่งจากโดเมนของแอปเอง และเช็กสถานะได้ทุกฉบับ',
        en: "It works for trying things out. Gmail has a daily limit, sends from your @gmail.com address instead of your app's domain, and can't tell you whether each email arrived. mailmeow sends from your app's own domain and shows the status of every email.",
      },
    },
    {
      q: { th: 'ไม่รู้เรื่อง DNS เลย ทำได้ไหม', en: "I don't know DNS. Can I still do this?" },
      a: {
        th: 'ได้ mailmeow เตรียมค่า DKIM SPF และ DMARC ของโดเมนให้ แค่ก๊อปไปวางในที่ตั้งค่า DNS ส่วนหน้าที่บอกทีละขั้นและเช็กให้ว่าครบหรือยัง กำลังทำอยู่ ดูว่าแต่ละตัวคืออะไรที่ [SPF DKIM DMARC คืออะไร](@spf-dkim-dmarc)',
        en: 'Yes. mailmeow prepares the DKIM, SPF and DMARC values for your domain; you paste them into your DNS settings. A step-by-step page that checks them for you is in progress. What each one is: [SPF, DKIM and DMARC](@spf-dkim-dmarc).',
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
        th: 'ภาษาไหนที่ส่ง HTTP ได้ก็ใช้ได้',
        en: "Any language that can make an HTTP request.",
      },
    },
    {
      q: { th: 'Email API คืออะไร', en: 'What is an email API?' },
      a: {
        th: 'Email API คือบริการที่ให้แอปส่งอีเมลด้วยโค้ดไม่กี่บรรทัด โดยไม่ต้องตั้ง mail server เอง mailmeow เป็น email API ที่คนทำแอปกับ AI ตั้งค่าเองได้ ไม่ต้องเก่ง DNS',
        en: 'An email API lets your app send email with a few lines of code, without running a mail server. mailmeow is an email API you can set up yourself, even if you build with AI and have never touched DNS.',
      },
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
