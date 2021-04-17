"use strict";

/*rem适配(自动执行)*/
(function (deviceWidth){
    var root = document.documentElement;
    var w = root.clientWidth;
    root.style.fontSize = (w > 720 ? 720 : w < 320 ? 320 : w) / deviceWidth * 100 + "px";
})(750);


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
    * @param {htmlelement | string} el 要显示的弹框元素或弹框ID
    * @param {function} callback
    */
    function show(el, callback) {
        // if 参数为ID
        if(typeof el == "string") el = document.getElementById(el);
        // if 元素不为html
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
* 定义侧滑栏的方法
* @type {Object}
* @member {function} show
* @member {function} hide
*/
var Slider = (function () {
    var wrapper = document.createElement("div");
        wrapper.className = "_sliderWrapper";
    var curbox = null;
    /**
    * 侧滑框显示
    * @param {htmlelement | string} el 要显示的弹框元素或弹框ID
    * @param {function} callback
    */
    function show(el, callback) {
        // if 参数为ID
        if(typeof el == "string") el = document.getElementById(el);
        // if 元素不为html
        if(el.nodeType != 1) return;
        var body = document.body;
        // if 当前有显示的弹框则隐藏
        if(curbox) body.appendChild(curbox);
        // else 显示蒙层
        else {
            body.appendChild(wrapper);
            body.classList.add("is-disScroll");
        }
        wrapper.appendChild(el);
        curbox = el;
        setTimeout(function () {
            el.classList.add("is-show");
            // callback执行
            if(typeof callback == "function") callback(el);
        }, 0);
    }
    /**
    * 侧滑框隐藏
    * @param {function} callback
    */
    function hide(callback) {
        if(!curbox) return;
        var body = document.body;
        curbox.classList.remove("is-show");
        setTimeout(function(){
            body.appendChild(curbox);
            body.removeChild(wrapper);
            body.classList.remove("is-disScroll");
            if(typeof callback == "function") callback(curbox);
            curbox = null;
        }, 300);
    }
    // 蒙层点击隐藏
    wrapper.onclick = function (ev) {
        if (ev.target == wrapper) hide();
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
var Loading = (function(){
    var wrapper = document.createElement("div");
        wrapper.className = "_loadingWrapper";
        wrapper.innerHTML = "<div class=\"_loading\"></div>";
    var isElInDoc = function (el) {
        while(el && el != document) el = el.parentNode;
        return !!el;
    }
    return {
        show: function(){
            if(!isElInDoc(wrapper))
                document.body.appendChild(wrapper);
        },
        hide: function(){
            if(isElInDoc(wrapper))
                document.body.removeChild(wrapper);
        }
    }
})();

/**
* Toast的方法
* @type {Object}
* @member {function} show
*/
var Toast = (function(){
    var box = document.createElement("div");
    box.className = "_toast";
    return {
        /**
        * @param {object} opt 参数
        * opt.delay: toast显示的时间，默认1500ms
        * opt.info: toast提示文字（必填）
        * opt.ico： toast的图标图片的url（可选）
        */
        show: function(opt){
            if(!opt || !opt.info) return;
            opt.delay = opt.delay || 1500;
            box.innerHTML = "<span>" + opt.info + "<\/span>";
            if(opt.ico) {
                box.innerHTML = "<i style=\"background-image:url("+opt.ico+")\"><\/i>" + box.innerHTML;
            }
            document.body.appendChild(box);
            setTimeout(function(){
                box.classList.add("is-show")
            }, 0);
            setTimeout(function(){
                box.classList.remove("is-show");
                setTimeout(function(){
                    document.body.removeChild(box)
                }, 500);
            }, opt.delay);
        }
    }
})();

