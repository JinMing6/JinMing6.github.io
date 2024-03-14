<template>
  <div class="rotateBanner" @mousemove="handleMousemove">
    <!-- 轮播图 -->
    <div class="bannerList" :style="style">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        :class="{
          bannerItem: true,
          active: index === currentIndex,
        }"
        :style="{
          transform: `rotateY(${
            averageAngle * index
          }deg) translateZ(${translateZ}px)`,
          backgroundImage: `url(${item.url})`,
        }"
      ></div>
    </div>
    <!-- 旋转控件 -->
    <div class="controls" :style="controlsStyle" @click="handleClickControls">
      <div class="left" :data-direction="ARROW_TYPE.TO_LEFT">
        <span class="iconfont icon-left"></span>
      </div>
      <div class="right" :data-direction="ARROW_TYPE.TO_RIGHT">
        <span class="iconfont icon-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { isFunction } from 'lodash-es';

const getRotateYStyle = (rotateY) => {
  return `rotateX(-10deg) rotateY(${rotateY}deg)`;
};
const ROTATE_MODE = {
  FREEZE: 'feeze',
  FREE: 'free',
};
const ARROW_TYPE = {
  TO_LEFT: 'toLeft',
  TO_RIGHT: 'toRight',
};

export default {
  name: 'RotateBanner',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    itemWidth: {
      type: String,
      default: '200px',
    },
    itemHeight: {
      type: String,
      default: '300px',
    },
    controlsWidth: {
      type: String,
      default: '60%',
    },
  },
  data() {
    return {
      ARROW_TYPE,
      mousesdown: false,
      moveing: false,
      startX: 0,
      endX: 0,
      rotateYDeg: 0,
      style: {
        width: this.itemWidth,
        height: this.itemHeight,
        transform: getRotateYStyle(0),
      },
      timer: null,
      currentIndex: 0,
      isMoving: false,
      controlsStyle: {
        width: this.controlsWidth,
      },
    };
  },
  computed: {
    // 平均旋转的角度
    averageAngle() {
      return 360 / this.list.length;
    },
    // 平均沿z轴偏移的距离
    translateZ() {
      const width = parseInt(this.itemWidth);
      const translateZ =
        width / Math.tan((this.averageAngle / 2 / 180) * Math.PI);
      return Math.floor(translateZ);
    },
  },
  mounted() {
    document.addEventListener('mousedown', this.handleMousedown);
    document.addEventListener('mouseup', this.handleMouseup);
    document.addEventListener('keyup', this.handleKeyup);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleMousedown);
    document.removeEventListener('mouseup', this.handleMouseup);
    document.removeEventListener('keyup', this.handleKeyup);
  },
  methods: {
    /**
     * 鼠标按键按下时触发
     */
    handleMousedown(ev) {
      this.mousesdown = true;
      this.startX = ev.clientX;
    },
    /**
     * 鼠标按键抬起时触发
     */
    handleMouseup() {
      this.mousesdown = false;
      if (!this.isMoving) {
        return;
      }
      this.handleRotate();
      this.isMoving = false;
    },
    /**
     * 鼠标移动时触发
     */
    handleMousemove(ev) {
      if (!this.mousesdown) {
        return;
      }
      this.isMoving = true;
      this.endX = ev.clientX;
    },
    /**
     * 控制旋转
     */
    handleRotate(mode = ROTATE_MODE.FREEZE) {
      if (this.startX === this.endX) {
        return;
      }
      const rate = mode === ROTATE_MODE.FREEZE ? this.averageAngle : 18;
      if (this.startX < this.endX) {
        // 从左往右
        this.rotateYDeg += rate;
        this.currentIndex -= 1;
        if (this.currentIndex < 0) {
          this.currentIndex = this.list.length - 1;
        }
      } else {
        // 从右往左
        this.rotateYDeg -= rate;
        this.currentIndex += 1;
        if (this.currentIndex > this.list.length - 1) {
          this.currentIndex = 0;
        }
      }
      this.style.transform = getRotateYStyle(this.rotateYDeg);
    },
    /**
     * 手动调用方法进行旋转轮播
     */
    manualRotate(arrowType = ARROW_TYPE.TO_LEFT) {
      if (!Object.values(ARROW_TYPE).includes(arrowType)) {
        return;
      }
      this.callStrategyFoo(
        {
          [ARROW_TYPE.TO_LEFT]: () => {
            this.rotateYDeg -= this.averageAngle;
            this.currentIndex += 1;
            if (this.currentIndex > this.list.length - 1) {
              this.currentIndex = 0;
            }
          },
          [ARROW_TYPE.TO_RIGHT]: () => {
            this.rotateYDeg += this.averageAngle;
            this.currentIndex -= 1;
            if (this.currentIndex < 0) {
              this.currentIndex = this.list.length - 1;
            }
          },
        },
        arrowType
      );
      this.style.transform = getRotateYStyle(this.rotateYDeg);
    },
    /**
     * 键盘按键抬起时触发
     */
    handleKeyup(ev) {
      this.callStrategyFoo(
        {
          ArrowLeft: () => {
            this.manualRotate(ARROW_TYPE.TO_LEFT);
          },
          ArrowRight: () => {
            this.manualRotate(ARROW_TYPE.TO_RIGHT);
          },
        },
        ev.key
      );
    },
    /**
     * 策略模式调用函数
     */
    callStrategyFoo(obj, key, ...args) {
      const foo = obj[key];
      isFunction(foo) && foo(...args);
    },
    /**
     * 点击控制按钮时触发
     */
    handleClickControls(ev) {
      const controlItem = ev.target.closest('[data-direction]');
      if (!controlItem) {
        return;
      }
      const direction = controlItem.dataset.direction;
      this.manualRotate(direction);
    },
  },
};
</script>

<style lang="scss" scoped>
$radius: 10px;

.rotateBanner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: grab;
  background-color: #000000;
}
.bannerList {
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center;
  transition: all 0.2s ease-out;
}
.bannerList .bannerItem {
  position: absolute;
  background: skyblue;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: white;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  border-radius: $radius;
  background-size: 100% 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5) inset;
  filter: blur(1.5px);
  opacity: 0.5;
  &.active {
    cursor: pointer;
    filter: none;
    opacity: 1;
  }
}

.bannerList > .bannerItem > .content {
  padding: 10px 20px;
}
.rotateBanner > .controls {
  position: absolute;
  height: 130px;
  display: flex;
  justify-content: space-between;
  > .left,
  > .right {
    width: 80px;
    background: linear-gradient(135deg, #485563, #29323c);
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: $radius;
    transition: all 0.2s;
    > .iconfont {
      font-size: 50px;
      color: #bdc3c7;
    }
    &:hover {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
