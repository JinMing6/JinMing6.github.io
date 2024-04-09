---
outline: deep
---

<script setup>
  import ExcelDemo from '../components/ExcelDemo/ExcelDemo.vue';
</script>

# Excel 示例

下载模板后，进行上传，系统便会往模版中新添加一列，并且下载一个新的模板文件。

<ClientOnly>
  <ExcelDemo />
</ClientOnly>

## ExcelDemo.vue

<<< ../components/ExcelDemo/ExcelDemo.vue

## worker.js

采用 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 来解决生成 Excel 时的页面渲染阻塞问题。

<<< ../components/ExcelDemo/worker.js
