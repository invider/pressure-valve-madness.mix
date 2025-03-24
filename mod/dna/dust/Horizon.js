class Horizon {

    constructor(st) {
        augment(this, {
            Z:     1,
            name: 'horizon',
            rY:    .3,
        }, st)
    }

    draw() {
        const hY = this.rY * ctx.height 

        fill('#9090ce')
        rect(0, 0, ctx.width, hY)

        fill('#b8633a')
        rect(0, hY, ctx.width, ctx.height - hY)
    }
}
