/**
 * 笛卡尔积生成函数
 *@author hongwenqing(elenh)
 *@date 2020-02-25
 *@param {Array of Array} ori
 *@return {Array of Array}
 */
export default function cartesianOf(ori) {
  return ori.reduce((init, v) => {
    const ret = []
    init.forEach((e) => {
      v.forEach((item) => {
        ret.push(e.concat([item]))
      })
    })
    return ret
  }, [[]])
}