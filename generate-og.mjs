import puppeteer from 'puppeteer';
import fs from 'fs';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@800;900&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #0A0A0A;
    font-family: 'Manrope', sans-serif;
    display: flex; align-items: center;
    position: relative;
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,82,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,82,255,0.05) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .glow {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,82,255,0.12) 0%, transparent 70%);
    top: -100px; left: -100px;
  }
  .glow-red {
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(191,48,3,0.08) 0%, transparent 70%);
    bottom: -100px; right: 100px;
  }
  .content {
    position: relative; z-index: 1;
    padding: 64px 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,82,255,0.1);
    border: 1px solid rgba(0,82,255,0.25);
    border-radius: 100px;
    padding: 8px 18px;
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 600;
    color: #5E72C3;
    margin-bottom: 28px;
    width: fit-content;
  }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #22C55E; }
  h1 {
    font-size: 72px; font-weight: 900;
    line-height: 1.05; letter-spacing: -0.03em;
    color: #fff;
    margin-bottom: 20px;
  }
  .blue { color: #0052FF; }
  p {
    font-family: 'Inter', sans-serif;
    font-size: 20px; color: rgba(255,255,255,0.55);
    line-height: 1.5; margin-bottom: 36px;
    max-width: 600px;
  }
  .pills {
    display: flex; gap: 10px;
  }
  .pill {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 8px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600;
    color: rgba(255,255,255,0.5);
  }
  .logo-wrap {
    position: absolute;
    right: 80px; top: 50%;
    transform: translateY(-50%);
    display: flex; flex-direction: column; align-items: center;
    gap: 0;
    opacity: 0.15;
  }
  .logo-d {
    font-size: 240px; font-weight: 900;
    color: #0052FF;
    line-height: 1;
    letter-spacing: -0.05em;
  }
  .wa {
    position: absolute; bottom: 48px; right: 80px;
    font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 600;
    color: #25D366;
  }
  .line {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0052FF, #5E72C3, #BF3003);
  }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="glow-red"></div>
  <div class="logo-wrap"><div class="logo-d">D</div></div>
  <div class="content">
    <div class="badge"><div class="dot"></div>Devology Technology</div>
    <h1>Jasa Website<br/><span class="blue">Profesional</span><br/>dalam 7 Hari</h1>
    <p>Landing page, company profile, toko online & AI chatbot.<br/>Mulai Rp 1,5 juta — Konsultasi GRATIS.</p>
    <div class="pills">
      <div class="pill">⚡ Loading &lt; 2 detik</div>
      <div class="pill">📱 100% Mobile</div>
      <div class="pill">🔍 SEO Ready</div>
      <div class="pill">🤖 AI Integration</div>
    </div>
  </div>
  <div class="wa">wa.me/6281219215091</div>
  <div class="line"></div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: './brand_assets/og-image.png', type: 'png' });
await browser.close();
console.log('OG image generated: brand_assets/og-image.png');
