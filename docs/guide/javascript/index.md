# 判断数据类型

JavaScript 数据类型分为基本数据类型和引用数据类型，及一些特殊的值(`NaN`，`Infinity`)。

> 基本数据类型 `String`，`Number`，`Boolean`，`BigInt`，`Null`，`Undefined`，`Symbol`

对于基本数据类型，我们使用 `typeof` 来判断就可以。

例如：

```js
const str = "Hello, world!";
console.log(typeof str); // output: string

const num = 123;
console.log(typeof num); // output: number

const bool = true;
console.log(typeof bool); // output: boolean
```

> 引用数据类型 `Object`，`Array`，`Function`，`RegExp`，`Date`

对于引用数据类型，如果我们使用 `typeof` 来判断，则无法区分数组和对象，因为返回结果都是 `object`。

例如：

```js
const arr = [1, 2, 3];
console.log(typeof arr); // output: object

const student = {
  name: "小明",
  age: 18,
};
console.log(typeof student); // output: object
```

这时，我们可以采用 `Object.prototype.toString` 方法来判断。

```js
const arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr)); // output: [object Array]

const student = {
  name: "小明",
  age: 18,
};
console.log(Object.prototype.toString.call(student)); // output: [object Object]
```

:::tip
`Object.prototype.toString` 不仅可以判断引用类型，它还可以判断基本类型哦。

对于数组，还可以使用 `Array.isArray` 来进行类型判断。
:::

> 特殊的值 `NaN`，`Infinity`

```js
console.log(typeof NaN); // output: number
console.log(isNaN(NaN)); // output: true

console.log(isFinite(Infinity)); // output false
```
