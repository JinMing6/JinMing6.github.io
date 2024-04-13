---
outline: deep
---

# @jinming6/ming-tool

🔧 前端工具库

## 特性

- ✅ [公共下拉选项](#公共下拉选项)
- ✅ [空值替换](#空值替换)
- ✅ [下载文件流](#下载文件流)
- ✅ [随机颜色](#随机颜色)

## 安装

::: code-group

```bash [NPM]
$ npm i @jinming6/ming-tool -S
```

```bash [Yarn]
$ yarn add @jinming6/ming-tool -S
```

```bash [PNPM]
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

const option = new Option({
  dataSource,
});

// 下拉选项 (一般用于下拉筛选项)
// option.options

// 名称映射对象 (value映射为label)
// option.labelMap
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

### 下载文件流

- 语法

`downloadArrayBuffer(buffer, filename)`

- 参数

| 字段     | 类型          | 默认 | 描述     |
| -------- | ------------- | ---- | -------- |
| buffer   | `ArrayBuffer` | -    | 文件流   |
| filename | `String`      | -    | 文件名称 |

- 示例

```js
import { downloadArrayBuffer } from '@jinming6/ming-tool';

const str = '大道泛兮，其可左右。';
const encoder = new TextEncoder();
const encodedData = encoder.encode(str);
const buffer = new ArrayBuffer(encodedData.byteLength);
const uint8Array = new Uint8Array(buffer);
uint8Array.set(encodedData);

// buffer一般是从接口获取的，这里是为了测试方便，所以这么写。
downloadArrayBuffer(buffer, 'example.txt');
```

### 随机颜色

- 示例

```js
import { getRandomRg, getRandomHex } from '@jinming6/ming-tool';

console.log(getRandomRg()); // 获取一个随机的rgb色值，例：rgb(0, 0, 0)
console.log(getRandomHex()); // 获取一个随机的hex色值，例：#000000
```

## 结语

如果 `@jinming6/ming-tool` 对您有所帮助的话，可以去点个 [Star](https://github.com/Jinming6/ming-tool) 哦。
