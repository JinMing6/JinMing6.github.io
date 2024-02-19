<script setup>
import { ref, onMounted, onBeforeUnmount, onDeactivated } from 'vue';
import { Scene } from './scene';
import WebGL from 'three/addons/capabilities/WebGL.js';

const container = ref();
const scene = ref();
const supportWebGL = WebGL.isWebGLAvailable();

onMounted(() => {
  if (supportWebGL) {
    scene.value = new Scene({
      el: container.value,
      parentElement: container.value.parentElement,
    });
  }
});
onBeforeUnmount(() => {
  scene.value?.destroy();
});
</script>

<template>
  <div v-if="supportWebGL" ref="container"></div>
  <div v-else>WebGL is not available</div>
</template>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
