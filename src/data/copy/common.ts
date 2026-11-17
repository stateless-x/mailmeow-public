// Verbatim from docs/copy/landing.md §11 (form), §12 (footer), §1 (nav CTA).
import type { Bi } from '../types';

export interface Option {
  value: string;
  label: Bi;
}

export const FOOTER = {
  maker: {
    th: 'ทำโดย [ภูรินท์ บุรีวงศ์ (Pooh)](https://pooh.fyi)',
    en: 'Made by [Pooh (Purin Buriwong)](https://pooh.fyi)',
  },
  docs: { label: { th: 'คู่มือ', en: 'Docs' }, soon: { th: '(เร็ว ๆ นี้)', en: '(coming)' } },
  /** Language switch labels. Same in both languages. */
  langNames: { th: 'ภาษาไทย', en: 'English' },
};

export const NAV_CTA: Bi = { th: 'ลงชื่อรอใช้', en: 'Join the waitlist' };

/**
 * /waitlist-thanks has no copy of its own in the docs. It reuses the two sentences of the
 * form's success message that need no email address. Reported as a gap.
 */
export const THANKS = {
  h1: { th: 'ลงชื่อแล้ว', en: "You're on the list." },
  body: {
    th: 'ขอบคุณที่ช่วยตอบ คำตอบนี้ช่วยตัดสินว่าจะทำ mailmeow ต่อไหม',
    en: 'Thanks for answering: it helps decide whether mailmeow gets built.',
  },
};

export const FORM = {
  heading: { th: 'ลงชื่อรอใช้ แล้วช่วยตอบ 5 ข้อสั้น ๆ', en: 'Join the waitlist and answer 5 quick questions' },
  email: { label: { th: 'อีเมล', en: 'Email' }, hint: { th: 'เช่น name@gmail.com', en: 'e.g. name@gmail.com' } },
  q1: {
    label: { th: 'กำลังทำอะไรอยู่', en: 'What are you building' },
    options: [
      { value: 'own', label: { th: 'แอปหรือเว็บของตัวเอง', en: 'My own app or site' } },
      { value: 'client', label: { th: 'งานให้ลูกค้า', en: 'Client work' } },
      { value: 'learning', label: { th: 'โปรเจกต์เรียนหรือฝึกทำ', en: 'A school or practice project' } },
      { value: 'shop', label: { th: 'เว็บร้านหรือธุรกิจ', en: 'A shop or business site' } },
      { value: 'other', label: { th: 'อื่น ๆ', en: 'Other' } },
    ] as Option[],
  },
  q2: {
    label: { th: 'ใช้ AI ตัวไหนเขียนโค้ด', en: 'Which AI tool do you use' },
    options: [
      { value: 'cursor', label: { th: 'Cursor', en: 'Cursor' } },
      { value: 'lovable', label: { th: 'Lovable', en: 'Lovable' } },
      { value: 'bolt', label: { th: 'Bolt', en: 'Bolt' } },
      { value: 'claude-code', label: { th: 'Claude Code', en: 'Claude Code' } },
      { value: 'other', label: { th: 'อื่น ๆ', en: 'Other' } },
      { value: 'none', label: { th: 'ไม่ได้ใช้ AI', en: "I don't use AI" } },
    ] as Option[],
  },
  q3: {
    label: { th: 'ส่งเดือนละกี่ฉบับ', en: 'Emails per month' },
    hint: { th: 'ประมาณเอาได้', en: 'A rough guess is fine' },
    options: [
      { value: 'up-to-3000', label: { th: 'ไม่เกิน 3,000', en: 'Up to 3,000' } },
      { value: '3000-20000', label: { th: '3,000 ถึง 20,000', en: '3,000 to 20,000' } },
      { value: 'over-20000', label: { th: 'มากกว่า 20,000', en: 'More than 20,000' } },
      { value: 'unsure', label: { th: 'ยังไม่รู้', en: 'Not sure' } },
    ] as Option[],
  },
  q4: {
    label: { th: 'จ่าย {price} ไหม', en: 'Would you pay {price}' },
    hint: {
      th: 'แผนที่วางไว้ {price} ต่อเดือน ส่งได้ 20,000 ฉบับ ราคายังไม่สรุป',
      en: 'Planned: {price} a month for 20,000 emails. Not final.',
    },
    options: [
      { value: 'yes', label: { th: 'จ่าย', en: "Yes, I'd pay" } },
      { value: 'not-yet', label: { th: 'ยังไม่จ่าย ใช้แผนฟรีพอ', en: 'Not yet, free is enough' } },
      { value: 'no', label: { th: 'ไม่จ่าย', en: 'No' } },
    ] as Option[],
  },
  q5: {
    label: { th: 'อยากจ่ายผ่าน PromptPay ไหม', en: 'Do you need PromptPay' },
    options: [
      { value: 'required', label: { th: 'ต้องมี ถึงจะจ่าย', en: "I'd only pay with it" } },
      { value: 'nice', label: { th: 'มีก็ดี แต่จ่ายบัตรได้', en: 'Nice to have, card is fine' } },
      { value: 'card', label: { th: 'จ่ายบัตรได้', en: 'Card is fine' } },
    ] as Option[],
  },
  consent: {
    th: 'ยินยอมให้ mailmeow เก็บอีเมลและคำตอบนี้ไว้ เพื่อส่งข่าวตอนเปิดให้ใช้ และใช้ตัดสินใจเรื่องราคา ขอลบได้ทุกเมื่อ อ่าน[นโยบายความเป็นส่วนตัว](@privacy)',
    en: 'I agree that mailmeow keeps my email and answers to tell me when it opens and to decide pricing. I can ask for deletion any time. Read the [privacy policy](@privacy).',
  },
  button: { th: 'ลงชื่อรอใช้', en: 'Join the waitlist' },
  /** copy/landing.md §11, "JavaScript off". */
  noscript: {
    th: 'ฟอร์มนี้ต้องเปิด JavaScript ก่อน ถึงจะลงชื่อได้ เพราะใช้เช็กว่าไม่ใช่บอต',
    en: "This form needs JavaScript, because it checks that you're not a bot.",
  },
  success: {
    th: 'ลงชื่อแล้ว เปิดให้ใช้เมื่อไร จะส่งอีเมลไปบอกที่ {email} ขอบคุณที่ช่วยตอบ คำตอบนี้ช่วยตัดสินว่าจะทำ mailmeow ต่อไหม',
    en: "You're on the list. We'll email {email} when it opens. Thanks for answering: it helps decide whether mailmeow gets built.",
  },
  errors: {
    email: { th: 'อีเมลนี้ยังไม่ครบ ลองเช็กตัว @ กับชื่อโดเมนอีกที', en: 'That email looks incomplete. Check the @ and the domain.' },
    consent: { th: 'ติ๊กช่องยินยอมก่อน ถึงจะลงชื่อได้', en: 'Tick the consent box to join.' },
    q4: { th: 'เลือกคำตอบข้อนี้ก่อน', en: 'Pick an answer for this one.' },
    network: {
      th: 'ส่งไม่สำเร็จ ลองกดอีกครั้ง ถ้ายังไม่ได้ ส่งอีเมลมาที่ {contact}',
      en: "That didn't go through. Try again, or email {contact}.",
    },
  },
};
