<script setup>
import { ref, onMounted, onBeforeUnmount, onDeactivated } from 'vue';
import { Scene } from './scene';

const container = ref();
const scene = ref();

onMounted(() => {
  scene.value = new Scene({
    el: container.value,
    parentElement: container.value.parentElement,
  });
});
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
  scene.value.destroy();
});
onDeactivated(() => {
  console.log('onDeactivated');
});
</script>

<template>
  <div ref="container"></div>
</template>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
