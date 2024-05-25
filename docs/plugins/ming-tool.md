---
outline: deep
---

# ming-tool

🔧 前端工具库

## 特性

- ✅ [公共下拉选项](#option)
- ✅ [空值替换](#replaceempty)
- ✅ [下载文件](#downloadfilev2)
- ✅ [随机颜色](#getrandomcolor)
- ✅ [图片转 Webp](#convert2webp)
- ✅ [根据 url 获取文件名及后缀](#getfilenamefromurl)
- ✅ [根据 content-disposition 获取文件名及后缀](#getfilenamefromdisposition)
- ✅ [浏览器兼容性提示](#compatibility)

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

### Option

公共下拉选项

- 语法

`new Option(options)`

- 参数

options

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

### replaceEmpty

空值替换

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

### downloadFile <Badge type="danger" text="弃用" />

下载文件

> [!NOTE]
>
> 建议使用 [downloadFileV2](#downloadfilev2) 代替

- 语法

`downloadFile(options)`

- 参数

options

| 字段        | 类型          | 默认 | 描述                                  |
| ----------- | ------------- | ---- | ------------------------------------- |
| inputType   | `String`      | -    | 输入类型 (` 'url'`、`'arrayBuffer' `) |
| filename    | `String`      | -    | 文件名称                              |
| url         | `String`      | -    | 文件 url 地址                         |
| arrayBuffer | `ArrayBuffer` | -    | 文件流                                |

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
> - 当采用 `url 方式`时，如果是非同源地址，会导致无法下载文件（例如，只打开一个新标签页展示）
> - 建议用接口获取文件流，然后采用`文件流 方式`下载
> - 如果是附件服务的资源地址，则正常下载（前提，附件服务器已配置允许下载）

### downloadFileV2

下载文件 (已进行传参优化)

- 语法

`downloadFileV2(options)`

- 参数

options

| 字段       | 类型                   | 默认 | 描述                                  |
| ---------- | ---------------------- | ---- | ------------------------------------- |
| type       | `String`               | -    | 输入类型 (` 'url'`、`'arrayBuffer' `) |
| filename   | `String`               | -    | 文件名称                              |
| dataSource | `String / ArrayBuffer` | -    | 文件 url 或 arrayBuffer               |

- 示例

```js
import { downloadFileV2 } from '@jinming6/ming-tool';

/* 根据文件流进行下载，文件流一般从接口返回(例如excel导出) */
// const str = '大道泛兮，其可左右。';
// const encoder = new TextEncoder();
// const encodedData = encoder.encode(str);
// const buffer = new ArrayBuffer(encodedData.byteLength);
// const uint8Array = new Uint8Array(buffer);
// uint8Array.set(encodedData);
// downloadFileV2({
//   type: 'arrayBuffer',
//   filename: 'example.txt',
//   dataSource: buffer,
// })

/* 根据url进行下载 */
const url = './demo.png'; // 或者提供一个附件资源地址
const filename = 'test.png';
downloadFileV2({
  type: 'url',
  filename,
  dataSource: url,
});
```

### getRandomRgb

随机 rgb 色值

- 示例

```js
import { getRandomRgb } from '@jinming6/ming-tool';

console.log(getRandomRgb()); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
```

### getRandomHex

随机 hex 色值

- 示例

```js
import { getRandomHex } from '@jinming6/ming-tool';

console.log(getRandomHex()); // 获取一个随机的hex色值，例：#000000
```

### getRandomColor

随机 rgb / hex 色值

- 示例

```js
import { getRandomColor } from '@jinming6/ming-tool';

console.log(getRandomColor({ type: 'rgb' })); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
console.log(getRandomColor({ type: 'hex' })); // 获取一个随机的hex色值，例：#000000
```

### convert2Webp

图片转 Webp 格式

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

### getFilenameFromUrl

根据 url 获取文件名及后缀

- 语法

`getFilenameFromUrl(url)`

- 参数

| 字段 | 类型     | 默认 | 描述     |
| ---- | -------- | ---- | -------- |
| url  | `String` | -    | 文件链接 |

- 示例

```js
import { getFilenameFromUrl } from '@jinming6/ming-tool';

const url = 'https://www.baidu.com/abc.jpg';
getFilenameFromUrl(url); // abc.jpg
```

### getFilenameFromDisposition

根据 content-disposition 获取文件名及后缀

- 语法

`getFilenameFromDisposition(contentDispotition)`

- 参数

| 字段               | 类型     | 默认 | 描述       |
| ------------------ | -------- | ---- | ---------- |
| contentDispotition | `String` | -    | 响应头内容 |

- 示例

```js
import { getFilenameFromDisposition } from '@jinming6/ming-tool';

console.log(getFilenameFromDisposition('attachment; filename="example.txt"')); // 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename=example.txt')); // 'example.txt'
console.log(getFilenameFromDisposition('attachment; filename*=UTF-8''%e4%b8%ad%e6%96%87.txt')); // '中文.txt'
console.log(getFilenameFromDisposition('attachment')); // null
console.log(getFilenameFromDisposition(null)); // null
```

### Compatibility <Badge type="warning" text="实验" />

浏览器兼容性提示

- 语法

`Compatibility(options)`

- 参数

options

| 字段    | 类型            | 默认 | 描述             |
| ------- | --------------- | ---- | ---------------- |
| edge    | `BrowserOption` | -    | edge 版本配置    |
| firefox | `BrowserOption` | -    | firefox 版本配置 |
| opera   | `BrowserOption` | -    | opera 版本配置   |
| chrome  | `BrowserOption` | -    | chrome 版本配置  |
| safari  | `BrowserOption` | -    | safari 版本配置  |

BrowserOption

| 字段         | 类型     | 默认 | 描述                                      |
| ------------ | -------- | ---- | ----------------------------------------- |
| minVersion   | `String` | -    | 最低版本                                  |
| downloadLink | `String` | -    | 浏览器下载地址 (不配置，则会默认官方地址) |

默认的 downloadLink 路径

```json
{
  "edge": "https://www.microsoft.com/zh-cn/edge",
  "firefox": "https://www.firefox.com.cn/",
  "chrome": "https://www.google.cn/chrome/",
  "opera": "https://www.opera.com/zh-cn",
  "safari": "https://www.apple.com/cn/safari/"
}
```

Methods

| 字段    | 默认 | 描述     |
| ------- | ---- | -------- |
| destroy | -    | 销毁实例 |

- 示例

```js
import { Compatibility } from '@jinming6/ming-tool';

// 如果当前浏览器不满足条件，则会在顶部添加一个fixed元素进行提示。
const compatibility = new Compatibility({
  minBrowserVersion: { chrome: { minVersion: '124' } },
});

// 销毁实例
compatibility.destroy();
```

![1714229103261.jpg](https://s2.loli.net/2024/04/27/tkr9IHmpQRaMqos.jpg)

## 结语

如果 `@jinming6/ming-tool` 对您有所帮助的话，可以去点个 [Star](https://github.com/Jinming6/ming-tool) 哦。
