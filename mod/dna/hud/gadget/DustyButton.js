let id = 0

// generic button with a label you can press
class DustyButton extends dna.hud.Container {

    constructor(st) {
        super( augment({
            name: 'button' + (++id),
            x: 0,
            y: 0,
            w: 40,
            h: 20,

            font:       env.style.font.hud.head,
            face:       env.style.color.hud.face,
            background: env.style.color.hud.button,
            shadow:     env.style.color.hud.shadow,
        }, st) )
    }

    draw() {
        const sh = this._down? 1 : (this._hover? -1 : 0)

        if (sh <= 0) {
            fill(this.shadow)
            rect(this.x + 1, this.y + 1, this.w, this.h)
        }
        fill(this.background)
        rect(this.x + sh, this.y + sh, this.w, this.h)

        if (this.label) {
            baseMiddle()
            alignCenter()
            fill(this.face)
            font(this.font)
            text(this.label, this.x + .5 * this.w, this.y + .5 * this.h)
        }
    }

    onMouseDown(e) {
        this._down = true
    }

    onMouseUp(e) {
        this._down = false
    }
}
