# LOGS

## 2.x

- 2022/01/18

1. 移除 `ws` 功能。

- 2022/01/19

1. 移除 `watermark` 功能。
2. 移除 `paging` 功能。


## 1.x

- 2020/11/20 (version 1.6.1)
  
1. **Refactor** `copyToClibboard` 改名为 `copyToClipboard`。

- 2020/09/25 (version 1.6.0)

1. **Feature** 新增 `vueDirectives` 指令集模块，包含了有：`v-affix`, `v-drag`, `v-autoheight` 三个实用指令。

- 2020/09/09 (version 1.5.3)

1. **Upgrade** 优化 `ws` 重连的触发时机。

- 2020/08/13 (version 1.5.2)

1. **BugFix** 修复 `calc.div()` 方法调用问题。

- 2020/08/04 (version 1.5.1)

1. **Upgrade** `watermark` 优化。文本支持自动换行，`content` 参数支持 `Array` 类型，其他参数默认值优化。

- 2020/07/31 (version 1.5.0)

1. **Feature** 新增水印生成工具函数。

- 2020/6/28 (version 1.4.3)

1. **BugFix** 修复 `ws` 在意外断开时未正常重连问题。

- 2020/6/24 (version 1.4.2)

1. **BugFix** 修复 `ws` 模块中 `vue_emit_name` 参数的一些潜在问题。