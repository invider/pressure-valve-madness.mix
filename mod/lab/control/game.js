function inProgress() {
    return env.gameStarted
}

function startNew() {
    log('starting a new game...')
    env.gameStarted = true

    const train = lab.port.spawn( dna.dust.Train )
    pin.train = train
    pin.boiler = train.boiler

    let prev = train
    for (let i = 0; i < 5; i++) {
        const cart = lab.port.spawn( dna.dust.Cart )
        cart.bindTo(prev)
        prev = cart
    }

    // debug
    // show coordinate grid
    // lab.port.spawn( dna.dust.debug.CoordGrid )
}

function over() {
    env.gameStarted = false
    lab.port.fx.killAll()
    lab.port.killAll()
    pin.train  = null
    pin.boiler = null
}
