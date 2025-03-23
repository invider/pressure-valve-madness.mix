function inProgress() {
    return env.gameStarted
}

function startNew() {
    log('starting a new game...')
    env.gameStarted = true


    const train = lab.port.spawn( dna.dust.Train)
    train.spawn( dna.dust.Boiler)
    train.spawn( dna.dust.Burner)
    train.spawn( dna.dust.WaterTank)
    train.spawn( dna.dust.Engine)
    train.spawn( dna.dust.Breaks)
}
