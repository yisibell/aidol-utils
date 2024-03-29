function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function deepClone(obj) {
  var copy; // Handle the 3 simple types, and null or undefined

  if (null == obj || "object" != _typeof(obj)) return obj; // Handle Date

  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  } // Handle Array


  if (obj instanceof Array) {
    copy = [];

    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }

    return copy;
  } // Handle Function


  if (obj instanceof Function) {
    copy = function copy() {
      return obj.apply(this, arguments);
    };

    return copy;
  } // Handle Object


  if (obj instanceof Object) {
    copy = {};

    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
    }

    return copy;
  }

  throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
}

var calc = {
  //加法
  add: function add(arg1, arg2) {
    var r1, r2, m;

    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }

    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }

    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  //减法
  sub: function sub(arg1, arg2) {
    var r1, r2, m, n;

    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }

    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }

    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  //乘法
  mul: function mul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();

    try {
      m += s1.split(".")[1].length;
    } catch (e) {}

    try {
      m += s2.split(".")[1].length;
    } catch (e) {}

    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  //除法
  div: function div(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1,
        r2;

    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}

    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}

    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return this.mul(r1 / r2, Math.pow(10, t2 - t1));
  }
};

function getType(_val) {
  var s = Object.prototype.toString.call(_val);
  return s.slice(s.indexOf(' ') + 1, s.length - 1);
}

var dom = {
  // 设置样式
  css: function css(el, styles) {
    // 设置
    if (getType(styles) === 'Object') {
      for (var k in styles) {
        if (styles.hasOwnProperty(k)) el.style[k] = styles[k];
      }

      return;
    } // 获取


    return this.getStyleValue(el, styles);
  },
  //获取指定样式
  getStyleValue: function getStyleValue(elObj, attr) {
    var view = elObj.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }

    if (elObj.currentStyle) {
      //IE
      return elObj.currentStyle[attr];
    } else {
      return view.getComputedStyle(elObj)[attr]; //Firefox
    }
  },
  //获取元素偏移量( top , left )
  offset: function offset(curEle) {
    var totalLeft = null,
        totalTop = null,
        par = curEle.offsetParent; //首先把自己本身的进行累加

    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop; //只要没有找到body，我们就把父级参照物的边框和偏移量累加

    while (par) {
      if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        //不是标准的ie8浏览器，才进行边框累加
        //累加父级参照物边框
        totalLeft += par.clientLeft;
        totalTop += par.clientTop;
      } //累加父级参照物本身的偏移


      totalLeft += par.offsetLeft;
      totalTop += par.offsetTop;
      par = par.offsetParent;
    }

    return {
      left: totalLeft,
      top: totalTop
    };
  }
};

/**
 * 对象类型数据判等，用于判断：各 key 相同，value 相等时，即两对象相等。注意：不同于 _.eq() 方法。
 *@author hongwenqing(elenh)
 *@date 2020-05-25
 *@param {Object} o1
 *@param {Object} o2
 *@return {Boolean}
 */
function isEqualObject(o1, o2) {
  var o1_keys = Object.keys(o1).sort();
  var o2_keys = Object.keys(o2).sort();

  var reduceNewObj = function reduceNewObj(keys, ori) {
    return keys.reduce(function (init, k) {
      init[k] = ori[k];
      return init;
    }, {});
  };

  var o1_tmp = reduceNewObj(o1_keys, o1);
  var o2_tmp = reduceNewObj(o2_keys, o2);
  return JSON.stringify(o1_tmp) === JSON.stringify(o2_tmp);
}

/**
 * 笛卡尔积生成函数
 *@author hongwenqing(elenh)
 *@date 2020-02-25
 *@param {Array of Array} ori
 *@return {Array of Array}
 */
function cartesianOf(ori) {
  return ori.reduce(function (init, v) {
    var ret = [];
    init.forEach(function (e) {
      v.forEach(function (item) {
        ret.push(e.concat([item]));
      });
    });
    return ret;
  }, [[]]);
}

/**
 * 将笛卡尔积数据生成对象数组结构
 *@author hongwenqing(elenh)
 *@date 2020-05-25
 *@param {Array of Array} arr 笛卡尔积二维数组
 *@param {Array of String} cols 要提取的字段数组
 *@return {Array of Object}
 */
function cartesianToTable(arr, cols) {
  return arr.reduce(function (init, v) {
    var obj = {};
    cols.forEach(function (prop, j) {
      obj[prop] = v[j] || {};
    });
    init.push(obj);
    return init;
  }, []);
}

/**
 * 将指定文本复制到系统剪切板
 *@author hongwenqing(elenh)
 *@date 2020-05-25
 *@param {string} text
 */
function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData('Text', text);
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.

    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

/**
 * 根据 obj 对象的 path 路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
 * @author hongwenqing(elenh)
 * @date 2020-05-29
 * @param {object} obj 要检索的对象
 * @param {string | array} path 要获取属性的路径
 * @param {any} defaultValue 如果解析值是 undefined ，这值会被返回。
 * @return {any} 返回解析的值
 */
