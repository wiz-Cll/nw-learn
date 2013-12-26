!function(){var a,b;!function(){var c={},d={};a=function(a,b,d){c[a]={deps:b,callback:d}},b=function(a){if(a=a.replace(/^\.\.?\//,""),d[a])return d[a];d[a]={};var e=c[a];if(!e)throw Error("Module '"+a+"' not found.");for(var f,g=e.deps,h=e.callback,i=[],j=0,k=g.length;k>j;j++)"exports"===g[j]?i.push(f={}):i.push(b(g[j]));var l=h.apply(this,i);return d[a]=f||l}}(),a("api",["./je/attr","./je/class","./je/dom","./je/event","./je/html","./je/selector","exports"],function(a,b,c,d,e,f,g){"use strict";var h={},i={},j=a["default"];h.attr=j;var k=b.addClass,l=b.removeClass,m=b.toggleClass,n=b.hasClass;h.addClass=k,h.removeClass=l,h.toggleClass=m,h.hasClass=n;var o=c.append,p=c.before,q=c.after;h.append=o,h.before=p,h.after=q;var r=d.on,s=d.off,t=d.delegate,u=d.undelegate,v=d.trigger;h.on=r,h.off=s,h.delegate=t,h.undelegate=u,h.trigger=v;var w=e["default"];h.html=w;var i=f.$,x=f.find;h.find=x;var y=[],z={every:y.every,filter:y.filter,forEach:y.forEach,each:y.forEach,some:y.some,map:y.map};i.getNodeMethods=function(){return h},i.getNodeListMethods=function(){return z},g["default"]=i}),a("je/attr",["../util","exports"],function(a,b){"use strict";var c=a.makeIterable,d=function(a,b){return"string"==typeof a&&void 0===b?(this.nodeType?this:this[0]).getAttribute(a):(c(this).forEach(function(c){if("object"==typeof a)for(var d in a)c.setAttribute(d,a[d]);else c.setAttribute(a,b)}),this)};b["default"]=d}),a("je/class",["../util","exports"],function(a,b){"use strict";var c=a.makeIterable,d=function(a){return c(this).forEach(function(b){b.classList.add(a)}),this},e=function(a){return c(this).forEach(function(b){b.classList.remove(a)}),this},f=function(a){return c(this).forEach(function(b){b.classList.toggle(a)}),this},g=function(a){return c(this).some(function(b){return b.classList.contains(a)})};b.addClass=d,b.removeClass=e,b.toggleClass=f,b.hasClass=g}),a("je/dom",["../util","exports"],function(a,b){"use strict";var c=a.toArray,d=function(a){if(this instanceof Node)if("string"==typeof a)this.insertAdjacentHTML("beforeend",a);else if(a instanceof Node)this.appendChild(a);else{var b=a instanceof NodeList?c(a):a;b.forEach(this.appendChild.bind(this))}else for(var e=this.length;e--;){var f=0===e?a:g(a);d.call(this[e],f)}return this},e=function(a){if(this instanceof Node)if("string"==typeof a)this.insertAdjacentHTML("beforebegin",a);else if(a instanceof Node)this.parentNode.insertBefore(a,this);else{var b=a instanceof NodeList?c(a):a;b.forEach(e.bind(this))}else for(var d=this.length;d--;){var f=0===d?a:g(a);e.call(this[d],f)}return this},f=function(a){if(this instanceof Node)if("string"==typeof a)this.insertAdjacentHTML("afterend",a);else if(a instanceof Node)this.parentNode.insertBefore(a,this.nextSibling);else{var b=a instanceof NodeList?c(a):a;b.reverse().forEach(f.bind(this))}else for(var d=this.length;d--;){var e=0===d?a:g(a);f.call(this[d],e)}return this},g=function(a){return"string"==typeof a?""+a:a instanceof Node?a.cloneNode(!0):a.length?[].map.call(a,function(a){return a.cloneNode(!0)}):a};b.append=d,b.before=e,b.after=f}),a("je/event",["../util","exports"],function(a,b){"use strict";var c=a.makeIterable,d=function(a,b,d,e){"function"==typeof b&&(d=b,b=null);var f=a.split(".");a=f[0]||null;var g=f[1]||null,h=d;return c(this).forEach(function(c){b&&(h=q.bind(c,b,d)),c.addEventListener(a,h,e||!1),o(c).push({eventName:a,handler:d,eventListener:h,selector:b,namespace:g})}),this},e=function(a,b,d,e){if("function"==typeof b&&(d=b,b=null),a){var f=a.split(".");a=f[0];var g=f[1]}return c(this).forEach(function(c){var f=o(c)||[];a||g||b||d?(f.filter(function(c){return!(a&&c.eventName!==a||g&&c.namespace!==g||d&&c.handler!==d||b&&c.selector!==b)}).forEach(function(a){c.removeEventListener(a.eventName,a.eventListener,e||!1),f.splice(f.indexOf(a),1)}),0===f.length&&p(c)):(f.forEach(function(a){c.removeEventListener(a.eventName,a.eventListener,e||!1)}),p(c))}),this},f=function(a,b,c){return d.call(this,b,a,c)},g=function(a,b,c){return e.call(this,b,a,c)},h=function(a,b){b=b||{bubbles:!0,cancelable:!0,detail:void 0};var d=new CustomEvent(a,b);return c(this).forEach(function(c){!b.bubbles||s||i(c)?c.dispatchEvent(d):j(c,a,b)}),this},i=function(a){if(a===window||a===document)return!0;var b=a.ownerDocument.documentElement;return b.contains?b.contains(a):b.compareDocumentPosition?!(b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_DISCONNECTED):!1},j=function(a,b,c){c=c||{},c.bubbles=!1;var d=new CustomEvent(b,c);for(d._target=a;a.parentNode;)a.dispatchEvent(d),a=a.parentNode},k="_jeh",l=1,m={},n=[],o=function(a){a[k]||(a[k]=0===n.length?++l:n.pop());var b=a[k];return m[b]||(m[b]=[])},p=function(a){var b=a[k];m[b]&&(m[b]=null,a[b]=null,n.push(b))},q=function(a,b,c){var d=c._target||c.target;r.call(d,a)&&(c.currentTarget||(c.currentTarget=d),b.call(d,c))},r=function(a){var b="undefined"!=typeof Element?Element.prototype:a;return b.matches||b.matchesSelector||b.mozMatchesSelector||b.webkitMatchesSelector||b.msMatchesSelector||b.oMatchesSelector}(this);!function(a){if(a.CustomEvent){var b=function(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c};b.prototype=a.CustomEvent.prototype,a.CustomEvent=b}}(this);var s=function(a){var b=!1,c=a.document;if(c){var d=c.createElement("div"),e=d.cloneNode();d.appendChild(e),d.addEventListener("e",function(){b=!0}),e.dispatchEvent(new CustomEvent("e",{bubbles:!0}))}return b}(this);b.on=d,b.off=e,b.delegate=f,b.undelegate=g,b.trigger=h}),a("je/html",["../util","exports"],function(a,b){"use strict";var c=a.makeIterable,d=function(a){return a?(c(this).forEach(function(b){b.innerHTML=a}),this):(this.nodeType?this:this[0]).innerHTML};b["default"]=d}),a("je/selector",["../util","exports"],function(a,b){"use strict";var c,d=a.makeIterable,e=function(a,b){var c;return a?"string"!=typeof a?c=d(a):/^\s*<(\w+|!)[^>]*>/.test(a)?c=g(a):(b=b?"string"==typeof b?document.querySelector(b):b.length?b[0]:b:document,c=b.querySelectorAll(a)):c=document.querySelectorAll(null),e.isNative?c:h(c)},f=function(a){return e(a,this)},g=function(a){var b=document.createDocumentFragment(),c=document.createElement("div");for(c.innerHTML=a.trim();c.firstChild;)b.appendChild(c.firstChild);return b.childNodes},h=function(a){var b=a instanceof NodeList?[].slice.call(a):a instanceof Array?a:[a];c=c||e.getNodeMethods();for(var d in c)b[d]=c[d];return b};b.$=e,b.find=f}),a("main",["./api","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=c}),a("util",["exports"],function(a){"use strict";var b=function(a){return[].slice.call(a)},c=function(a){return void 0===a.length||a===window?[a]:a};a.toArray=b,a.makeIterable=c}),window.$=b("main")["default"]}(window);

function ajax( opt ){
    var xhr = new XMLHttpRequest();
    var data = '';
    
    if( opt.method.toLowerCase() !== 'post' ){
        opt.url = montageUrl( opt.url , opt.data);
        xhr.open( opt.method, opt.url);
    }
    else{
        xhr.open( opt.method, opt.url);
        
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
        data = $param( opt.data, data);
        data = data? data : null;
    }
    
    xhr.onreadystatechange = function(){
        if( xhr.readyState == 4 && xhr.status == 200){
            try{
                var result = parseObj( xhr.responseText );
            }
            catch(err){
                console.log('解析返回数据时发生错误：' + err);
                return false;
            }
            opt.callback( result );
        }
    };
    xhr.send( data );
}

function montageUrl( url, param ){
    var requestUrl = url;
    var separator = '&';
    if( param ){
        if( url.indexOf('?')  < 0){
            separator = '?';
        }

        for( var i in param){
            requestUrl += separator + i + '=' + param[i];
            separator = '&';
        }
    }
    
    return requestUrl;
}

function $param( data, pStr, keyName ){
    if( keyName ){
        if( data instanceof Array ){
            var len = data.length;
            for( var j=0; j<len;j++){
                // 不同于基本对象, 复合对象的pStr不能用+
                // 因为最终都是只对基本对象做参数字符串的拼接
                pStr = $param( data[j], pStr, keyName+'[]');
            }
        }
        else if( data instanceof Object){
            for( var i in data ){
                pStr = $param( data[i], pStr, keyName+'['+i+']');
            }
            // pStr += 
        }
        else if( typeof data ==  'string' || typeof data == 'number' ){
            pStr += keyName + '=' + data + '&';
        }
    }
    else{
        if( data instanceof Object){
            for( var m in data ){
                console.log( typeof data[m] );
                if( data[m] instanceof Array ){
                    var len = data[m].length;
                        for( var k=0; k<len;k++){
                            // 不同于基本对象, 复合对象的pStr不能用+
                            pStr = $param( data[m][k], pStr, m+'[]');
                        }
                }
                else if( data[m] instanceof Object ){
                    for( var n in data[m] ){
                        pStr = $param( data[m][n], pStr, m +'['+n+']');
                    }
                }
                else if( typeof data[m] ==  'string' || typeof data[m] == 'number' ){
                    pStr += m + '=' + data[m] + '&';
                }

            }
        }
        else{
            return 'not a valid data for ajax';
        }
        
    }        
    pStr = pStr.substr( 0, pStr.length );
    return pStr;
}

function parseObj( str ){
    var data;
    try{
        data = JSON.parse( str );
    }
    catch( err ){
        // console.log('使用parse解析返回数据时 出现错误····'+err);
        data = eval('(' + str +')');
    }
    return data;
}