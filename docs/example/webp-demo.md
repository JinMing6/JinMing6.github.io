---
outline: deep
---

<script setup>
  import Img2Webp from '../components/Img2Webp/Img2Webp.vue';
</script>

# 图片转 webp

## 前端实现

<Img2Webp />

<<< ../components/Img2Webp/Img2Webp.vue

## 后端实现

```js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputBuffer = fs.readFileSync(
  path.resolve(__dirname, './assets/input.png')
);

sharp(inputBuffer)
  .webp({ lossless: true })
  .toFile(path.resolve(__dirname, './assets/output.webp'), (err, info) => {
    if (err) throw err;
    console.log('转换成功', info);
  });
```