function get (obj, path, defaultValue) {
  var res = obj;
  var path_arr = []; // 生成属性路径数组

  if (Array.isArray(path)) {
    path_arr = path;
  } else {
    var keys = [];

    try {
      keys = path.split('.');
    } catch (err) {
      throw new Error('path must be a String.');
    }

    keys.forEach(function (str) {
      var arr = [];
      var first_prop = str.match(/^(\w+)\[?/);
      var index_arr = str.match(/\[(\d)\]+/g);

      if (Array.isArray(first_prop) && first_prop.length > 1) {
        arr.push(first_prop[1]);
      }

      if (Array.isArray(index_arr)) {
        arr = arr.concat(index_arr.map(function (v) {
          var num = v.match(/\[(\d)+\]/);
          return Number.parseInt(num[1]);
        }));
      }

      path_arr = path_arr.concat(arr);
    });
  } // 生成结果


  path_arr.forEach(function (key) {
    res = res[key];
  });
  return typeof res === 'undefined' ? defaultValue : res;
}

/**
 * 吸顶指令
 * @author hongwenqing(elenh)
 * @date 2020-0925
 * @param {} 
 * @return 
 */

var affix = {
  bind: function bind(el) {
    dom.css(el, {
      width: '100%',
      zIndex: '1994214'
    });
  },
  inserted: function inserted(el) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        _ref.value;

    var parseFloat = Number.parseFloat;
    var prevEl = el.previousElementSibling,
        // 上一兄弟节点
    nextEl = el.nextElementSibling,
        // 后一兄弟节点
    nextElPaddingTop = parseFloat(dom.getStyleValue(nextEl, 'paddingTop')),
        prevHeight = parseFloat(prevEl ? dom.getStyleValue(prevEl, 'height') : 0),
        elHeight = parseFloat(dom.getStyleValue(el, 'height'));

    el._ai_affix_directive__scroll_handle = function (e) {
      var scroll_instance = window.pageYOffset || window.scrollY,
          position = 'static',
          paddingTop = nextElPaddingTop;

      if (scroll_instance >= prevHeight) {
        position = 'fixed';
        paddingTop = elHeight + nextElPaddingTop + 'px';
      } else {
        position = 'static';
        paddingTop = nextElPaddingTop + 'px';
      }

      dom.css(el, {
        position: position,
        left: '0px',
        top: '0px'
      });
      dom.css(nextEl, {
        paddingTop: paddingTop
      });
    };

    window.addEventListener('scroll', el._ai_affix_directive__scroll_handle);
  },
  unbind: function unbind(el) {
    window.removeEventListener('scroll', el._ai_affix_directive__scroll_handle);
  }
};

/**
 * 自动设置高度，对某 Dom 元素加上该指令后，会对其自动设置高度值，使得浏览器不出现纵向滚动条。
 * @author hongwenqing(elenh)
 * @date 2020-09-25
 * @param {value} number 与视窗底部预留的间隙值
 * @return 
 */

var autoheight = {
  bind: function bind(el) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? 20 : _ref$value;

    el._ai_autoheight_directive = function () {
      var w_h = window.innerHeight;
      var con_el = el;
      var con_offset = dom.offset(con_el);
      con_el.style = "height:".concat(w_h - con_offset.top - value, "px; overflow-y:auto;");
    };

    window.addEventListener('resize', el._ai_autoheight_directive);
  },
  inserted: function inserted(el) {
    el._ai_autoheight_directive();
  },
  componentUpdated: function componentUpdated(el) {
    el._ai_autoheight_directive();
  },
  unbind: function unbind(el) {
    window.removeEventListener('resize', el._ai_autoheight_directive);
  }
};

/**
 * 拖拽指令
 * @author hongwenqing(elenh)
 * @date 
 * @param {value} boolean 是否启动拖拽
 * @return 
 */

var drag = {
  inserted: function inserted(el) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? true : _ref$value;

    el._ai_drag_directive__target_offset = dom.offset(el); // 初始偏移

    el._ai_drag_directive__mousedown_handle = function (e) {
      e.preventDefault();
      e = e || window.event;
      var drag_el = e.target;
      var dist = e.clientY - drag_el.offsetTop;
      var disl = e.clientX - drag_el.offsetLeft;

      var mousemove_handle = function mousemove_handle(e) {
        e = e || window.event;
        var winW = document.documentElement.clientWidth || document.body.clientWidth;
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        var maxW = winW - drag_el.offsetWidth;
        var maxH = winH - drag_el.offsetHeight;
        var x = e.clientX - disl;
        var y = e.clientY - dist;
        if (x < 0) x = 0;else if (x > maxW) x = maxW;
        if (y < 0) y = 0;else if (y > maxH) y = maxH;
        drag_el.style.top = y + 'px';
        drag_el.style.left = x + 'px';
      };

      var mouseup_handle = function mouseup_handle() {
        // 鼠标弹起时卸载鼠标移动事件
        document.removeEventListener('mousemove', mousemove_handle); // 同时卸载弹起事件

        document.removeEventListener('mouseup', mouseup_handle);
      };

      document.addEventListener('mousemove', mousemove_handle);
      document.addEventListener('mouseup', mouseup_handle);
    };

    el._ai_drag_directive__set_css = function (isFixed) {
      dom.css(el, {
        position: isFixed ? 'fixed' : 'static',
        top: el._ai_drag_directive__target_offset.top + 'px',
        left: el._ai_drag_directive__target_offset.left + 'px',
        zIndex: 1024
      });
    };

    el._ai_drag_directive__set_css(value);

    el.addEventListener('mousedown', el._ai_drag_directive__mousedown_handle);
  },
  componentUpdated: function componentUpdated(el, _ref2) {
    var value = _ref2.value;

    el._ai_drag_directive__set_css(value);
  },
  unbind: function unbind(el) {
    el.removeEventListener('mousedown', el._ai_drag_directive__mousedown_handle);
  }
};

var index = {
  affix: affix,
  autoheight: autoheight,
  drag: drag
};

export { calc, cartesianOf, cartesianToTable, copyToClipboard, deepClone, dom, get, getType, isEqualObject, index as vueDirectives };
