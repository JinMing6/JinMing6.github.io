---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Jinming6'
  text: '大道泛兮，其可左右'
  tagline: '大道广泛流行，左右上下无所不到'
  image:
    src: /hero.svg
    alt: Jinming6
  actions:
    - theme: brand
      text: 开始阅读
      link: /plugins/merge-helper
    - theme: alt
      text: 了解更多
      link: /more-info/
features:
  - title: 掘金
    linkText: '点击查看'
    link: https://juejin.cn/user/184373686577341/posts
  - title: Bilibili
    linkText: '点击查看'
    link: https://space.bilibili.com/248544247?spm_id_from=333.1007.0.0
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
