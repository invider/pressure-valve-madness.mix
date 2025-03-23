class Train extends sys.LabFrame {

    constructor(st) {
        super( augment({
            name: 'train',
            x:    0,
            y:    0,
            w:    200,
            h:    50,
        }, st) )

        // TODO construct the train
        // this.spawn( dna.dust.Boiler )
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
        this.y = sin(12*env.time) * 5
    }

}
