function controlPanel() {

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
        adjust: function() {
            // TODO scale to the screen width preserving the aspect
            // ... adjust size
            const scale = this.scale = ctx.width / (this.vw + 2 * this.vgap)
            this.w = this.vw * scale
            this.h = this.vh * scale
            this.gap = this.vgap * scale

            this.x = .5 * ctx.width - .5 * this.w
            this.y = ctx.height - this.h - this.gap
        },
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

function shopPanel() {

    const pad = env.style.dimension.shopPanel.pad,
          vw  = env.style.dimension.shopPanel.vw,
          vh  = env.style.dimension.shopPanel.vh,
          H   = vh - 2*pad,
          hH  = .5 * H

    const shopPanel = lab.hud.spawn( dna.hud.PixelPanel, {
        name: 'shopPanel',
        clip: false,
        vw,
        vh,
        pad,

        adjust: function() {
            const scale = this.scale = .5 * ctx.width / (this.vw + 2 * this.vgap)

            this.w = this.vw * scale
            this.h = this.vh * scale
            this.gap = this.vgap * scale

            this.x = .5 * ctx.width - .5 * this.w
            this.y = ctx.height - this.h - this.gap - 1.2 * lab.hud.controlPanel.h
        },
    })

    shopPanel.spawn( dna.hud.gadget.DustyButton, {
        name: 'buy1',
        x: 10,
        y: 10,
        w: 2*H,
        h: H,
    })
    shopPanel.spawn( dna.hud.gadget.DustyButton, {
        name: 'buy2',
        x: 120,
        y: 10,
        w: 2*H,
        h: H,
    })
    shopPanel.spawn( dna.hud.gadget.DustyButton, {
        name: 'buy3',
        x: 230,
        y: 10,
        w: 2*H,
        h: H,
    })

    // shopPanel.hide()
}

function hud() {
    controlPanel()
    shopPanel()
}
hud.Z = 12
