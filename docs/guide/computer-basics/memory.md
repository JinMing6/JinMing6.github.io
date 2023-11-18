# 内存

内存又称内部存储器，它是计算机存储器的子类。<br/>
内存是 CPU 能直接寻址的存储空间，它是由半导体器件制成。<br/>
像操作系统、办公软件、游戏等都是安装在硬盘等外部记忆体上，玩游戏、写笔记等都是在内存中进行的，数据产生后由内存向外部记忆体进行读写。<br/>
例如：存放书籍的书柜就是外部记忆体，书桌就是内存。外部记忆体中是长期存储的数据，内存中是一些临时的数据。

## 内存泄漏

内存泄漏是指，在程序中对某一块内存空间失去了控制权，无法释放那段无用的内存空间，导致计算机内存资源空耗。

```js
function foo() {
	key = new Array(1e6).fill(''); // 这里会开辟一段内存空间。
	// 函数调用完毕后，未及时释放上一行开辟的内存空间，这里就导致了内存泄漏。
}
```

### 示例<br/>

点击 Button 后，会产生约 4MB 的内存空间占用，如果不手动点击 Clear，则会造成内存泄漏。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<button id="btn">Button</button>
		<button id="clear-btn">Clear</button>
		<script>
			function foo() {
				key = new Array(1e6).fill('');
			}

			const btn = document.querySelector('#btn');
			btn.addEventListener('click', foo);

			const clearBtn = document.querySelector('#clear-btn');
			clearBtn.addEventListener('click', () => {
				key = null;
			});
		</script>
	</body>
</html>
```

**内存快照**
![内存快照](/images/memory-leak.png)

## 内存溢出

产生的内存占用大小，超过了预先分配的内存大小，所以就导致了内存溢出。<br/>
例如：无限递归。

```js
function foo() {
	foo(); // 函数递归调用自己，产生大量内存占用。
}
```

### 示例

点击 Button 后则会触发 foo 函数无限递归，造成内存溢出。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<button id="btn">Button</button>
		<script>
			function foo() {
				foo();
			}

			const btn = document.querySelector('#btn');
			btn.addEventListener('click', foo);
		</script>
	</body>
</html>
```

**打印结果**
![](/images/memory-overflow.png)
