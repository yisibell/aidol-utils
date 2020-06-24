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
 * 分页器
 *@author hongwenqing(elenh)
 *@date 2019-02-14
 *@param {Array of Object} origin 源数据
 *@param {Object} currentPage 当前页, pageSize 每页条数
 *@param {Array of Object} condition 过滤条件
 *@return {Object} total: 总条数 data: 当前页数据
 */

var paging = function paging(origin) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    currentPage: 0,
    pageSize: 0
  },
      currentPage = _ref.currentPage,
      pageSize = _ref.pageSize;

  var condition = arguments.length > 2 ? arguments[2] : undefined;
  origin = !origin ? [] : origin;
  var start_index = (currentPage - 1) * pageSize,
      end_index = start_index + pageSize,
      originTotal = origin.length,
      // origin total data
  data = [],
      total = 0,
      isAllConditionNull = !condition || condition.every(function (v) {
    return v.value === '' || v.value === null;
  }); // 是否存在有效过滤条件
  // get all origin data when all condition is null character string.

  if (isAllConditionNull) {
    data = currentPage && pageSize ? origin.slice(start_index, end_index) : origin;
    total = origin.length;
  } else {
    // filter data
    var filteredArr = origin.filter(function (ori) {
      var validMap = condition.reduce(function (o, v) {
        o[v.key] = true;
        return o;
      }, {});

      var _loop = function _loop(k) {
        if (validMap.hasOwnProperty(k)) {
          var curr_condition_o = condition.find(function (v) {
            return v.key === k;
          }); // 某条件信息对象

          var curr_condition_o_val = curr_condition_o.value;
          var ori_val = get(ori, k);
          /* 匹配方式 S */

          if (curr_condition_o.daterange) {
            // 1.日期范围
            var start = +new Date(curr_condition_o_val ? curr_condition_o_val[0] : 0);
            var end = +new Date(curr_condition_o_val ? curr_condition_o_val[1] : 0);
            var now = +new Date(ori_val);
            validMap[k] = start <= now && end >= now || !start;
          } else if (curr_condition_o.validHandler) {
            // 2.自定义校验
            validMap[k] = curr_condition_o.validHandler(curr_condition_o_val, ori_val);
          } else {
            // 3.模糊、全匹配
            var fuzzy_ori_val = ori_val.toLowerCase ? ori_val.toLowerCase() : ori_val;
            var fuzzy_curr_condition_o_val = curr_condition_o_val.toLowerCase ? curr_condition_o_val.toLowerCase() : curr_condition_o_val;
            validMap[k] = (curr_condition_o.fuzzy ? fuzzy_ori_val.search(fuzzy_curr_condition_o_val) !== -1 : ori_val == curr_condition_o_val) || curr_condition_o_val == '';
          }
          /* 匹配方式 E */

        }
      };

      for (var k in validMap) {
        _loop(k);
      }

      for (var _k in validMap) {
        if (!validMap[_k]) return false;
      }

      return true;
    }); // pagination data from condition filter

    data = currentPage && pageSize ? filteredArr.slice(start_index, end_index) : filteredArr; // pagination total data

    total = filteredArr.length;
  }

  return {
    total: total,
    originTotal: originTotal,
    data: data,
    currentPage: currentPage,
    pageSize: pageSize
  };
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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

var calc$1 = {
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
    return calc.mul(r1 / r2, Math.pow(10, t2 - t1));
  }
};

function getType(_val) {
  var s = Object.prototype.toString.call(_val);
  return s.slice(s.indexOf(' ') + 1, s.length - 1);
}

var dom = {
  // 设置样式
  css: function css(el, styles) {
    for (var k in styles) {
      if (styles.hasOwnProperty(k)) el.style[k] = styles[k];
    }
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
*@author: hongwenqing
*@date: 2019-12-3
*@desc: WebSocket 通信服务
*/

var createWebSocket = function createWebSocket(Vue, options) {
  var _options$heart_interv = options.heart_interval,
      heart_interval = _options$heart_interv === void 0 ? 50000 : _options$heart_interv,
      api = options.api,
      open = options.open,
      vue_emit_name = options.vue_emit_name;
  var WsBus = new Vue();
  var WS = {};
  var timer = null;
  var is_open_ws = true;

  try {
    is_open_ws = getType(open) === 'String' ? JSON.parse(open) : open;
  } catch (err) {
    is_open_ws = true;
    console.error('the open property should be a truly value.');
  }

  if (is_open_ws) WS = new WebSocket(api);

  WS.onopen = function (e) {
    console.log('ws connected...');
    WS_CONNECT_COUNT = 0;
    WsBus.$emit(vue_emit_name.onopen, e);
    WS.send('heart');
    clearInterval(timer);
    timer = setInterval(function () {
      WS.send('heart');
    }, Number.parseInt(heart_interval));
    options.onopen && options.onopen(e);
  };

  WS.onmessage = function (e) {
    var json_data = JSON.parse(e.data);
    WsBus.$emit(vue_emit_name.onmessage, json_data);
    options.onmessage && options.onmessage(json_data);
  };

  WS.onerror = function (err) {
    WsBus.$emit(vue_emit_name.onerror, err);
    clearInterval(timer);
    options.onerror && options.onerror(err);
  };

  WS.onclose = function (e) {
    console.log('ws closed...');
    WsBus.$emit(vue_emit_name.onclose, e);
    clearInterval(timer);
    options.onclose && options.onclose(e);
  };

  return {
    WS: WS,
    WsBus: WsBus
  };
}; // 默认的 vue emit event name


var defaultVueEmitName = function defaultVueEmitName() {
  return {
    onopen: 'ws_open',
    onmessage: 'ws_message',
    onerror: 'ws_error',
    onclose: 'ws_close'
  };
}; // ws 安装函数


var install = function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!options.vue_emit_name || JSON.stringify(options.vue_emit_name) === '{}') {
    options.vue_emit_name = defaultVueEmitName();
  }

  var $ws = createWebSocket(Vue, options);
  Vue.prototype.$ws = $ws;
  var WsBus = $ws.WsBus;
  var reconnect_limit = options.reconnect_limit,
      reconnect_limit_msg = options.reconnect_limit_msg,
      reconnect_msg = options.reconnect_msg,
      vue_emit_name = options.vue_emit_name;
  WsBus.$on(vue_emit_name.onclose, function () {
    if (WS_CONNECT_COUNT > reconnect_limit) {
      var msg = reconnect_limit_msg || "The number of ws reconnections has exceeded ".concat(reconnect_limit, "\uFF0Cyou can refresh to reconnect the ws server!");
      console.warn(msg);
      return;
    }

    setTimeout(function () {
      ++WS_CONNECT_COUNT;
      var msg = "ws reconnect the ".concat(WS_CONNECT_COUNT, "th time ...");

      if (getType(reconnect_msg) === 'Function') {
        msg = reconnect_msg(WS_CONNECT_COUNT);
      } else if (reconnect_msg) {
        msg = reconnect_msg;
      }

      console.log(msg);
      install(Vue);
    }, 3000);
  });
}; // ws 重连计数


var WS_CONNECT_COUNT = 0;
var ws = {
  install: install,
  WS_CONNECT_COUNT: WS_CONNECT_COUNT,
  defaultVueEmitName: defaultVueEmitName,
  createWebSocket: createWebSocket
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
 *@author hongwenqing
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

export { calc$1 as calc, cartesianOf, cartesianToTable, copyToClipboard as copyToClibboard, deepClone, dom, get, getType, isEqualObject, paging, ws };
