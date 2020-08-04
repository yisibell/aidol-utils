# @aidol/utils

# Installation

``` bash
$ npm i @aidol/utils -S
```

# build

构建文件在 `dist` 文件夹下分为两个版本。

`dist/aidol-utils.es.js` 为 `es Modules` 版本。

`dist/aidol-utils.umd.js` 为 `umd` 版本，适合使用 `<script></script>` 标签的方式引用。

# Features

1. **paging**  分页工具函数。
2. **deepClone** 引用类型深拷贝。
3. **calc** 避免 `javascript` 小数计算精度丢失工具类。
4. **getType** 数据类型获取函数。
5. **dom** 实用 `Dom` 操作工具类。
6. **ws** 适用于 `vue` 项目的 `WebSocket` 客户端服务。
7. **cartesianOf** 笛卡尔积生成函数。
8. **cartesianToTable** 笛卡尔积转换为 `Array of Object`。
9. **copyToClibboard** 复制文本至系统剪切板。
10. **isEqualObject** 对象判等（以键-值为维度）。
11. **get**  根据 `object` 对象的 `path` 路径获取值, 功能等同于 **lodash** 的 `_.get()` 方法。
12. **watermark** 水印生成工具。


# Logs

- 2020/08/04 (version 1.5.1)

1. **watermark** 优化。文本支持自动换行，`content` 参数支持 `Array` 类型，其他参数默认值优化。

- 2020/07/31 (version 1.5.0)

1. 新增水印生成工具函数。

- 2020/6/28 (version 1.4.3)

1. **BugFix:** 修复 `ws` 在意外断开时未正常重连问题。

- 2020/6/24 (version 1.4.2)

1. **BugFix:** 修复 `ws` 模块中 `vue_emit_name` 参数的一些潜在问题。


# Usage

## watermark

水印生成工具。

### 使用方式

``` js
// 导入
import { watermark } from '@aidol/utils'
// 调用, options 参数具体见下表
watermark(options)
```

#### 以 `<script>` 标签的方式引用

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

``` js
import { watermark } from '@aidol/utils'
watermark({ content: 'build by elenh' })
```

### options 参数

| 键名 | 类型 | 说明 | 默认值 |
| :---: | :----: | :----: | :----: |
| container | `Selector` 或 `Element` | 水印插入的容器 | `body` 元素 |
| width | `string` | 生成水印 canvas 的 宽度 | '400px' |
| height | `string` | 生成水印 canvas 的 高度 | '300px' |
| textAlign | `string` | 水印文字在水平方向上如何放置 | 'center' |
| textBaseline | `string` | 水印文字基线 | 'middle' |
| font | `string` | 字号，字体 | '18px Microsoft Yahei' |
| lineHeight | `number` | 行高 | 25 |
| fillStyle | `string` | 字体颜色 | 'rgba(184, 184, 184, 0.3)' |
| content | `string` 或 `Array of string` | 水印文本内容，当类型是 `Array of string` 时，可做到水平居中换行的文本效果 | '@aidol/utils' |
| rotate | `number` | 水印文本旋转角度 | 20 |
| zIndex | `number` | 生成的水印块的 z-index 值 | 1024 |
| observe | `boolean` | 是否监视 DOM 变更，防止用户恶意删除水印节点 dom | true |
| open | `boolean` | 是否开启水印 | true |


## paging

分页查询工具函数。

### 参数

1. **ori {array of object}**： 源数据（必需）。

2. **options {object}**： 配置（不启用分页时可不传，或传入 `{}`）。

``` js
{
  currentPage: 1, // 当前页码
  pageSize: 10 // 每页条数
}
```

3. **condition {array of object}**： 查询条件。

### 返回

**{object}**：返回一个查询结果对象。

``` js
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

``` js
import { paging } from '@aidol/utils'

// 源数据
const ori = [
  { a: 'bar' },
  { a: 'bar2' },
  { a: 'foo' },
  { a: 'foo2' }
]

