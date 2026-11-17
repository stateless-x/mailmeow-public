import { expect, test } from 'bun:test';
import { wrapThaiPhrases } from '../../src/lib/phrases';

const th = (body: string) => `<html lang="th"><body>${body}</body></html>`;
test('wraps each space-separated run in headings, legends and buttons, leaving markup alone', () => {
  const out = wrapThaiPhrases(th('<h1 id="x">ส่งอีเมล <span class="hl">ไม่ต้อง DNS</span></h1><a class="btn btn-primary" href="#w">ลงชื่อ รอใช้</a><p>ข้อความ ปกติ</p>'));
  expect(out).toContain('<h1 id="x"><span class="ph">ส่งอีเมล</span> <span class="hl"><span class="ph">ไม่ต้อง</span> <span class="ph">DNS</span></span></h1>');
  expect(out).toContain('<a class="btn btn-primary" href="#w"><span class="ph">ลงชื่อ</span> <span class="ph">รอใช้</span></a>');
  expect(out).toContain('<p>ข้อความ ปกติ</p>');
});
test('English pages are untouched', () => {
  const html = '<html lang="en"><h1>Hello world</h1></html>';
  expect(wrapThaiPhrases(html)).toBe(html);
});
