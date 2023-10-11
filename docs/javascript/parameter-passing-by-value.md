# 参数按值传递

## 按值传递

```js
let value = 1
function foo(v) {
    v = 2
    console.log(v) // 2
}

foo(value)

console.log(value) // 1

```
当`value`传递到`foo`函数时,相当于拷贝了一份value,所以在函数内修改`v`的值不会影响`value`的值

## 引用传递

```js
let obj = {
    name: 'siry',
    age: 18
}

function foo(o) {
    o.age = 20
    console.log(0) // {name: 'siry', age: 20}
}

foo(obj)

console.log(obj)// {name: 'siry', age: 20}
```

所谓的引用传递,就是传递对象的引用,函数内部对参数的任何改变都会影响到该对象的值,因为两者引用了同一个对象

## 第三种传递方式(共享传递)

```js
var obj = {
    value: 1
};
function foo(o) {
    o = 2;  // 直接修改o, 相当于重新给o一个新的引用了
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1

```

而共享传递是指，在传递对象的时候，传递对象的引用的副本。

> **按引用传递是传递对象的引用，而按共享传递是传递对象的引用的副本！**

所以修改 o.value，可以通过引用找到原值，但是直接修改 o，并不会修改原值。所以第二个和第三个例子其实都是按共享传递。

