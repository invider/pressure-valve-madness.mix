const df = {
    name:  'area',
    debug: false,
}

class Area {
    constructor(st) {
        augment(this, df, st)
    }

    onAttach() {
        this.unit.r = 0
    }

    registerArea(lx, ly, w, h) {
        const sx = abs(lx) + w/2
        const sy = abs(ly) + h/2
        const r2 = ceil(sqrt(sx*sx + sy*sy))
        if (r2 > this.unit.r) {
            this.unit.r = r2
        }
    }

    draw() {
        if (!env.debug || !this.debug) return

        // show bounding volume
        lineWidth(.5)
        stroke('#ff0000')
        circle(0, 0, this.unit.r)
    }

    isVisible(radius) {
        const r = radius === undefined? this.unit.r : radius
        return lab.port.inView(this.unit.x, this.unit.y, r)
    }
}
