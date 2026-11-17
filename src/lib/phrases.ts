/**
 * Chrome breaks Thai at dictionary word boundaries, ignoring the space-separated phrases Thai readers expect.
 * On Thai pages, every space-separated run inside a heading, legend or button becomes an inline-block
 * (<span class="ph">), so a phrase stays whole and still wraps inside itself when wider than the line.
 */
const TARGETS = /<(h[123]|legend)\b[^>]*>[\s\S]*?<\/\1>|<(a|button)\b[^>]*\bclass="[^"]*\bbtn\b[^"]*"[^>]*>[\s\S]*?<\/\2>/g;

const wrapText = (text: string): string => text.replace(/[^\s<>]+/g, (run) => `<span class="ph">${run}</span>`);

export function wrapThaiPhrases(html: string): string {
  if (!/<html[^>]*\blang="th"/.test(html)) return html;
  return html.replace(TARGETS, (block) => {
    const open = /^<[^>]+>/.exec(block)![0];
    const closeAt = block.lastIndexOf('</');
    const inner = block.slice(open.length, closeAt);
    // Only text between tags is wrapped; markup is left as is.
    const wrapped = inner.split(/(<[^>]+>)/).map((part, i) => (i % 2 === 0 ? wrapText(part) : part)).join('');
    return open + wrapped + block.slice(closeAt);
  });
}
