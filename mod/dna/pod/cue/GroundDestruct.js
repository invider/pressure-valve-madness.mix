class GroundDestruct {

    constructor(st) {
        extend(this, {
            name: 'groundDestruct',
            groundY: 0,
        }, st)
    }

    evo(dt) {
        if (this.__.y > this.groundY) {
            // time to die
            kill(this.unit)
        }
    }
}
