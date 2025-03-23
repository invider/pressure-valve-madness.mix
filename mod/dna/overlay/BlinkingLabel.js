const df = {
    name:         'label',
    text:         'default',
    color:        '#ffffff',
    font:         '24px pixel-operator',
    align:        'center',
    baseline:     'middle',
    x:             0,
    y:             0,
    rx:           .5,
    ry:           .5,
    shadowDx:      5,
    shadowDy:      5,
    period:        1,
}

class BlinkingLabel {

    constructor(st) {
        extend(this, df, st)
        this.start()
    }

    start() {
        this.startedAt = env.time
    }

    draw() {
        if ((env.time - this.startedAt) % this.period < .5 * this.period) return
        save()

        ctx.textAlign = this.align
        ctx.textBaseline = this.baseline
        font(this.font)

        const tx = isNumber(this.rx)? rx(this.rx) : this.x
        const ty = isNumber(this.ry)? ry(this.ry) : this.y

        const txt = isFun(this.text)? this.text() : this.text

        if (this.shadowColor) {
            fill(this.shadowColor)
            text(txt, tx+this.shadowDx, ty+this.shadowDy)
        }
        fill(this.color)
        text(txt, tx, ty)

        restore()
    }
}
