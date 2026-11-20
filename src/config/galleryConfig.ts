import type { GalleryConfig } from "@/types/galleryConfig";

export const galleryConfig: GalleryConfig = {
	albums: [
		{
			id: "blog-art",
			name: "博客画廊",
			description: "首页轮播的两幅油画。",
			date: "2026-11-20",
			tags: ["油画", "博客"],
		},
		{
			id: "workbench",
			name: "电子工作台",
			description: "来自 PCB 焊接笔记和原型机部件清单的配图。",
			tags: ["PCB", "原型机"],
		},
	],
	columnWidth: 240,
};
