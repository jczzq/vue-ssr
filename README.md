### 什么是SSR
    1.SSR（server-side render），服务端渲染。

### 快速启动

1. git clone
2. yarn
3. copy & rename `.env.example.js` => `.env.js`
4. npm run dev
5. open localhost:3000

### 文件结构

``` shell
├── build（webpack 打包文件）
├── src （所有的资源都在 src 目录下）
│   ├── api （api文件夹）
│   ├── assets（图片，global-css，不在 npm 上发布的 vendor-js）
│   ├── components（组件）
│   │   ├── base（全局组件）
│   │   ├── layouts（布局组件）
│   │   ├── ...
│   ├── entry（入口）
│   │   ├── entry-client.js（浏览器端的 entry.js，一般需要挂载在 window 上的就在这里面写）
│   │   └── entry-server.js（服务器端的 entry.js，一般不需要修改）
│   ├── layouts（页面模板组件）
│   │   ├── default.vue
│   │   ├── empty.vue
│   │   └── error.vue
│   ├── router（vue-router & vue-meta）
│   ├── store（vuex）
│   ├── templates（html渲染模板）
│   │   ├── 200.template.html（200时的模板）
│   │   └── 'error'.template.html（废弃，已在 server.js 重定向）
│   ├── utils （需要绑定在 vue.prototype 上的方法）
│   │   ├── client.js （只需要在浏览器端调用的方法）
│   │   └── index.js （浏览器端和服务端都会调用的方法）
│   └── views（页面组件文件夹，对应页面见 router/index.js）
│       ├── about
│       ├── bangumi
│       ├── post
│       ├── role
│       ├── user
│       ├── video
│       └── index.vue（首页）
│   ├── app.js （init & export vue instance，不需要改动）
│   ├── app.vue（vue instance entry，动态全局初始化<head>, etc...）
├── static（静态资源文件）
```
### 代码风格
如果你使用Visual Studio Code作为编辑器，那么你可以安装一些扩展来检查和纠正代码风格

必装扩展：
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

建议安装：
- [Beautify css/sass/scss/less](https://marketplace.visualstudio.com/items?itemName=michelemelluso.code-beautifier)
- [vscode-element-helper](https://marketplace.visualstudio.com/items?itemName=ElemeFE.vscode-element-helper)