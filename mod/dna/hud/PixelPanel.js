class PixelPanel extends dna.hud.Container {

    constructor(st) {
        super( augment({
            _scaled: true,
            name: 'pixelPanel',
            x:     0,
            y:     0,
            w:     0,
            h:     0,
            gap:   0,
            vw:    100,
            vh:    20,
            vgap:  0,
        }, st) )
    }

    adjust() {
        // TODO scale to the screen width preserving the aspect
        // ... adjust size
        const scale = this.scale = ctx.width / (this.vw + 2 * this.vgap)
        this.w = this.vw * scale
        this.h = this.vh * scale
        this.gap = this.vgap * scale

        this.x = .5 * ctx.width - .5 * this.w
        this.y = ctx.height - this.h - this.gap
    }

    drawBackground() {
        const { vw, vh } = this

        fill('#ffdb8f')
        rect(0, 0, vw, vh)
    }

    lx(gx) {
        return (gx - this.x) / this.scale
    }

    ly(gy) {
        return (gy - this.y) / this.scale
    }

    gx(lx) {
        return lx * this.scale + this.x
    }

    gy(ly) {
        return ly * this.scale + this.y
    }

    draw() {
        if (this.hidden) return

        save()
        translate(this.x, this.y)
        scale(this.scale, this.scale)

        if (this.clip) {
            ctx.beginPath()
            ctx.rect(0, 0, this.vw, this.vh)
            ctx.clip()
        }

        this.drawBackground()
        this.drawContent()
        this.drawForeground()

        restore()
    }

    pick(x, y, ls, opt) {
        let last
        if (x >= this.x && x <= this.x + this.w
                && y >= this.y && y <= this.y + this.h) {
            ls.push(this)
            last = this
        }

        let next = super.pick(x, y, ls, opt)

        if (next) last = next
        return last
    }
}
