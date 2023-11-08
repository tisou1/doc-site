# arguments

`arguments(类数组对象)`: 拥有一个 length 属性和若干索引属性的对象

例如:
```js
var array = ['name', 'age', 'sex'];

var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
```

## 读写上
```js
console.log(array[0]); // name
console.log(arrayLike[0]); // name

array[0] = 'new name';
arrayLike[0] = 'new name';
```

## 长度

```js
console.log(array.length); // 3
console.log(arrayLike.length); // 3
```

## 遍历

```js
for(let i=0;i<array.length;i++){...}
for(let i=0;i<arrayLike.length;i++){...};
```
但是类数组对象不能直接使用数组的方法
`arrayLike.push('4');`这个会报错的

## 如果调用数组的方法

既然无法直接调用,那么我们可以通过`Function.call`调用

```js
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }

Array.prototype.join.call(arrayLike, '&'); // name&age&sex
// 或者
// [].join.call(arrayLike, '&')

Array.prototype.slice.call(arrayLike, 0); // ["name", "age", "sex"] 
// slice可以做到类数组转数组

Array.prototype.map.call(arrayLike, function(item){
    return item.toUpperCase();
}); 
// ["NAME", "AGE", "SEX"]
```

## 类数组转数组

```js
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
const arr1 = [].slice().call(arrayLike)
// 2.splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike)

```


## Arguments对象

arguments参数只定义在函数体中

### length属性

Arguments对象的length属性，表示实参的长度，举个例子：

```js
    function foo(a, b, c){
        console.log(arguments.length)
    }

    foo(1, 2, 3, 4) // 4  实参个数
    console.log(foo.length)// 3 形参个数
```

## es6的展开运算符(...)替换

```js
function func(...rest) {
    console.log(rest); // [1, 2, 3]
}

func(1, 2, 3);
```