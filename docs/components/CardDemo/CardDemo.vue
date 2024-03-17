<script setup>
import { ref } from 'vue';
const items = [
  {
    id: 0,
    color: '#f00',
    text: '你好 👋',
  },
  {
    id: 1,
    color: '#0f0',
    text: 'Hello 👋',
  },
  {
    id: 2,
    color: '#0fe',
    text: 'Привет 👋',
  },
];
const itemRefs = ref([]);
const handleMouseMove = (ev, index) => {
  const { x, y } = ev;
  const dom = itemRefs.value[index];
  const rect = dom.getBoundingClientRect(); // 1.这里获取的left、top是相对于当前可视区域的。
  const newX = x - rect.left; // 2.所以要用鼠标相对于视口的值来进行计算
  const newY = y - rect.top;
  dom.style.setProperty('--x', `${newX}px`);
  dom.style.setProperty('--y', `${newY}px`);
};
</script>

<template>
  <div class="container">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      ref="itemRefs"
      class="item"
      :style="{
        '--clr': item.color,
      }"
      @mousemove="(ev) => handleMouseMove(ev, index)"
    >
      <div class="text">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.container > .item {
  width: 200px;
  height: 200px;
  background-color: rgba(45, 45, 45, 1);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.container > .item > .text {
  color: white;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  inset: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.container > .item::before {
  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: 400px;
  height: 400px;
  background: radial-gradient(var(--clr), transparent, transparent);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s;
}

.container > .item:hover::before {
  opacity: 1;
}

.container > .item::after {
  content: '';
  inset: 2px;
  border-radius: 6px;
  background-color: rgba(45, 45, 45, 0.75);
  position: absolute;
}

@media screen and (max-width: 768px) {
  .container .item {
    width: 150px;
    height: 150px;
  }

  .container .item::before {
    width: 300px;
    height: 300px;
  }

  .container > .item > .text {
    padding: 6px;
    inset: 30px;
  }
}
</style>
