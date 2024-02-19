import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'zh-CN',
  title: 'Jinming6',
  description: '个人博客',
  appearance: 'force-dark',
  themeConfig: {
    nav: [
      { text: '插件', link: '/plugins/merge-helper' },
      { text: '示例', link: '/example/rotate-banner' },
    ],
    sidebar: {
      '/plugins/': [
        {
          text: '插件',
          items: [
            {
              text: 'merge-helper',
              link: '/plugins/merge-helper',
            },
          ],
        },
      ],
      '/example/': [
        {
          text: '示例',
          items: [
            {
              text: '旋转木马',
              link: '/example/rotate-banner',
            },
            {
              text: 'Element UI 表格',
              link: '/example/el-table',
            },
            {
              text: 'OCR 应用示例',
              link: '/example/ocr-demo',
            },
            {
              text: 'three.js 示例',
              link: '/example/three-demo',
            },
          ],
        },
      ],
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '上次更新',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Jinming6/Jinming6.github.io',
      },
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    footer: {
      copyright: 'Copyright © 2023-present Jinming6',
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
  },
  lastUpdated: true,
  vite: {
    optimizeDeps: {
      include: ['three'],
    },
  },
});
