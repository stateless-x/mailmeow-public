import type { Entity, Feature, PageEntry } from './types';
import { validateRegistry } from '../lib/validate';

export const ENTITY: Entity = {
  name: 'mailmeow',
  url: 'https://mailmeow.dev',
  docsUrl: 'https://docs.mailmeow.dev',
  contactEmail: undefined,
  docsLive: false,
  lastVerified: '2026-11-17',
  privacyUpdated: '2026-11-17',
  termsUpdated: '2026-11-18',
  privacyProductUpdated: '2026-11-18',
  creator: {
    id: 'https://mailmeow.dev/#creator',
    name: 'Pooh',
    alternateName: ['ภูรินท์ บุรีวงศ์', 'Purin Buriwong'],
    jobTitle: { th: 'นักพัฒนาเทคโนโลยีเพื่อธุรกิจ', en: 'Business Technology Engineer' },
    url: 'https://pooh.fyi',
  },
};

// Titles and descriptions: copy/landing.md §0, §13; copy/migrate.md; copy/privacy.md; copy/terms.md.
export const PAGES: PageEntry[] = [
  {
    slug: '',
    status: 'live',
    kind: 'landing',
    indexable: true,
    title: {
      th: 'Email API ส่งอีเมล OTP จากแอป | mailmeow',
      en: "Email API for sending email from your app | mailmeow",
    },
    description: {
      th: 'mailmeow คือ email API ส่งรหัส OTP และอีเมลจากแอปผ่าน AWS SES ที่สิงคโปร์ ตอนนี้เปิดให้ลงชื่อรอใช้',
      en: "mailmeow is an email API for login codes and app emails, sent through AWS SES in Singapore. Join the waitlist.",
    },
  },
  {
    slug: 'migrate-from-resend',
    status: 'live',
    kind: 'migrate',
    indexable: true,
    title: {
      th: 'ย้ายจาก Resend มา mailmeow เปลี่ยนแค่ 2 ค่า | mailmeow',
      en: 'Switch from Resend: change two env vars | mailmeow',
    },
    description: {
      th: 'ย้ายแอปจาก Resend มา mailmeow ยืนยันโดเมน แล้วเปลี่ยน base URL กับ API key SDK Node.js ของ Resend ใช้ต่อได้ ลงชื่อรอใช้',
      en: "Move an app from Resend to mailmeow: verify your domain, then change the base URL and API key. Resend's Node.js SDK keeps working. Join the waitlist.",
    },
    nav: { label: { th: 'ย้ายจาก Resend', en: 'Switch from Resend' }, header: false },
  },
  {
    slug: 'about',
    status: 'live',
    kind: 'about',
    indexable: true,
    title: {
      th: 'mailmeow คืออะไร Email API โดย Pooh | mailmeow',
      en: 'What is mailmeow? An email API by Pooh | mailmeow',
    },
    description: {
      th: 'mailmeow คือ email API สำหรับส่งอีเมลจากแอป ทำโดย Pooh (ภูรินท์ บุรีวงศ์) ตอนนี้ทำอะไรได้บ้าง และอะไรที่ยังไม่เสร็จ',
      en: "mailmeow is an email API for sending email from your app, made by Pooh (Purin Buriwong). What works today and what's still coming.",
    },
    nav: { label: { th: 'เกี่ยวกับ mailmeow', en: 'About' }, header: true },
  },
  {
    slug: 'privacy',
    status: 'live',
    kind: 'privacy',
    indexable: true,
    title: {
      th: 'นโยบายความเป็นส่วนตัว | mailmeow',
      en: 'Privacy notice | mailmeow',
    },
    description: {
      th: 'mailmeow เก็บข้อมูลอะไรเมื่อคุณใช้ dashboard และ API หรือลงชื่อรอใช้ เก็บไว้ที่ไหน ใครเห็นได้ เก็บนานแค่ไหน และขอลบได้ยังไง',
      en: "What mailmeow stores when you use the dashboard and the API or join the waitlist, where it's kept, who can see it, for how long, and how to delete it.",
    },
    nav: { label: { th: 'นโยบายความเป็นส่วนตัว', en: 'Privacy' }, header: false },
  },
  {
    slug: 'terms',
    status: 'live',
    kind: 'terms',
    indexable: true,
    title: {
      th: 'ข้อตกลงการใช้งาน | mailmeow',
      en: 'Acceptable-use terms | mailmeow',
    },
    description: {
      th: 'ส่งอีเมลแบบไหนผ่าน mailmeow ได้ แบบไหนห้ามส่ง ระบบหยุดส่งเมื่อไร และข้อมูลใน Workspace เก็บนานแค่ไหน',
      en: 'What you may and may not send through mailmeow, when sending is paused, and how long workspace data is kept.',
    },
    nav: { label: { th: 'ข้อตกลงการใช้งาน', en: 'Acceptable-use terms' }, header: false },
  },
  {
    // No title or meta in the copy docs: the thanks copy is assembled from the form's
    // success message (see src/data/copy/common.ts). noindex, not in the sitemap.
    slug: 'waitlist-thanks',
    status: 'live',
    kind: 'thanks',
    indexable: false,
    title: { th: 'ลงชื่อแล้ว | mailmeow', en: "You're on the list. | mailmeow" },
    description: { th: 'ลงชื่อแล้ว', en: "You're on the list." },
  },
  { slug: 'pricing', status: 'planned', plannedFor: 'after the price test (a #pricing section on the landing until then)' },
  { slug: 'features', status: 'planned', plannedFor: 'when three of its rows ship' },
];

