const Gauge = require('dna/hud/gadget/Gauge')

class Speedometer extends Gauge {

    constructor(st) {
        super( augment({
            name:  'speedometer',
            min:    0,
            max:    120,
        }, st) )
    }

    takeMeasure() {
        if (env.gameStarted && lab.port.train && !lab.port.train.dead && lab.port.train.engine) {
            return clamp(lab.port.train.engine.speed, this.min, this.max)
        }
        return this.min
    }

}

