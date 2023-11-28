# css问题记录


## 1. fixed布局的header不能正常水平滚动

Header组件用position: fixed;进行布局的话, 会导致如果整个窗体的宽度不够时, header就会有部分内容被覆盖, 给整个root设置了最小宽度,视屏滚动时发现header并不会随着滚动,
主要原因就是fixed布局的问题, 将fixed替换为stickly就可以进行正常滚动.


## 2. flex布局中的img宽高比异常

只要是出现在ios系统下的safari浏览器中, 

```html
<div class="container">
    <img src="xx"/>
    <img src="xx"/>
</div>

<style>

    .container{
        display: flex;
    }
    img{
        width: 50%;
        object-fit: cover;
    }
</style>
```
正常来说img设置了宽度,应该以这个宽度来进行一定比例的缩放(这里设置了object-fix)  
可是在却出现了宽度还是50%, 但是高度却不按照原始的比例进行缩放了, 而是变成了原始图片高度的50%.

猜测: 应该是flex布局影响到了object-fix属性
解决: 给容器设置`align-items: center` 
理解: 没搞太清除

> align-items 在 Flex 布局中有一个默认值。默认值为 stretch，即元素会在交叉轴上被拉伸以填充整个交叉轴空间。