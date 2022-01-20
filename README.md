# @aidol/utils

`vue` 实用指令集合。

<a href="https://github.com/yisibell/aidol-utils/tree/1.x">1.x 文档</a>。

# WARNING

- `ws` 模块已移至 <a href="https://github.com/yisibell/myws" target="_blank">myws</a>
- `watermark` 模块已移至 <a href="https://github.com/yisibell/mymark" target="_blank">mymark</a>
- `paging` 模块已移至 <a href="https://github.com/yisibell/pagein" target="_blank">pagein</a>

# Installation

```bash
# yarn
$ yarn add @aidol/utils
# npm
$ npm i @aidol/utils
```

# Build

构建文件在 `dist` 文件夹下分为两个版本。

`dist/aidol-utils.es.js` 为 `es Modules` 版本。

`dist/aidol-utils.umd.js` 为 `umd` 版本，适合使用 `<script></script>` 标签的方式引用。

# Features

1.  **vueDirectives** 指令集，其中包含了一些实用指令，例：`v-drag`, `v-affix`, `v-autoheight` 等。

# Usage

## vueDirectives

该模块包含了一些 `vue directive`。

安装指令的方式：

1. 全局安装

```js
// main.js

import Vue from 'vue'
import { vueDirectives } from '@aidol/utils'

// 安装全部指令
for (const k in vueDirectives) {
  if (vueDirectives.hasOwnProperty(k)) {
    Vue.directive(k, vueDirectives[k])
  }
}

// or 仅安装某个指令
Vue.directive('drag', vueDirectives.drag)

// ...
// new Vue({
//   el: 'app'
// })
```

2. 局部安装

```js
import { vueDirectives } from '@aidol/utils'

export default {
  name: 'SomeComp',
  directives: {
    drag: vueDirectives.drag,
    affix: vueDirectives.affix,
    autoheight: vueDirectives.autoheight,
    // ...
  },
}
```

### v-drag

拖拽指令。当给某 **dom** 元素加上 `v-drag` 指令后，该元素会变成可拖拽状态。

#### 使用方式

```html
<template>
  <div class="some class" v-drag="draggable">this is a box.</div>
</template>
```

```js
export default {
  data() {
    return {
      draggable: true,
    }
  },
}
```

#### 参数

|    参数     |  类型   | 默认值 |       描述       |
| :---------: | :-----: | :----: | :--------------: |
| `draggable` | boolean | `true` | 控制是否可拖拽。 |

### v-affix

吸顶指令。可使用该指令实现元素吸顶效果。

#### 使用方式

```html
<template>
  <div class="some-container">
    <div class="some-class" v-affix>this is a affix element.</div>
    <div class="next-element"></div>
  </div>
</template>
```

#### 参数

暂无。

### v-autoheight

自动设置高度。有时，我们希望当前页面不出现滚动条，或者某个包裹元素不会产生滚动条。那么，你可能会需要该指令，使得应用该指令的元素可以正好占满剩余视窗高度，从而不出现纵向滚动条。

#### 使用方式

```html
<template>
  <div class="some-container">
    <div class="some-class">this is a top element.</div>
    <div class="next-element" v-autoheight="bottomGap"></div>
  </div>
</template>
```

```js
export default {
  data() {
    return {
      bottomGap: 20,
    }
  },
}
```

#### 参数

|    参数     |  类型  | 默认值 |          描述          |
| :---------: | :----: | :----: | :--------------------: |
| `bottomGap` | number |  `20`  | 预设距离底部的高度值。 |