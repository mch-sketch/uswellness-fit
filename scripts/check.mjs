import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const articlePath = 'research/sea-moss/index.html';
const html = fs.readFileSync(path.join(publicDir, articlePath), 'utf8');
const home = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
const files = [];
for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)"/g)) {
  if (match[1] !== '/') { const file = path.join(publicDir, match[1]); assert.ok(fs.existsSync(file), `Missing asset: ${match[1]}`); files.push(match[1]); }
}
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${match[1]}"`), `Missing anchor: ${match[1]}`);
for (const match of html.matchAll(/<img\b([^>]+)>/g)) { assert.ok(/alt="[^"]+"/.test(match[1]), 'Image needs alt text'); assert.ok(/width="\d+"/.test(match[1]) && /height="\d+"/.test(match[1]), 'Image needs dimensions'); }
const ctas = [...html.matchAll(/href="(https:\/\/healistix\.com\/[^" ]+)"/g)];
assert.equal(ctas.length, 1, 'Keep one contextual official-store CTA');
for (const [, link] of ctas) { const u = new URL(link.replaceAll('&amp;', '&')); assert.equal(u.searchParams.get('utm_source'), 'uswellness'); assert.equal(u.searchParams.get('utm_medium'), 'advertorial'); assert.equal(u.searchParams.get('utm_campaign'), 'seamoss_comparison'); }
const sourceManifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/source-copy.json'), 'utf8'));
const flatten = value => typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(flatten) : Object.values(value).flatMap(flatten);
const units = flatten(sourceManifest);
const normalize = value => value.replace(/\s+/g, ' ').trim();
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#(?:x27|39);/gi, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const visibleBody = normalize(decode(html.split(/<body[^>]*>/i)[1].split(/<\/body>/i)[0].replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ')));
const authorizedHeadingChange = { from: sourceManifest.comparisonHeading, to: 'Sourcing & Quality Breakdown' };
for (const unit of units) {
  const expected = unit === authorizedHeadingChange.from ? authorizedHeadingChange.to : unit;
  assert.ok(visibleBody.includes(normalize(expected)), `Source copy missing or changed: ${expected}`);
}
let originalSourceVerified = false;
if (process.argv[2]) {
  const source = normalize(fs.readFileSync(process.argv[2], 'utf8'));
  for (const unit of units) assert.ok(source.includes(normalize(unit)), `Manifest differs from original source: ${unit}`);
  originalSourceVerified = true;
}
assert.ok(!visibleBody.includes('JPG+ 3') && !visibleBody.includes('JPG+ 4') && !visibleBody.includes('Complete ChatGPT Max / DALL-E Image Prompts'), 'Production instructions leaked into article');
assert.ok(!visibleBody.includes('Us vs. Them'), 'Removed comparison label returned');
assert.ok(!html.includes('mobile-cta') && !html.includes('sidebar-jar') && !html.includes('mango-morning.webp'), 'Brand advertising layout returned');
const beforeRecommendation = html.split(/<body[^>]*>/i)[1].split('<section id="recommendation"')[0];
assert.ok(!beforeRecommendation.includes('Healistix'), 'Healistix must first appear inside the recommendation');
assert.equal((html.match(/src="\/images\/mango-jar\.webp"/g) || []).length, 1, 'Only one small recommendation jar is allowed');
for (const name of ['samples', 'origin', 'spoon', 'routine']) assert.equal((html.match(new RegExp(`/images/editorial/${name}\\.webp`, 'g')) || []).length, name === 'samples' ? 2 : 1, `Editorial image usage: ${name}`);
assert.ok(html.includes('rel="canonical" href="https://uswellness.fit/research/sea-moss/"'), 'Article canonical incorrect');
assert.ok(html.includes('property="og:url" content="https://uswellness.fit/research/sea-moss/"'), 'Article sharing URL incorrect');
assert.ok(home.includes('rel="canonical" href="https://uswellness.fit/"'), 'Home canonical incorrect');
assert.ok(home.includes('href="/research/sea-moss/"'), 'Publication home must link to article');
assert.ok(!home.includes('Healistix') && !home.includes('healistix.com'), 'Home must remain a publication homepage');
assert.ok(!home.includes('data-source-copy'), 'Article content must live on its own page');
const sitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
assert.ok(sitemap.includes('<loc>https://uswellness.fit/</loc>') && sitemap.includes('<loc>https://uswellness.fit/research/sea-moss/</loc>'), 'Sitemap must include home and article');
assert.ok(fs.readFileSync(path.join(publicDir, '404.html'), 'utf8').includes('class="store-link" href="/research/sea-moss/"'), '404 article link incorrect');
console.log(JSON.stringify({ status: 'passed', articlePath, articleUrl: 'https://uswellness.fit/research/sea-moss/', homeUrl:'https://uswellness.fit/', assetReferences: files.length, productLinks: ctas.length, sourceCopyUnits: units.length, exactCopyUnits: units.length - 1, authorizedHeadingChange, originalSourceVerified, checks: ['assets', 'internal anchors', 'image alt text and dimensions', 'CTA campaign parameters', 'article and home canonical URLs', 'source-copy fidelity with single authorized heading exception', 'publication separated from product', 'four editorial images used once', 'home/article separation and sitemap', 'production scaffolding omitted'] }, null, 2));
