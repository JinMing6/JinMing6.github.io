<script setup>
import { ref } from 'vue';
import ExcelJS from 'exceljs';

const loading = ref(false);
const fileInput = ref();
const workerUrl = new URL('./worker.js', import.meta.url);
const myWorker = new Worker(workerUrl, { type: 'module' });
myWorker.onmessage = (e) => {
  const blob = e.data;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'newTemplate.xlsx';
  a.click();
  URL.revokeObjectURL(url);
  loading.value = false;
};

const handleChange = (e) => {
  const file = e.target.files[0];
  loading.value = true;
  const reader = new FileReader();
  reader.onload = (e) => {
    myWorker.postMessage(e.target.result);
  };
  reader.readAsArrayBuffer(file);
};

const openUploadInput = () => {
  fileInput.value.value = '';
  fileInput.value.click();
};
</script>

<template>
  <div class="excelDemoWrap">
    <div class="loaderWrap" v-if="loading">
      <div class="loader"></div>
    </div>
    <p>
      <a
        class="downloadLink"
        href="../../public/excel/template.xlsx"
        target="_blank"
        download="template.xlsx"
        >下载模板</a
      >
      <a href="javascript:void(0)" @click="openUploadInput">上传Excel</a>
    </p>
    <input id="fileInput" type="file" ref="fileInput" @change="handleChange" />
  </div>
</template>

<style lang="scss">
.excelDemoWrap {
  position: relative;
}

.loaderWrap {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
}

.loader {
  height: 50px;
  aspect-ratio: 2;
  border: 10px solid #000;
  box-sizing: border-box;
  background: radial-gradient(farthest-side, #fff 98%, #0000) left/20px 20px,
    radial-gradient(farthest-side, #fff 98%, #0000) left/20px 20px,
    radial-gradient(farthest-side, #fff 98%, #0000) center/20px 20px,
    radial-gradient(farthest-side, #fff 98%, #0000) right/20px 20px, #000;
  background-repeat: no-repeat;
  filter: blur(4px) contrast(10);
  animation: l14 1s infinite;
}

@keyframes l14 {
  100% {
    background-position: right, left, center, right;
  }
}

#fileInput {
  display: none;
}

.downloadLink {
  margin-right: 10px;
}
</style>
