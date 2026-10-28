import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const html = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
const files = [];
for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
  if (match[1] !== '/') { const file = path.join(publicDir, match[1]); assert.ok(fs.existsSync(file), `Missing asset: ${match[1]}`); files.push(match[1]); }
}
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${match[1]}"`), `Missing anchor: ${match[1]}`);
for (const match of html.matchAll(/<img\b([^>]+)>/g)) { assert.ok(/alt="[^"]+"/.test(match[1]), 'Image needs alt text'); assert.ok(/width="\d+"/.test(match[1]) && /height="\d+"/.test(match[1]), 'Image needs dimensions'); }
const ctas = [...html.matchAll(/href="(https:\/\/healistix\.com\/[^" ]+)"/g)];
assert.ok(ctas.length >= 4, 'Missing product CTAs');
for (const [, link] of ctas) { const u = new URL(link.replaceAll('&amp;', '&')); assert.equal(u.searchParams.get('utm_source'), 'uswellness'); assert.equal(u.searchParams.get('utm_medium'), 'advertorial'); assert.equal(u.searchParams.get('utm_campaign'), 'seamoss_comparison'); }
assert.ok(!html.includes('\u2014'), 'No em dashes');
assert.ok(!html.includes('Verified Buyer') && !html.includes('testing 12') && !html.includes('80%'), 'Unverified evidence found');
assert.ok(html.includes('rel="canonical" href="https://uswellness.fit/"'), 'Canonical domain incorrect');
console.log(JSON.stringify({ status: 'passed', assetReferences: files.length, productLinks: ctas.length, checks: ['assets', 'internal anchors', 'image alt text and dimensions', 'CTA campaign parameters', 'canonical domain', 'content integrity'] }, null, 2));
