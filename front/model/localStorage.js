define( function( require, exports, module ){
    var storage = function(){
        var key = arguments[0];

        if( arguments[1] ){
            var val = arguments[1];
            window.localStorage[ key ] = val;
            return true;
        }
        else{
            return window.localStorage[ key ];
        }
    };

    module.exports = storage;
} );