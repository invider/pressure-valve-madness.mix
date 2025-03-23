const df = {
    name: 'selfDestruct',
    time: 30,
    kill: false,
}

class SelfDestruct {

    constructor(st) {
        extend(this, df, st)
        this.timer = this.time
    }

    evo(dt) {
        this.timer -= dt
        if (this.timer <= 0) {
            // time to die
            if (this.kill) kill(this.unit)
            else this.unit.obliterate()
        }
    }
}
