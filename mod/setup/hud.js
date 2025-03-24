function hud() {
    const pad = env.style.dimension.controlPanel.pad,
          vw  = env.style.dimension.controlPanel.vw,
          vh  = env.style.dimension.controlPanel.vh,
          H   = vh - 2*pad,
          hH  = .5 * H

    const controlPanel = lab.hud.spawn( dna.hud.PixelPanel, {
        name: 'controlPanel',
        clip: false,
        vw,
        vh,
        pad,
        //img: res.ui.bottomBar,
    })

    controlPanel.spawn( dna.hud.gadget.RefuelLever, {
        name: 'refuel',
        x: 60,
        y: 10,
        w: 60,
        h: 50,
    })
    controlPanel.spawn( dna.hud.gadget.FuelSwitch, {
        x: 130,
        y: 10,
        w: 45,
        h: 50,
    })

    controlPanel.spawn( dna.hud.gadget.Speedometer, {
        x:    200,
        y:    10,
        w:    H,
        h:    H,
        R:    hH,
    })


    controlPanel.spawn( dna.hud.gadget.BoilerThermometer, {
        x:    260,
        y:    5,
        h:    60,
    })
    controlPanel.spawn( dna.hud.gadget.WaterLevelMeter, {
        x:    280,
        y:    5,
        h:    60,
    })

    controlPanel.spawn( dna.hud.gadget.Manometer, {
        x:    300,
        y:    5,
        w:    2 * H + pad,
        h:    H + pad,
        R:    H + .5*pad,
    })

    controlPanel.spawn( dna.hud.gadget.PressureValve, {
        x: 420,
        y: 10,
        w: 45,
        h: 50,
    })


    controlPanel.spawn( dna.hud.gadget.BreakThermometer, {
        x:    520,
        y:    5,
        h:    60,
    })

    controlPanel.spawn( dna.hud.gadget.BreakLever, {
        x: 550,
        y: 10,
        w: 80,
        h: 50,
    })

}
hud.Z = 12
