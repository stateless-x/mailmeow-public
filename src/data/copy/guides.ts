// Verbatim from docs/copy/guides.md. Markers: **bold** `code` [text](url|@slug).
// Rules (copy/landing.md): say what the customer gets, never how mailmeow works inside;
// every mailmeow claim is something it does today; no statistics we can't source.
import type { Bi } from '../types';
import type { Faq } from './landing';

export interface GuideSection {
  heading: Bi;
  intro?: Bi;
  /** A table: column headings, then rows of cells. */
  table?: { cols: Bi[]; rows: Bi[][] };
  list?: Bi[];
  /** true = numbered steps. */
  ordered?: boolean;
}

export interface Guide {
  h1: Bi;
  /** The direct answer, first under the H1: what search snippets and AI answers lift. */
  lead: Bi;
  sections: GuideSection[];
  /** "Where mailmeow helps": the only part that talks about mailmeow. */
  helps: { heading: Bi; list: Bi[] };
  faq: Faq[];
  /** The other guide, linked at the end. */
  related: string;
}

const HELPS_HEADING: Bi = { th: 'mailmeow ช่วยตรงไหน', en: 'Where mailmeow helps' };

export const GUIDE_CTA = {
  cta: { th: 'ลงชื่อรอใช้', en: 'Join the waitlist' },
  note: { th: 'ยังไม่เปิดให้ใช้ ลงชื่อไว้ก่อนได้ ไม่ต้องใช้บัตร', en: 'Not open yet. Join the waitlist, no card needed.' },
  related: { th: 'อ่านต่อ', en: 'Read next' },
  faqHeading: { th: 'คำถามที่พบบ่อย', en: 'Questions people ask' },
};

