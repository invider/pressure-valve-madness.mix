
class CoordGrid {

    constructor(st) {
        augment(this, {
            name: 'grid',
        }, st)
    }

    draw() {
        if (!env.debug) return
        save()

        // coordinate grid
        const r = 320
        const W = 5
        const step = 20
        const dR = .5

        // grid
        for (let y = -r; y <= r; y += step) {
            for (let x = -r; x <= r; x += step) {
                fill('#a0ce00')
                rect(x-dR, y-dR, 2*dR, 2*dR)
            }
        }

        lineWidth(1)
        stroke('#a0ce00')
        line(0, -r, 0, r)
        line(-r, 0, r, 0)

        lineWidth(.5)
        font('8px ' + env.style.font.debug.family)

        let x = -r
        alignCenter()
        baseMiddle()
        while (x <= r) {
            stroke('#a0ce00')
            line(x, -W, x, W)
            fill('#a0ce00')
            text(`${x}`, x, 2*W)
            x += step
        }

        let y = -r
        alignRight()
        baseMiddle()
        while (y <= r) {
            stroke('#a0ce00')
            line(-W, y, W, y)
            fill('#a0ce00')
            text(`${y}`, -W, y)

            y += step
        }
        restore()
    }
}
