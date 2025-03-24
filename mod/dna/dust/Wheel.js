let id = 0

class Wheel {

    constructor(st) {
        extend(this, {
            name: 'wheel' + (++id),
            x:     0,
            y:     0,
            w:     17,
            h:     17,
            a:     0,
            img:   res.train.wheel,
            //img:   res.train.locoBigWheel,
        }, st)
    }

    evo(dt) {
        const speed = this.__.engine.speed
        this.a += speed * env.tune.train.wheelTurnRate * dt
    }

    draw() {
        const w = this.w,
              h = this.h

        save()
        translate(this.x, this.y)
        rotate(this.a)

        image(this.img, -.5 * w,  -.5 * h, w, h)

        restore()
    }
}
