const squareParticleTrait = {
    drawParticle: function() {
        fill(this.color)
        rect(this.x, this.y, this.r, this.r)
    }
}

let debrisId = 0
function debrisDestruction(source, x, y) {
    const st = {
        x: x,
        y: y,
        color: env.style.color.dust.particle,

        lifespan: 0.1,
        force:  300,
        radius: 0,
        size: 3, vsize: 2,
        speed: 20, vspeed: 20,
        angle: PI, spread: PI,
        minLifespan: .2, vLifespan: .2,

        onKill: function() {
            this.dead = true
            //lab.limbo.debris.keep(this)
        },
    }

    let emitter
    //const emitter = lab.limbo.debris.extract()
    if (emitter) {
        emitter.reignite(st)
        lab.port.fx.attach(emitter)
    } else {
        st.name = 'debrisVFX' + (++debrisId)
        const e = lab.port.fx.spawn('Emitter', augment(st, squareParticleTrait))
    }
}

function explosionAt(x, y, scale) {
    const debris = 15 + RND(10)
    for (let i = 0; i < debris; i++) {
        lab.port.fx.spawn(dna.fx.Debris, {
            x: x,
            y: y,
            scale: 2,
            baseSpeed: 40,
            varSpeed: 40,
            baseLife: 3,
            varLife:  5,
        })
    }

    lab.port.fx.spawn( dna.fx.Explosion, {
        x: x,
        y: y,
        scale: 2,
        force: 35,
    })
    lib.sfx('explosion')
}

