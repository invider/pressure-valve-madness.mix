class Horizon {

    constructor(st) {
        augment(this, {
            Z:     1,
            name: 'horizon',
            rY:    .3,
        }, st)
    }

    draw() {
        const vP = this.__.viewport()

        const hY = this.rY * vP.h

        fill('#9090ce')
        rect(vP.x, vP.y, vP.w, hY)

        fill('#b8633a')
        rect(vP.x, vP.y + hY, vP.w, vP.h - hY)
    }
}
