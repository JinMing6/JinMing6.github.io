---
outline: deep
---

<script lang="ts" setup>
  import MergeRow from '../components/MergeRow.vue'
</script>

# merge-helper

轻松处理单元格的合并

## 效果

![capture-1710119346804.png](https://s2.loli.net/2024/03/11/Fb6mMay49HWjrke.png)

## 特性

- [x] 合并`行`、`列`
- [x] 生成`合并`后的序号
- [x] 数据`分段`

## 安装

::: tip
使用前，请安装 [lodash](https://lodash.com)
:::

> 包管理工具

```bash
# pnpm
$ pnpm add @jinming6/merge-helper

# yarn
$ yarn add @jinming6/merge-helper

# npm
$ npm i @jinming6/merge-helper
```

> CDN

```html
<script src="https://unpkg.com/@jinming6/merge-helper/dist/mergeHelper.min.js"></script>
```

## 快速上手

### 合并 " 行 "

- 效果

![capture-1710119346804.png](https://s2.loli.net/2024/03/11/Fb6mMay49HWjrke.png)

- 代码

```js
import { getMergedData, Mode, getFieldSpan } from '@jinming6/merge-helper';

const dataSource = [
  {
    id: 0,
    date: '2024-03-10',
    name: '张三',
    address: '山东省青岛市',
  },
  {
    id: 1,
    date: '2024-03-11',
    name: '张三',
    address: '张三',
  },
  {
    id: 2,
    date: '2024-03-12',
    name: '张三',
    address: '山东省青岛市',
  },
  {
    id: 3,
    date: '2024-03-13',
    name: '张三',
    address: '山东省青岛市',
  },
];
const mergeFields = [
  {
    field: 'name',
    callback(curItem, nextItem) {
      // 这里是自定义逻辑
      return curItem.name === nextItem.name;
    },
  },
  'address',
  'date',
];
const options = {
  mode: Mode.Row,
  dataSource,
  mergeFields,
  genSort: true,
};
// 这里是计算完毕后的数据
const mergedData = getMergedData(options);
// 处理合并的函数
function spanMethod({ row, column }) {
  // 这里会输出 { rowspan: n, colspan: n }，n就是经过计算后，得到的值。
  return getFieldSpan(row, column.property);
}
```

### 合并 " 列 "

- 效果

![capture-1710119377249.png](https://s2.loli.net/2024/03/11/Tdqvt7L8cOiVjPK.png)

- 代码

```js
import { getMergedData, Mode, getFieldSpan } from '@jinming6/merge-helper';

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'address', label: '地址' },
  { prop: 'date', label: '日期' },
];
const dataSource = [
  {
    id: 0,
    date: '2024-03-10',
    name: '张三',
    address: '山东省青岛市',
  },
  {
    id: 1,
    date: '2024-03-11',
    name: '张三',
    address: '张三',
  },
  {
    id: 2,
    date: '2024-03-12',
    name: '张三',
    address: '山东省青岛市',
  },
  {
    id: 3,
    date: '2024-03-13',
    name: '张三',
    address: '山东省青岛市',
  },
];
const options = {
  mode: Mode.Col, // 合并列模式
  dataSource,
  mergeFields: columns.map((item) => item.prop), // 必须传入全部列的prop
};
// 这里是计算完毕后的数据
const mergedData = getMergedData(options);
// 处理合并的函数
const spanMethod = ({ row, column, columnIndex }) => {
  if (columnIndex === 0) {
    return { rowspan: 1, colspan: 1 };
  }
  return getFieldSpan(row, column.property);
};
```

## API

### CellMerger

- 参数

| 名称        | 类型                  | 必填 | 描述                                                    |
| ----------- | --------------------- | ---- | ------------------------------------------------------- |
| dataSource  | Array                 | 是   | 数据源                                                  |
| mergeFields | [Array](#mergefields) | 是   | 需要进行「行合并」的字段                                |
| genSort     | Boolean               | 否   | 是否生成「行合并」后的序号                              |
| sortBy      | String                | 否   | 按照该字段的纬度进行排序（默认取 mergeFields 的第一项） |
| mode        | [Number](#mode)       | 是   | 合并模式                                                |
| columns     | [Array](#columns)     | 否   | 列头                                                    |
| reCalc      | Boolean               | 否   | 是否重新计算合并，默认 false                            |

- 方法

| 名称          | 参数 | 描述             |
| ------------- | ---- | ---------------- |
| getMergedData | --   | 获取合并后的数据 |

- 示例

```js
import { CellMerger, Mode } from '@jinming6/merge-helper';

// 属性配置
const options = {
  mode: Mode.Row,
  dataSource: [
    { province: '山东省', name: '张三' },
    { province: '山东省', name: '张三' },
    { province: '江苏省', name: '李四' },
  ],
  mergeFields: [
    {
      field: 'province',
      callback(curItem, nextItem) {
        // 自定义合并条件
        return (
          curItem.name === nextItem.name &&
          curItem.province === nextItem.province
        );
      },
    },
  ],
  genSort: true,
};
const cellMerger = new CellMerger(options);
// 合并后的数据
const mergedData = cellMerger.getMergedData();
```

### mode

- 参数

| 名称       | 类型       | 值    | 描述                    |
| ---------- | ---------- | ----- | ----------------------- |
| Row        | Number     | 0     | 合并行                  |
| Col        | Number     | 1     | 合并列                  |
| ~~RowCol~~ | ~~Number~~ | ~~2~~ | ~~合并行和列 (已弃用)~~ |

- 示例

```js
import { Mode } from '@jinming6/merge-helper';

const mode = Mode.Row;
```

### mergeFields

在进行“列”合并时，必须传入全部列的 prop。

- 参数

| 名称     | 类型     | 必填 | 描述                         |
| -------- | -------- | ---- | ---------------------------- |
| field    | String   | 是   | 字段名称                     |
| callback | Function | 是   | 自定义逻辑进行「行合并计算」 |

- 示例

```js
const mergeFields = ['province'];
/* 
或者使用自定义条件
const mergeFields = [
  {
    field: 'province',
    callback(curItem, nextItem) {
      return curItem.province === nextItem.province;
    },
  },
]; */
```

### columns

定义列数组，一般在“列”合并中使用。

- 参数

| 名称 | 类型   | 必填 | 描述   |
| ---- | ------ | ---- | ------ |
| prop | String | 是   | 列字段 |

- 示例

```js
const columns = [
  {
    prop: 'name',
  },
  {
    prop: 'age',
  },
  {
    prop: 'address',
  },
];
```

### getMergedData

获取合并后的数据

- 语法

`getMergedData(options)`

- 参数

同 [CellMerger](#cellmerger)

- 示例

```js
import { getMergedData, Mode } from '@jinming6/merge-helper';

// 属性配置
const options = {
  mode: Mode.Row,
  dataSource: [
    { province: '山东省', name: '张三' },
    { province: '山东省', name: '张三' },
    { province: '江苏省', name: '李四' },
  ],
  mergeFields: [
    {
      field: 'province',
      callback(curItem, nextItem) {
        // 自定义合并条件
        return (
          curItem.name === nextItem.name &&
          curItem.province === nextItem.province
        );
      },
    },
  ],
  genSort: true,
};
// 合并后的数据
const mergeData = getMergedData(options);
```

### getFieldSpan

获取字段合并配置

- 语法

`getFieldSpan(row, field)`

- 参数

| 名称  | 类型   | 必填 | 描述               |
| ----- | ------ | ---- | ------------------ |
| row   | Object | 是   | 行数据             |
| field | String | 是   | 目标字段的合并数据 |

- 示例

```js
import { getFieldSpan } from '@jinming6/merge-helper';

const spanMethod = ({ row, columnIndex }) => {
  // 将第1列按照省份进行合并
  if (columnIndex === 0) {
    return getFieldSpan(row, 'province');
  }
  // 或者输出 [1, 1]
  return {
    rowspan: 1,
    colspan: 1,
  };
};
```

### splitIntoFragments

将数据拆分为二维数组，一般用于分页打印 PDF。

- 语法

`splitIntoFragments(options)`

- 参数

| 名称     | 类型   | 必填 | 描述     |
| -------- | ------ | ---- | -------- |
| pageSize | Number | 是   | 每段条数 |

::: tip
其他参数同 cellMerge
:::

- 示例

```js
import { splitIntoFragments } from '@jinming6/merge-helper';

const result = splitIntoFragments({
  mode: Mode.Row,
  dataSource: getDataSource(),
  pageSize: 3,
  mergeFields: ['name'],
  genSort: true, // 可生成排序
});

/* Before: 处理前的数据 */
// [
//   {
//     name: '张三',
//   },
//   {
//     name: '李四',
//   },
//   {
//     name: '王五',
//   },
//   {
//     name: '马六',
//   },
// ];

/* After: 处理后的数据 */
// [
//   [
//     {
//       // 1
//       name: '张三',
//     },
//     {
//       // 2
//       name: '李四',
//     },
//     {
//       // 3
//       name: '王五',
//     },
//   ],
//   [
//     {
//       // 4
//       name: '马六',
//     },
//   ],
// ];
```

### getSortNo

获取序号值，在“行”合并时使用。

- 语法

`getSortNo(row)`

- 参数

| 名称 | 类型   | 必填 | 描述   |
| ---- | ------ | ---- | ------ |
| row  | Object | 是   | 行数据 |

- 示例

```js
import { getSortNo } from '@jinming6/merge-helper';
```

```html
<el-table-column label="序号" width="80">
  <template #default="{ row }"> {{ getSortNo(row) }} </template>
</el-table-column>
```

## 结语

如果 [@jinming6/merge-helper](https://github.com/Jinming6/merge-helper) 对您有所帮助的话，可以点个 [Star](https://github.com/Jinming6/merge-helper) 哦。
