<script setup>
import { ref, onMounted } from 'vue';
import lottie from 'lottie-web';
const src = new URL('./Animation-1710222853150.json', import.meta.url).href;
const container = ref();
onMounted(() => {
  lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: src,
  });
});
</script>

<template>
  <div ref="container" class="container"></div>
</template>

<style lang="scss" scoped>
.container {
  width: 320px;
  height: 320px;
}
</style>
