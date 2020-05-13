# aidol-utils

# Installation

``` bash
$ npm i @aidol/utils --S
```

# Usage

``` js
// 使用分页工具函数
import { paging } from '@aidol/utils'

const ori = []

const condition = []

const { total, data } = paging(ori, {currentPage: 1, pageSize: 10}, condition)

console.log(total, data)
```

# Feature

1. **paging**  分页工具函数。
2. **deepClone** 引用类型深拷贝。
3. **calc** 避免 `javascript` 小数计算精度丢失工具类。
4. **getType** 数据类型获取函数。
5. **dom** 实用 Dom 操作工具类。

