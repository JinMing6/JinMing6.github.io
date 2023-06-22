import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
	title: "Jinming6",
	description: "个人博客",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: "主页", link: "/guide/" }],

		sidebar: {
			'/guide/': [
				{
					text: "引导",
					items: [
						{
							text: "概述",
							link: "/guide/",
						},
					],
				}
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
      copyright: 'Copyright © 2023-present Jinming Zhao'
    }
	},
  lastUpdated: true
});
