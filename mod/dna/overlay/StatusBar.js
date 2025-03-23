const df = {
    name:          'statusBar',
    message:       '',
    color:         '#FFFFFFFF',
    background:    '#00000080',
    margin:        8,
    hideWhenEmpty: false,
}

class StatusBar {

    constructor(st) {
        extend(this, df, st)
    }

    draw() {
        const message = env.status || this.message
        if (this.hideWhenEmpty && !message) return

        const f = env.style.font.status
        const h = f.size + 2*this.margin
        fill(this.background)
        rect(0, ctx.height - h, ctx.width, h)

        if (!message) return
        alignLeft()
        baseBottom()
        fill(this.color)
        font(f.head)
        text(message, 0, ctx.height - this.margin)
    }
}
