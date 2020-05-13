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

