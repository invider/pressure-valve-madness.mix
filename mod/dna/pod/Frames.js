const df = {
    areal: true,
    x:     0,
    y:     0,
    dir:   0,
    scale: 1,
    timer: 0,
    frame: 0,
    animationSpeed: 0.5,
}

class Frames {

    constructor(st) {
        extend(this, df, st)
    }

    onAttach() {
        this.w = this.frames.tw * this.scale
        this.h = this.frames.th * this.scale
        if (!this.cycle) this.cycle = [0, this.frames.iw * this.frames.ih - 1]

        if (this.areal) {
            if (!this.unit.area) {
                this.unit.attach( new dna.pod.Area())
            }
            // automatically calculates the frame radius
            this.unit.area.registerArea(this.x, this.y, this.w, this.h)
        }
    }

    evo(dt) {
        this.timer += dt

        const cycle = this.cycle
        const animDir = cycle[3] || dry.ANIM_RIGHT
        const timestep = cycle[2] || this.animationSpeed

        if (this.timer >= timestep) {
            this.timer -= timestep

            // next frame
            switch (animDir) {
                case dry.ANIM_RIGHT:
                    this.frame ++
                    if (this.frame > cycle[1]) {
                        this.frame = cycle[0]
                        if (this.onCycle) this.onCycle()
                    }
                    break
                case dry.ANIM_LEFT:
                    this.frame --
                    if (this.frame < cycle[0]) {
                        this.frame = cycle[1]
                        if (this.onCycle) this.onCycle()
                    }
                    break
                case dry.ANIM_SWING:
                    if (this.animBack) {
                        this.frame --
                        if (this.frame < cycle[0]) {
                            this.frame = cycle[0]
                            this.animBack = false
                        }
                        if (this.onCycle) this.onCycle()
                    } else {
                        this.frame ++
                        if (this.frame > cycle[1]) {
                            this.frame =cycle[1]
                            this.animBack = true
                        }
                    }
                    break
            }
        }
    }

    draw() {
        save()
        translate(this.x, this.y)
        rotate(this.dir)

        blocky()
        this.frames.draw( this.frame, -this.w/2, -this.h/2, this.w, this.h)
        //image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
        
        restore()
    }
}
