# @aidol/utils

`vue` 实用指令集合。

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

1. **paging** 分页工具函数。
2. **deepClone** 引用类型深拷贝。
3. **calc** 避免 `javascript` 小数计算精度丢失工具类。
4. **getType** 数据类型获取函数。
5. **dom** 实用 `Dom` 操作工具类。
6. **cartesianOf** 笛卡尔积生成函数。
7. **cartesianToTable** 笛卡尔积转换为 `Array of Object`。
8. **copyToClibboard** 复制文本至系统剪切板。
9. **isEqualObject** 对象判等（以键-值为维度），不支持深度校验，为了更好的体验，建议使用 **lodash** 的 `_.isEqual()` 方法。
10. **get** 根据 `object` 对象的 `path` 路径获取值, 功能等同于 **lodash** 的 `_.get()` 方法。
11. **watermark** 水印生成工具。
12. **vueDirectives** 指令集，其中包含了一些实用指令，例：`v-drag`, `v-affix`, `v-autoheight` 等。

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
    drag: vueDirectives,
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

## watermark

水印生成工具。

### 使用方式

```js
// 导入
import { watermark } from '@aidol/utils'
// 调用, options 参数具体见下表
watermark(options)
```

#### 以 `<script>` 标签的方式引用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>watermark demo</title>
    <style>
      #app {
        height: 95vh;
      }
    </style>
  </head>
  <body>
    <div id="app">hello watermark!</div>
    <script src="./aidol-utils.umd.js"></script>

    <script>
      // AidolUtils 被暴露到 window
      const { watermark } = AidolUtils

      watermark({ content: 'build by elenh' })
    </script>
  </body>
</html>
```

#### 在有模块系统的项目中使用

```js
import { watermark } from '@aidol/utils'
watermark({ content: 'build by elenh' })
```

### options 参数

|     键名     |             类型              |                                   说明                                    |           默认值           |
| :----------: | :---------------------------: | :-----------------------------------------------------------------------: | :------------------------: |
|  container   |    `Selector` 或 `Element`    |                              水印插入的容器                               |        `body` 元素         |
|    width     |           `string`            |                          生成水印 canvas 的 宽度                          |          '400px'           |
|    height    |           `string`            |                          生成水印 canvas 的 高度                          |          '300px'           |
|  textAlign   |           `string`            |                       水印文字在水平方向上如何放置                        |          'center'          |
| textBaseline |           `string`            |                               水印文字基线                                |          'middle'          |
|     font     |           `string`            |                                字号，字体                                 |   '18px Microsoft Yahei'   |
|  lineHeight  |           `number`            |                                   行高                                    |             25             |
|  fillStyle   |           `string`            |                                 字体颜色                                  | 'rgba(184, 184, 184, 0.3)' |
|   content    | `string` 或 `Array of string` | 水印文本内容，当类型是 `Array of string` 时，可做到水平居中换行的文本效果 |       '@aidol/utils'       |
|    rotate    |           `number`            |                             水印文本旋转角度                              |             20             |
|    zIndex    |           `number`            |                         生成的水印块的 z-index 值                         |            1024            |
|   observe    |           `boolean`           |              是否监视 DOM 变更，防止用户恶意删除水印节点 dom              |            true            |
|     open     |           `boolean`           |                               是否开启水印                                |            true            |

## paging

分页查询工具函数。

### 参数

1. **ori {array of object}**： 源数据（必需）。

2. **options {object}**： 配置（不启用分页时可不传，或传入 `{}`）。

```js
{
  currentPage: 1, // 当前页码
  pageSize: 10 // 每页条数
}
```

3. **condition {array of object}**： 查询条件。

### 返回

**{object}**：返回一个查询结果对象。

```js
{
  total, // 查询结果总条数
    originTotal, // 源数据总条数
    data, // 查询结果
    currentPage, // 当前页码
    pageSize // 当前页数据条数
}
```

### 基本使用

1. 不启用分页，按条件查询。

```js
import { paging } from '@aidol/utils'

// 源数据
const ori = [{ a: 'bar' }, { a: 'bar2' }, { a: 'foo' }, { a: 'foo2' }]

// 查询条件
const condition = [{ key: 'a', value: 'foo' }]

const { total, data } = paging(ori, {}, condition)

console.log(total) // 查询结果总条数，1
console.log(data) // 查询结果, [{ a: 'foo' }]
```

2. 启用分页，按条件查询。

```js
import { paging } from '@aidol/utils'

// 源数据
const ori = [
  { a: 'bar' },
  { a: 'bar2' },
  { a: 'foo' },
  { a: 'foo2' },
  { a: 'foo2' },
  { a: 'foo2' },
  { a: 'foo' },
  { a: 'foo' },
]

// 查询条件
const condition = [{ key: 'a', value: 'foo' }]

const { total, data } = paging(ori, { currentPage: 1, pageSize: 2 }, condition)

console.log(total) // 查询结果总条数，3
console.log(data) // 查询结果, [{ a: 'foo' }, { a: 'foo' }]
```

### condition 条件

`condition` 作为 `paging` 的第三个参数，表示查询条件，可选。

```js
const condition = [
  {
    // 检索字段、属性键名（必需）。
    key: 'a',
    // 当前检索值（必需）。
    value: '',
    // 是否启用模糊搜索
    // 当前启用该字段时，将不会区分大小写，只要被检索值中存在 value 即被匹配成功。
    fuzzy: false,
    // 是否对该字段启用日期范围检索
    // 设置了该属性为 true 后，value 的格式需为 [2019-02-13, 2020-02-14]，两个值可以被 new Date() 解析即可。
    daterange: false,
    // 自定义检索方法，该方法被传入两个参数：`con`（当前条件字段值，即 value ），`val`（源数据中对应字段值）。
    validHandler: (con, val) => {},
  },
  // ...
]
```

为了应对复杂源数据类型，从 `1.3.0` 开始 `key` 支持按属性路径检索。例如：

```js
import { paging } from '@aidol/utils'

const ori = [{ a: { b: 'bar' } }, { a: { b: 'foo' } }, { a: { b: 'foo1' } }]

const condition = [
  {
    key: 'a.b',
    value: 'foo',
  },
]

const { data } = paging(ori, {}, condition)
console.log(data) // [{ a: { b: 'foo'} }]
```
