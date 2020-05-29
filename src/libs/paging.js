import get from './get'
/**
 * 分页器
 *@author hongwenqing(elenh)
 *@date 2019-02-14
 *@param {Array of Object} origin 源数据
 *@param {Object} currentPage 当前页, pageSize 每页条数
 *@param {Array of Object} condition 过滤条件
 *@return {Object} total: 总条数 data: 当前页数据
 */
const paging = (
  origin,
  {
    currentPage,
    pageSize
  } = {
    currentPage: 0,
    pageSize: 0,
  },
  condition

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
          const curr_condition_o = condition.find(v => v.key === k )  // 某条件信息对象
          const curr_condition_o_val = curr_condition_o.value
          const ori_val = get(ori, k)

          /* 匹配方式 S */
          if (curr_condition_o.daterange) {  // 1.日期范围
            const start = +new Date(curr_condition_o_val ? curr_condition_o_val[0] : 0)
            const end = +new Date(curr_condition_o_val ? curr_condition_o_val[1] : 0)
            const now = +new Date(ori_val)

            validMap[k] = (start <= now && end >= now) || !start
          } else if (curr_condition_o.validHandler) { // 2.自定义校验
            validMap[k] = curr_condition_o.validHandler(curr_condition_o_val, ori_val)
          } else {  // 3.模糊、全匹配
            const fuzzy_ori_val = ori_val.toLowerCase ? ori_val.toLowerCase() : ori_val
            const fuzzy_curr_condition_o_val = curr_condition_o_val.toLowerCase ? curr_condition_o_val.toLowerCase() : curr_condition_o_val

            validMap[k] = (curr_condition_o.fuzzy ? fuzzy_ori_val.search( fuzzy_curr_condition_o_val ) !== -1 : ori_val == curr_condition_o_val
            ) || curr_condition_o_val == ''
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