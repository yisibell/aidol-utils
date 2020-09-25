import dom from '../../libs/dom'

/**
 * 自动设置高度，对某 Dom 元素加上该指令后，会对其自动设置高度值，使得浏览器不出现纵向滚动条。
 * @author hongwenqing(elenh)
 * @date 2020-09-25
 * @param {value} number 与视窗底部预留的间隙值
 * @return 
 */
export default {
  bind(el, { value = 20 } = {}) {
    el._ai_autoheight_directive = function() {
      const w_h = window.innerHeight
      const con_el = el
      const con_offset = dom.offset(con_el)

      con_el.style = `height:${w_h - con_offset.top - value}px; overflow-y:auto;`
    }

    window.addEventListener('resize', el._ai_autoheight_directive)
  },
  inserted(el) {
    el._ai_autoheight_directive()
  },
  componentUpdated(el) {
    el._ai_autoheight_directive()
  },
  unbind(el) {
    window.removeEventListener('resize', el._ai_autoheight_directive)
  }
}