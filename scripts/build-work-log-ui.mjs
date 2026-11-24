import { readdir, writeFile, copyFile } from "node:fs/promises";
const root = new URL("../public/work-log/", import.meta.url);
const dates = (await readdir(root, { withFileTypes: true }))
	.filter(
		(entry) => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name),
	)
	.map((entry) => entry.name)
	.sort();
const links = [
	["主页", "/"],
	["文章", "/archive/"],
	["番剧", "/anime/"],
	["网址导航", "/booknav/"],
	["相册", "/gallery/"],
];
const extra = [
	["时间线", "/timeline/"],
	["项目", "/projects/"],
	["我的设备", "/devices/"],
	["技能", "/skills/"],
	["关于我", "/about/"],
];
const arrows =
	'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg>';
const html = (date) => `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow, noarchive"><meta name="referrer" content="no-referrer"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'"><title>${date} 工作日志 · huazai666</title><link rel="icon" href="/favicon/huazai666.png"><link rel="stylesheet" href="/work-log/work-log.css"><script src="/work-log/journal.js" defer></script><script src="/work-log/unlock.js" defer></script></head>
<body><header class="journal-nav"><a class="brand" href="/" data-no-swup><img src="/favicon/huazai666.png" width="25" height="25" alt="">huazai666</a><nav aria-label="主导航">${links.map(([label, href]) => `<a class="direct" href="${href}" data-no-swup>${label}</a>`).join("")}<a class="direct current" href="/work-log/" aria-current="page">工作日志</a><details id="journal-menu"><summary>更多 <span aria-hidden="true">⌄</span></summary><div class="menu-list">${[...links, ...extra].map(([label, href], i) => `<a ${i < links.length ? 'class="mobile-link"' : ""} href="${href}" data-no-swup>${label}</a>`).join("")}</div></details></nav><a class="search-pill" href="/search/" aria-label="搜索文章" data-no-swup><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></a></header>
<main class="journal-shell" data-date="${date}" data-dates="${dates.join(",")}">
<aside class="date-rail" aria-label="按日期选择日志"><span class="rail-caption">日期</span><nav class="date-window" aria-label="工作日志日期"><div class="date-track">${dates.map((day) => `<a href="/work-log/${day}/" data-date="${day}" aria-label="${day} 工作日志"${day === date ? ' aria-current="date"' : ""}><span>${day.slice(8)}</span><small>${Number(day.slice(5, 7))}月</small></a>`).join("")}</div></nav><span class="rail-year">${date.slice(0, 4)}</span></aside>
<div class="journal-body"><header class="journal-header"><div><p class="eyebrow">HUAZAI666 / WORK JOURNAL</p><h1>工作日志</h1><p class="journal-subtitle">记录每一天的推进、尝试与完成。</p></div><div class="entry-controls"><p id="journal-date" aria-live="polite"><time datetime="${date}">${Number(date.slice(5, 7))}月 ${Number(date.slice(8))}日</time><span>${date.slice(0, 4)}</span></p><div class="step-buttons"><button id="previous-day" aria-label="上一篇日志">${arrows}</button><button id="next-day" aria-label="下一篇日志">${arrows}</button></div></div></header>
<div class="journal-page"><section id="gate" aria-labelledby="gate-title"><span class="lock-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/></svg></span><p class="eyebrow">PRIVATE ENTRY</p><h2 id="gate-title">这一天的工作手记</h2><p class="gate-description">输入访问密码，查看当天的完整记录。</p><label for="secret">访问密码</label><div class="unlock"><input id="secret" type="password" inputmode="numeric" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="6" placeholder="六位数字" aria-describedby="status"><button id="open" type="button">解锁日志 <span aria-hidden="true">↗</span></button></div><p id="status" class="status" role="status" aria-live="polite"></p><noscript><p>请启用 JavaScript 后解锁日志。左侧日期链接可直接打开对应页面。</p></noscript></section><article id="entry" hidden></article></div>
<footer class="journal-footer"><span id="entry-count">${dates.indexOf(date) + 1} / ${dates.length} 篇记录</span><span>工作手记 · 持续记录</span><a href="/" data-no-swup>返回博客 ↗</a></footer></div></main>
<canvas class="journal-splash" aria-hidden="true"></canvas></body></html>`;
await writeFile(new URL("index.html", root), html(dates.at(-1)));
for (const date of dates)
	await writeFile(new URL(`${date}/index.html`, root), html(date));
await copyFile(
	new URL("../src/components/effects/SplashCursor.js", import.meta.url),
	new URL("splash-engine.js", root),
);
console.log(`Prepared journal UI for ${dates.length} encrypted entries.`);
