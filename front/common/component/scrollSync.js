define( function( require, exports, module ){

/**
 * scroll这个奇葩事件
 * 监听整个页面滚动, 需要把监听绑定在widnow对象上
 * 但是事件触发时 e.target为document
 * 所以: 监听widnow( 如果参数.document不为undefined, 则说明用户希望监听的是window对象 )
 * 处理document对象...获取document.body的scrollHeight 和 scrollTop
 * 
 */



    // 接受n个原生的dom对象作为参数
    var ScrollSyncer = function(  ){
        this.syncerMap = {};
        this.timer;
        this.init( arguments );
        this.bind( );
        var self = this;
        setTimeout(function(){
            self.updateHeight();
        }, 5000);
        return this;
    };

    ScrollSyncer.prototype.init = function( syncerArr ) {
        var count = syncerArr.length;
        for( var i=0; i<count; i++ ){
            var syid = 'syid'+i;
            this.syncerMap[ syid ] = {
                target: syncerArr[i]
            }
            if( syncerArr[i].document ){
                syncerArr[i].document.body.setAttribute('data_syid', syid );
                this.syncerMap[ syid ].height =getEleHeight( syncerArr[i].document.body );
            }
            else{
                syncerArr[i].setAttribute('data_syid', syid );
                this.syncerMap[ syid ].height =getEleHeight( syncerArr[i] );
            }
        }
    };

    ScrollSyncer.prototype.bind = function(){
        var self = this;
        for( var j in this.syncerMap ){
            self.syncerMap[j].target.addEventListener( 'scroll', function( e ){
                optimizeScroll.apply(self, [ self.sync, self, [e] ]);
            } );
        }
    };
    ScrollSyncer.prototype.sync = function( e ) {
        var starter = e.target;
        if( starter.body ){
            starter = starter.body;
        }
        var startSyid = starter.getAttribute('data_syid');
        var source = starter;
        var scrollRadio = source.scrollTop/(source.scrollHeight - this.syncerMap[startSyid].height );
        for( var k in this.syncerMap ){
            if( k != startSyid ){
                var tar = this.syncerMap[k].target;
                tar.scrollTop = scrollRadio*(tar.scrollHeight - this.syncerMap[k].height);
            }
        }
        return;
    };

    ScrollSyncer.prototype.updateHeight = function() {
        for( var m in this.syncerMap ){
            if( this.syncerMap[m].target.document ){
                this.syncerMap[m].height = getEleHeight( this.syncerMap[m].target.document.body );
            }
            else{
                this.syncerMap[m].height = getEleHeight( this.syncerMap[m].target );
            }
        }
        return;
    };

    function optimizeScroll( func, context, args, delay ){
        clearTimeout( this.timer );

        delay = delay? delay : 50;
        this.timer = setTimeout( function(){
            // 调用函数,保证函数的上下文是所需要的上下文
            func.apply( context, args );
            // console.log(  this.timer );
        }, delay);
    }

    function getEleHeight( ele ){
        var hStr = window.getComputedStyle( ele ).height;
        var hNo = hStr.substr( 0, hStr.length-2 );
        return Number( hNo );
    }

    exports.ScrollSyncer = ScrollSyncer;

} );