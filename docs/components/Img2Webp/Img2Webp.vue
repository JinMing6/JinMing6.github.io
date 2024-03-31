<script setup>
import { ref, computed } from 'vue';

const downloadUrl = ref();
const thumbStyle = ref({});
const filename = ref();
const downloadName = computed(() => `${filename.value}.webp`);

const onChange = (ev) => {
  const { files } = ev.target;
  const parts = files[0].name.split('.');
  filename.value = parts[0];
  const url = URL.createObjectURL(files[0]);
  const img = new Image();
  img.src = url;
  img.onload = (ev) => {
    const { width, height } = img;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);
        downloadUrl.value = url;
        const scaledDimensions = calculateProportionalScaling(
          width,
          height,
          200,
          200
        );
        thumbStyle.value = {
          width: `${scaledDimensions.width}px`,
          height: `${scaledDimensions.height}px`,
        };
      },
      'image/webp',
      0.8
    );
  };
};

const calculateProportionalScaling = (
  originalWidth,
  originalHeight,
  targetWidth,
  targetHeight
) => {
  // 计算原始图片的宽高比例
  const aspectRatio = originalWidth / originalHeight;

  // 以目标宽度为基准进行缩放
  if (targetWidth && !targetHeight) {
    targetHeight = targetWidth / aspectRatio;
  }
  // 以目标高度为基准进行缩放
  else if (targetHeight && !targetWidth) {
    targetWidth = targetHeight * aspectRatio;
  }
  // 如果同时设置了目标宽度和高度，则以其中较小的一个为基准进行缩放
  else if (targetWidth && targetHeight) {
    const targetAspectRatio = targetWidth / targetHeight;
    if (targetAspectRatio > aspectRatio) {
      targetWidth = targetHeight * aspectRatio;
    } else {
      targetHeight = targetWidth / aspectRatio;
    }
  }

  // 返回缩放后的宽度和高度
  return {
    width: targetWidth,
    height: targetHeight,
  };
};
</script>

<template>
  <div class="img2WebpWrap">
    <input type="file" @change="onChange" />
    <div class="thumbWrap">
      <img class="thumb" :src="downloadUrl" :style="thumbStyle" />
    </div>
    <a
      v-if="downloadUrl != null"
      :href="downloadUrl"
      target="_blank"
      :download="downloadName"
      >下载 {{ downloadName }}</a
    >
  </div>
</template>

<style lang="scss" scoped>
.img2WebpWrap {
  margin-top: 20px;
}
.thumbWrap {
  width: 220px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  margin: 20px 0;
  padding: 10px;
}
</style>
