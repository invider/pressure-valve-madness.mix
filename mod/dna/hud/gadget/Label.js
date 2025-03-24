let id = 0

class Label extends dna.hud.Container {

    constructor(st) {
        super( augment({
            name: 'label' + (++id),
            x: 0,
            y: 0,
            w: 40,
            h: 15,
            text: 'test',
            
            font:       env.style.font.top.head,
            face:       env.style.color.hud.face,
            background: env.style.color.hud.button,
            shadow:     env.style.color.hud.shadow,
        }, st) )
    }

    draw() {
        /*
        const sh = this._down? 1 : (this._hover? -1 : 0)
        if (sh <= 0) {
            fill(this.shadow)
            rect(this.x + 1, this.y + 1, this.w, this.h)
        }
        //fill(this.background)
        //rect(this.x + sh, this.y + sh, this.w, this.h)

        // debug sizebox
        lineWidth(1)
        stroke('#000000')
        rect(this.x, this.y, this.w, this.h)
        */

        if (this.text) {
            baseMiddle()
            alignLeft()
            fill(this.face)
            font(this.font)
            text(this.text, this.x, this.y + .5*this.h)
        }
    }
}
