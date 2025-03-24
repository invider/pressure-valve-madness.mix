const _port = {
    Z:     11,
    DNA:  'DesertCamera',
    name: 'port',
    zoomOnPlusMinus: true, 

    init: function() {
        this.touch('fx')
        this.fx.Z = 99001
        this.fx.transient = true
    },
}
