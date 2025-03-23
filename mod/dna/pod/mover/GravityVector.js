const Vector = require('dna/pod/mover/Vector')

class GravityVector extends Vector {

    constructor(st) {
        super( augment({
            name:   'gravityVector',
            dir:    0,
            speed:  100,
            debug:  false,
        }, st) )
    }

    evo(dt) {
        const udx = cos(this.dir) * this.speed
        let   udy = sin(this.dir) * this.speed

        // apply gravity
        udy += env.tune.G * dt
        this.dir = atan2(udy, udx)
        this.speed = hypot(udx, udy)

        this.__.x += udx * dt
        this.__.y += udy * dt
    }
}
