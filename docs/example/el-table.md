# Element UI 表格

一些拓展功能的实现

## shift 多选

> 效果

![Kapture 2023-11-25 at 21.16.05.gif](https://s2.loli.net/2023/11/25/Fcmnwhd3gLqX1jS.gif)

> 代码

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

## 单元格合并

> 效果

![table-merge.png](https://s2.loli.net/2023/12/17/S2QajWzNtOKxUgk.png)

> 代码

index.html

```html
<div id="app">
	<el-table
		border
		:data="tableData"
		style="width: 100%"
		:span-method="arraySpanMethod"
	>
		<el-table-column prop="date" label="日期" width="180"> </el-table-column>
		<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
		<el-table-column prop="address" label="地址"> </el-table-column>
	</el-table>
</div>
```

main.js

```js
const vm = new Vue({
	el: '#app',
	data() {
		return {
			tableData: [],
		};
	},
	mounted() {
		const data = [
			{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄',
			},
			{
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄',
			},
			{
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄',
			},
			{
				date: '2016-05-03',
				name: '王小猫',
				address: '上海市普陀区金沙江路 1516 弄',
			},
			{
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄',
			},
			{
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄',
			},
		];
		const fmtTableData = mergeHelper(data, ['date', 'name']);
		this.tableData = fmtTableData;
	},
	methods: {
		arraySpanMethod({ row, column, rowIndex, columnIndex }) {
			const { mergeOpts } = row;
			if (columnIndex === 0) {
				return {
					rowspan: mergeOpts.date.rowspan,
					colspan: mergeOpts.date.colspan,
				};
			}
			if (columnIndex === 1) {
				return {
					rowspan: mergeOpts.name.rowspan,
					colspan: mergeOpts.name.colspan,
				};
			}
			return [1, 1];
		},
	},
});
/**
 * 深拷贝 (建议使用lodash代替)
 */
function cloneDeep(value) {
	return JSON.parse(JSON.stringify(value));
}
/**
 * 判断是否为有效数字 (建议使用lodash代替)
 */
function isNumber(value) {
	return typeof value === 'number' && !Number.isNaN(value);
}
/**
 * 初始化合并配置，然后根据字段来计算合并
 */
function mergeHelper(dataSource, fields = []) {
	let copyData = cloneDeep(dataSource);
	// 如果没有需要合并的字段，直接返回
	if (fields.length < 1) {
		return copyData;
	}
	// 初始化合并配置
	const mergeOpts = fields.reduce((pre, cur) => {
		pre[cur] = {
			rowspan: 1,
			colspan: 1,
		};
		return pre;
	}, {});
	copyData.forEach((item) => {
		item.mergeOpts = cloneDeep(mergeOpts);
	});
	// 从第一个字段开始合并
	fields.forEach((field) => {
		copyData = findAndMergeField(copyData, field);
	});
	return copyData;
}
/**
 * 根据字段来计算合并
 */
function findAndMergeField(dataSource, field) {
	const copyData = cloneDeep(dataSource);
	const len = copyData.length;
	for (let i = 0; i < len; i++) {
		// 遍历数据源
		const item = copyData[i];
		if (item.mergeOpts[field].rowspan === 0) continue; // 如果rowspan为0，说明已经被合并过了，跳过
		for (let j = i + 1; j < len; j++) {
			// 从当前数据源的下一个开始遍历
			const otherItem = copyData[j];
			if (item[field] === otherItem[field]) {
				// 如果相等，说明可以合并
				item.mergeOpts[field].rowspan = isNumber(item.mergeOpts[field].rowspan)
					? (item.mergeOpts[field].rowspan += 1)
					: 1;
				otherItem.mergeOpts[field].rowspan = 0;
			} else {
				break; // 如果不相等，说明已经不需要再往下找了，直接跳出循环
			}
		}
	}
	return copyData;
}
```
