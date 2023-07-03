import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Jinming6",
	description: "个人博客",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: "主页", link: "/guide/" }],

		sidebar: {
			"/guide/": [
				{
					text: "引导",
					items: [
						{
							text: "前言",
							link: "/guide/",
						},
					],
				},
				{
					text: "计算机基础",
					items: [
						{
							text: "内存",
							link: "/guide/computer-basics/memory",
						},
					],
				},
                {
                    text: "JavaScript",
                    items: [
                        {
                            text: "判断数据类型",
                            link: "/guide/javascript/"
                        }
                    ]
                },
				{
					text: "git",
					items: [
						{
							text: "实战场景",
							link: "/guide/git/scene",
						},
						{
							text: "规范指导",
							link: "/guide/git/standard",
						},
					],
				},
			],
		},

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/JinMing6/JinMing6.github.io",
			},
		],

		search: {
			provider: "local",
			options: {
				translations: {
					button: {
						buttonText: "搜索文档",
						buttonAriaLabel: "搜索文档",
					},
					modal: {
						noResultsText: "无法找到相关结果",
						resetButtonTitle: "清除查询条件",
						footer: {
							selectText: "选择",
							navigateText: "切换",
							closeText: "关闭",
						},
					},
				},
			},
		},

		footer: {
			copyright: "Copyright © 2023-present Jinming Zhao",
		},
	},
	lastUpdated: true,
});
