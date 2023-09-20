---
title: React text页面

---


::: info
This is an info box.
:::


```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}

```


```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code --]
      msg: 'add' // [!code ++]
    }
  }
}

```