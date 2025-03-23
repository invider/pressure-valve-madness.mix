const UnitVector = require('dna/pod/mover/UnitVector')

const df = {
    name:   'vector',
    dir:    0,
    speed:  100,
    debug:  false,
}

class Vector extends UnitVector {

    constructor(st) {
        super( augment({}, df, st) )
    }

    evo(dt) {
        this.__.x += cos(this.dir) * this.speed * dt
        this.__.y += sin(this.dir) * this.speed * dt
    }
}
