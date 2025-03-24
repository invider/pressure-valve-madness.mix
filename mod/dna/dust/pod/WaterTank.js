class WaterTank {
    constructor(st) {
        augment(this, {
            name: 'waterTank',
            x:    0,
            y:    0,
            w:    0,
            h:    0,
            amount: 1000
        }, st) 
    }

    evo(dt) {
        lab.overlay.info.set('water', this.amount)
    }
}