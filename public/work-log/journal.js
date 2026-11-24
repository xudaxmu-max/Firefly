"use strict";
(() => {
	const root = document.documentElement;
	const media = matchMedia("(prefers-color-scheme: dark)");
	const reduced = matchMedia("(prefers-reduced-motion: reduce)");
	let splashStop,
		splashVersion = 0;
	const syncTheme = () => {
		let theme;
		try {
			theme = localStorage.getItem("theme");
		} catch {}
		root.dataset.theme =
			theme === "dark" || (theme !== "light" && media.matches)
				? "dark"
				: "light";
	};
	syncTheme();
	const initSplash = async () => {
		const version = ++splashVersion;
		splashStop?.();
		splashStop = undefined;
		const old = document.querySelector(".journal-splash");
		const canvas = old.cloneNode();
		old.replaceWith(canvas);
		if (reduced.matches) return;
		const { mountSplashCursor } = await import("./splash-engine.js");
		if (version !== splashVersion) return;
		splashStop = mountSplashCursor(
			canvas,
			{
				rainbow: true,
				size: 1,
				force: 1,
				swirl: 3,
				trail: 1,
				clickSplash: true,
				intro: false,
				quality: matchMedia("(pointer: coarse)").matches ? "low" : "medium",
				theme: root.dataset.theme,
			},
			initSplash,
		);
	};
	initSplash().catch(() => {});
	reduced.addEventListener("change", () => initSplash().catch(() => {}));
	media.addEventListener("change", () => {
		syncTheme();
		initSplash().catch(() => {});
	});
	const host = document.querySelector("main[data-date]"),
		dates = host.dataset.dates.split(",");
	const rail = document.querySelector(".date-window"),
		track = document.querySelector(".date-track");
	const previous = document.getElementById("previous-day"),
		next = document.getElementById("next-day");
	const dateLabel = document.getElementById("journal-date"),
		count = document.getElementById("entry-count");
	const menu = document.getElementById("journal-menu");
	let current = dates.indexOf(host.dataset.date),
		dragStart = null,
		dragged = false;
	const center = () => {
		const active = track.children[current];
		if (active)
			track.style.transform = `translateY(${rail.clientHeight / 2 - active.offsetTop - active.offsetHeight / 2}px)`;
	};
	const select = (index, push = false) => {
		if (index < 0 || index >= dates.length) return;
		const changed = current !== index;
		current = index;
		host.dataset.date = dates[index];
		if (changed) document.dispatchEvent(new Event("worklog:date-change"));
		for (const [i, link] of Array.from(track.children).entries()) {
			link.tabIndex = i === index ? 0 : -1;
			if (i === index) link.setAttribute("aria-current", "date");
			else link.removeAttribute("aria-current");
		}
		dateLabel.replaceChildren();
		const time = document.createElement("time");
		time.dateTime = dates[index];
		time.textContent = `${Number(dates[index].slice(5, 7))}月 ${Number(dates[index].slice(8))}日`;
		const year = document.createElement("span");
		year.textContent = dates[index].slice(0, 4);
		dateLabel.append(time, year);
		previous.disabled = index === 0;
		next.disabled = index === dates.length - 1;
		count.textContent = `${index + 1} / ${dates.length} 篇记录`;
		document.title = `${dates[index]} 工作日志 · huazai666`;
		center();
		if (push)
			history.pushState(
				{ date: dates[index] },
				"",
				`/work-log/${dates[index]}/`,
			);
		if (changed && !reduced.matches)
			document.querySelector(".journal-page").animate(
				[
					{ opacity: 0.4, transform: "translateY(4px)" },
					{ opacity: 1, transform: "translateY(0)" },
				],
				{ duration: 220, easing: "ease-out" },
			);
	};
	track.addEventListener("click", (e) => {
		const link = e.target.closest("a[data-date]");
		if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		e.preventDefault();
		if (dragged) {
			dragged = false;
			return;
		}
		select(dates.indexOf(link.dataset.date), true);
	});
	previous.addEventListener("click", () => select(current - 1, true));
	next.addEventListener("click", () => select(current + 1, true));
	rail.addEventListener("keydown", (e) => {
		let index = current;
		if (e.key === "ArrowUp") index--;
		else if (e.key === "ArrowDown") index++;
		else if (e.key === "Home") index = 0;
		else if (e.key === "End") index = dates.length - 1;
		else return;
		e.preventDefault();
		select(index, true);
		track.children[current].focus({ preventScroll: true });
	});
	rail.addEventListener("dragstart", (e) => e.preventDefault());
	rail.addEventListener("pointerdown", (e) => {
		if (e.button !== 0) return;
		dragStart = e.clientY;
		dragged = false;
	});
	rail.addEventListener("pointermove", (e) => {
		if (dragStart !== null && Math.abs(e.clientY - dragStart) > 10)
			dragged = true;
	});
	window.addEventListener("pointerup", (e) => {
		if (dragStart === null) return;
		const delta = dragStart - e.clientY;
		dragStart = null;
		if (Math.abs(delta) > 20) {
			dragged = true;
			select(
				Math.max(
					0,
					Math.min(
						dates.length - 1,
						current +
							Math.round(
								delta /
									(track.children[1].offsetTop - track.children[0].offsetTop),
							),
					),
				),
				true,
			);
		}
	});
	window.addEventListener("pointercancel", () => {
		dragStart = null;
		dragged = false;
	});
	window.addEventListener("popstate", () => {
		const date =
			location.pathname.match(/\d{4}-\d{2}-\d{2}/)?.[0] || dates.at(-1);
		select(dates.indexOf(date));
	});
	new ResizeObserver(center).observe(rail);
	select(current);
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			menu.open = false;
			menu.querySelector("summary").focus();
		}
	});
	document.addEventListener("click", (e) => {
		if (!menu.contains(e.target)) menu.open = false;
	});
})();
