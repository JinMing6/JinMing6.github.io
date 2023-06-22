# 规范指导

## commit 规范

> ### 格式要求

`git commit -m [类型]: [内容]`

类型

| 类型 | 含义 |
| --- | --- |
| feat | 新增功能 |
| docs | 文档更新 |
| fix  | 解决的Bug |
| style | 不影响功能逻辑的修改 |
| build | 修改项目的构建系统功能逻辑 |
| pref | 性能优化 |
| refctor | 对代码进行重构 |
| test | 新增或求改测试用例 |
| ci | 修改项目的集成流程 |
| revert | 版本回退 |
| chore | 依赖管理 |

内容

尽量简要概括。

:::tip 例如：

`git commit -m feat: 新增注册功能`

`git commit -m fix: 重复调用角色列表接口`

`git commit -m perf: 脚手架构建速度`
:::