// 查询条件
const condition = [
  { key: 'a', value: 'foo' }
]

const { total, data } = paging(ori, {}, condition)

console.log(total) // 查询结果总条数，1
console.log(data) // 查询结果, [{ a: 'foo' }]
```

2. 启用分页，按条件查询。

``` js
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
  { a: 'foo' }
]

// 查询条件
const condition = [
  { key: 'a', value: 'foo' }
]

const { total, data } = paging(ori, { currentPage: 1, pageSize: 2 }, condition)

console.log(total) // 查询结果总条数，3
console.log(data) // 查询结果, [{ a: 'foo' }, { a: 'foo' }]
```

### condition 条件

`condition` 作为 `paging` 的第三个参数，表示查询条件，可选。

``` js
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
    validHandler: (con, val) => {} 
  }
  // ...
]
```

为了应对复杂源数据类型，从 `1.3.0` 开始 `key` 支持按属性路径检索。例如：

``` js
import { paging } from '@aidol/utils'

const ori = [
  { a: { b: 'bar'} },
  { a: { b: 'foo'} },
  { a: { b: 'foo1'} },
]

const condition = [
  {
    key: 'a.b',
    value: 'foo'
  }
]

const { data } = paging(ori, {}, condition)
console.log(data) // [{ a: { b: 'foo'} }]
```

## ws

适用于 **vue** 项目的 **WebSocket** 客户端服务。

使用方式：

为了规范化，请在你的项目中创建 `src/service/ws.js` 文件，该文件中用于存放该项目的 `WebSocket` 服务逻辑。

``` js
// src/service/ws.js

import Vue from 'vue'
import { ws } from '@aidol/utils' // WebSocket 服务

// 一些常量可以放在环境变量中
const open = process.env.VUE_APP_WS_OPEN
const api = process.env.VUE_APP_WS_API
const heart_interval = process.env.VUE_APP_WS_INTERVAL

Vue.use(ws, {
  // 是否开启 ws，默认关闭。
  open,

  // ws 服务地址，必需。
  api,

  // ws 心跳间隔，毫秒数，默认 50000。
  heart_interval,

  // 自动重连次数限制, Number, 默认 30。
  reconnect_limit: 30,

  // 超出重连次数时的提示文本。
  reconnect_limit_msg: '',

  // 每次尝试重连 ws 时的提示文本, 也可以是一个函数，该函数会被传入当前的重连计数。
  reconnect_msg: '',

  // 在响应 ws 消息时，向 vue 实例注入的 $emit 事件名，
  // 一旦修改，则 4 个名称都需要修改。
  vue_emit_name: {
    onopen: 'ws_open',
    onmessage: 'ws_message', // WsBus.$on('ws_message')
    onerror: 'ws_error',
    onclose: 'ws_close'
  },

  // 接收 message 时回调
  onmessage(data) {
    console.log(data)
    // 在这里你可以写一些特定的业务逻辑
    // 比如调用一个绑定客户端的接口，使得后端服务知道当前使用 WebSocket 服务的用户是谁。
    // ...
  },

  // WebSocket 连接时回调。
  onopen(e) {},

  // WebSocket 出错时回调。
  onerror(err) {},

  // WebSocket 关闭时回调。
  onclose(e) {}
})
```

然后在 `main.js` 中导入 `src/service/ws.js`。

``` js
// main.js
import '@/service/ws'

// ...
```

这样，**WebSocket** 就会正常注册，并且在所有 **vue** 组件实例中你都可以接收到来自 **WebSocket** 服务发送的消息，像这样：

``` vue
<script>
export default {
  mounted() {
    const { WsBus, WS } = this.$ws
    // 当前 WebSocket 实例
    console.log(WS)
    WsBus.$on('ws_message', (data) => {
      // 请保证后端发送的是 JSON 格式的数据，因为我们会在方法内部通过 `JSON.parse` 方法解析它。
      console.log(data)
    })
  }
}
</script>
```

