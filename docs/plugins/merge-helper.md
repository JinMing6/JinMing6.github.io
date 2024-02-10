<script lang="ts" setup>
    import MergeRow from '../components/MergeRow.vue'
</script>

# merge-helper

轻松处理单元格的合并

![截屏2024-01-07 23.44.15.png](https://s2.loli.net/2024/01/07/rqlRbZgUt6TD3xk.png)

## 🎨 特性

- [x] 合并`行`、`列`
- [x] 生成`合并`后的序号
- [x] 数据`分段`、`合并`

## ⚙️ 安装

提示： 使用前，请安装 [lodash](https://lodash.com)

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

## 🏄 快速上手

### 合并 " 行 "

1. 获取表格数据后，进行合并计算

```js
import { getMergedData, Mode, SORT_NO_KEY } from '@jinming6/merge-helper';

async function getTableData() {
  const dataSource = [
    /* 获取到的表格数据... */
  ];
  const mergeFields = [
    {
      field: 'province',
      callback(curItem, nextItem) {
        // 这里是自定义逻辑
        return (
          curItem.name === nextItem.name &&
          curItem.province === nextItem.province
        );
      },
    },
  ];
  const options = {
    mode: Mode.Row,
    dataSource,
    mergeFields,
    genSort: true, // 生成合并后的序号
  };
  // 这里是计算完毕后的数据
  const mergedData = getMergedData(options);
}
```

2. 表格的合并函数处理

```js
import { getFieldSpan } from '@jinming6/merge-helper';

function spanMethod({ row, column }) {
  // 这里会输出 { rowspan: n, colspan: n }，n就是经过计算后，得到的值。
  return getFieldSpan(row, column.property);
}
```

## 📄 API

- [CellMerger](#cellmerger-属性)
- [getMergedData](#getmergeddata)
- [getFieldSpan](#getfieldspan)

### CellMerger 属性

| 名称        | 类型                       | 必填 | 描述                                                      |
| ----------- | -------------------------- | ---- | --------------------------------------------------------- |
| dataSource  | Array                      | 是   | 数据源                                                    |
| mergeFields | [Array](#mergefields-属性) | 是   | 需要进行「行合并」的字段                                  |
| genSort     | Boolean                    | 否   | 是否生成「行合并」后的序号                                |
| sortBy      | String                     | 否   | 按照该字段的纬度进行排序。（默认取 mergeFields 的第一项） |
| mode        | [Number](#mode-属性)       | 是   | 合并模式                                                  |
| columns     | [Array](#columns-属性)     | 否   | 列头                                                      |

### CellMerger 方法

| 名称          | 参数 | 描述             |
| ------------- | ---- | ---------------- |
| getMergedData | --   | 获取合并后的数据 |

### mode 属性

| 名称   | 值  | 描述       |
| ------ | --- | ---------- |
| Row    | 0   | 合并行     |
| Col    | 1   | 合并列     |
| RowCol | 2   | 合并行和列 |

### mergeFields 属性

| 名称     | 类型     | 必填 | 描述                         |
| -------- | -------- | ---- | ---------------------------- |
| field    | String   | 是   | 字段名称                     |
| callback | Function | 是   | 自定义逻辑进行「行合并计算」 |

### columns 属性

| 名称 | 类型   | 必填 | 描述   |
| ---- | ------ | ---- | ------ |
| prop | String | 是   | 列字段 |

### getMergedData 属性

同 [CellMerger 属性](#cellmerger-属性)

### 辅助函数

#### getMergedData

获取合并后的数据

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

#### getFieldSpan

获取字段合并配置

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
