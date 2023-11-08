# new关键字

## new的执行流程

```js
// Otaku 御宅族，简称宅
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am Kevin
```
根据上面的代码,分析`new`的流程

- new会根据构造函数创建一个新的对象
- 这个对象可以访问原型上的属性和方法
- 如果构造函数返回的是对象,则返回对象,如果没有返回值或者是基础类型,返回新创建的对象


```js

function myNew(construct, ...options) {
    // 以构造函数的原型来创建新对象
    const obj = Objece.create(construct.prototype)
    // 执行构造函数,通过apply来改变this的指向
    const ans = construct.apply(obj, options)

    // 如果返回值是对象就返回,不然就返回obj

    return typeof ans === 'object' ? ans : obj
}
```


```js
// 使用argumnet实现
function objectFactory() {
    const obj = Object.create()
    // 取出构造函数, 位于第一个参数上
    Constructor = [].shift.call(argumnets)
    // 设置对象的原型为构造函数的原型
    obj.__proto__ = Constructor.prototype
    // 绑定this
    const ans = Constructor.apply(obj, argumnets)

    return typeof ans === 'object' ? ans : obj
}
```
