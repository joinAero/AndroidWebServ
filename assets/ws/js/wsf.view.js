$(function($) {

function getName( $operate ) {
    var parents = $operate.parentsUntil( 'tr' ),
        $tdOperate = $( parents[parents.length - 1] ),
        $tdName = $( $tdOperate.siblings()[0] );
    return $tdName.text();
}

// directly download
$( 'a.download' ).click(function() {
    var $this = $( this );
    window.location.href = '/dodownload?fname=' + getName( $this );
});

//confirm delete
$( 'a.delete' ).click(function() {
    var $this = $( this );
    var data = {
        'tip': MSG.tip,
        'msg': MSG.del_msg
    }
    $.showDialog( data, function() {
        $.post( '/dodelete', {
            'fname': getName( $this )
        }, function( data, status ) {
            if ( data == '0' ) {
                window.location.reload();
            } else {
                alert( MSG.del_fail );
            }
        }).fail(function() { // 503 etc.
            alert( MSG.not_allow );
        });
    });
});


var Progress = function( $wrapper, $meter, id, period ) {
    this.$wrapper = $wrapper;
    this.$meter = $meter;
    if (id == undefined) {
        var $file = $wrapper.find( ':file' );
        this.id = $file.attr( 'id' );
    } else {
        this.id = id;
    }
    this.period = period == undefined ? 200 : period;

    this.$meterSpan = $meter.find( '> span' );
}

Progress.prototype.ready = function() {
    this.$wrapper.hide();
    this.$meter.show();
}

Progress.prototype.update = function() {
    var self = this;
    $.post( '/doprogress', {
        'id': self.id
    }, function( data, status ) {
        if ( data !== '-1' ) {
            self.$meterSpan.css( 'width', data + '%' );
            if ( data == '100' ) {
                self.over();
            } else {
                setTimeout(function() {
                    self.update();
                }, self.period );
            }
        }
    });
}

Progress.prototype.delayUpdate = function( delay, wait, times ) {
    var self = this,
        wait = wait == undefined ? false : true;
    var delayFunc = self.update;
    if ( wait ) {
        times = times == undefined ? 5 : times;
        function reqProgress() {
            $.post( '/doprogress', {
                'id': self.id
            }, function( data, status ) {
                var func = reqProgress;
                if ( data !== '-1' ) {
                    func = self.update;
                    self.$meterSpan.css( 'width', data + '%' );
                }
                if (--times >= 0) {
                    setTimeout(function() {
                        func.call( self );
                    }, self.period );
                }
            });
        };
        delayFunc = reqProgress;
    }
    setTimeout(function() {
        delayFunc();
    }, delay );
}

Progress.prototype.over = function() {
    this.$wrapper.show();
    this.$meter.hide();
    this.$meterSpan.css( 'width', '50%' );
}

function onFileChanged() {
    var $file = $( this ),
        val = $file.val();
    if ( val ) {
        var id = $file.attr( 'id' ),
            name = $file.attr( 'name' );

        var $parent = $( $file.parent() ),
            $meter = $( $parent.next()[0] );

        var progress = new Progress( $parent, $meter, id );
        progress.ready();
        progress.delayUpdate( 200, true );

        var url = '/doupload?dir=' + name + '&id=' + id;
        $.ajaxFileUpload({
            url: url,
            fileElementId: id,
            dataType: 'json',
            success: function( data, status ) {
                $( '#' + id ).change( onFileChanged );
                progress.over();
                if ( data == '' ) { // not 200.
                    alert( MSG.not_allow );
                }
            },
            error: function( data, status, e ) {
                $( '#' + id ).change( onFileChanged );
                progress.over();
                alert( MSG.up_fail );
            }
        });
    }
}

$( ':file' ).change( onFileChanged );

});