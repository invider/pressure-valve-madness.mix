const PixelPanel = require('dna/hud/PixelPanel')

class ShoppingPanel extends PixelPanel {

    constructor(st) {
        super( augment({
            name: 'shoppingPanel',
        }, st) )
    }

    shop() {
        this.show()
        lib.sfx('horn')
    }

    buy(option) {
        this.hide()
        lib.sfx('bell')
    }
}
