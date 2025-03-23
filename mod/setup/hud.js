function hud() {
    const controlPanel = lab.hud.spawn( dna.hud.PixelPanel, {
        name: 'controlPanel',
        clip: false,
    })

    controlPanel.spawn( dna.hud.gadget.BoilerThermometer, {
        name: 'thermo1',
    })

    controlPanel.spawn( dna.hud.gadget.RefuelLever, {
        name: 'refuel',
        x: 60,
        y: 10,
        w: 60,
        h: 40,
    })
    controlPanel.spawn( dna.hud.gadget.FuelSwitch, {
        x: 130,
        y: 10,
        w: 45,
        h: 40,
    })

    controlPanel.spawn( dna.hud.gadget.BoilerThermometer, {
        name: 'thermo2',
        x:    340,
        background: '#f9a65e',
    })

    controlPanel.spawn( dna.hud.gadget.PressureValve, {
        x: 360,
        y: 10,
        w: 45,
        h: 40,
    })

    controlPanel.spawn( dna.hud.gadget.BreakLever, {
        x: 550,
        y: 10,
        w: 80,
        h: 40,
    })
}
hud.Z = 12
