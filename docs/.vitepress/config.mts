import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vitepress',
  description: 'a vitepress site',
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'Javascript',
        items: [
          { text: '原型与原型链', link: '/javascript/prototype' },
          { text: '执行栈', link: '/javascript/execute-stack' },
          { text: '变量对象', link: '/javascript/variable-object' },
          { text: '作用域链', link: '/javascript/scope-chain' },
          { text: '闭包', link: '/javascript/closure' },
          { text: '参数按值传递', link: '/javascript/parameter-passing-by-value'},
          { text: 'call&apply&bind', link: '/javascript/call-and-apply'},
          { text: 'new', link: '/javascript/new'},
          { text: 'arguments', link: '/javascript/arguments'},
          { text: '对象创建方式', link: '/javascript/object'},
          { text: '对象继承方式', link: '/javascript/extends'}
        ],
      },
      {
        text: 'React',
        items: [
          { text: 'React知识点', link: '/react-known' },
          { text: 'React-code', link: '/react/react-code' },
          { text: 'React-use', link: '/react/react-use' },
          { text: 'React-doc', link: '/react/react-doc' },
        ],
      },
      {
        text: 'solid',
        link: '/solid/solid-doc',
      },
      {
        text: 'vue',
        link: '/vue/vue-reactivity',
      },
      {
        text: 'pnpm',
        link: '/pnpm/',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
