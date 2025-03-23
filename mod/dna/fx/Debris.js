require('dna/Entity')

let id = 0
class Debris extends dna.Entity {

    constructor(st) {

        super( augment({
            frames: res.expl.debrisF,
        }, st) )
        if (!st.name) this.name = 'debris' + (++id)

        const type = RND(5)
        switch(type) {
            case 0: this.frames = res.expl.debrisA; break;
            case 1: this.frames = res.expl.debrisB; break;
            case 2: this.frames = res.expl.debrisC; break;
            case 3: this.frames = res.expl.debrisD; break;
            case 4: this.frames = res.expl.debrisE; break;
            case 5: this.frames = res.expl.debrisF; break;
        }

        const direction = lib.math.rndz()? dry.ANIM_RIGHT : dry.ANIM_LEFT
        const aspeed = 0.05 + 0.1 * rnd()
        this.attach( new dna.pod.Frames({
            Z:      10,
            x:      0,
            y:      0,
            scale:  st.scale || 1,
            frames: this.frames,
            animationSpeed: .2,
            keep: 1 + RND(0, 2),
            cycle:  [0, this.frames.iw * this.frames.ih - 2, aspeed, direction],
        }))

        // move in random direction
        this.attach(
            new dna.pod.mover.GravityVector({
                dir:   lib.math.rnda() / 2 - HALF_PI,
                speed: st.baseSpeed + st.varSpeed * rnd(),
            })
        )

        this.attach(
            new dna.pod.cue.GroundDestruct({
                groundY: 20,
            })
            /*
            new dna.pod.cue.SelfDestruct({
                kill: true,
                time: st.baseLife + st.varLife * rnd(),
            })
            */
        )
    }

    onKill() {
        lib.vfx.debrisDestruction(this, this.x, this.y)
    }
}
