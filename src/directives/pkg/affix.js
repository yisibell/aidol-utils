
import dom from '../../libs/dom'

/**
 * 吸顶指令
 * @author hongwenqing(elenh)
 * @date 2020-0925
 * @param {} 
 * @return 
 */
export default {
  bind(el) {
    dom.css(el , { 
      width: '100%',
      zIndex: '1994214' 
    })
  },
  inserted( el , { value } = {} ) {
    const { parseFloat } = Number
    const prevEl = el.previousElementSibling,  // 上一兄弟节点
          nextEl = el.nextElementSibling,      // 后一兄弟节点
          nextElPaddingTop = parseFloat( dom.getStyleValue( nextEl , 'paddingTop') ),
          prevHeight = parseFloat( prevEl ? dom.getStyleValue( prevEl , 'height') : 0 ),
          elHeight = parseFloat(dom.getStyleValue( el , 'height' ));

    el._ai_affix_directive__scroll_handle = function(e) {
      let scroll_instance = window.pageYOffset || window.scrollY,
          position = 'static',
          paddingTop = nextElPaddingTop;
      
      if (scroll_instance >= prevHeight) {
        position = 'fixed'
        paddingTop = elHeight + nextElPaddingTop + 'px'
      } else {
        position = 'static'
        paddingTop = nextElPaddingTop + 'px'
      }

      dom.css(el , {
        position,
        left: '0px',
        top: '0px'
      })

      dom.css(nextEl, {paddingTop})
      
    }
    
    window.addEventListener('scroll' , el._ai_affix_directive__scroll_handle)
  },
  unbind(el){
    window.removeEventListener('scroll' , el._ai_affix_directive__scroll_handle)
  }
}