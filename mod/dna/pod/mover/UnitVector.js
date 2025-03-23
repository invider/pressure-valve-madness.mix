const df = {
    Z: 101,
    name: 'vector',
    debug: false,
}

class UnitVector {

    constructor(st) {
        augment(this, df, st)
    }

    evo(dt) {
        const dx = cos(this.__.dir) * this.__.speed * dt
        const dy = sin(this.__.dir) * this.__.speed * dt
        this.__.x += dx
        this.__.y += dy
    }

    draw() {
        if (!env.debug || !this.debug) return

        save()
        translate(-this.__.dir)

        const len = min(this.__.speed, 30)
        /*
        const dx = cos(this.dir) * len
        const dy = sin(this.dir) * len
        */

        // movement vector 
        lineWidth(0.5)
        stroke('#00ff00')
        //circle(0, 0, 5)
        const y2 = -10
        const y3 = -6
        const sx = 1.5
        line(0, 0, 0, y2)
        line(0, y2,  sx, y3)
        line(0, y2, -sx, y3)

        restore()
    }
}
