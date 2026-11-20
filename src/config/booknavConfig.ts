import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

// 书签导航页面配置
export const booknavPageConfig: BooknavPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "网址导航",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "搜索站点名称、域名或用途。",

	// favicon 自动获取配置
	favicon: {
		// 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
		enabled: true,

		// favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
		// 更换接口只需保证地址里含有 {domain}，例如：
		//   https://a.favicon.im/{domain}
		//   https://favicon.im/{domain}
		api: "https://a.favicon.im/{domain}",
	},
};

// 书签导航配置
// 每个数组项是一个分类组，分类组内的 items 是该分类下的书签
export const booknavConfig: BooknavGroup[] = [
	{
		id: "tools",
		name: "工具箱",
		weight: 99,
		items: [
			{
				title: "中科大测速",
				url: "https://test.ustc.edu.cn/",
				desc: "测量网络带宽",
				weight: 100,
			},
			{
				title: "ITDOG",
				url: "https://www.itdog.cn/",
				desc: "网络连通性检测",
				weight: 99,
			},
			{
				title: "在线图像工具箱",
				url: "https://phototool.cn/",
				desc: "处理图片尺寸与格式",
				weight: 98,
			},
			{
				title: "SauceNAO",
				url: "https://saucenao.com/",
				desc: "按图片查找出处",
				weight: 97,
			},
			{
				title: "StarDots",
				url: "https://dashboard.stardots.io/?lang=zh",
				desc: "图片托管控制台",
				weight: 96,
			},
			{
				title: "抠抠图",
				url: "https://www.koukoutu.com/removebgtool/all",
				desc: "去除图片背景",
				weight: 95,
			},
			{
				title: "AdWorker",
				url: "https://adworker.ai/zh/tools/gif-background-remover/",
				desc: "为 GIF 制作透明背景",
				weight: 94,
			},
			{
				title: "PatorJK",
				url: "https://patorjk.com/",
				desc: "字符画与网页小工具",
				weight: 93,
			},
		],
	},
	{
		id: "assistants",
		name: "AI 助手",
		weight: 98,
		items: [
			{
				title: "豆包",
				url: "https://www.doubao.com/",
				desc: "中文对话助手",
				weight: 100,
			},
			{
				title: "ChatGPT",
				url: "https://chatgpt.com/",
				desc: "写作、编程与对话",
				weight: 99,
			},
			{
				title: "Claude",
				url: "https://claude.ai/",
				desc: "文档分析与协作写作",
				weight: 98,
			},
			{
				title: "Gemini",
				url: "https://gemini.google.com/",
				desc: "多模态对话",
				weight: 97,
			},
			{
				title: "Grok",
				url: "https://grok.com/",
				desc: "问答与内容创作",
				weight: 96,
			},
		],
	},
	{
		id: "ai",
		name: "AI 工具",
		weight: 97,
		items: [
			{
				title: "Artificial Analysis",
				url: "https://artificialanalysis.ai/?intelligence-category=reasoning-vs-non-reasoning",
				desc: "比较模型基准成绩",
				weight: 100,
			},
			{
				title: "AI Arena",
				url: "https://arena.ai/leaderboard",
				desc: "模型对战排行榜",
				weight: 99,
			},
			{
				title: "ModelScope",
				url: "https://www.modelscope.cn/",
				desc: "模型与数据集社区",
				weight: 98,
			},
			{
				title: "Skills Marketplace",
				url: "https://skillsmp.com/",
				desc: "检索智能体技能",
				weight: 97,
			},
			{
				title: "PromptPilot",
				url: "https://promptpilot.volcengine.com/",
				desc: "编写与调试提示词",
				weight: 96,
			},
			{
				title: "ACGN AI 资源站",
				url: "https://res.acgnai.top/",
				desc: "浏览 AI 创作资源",
				weight: 95,
			},
			{
				title: "Oblivionis",
				url: "https://image.oblivionis.net/gallery",
				desc: "按作品浏览图像提示词",
				weight: 94,
			},
			{
				title: "Figma",
				url: "https://www.figma.com/",
				desc: "协作设计与原型",
				weight: 93,
			},
			{
				title: "Google AI Studio",
				url: "https://aistudio.google.com/",
				desc: "测试 Gemini 模型",
				weight: 92,
			},
			{
				title: "Google Stitch",
				url: "https://stitch.withgoogle.com/",
				desc: "使用提示词设计界面",
				weight: 91,
			},
			{
				title: "Ollama",
				url: "https://ollama.com/",
				desc: "本地运行语言模型",
				weight: 90,
			},
		],
	},
	{
		id: "bots",
		name: "AI BOT",
		weight: 96,
		items: [
			{
				title: "NapCat",
				url: "https://napneko.github.io/",
				desc: "QQ 机器人文档入口",
				weight: 100,
			},
			{
				title: "AstrBot",
				url: "https://astrbot.app/",
				desc: "配置多平台对话机器人",
				weight: 99,
			},
			{
				title: "Mai-bot",
				url: "https://docs.mai-mai.org/",
				desc: "麦麦机器人文档",
				weight: 98,
			},
			{
				title: "NoneBot",
				url: "https://nonebot.dev/docs/",
				desc: "Python 机器人开发文档",
				weight: 97,
			},
			{
				title: "LLBot",
				url: "https://github.com/LLOneBot/LuckyLilliaBot",
				desc: "查看项目源码与版本",
				weight: 96,
			},
		],
	},
	{
		id: "frontend",
		name: "前端组件库",
		weight: 95,
		items: [
			{
				title: "One Page Love",
				url: "https://onepagelove.com/",
				desc: "浏览单页网站案例",
				weight: 100,
			},
			{
				title: "Mobbin",
				url: "https://mobbin.com/",
				desc: "查找产品界面与流程",
				weight: 99,
			},
			{
				title: "Awwwards",
				url: "https://www.awwwards.com/",
				desc: "浏览获奖网站",
				weight: 98,
			},
			{
				title: "shadcn/ui",
				url: "https://ui.shadcn.com/",
				desc: "React 界面组件",
				weight: 97,
			},
			{
				title: "HeroUI",
				url: "https://heroui.com/",
				desc: "组件与交互示例",
				weight: 96,
			},
			{
				title: "Uiverse",
				url: "https://uiverse.io/",
				desc: "社区分享的界面元素",
				weight: 95,
			},
			{
				title: "CodePen",
				url: "https://codepen.io/",
				desc: "在线运行前端示例",
				weight: 94,
			},
			{
				title: "React Bits",
				url: "https://www.reactbits.dev/",
				desc: "React 动效组件",
				weight: 93,
			},
			{
				title: "Magic UI",
				url: "https://magicui.design/",
				desc: "动效与交互样式",
				weight: 92,
			},
			{
				title: "Aceternity UI",
				url: "https://ui.aceternity.com/",
				desc: "React 动画组件",
				weight: 91,
			},
			{
				title: "Iconify",
				url: "https://iconify.design/",
				desc: "检索图标集合",
				weight: 90,
			},
			{
				title: "Sketchfab",
				url: "https://sketchfab.com/",
				desc: "浏览三维模型",
				weight: 89,
			},
		],
	},
	{
		id: "study",
		name: "学习知识库",
		weight: 94,
		items: [
			{
				title: "Java 全栈知识体系",
				url: "https://pdai.tech/",
				desc: "Java 技术笔记",
				weight: 100,
			},
			{
				title: "JavaGuide",
				url: "https://javaguide.cn/",
				desc: "后端与面试学习资料",
				weight: 99,
			},
			{
				title: "异常教程",
				url: "https://www.exception.site/",
				desc: "开发环境与 IDE 文章",
				weight: 98,
			},
			{
				title: "力扣",
				url: "https://leetcode.cn/",
				desc: "练习算法题",
				weight: 97,
			},
			{
				title: "牛客网",
				url: "https://www.nowcoder.com/",
				desc: "笔试与面试练习",
				weight: 96,
			},
		],
	},
	{
		id: "comics",
		name: "动漫&漫画",
		weight: 93,
		items: [
			{
				title: "AGE 动漫",
				url: "https://www.agedm.io/update",
				desc: "番剧更新目录",
				weight: 100,
			},
			{
				title: "ManhwaTop",
				url: "https://manhwatop.com/",
				desc: "漫画目录",
				weight: 99,
			},
		],
	},
	{
		id: "api",
		name: "API 接口",
		weight: 92,
		items: [
			{
				title: "小小API",
				url: "https://xxapi.cn/",
				desc: "查找常用数据接口",
				weight: 100,
			},
			{
				title: "高德地图API",
				url: "https://lbs.amap.com/",
				desc: "位置与地图服务",
				weight: 99,
			},
			{
				title: "聚合数据",
				url: "https://www.juhe.cn/",
				desc: "数据接口目录",
				weight: 98,
			},
			{
				title: "有道翻译API",
				url: "https://ai.youdao.com/",
				desc: "翻译服务开发入口",
				weight: 97,
			},
			{
				title: "Tavily",
				url: "https://app.tavily.com/home",
				desc: "搜索 API 控制台",
				weight: 96,
			},
		],
	},
];
