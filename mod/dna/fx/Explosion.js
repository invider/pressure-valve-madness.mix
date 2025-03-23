require('dna/Entity')

class Explosion extends dna.Entity {

    constructor(st) {
        super( augment({
            frames: res.expl.explosion32,
            force: 10,
        }, st) )

        const f = floor(this.force / 10)
        switch(f) {
            case 0: this.frames = res.expl.explosion16; break;
            case 1: this.frames = res.expl.explosion32; break;
            case 2: this.frames = res.expl.explosion48; break;
            case 3: this.frames = res.expl.explosion64; break;
            default: this.frames = res.expl.explosion64; break;
        }

        this.attach( new dna.pod.Frames({
            Z: 10,
            x: 0,
            y: 0,
            scale:  st.scale || 1,
            frames: this.frames,
            cycle: [0, this.frames.iw * this.frames.ih - 1, 0.08, dry.ANIM_RIGHT],
            onCycle: function() {
                this.__.kill()
            }
        }))
    }
}