// Labels: copy/landing.md §13 lists, in order.
export const FEATURES: Feature[] = [
  {
    id: 'emails-api',
    status: 'live',
    label: { th: 'ส่งอีเมล ดูรายการ และดูทีละฉบับผ่าน API', en: 'Send, list and fetch emails through the API' },
    proof: 'docs/user/api-reference.md',
  },
  {
    id: 'node-sdk',
    status: 'live',
    label: { th: 'SDK Node.js ของ Resend ใช้ได้โดยไม่ต้องแก้ ทดสอบแล้ว', en: "Resend's Node.js SDK works unchanged, tested" },
    proof: 'mailmeow-node/test/contract',
    linksTo: 'migrate-from-resend',
    inJsonLd: false,
  },
  {
    id: 'test-keys',
    status: 'live',
    label: { th: 'API key ทดสอบไม่ส่งถึงใครจริง', en: 'Test keys never reach real inboxes' },
    proof: 'docs/user/concepts.md',
  },
  {
    id: 'browser-key-block',
    status: 'live',
    label: { th: 'API key ที่อยู่ในโค้ดหน้าเว็บจะโดนบล็อก พร้อมบอกวิธีย้าย', en: 'Keys in browser code are blocked, with steps to move them' },
    proof: 'docs/user/api-reference.md',
  },
  {
    id: 'status-webhooks',
    status: 'live',
    label: { th: 'เช็กสถานะผ่าน API และ webhook ที่มีลายเซ็น', en: 'Status through the API and signed webhooks' },
    proof: 'docs/user/webhooks.md',
  },
  {
    id: 'auto-suppression',
    status: 'live',
    label: { th: 'หยุดส่งไปยังอีเมลที่ตีกลับหรือถูกแจ้งสแปม ให้เอง', en: 'Bounced and spam-reported addresses are skipped automatically' },
    proof: 'docs/user/concepts.md',
  },
  {
    id: 'dns-auth',
    status: 'live',
    label: { th: 'ตั้ง DKIM SPF และ DMARC ให้ทุกโดเมน', en: 'DKIM, SPF and DMARC for every domain' },
    proof: 'docs/user/concepts.md',
  },
  { id: 'signup-dashboard', status: 'planned', plannedFor: 'Phase 1b', label: { th: 'หน้าสมัครและ dashboard', en: 'Signup and dashboard' } },
  { id: 'ai-prompts', status: 'planned', plannedFor: 'docs.mailmeow.dev launch', label: { th: 'prompt สำหรับเครื่องมือ AI', en: 'Prompts for AI tools' } },
  { id: 'billing', status: 'planned', plannedFor: 'after the waitlist price test', label: { th: 'ระบบจ่ายเงิน', en: 'Billing' } },
  { id: 'templates', status: 'planned', plannedFor: 'Phase 2', label: { th: 'เทมเพลตอีเมล', en: 'Email templates' } },
  { id: 'wordpress-smtp', status: 'planned', plannedFor: 'Phase 2', label: { th: 'SMTP สำหรับ WordPress', en: 'SMTP for WordPress' } },
  { id: 'attachments-scheduled', status: 'planned', plannedFor: 'Phase 1b', label: { th: 'ไฟล์แนบและการตั้งเวลาส่ง', en: 'Attachments and scheduled sends' } },
];

// Fails the build (and every test run) on a broken registry.
validateRegistry({ pages: PAGES, features: FEATURES });
