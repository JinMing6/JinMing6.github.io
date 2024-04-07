<script setup>
import { ref, onMounted } from 'vue';
const imgRefs = ref([]);
const data = ref([]);
const getData = () => {
  const newData = new Array(1e3).fill(0).map((_, index) => {
    return {
      id: index,
      src: `https://picsum.photos/200/300?random=${index}`,
      title: `图片${index}`,
    };
  });
  data.value = newData;
};
/**
 * 懒加载监听
 */
const addListener = () => {
  imgRefs.value.forEach((item) => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          intersectionObserver.unobserve(img);
        }
      });
    });
    intersectionObserver.observe(item);
  });
};
onMounted(() => {
  getData();
  setTimeout(() => {
    addListener();
  });
});
</script>

<template>
  <ul class="imgList">
    <li v-for="item in data" class="imgItem" :title="item.title">
      <img ref="imgRefs" :alt="item.title" :data-src="item.src" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.imgList {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 500px;
  overflow: auto;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  padding: 0;
  justify-content: center;
}

.imgItem {
  width: 200px;
  height: 300px;
  margin: 0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.imgItem::after {
  content: attr(title);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  font-weight: bold;
  backdrop-filter: blur(4px);
}
</style>
