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
assert.ok(ctas.length >= 3, 'Missing product CTAs');
for (const [, link] of ctas) { const u = new URL(link.replaceAll('&amp;', '&')); assert.equal(u.searchParams.get('utm_source'), 'uswellness'); assert.equal(u.searchParams.get('utm_medium'), 'advertorial'); assert.equal(u.searchParams.get('utm_campaign'), 'seamoss_comparison'); }
const sourceManifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/source-copy.json'), 'utf8'));
const flatten = value => typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(flatten) : Object.values(value).flatMap(flatten);
const units = flatten(sourceManifest);
const normalize = value => value.replace(/\s+/g, ' ').trim();
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#(?:x27|39);/gi, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const visibleBody = normalize(decode(html.split(/<body[^>]*>/i)[1].split(/<\/body>/i)[0].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ')));
for (const unit of units) assert.ok(visibleBody.includes(normalize(unit)), `Source copy missing or changed: ${unit}`);
let originalSourceVerified = false;
if (process.argv[2]) {
  const source = normalize(fs.readFileSync(process.argv[2], 'utf8'));
  for (const unit of units) assert.ok(source.includes(normalize(unit)), `Manifest differs from original source: ${unit}`);
  originalSourceVerified = true;
}
assert.ok(!visibleBody.includes('JPG+ 3') && !visibleBody.includes('JPG+ 4') && !visibleBody.includes('Complete ChatGPT Max / DALL-E Image Prompts'), 'Production instructions leaked into article');
assert.ok(html.includes('rel="canonical" href="https://uswellness.fit/"'), 'Canonical domain incorrect');
console.log(JSON.stringify({ status: 'passed', assetReferences: files.length, productLinks: ctas.length, exactCopyUnits: units.length, originalSourceVerified, checks: ['assets', 'internal anchors', 'image alt text and dimensions', 'CTA campaign parameters', 'canonical domain', 'every exact source-copy unit rendered', 'production scaffolding omitted'] }, null, 2));
