import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const pagePath = 'research/sea-moss-vitality/index.html';
const html = fs.readFileSync(path.join(publicDir, pagePath), 'utf8');
const original = fs.readFileSync(path.resolve(root, '../../creative/vitality-lp-v3/index.html'), 'utf8');
const text = s => s.replace(/<[^>]*>/g, ' ').replaceAll('&amp;', '&').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replace(/\s+/g, ' ').trim();
assert.ok(html.includes('https://uswellness.fit/research/sea-moss-vitality/'), 'Canonical URL missing');
assert.ok(html.includes('US Wellness Community'), 'Publisher missing');
assert.ok(!/<header[^>]*>[^]*?HEALISTIX[^]*?<\/header>/.test(html), 'Product cannot be the publisher');
assert.ok(!/\sstyle=|\son\w+=|<style|<script(?![^>]*\ssrc=)/i.test(html), 'Inline code violates site CSP');
assert.ok(!html.includes('fonts.googleapis.com'), 'External font not allowed by site CSP');
assert.ok(!/href=["']#["']/.test(html), 'Placeholder link remains');
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${anchor}"`), `Missing anchor ${anchor}`);
const assets = [];
for (const [, local] of html.matchAll(/(?:src|href)="(\/[^"?#]+)"/g)) {
  const filename = path.join(publicDir, local);
  if (local === '/' || local.endsWith('/')) assert.ok(fs.existsSync(path.join(filename, 'index.html')), `Missing local page ${local}`);
  else assert.ok(fs.existsSync(filename), `Missing asset ${local}`);
  assets.push(local);
}
const paragraphs = [...original.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m=>text(m[1]));
const rendered = text(html);
for (const p of paragraphs) assert.ok(rendered.includes(p), `Original paragraph changed: ${p}`);
assert.equal((html.match(/class="sample"/g)||[]).length, (original.match(/class="sample"/g)||[]).length, 'Sample review labels must remain');
const buy = /<a\b[^>]*href="([^"]+)"[^>]*id="buyBtn"/.exec(html) || /<a\b[^>]*id="buyBtn"[^>]*href="([^"]+)"/.exec(html);
assert.ok(buy, 'Buy link missing');
const buyUrl = new URL(buy[1].replaceAll('&amp;', '&'));
assert.equal(buyUrl.hostname, 'healistix.com');
assert.equal(buyUrl.searchParams.get('utm_campaign'), 'seamoss_vitality');
console.log(JSON.stringify({status:'passed',page:pagePath,originalParagraphs:paragraphs.length,referencedLocalAssets:assets.length,sampleLabelsPreserved:true,cspCompatible:true,officialStoreLink:true},null,2));
if (process.argv.includes('--browser')) {
  const { chromium } = await import('file:///C:/Users/chhet/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
  const browser = await chromium.launch({headless:true,executablePath:'C:/Users/chhet/AppData/Local/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-win64/chrome-headless-shell.exe'});
  const result=[];
  const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.woff':'font/woff'};
  try {
    for(const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
      const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.route('http://uswellness.test/**',async route=>{
        let p=new URL(route.request().url()).pathname; if(p.endsWith('/'))p+='index.html';
        const filename=path.join(publicDir,p);
        if(!filename.startsWith(publicDir)||!fs.existsSync(filename)){await route.fulfill({status:404,body:''});return;}
        await route.fulfill({status:200,contentType:types[path.extname(filename)]||'application/octet-stream',headers:{'content-security-policy':"default-src 'self'; img-src 'self'; font-src 'self'; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'"},body:fs.readFileSync(filename)});
      });
      await page.goto('http://uswellness.test/research/sea-moss-vitality/',{waitUntil:'networkidle'});
      await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
      const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),imageCount:document.images.length,publisher:document.querySelector('.publication-mark').textContent.trim(),canonical:document.querySelector('link[rel="canonical"]').href}));
      await page.locator('.opt').first().click();
      const selectorWorks=await page.locator('#buyBtn').textContent();
      await page.locator('details summary').first().click();
      const faqWorks=await page.locator('details').first().evaluate(el=>el.open);
      await page.screenshot({path:path.join(root,`qa/vitality-${viewport.width}.png`),fullPage:true});
      const r={viewport,...layout,planSelectorWorks:selectorWorks.includes('22.50'),faqWorks,errors};result.push(r);
      assert.ok(layout.scrollWidth<=viewport.width, 'Horizontal overflow');assert.ok(layout.images,'Failed image');assert.ok(faqWorks&&r.planSelectorWorks,'Interaction failed');assert.equal(errors.length,0,'Page errors');
      await page.close();
    }
    fs.writeFileSync(path.join(root,'qa/vitality-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
  } finally {await browser.close();}
}
