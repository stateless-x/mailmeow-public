import { describe, expect, test } from 'bun:test';
import { renderInline, plainText } from '../../src/lib/inline';
import { validateWaitlist } from '../../src/lib/waitlist';

const ctx = { lang: 'th' as const, contactHtml: '<a>c</a>', lastVerified: 'V', date: 'D' };

describe('renderInline', () => {
  test('fills known placeholders, leaves {email} and {id} alone', () => {
    expect(renderInline('{contact} {LAST_VERIFIED} {date} {email}', ctx)).toBe('<a>c</a> V D {email}');
    expect(renderInline('`GET /emails/{id}`', ctx)).toBe('<code>GET /emails/{id}</code>');
  });
  test('escapes HTML, renders bold, highlight and links', () => {
    expect(renderInline('<b> **x** ==y== [t](@privacy) [u](https://pooh.fyi)', ctx)).toBe(
      '&lt;b&gt; <strong>x</strong> <span class="hl nw">y</span> <a href="/th/privacy/">t</a> <a href="https://pooh.fyi">u</a>',
    );
  });
  test('{price} and {thb} render a swappable span whose visible text is the $9 default', () => {
    expect(renderInline('{price} {thb}', ctx)).toBe(
      '<span data-price data-v9="$9" data-v12="$12">$9</span> <span data-price data-v9="฿299" data-v12="฿399">฿299</span>',
    );
  });
  test('plainText drops markers and resolves prices to the default', () => {
    expect(plainText('**a** `b` [c](@x) ==d== {price} {thb}', { contactText: '', lastVerified: '', date: '' })).toBe('a b c d $9 ฿299');
  });
});

describe('waitlist validation (copy/landing.md §11)', () => {
  test('email, Q4 and consent are required', () => {
    expect(validateWaitlist({ email: '', wouldPay: undefined, consent: false })).toEqual(['email', 'wouldPay', 'consent']);
    expect(validateWaitlist({ email: 'a@b', wouldPay: 'yes', consent: true })).toEqual(['email']);
    expect(validateWaitlist({ email: ' name@gmail.com ', wouldPay: 'no', consent: true })).toEqual([]);
  });
});
