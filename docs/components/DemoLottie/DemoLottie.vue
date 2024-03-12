<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
const src = new URL('./Animation-1710222853150.json', import.meta.url).href;
</script>

<template>
  <div>
    <DotLottieVue autoplay loop :src="src" style="height: 320px; width: 320px">
    </DotLottieVue>
  </div>
</template>

<style lang="scss"></style>
