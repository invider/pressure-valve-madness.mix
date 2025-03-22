class BoilerThermometer extends dna.hud.Container {

    constructor(st) {
        super( augment({
            name: 'boilerThermometer',
            x: 25,
            y: 10,
            w: 10,
            h: 40,

            background: '#ae6138',
        }, st) )
    }

    draw() {
        const sh = this._hover? -2 : 0

        fill(this.background)
        rect(this.x + sh, this.y + sh, this.w, this.h)
    }

    onClick(e) {
        log('thermo - ' + this.name)
    }

}
