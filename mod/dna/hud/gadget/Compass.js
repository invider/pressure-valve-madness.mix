class Compass extends dna.hud.Container {

    constructor(st) {
        super( augment({
            name:  'compass',
            x:      0,
            y:      0,
            w:      100,
            h:      10,
            margin: 4,
            barH:   2,
            trainW: 10,
            trainH: 10,

            start:    0,
            finish:   8000,

            passive:    '#541e13',
            active:     '#d03c32',
            train:      '#000000',
            background: env.style.color.hud.button,
        }, st) )
    }

    takeMeasure() {
        return lab.port.train.distance
    }

    relMeasure() {
        const range = this.finish - this.start
        return clamp((this.takeMeasure() - this.start) / range, 0, 1)
    }

    absMeasure() {
        const range = this.finish - this.start
        return (this.takeMeasure() - this.start) / range
    }

    selectNextDestination() {
        const range = this.finish - this.start
        this.start = lab.port.train.distance
        this.finish = this.start + range + 4000
    }

    evo(dt) {
        if (this.absMeasure() >= 1) {
            this.selectNextDestination()
            lab.port.train.onArrival()
        }
    }

    // render the boiler pixel art
    draw() {
        fill(this.background)
        rect(this.x, this.y, this.w, this.h)

        const barH   = this.barH,
              barW   = this.w - 2 * this.margin,
              barV   = barW * this.relMeasure(),
              barX   = this.x + this.margin,
              barYC  = this.y + .5 * this.h,
              barY   = barYC - .5 * barH,
              trainW = this.trainW,
              trainH = this.trainH
            
        fill(this.passive)
        rect(barX, barY, barW, barH)

        fill(this.active)
        rect(barX, barY, barV, barH)

        fill(this.train)
        rect(barX + barV - .5*trainW, barYC - .5*trainH, trainW, trainH)
    }
}
