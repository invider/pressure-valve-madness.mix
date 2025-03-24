/*
 * A generic thermometer
 *
 */
class Thermometer extends dna.hud.Container {

    constructor(st) {
        super( augment({
            name:  'thermometer',
            x:      0,
            y:      0,
            w:      12,
            h:      40,
            margin: 5,
            barW:   3,

            minTemp:    0,
            maxTemp:    100,

            passive:    '#541e13',
            active:     '#d03c32',
            background: env.style.color.hud.button,
        }, st) )
    }

    takeMeasure() {
        return this.minTemp
    }

    relMeasure() {
        const range = this.maxTemp - this.minTemp
        return this.takeMeasure() / range
    }

    // render the boiler pixel art
    draw() {
        fill(this.background)
        rect(this.x, this.y, this.w, this.h)

        const barW = this.barW,
              barH = this.h - 2 * this.margin,
              barV = barH * this.relMeasure(),
              barX = this.x + .5 * this.w - .5 * barW,
              barY = this.y + this.margin,
              barY2 = barY + (barH - barV)
            
        fill(this.passive)
        rect(barX, barY, barW, barH)

        fill(this.active)
        rect(barX, barY2, barW, barV)
    }
}
