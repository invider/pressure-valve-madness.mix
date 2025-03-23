function inProgress() {
    return env.gameStarted
}

function startNew() {
    log('starting a new game...')
    env.gameStarted = true

    lab.port.spawn( dna.dust.Train)
    lab.port.spawn( dna.dust.Boiler)
    lab.port.spawn( dna.dust.Burner)
}
