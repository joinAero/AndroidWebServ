$(function( $ ) {

var $window = $( window ),
    $confirm = $( '.confirm' );

var base_width = $confirm.width(),
    base_height = $confirm.height(),
    base_top = - base_height / 2;

// follow scrollbar
$window.scroll(function() {
    $confirm.css( 'margin-top', $window.scrollTop() + base_top );
})

var dlg_func = null,
    dlg_resize = false;
var $dlg_tip = $( '#dlg_tip' ),
    $dlg_msg = $( '#dlg_msg' );

// show dialog
function showDialog( data, func ) {
    if ( dlg_func ) {
        cancelDialog();
    }
    $dlg_tip.html( data.tip );
    $dlg_msg.html( data.msg );
    if ( data.width ) {
        $confirm.css({
            'width': data.width,
            'margin-left': - data.width / 2,
        })
        dlg_resize = true;
    }
    if ( data.height ) {
        base_top = - data.height / 2;
        $confirm.css({
            'height': data.height,
            'margin-top': $window.scrollTop() + base_top,
        })
        dlg_resize = true;
    }
    $confirm.css({ 'display': 'block' });
    dlg_func = func;
}
// cancel dialog
function cancelDialog() {
    $confirm.css( { 'display': 'none' } );
    dlg_func = null;
    if ( dlg_resize ) {
        base_top = - base_height / 2;
        $confirm.css({
            'width': base_width,
            'height': base_height,
            'margin-left': - base_width / 2,
            'margin-top': $window.scrollTop() + base_top,
        })
        dlg_resize = false;
    }
}
// yes
$confirm.find( '#btn_yes' ).click(function() {
    if ( dlg_func ) {
        dlg_func();
    }
    cancelDialog();
});
// no
$confirm.find( '#btn_no' ).click(function() {
    cancelDialog();
});
// close
$confirm.find( 'a[class^=close]' ).click(function() {
    cancelDialog();
});

$.extend({
    showDialog: showDialog,
});

});
