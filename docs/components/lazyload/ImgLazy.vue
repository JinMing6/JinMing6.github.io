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
      loading: true,
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

const imgLoad = (ev, item) => {
  item.loading = false;
};

onMounted(() => {
  getData();
  setTimeout(() => {
    addListener();
  });
});
</script>

<template>
  <div class="imgListWrap">
    <ul class="imgList">
      <li v-for="item in data" class="imgItem" :title="item.title">
        <img
          ref="imgRefs"
          :alt="item.title"
          :data-src="item.src"
          @load="imgLoad($event, item)"
        />
        <div class="loaderWrap" v-if="item.loading">
          <div class="loader"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.imgListWrap {
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 12px 0;
}

.imgList {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 500px;
  overflow: auto;
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

.loaderWrap {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
  z-index: 9;
}

.loader {
  width: 80px;
  aspect-ratio: 1;
  border: 10px solid #000;
  box-sizing: border-box;
  background: radial-gradient(farthest-side, #fff 98%, #0000) 50%/20px 20px,
    radial-gradient(farthest-side, #fff 98%, #0000) 50%/20px 20px,
    radial-gradient(farthest-side, #fff 98%, #0000) 50%/20px 20px,
    radial-gradient(farthest-side, #fff 98%, #0000) 50%/20px 20px,
    radial-gradient(farthest-side, #fff 98%, #0000) 50%/20px 20px,
    linear-gradient(#fff 0 0) 50%/100% 10px,
    linear-gradient(#fff 0 0) 50%/10px 100%, #000;
  background-repeat: no-repeat;
  filter: blur(4px) contrast(10);
  animation: l13 0.8s infinite;
}
@keyframes l13 {
  100% {
    background-position: 50% -20px, -20px 50%, 60px 50%, 50% 60px, 50%, 50%, 50%;
  }
}
</style>
