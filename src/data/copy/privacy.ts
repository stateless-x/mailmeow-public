// Verbatim from docs/copy/privacy.md. The page needs a legal check before launch (see that doc's Flags).
import type { Bi } from '../types';

interface Section {
  heading: Bi;
  /** Paragraph text. */
  body?: Bi;
  /** Bulleted list; th and en have the same number of items. */
  list?: Bi<string[]>;
  /** Extra paragraphs after the body or list, in order. */
  extra?: Bi[];
}

export const PRIVACY = {
  h1: { th: 'นโยบายความเป็นส่วนตัว (รายชื่อรอใช้)', en: 'Privacy notice (waitlist)' },
  intro: {
    th: 'หน้านี้บอกว่า mailmeow เก็บข้อมูลอะไรจากฟอร์มลงชื่อรอใช้ เอาไปทำอะไร เก็บไว้ที่ไหน นานแค่ไหน และคุณขอดูหรือขอลบได้ยังไง ใช้กับฟอร์มลงชื่อรอใช้เท่านั้น',
    en: 'This page explains what mailmeow collects from the waitlist form, why, where it\'s kept, for how long, and how you can see or delete it. It covers the waitlist form only.',
  },
  sections: [
    {
      heading: { th: 'ใครดูแลข้อมูลนี้', en: 'Who is responsible' },
      body: {
        th: 'ภูรินท์ บุรีวงศ์ (Pooh) เป็นผู้ควบคุมข้อมูลส่วนบุคคล ในฐานะบุคคลธรรมดา ติดต่อได้ที่ {contact}',
        en: 'Pooh (Purin Buriwong), as an individual, is the data controller. Contact: {contact}',
      },
    },
    {
      heading: { th: 'เก็บอะไรบ้าง', en: 'What we collect' },
      list: {
        th: [
          'อีเมลของคุณ',
          'คำตอบ 5 ข้อในฟอร์ม คือ กำลังทำอะไร ใช้ AI ตัวไหน ส่งอีเมลเดือนละกี่ฉบับ จะจ่ายไหม และอยากจ่ายผ่าน PromptPay ไหม',
          'ราคาที่คุณเห็นในคำถาม',
          'ลิงก์ที่พาคุณมาที่เว็บนี้ เช่น ลิงก์จากโพสต์หรือวิดีโอของเรา ถ้าเข้าเอง จะบันทึกว่าเข้าตรง',
          'เวลาที่ลงชื่อ',
          'IP ของคุณที่แปลงเป็นรหัสทางเดียว (hash) แล้ว ใช้แค่กันการลงชื่อซ้ำ ๆ จากที่เดียวกัน เราไม่เก็บ IP ตัวจริง',
        ],
        en: [
          'Your email',
          "Your 5 answers: what you're building, which AI tool, emails per month, whether you'd pay, and whether you need PromptPay",
          'The price shown to you in the question',
          'Which link brought you here, such as a link in one of our posts or videos (recorded as "direct" if you came on your own)',
          'When you signed up',
          "A one-way hash of your IP address, used only to limit repeated signups. We don't store the IP itself.",
        ],
      },
    },
    {
      heading: { th: 'เอาไปทำอะไร', en: 'Why we collect it' },
      list: {
        th: [
          'ส่งอีเมลบอกคุณตอนเปิดให้ใช้ ไม่ส่งโฆษณาเรื่องอื่น',
          'ดูคำตอบรวมกันเพื่อตัดสินว่าจะทำ mailmeow ต่อไหม และควรตั้งราคาเท่าไร',
          'กันสแปมและการลงชื่อซ้ำ',
        ],
        en: [
          'To email you when mailmeow opens, and nothing else',
          'To read the answers as a group and decide whether to build mailmeow and what to charge',
          'To stop spam and repeated signups',
        ],
      },
      extra: [
        { th: 'เราเก็บข้อมูลนี้เพราะคุณติ๊กยินยอมในฟอร์ม', en: 'We collect this because you gave consent by ticking the box on the form.' },
        {
          th: 'ตอนลงชื่อ เรายังไม่ส่งอีเมลยืนยัน อีเมลแรกที่คุณจะได้คืออีเมลบอกว่าเปิดให้ใช้แล้ว',
          en: "We don't send a confirmation email when you sign up. The first email you get will say mailmeow is open.",
        },
      ],
    },
    {
      heading: { th: 'เก็บไว้ที่ไหน', en: "Where it's stored" },
      body: {
        th: 'ข้อมูลเก็บในฐานข้อมูล Cloudflare D1 ของ Cloudflare ตอนส่งฟอร์ม Cloudflare Turnstile จะเช็กว่าคุณเป็นคนจริง ไม่ใช่บอต โดย Cloudflare จัดการข้อมูลที่ใช้เช็กตามนโยบายความเป็นส่วนตัวของ Cloudflare เซิร์ฟเวอร์ของ Cloudflare อาจอยู่นอกประเทศไทย',
        en: "Your data is stored in Cloudflare D1, a Cloudflare database. When you submit the form, Cloudflare Turnstile checks that you're a person, not a bot; Cloudflare handles the data it uses for that check under Cloudflare's own privacy policy. Cloudflare's servers may be outside Thailand.",
      },
    },
    {
      heading: { th: 'ใครเห็นข้อมูล', en: 'Who sees it' },
      body: {
        th: 'มีแค่ Pooh ที่เปิดดูได้ และ Cloudflare ที่ให้บริการเก็บข้อมูล เราไม่ขายข้อมูล และไม่ส่งให้ใครเอาไปทำโฆษณา',
        en: "Only Pooh can open it, plus Cloudflare as the storage provider. We don't sell your data or share it for advertising.",
      },
    },
    {
      heading: { th: 'เก็บนานแค่ไหน', en: 'How long we keep it' },
      body: {
        th: 'เก็บไว้จนถึงวันที่ mailmeow เปิดให้ใช้ แล้วเก็บต่ออีก 12 เดือน จากนั้นลบ ถ้าตัดสินใจไม่เปิด mailmeow เป็นบริการ จะลบภายใน 3 เดือนหลังตัดสินใจ ถ้าคุณขอลบก่อน เราลบให้ได้ทุกเมื่อ',
        en: 'Until mailmeow opens, then 12 more months, then we delete it. If we decide not to open mailmeow as a service, we delete it within 3 months of that decision. You can ask us to delete it sooner, at any time.',
      },
    },
    {
      heading: { th: 'สิทธิ์ของคุณ', en: 'Your rights' },
      list: {
        th: [
          'ขอดูข้อมูลที่เราเก็บไว้',
          'ขอลบข้อมูล',
          'ถอนความยินยอม แล้วเราจะหยุดใช้และลบข้อมูล',
          'ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)',
        ],
        en: [
          'See the data we hold about you',
          'Ask us to delete it',
          'Withdraw your consent, and we stop using and delete your data',
          "Complain to Thailand's Personal Data Protection Committee (PDPC)",
        ],
      },
      extra: [
        {
          th: 'ส่งอีเมลมาที่ {contact} จากอีเมลที่ใช้ลงชื่อ บอกว่าอยากทำอะไร',
          en: 'Email {contact} from the address you signed up with and tell us what you want.',
        },
      ],
    },
    {
      heading: { th: 'คุกกี้และสถิติผู้เข้าชม', en: 'Cookies and analytics' },
      body: {
        th: 'เว็บนี้ไม่มีตัวติดตามโฆษณา สถิติผู้เข้าชมใช้ Cloudflare Web Analytics ที่นับการเข้าชมโดยไม่ใช้คุกกี้ คุกกี้ที่เราตั้งเองมีตัวเดียวคือ `mm_lang` ไว้จำว่าคุณเลือกภาษาไทยหรืออังกฤษ และเว็บเก็บค่าสองอย่างไว้ในเบราว์เซอร์ของคุณ (localStorage) คือราคาที่แสดงให้คุณ ราคาที่เห็นจะได้ไม่เปลี่ยนไปมา และลิงก์ที่พาคุณมา ค่าเหล่านี้อยู่ในเครื่องคุณเท่านั้น จนกว่าคุณจะส่งฟอร์ม',
        en: "There are no ad trackers on this site. Visitor stats come from Cloudflare Web Analytics, which counts visits without cookies. The only cookie we set ourselves is `mm_lang`, which remembers whether you chose Thai or English. The site also keeps two values in your browser (localStorage): which price we showed you, so it doesn't change between pages, and which link brought you here. They stay on your device unless you send the form.",
      },
    },
    {
      heading: { th: 'ถ้าหน้านี้เปลี่ยน', en: 'If this notice changes' },
      body: {
        th: 'ถ้าแก้หน้านี้ จะเปลี่ยนวันที่ด้านล่าง ถ้าจะเอาข้อมูลไปใช้ทำอย่างอื่นนอกจากที่เขียนไว้ เราจะขอความยินยอมจากคุณใหม่ก่อน',
        en: "When we edit this page, the date below changes. If we ever want to use your data for anything not listed here, we'll ask for your consent again first.",
      },
    },
  ] as Section[],
  updated: { th: 'แก้ไขล่าสุด {date}', en: 'Last updated {date}' },
};
