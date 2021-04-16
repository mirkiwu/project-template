

/**
* 定义弹框的方法
* @type {Object}
* @member {function} show
* @member {function} hide
*/
var Popup = (function(){
    var wrapper = document.createElement("div");
    wrapper.className = "_popupWrapper";
    var curpopup = null;
    /**
    * 弹框显示
    * @param {htmlelement | string} el 要显示的弹框元素或弹框selector
    * @param {function} callback
    */
    function show(el, callback) {
        // if 参数为ID
        if(typeof el == "string") el = document.querySelector(el);
        // if 元素不为html element或者class不含popup
        if(el.nodeType != 1) return;
        var body = document.body;
        // if 当前有显示的弹框则隐藏
        if(curpopup) body.appendChild(curpopup);
        // else 显示蒙层
        else {
            body.appendChild(wrapper);
            body.classList.add("is-disScroll");
        }
        wrapper.appendChild(el);
        curpopup = el;
        // callback执行
        if(typeof callback == "function") callback(el);
    }
    /**
    * 弹框隐藏
    * @param {function} callback
    */
    function hide(callback) {
        if(!curpopup) return;
        var body = document.body;
        body.appendChild(curpopup);
        body.removeChild(wrapper);
        body.classList.remove("is-disScroll");
        if(typeof callback == "function") callback(curpopup);
        curpopup = null;
    }
    // return
    return {
        show: show,
        hide: hide
    }
})();

/**
* 定义loading蒙层的方法
* @type {Object}
* @member {function} show
* @member {function} hide
*/
var Loading = (function() {
    var box = document.createElement("div");
    box.className = "popup popup-loading";
    box.innerHTML = "加载中，请稍候...";

    return {
        show: function() {
            Popup.show(box);
        },
        hide: function() {
            Popup.hide();
        }
    }
})();