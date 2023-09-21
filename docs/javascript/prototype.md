

# 原型原型链

## 构造函数创建实例
```js
function Person() {}

const person = new Person()
person.name = 'name'
console.log(person.name) // name

```
上面`Person`就是构造函数,`person`为创建的实例

## prototype

通过构造函数的`prototype`就可访问实例原型`Person.prototype`

## constructor

通过实例原型的`constructor`属性就可访问构造函数  

`Person === Person.prototype.constructor // true`

> 因为有原型链的使用,所以当使用`person.constructor === Person.prototype.constructor === Person`

## `__proto__`

一般浏览器都实现了__proto__属性,用于实例对象访问原型`person.__proto__ === Person.prototype`  
其实用`Object.getPrototypeOf(person)`也可以获取实例的原型

## 原型链

从上面的各种指向中,我们可以得出一个原型图
![原型图](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/4/6/dce869109f6474978d24bc1e7da7464a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

其中实例原型的原型也是一个对象,这个关系一直会找到顶层null结束  
图中蓝色的线就是原型链了(实例的原型一直到顶层null)

