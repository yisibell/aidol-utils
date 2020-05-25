/**
 * 对象类型数据判等，用于判断：各 key 相同，value 相等时，即两对象相等。注意：不同于 _.eq() 方法。
 *@author hongwenqing(elenh)
 *@date 2020-05-25
 *@param {Object} o1
 *@param {Object} o2
 *@return {Boolean}
 */
export default isEqualObject = (o1, o2) => {
  const o1_keys = Object.keys(o1).sort()
  const o2_keys = Object.keys(o2).sort()

  const reduceNewObj = (keys, ori) => {
    return keys.reduce((init, k) => {
      init[k] = ori[k]
      return init
    }, {})
  }

  const o1_tmp = reduceNewObj(o1_keys, o1)
  const o2_tmp = reduceNewObj(o2_keys, o2)

  return JSON.stringify(o1_tmp) === JSON.stringify(o2_tmp)
}