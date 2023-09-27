# 闭包

## 定义
mdn: 闭包是指那些能够访问自由变量的函数。  

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。  

> 闭包 = 函数 + 函数能够访问的自由变量

从实践的角度来说,以下函数才算是闭包
- 即使创建函数的上下文已经销毁,它仍然可以存在(比如函数从父函数返回)
- 在函数内部引用了自由变量



## 分析

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();
```

1. 进入全局代码, 创建全局执行上下文, 全局执行上下文压入执行上下文栈
2. 全局执行上下文初始化
3. 执行checkscope函数,创建checkscope函数执行上下文,checkscope函数执行上下文压入执行上下文栈
4. checkscope函数初始化,创建变量对象,作用域链,this等
5. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
6. 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
7. f 执行上下文初始化，创建变量对象、作用域链、this等
8. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出


从第6步开始.
```
fContext = {
    Scope: [AO, checkscopeContext.AO, globakContext.VO]
}
```
就是因为这个作用域链，f 函数依然可以读取到 checkscopeContext.AO 的值，说明当 f 函数引用了 checkscopeContext.AO 中的值的时候，即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

## 刷题

```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
```

输出3 3 3

这里分析一下

在执行data[0]()之前,全局执行上下文是
```js
globalContext = {
  VO: {
        data: [...],
        i: 3
    }
}
```

当执行data[0]()时, data[0]()的作用域链为
```
data[0]context = {
    scope: [AO, globalContext.VO] 
}
```

data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。

```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();

```

// 打印 0 1 2

当data[0]()执行前,还是和上面一样,但是在执行data[0]()时,data[0]的作用域链为
```
data[0]context = {
    scope: [AO,匿名函数Context.AO, globalContext.VO] 
}

// 其中匿名函数的执行上下文为

匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
```

data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。