export const GUIDES: Record<string, Guide> = {
  'otp-email-not-arriving': {
    h1: { th: 'อีเมล OTP ไม่เข้า เกิดจากอะไร แก้ยังไง', en: 'OTP emails not arriving? Causes and fixes' },
    lead: {
      th: 'อีเมล OTP ไม่เข้ามักเกิดจาก 4 อย่าง โดเมนยังไม่ได้ตั้ง SPF DKIM และ DMARC ที่อยู่อีเมลผิด บริการที่ใช้ส่งติดลิมิต หรือเนื้อหาดูเหมือนสแปมจนไปอยู่ใน Junk เริ่มจากดูสถานะของอีเมลฉบับนั้นก่อน จะรู้ทันทีว่าต้องแก้ตรงไหน',
      en: 'OTP emails usually go missing for one of four reasons: the domain has no SPF, DKIM or DMARC, the address is wrong, the sending service hit its limit, or the email looks like spam and lands in Junk. Start with the email\'s status; it tells you which one to fix.',
    },
    sections: [
      {
        heading: { th: 'เช็กก่อน อีเมลฉบับนั้นไปถึงไหน', en: 'First, check where that email went' },
        intro: {
          th: 'บริการส่งอีเมลส่วนมากบอกสถานะของแต่ละฉบับได้ ดูสถานะแล้วทำตามแถวที่ตรงกัน',
          en: "Most email services show each email's status. Find the status, then follow its row.",
        },
        table: {
          cols: [
            { th: 'สถานะ', en: 'Status' },
            { th: 'แปลว่า', en: 'What it means' },
            { th: 'ทำยังไงต่อ', en: 'What to do' },
          ],
          rows: [
            [
              { th: 'ส่งถึงแล้ว', en: 'Delivered' },
              { th: 'เซิร์ฟเวอร์ของผู้รับรับไปแล้ว', en: "The recipient's mail server accepted it" },
              { th: 'ให้ลูกค้าดูในโฟลเดอร์ Junk หรือ Spam และค้นด้วยชื่อแอป', en: 'Ask the user to check Junk or Spam and search for your app name' },
            ],
            [
              { th: 'ตีกลับ', en: 'Bounced' },
              { th: 'ที่อยู่ผิด หรือกล่องจดหมายนั้นไม่มีอยู่จริง', en: "The address is wrong or the mailbox doesn't exist" },
              { th: 'ให้ลูกค้าเช็กอีเมลที่พิมพ์ แล้วกดขอรหัสใหม่', en: 'Ask the user to check the address they typed, then request a new code' },
            ],
            [
              { th: 'ถูกแจ้งสแปม', en: 'Marked as spam' },
              { th: 'ผู้รับกดรายงานว่าเป็นสแปม', en: 'The recipient reported it as spam' },
              { th: 'หยุดส่งไปที่อยู่นี้ และเขียนหัวเรื่องให้ชัดว่าเป็นรหัสจากแอป', en: 'Stop sending to that address, and make the subject say clearly it is a code from your app' },
            ],
            [
              { th: 'ส่งไม่สำเร็จ', en: 'Failed' },
              { th: 'อีเมลไม่ได้ออกไปเลย', en: 'The email never left' },
              { th: 'ดู error ที่แอปได้กลับมา แล้วเช็ก API key และลิมิตของบริการที่ใช้', en: "Read the error your app got back, then check the API key and the service's limit" },
            ],
          ],
        },
      },
      {
        heading: { th: '4 สาเหตุที่เจอบ่อย', en: 'Four usual causes' },
        ordered: true,
        list: [
          {
            th: '**โดเมนยังไม่ได้ตั้ง SPF DKIM และ DMARC** Gmail และ Outlook เลยไม่แน่ใจว่าอีเมลมาจากแอปจริง บางฉบับไป Junk บางฉบับไม่รับเลย ดูวิธีตั้งได้ที่ [SPF DKIM DMARC คืออะไร](@spf-dkim-dmarc)',
            en: "**No SPF, DKIM or DMARC on the domain.** Gmail and Outlook can't tell the email really came from your app, so some go to Junk and some are refused. See [What are SPF, DKIM and DMARC](@spf-dkim-dmarc).",
          },
          {
            th: '**ส่งจาก Gmail ส่วนตัว** Gmail มีลิมิตต่อวัน พอเกินก็ส่งไม่ออก และอีเมลออกจากชื่อ @gmail.com ที่ลูกค้าไม่รู้จัก',
            en: "**Sending from a personal Gmail.** Gmail has a daily limit; past it, nothing goes out. The email also comes from an @gmail.com address users don't recognise.",
          },
          {
            th: '**ที่อยู่อีเมลผิด** พิมพ์ผิดอย่าง gmial.com หรือ hotmial.com ทำให้อีเมลตีกลับ ช่องกรอกอีเมลที่ทักว่า "หมายถึง gmail.com ใช่ไหม" ช่วยได้เยอะ',
            en: '**A mistyped address.** Typos like gmial.com or hotmial.com make the email bounce. A sign-up field that asks "Did you mean gmail.com?" helps a lot.',
          },
          {
            th: '**เนื้อหาดูเหมือนสแปม** หัวเรื่องคลุมเครือ ไม่มีชื่อแอป หรือมีลิงก์เยอะ ทำให้ถูกคัดไป Junk ง่ายขึ้น',
            en: '**Content that looks like spam.** A vague subject, no app name or lots of links make Junk more likely.',
          },
        ],
      },
      {
        heading: { th: 'เขียนอีเมล OTP ให้ถึงง่ายขึ้น', en: 'Write OTP emails that get through' },
        list: [
          { th: 'ใส่ชื่อแอปกับรหัสในหัวเรื่อง เช่น "รหัสเข้าสู่ระบบ MyShop: 482913"', en: 'Put the app name and the code in the subject, like "MyShop login code: 482913".' },
          { th: 'เนื้อหาสั้น รหัสเป็นตัวหนังสือ ไม่ใช่รูป', en: 'Keep the body short, with the code as text, not an image.' },
          { th: 'บอกว่ารหัสหมดอายุเมื่อไร และถ้าไม่ได้ขอเองให้ทำยังไง', en: "Say when the code expires and what to do if they didn't ask for it." },
          { th: 'ส่งจากโดเมนของแอป เช่น `no-reply@example.com` ไม่ใช่ @gmail.com', en: "Send from your app's domain, like `no-reply@example.com`, not @gmail.com." },
        ],
      },
    ],
    helps: {
      heading: HELPS_HEADING,
      list: [
        { th: 'เตรียมค่า SPF DKIM และ DMARC ให้ครบ แค่ก๊อปไปวาง แล้วเช็กให้ว่า record ไหนยังขาด', en: 'Prepares your SPF, DKIM and DMARC values to copy and paste, then checks which record is still missing.' },
        { th: 'บอกทุกฉบับว่าถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม', en: 'Shows whether each email was delivered, bounced or marked as spam.' },
        { th: 'หยุดส่งไปยังที่อยู่ที่ตีกลับหรือถูกแจ้งสแปมให้เอง', en: 'Stops sending to addresses that bounced or reported spam, on its own.' },
      ],
    },
    faq: [
      {
        q: { th: 'OTP เข้า Gmail แต่ไม่เข้า Outlook หรือ Hotmail ทำไม', en: 'Why does the OTP reach Gmail but not Outlook or Hotmail?' },
        a: {
          th: 'แต่ละเจ้าใช้เกณฑ์ไม่เหมือนกัน ฉบับที่ผ่าน Gmail อาจไปอยู่ใน Junk ของ Outlook ได้ ตั้ง SPF DKIM และ DMARC ให้ครบก่อน แล้วลองส่งไปที่ Outlook อีกครั้ง',
          en: "Each provider judges differently, so an email Gmail accepts can land in Outlook's Junk. Set up SPF, DKIM and DMARC first, then send to Outlook again.",
        },
      },
      {
        q: { th: 'รอ OTP นานแค่ไหนถึงควรเช็ก', en: 'How long should I wait before checking?' },
        a: {
          th: 'ถ้าผ่านไป 1 นาทีแล้วยังไม่เข้า ให้ดูสถานะของอีเมลฉบับนั้นก่อน ถ้าขึ้นว่าส่งถึงแล้ว ให้ลูกค้าดูใน Junk',
          en: "If a minute passes and the code hasn't arrived, look at that email's status. If it says Delivered, ask the user to check Junk.",
        },
      },
    ],
    related: 'spf-dkim-dmarc',
  },

  'spf-dkim-dmarc': {
    h1: { th: 'SPF DKIM DMARC คืออะไร ตั้งยังไง', en: 'What are SPF, DKIM and DMARC, and how do you set them up?' },
    lead: {
      th: 'SPF DKIM และ DMARC คือ DNS record 3 ตัวที่บอกผู้ให้บริการอีเมลว่าอีเมลจากโดเมนนี้มาจากแอปจริง SPF บอกว่าใครส่งแทนโดเมนได้ DKIM เซ็นรับรองทุกฉบับ ส่วน DMARC บอกว่าถ้าไม่ผ่านสองตัวแรกให้ทำยังไง ตั้งครบแล้วอีเมลมีโอกาสถึงกล่องจดหมายมากขึ้น',
      en: 'SPF, DKIM and DMARC are three DNS records that tell mail providers your email really comes from your app. SPF says who may send for the domain, DKIM signs every email, and DMARC says what to do when the first two fail. With all three set, your email is more likely to reach the inbox.',
    },
    sections: [
      {
        heading: { th: 'แต่ละตัวทำอะไร', en: 'What each one does' },
        table: {
          cols: [
            { th: 'Record', en: 'Record' },
            { th: 'ทำหน้าที่อะไร', en: 'What it does' },
            { th: 'หน้าตาประมาณนี้', en: 'Looks like' },
          ],
          rows: [
            [
              { th: 'SPF', en: 'SPF' },
              { th: 'บอกว่าบริการไหนส่งอีเมลแทนโดเมนนี้ได้', en: 'Lists the services allowed to send for the domain' },
              { th: '`v=spf1 include:… ~all`', en: '`v=spf1 include:… ~all`' },
            ],
            [
              { th: 'DKIM', en: 'DKIM' },
              { th: 'ลายเซ็นในทุกฉบับ ผู้รับเอาไปเทียบได้ว่าอีเมลไม่ถูกแก้ระหว่างทาง', en: "A signature on every email; the receiver checks it to know the email wasn't changed on the way" },
              { th: '`<selector>._domainkey.example.com`', en: '`<selector>._domainkey.example.com`' },
            ],
            [
              { th: 'DMARC', en: 'DMARC' },
              { th: 'บอกว่าถ้าไม่ผ่าน SPF หรือ DKIM ให้ทำยังไง และส่งรายงานไปที่ไหน', en: 'Says what to do when SPF or DKIM fails, and where to send reports' },
              { th: '`v=DMARC1; p=none`', en: '`v=DMARC1; p=none`' },
            ],
          ],
        },
      },
      {
        heading: { th: 'ตั้งยังไง', en: 'How to set them up' },
        ordered: true,
        list: [
          { th: 'เปิดหน้าตั้งค่า DNS ของที่ที่ซื้อโดเมน เช่น Cloudflare Namecheap หรือ GoDaddy', en: 'Open the DNS settings where you bought the domain, such as Cloudflare, Namecheap or GoDaddy.' },
          { th: 'เพิ่ม record ตามค่าที่บริการส่งอีเมลให้มา ก๊อปทั้งค่า ห้ามตัดหรือเติมเอง', en: "Add each record with the values your email service gives you. Copy the whole value; don't trim or add to it." },
          { th: 'รอให้ DNS อัปเดต ส่วนมากไม่กี่นาที แต่บางที่นานถึง 72 ชั่วโมง', en: 'Wait for DNS to update. It usually takes minutes, sometimes up to 72 hours.' },
          { th: 'กดเช็กในบริการส่งอีเมล ว่าทั้ง 3 ตัวผ่านแล้ว', en: 'Check in your email service that all three pass.' },
        ],
      },
      {
        heading: { th: 'ข้อผิดพลาดที่เจอบ่อย', en: 'Usual mistakes' },
        list: [
          { th: '**มี SPF 2 ตัว** โดเมนหนึ่งมี SPF ได้ตัวเดียว ถ้ามีอยู่แล้วให้รวมค่าใหม่เข้าไปในตัวเดิม', en: '**Two SPF records.** A domain can have only one. If you already have one, merge the new value into it.' },
          { th: '**ชื่อ record ซ้ำโดเมน** บางที่เติมชื่อโดเมนให้เอง ถ้าพิมพ์ชื่อเต็มลงไปจะกลายเป็น example.com.example.com', en: '**The domain twice in the name.** Some DNS screens add the domain for you; typing the full name gives example.com.example.com.' },
          { th: '**ก๊อปค่าไม่ครบ** ค่า DKIM ยาว ก๊อปขาดไปตัวเดียวก็ไม่ผ่าน', en: '**A partial copy.** DKIM values are long; one missing character and it fails.' },
          { th: '**ตั้ง DMARC เป็น p=reject ทันที** เริ่มจาก p=none ก่อน ดูรายงานสักพัก แล้วค่อยเข้มขึ้น', en: '**Starting DMARC at p=reject.** Start with p=none, watch the reports for a while, then tighten it.' },
        ],
      },
    ],
    helps: {
      heading: HELPS_HEADING,
      list: [
        { th: 'เตรียมค่าทั้ง 3 ตัวให้ พร้อมปุ่มก๊อปทีละค่า', en: 'Prepares all three values, each with a copy button.' },
        { th: 'เช็กให้ว่า record ไหนผ่านแล้ว และตัวไหนยังขาด', en: 'Checks which records pass and which are still missing.' },
        { th: 'ถ้ามี DMARC อยู่แล้ว ใช้ตัวเดิมต่อได้', en: 'Already have DMARC? Keep yours.' },
      ],
    },
    faq: [
      {
        q: { th: 'ไม่ตั้ง DMARC ได้ไหม', en: 'Can I skip DMARC?' },
        a: {
          th: 'ส่งได้ แต่ Gmail และ Yahoo กำหนดให้ผู้ที่ส่งอีเมลจำนวนมากต้องมี DMARC ตั้งไว้ตั้งแต่แรกดีกว่า เริ่มที่ p=none ก็พอ',
          en: 'You can send without it, but Gmail and Yahoo require DMARC from bulk senders. Set it from the start; p=none is enough to begin.',
        },
      },
      {
        q: { th: 'ตั้งแล้วทำไมยังไม่ผ่าน', en: "I set them up. Why don't they pass?" },
        a: {
          th: 'ส่วนมาก DNS ยังอัปเดตไม่เสร็จ หรือชื่อ record ซ้ำโดเมน รอสักพักแล้วเช็กใหม่ ถ้าเกิน 72 ชั่วโมงให้เทียบชื่อและค่ากับที่บริการส่งอีเมลให้มาอีกที',
          en: "Usually DNS hasn't updated yet, or the domain appears twice in the record name. Wait and check again; after 72 hours, compare the name and value with what your email service gave you.",
        },
      },
    ],
    related: 'otp-email-not-arriving',
  },
};
