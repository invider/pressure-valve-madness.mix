function hud() {
    const controlPanel = lab.hud.spawn( dna.hud.PixelPanel, {
        name: 'controlPanel',
        clip: false,
        vw:    env.style.dimension.controlPanel.vw,
        vh:    env.style.dimension.controlPanel.vh,
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
        x:    220,
        y:    2,
        h:    54,
    })

    controlPanel.spawn( dna.hud.gadget.PressureValve, {
        x: 360,
        y: 10,
        w: 45,
        h: 40,
    })


    controlPanel.spawn( dna.hud.gadget.BreakThermometer, {
        x:    520,
        y:    2,
        h:    54,
    })

    controlPanel.spawn( dna.hud.gadget.BreakLever, {
        x: 550,
        y: 10,
        w: 80,
        h: 40,
    })

}
hud.Z = 12
