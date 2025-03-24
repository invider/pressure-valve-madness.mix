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
            active:     '#eed67b',
            warning:    '#ecb55f',
            danger:     '#be2028',
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
              x  = this.x,
              y  = this.y,
              w  = this.w,
              h  = this.h,
              cx = x + R,
              cy = y + R,
              v  = this.relMeasure(),
              a0 = this.startAngle,
              aR = this.angleRange,
              av = a0 + v * aR,
              a15 = a0 + 0.5 * aR,
              a17 = a0 + 0.7 * aR,
              a2 = a0 + aR

        save()
        if (this.clip) {
            clip(x, y, w, h)
            //lineWidth(3)
            //stroke('#ff0000')
            //rect(x, y, w, h)
        }
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

        stroke(this.warning)
        line(R5*cos(a15), R5*sin(a15), R2*cos(a15), R2*sin(a15))

        stroke(this.danger)
        line(R5*cos(a17), R5*sin(a17), R2*cos(a17), R2*sin(a17))

        lineWidth(2)
        stroke(this.active)
        line(0, 0, R3 * cos(av), R3 * sin(av))

        restore()
    }
}
