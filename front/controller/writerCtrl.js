define( function( require, exports, module ){
    var controller = {};
    var storage = require('../model/localStorage');
    controller.storage = storage;
    $(document).ready( function(){
        // console.log( window.frames['md'].document.body );
        require( '../viewer/writer.js' ).init( controller );
    } );
} );