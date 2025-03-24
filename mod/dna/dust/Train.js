class Train extends sys.LabFrame {

    constructor(st) {
        super( augment({
            Z:    101,
            name: 'train',
            x:    0,
            y:    -35,
            w:    120,
            h:    70,
            distance: 0,
            soundPerDistance: 15
        }, st) )
        this._soundDistance = 0
    }

    init(){
        // монтуємо колесо на механічного вола
        this.spawn( dna.dust.Wheel, {
            x:  -45,
            y:  27,
        })
        this.spawn( dna.dust.Wheel, {
            x:  -25,
            y:  27,
        })

        this.spawn( dna.dust.BigWheel, {
            x:  4,
            y:  23,
        })
        this.spawn( dna.dust.BigWheel, {
            x: 32,
            y: 23,
        })

        this.spawn( dna.dust.Boiler)
        this.spawn( dna.dust.Burner)
        this.spawn( dna.dust.WaterTank)
        this.spawn( dna.dust.Engine)
        this.spawn( dna.dust.Breaks)
        this.spawn( dna.dust.FuelTank)

    }

    draw() {
        const { x, y, w, h } = this
        save()
        translate(x, y)

        /*
        // hint the size
        fill( hsl(.1, .2, .4) )
        rect( -.5 * w, -.5 * h, w, h)

        lineWidth(1)
        stroke('#8080FF')
        rect( -.5 * w, -.5 * h, w, h)
        */

        image(res.train.locoBody, -60, -30 + this.deltaY, 120, 60)

        super.draw()
        restore()

    }

    evo(dt) {
        super.evo(dt)
        // this.y = sin(12*env.time) * 5
        this.deltaY = sin(0.2 * this.distance) * 2
        this.distance += this.engine.speed * dt
        this._soundDistance += this.engine.speed * dt

        if (this._soundDistance > this.soundPerDistance) {
            lib.sfx('steam-cycle')
            this._soundDistance -= this.soundPerDistance;
        }
        lab.overlay.info.set('distance', lib.math.round2(this.distance))
    }

}
