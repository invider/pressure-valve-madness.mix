function hud() {
    const controlPanel = lab.hud.spawn( dna.hud.PixelPanel, {
        name: 'controlPanel',
        clip: false,
    })

    controlPanel.spawn( dna.hud.gadget.BoilerThermometer, {
        name: 'thermo1',
    })

    controlPanel.spawn( dna.hud.gadget.BoilerThermometer, {
        name: 'thermo2',
        x:    100,
        background: '#52372b',
    })

    controlPanel.spawn( dna.hud.gadget.BoilerThermometer, {
        name: 'thermo3',
        x:    200,
        background: '#f9a65e',
    })
}
hud.Z = 12
