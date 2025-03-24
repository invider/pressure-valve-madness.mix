const PixelPanel = require('dna/hud/PixelPanel')

const items = [
    {
        name: '+20 Wood',
        buy: () => {
            pin.train.fuelTank.fuel.wood.amount += 20
        }
    },
    {
        name: '+15 Coal',
        buy: () => {
            log('+15 coal')
            pin.train.fuelTank.fuel.coal.amount += 15
        }
    },
    {
        name: '+5 Peat',
        buy: () => {
            pin.train.fuelTank.fuel.wood.amount += 5
        }
    },
    {
        name: 'Water',
        buy: () => {
            pin.train.waterTank.amount += 200
        }
    },
]

class ShoppingPanel extends PixelPanel {

    constructor(st) {
        super( augment({
            name: 'shoppingPanel',
        }, st) )
    }

    boxes() {
        this.options = []
        for (let i = 0; i < 3; i++) {
            const item = math.rnde(items)
            this.options[i] = item
            this._ls[i].label = item.name
        }
    }

    shop() {
        if (!this.hidden) return
        this.boxes()
        this.show()
        lib.sfx('horn')
    }

    buy(ioption) {
        const item = this.options[ioption - 1]
        if (item) {
            item.buy()
        }
        this.hide()
        lib.sfx('bell')
    }
}
