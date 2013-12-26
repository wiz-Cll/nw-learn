define( function( require, exports, module ){

    // var ScrollSyncer = function( targetArr, syncType ){
    //     this.syncers = 
    // };

    var ScrollSyncer = function(  ){
        this.syncerMap = {};
        this.timer;
        this.init( arguments );
        this.bind( );
        return this;
    };

    ScrollSyncer.prototype.init = function( syncerArr ) {
        var count = syncerArr.length;
        for( var i=0; i<count; i++ ){
            var syid = 'syid'+i;
            this.syncerMap[ syid ] = syncerArr[i];
            if( syncerArr[i].localtion !== undefined ){
                syncerArr[i].document.body.attr('data_syid', syid );
            }
            else{
                syncerArr[i].attr('data_syid', syid );
            }
        }
    };

    ScrollSyncer.prototype.bind = function(){
        var self = this;
        for( var j in this.syncerMap ){
            self.syncerMap[j].scroll( function( e ){
                optimizeScroll.apply(self, [ self.sync, self, [e, self] ]);
            } );
        }
    };
    ScrollSyncer.prototype.sync = function( e, self ) {
        var starter = $(e.target);
        if( starter.find('body').length>0 ){
            starter = starter.find('body').eq(0);
        }
        var startSyid = starter.attr('data_syid');
        for( var k in self.syncerMap ){
            if( k != startSyid ){
                var tar = self.syncerMap[k].get(0);
                var source = starter.get(0);
                // tar.scrollTop = (source.scrollTop/(source.scrollHeight-window.getComputedStyle(source).height))*(tar.scrollHeight-window.getComputedStyle(tar).height);
                tar.scrollTop = (source.scrollTop/source.scrollHeight)*tar.scrollHeight;
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

    exports.ScrollSyncer = ScrollSyncer;

} );