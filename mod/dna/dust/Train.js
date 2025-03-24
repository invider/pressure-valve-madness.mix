class Train extends sys.LabFrame {

    constructor(st) {
        super( augment({
            Z:    101,
            name: 'train',
            x:    0,
            y:    -35,
            w:    122,
            h:    70,
            timer:    0,
            distance: 0,
            soundPerDistance: 15
        }, st) )
        this._soundDistance = 0

        this.locomotive = this
        this.index = 1
    }

    init(){
        // монтуємо колесо на механічного вола
        this.spawn( dna.dust.pod.Wheel, {
            x:  -45,
            y:  27,
        })
        this.spawn( dna.dust.pod.Wheel, {
            x:  -25,
            y:  27,
        })

        this.spawn( dna.dust.pod.BigWheel, {
            x:  4,
            y:  23,
        })
        this.spawn( dna.dust.pod.BigWheel, {
            x: 32,
            y: 23,
        })

        this.spawn( dna.dust.pod.Boiler)
        this.spawn( dna.dust.pod.Burner)
        this.spawn( dna.dust.pod.WaterTank)
        this.spawn( dna.dust.pod.Engine)
        this.spawn( dna.dust.pod.Breaks)
        this.spawn( dna.dust.pod.FuelTank)
    }

    onBind(cart) {
        if (this.prev) throw new Exception('Already followed!')
        this.prev = cart
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

        image(res.train.locoBody, -61, -30 + this.deltaY, 122, 60)

        super.draw()
        restore()
    }

    puff(N, water) {
        const train  = this,
              rdx = water? .28 : .4,
              rdy = water? .45 : .5,
              spreadX = 10,
              spreadY = 10,
              baseS   = 4,
              spreadS = 12,
              bx      = this.x + rdx * this.w,
              by      = this.y - rdy * this.h

        let delay = 0
        for (let i = 0; i < N; i++) {
            defer(() => {
                const W = baseS + spreadS * rnd()
                lab.port.fx.spawn( dna.fx.Puff, {
                    train: train,
                    water: water,
                    x: bx + spreadX*rnd() - .5*spreadX,
                    y: by + spreadY*rnd() - .5*spreadY,
                    w: W,
                    h: W,
                })
            }, delay)
            delay += .05
        }
        if (!water) lib.sfx('steam-cycle')
    }

    evo(dt) {
        super.evo(dt)
        // this.y = sin(12*env.time) * 5
        this.deltaY = sin(0.2 * this.distance) * 2
        this.distance += this.engine.speed * dt
        this._soundDistance += this.engine.speed * dt

        if (this._soundDistance > this.soundPerDistance) {
            this.puff(2 + RND(8), false)
            //this.puff(true)
            this._soundDistance -= this.soundPerDistance;
        }
        lab.overlay.info.set('distance', lib.math.round2(this.distance))

        if (this.boiler.exploded && this.engine.speed < 15 && !this.poweredOff) {
            this.timer += dt
            if (this.timer >= env.tune.train.waitToGameOver) {
                this.poweredOff = true
                this.timer = -1
                trap('game/over')
            }

        }
    }

    onArrival() {
        trap('game/shop')
    }

}
