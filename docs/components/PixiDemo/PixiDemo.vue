<script>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import '@pixi/gif';
import * as PIXI from 'pixi.js';
import { PixiBaseScene } from './scene.js';
import bgImg from '../../assets/imgs/pixiImgs/bg.png';
import route1Gif from '../../assets/imgs/pixiImgs/route1.gif';
import route2Gif from '../../assets/imgs/pixiImgs/route2.gif';
import route3Gif from '../../assets/imgs/pixiImgs/route3.gif';
import flyImg from '../../assets/imgs/pixiImgs/series1/series1.png';
import flyJson from '../../assets/imgs/pixiImgs/series1/series1.json';
import boxImg from '../../assets/imgs/pixiImgs/series2/texture-0.png';
import boxJson from '../../assets/imgs/pixiImgs/series2/texture-0.json';

export default {
  setup() {
    const scene = ref(null);
    const scale = 0.37;
    const container = ref();

    const initCanvas = async () => {
      try {
        const el = container.value;

        if (!(el instanceof HTMLElement)) {
          return;
        }

        scene.value = new PixiBaseScene({
          el,
        });

        // 加载背景图
        const bgTexture = await PIXI.Assets.load(bgImg);
        const bgSprite = PIXI.Sprite.from(bgTexture);
        const elBoundingRect = el.getBoundingClientRect();
        bgSprite.scale = new PIXI.ObservablePoint(bgSprite, scale, scale);
        scene.value.app.stage.addChild(bgSprite);

        const arr = [];

        function switchRoute(index) {
          arr.forEach((item) => {
            item.visible = false;
            item.currentFrame = 0;
          });
          arr[index].visible = true;
        }

        // 加载路线gif
        Promise.all([
          PIXI.Assets.load(route1Gif),
          PIXI.Assets.load(route2Gif),
          PIXI.Assets.load(route3Gif),
        ])
          .then((value) => {
            value.forEach((item) => {
              item.scale = new PIXI.ObservablePoint(item, scale, scale);
              item.visible = false;
              scene.value?.app.stage.addChild(item);
              arr.push(item);
            });
            // 定时切换gif
            let currentIndex = 0;
            switchRoute(currentIndex);
            setInterval(() => {
              currentIndex = (currentIndex + 1) % arr.length;
              switchRoute(currentIndex);
            }, 1200);
          })
          .catch((err) => {
            console.log(err);
          });

        // 加载纸飞机
        const flyAnim = await createSprite(flyImg, flyJson, -10, 62, 'series1');
        scene.value?.app.stage.addChild(flyAnim);
      } catch (e) {
        console.log(e);
      }
    };

    /**
     * 创建精灵图
     */
    const createSprite = async (url, json, x, y, key) => {
      const texture = await PIXI.Assets.load(url);
      const spritesheet = new PIXI.Spritesheet(texture, json);
      await spritesheet.parse();
      let animation;
      animation = new PIXI.AnimatedSprite(spritesheet.animations[key]);
      animation.animationSpeed = 1;
      animation.scale = new PIXI.ObservablePoint(animation, scale, scale);
      animation.x = x;
      animation.y = y;
      animation.eventMode = 'static';
      animation.cursor = 'pointer';
      animation.on('pointerover', () => {
        animation.play();
      });
      animation.on('pointerout', () => {
        animation.stop();
      });
      return animation;
    };

    onMounted(() => {
      initCanvas();
    });

    return {
      scene,
      container,
    };
  },
};
</script>

<template>
  <div id="pixiContainer" ref="container"></div>
</template>

<style lang="scss" scoped>
#pixiContainer {
  width: 100%;
  height: 380px;
  overflow: hidden;
}
</style>
