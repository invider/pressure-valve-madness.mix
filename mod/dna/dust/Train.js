class Train extends sys.LabFrame {

    constructor(st) {
        super( augment({
            Z:    101,
            name: 'train',
            x:    0,
            y:    0,
            w:    200,
            h:    50,
            distance: 0,
            soundPerDistance: 15
        }, st) )
        this._soundDistance = 0
    }

    init(){
        
    }

    draw() {
        const { x, y, w, h } = this
        save()
        translate(x, y)

        fill( hsl(.1, .2, .3) )
        rect( -.4 * w, -h, .3 * w, h)

        fill( hsl(.1, .2, .2) )
        rect( .2 * w, -1.5*h, .1 * w, h)

        fill( hsl(.1, .2, .4) )
        rect( -.5 * w, -.5 * h, w, h)

        restore()

        super.draw()
    }

    evo(dt) {
        super.evo(dt)
        // this.y = sin(12*env.time) * 5
        this.y = sin(0.2 * this.distance) * 5
        this.distance += this.engine.speed * dt
        this._soundDistance += this.engine.speed * dt

        if (this._soundDistance > this.soundPerDistance) {
            lib.sfx('steam-cycle')
            this._soundDistance -= this.soundPerDistance;
        }
        lab.overlay.info.set('distance', lib.math.round2(this.distance))
    }

}
