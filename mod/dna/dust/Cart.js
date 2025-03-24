let id = 0

class Cart extends LabFrame {

    constructor(st) {
        super( augment({
            Z:      101,
            name:  'cart' + (++id),
            x:      0,
            y:     -35,
            w:      123,
            h:      70,
            deltaY: 0,
        }, st) )
    }

    init() {
        this.spawn( dna.dust.pod.Wheel, {
            x:  -27,
            y:  27,
        })
        this.spawn( dna.dust.pod.Wheel, {
            x:  30,
            y:  27,
        })
    }

    bindTo(cart) {
        this.lead = cart
        cart.onBind(this)
        this.locomotive = cart.locomotive
        this.index = cart.index + 1
    }

    onBind(cart) {
        if (this.prev) throw new Error('Already followed!')
        this.prev = cart
    }

    evo(dt) {
        super.evo(dt)

        // tag behind the lead
        this.x = this.lead.x - .5*this.lead.w - .5*this.w + 2

        this.deltaY = sin(0.2 * this.locomotive.distance + HALF_PI * this.index) * 2
    }

    draw() {
        save()
        translate(this.x, this.y)

        image(res.train.cartCoal, -60, -30 + this.deltaY, 123, 60)

        super.draw()
        restore()
    }
}
