/**
*@author: hongwenqing
*@date: 2020-03-18
*@desc: 分页生成器函数
*/
const paging = (
  origin , // 源数据
  { // 分页参数
    currentPage, // 当前页码
    pageSize // 每页条数
  } = {
    currentPage: 0,
    pageSize: 0,
  },
  condition // 过滤条件

) => {

  origin = !origin ? [] : origin

  let start_index = ( currentPage - 1 ) * pageSize,
      end_index = start_index + pageSize,
      originTotal = origin.length,  // origin total data
      data = [],
      total = 0,
      isAllConditionNull = !condition || condition.every( v => v.value === '' || v.value === null ); // 是否存在有效过滤条件

  // get all origin data when all condition is null character string.
  if ( isAllConditionNull ){
    data = currentPage && pageSize ? origin.slice( start_index , end_index ) : origin
    total = origin.length
  } else {
    // filter data
    const filteredArr = origin.filter(ori => {

      const validMap = condition.reduce((o, v) => {
        o[v.key] = true
        return o
      }, {})

      for (let k in validMap) {
        if (validMap.hasOwnProperty(k)) {
          const curr = condition.find(v => v.key === k )  // 某条件信息对象
          
          /* 匹配方式 S */
          if (curr.daterange) {  // 1.日期范围
            const start = +new Date( curr.value ? curr.value[0] : 0 )
            const end = +new Date( curr.value ? curr.value[1] : 0 )
            const now = +new Date( ori[k] )

            validMap[k] = (start <= now && end >= now) || !start
          } else if (curr.validHandler) { // 2.自定义校验
            validMap[k] = curr.validHandler(curr.value, ori[k])
          } else {  // 3.模糊、全匹配
            validMap[k] = (curr.fuzzy ? ori[k].search( curr.value ) !== -1 : ori[k] == curr.value) || curr.value == ''
          }
          /* 匹配方式 E */
        }
      }

      for ( let k in validMap ) if( !validMap[k] ) return false

      return true
    })

    // pagination data from condition filter
    data = currentPage && pageSize ? filteredArr.slice( start_index , end_index ) : filteredArr
    // pagination total data
    total = filteredArr.length  
  }
    
  return {
    total,
    originTotal,
    data,
    currentPage,
    pageSize,
  }


}

export default paging