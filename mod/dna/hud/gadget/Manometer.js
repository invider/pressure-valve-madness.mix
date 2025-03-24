const Gauge = require('dna/hud/gadget/Gauge')

class Manometer extends Gauge {

    constructor(st) {
        super( augment({
            name:  'manometer',
            min:    0,
            max:    12,

            startAngle: 1.1 * PI,
            angleRange: 0.8 * PI,
        }, st) )
    }

    takeMeasure() {
        if (env.gameStarted && lab.port.train && !lab.port.train.dead && lab.port.train.boiler) {
            return clamp(lab.port.train.boiler.pressure, this.min, this.max)
        }
        return this.min
    }

}

