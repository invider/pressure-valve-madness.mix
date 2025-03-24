let id = 0

const Entity = require('dna/Entity')

class Puff extends Entity {

    constructor(st) {
        super( augment({
            name: 'puff' + (++id),
            water: false,
            x:     0,
            y:     0,
            w:     14,
            h:     14,
            baseLife: 3,
            varLife:  5,
        }, st) )

        const water = this.water
        this.attach(
            new dna.pod.mover.Vector({
                name: 'upstream',
                dir: 1.5 * PI,
                speed: water? 12 : 17,
            }),
        )

        this.attach(
            new dna.pod.mover.Vector({
                name: 'backstream',
                dir:    PI,
                speed: (water? .9 : .8) * this.train.engine.speed,
            }),
        )

        this.attach(
            new dna.pod.cue.SelfDestruct({
                kill: true,
                time: st.baseLife + st.varLife * rnd(),
            })
        )

    }

    draw() {
        const { x, y, w, h } = this
        if (this.water) image(res.train.puffLight, x - .5*w, y - .5*h, w, h)
        else image(res.train.puffDark, x - .5*w, y - .5*h, w, h)
        super.draw()
    }
}
