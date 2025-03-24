class Gauge extends dna.hud.Container {

    constructor(st) {
        super( augment({
            name:  'gauge',
            x:      0,
            y:      0,
            w:      20,
            h:      20,
            R:      10,

            min:    0,
            max:    100,

            startAngle: .75 * PI,
            angleRange: 1.5 * PI,

            mark:       '#3a6066',
            passive:    '#541e13',
            active:     '#d03c32',
            background: env.style.color.hud.button,
        }, st) )
    }

    takeMeasure() {
        return this.min
    }

    relMeasure() {
        const range = this.max - this.min
        return this.takeMeasure() / range
    }

    // render the boiler pixel art
    draw() {
        const R  = this.R, // outer edge
              R2 = .9 * R, // outer mark
              R3 = .8 * R, // handle reach
              R4 = .7 * R, // mark circle
              R5 = .6 * R, // inner mark
              cx = this.x + R,
              cy = this.y + R,
              v  = this.relMeasure(),
              a0 = this.startAngle,
              aR = this.angleRange,
              av = a0 + v * aR,
              a2 = a0 + aR

        save()
        translate(cx, cy)

        // fill the gauge circle
        fill(this.background)
        circle(0, 0, R)

        lineWidth(1)
        stroke(this.mark)
        circle(0, 0, R4)


        lineWidth(1)
        stroke(this.mark)
        line(R5*cos(a0), R5*sin(a0), R2*cos(a0), R2*sin(a0))
        line(R5*cos(a2), R5*sin(a2), R2*cos(a2), R2*sin(a2))

        lineWidth(1)
        stroke(this.active)
        line(0, 0, R3 * cos(av), R3 * sin(av))

        restore()
    }
}
