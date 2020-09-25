import dom from '../../libs/dom'

/**
 * 拖拽指令
 * @author hongwenqing(elenh)
 * @date 
 * @param {value} boolean 是否启动拖拽
 * @return 
 */
export default {
  inserted(el, { value = true } = {}) {
    el._ai_drag_directive__target_offset = dom.offset(el) // 初始偏移

    el._ai_drag_directive__mousedown_handle = function(e) {
      e.preventDefault()

      e = e || window.event

      const drag_el = e.target
      const dist = e.clientY - drag_el.offsetTop
      const disl = e.clientX - drag_el.offsetLeft

      const mousemove_handle = function(e) {
        e = e || window.event

        const winW = document.documentElement.clientWidth || document.body.clientWidth
        const winH = document.documentElement.clientHeight || document.body.clientHeight
        const maxW = winW - drag_el.offsetWidth
        const maxH = winH - drag_el.offsetHeight

        let x = e.clientX - disl
        let y = e.clientY - dist

        if (x < 0) x = 0
        else if (x > maxW) x = maxW

        if (y < 0) y = 0
        else if (y > maxH) y = maxH

        drag_el.style.top = y + 'px'
        drag_el.style.left = x + 'px'
      }

      const mouseup_handle = function() {
        // 鼠标弹起时卸载鼠标移动事件
        document.removeEventListener('mousemove', mousemove_handle)
        // 同时卸载弹起事件
        document.removeEventListener('mouseup', mouseup_handle)
      }

      document.addEventListener('mousemove', mousemove_handle)
      document.addEventListener('mouseup', mouseup_handle)
    }

    el._ai_drag_directive__set_css = function(isFixed) {
      dom.css(el, {
        position: isFixed ? 'fixed' : 'static',
        top: el._ai_drag_directive__target_offset.top + 'px',
        left: el._ai_drag_directive__target_offset.left + 'px',
        zIndex: 1024
      })
    }

    el._ai_drag_directive__set_css(value)

    el.addEventListener('mousedown', el._ai_drag_directive__mousedown_handle)
  },
  componentUpdated(el, { value }) {
    el._ai_drag_directive__set_css(value)
  },
  unbind(el) {
    el.removeEventListener('mousedown', el._ai_drag_directive__mousedown_handle)
  }
}
 