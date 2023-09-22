# 执行上下文栈

## 顺序执行?

```js
var foo = function () {
    console.log('foo1')
}

foo() // foo1

var foo = function () {
    console.log('foo2')
}

foo() // foo2

```

```js
function foo() {
     console.log('foo1')
}

foo() // foo2

function foo() {
    console.log('foo2');
}

foo(); // foo2

```

javascript执行代码并不是一行一行的执行,而是一段一段的分析执行


## 可执行代码
 JavaScript 的可执行代码(executable code)的类型有三种: `全局代码` `函数代码` `eval代码`  
 
 当执行到一个函数时,就会进入一个准备阶段,这个`准备工作`,就是`执行上下文栈(executinn context)`

 ## 执行上下文栈

 为了模拟执行上下文栈,我们用一个数组
 ```
 ECStack = []
 ```

当javascript要开始执行代码时,最先遇到的就是全局代码,所以会压入一个全局上下文`globalContext`,并且只有当应用执行完成才会弹出这个上下文

```js
function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();
```
模拟执行上面代码
```
// 伪代码
ECStack.push(globalContext)

// fun1
ECStack.push(<fun1> functionCOntext)

// fun1调用了fun2
ECStack.push(<fun2> functionContext)

// fun2调用了fun3
ECStack.push(<fun3> functionContext)

// 弹出fun3执行上下文
ECStack.pop()

// 弹出fun2执行上下文
ECStack.pop()

// 弹出fun1执行上下文
ECStack.pop()

// 弹出全局上下文
ECStack.pop()

```