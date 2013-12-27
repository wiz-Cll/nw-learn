define( function( require, exports, module ){
    var ScrollSyncer =  require('../common/component/scrollSync').ScrollSyncer;
// (function(){

    var _id = {
        exportBtn: 'export',
        preview: 'preview'
    };

    var _controller;

    var editZone;
    // doms
    var exportBtnObj, previewZone;
    // varibles
    var saveTimer, convertTimer;

    var avalonMDVM;

    avalon.ready( function(){
        avalonMDVM = avalon.define('avalonMD', function( vm ){
            vm.raw = '';

        });

        avalon.scan();
    } );

    var _view = {
        initMDEditZone: function(){
            editZone.innerText = _controller.storage('dashboard-md') || '';
        }
    };

    var _event = {
        bind: function(){

            var mdSCrollSync = new ScrollSyncer( window.frames['md'], previewZone.get(0) );
            // exportBtnObj.bind('click', _event.convertMD );
            _event.bindTimer();
        },
        convertMD: function(){
            var rawText = _data.replaceSpace( editZone.innerText );
            var html = Converter.makeHtml( rawText );
            // showdown插件会在parse # 时出现id属性的误设定
            previewZone.html( html );
        },
        bindTimer: function(){
            saveTimer = setInterval( function(){
                _controller.storage('dashboard-md',  editZone.innerText);
            }, 1000 );
            convertTimer = setInterval( function(){
                _event.convertMD();
            }, 1000 );
        },
        // 滚动跟随
        bindScrollSync: function(){

        }
    }

    var _data = {
        replaceSpace: function( text ){
            // 关键: 四个空格转换为pre>code的关键~!
            return text.replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ');
        }
    }

    var init = function( controller ){
        _controller = controller;

        editZone = window.frames['md'].document.body;
        previewZone = $( '#' + _id.preview );

        exportBtnObj = $( '#' + _id.exportBtn );
         // = $( '#' + _id. );
         // = $( '#' + _id. );
         // = $( '#' + _id. );
         // = $( '#' + _id. );
         // = $( '#' + _id. );
         // = $( '#' + _id. );

         
         _view.initMDEditZone();

         _event.bind();
    };

    // $(document).ready( init );

// } )();

    exports.init = init;

});