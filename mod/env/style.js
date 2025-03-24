const style = {

    // Steampunk color set
    //
    // #9ead93,#391e0d,#725f47,#e4ae6c,
    // #a8926d,#f1eec3,#b06021,#508182,
    // #1b282f,#69472b,#f5e29d,#f6c156,
    // #647166,#43362b,#c9955b,#29414b,
    // #819079,#d38530,#eea446,#3a6066,
    // #c5c8a9,#6d9d98,#60300e,#906235,
    // #f7d578,#e4c08d,#874616,#ae7b47,
    // #131112,#4e5149,#c4aa80,#8e7858
    color: {

        title: {
            text:       '#fba64c',
            background: '#38353e',
        },

        menu: {
            title:      '#fba64c',
            background: '#38353e',
        },

        credits: {
            title: '#ebac4d',
            front: '#ebac4d',
            back:  '#4d2235',
            background: '#38353e',
        },

        dust: {
            background: '#9e8676',
            particle:   '#64716670', 
        },

        hud: {
            button: '#c9955b',
            shadow: '#4e5149',
            face:   '#391e0d',
        },

    },

    font: {
        main: {
            family: 'JackOfGears',
            size:    24,
        },
        hud: {
            family: 'JackOfGears',
            size:    16,
        },
        title: {
            family: 'FabulousSteampunk',
            size:   80,
        },
        subTitle: {
            family: 'JackOfGears',
            size:   32,
        },
        screenTitle: {
            family: 'FabulousSteampunk',
            size:   48,
        },
        menu: {
            family: 'JackOfGears',
            size:   32,
        },
        menuHigh: {
            family: 'JackOfGears',
            size:   36,
        },
        credits: {
            family: 'JackOfGears',
            size:   32,
        },

        info: {
            family: 'moon',
            size: 20,
        },
        status: {
            family: 'moon',
            size: 24,
        },
        debug: {
            family: 'moon',
            size: 24,
        },
    },

    dimension: {
        camera: {
            targetW:   640,
        },
        controlPanel: {
            vw:    640,
            vh:    70,
            pad:   10,
        }
    },
}

function classifyFonts() {
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
}

(function setupStyles() {
    classifyFonts()
})()

