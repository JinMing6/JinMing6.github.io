---
outline: deep
---

# ming-tool

🔧 前端工具库

## 特性

- ✅ [公共下拉选项](#公共下拉选项)
- ✅ [空值替换](#空值替换)
- ✅ [下载文件](#下载文件)
- ✅ [随机颜色](#随机颜色)
- ✅ [图片转 Webp](#图片转-webp)

## 安装

::: code-group

```bash [npm]
$ npm i @jinming6/ming-tool -S
```

```bash [yarn]
$ yarn add @jinming6/ming-tool -S
```

```bash [pnpm]
$ pnpm add @jinming6/ming-tool -S
```

:::

## API

### 公共下拉选项

- 语法

`new Option(options)`

- 参数

> options

| 字段       | 类型     | 默认                                 | 描述         |
| ---------- | -------- | ------------------------------------ | ------------ |
| dataSource | `Array`  | -                                    | 数据源       |
| fieldsName | `Object` | `{ label: 'label', value: 'value' }` | 选项字段配置 |

- 方法

| 名称   | 参数      | 返回 | 描述       |
| ------ | --------- | ---- | ---------- |
| update | `options` | -    | 新参数配置 |

- 示例

```js
import { Option } from '@jinming6/ming-tool';

const dataSource = [
  {
    label: '关闭',
    value: 0,
  },
  {
    label: '开启',
    value: 1,
  },
  {
    label: '暂停',
    value: 2,
  },
];

/* 1.初始数据 */
const option = new Option({
  dataSource,
});
// 下拉选项 (一般用于下拉筛选项)
// option.options
// 名称映射对象 (value映射为label)
// option.labelMap

/* 2.更新数据 */
// 添加一个对象
dataSource.push({
  label: '其他'，
  value: 3
})
option.update({dataSource})
// 清空
option.update({dataSource: []})
```

### 空值替换

- 语法

`replaceEmpty(value, replaceStr)`

- 参数

| 字段       | 类型      | 默认 | 描述       |
| ---------- | --------- | ---- | ---------- |
| value      | `Unknown` | -    | 原始值     |
| replaceStr | `String`  | `--` | 空值占位符 |

- 示例

```js
import { replaceEmpty } from '@jinming6/ming-tool';

console.log(replaceEmpty(null)); // --
console.log(replaceEmpty(undefined)); // --
console.log(replaceEmpty('')); // --
console.log(replaceEmpty('你好')); // 你好
console.log(replaceEmpty(true)); // true
console.log(replaceEmpty(false)); // false
```

### 下载文件

- 语法

`downloadFile(options)`

- 参数

> options

| 字段        | 类型          | 默认 | 描述                                     |
| ----------- | ------------- | ---- | ---------------------------------------- |
| inputType   | `String`      | -    | 输入类型 (` 'string'`、`'arrayBuffer' `) |
| filename    | `String`      | -    | 文件名称                                 |
| url         | `String`      | -    | 文件 url 地址                            |
| arrayBuffer | `ArrayBuffer` | -    | 文件流                                   |

- 示例

```js
import { downloadFile } from '@jinming6/ming-tool';

/* 根据文件流进行下载，文件流一般从接口返回(例如excel导出) */
// const str = '大道泛兮，其可左右。';
// const encoder = new TextEncoder();
// const encodedData = encoder.encode(str);
// const buffer = new ArrayBuffer(encodedData.byteLength);
// const uint8Array = new Uint8Array(buffer);
// uint8Array.set(encodedData);
// downloadFile({
//   inputType: 'arrayBuffer',
//   arrayBuffer: buffer,
//   filename: 'example.txt',
// })

/* 根据url进行下载 */
const url = './demo.png'; // 或者提供一个附件资源地址
const filename = 'test.png';
downloadFile({
  inputType: 'url',
  url,
  filename,
});
```

> [!NOTE]
>
> - 当采用 `url 方式`时，如果是非同源地址，会导致无法下载文件（例如，只打开一个新标签页展示）建议用接口获取文件流，然后采用`文件流 方式`下载。
> - 如果是附件服务的资源地址，则正常下载（前提是，附件服务器已配置允许下载）。

### 随机颜色

- 示例

```js
import { getRandomRg, getRandomHex } from '@jinming6/ming-tool';

console.log(getRandomRg()); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
console.log(getRandomHex()); // 获取一个随机的hex色值，例：#000000
```

### 图片转 Webp

- 语法

`convert2Webp(file, filename)`

- 参数

| 字段    | 类型           | 默认 | 描述           |
| ------- | -------------- | ---- | -------------- |
| file    | `File`或`Blob` | -    | 文件对象       |
| quality | `Number`       | -    | 压缩率 `(0~1)` |

- 示例

```js
import { convert2Webp, downloadArrayBuffer } from '@jinming6/ming-tool';

// file是文件对象
const webpBlob = convert2Webp(file, 0.6);
// 下载转换后的Webp图片
downloadArrayBuffer(webpBlob, 'example.webp');
```

## 结语

如果 `@jinming6/ming-tool` 对您有所帮助的话，可以去点个 [Star](https://github.com/Jinming6/ming-tool) 哦。
