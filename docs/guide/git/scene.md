# 实战场景

## 新人入职

1. 先将代码取到本地 `git clone 仓库地址`
2. 拉取完毕后，切换到开发分支 `git switch 分支名称`
3. 开发完毕后 `git add 你要提交的文件`
:::tip
如果git忽略文件配置好了，可以直接提交全部 `git add .` 
:::
4. 添加commit信息 `git commit 类型: xxx开发完毕`
:::tip
具体commit格式，请查看 [规范指导](/guide/git/standard)。
:::
5. 拉取一下远程仓库，`git pull`
:::tip
如果无法拉取，则执行git pull origin 本地分支对应的远程分支。

例如: 

本地分支是dev，对应的远程分支也是dev，那么就执行 `git pull origin dev`
:::

6. 如果代码有冲突，则和对应的开发者沟通解决。

:::tip
避免不小心给别人的代码删了
:::

7. 最后一步，提交到远程仓库 `git push 分支名称`
:::tip
如果无效，则执行 `git push -u origin 分支名称`
:::

## 功能开发到一半，领导安排你去开发别的功能
把修改的代码贮存起来，`git stash save -u 名称`
:::tip
`git stash` 只是把代码暂时存放起来，不会提交到远程仓库。

执行这个命令之后，你的项目代码会恢复到你修改之前的版本。
:::

回过头来，继续之前的功能开发 `git stash pop 名称`
:::tip
之前开发到一半的代码将会合并回来。
:::
