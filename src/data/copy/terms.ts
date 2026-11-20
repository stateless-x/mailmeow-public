// Verbatim from docs/copy/terms.md (draft: needs a lawyer's check before launch; see that doc's Flags).
// Markers are stripped here; which sentences carried one is in tests/unit/fixtures/terms-legal-check.ts.
import type { Bi, LegalSection } from '../types';

export type Block = { p: Bi } | { ul: Bi<string[]> };
export interface Section {
  heading: Bi;
  blocks: Block[];
}

export const TERMS = {
  h1: { th: 'ข้อตกลงการใช้งาน', en: 'Acceptable-use terms' },
  version: { th: 'เวอร์ชัน `2026-11-draft` แก้ไขล่าสุด {date}', en: 'Version `2026-11-draft`, last updated {date}' },
  intro: { th: 'ข้อตกลงนี้ใช้กับทุกคนที่เข้าร่วม Workspace ใน mailmeow เมื่อกดรับคำเชิญเข้า Workspace ถือว่าคุณยอมรับข้อตกลงนี้ ถ้าไม่ยอมรับ ก็ไม่ต้องกดรับคำเชิญ', en: "These terms apply to everyone who joins a workspace on mailmeow. When you accept a workspace invite, you accept these terms. If you don't agree, don't accept the invite." },
  sections: [
    {
      heading: { th: 'ใครให้บริการ', en: 'Who runs mailmeow' },
      blocks: [
        { p: { th: 'ภูรินท์ บุรีวงศ์ (Pooh) ให้บริการ mailmeow ในฐานะบุคคลธรรมดา ในข้อตกลงนี้ "เรา" หมายถึง Pooh', en: 'mailmeow is run by Pooh (Purin Buriwong), as an individual. In these terms, "we" means Pooh.' } },
      ],
    },
    {
      heading: { th: 'mailmeow คืออะไร', en: 'What mailmeow is' },
      blocks: [
        { p: { th: 'mailmeow เป็นบริการส่งอีเมลผ่าน API ให้แอปของคุณ ตอนนี้ยังอยู่ในช่วงทดลองแบบปิด (private beta) ใช้ได้เฉพาะคนที่ได้รับเชิญ', en: 'mailmeow is an API that sends email for your app. It is in private beta: only invited people can use it.' } },
        { p: { th: 'ช่วงทดลองนี้เราไม่รับประกันว่าระบบจะใช้ได้ตลอดเวลา ระบบอาจล่มหรือส่งช้าได้ ฟีเจอร์ ขีดจำกัด และหน้าจอเปลี่ยนได้ระหว่างทดลอง', en: "During the beta we don't promise any uptime. The service may go down or send late. Features, limits and screens can change during the beta." } },
      ],
    },
    {
      heading: { th: 'ส่งอะไรได้', en: 'What you may send' },
      blocks: [
        { p: { th: 'ส่งได้เฉพาะอีเมลที่ผู้รับรู้อยู่แล้วว่าจะได้รับ คือ', en: 'Send only email the recipient expects, which means:' } },
        {
          ul: {
            th: [
              'อีเมลถึงคนที่สมัครหรือลงชื่อกับแอปของคุณเอง',
              'อีเมลทั่วไปที่ผู้ใช้รอรับ เช่น ลิงก์เข้าสู่ระบบ ใบเสร็จ และอีเมลตั้งรหัสผ่านใหม่',
              'แคมเปญถึงคนที่ยินยอมรับไว้แล้ว โดยทุกฉบับต้องมีลิงก์ยกเลิกรับข่าว',
            ],
            en: [
              'Email to people who signed up with your own app',
              'Everyday emails people are waiting for, such as login links, receipts and password resets',
              'Campaigns to people who opted in, with an unsubscribe link in every email',
            ],
          },
        },
        { p: { th: 'อีเมลแคมเปญต้องใส่ header `List-Unsubscribe` และ `List-Unsubscribe-Post` ด้วย Gmail และ Outlook จะได้แสดงปุ่มยกเลิกรับข่าวให้ผู้รับ ถ้ามีคนกดยกเลิก ต้องหยุดส่งแคมเปญให้คนนั้นภายใน 2 วัน', en: 'Campaign emails must also carry the `List-Unsubscribe` and `List-Unsubscribe-Post` headers, so Gmail and Outlook show their own unsubscribe button. When someone unsubscribes, stop sending them campaigns within 2 days.' } },
      ],
    },
    {
      heading: { th: 'ห้ามส่งอะไร', en: 'What you may not send' },
      blocks: [
        {
          ul: {
            th: [
              'อีเมลถึงรายชื่อที่ซื้อมา เช่ามา หรือเก็บมาจากเว็บอื่น',
              'สแปม คืออีเมลที่ผู้รับไม่ได้ขอและไม่ได้คาดว่าจะได้รับ',
              'อีเมลหลอกเอารหัสผ่าน ข้อมูลบัตร หรือข้อมูลส่วนตัว (phishing)',
              'ไฟล์หรือลิงก์ที่มีมัลแวร์',
              'อีเมลที่แอบอ้างเป็นคนอื่น บริษัทอื่น หรือหน่วยงานอื่น',
              'เนื้อหาที่ผิดกฎหมาย รวมถึงเนื้อหาที่ขัดกับกฎหมายไทย',
            ],
            en: [
              'Email to purchased, rented or scraped lists',
              "Spam: email the recipient didn't ask for and doesn't expect",
              'Phishing: email that tricks people into giving passwords, card details or personal data',
              'Malware, in files or links',
              'Impersonation of another person, company or organization',
              'Illegal content, including anything against Thai law',
            ],
          },
        },
        { p: { th: 'ถ้าไม่แน่ใจว่าอีเมลแบบไหนส่งได้ ถามมาที่ {contact} ก่อนส่ง', en: 'Not sure whether something is allowed? Ask at {contact} before you send.' } },
      ],
    },
    {
      heading: { th: 'เราดูแลชื่อเสียงการส่งที่ใช้ร่วมกันยังไง', en: 'How we protect the shared sending reputation' },
      blocks: [
        { p: { th: 'ทุก Workspace ส่งอีเมลผ่านบัญชีส่งอีเมลเดียวกัน ถ้า Workspace ไหนส่งไปที่อยู่ที่ใช้ไม่ได้หรือถูกแจ้งสแปมบ่อย ผู้ให้บริการส่งอีเมลหยุดการส่งของทุกคนได้ เราจึงมีกฎด้านล่างนี้', en: 'Every workspace sends through one shared sending account. If one workspace sends to many bad addresses or gets many spam reports, the email provider can stop sending for everyone. These rules prevent that.' } },
        { p: { th: 'ผู้รับที่ถูกบล็อก: ถ้าอีเมลตีกลับถาวรหรือถูกแจ้งสแปม ระบบจะไม่ส่งไปที่อยู่นั้นอีก เจ้าของหรือแอดมินของ Workspace เอาที่อยู่ออกจากรายการได้ใน dashboard แต่ถ้าที่อยู่นั้นยังใช้ไม่ได้ การส่งซ้ำจะทำให้โดเมนของคุณเสียความน่าเชื่อถือ', en: "Blocked addresses: when an email bounces permanently or is reported as spam, we stop sending to that address. A workspace owner or admin can remove an address in the dashboard, but sending again to an address that is still bad hurts your domain's reputation." } },
        { p: { th: 'หยุดส่งเมื่อตีกลับมาก: เมื่อ Workspace ส่งครบ 100 ฉบับแล้ว ถ้าอีเมลตีกลับเกิน 4% ของ 500 ฉบับล่าสุด ระบบจะหยุดส่งให้ Workspace นั้นชั่วคราว ถ้ายังส่งไม่ถึง 100 ฉบับ ระบบจะหยุดเมื่อตีกลับครบ 10 ฉบับ', en: 'Bounce line: once a workspace has sent 100 emails or more, its sending pauses when more than 4% of its last 500 emails bounced. Before it reaches 100 emails, sending pauses at 10 bounces.' } },
        { p: { th: 'หยุดส่งเมื่อถูกแจ้งสแปมมาก: ระบบจะหยุดส่งให้ Workspace ชั่วคราว เมื่อถูกแจ้งสแปมตั้งแต่ 3 ครั้งขึ้นไป และจำนวนนั้นเกิน 0.08% ของอีเมลที่ส่ง โดยนับในช่วงที่สั้นกว่าระหว่าง 5,000 ฉบับล่าสุดกับ 30 วันล่าสุด', en: "Spam-report line: a workspace's sending pauses when it has 3 or more spam reports and they are more than 0.08% of the emails it sent, counted over the last 5,000 emails or the last 30 days, whichever is smaller." } },
        { p: { th: 'เตือนก่อนหยุด: เมื่อตัวเลขถึงครึ่งหนึ่งของเกณฑ์ข้อใดข้อหนึ่งข้างบน เจ้าของ Workspace จะได้อีเมลเตือน และเห็นแถบเตือนใน dashboard', en: 'Warning first: at half of either line above, the workspace owner gets a warning email and sees a warning banner in the dashboard.' } },
        { p: { th: 'จำนวนส่งต่อวันและต่อเดือน: Workspace ใหม่ทุกแห่ง รวมถึงแพ็กเกจที่จ่ายเงิน เริ่มที่วันละ 100 ฉบับ และเราเพิ่มให้ได้ แต่ละแพ็กเกจมีจำนวนต่อเดือนของตัวเอง แพ็กเกจ Free จะหยุดส่งเมื่อถึงจำนวนต่อวันหรือต่อเดือน เจ้าของจะได้อีเมลแจ้ง และเห็นแถบแจ้งใน dashboard แพ็กเกจที่จ่ายเงินส่งเกินจำนวนต่อเดือนได้ และจ่ายค่าส่วนเกิน', en: 'Daily and monthly limits: every new workspace, paid plans included, starts at 100 emails a day, and we can raise it. Each plan has its own monthly limit. On Free, sending stops at the daily or monthly limit; the owner gets an email and sees a banner in the dashboard. Paid plans can send past the monthly limit and pay for the extra emails.' } },
      ],
    },
    {
      heading: { th: 'ถ้า Workspace ถูกหยุดส่ง', en: 'What happens when we pause' },
      blocks: [
        { p: { th: 'ถ้าระบบหยุดส่งอัตโนมัติ เจ้าของ Workspace จะได้อีเมล และเห็นแถบใน dashboard ที่บอกว่าเกิดอะไรขึ้นและต้องทำอะไรต่อ', en: 'When sending pauses automatically, the workspace owner gets an email and sees a banner in the dashboard saying what happened and what to do next.' } },
        { p: { th: 'เราหยุดส่งเองได้ด้วย ถ้าเห็นว่า Workspace ใช้งานผิดข้อตกลงนี้ เราต้องบันทึกเหตุผลทุกครั้ง และจะส่งอีเมลบอกเหตุผลให้เจ้าของ Workspace', en: 'We can also pause a workspace by hand if it breaks these terms. We must record a reason each time, and we email the workspace owner that reason.' } },
        { p: { th: 'ถ้าคิดว่าหยุดผิด หรือแก้ต้นเหตุแล้ว ส่งอีเมลมาที่ {contact} เพื่อขอให้ตรวจ เราจะดูตัวเลขกับเหตุผล แล้วตัดสินว่าจะเปิดการส่งคืนไหม เมื่อเปิดคืน ระบบจะเริ่มนับใหม่ตั้งแต่ตอนนั้น อีเมลที่ตีกลับก่อนหน้าจะไม่ทำให้หยุดซ้ำ', en: "If you think a pause is wrong, or you've fixed the cause, email {contact} to ask for a review. We look at the numbers and the reason, then decide whether to resume sending. When sending resumes, the count starts again from that moment, so earlier bounces can't pause it again." } },
        { p: { th: 'ถ้าใช้งานผิดข้อตกลงนี้อย่างร้ายแรง เช่น ส่ง phishing หรือมัลแวร์ เราอาจปิด Workspace นั้น', en: 'For serious abuse, such as sending phishing or malware, we may close the workspace.' } },
      ],
    },
    {
      heading: { th: 'ข้อมูลของคุณและของเรา', en: 'Your data and ours' },
      blocks: [
        { p: { th: 'นโยบายความเป็นส่วนตัวอยู่ที่ /privacy ครอบคลุมทั้งข้อมูลจากฟอร์มลงชื่อรอใช้ และข้อมูลของคนที่ใช้ dashboard และ API ข้อมูลใน Workspace เป็นไปตามข้อด้านล่างนี้', en: 'Our privacy notice is at /privacy. It covers both the waitlist form and people who use the dashboard and the API. Data in your workspace is handled as set out below.' } },
        { p: { th: 'เนื้อหาอีเมลเก็บไว้ 7 วันในแพ็กเกจ Free และ 30 วันในแพ็กเกจที่จ่ายเงิน ส่วนข้อมูลอื่นของอีเมล ได้แก่ ที่อยู่ผู้รับ ชื่อเรื่อง และสถานะการส่ง เก็บไว้ 90 วัน จากนั้นเราลบจริง ไม่ได้แค่ซ่อน ผู้รับที่ถูกบล็อกเก็บไว้จนกว่าจะเอาออก ไฟล์แนบลบหลังส่งอีเมลแล้ว หรือส่งไม่สำเร็จ และนานสุด 7 วัน ส่วนชื่อ ประเภท และขนาดของไฟล์เก็บไว้กับอีเมล 90 วัน', en: 'Email bodies are kept for 7 days on Free and 30 days on paid plans. The rest of each email record (recipient addresses, subject and delivery statuses) is kept for 90 days. Then we delete them, not just hide them. Blocked addresses are kept until they are removed. Attachment files are deleted once the email is sent or fails, and after 7 days at most; their names, types and sizes are kept with the email record for 90 days.' } },
        { p: { th: 'เจ้าของลบ Workspace ได้ โดยพิมพ์ชื่อ Workspace เพื่อยืนยัน ภายใน 7 วัน เราจะลบข้อมูลทั้งหมดของ Workspace นั้น ได้แก่ อีเมล ประวัติสถานะ API key ทุกอัน webhook ทุกตัว และรายชื่อผู้รับที่ถูกบล็อก', en: 'An owner can delete a workspace by typing its name to confirm. Within 7 days we purge all of its data: emails, events, keys, webhooks and blocked addresses.' } },
        { p: { th: 'สมาชิกออกจาก Workspace ได้ทุกเมื่อ และลบบัญชีตัวเองได้ ถ้าเป็นเจ้าของคนสุดท้ายของ Workspace ต้องโอนให้คนอื่นหรือลบ Workspace ก่อน', en: 'A member can leave a workspace at any time and can delete their own account. The last owner of a workspace must transfer it or delete it first.' } },
        { p: { th: 'หน้าจอแอดมินของเราเห็นแค่ตัวเลขรวม ถ้าเราต้องเปิดดูอีเมลหรือผู้รับของ Workspace ไหนเพื่อช่วยแก้ปัญหา ต้องบันทึกเหตุผลก่อนทุกครั้ง ทุกครั้งที่เปิดดูจะลงบันทึกไว้ และเจ้าของ Workspace นั้นเห็นบันทึกนี้ได้', en: "Our admin screens show totals only. To open a workspace's emails or recipients to help with a problem, we must record a reason first. Every such access is logged, and that workspace's owner can see it." } },
      ],
    },
    {
      heading: { th: 'API key', en: 'Keys' },
      blocks: [
        { p: { th: 'เก็บ API key เป็นความลับ ไว้ฝั่ง server เท่านั้น อย่าใส่ในโค้ดหน้าเว็บหรือแอปมือถือ ระหว่างทำแอปให้ใช้ API key ทดสอบ API key นี้ไม่ส่งอีเมลถึงคนจริง', en: 'Keep your keys secret and on your server only. Never put them in browser or mobile app code. While you build, use a test key; it never sends email to a real person.' } },
        { p: { th: 'คุณรับผิดชอบทุกอย่างที่ส่งด้วย API key ของคุณ ถ้า API key หลุด ให้เพิกถอน API key นั้นแล้วสร้างใหม่ทันที', en: 'You are responsible for everything sent with your keys. If a key leaks, revoke it and create a new one right away.' } },
      ],
    },
    {
      heading: { th: 'ถ้าข้อตกลงนี้เปลี่ยน', en: 'Changes to these terms' },
      blocks: [
        { p: { th: 'ถ้าเราแก้ข้อตกลงนี้ เราจะเปลี่ยนเวอร์ชันและวันที่ด้านบน และส่งอีเมลบอกเจ้าของทุก Workspace ก่อนข้อตกลงใหม่มีผล ถ้ายังใช้ mailmeow ต่อหลังวันนั้น ถือว่ายอมรับข้อตกลงใหม่', en: 'If we change these terms, we change the version and date at the top and email every workspace owner before the new version takes effect. If you keep using mailmeow after that date, you accept the new version.' } },
      ],
    },
    {
      heading: { th: 'ติดต่อเรา', en: 'Contact' },
      blocks: [
        { p: { th: 'ถามเรื่องข้อตกลงนี้ ขอให้ตรวจการหยุดส่ง หรือแจ้งว่ามีคนใช้งานผิดข้อตกลง ส่งอีเมลมาที่ {contact}', en: 'Questions about these terms, pause reviews and abuse reports: {contact}' } },
      ],
    },
    {
      heading: { th: 'กฎหมายที่ใช้', en: 'Governing law' },
      blocks: [
        { p: { th: 'ข้อตกลงนี้ใช้กฎหมายไทย', en: 'These terms are governed by the laws of Thailand.' } },
      ],
    },
  ] as LegalSection[],
};

/** The draft notice shown at the top of the page until a lawyer has reviewed the terms. */
export const TERMS_BANNER: Bi = {
  th: 'ฉบับร่าง: ข้อตกลงนี้ยังไม่ได้ให้ทนายตรวจ และอาจเปลี่ยนก่อนเปิดใช้งานจริง',
  en: "Draft: a lawyer hasn't reviewed these terms yet, and they may change before launch.",
};
