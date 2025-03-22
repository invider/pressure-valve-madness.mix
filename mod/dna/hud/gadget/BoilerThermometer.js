/*
 * Shows boiler temperature
 *
 * Must be linked to the Train.boiler object!
 */
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

    // render the boiler pixel art
    draw() {
        const sh = this._hover? -2 : 0

        fill(this.background)
        rect(this.x + sh, this.y + sh, this.w, this.h)
    }

    // blow up the boiler
    //
    // @param {object/projectile} e - hitter
    onClick(e) {
        log('thermo - ' + this.name)
    }

}
