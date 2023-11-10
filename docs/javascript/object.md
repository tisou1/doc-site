# 对象创建

## 1. 工厂模式
```js
function createPerson(name) {
    const o = new Object()
    o.name = name
    o.getName = function () {
        return this.name
    }
    return o
}
```
缺点: 对象无法识别,所有实例都指向一个原型

## 2. 构造函数

```js
function Person(name) {
    this.name = name
    this.getName = function() {
        return this.name
    }
}
const obj1 = new Person('siry')
```
优点: 实例可以识别为一个特定的类型
缺点: 每次实例化都会创建属性和方法,不能实现方法的共享

## 2.1 构造函数优化
```js
function Person(name) {
    this.name = name
    this.getName = getName
}

function getName() {
    return this.name
}

const obj1 = new Person('siry')
```
优点: 解决了每个方法都被重新创建的问题
缺点: 无法描述这种封装方式

## 3. 原型模式
```js
function Person(name) {
}

Person.prototype.name = 'siry'
Person.prototype.getName = function() {return this.name}
const p = new Person()
```
优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

## 4. 原型和构造函数结合

构造函数的方式主要问题就是在方法的共享上, 所以我们可以把属性放到构造函数里, 方法放到构造函数的原型上
```js
function Person(name) {
    this.name = name
}

Person.prototype.getName = unction() {
        return this.name
}

// Person.prototype = {
//     constructor: Person,
//     getName: function () {
//         console.log(this.name);
//     }
// };
const obj1 = new Person('siry')
```
优点：该共享的共享，该私有的私有，使用最广泛的方式

缺点：有的人就是希望全部都写在一起，即更好的封装性


## 5 寄生构造模式

我理解就是外层用构造函数,里面用工厂模式那一套

```js
function Person(name) {

    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;

}

var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true
```

