# @aidol/utils

# Installation

``` bash
$ npm i @aidol/utils -S
```

# Features

1. **paging**  分页工具函数。
2. **deepClone** 引用类型深拷贝。
3. **calc** 避免 `javascript` 小数计算精度丢失工具类。
4. **getType** 数据类型获取函数。
5. **dom** 实用 Dom 操作工具类。
6. **ws** 适用于 vue 项目的 WebSocket 客户端服务。
7. **cartesianOf** 笛卡尔积生成函数。
8. **cartesianToTable** 笛卡尔积转换为 Array of Object。
9. **copyToClibboard** 复制文本至系统剪切板。
10. **isEqualObject** 对象判等（以键-值为维度）。


# Usage

## paging

分页查询工具函数。

``` js
// 使用分页工具函数
import { paging } from '@aidol/utils'

const ori = []

const condition = []

const { total, data } = paging(ori, {currentPage: 1, pageSize: 10}, condition)

console.log(total, data)
```

## ws

适用于 **vue** 项目的 **WebSocket** 客户端服务。

使用方式：

为了规范化，请在你的项目中创建 `src/service/ws.js` 文件，该文件中用于存放该项目的 `WebSocket` 服务逻辑。

``` js
// src/service/ws.js

import Vue from 'vue'
import { ws } from '@aidol/utils' // WebSocket 服务

const open = process.env.VUE_APP_WS_OPEN
const api = process.env.VUE_APP_WS_API
const heart_interval = process.env.VUE_APP_WS_INTERVAL

Vue.use(ws, {
  // 是否开启 ws，默认关闭
  open,

  // ws 服务地址，必需
  api,

  // ws 心跳间隔，毫秒数，默认 50000
  heart_interval,

  // 自动重连次数限制, Number, 默认 30
  reconnect_limit: 30,

  // 超出重连次数时的提示文本
  reconnect_limit_msg: '',

  // 每次尝试重连 ws 时的提示文本, 也可以是一个函数，该函数会被传入当前的重连计数
  reconnect_msg: '',

  // 在响应 ws 消息时，向 vue 实例注入的 $emit 事件名。
  vue_emit_name: {
    onopen: 'ws_open',
    onmessage: 'ws_message', // $on('ws_message')
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

  // WebSocket 连接时回调
  onopen(e) {},

  // WebSocket 出错时回调
  onerror(err) {},

  // WebSocket 关闭时回调
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

