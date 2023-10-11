# call和apply的模拟实现

## call

> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```

注意:
    1. call改变了this的指向,指向到了foo这个对象
    2. bar函数执行了

### 模拟实现

试想当调用call时,把foo对象改造成如下:

```js
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value);
    }
};
```

也就是说将bar函数赋值到了foo的`bar`属性上,这时候this就是指向foo对象的了  
在调用完bar方法之后,在从foo对象上删除bar方法.

**模拟的步骤**
- 将函数设置为对象方法
- 执行该方法
- 从对象上删除该方法

#### 第一版的尝试

```js
Function.prototype.call2 = function(context) {
    context.fn = this
    context.fn()
    delete context.fn
}
```

#### 第二版尝试

这一版要支持传入参数
```js
Function.prototype.call2 = function(context, ...args) {
    context.fn = this
    context.fn(...args)
    delete context.fn
}

```


#### 第三版尝试

这一版本,`context`可能为null这时候需要将this默认指向windows,而且函数可能是有返回值

```js
Function.prototype.call2 = function(context, ...args) {
    context = context ?? window
    context.fn = this
    const ans = context.fn(...args)
    delete context.fn

    return ans
}


```

## apply

apply的实现可以借鉴call的, 或者直接调用call,只是需要改变一下参数传递方式
```js

Function.prototype.apply2 = function(context, args) {
    context = context ?? window
    context.fn = this
    const ans = context.fn(...args)
    delete context.fn

    return ans
}
```
// 或者世界调用call2
```js
Function.prototype.apply2 = function(context, args) {
    return this.call2(context, ...args)
}

```


## bind

bind和call与apply相比,并不立即执行函数,而是会返回一个新的函数,等待调用

```js
Function.prototype.bind2 = function(context, ...args) {
    return (...args2) => {
        return this.apply2(context, [...args, ...args2])
    }
}

```