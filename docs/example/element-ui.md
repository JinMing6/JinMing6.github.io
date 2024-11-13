---
outline: deep
---

# Element UI 业务组件

一些拓展功能的实现

## el-table

### shift 多选

- 效果展示

![Kapture 2023-11-25 at 21.16.05.gif](https://s2.loli.net/2023/11/25/Fcmnwhd3gLqX1jS.gif)

- 代码实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.14/theme-chalk/index.min.css"
      integrity="sha512-cTraKrkPq3y0mm73JlMTDOugmX/NwJ/WCitAFxMdS/l+P/qMIUzGkbg3oCx9e8suEU2rurxP+5aIidz0ZjKdpw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <style>
      #app {
        user-select: none;
      }

      .selected-row {
        background-color: rgba(64, 158, 255, 0.2) !important;
      }

      .cust-row {
        cursor: pointer;
      }

      .cust-row > td {
        background-color: initial !important;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <el-table
        class="table"
        ref="tableRef"
        :data="tableData"
        border
        @row-click="rowClick"
        :row-class-name="rowClassName"
      >
        <el-table-column
          label="序号"
          prop="index"
          width="100"
        ></el-table-column>
        <el-table-column label="姓名" prop="name" width="100"></el-table-column>
        <el-table-column
          label="地址"
          prop="address"
          width="200"
        ></el-table-column>
      </el-table>
    </div>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.15/vue.min.js"
      integrity="sha512-2hINX01gn7TwWmZNKvrt+ZiHjOW2l7+gCaghPVL6Ge4kTTA7S35Q3zqJmCpKWMLvV5ih4fawBiNW+0WhIbEELg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.15.14/index.min.js"
      integrity="sha512-UFrGse168I/Fki88TZky6wKSHCJykXJBpzmqwBzbIHzsadjMPpch2HULCuAQLewK19bXUf8PqkEjGSWPiUJ3qQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script>
      const vm = new Vue({
        el: '#app',
        data() {
          return {
            tableData: new Array(10).fill(0).map((_, index) => {
              return {
                select: false,
                id: index,
                index,
                name: `张三`,
                address: `山东省青岛市${index}区${index}街道${index}号`,
              };
            }),
            selectedRows: [],
            lastClickedRow: null,
          };
        },
        methods: {
          rowClick(row, column, event) {
            this.$nextTick(() => {
              if (event.shiftKey && this.lastClickedRow) {
                const startIndex = this.tableData.indexOf(this.lastClickedRow);
                const endIndex = this.tableData.indexOf(row);
                const [minIndex, maxIndex] = [startIndex, endIndex].sort();
                this.selectedRows = this.tableData.slice(
                  minIndex,
                  maxIndex + 1
                );
                let firstSelectStatus = this.selectedRows[0].select;
                if (startIndex > endIndex) {
                  firstSelectStatus =
                    this.selectedRows[this.selectedRows.length - 1].select;
                }
                this.selectedRows.forEach((row) => {
                  row.select = firstSelectStatus;
                });
              } else {
                row.select = !row.select;
                this.selectedRows = [row];
              }
              this.lastClickedRow = row;
            });
          },
          rowClassName({ row }) {
            return {
              'selected-row': row.select,
              'cust-row': true,
            };
          },
        },
      });
    </script>
  </body>
</html>
```

### 单元格合并

建议使用 [@jinming6/merge-helper](../plugins/merge-helper.md)

<!-- TODO 待编写 -->
<!-- ## el-select -->
<!-- ### 高级下拉 -->
