// Verbatim from docs/copy/privacy-product.md (draft: needs a legal check (PDPA) before launch; see that doc's Flags).
// [legal check] and [?] markers are stripped here; which sentences carried one is in tests/unit/fixtures/privacy-product-markers.ts.
// A cookie row is shown as one list item: the cookie name, a colon, then the doc's text.
import type { Bi, LegalSection } from '../types';

export type Block = { p: Bi } | { ul: Bi<string[]> };
export interface Section {
  heading: Bi;
  blocks: Block[];
}

export const PRIVACY_PRODUCT = {
  h1: { th: 'นโยบายความเป็นส่วนตัว (dashboard และ API)', en: 'Privacy notice (dashboard and API)' },
  intro: { th: 'หน้านี้ใช้กับคนที่เข้าใช้ dashboard ของ mailmeow หรือส่งอีเมลผ่าน API และกับผู้รับอีเมลที่ส่งผ่าน mailmeow ข้อมูลจากฟอร์มลงชื่อรอใช้อยู่ในหัวข้อ "ถ้าลงชื่อรอใช้ไว้" ท้ายหน้านี้ ตอนนี้ mailmeow อยู่ในช่วงทดลองแบบปิด (private beta) ใช้ได้เฉพาะคนที่ได้รับเชิญ', en: 'This notice covers people who use the mailmeow dashboard or send email through the API, and the people who receive that email. The waitlist form is covered in "If you joined the waitlist" at the end of this page. mailmeow is in private beta: only invited people can use it.' },
  sections: [
    {
      heading: { th: 'ใครดูแลข้อมูลส่วนไหน', en: 'Who is responsible for what' },
      blocks: [
        { p: { th: 'ภูรินท์ บุรีวงศ์ (Pooh) ให้บริการ mailmeow ในฐานะบุคคลธรรมดา ในหน้านี้ "เรา" หมายถึง Pooh', en: 'mailmeow is run by Pooh (Purin Buriwong), as an individual. In this notice, "we" means Pooh.' } },
        { p: { th: 'ข้อมูลบัญชีของคุณ คือ อีเมล session ลิงก์เข้าสู่ระบบ และคำเชิญ เราเป็นผู้ควบคุมข้อมูลส่วนบุคคล', en: 'For your account (your email, sessions, sign-in links and invites), we are the data controller.' } },
        { p: { th: 'อีเมลที่คุณส่งและข้อมูลของผู้รับ Workspace ของคุณ (คนหรือธุรกิจที่ใช้ Workspace นั้นส่งอีเมล) เป็นผู้ควบคุมข้อมูลส่วนบุคคล เราเป็นผู้ประมวลผลข้อมูลส่วนบุคคล และใช้ข้อมูลนี้แค่เพื่อส่งอีเมลและติดตามสถานะการส่งให้คุณ', en: 'For the email you send and its recipients, your workspace (the person or business that sends through it) is the data controller. We process that data only to deliver your email and track its delivery.' } },
        { p: { th: 'ถ้าคุณได้รับอีเมลที่ส่งผ่าน mailmeow และอยากขอดูหรือขอลบข้อมูลของตัวเอง ให้ติดต่อคนหรือธุรกิจที่ส่งอีเมลนั้นมา', en: 'If you received an email sent through mailmeow and want to see or delete your data, contact the person or business that sent it.' } },
      ],
    },
    {
      heading: { th: 'เราเก็บอะไรเกี่ยวกับคุณ', en: 'What we store about you' },
      blocks: [
        {
          ul: {
            th: [
              'อีเมลของคุณ เวลาที่สร้างบัญชี และเวลาที่เข้าสู่ระบบล่าสุด',
              'Workspace ที่คุณเป็นสมาชิก และบทบาทในแต่ละ Workspace (เจ้าของ แอดมิน หรือสมาชิก)',
              'เวลาที่คุณกดรับคำเชิญ เพราะตอนนั้นคุณยอมรับข้อตกลงการใช้งานด้วย',
              'session ตอนเข้าสู่ระบบ: เราเก็บรหัส session ที่แปลงเป็นรหัสทางเดียว (hash) แล้ว ไม่เก็บตัวจริง พร้อมเวลาที่เริ่ม เวลาที่ใช้ล่าสุด เวลาหมดอายุ และชื่อเบราว์เซอร์กับระบบที่คุณใช้ (user agent)',
              'ลิงก์เข้าสู่ระบบ: เก็บเป็น hash ใช้ได้ครั้งเดียว และหมดอายุใน 15 นาที',
              'คำเชิญ: อีเมลของคนที่ได้รับเชิญ บทบาท คนที่เชิญ และเวลา',
            ],
            en: [
              'Your email, when you created your account, and when you last signed in',
              'The workspaces you belong to, and your role in each (owner, admin or member)',
              'When you accepted an invite, because accepting it also accepts the acceptable-use terms',
              'Your sessions: a one-way hash of the session token (never the token itself), with when it started, when it was last used, when it expires, and your browser and system name (user agent)',
              'Sign-in links: stored as a hash, single use, expiring after 15 minutes',
              'Invites: the invited email address, the role, who sent the invite, and when',
            ],
          },
        },
        { p: { th: 'ใช้ข้อมูลนี้เพื่อให้คุณเข้าสู่ระบบได้ เห็นเฉพาะ Workspace ที่คุณเป็นสมาชิก ส่งลิงก์เข้าสู่ระบบกับคำเชิญ และรู้ว่าคุณยอมรับข้อตกลงการใช้งานแล้ว', en: 'We use it to sign you in, show you only the workspaces you belong to, send sign-in links and invites, and know that you accepted the acceptable-use terms.' } },
      ],
    },
    {
      heading: { th: 'เราเก็บอะไรเกี่ยวกับผู้รับของคุณ', en: 'What we store about your recipients' },
      blocks: [
        {
          ul: {
            th: [
              'ที่อยู่อีเมลผู้รับ (to cc และ bcc)',
              'ชื่อเรื่อง',
              'เนื้อหาอีเมล: เก็บ 7 วันในแพ็กเกจ Free และ 30 วันในแพ็กเกจที่จ่ายเงิน จากนั้นเราลบจริง ไม่ได้แค่ซ่อน',
              'ไฟล์แนบ: เก็บเนื้อไฟล์จนกว่าอีเมลจะส่งแล้ว (หรือส่งไม่สำเร็จ) และนานสุด 7 วัน จากนั้นเราลบจริง ส่วนชื่อ ประเภท และขนาดของไฟล์ เก็บไว้กับอีเมล 90 วัน',
              'สถานะการส่งและเวลา เช่น ส่งแล้ว ถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม',
              'ผู้รับที่ถูกบล็อก: ที่อยู่ที่ตีกลับถาวรหรือถูกแจ้งสแปม พร้อมเหตุผลและเวลา ระบบจะไม่ส่งไปที่อยู่นั้นอีก',
            ],
            en: [
              'Recipient addresses (to, cc and bcc)',
              'Subject lines',
              'Email bodies: kept for 7 days on Free and 30 days on paid plans, then deleted, not just hidden',
              'Attachments: the file itself is kept until the email is sent (or fails), and 7 days at most, then deleted. The file name, type and size stay with the email record for 90 days',
              'Delivery events and their times, such as sent, delivered, bounced or reported as spam',
              'Blocked addresses: addresses that bounced permanently or reported spam, with the reason and the time, so we stop sending to them',
            ],
          },
        },
        { p: { th: 'หลังลบเนื้อหาอีเมลแล้ว ที่อยู่ผู้รับ ชื่อเรื่อง และสถานะการส่งยังอยู่ในประวัติของ Workspace 90 วัน แล้วเราลบ หรือลบเร็วกว่านั้นถ้าเจ้าของลบ Workspace', en: "After the body is deleted, the recipient addresses, subject and delivery events stay in the workspace's history for 90 days, then we delete them, or sooner if an owner deletes the workspace." } },
      ],
    },
    {
      heading: { th: 'ใครประมวลผลข้อมูลให้เรา', en: 'Who processes it for us' },
      blocks: [
        {
          ul: {
            th: [
              'AWS (Amazon SES) ที่สิงคโปร์: ส่งอีเมล และส่งรายงานผลการส่งกลับมา เช่น ถึงแล้วหรือตีกลับ',
              'Railway: รัน API และฐานข้อมูล ข้อมูลเก็บอยู่ใน region ของ Railway',
              'Cloudflare: เปิดหน้า dashboard ส่งคำขอจาก dashboard ต่อไปที่ API และดูแล DNS',
            ],
            en: [
              'AWS (Amazon SES) in Singapore: sends your email and reports back on delivery, such as delivered or bounced',
              "Railway: hosts the API and the database, in Railway's region",
              'Cloudflare: serves the dashboard, passes its requests on to the API, and runs DNS',
            ],
          },
        },
        { p: { th: 'AWS อยู่ที่สิงคโปร์ ข้อมูลอีเมลจึงออกไปนอกประเทศไทย', en: 'AWS is in Singapore, so email data leaves Thailand.' } },
        { p: { th: 'dashboard ไม่มีตัวติดตามโฆษณา และไม่ใช้บริการวิเคราะห์ข้อมูลของคนอื่น (third-party analytics) ตัวเลขสถิติทั้งหมดคำนวณจากฐานข้อมูลของเราเอง', en: 'The dashboard has no ad trackers and no third-party analytics. Every stat is computed from our own database.' } },
      ],
    },
    {
      heading: { th: 'ใครที่ mailmeow เห็นข้อมูลได้', en: 'Who at mailmeow can see it' },
      blocks: [
        { p: { th: 'หน้าจอแอดมินของเราเห็นแค่ตัวเลขรวม เช่น จำนวนอีเมลที่ส่ง อัตราตีกลับ และอัตราถูกแจ้งสแปม', en: 'Our admin screens show totals only, such as emails sent, bounce rate and spam-report rate.' } },
        { p: { th: 'ถ้าเราต้องเปิดดูอีเมลหรือผู้รับของ Workspace ไหนเพื่อช่วยแก้ปัญหา ต้องบันทึกเหตุผลก่อนทุกครั้ง ทุกครั้งที่เปิดดูจะลงบันทึกไว้ และเจ้าของ Workspace นั้นเห็นบันทึกนี้ได้', en: "To open a workspace's emails or recipients to help with a problem, we must record a reason first. Every such access is logged, and that workspace's owner can see it." } },
        { p: { th: 'บันทึกการทำงานของแอดมินไม่เก็บที่อยู่ผู้รับหรือเนื้อหาอีเมล', en: 'The admin audit log never holds recipient addresses or email content.' } },
      ],
    },
    {
      heading: { th: 'คุกกี้', en: 'Cookies' },
      blocks: [
        { p: { th: 'dashboard ไม่มีคุกกี้โฆษณา คุกกี้ที่เราตั้งมี 3 ตัว', en: 'The dashboard sets no ad cookies. We set 3 cookies:' } },
        {
          ul: {
            th: [
              '`__Host-mm_session`: ทำให้คุณยังเข้าสู่ระบบอยู่ ใช้ได้เฉพาะ `app.mailmeow.dev` เก็บแค่รหัส session ที่เราเทียบกับ hash ในฐานข้อมูล session หมดอายุเมื่อไม่ได้ใช้ 7 วัน หรือครบ 30 วันหลังเข้าสู่ระบบ',
              '`mm_lang`: จำว่าคุณเลือกภาษาไทยหรืออังกฤษ ใช้ร่วมกันทั้งเว็บ docs และ dashboard เก็บไว้ 1 ปี',
              '`mm_signed_in`: ไม่มีข้อมูลอะไรอยู่ข้างใน มีไว้ให้เว็บ `mailmeow.dev` แสดงปุ่มไปที่ dashboard แทนปุ่มเข้าสู่ระบบ ระบบลบคุกกี้นี้เมื่อคุณออกจากระบบ',
            ],
            en: [
              '`__Host-mm_session`: Keeps you signed in. It works only on `app.mailmeow.dev` and holds only the session token, which we check against the hash in our database. A session ends after 7 days without use, or 30 days after you sign in.',
              '`mm_lang`: Remembers whether you chose Thai or English, across the site, the docs and the dashboard. It lasts 1 year.',
              '`mm_signed_in`: Holds no data. It lets `mailmeow.dev` show a dashboard button instead of a sign-in button. We clear it when you sign out.',
            ],
          },
        },
        { p: { th: 'dashboard ยังจำ Workspace ที่คุณใช้ล่าสุดไว้ในเบราว์เซอร์ (localStorage) ค่านี้อยู่ในเครื่องคุณเท่านั้น', en: 'The dashboard also remembers your last-used workspace in your browser (localStorage). It stays on your device.' } },
      ],
    },
    {
      heading: { th: 'สิทธิ์ของคุณ', en: 'Your rights' },
      blocks: [
        {
          ul: {
            th: [
              'ขอดูข้อมูลของคุณที่เราเก็บไว้',
              'ขอแก้ข้อมูลที่ไม่ถูกต้อง',
              'ออกจาก Workspace ได้ทุกเมื่อ',
              'ลบบัญชีตัวเองได้ใน dashboard',
              'เจ้าของลบ Workspace ได้ใน dashboard โดยพิมพ์ชื่อ Workspace เพื่อยืนยัน ภายใน 7 วัน เราจะลบข้อมูลทั้งหมดของ Workspace นั้น ได้แก่ อีเมล สถานะการส่ง API key ทุกอัน webhook ทุกตัว และรายชื่อผู้รับที่ถูกบล็อก',
              'ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)',
            ],
            en: [
              'See the data we hold about you',
              'Correct data that is wrong',
              'Leave a workspace at any time',
              'Delete your account in the dashboard',
              'As an owner, delete a workspace in the dashboard by typing its name to confirm. Within 7 days we purge all of its data: emails, delivery events, keys, webhooks and blocked addresses.',
              "Complain to Thailand's Personal Data Protection Committee (PDPC)",
            ],
          },
        },
        { p: { th: 'ถ้าคุณเป็นเจ้าของคนสุดท้ายของ Workspace ต้องโอนสิทธิ์เจ้าของให้สมาชิกคนอื่น หรือลบ Workspace ก่อน ถึงจะออกจาก Workspace หรือลบบัญชีได้ เพราะทุก Workspace ต้องมีเจ้าของอย่างน้อย 1 คน', en: 'If you are the last owner of a workspace, transfer ownership to another member or delete the workspace before you leave it or delete your account. Every workspace must have at least one owner.' } },
        { p: { th: 'ขอดูหรือขอแก้ข้อมูล ส่งอีเมลมาที่ {contact} จากอีเมลที่ใช้เข้าสู่ระบบ บอกว่าอยากทำอะไร', en: 'To see or correct your data, email {contact} from the address you sign in with and tell us what you want.' } },
      ],
    },
    {
      heading: { th: 'เก็บนานแค่ไหน', en: 'How long we keep things' },
      blocks: [
        {
          ul: {
            th: [
              'บัญชีของคุณ: จนกว่าคุณจะลบบัญชี',
              'บทบาทใน Workspace: จนกว่าคุณจะออกเอง มีคนเอาคุณออก หรือเจ้าของลบ Workspace',
              'session: หมดอายุเมื่อไม่ได้ใช้ 7 วัน หรือครบ 30 วัน แล้วเราลบ session ที่หมดอายุภายใน 30 วันหลังหมดอายุ',
              'ลิงก์เข้าสู่ระบบ: หมดอายุใน 15 นาที แล้วเราลบภายใน 30 วันหลังหมดอายุ',
              'คำเชิญ: หมดอายุใน 7 วัน หรือ 72 ชั่วโมงสำหรับคำเชิญเจ้าของ แล้วเราลบภายใน 30 วันหลังหมดอายุ',
              'เนื้อหาอีเมล: 7 วันในแพ็กเกจ Free และ 30 วันในแพ็กเกจที่จ่ายเงิน',
              'ไฟล์แนบ (เนื้อไฟล์): ลบหลังส่งอีเมลแล้ว หรือส่งไม่สำเร็จ และนานสุด 7 วัน',
              'ที่อยู่ผู้รับ ชื่อเรื่อง และสถานะการส่ง: 90 วัน',
              'ชื่อ ประเภท และขนาดของไฟล์แนบ: 90 วัน',
              'ผู้รับที่ถูกบล็อก: จนกว่าเจ้าของหรือแอดมินจะเอาออก หรือเจ้าของลบ Workspace',
              'Workspace ที่เจ้าของลบ: ลบข้อมูลหมดภายใน 7 วัน',
              'รายงานผลการส่งจาก AWS: เราลบภายใน 7 วันหลังอ่านแล้ว ถ้ายังไม่ได้อ่าน คิวเก็บไว้นานสุด 14 วัน',
              'บันทึกการทำงานของแอดมิน:',
              'ข้อมูลสำรอง (backup):',
              'คุกกี้ `mm_lang`: 1 ปี',
            ],
            en: [
              'Your account: until you delete it',
              'Your workspace roles: until you leave, are removed, or the workspace is deleted',
              'Sessions: end after 7 days without use or 30 days in all; we delete them within 30 days after they end',
              'Sign-in links: expire after 15 minutes; we delete them within 30 days after that',
              'Invites: expire after 7 days, or 72 hours for owner invites; we delete them within 30 days after that',
              'Email bodies: 7 days on Free, 30 days on paid plans',
              'Attachment files: deleted once the email is sent or fails, and after 7 days at most',
              'Recipient addresses, subjects and delivery events: 90 days',
              'Attachment names, types and sizes: 90 days',
              'Blocked addresses: until an owner or admin removes them, or an owner deletes the workspace',
              'A deleted workspace: all of its data is purged within 7 days',
              'Delivery reports from AWS: deleted within 7 days after we read them; unread ones wait in the queue for at most 14 days',
              'Admin audit log:',
              'Backups:',
              'The `mm_lang` cookie: 1 year',
            ],
          },
        },
      ],
    },
    {
      heading: { th: 'ติดต่อเรา', en: 'Contact' },
      blocks: [
        { p: { th: 'ถามเรื่องข้อมูลส่วนบุคคล ขอดู ขอแก้ หรือขอลบข้อมูล ส่งอีเมลมาที่ {contact}', en: 'Questions about your data, or requests to see, correct or delete it: {contact}' } },
      ],
    },
  ] as LegalSection[],
  updated: { th: 'แก้ไขล่าสุด {date}', en: 'Last updated {date}' },
};

/** One draft notice for the whole /privacy page (product notice and waitlist notice) until a lawyer has reviewed it. */
export const PRIVACY_BANNER: Bi = {
  th: 'ฉบับร่าง: นโยบายนี้ยังต้องให้ทนายตรวจก่อนเปิดใช้งานจริง และอาจเปลี่ยน',
  en: 'Draft: this notice needs a legal check before launch and may change.',
};

/** Heading of the section that holds the waitlist notice (copy/privacy.md). */
export const WAITLIST_HEADING: Bi = { th: 'ถ้าลงชื่อรอใช้ไว้', en: 'If you joined the waitlist' };
