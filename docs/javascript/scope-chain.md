# 作用域链

## 定义  

当查找变量时,会先从当前上下文的变量对象中查找,如果没有找到,就会从父级(此法层面上的父级)执行上下文的变量中查找,一直找到全局上下文的变量,也就是全局变量,这样由多个执行上下文的变量构成的链表就叫做作用域链.



## 函数创建

函数的作用域在创建的时候就决定了.

这是因为函数有一个内部属性[[scope]],当函数创建的时候,就会保存所有父变量对象到其中,可以理解为[[scope]]就是所有父变量对象的层级链.但是注意：[[scope]] 并不代表完整的作用域链！


```js
function foo(){
  function bar() {}
}
```

```
foo.[[scope]] = [
  globalContext.VO
]

bar.[[scope]] = [
   fooContext.VO,
   globalContext.VO
]
```

## 函数激活

当函数激活时,就让函数上下文,创建VO/AO后,就会将活动对象添加到作用域的前端. 这时候执行上下文的作用域链,我们命名为Scope
```js
Scope = [AO].concat([[Scope]])
```

## 牛刀小试

以下面例子,结合变量对象和执行上下文栈
```js
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```

执行过程如下:  
1. checkscope函数被创建,保存作用域链到内部属性[[scopee]]
```js
checkscope.[[scope]] = [
  globalContext.VO
]
```

2. 执行`chekcscope`函数,创建函数执行上下文,`checkscope`函数执行上下文被压入执行上下文栈

```js
ECStack = [
  checkscopeContext,
  globalContext
]
```

3. `chekcscope`函数并不立即执行,开始准备工作,第一步: 复制函数[[scope]]属性创建作用域链

```js
checkscopeContext = {
  Scope: checkscope.[[scope]]
}
```

4. 第二部: 用`arguments`参数创建活动对象,随后初始化活动对象,加入形参,函数声明明,变量声明

```js
checkscopeContext = {
  AO: {
    argiments: {
      length: 0
    },
    scope2: undefined
  },
  Scope: checkoutscope.[[scope]]
}
```

5. 第三部: 将活动对象压入`checkscope`作用域链顶端

```js
  checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}
```

6. 准备工作完成, 开始执行函数,修改AO的属性值

```js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
```

7. 查找到`scope2`的值,返回后函数执行完毕,函数上下文从执行上下文栈中弹出

```js
ECStack = [
  globalContext
]
```