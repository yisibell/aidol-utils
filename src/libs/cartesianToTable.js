/**
 * 将笛卡尔积数据生成对象数组结构
 *@author hongwenqing(elenh)
 *@date 2020-05-25
 *@param {Array of Array} arr 笛卡尔积二维数组
 *@param {Array of String} cols 要提取的字段数组
 *@return {Array of Object}
 */
export default function cartesianToTable(arr, cols) {
  return arr.reduce((init, v) => {
    const obj = {}
    cols.forEach((prop, j) => {
      obj[prop] = v[j] || {}
    })
    init.push(obj)
    return init
  }, [])
}
