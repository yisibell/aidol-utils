# Migration Guide

`@aidol/utils` 的定位从 `2.x` 开始发生变化。以后其只提供 **Vue directive** 相关功能。有使用 `@aidol/utils@1.x` 的同学请尽快完成迁移。

## 从 1.x 迁移至 2.x

**变更概览:**

- `ws` 模块已移至 <a href="https://github.com/yisibell/myws" target="_blank">myws</a>
- `watermark` 模块已移至 <a href="https://github.com/yisibell/mymark" target="_blank">mymark</a>
- `paging` 模块已移至 <a href="https://github.com/yisibell/pagein" target="_blank">pagein</a>


### ws 模块的迁移

1. 安装 `myws`。

``` bash
# yarn
$ yarn add myws
```

2. 找到使用 `ws` 功能的注册入口。
3. 更改导入方式：

**老的用法：**

``` js
// @/src/service/ws.js

import Vue from 'vue'
import { ws } from '@aidol/utils'

// ...
Vue.use(ws, {
  // ...
})
```

**新的用法：**

``` js
// @/src/service/ws.js

import Vue from 'vue'
import { wsInstaller } from 'myws'

// ...

Vue.use(wsInstaller, {
  // ...
})
```

4. 变更组件内的监听方法。

`WsBus.$on` 变更为 `WsBus.on` 即可。

**老的用法：**

``` js
export default {
  // ...
  mounted() {
    const { WsBus } = this.$ws
    WsBus.$on('ws_message', () => {
      // ...
    })
  }
}
```

**新的用法：**

``` js
export default {
  // ...
  mounted() {
    const { WsBus } = this.$ws
    WsBus.on('ws_message', () => {
      // ...
    })
  }
}
```

### watermark 模块的迁移

1. 安装 `mymark`。

``` bash
# yarn
$ yarn add mymark
```

2. 将原本从 `@aidol/utils` 中导出的 `watermark` 改由 `mymark` 中导出。

**老的用法：**

``` js
import { watermark } from '@aidol/utils'

// ...
```

**新的用法：**

``` js
import { watermark } from 'mymark'

// ...
```

### paging 模块的迁移

1. 安装 `pagein`。

``` bash
# yarn
$ yarn add pagein
```

2. 将原本从 `@aidol/utils` 中导出的 `paging` 改由 `pagein` 中导出。


**老的用法：**

``` js
import { paging } from '@aidol/utils'

// ...
```

**新的用法：**

``` js
import { paging } from 'pagein'

// ...
```

## 最后

记得将 `@aidol/utils` 升级至最新版本。迁移便完成了。