import { describe, expect, test } from 'bun:test';
import { renderInline, plainText } from '../../src/lib/inline';
import { validateWaitlist } from '../../src/lib/waitlist';

const ctx = { lang: 'th' as const, price: '$9', contactHtml: '<a>c</a>', lastVerified: 'V', date: 'D' };

describe('renderInline', () => {
  test('fills known placeholders, leaves {email} and {id} alone', () => {
    expect(renderInline('{price} {contact} {LAST_VERIFIED} {date} {email}', ctx)).toBe('$9 <a>c</a> V D {email}');
    expect(renderInline('`GET /emails/{id}`', ctx)).toBe('<code>GET /emails/{id}</code>');
  });
  test('escapes HTML, renders bold, highlight and links', () => {
    expect(renderInline('<b> **x** ==y== [t](@privacy) [u](https://pooh.fyi)', ctx)).toBe(
      '&lt;b&gt; <strong>x</strong> <span class="hl nw">y</span> <a href="/th/privacy/">t</a> <a href="https://pooh.fyi">u</a>',
    );
  });
  test('plainText drops markers', () => {
    expect(plainText('**a** `b` [c](@x) ==d== {price}', { price: '$9', contactText: '', lastVerified: '', date: '' })).toBe('a b c d $9');
  });
});

describe('waitlist validation (copy/landing.md §11)', () => {
  test('email, Q4 and consent are required', () => {
    expect(validateWaitlist({ email: '', wouldPay: undefined, consent: false })).toEqual(['email', 'wouldPay', 'consent']);
    expect(validateWaitlist({ email: 'a@b', wouldPay: 'yes', consent: true })).toEqual(['email']);
    expect(validateWaitlist({ email: ' name@gmail.com ', wouldPay: 'no', consent: true })).toEqual([]);
  });
});
